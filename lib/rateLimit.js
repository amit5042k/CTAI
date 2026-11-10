// Small in-memory limiter for sign-in attempts. Counts failures per key
// (e.g. email or IP) in a sliding window; good enough for a single Node
// process such as Hostinger or the Docker image.
const buckets = globalThis.__ctaiRateLimit || (globalThis.__ctaiRateLimit = new Map());

const WINDOW_MS = 15 * 60 * 1000;

function prune(key, now) {
  const list = (buckets.get(key) || []).filter((t) => now - t < WINDOW_MS);
  if (list.length) buckets.set(key, list);
  else buckets.delete(key);
  return list;
}

// Returns seconds until the key may try again, or 0 if allowed.
export function retryAfter(keys, max) {
  const now = Date.now();
  let wait = 0;
  for (const k of keys) {
    const list = prune(k, now);
    if (list.length >= max) wait = Math.max(wait, Math.ceil((list[0] + WINDOW_MS - now) / 1000));
  }
  return wait;
}

export function recordFailure(keys) {
  const now = Date.now();
  for (const k of keys) buckets.set(k, [...prune(k, now), now]);
}

export function clearFailures(keys) {
  for (const k of keys) buckets.delete(k);
}

export function clientIp(req) {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : req.headers.get("x-real-ip") || "local").trim();
}
