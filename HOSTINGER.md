# Deploying the CTAI Portal on Hostinger

## Why your accounts kept disappearing

Hostinger's **Git auto-deploy** does a clean checkout into your deploy
folder on every push. That deploy folder is the same folder where the
SQLite database (`data/portal.db`) was being written, so each deploy
**overwrote the database file**. The repo never deletes anything — the
host's deploy step does.

The fix is to put the database **outside the deploy folder**, in a
sibling folder under your home directory that Git deploys never touch.
The app reads its location from the `CTAI_DATA_DIR` environment
variable.

This guide assumes you're on a Hostinger plan that supports **Node.js
apps** (Premium / Business shared hosting, or Cloud / VPS). If you're
on a basic shared-hosting plan that only runs PHP, Node.js apps don't
run there at all — you'd need to upgrade or use a VPS.

---

## 1. Open SSH on the server

In hPanel: **Advanced → SSH Access** → make sure SSH is enabled and
note your SSH host, port, username (something like `u123456789`).

From your computer:

```bash
ssh -p <port> u123456789@<your-ssh-host>
```

You'll land in your home directory, e.g. `/home/u123456789`.

---

## 2. Create the persistent data folder

```bash
mkdir -p ~/ctai-data
chmod 700 ~/ctai-data
```

This is the folder that `portal.db` and uploaded school logos will
live in. Git deploys never write here. Your home directory is your
backup target.

Get the absolute path — copy this exact string, you'll paste it into
hPanel in step 4:

```bash
echo "$HOME/ctai-data"
# example output: /home/u123456789/ctai-data
```

---

## 3. Set up the Node.js application in hPanel

In hPanel: **Advanced → Node.js**.

If you haven't already:

1. **Create application**.
2. **Node.js version**: 20.x (recommended).
3. **Application mode**: Production.
4. **Application root**: where Git deploys land — typically
   `domains/<your-domain>/public_html` or a subfolder like
   `domains/<your-domain>/ctai`.
5. **Application URL**: your domain.
6. **Application startup file**: `node_modules/next/dist/bin/next` is
   not reliable in Hostinger; create a tiny `server.js` instead — see
   step 5 below.

Click **Create**.

---

## 4. Set the two environment variables

Still on the Node.js app page in hPanel, scroll to **Environment
variables** and add:

| Variable | Value |
|----------|-------|
| `JWT_SECRET` | A long random hex string — generate with `openssl rand -hex 32` on your laptop |
| `CTAI_DATA_DIR` | The absolute path you printed in step 2, e.g. `/home/u123456789/ctai-data` |
| `NODE_ENV` | `production` |

Click **Save**. Hostinger restarts the app for you.

---

## 5. Add a startup file the app can use

Hostinger's Node.js app launcher needs a single startup file. Add
`server.js` to the **root of your repo** and commit it:

```js
// server.js — used by Hostinger's Node.js app launcher.
const { spawn } = require("node:child_process");
const port = process.env.PORT || 3000;
const child = spawn("npx", ["next", "start", "-p", String(port)], {
  stdio: "inherit",
  env: process.env,
});
child.on("exit", (code) => process.exit(code));
```

Then in hPanel set **Application startup file** = `server.js`.

> If you're already using a different startup approach that works,
> skip this step.

---

## 6. Wire up Git auto-deploy

In hPanel: **Advanced → Git**.

1. **Create a new repository** entry pointing at your GitHub repo on
   the branch `claude/cbse-ctai-curriculum-app-kyooB`.
2. **Repository path**: same as the Node.js app's "Application root"
   above.
3. Tick **Auto-deploy on push** if you want commits to deploy
   automatically. (Otherwise click **Deploy** manually.)

Hostinger pulls the repo and deploys.

---

## 7. Build and start

Back in **Advanced → Node.js**:

1. Click **Run NPM Install** — this installs everything including
   `better-sqlite3` (it has prebuilt binaries that work on Hostinger's
   Linux).
2. Click **Run NPM Script** and choose `build` — this produces the
   production `.next` folder.
3. Click **Restart**.

Open your domain. The first time, visit `/register` to create the
**superadmin** account.

---

## 8. Confirm the database is in the right place

SSH back into the server and run:

```bash
cd ~/domains/<your-domain>/public_html        # or wherever the app is
npm run db-status
```

The output should look like:

```
Data directory  : /home/u123456789/ctai-data
Database file   : /home/u123456789/ctai-data/portal.db
DB exists       : yes
DB size         : 32768 bytes
```

The path **must** be your home-directory `ctai-data` folder. If it
shows the relative `data/portal.db`, the env var didn't take —
double-check `CTAI_DATA_DIR` in hPanel and click **Restart**.

---

## 9. Test that a redeploy doesn't wipe accounts

After confirming step 8:

1. Push any commit to GitHub.
2. Wait for Hostinger to redeploy (usually a few seconds).
3. SSH in again and run `npm run db-status`. The path, size and
   "Last modified" should be identical to before — your deploy did
   nothing to the database file.
4. Sign back in with the same credentials you created earlier.

---

## Updating to a new version

Just push to GitHub — Hostinger redeploys automatically. If
auto-deploy is off, click **Deploy** in hPanel's **Git** page, then
**Restart** in **Node.js**.

After upgrading dependencies (rare), click **Run NPM Install** then
**Run NPM Script → build** then **Restart**.

---

## Backups

Back up `~/ctai-data/`. That single folder contains:

- `portal.db` — every account, school, section, progress, attempt.
- `logos/` — uploaded school logos.

Hostinger's **Backups** in hPanel can include your home directory; or
SSH in periodically and `tar -czf ctai-data-$(date +%F).tar.gz
~/ctai-data` to a safe place.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Accounts vanish after every git push | `CTAI_DATA_DIR` not set, so DB is being written into the deploy folder | Set the env var to `/home/<user>/ctai-data`, restart. Verify with `npm run db-status`. |
| `npm install` fails on `better-sqlite3` | Build tools missing on shared plan | Hostinger normally bundles prebuilt binaries; if it still fails, switch Node version to 20.x and retry. As a last resort: contact support to enable build tools, or move to their VPS plan. |
| 503 / app keeps restarting | `JWT_SECRET` env var missing | Set it in hPanel → Node.js → Environment variables. |
| `next start` not found | App root or startup file misconfigured | Use the `server.js` from step 5 and set it as the startup file. |
| Build runs but the page is 404 | Auto-deploy didn't finish; `.next` missing | hPanel → Node.js → **Run NPM Script → build**, then Restart. |
| `EACCES` writing to `/home/<user>/ctai-data` | Folder owned by wrong user | `chown -R $USER:$USER ~/ctai-data`. |

---

## If Hostinger ever wipes the home directory itself

Some plans repackage the home directory on plan changes / migrations.
Two safety nets:

- Make a weekly backup as above.
- Keep `JWT_SECRET` and `CTAI_DATA_DIR` written down somewhere outside
  hPanel (a password manager) so you can rebuild quickly if needed.
