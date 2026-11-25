// Startup file for hosts that launch a Node.js app from a single entry
// point (Hostinger's Node.js Apps, cPanel's Setup Node.js App, Phusion
// Passenger, etc.). Docker and local use `npm run start` instead.
//
// Runs Next.js inside this process rather than spawning `npx next start`:
// a spawned child was not stopped when the host restarted the app, so the
// old server kept the port and the new one failed (503 errors).

const http = require("node:http");
const next = require("next");

const port = process.env.PORT || 3000; // may be a socket path under Passenger
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = http.createServer((req, res) => handle(req, res));
    server.listen(port, () => {
      console.log(`CTAI Portal ready on ${port}`);
    });
    const stop = () => server.close(() => process.exit(0));
    process.on("SIGTERM", stop);
    process.on("SIGINT", stop);
  })
  .catch((err) => {
    console.error("Failed to start CTAI Portal:", err);
    process.exit(1);
  });
