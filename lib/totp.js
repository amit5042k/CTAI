// Tiny TOTP (RFC 6238 / HOTP) implementation, no external deps.
// HMAC-SHA1, 6-digit codes, 30-second steps. Verifies with ±1 step drift.

import crypto from "node:crypto";

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function generateBase32Secret(bytes = 20) {
  const buf = crypto.randomBytes(bytes);
  return base32Encode(buf);
}

export function base32Encode(buf) {
  let bits = 0;
  let value = 0;
  let out = "";
  for (let i = 0; i < buf.length; i++) {
    value = (value << 8) | buf[i];
    bits += 8;
    while (bits >= 5) {
      out += BASE32_ALPHABET[(value >>> (bits - 5)) & 0x1f];
      bits -= 5;
    }
  }
  if (bits > 0) out += BASE32_ALPHABET[(value << (5 - bits)) & 0x1f];
  return out;
}

export function base32Decode(str) {
  const clean = String(str)
    .toUpperCase()
    .replace(/[^A-Z2-7]/g, "");
  let bits = 0;
  let value = 0;
  const out = [];
  for (let i = 0; i < clean.length; i++) {
    const v = BASE32_ALPHABET.indexOf(clean[i]);
    if (v < 0) continue;
    value = (value << 5) | v;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return Buffer.from(out);
}

function hotp(secretBuf, counter) {
  const buf = Buffer.alloc(8);
  let c = counter;
  for (let i = 7; i >= 0; i--) {
    buf[i] = c & 0xff;
    c = Math.floor(c / 256);
  }
  const hmac = crypto.createHmac("sha1", secretBuf).update(buf).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const bin =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);
  return String(bin % 1_000_000).padStart(6, "0");
}

export function totp(secretBase32, when = Date.now()) {
  const secretBuf = base32Decode(secretBase32);
  const counter = Math.floor(when / 1000 / 30);
  return hotp(secretBuf, counter);
}

// Verify a 6-digit code with ±1 step drift (so user gets ~90s effective window).
export function verifyTotp(secretBase32, code, when = Date.now()) {
  const trimmed = String(code || "").replace(/\s+/g, "");
  if (!/^\d{6}$/.test(trimmed)) return false;
  const secretBuf = base32Decode(secretBase32);
  const counter = Math.floor(when / 1000 / 30);
  for (const drift of [-1, 0, 1]) {
    if (hotp(secretBuf, counter + drift) === trimmed) return true;
  }
  return false;
}

export function otpauthURI({ secret, label, issuer = "CTAI Portal" }) {
  const enc = encodeURIComponent;
  return `otpauth://totp/${enc(issuer)}:${enc(label)}?secret=${secret}&issuer=${enc(issuer)}&algorithm=SHA1&digits=6&period=30`;
}
