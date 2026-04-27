// Startup file for hosts that launch a Node.js app from a single
// entry point (Hostinger's Node.js Apps, cPanel's Setup Node.js App,
// Phusion Passenger, etc.).
//
// In production, just run `npm run start` instead — this file exists
// because some managed hosts insist on a JS file as the launcher.

const { spawn } = require("node:child_process");

const port = process.env.PORT || 3000;
const child = spawn("npx", ["next", "start", "-p", String(port)], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code) => process.exit(code || 0));
