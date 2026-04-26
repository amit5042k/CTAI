# Deploying the CTAI Portal on a Synology NAS

This guide covers the recommended path: running the app as a Docker container
managed by **Container Manager** (DSM 7+) or the legacy **Docker** package
(DSM 6.x). Persistent data lives on the NAS; container rebuilds and DSM
updates do not affect login credentials.

You'll need:

- A NAS that supports Container Manager / Docker (DS220+, DS920+, DS923+,
  DS1522+, DS1821+, RS-series, and most x86-64 Plus/XS/RS models).
- DSM 7.x recommended.
- Admin access to DSM.

---

## 1. Prepare folders on the NAS

In **File Station**, create these two SEPARATE folders inside the `docker`
shared folder:

1. `/volume1/docker/ctai-app-app/` — code and Dockerfile go here.
2. `/volume1/docker/ctai-app-data/` — `portal.db` and uploaded school logos
   go here.

> **Why two folders?** Keeping the database OUTSIDE the app folder means
> `git pull` / `git clone` / "redeploy" / "delete container and recreate"
> can never wipe your accounts. The database is mounted into the
> container as a volume from `ctai-data` and is independent of the code.

---

## 2. Get the code onto the NAS

Two options. Pick whichever is easier for you.

### Option A — clone via SSH (recommended)

1. **Control Panel → Terminal & SNMP → Terminal** → tick "Enable SSH service".
2. Open Terminal on your computer and `ssh <your-dsm-user>@<nas-ip>`.
3. On the NAS:

   ```bash
   cd /volume1/docker/ctai-app
   git clone -b claude/cbse-ctai-curriculum-app-kyooB \
     https://github.com/amit5042k/ctai.git app
   ```

### Option B — upload a zip via File Station

1. On GitHub, **Code → Download ZIP** for the branch
   `claude/cbse-ctai-curriculum-app-kyooB`.
2. In **File Station**, upload the zip into `/volume1/docker/ctai-app`, right-
   click → **Extract here**, then rename the extracted folder to `app`.

You should now have `/volume1/docker/ctai-app/app/Dockerfile` etc.

---

## 3. Set the JWT secret AND the data path

1. Open **Text Editor** (DSM) on the file
   `/volume1/docker/ctai-app/app/.env` (create it).
2. Generate a long random string. On a Mac/Linux:
   `openssl rand -hex 32`. On Windows PowerShell:
   `[Convert]::ToHexString((1..32 | ForEach-Object {Get-Random -Max 256}))`
3. Save the file with these two lines:

   ```ini
   JWT_SECRET=paste-your-64-character-hex-string-here
   CTAI_DATA_PATH=/volume1/docker/ctai-data
   ```

`docker-compose.yml` reads both. `CTAI_DATA_PATH` points the container's
`/data` mount at the **separate** `ctai-data` folder you made in step 1.
Because that folder is outside the app folder, every redeploy/rebuild/
zip-extract leaves your database completely alone.

---

## 4. Build and start the container

### DSM 7 — Container Manager

1. Open **Container Manager**.
2. **Project → Create**.
3. Project name: `ctai`. Path: `/volume1/docker/ctai-app/app`.
4. Source: **Use existing docker-compose.yml**. Container Manager picks up
   the `docker-compose.yml` already in the folder.
5. Click **Next → Next → Done**. Container Manager builds the image (this
   takes 3-5 minutes the first time because it compiles `better-sqlite3`).
6. Once the project is **Running**, browse to
   `http://<nas-ip>:3000` from any device on the same network.

### DSM 6 — Docker package

DSM 6 doesn't expose a Compose UI. SSH into the NAS:

```bash
cd /volume1/docker/ctai-app/app
sudo docker compose up -d --build
```

Watch logs with:

```bash
sudo docker compose logs -f
```

---

## 5. First-time setup

1. Open `http://<nas-ip>:3000/register` once. Create the **superadmin**
   account. The page disables itself the moment a superadmin exists.
2. Sign in. Go to **Schools** → create a school (e.g. name `Sunrise Public
   School`, code `SPS-DEL`). Upload a logo.
3. Go to **School admins** → create the admin for that school.
4. Share the school's URL with the school: `http://<nas-ip>:3000/SPS-DEL`.
   The admin signs in there and starts enrolling teachers and students.

---

## 6. Optional but recommended: HTTPS via DSM Reverse Proxy

To put the portal on a friendly domain like
`https://ctai.your-nas.synology.me`:

1. In DSM, set up **DDNS** (Control Panel → External Access → DDNS) and
   request a Let's Encrypt certificate for the hostname. Synology does this
   in one click.
2. **Control Panel → Login Portal → Advanced → Reverse Proxy → Create**.
3. Configure:
   - **Description**: CTAI Portal
   - **Source — Protocol**: HTTPS, **Hostname**: `ctai.your-nas.synology.me`,
     **Port**: 443
   - **Destination — Protocol**: HTTP, **Hostname**: `localhost`,
     **Port**: 3000
4. **Custom Header tab**: tick **WebSocket** so Next.js's HMR/RSC
   streaming works (only needed if you ever toggle dev mode; harmless for
   prod).
5. Save. The portal is now reachable at the HTTPS URL.

You can now keep port 3000 closed on your router and only expose 443.

---

## 7. Updating to a new version

```bash
ssh <dsm-user>@<nas-ip>
cd /volume1/docker/ctai-app/app
git pull
sudo docker compose up -d --build
```

The SQLite database in `/volume1/docker/ctai-data/portal.db` is preserved
across every rebuild because it lives in a separate host folder mounted
into the container as `/data`. **Login credentials never reset.**

### Verify the database is alive after a redeploy

```bash
sudo docker exec ctai npm run db-status
```

That prints the path being used (`/data/portal.db`), the file size, last
modified time, and counts for schools / users / progress. Run it before
and after a redeploy to confirm the database is the same file on disk.

---

## 8. Backups

Back up `/volume1/docker/ctai-data/`. That folder contains:

- `portal.db` — every account, school, section, progress and attempt.
- `logos/` — uploaded school logos.

Synology's **Hyper Backup** can include this folder in your scheduled
backup target. You do NOT need to back up `/volume1/docker/ctai-app/`
— that's just the code, which is in git.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Build fails on `better-sqlite3` | Missing build tools | The Dockerfile already installs them; if you're not using Docker, run on the NAS shell: `apk add python3 make g++` (Alpine) or use the Docker path |
| `503` after deploy | Container restarting because `JWT_SECRET` isn't set | Set it in `/volume1/docker/ctai-app/app/.env` and restart |
| **All accounts disappear after a redeploy** | The data folder is inside the app folder and gets wiped, OR the volume isn't mounted | (1) Make sure `/volume1/docker/ctai-data` exists separately. (2) Make sure your `.env` has `CTAI_DATA_PATH=/volume1/docker/ctai-data`. (3) Run `sudo docker exec ctai npm run db-status` — the file path it reports must be `/data/portal.db` and the size > 0 |
| Can't reach `http://<nas-ip>:3000` | DSM firewall | Control Panel → Security → Firewall → allow TCP 3000 in the NAS profile |
| Port 3000 already used by another service | Port collision | Change the **left** side of `"3000:3000"` in `docker-compose.yml` to e.g. `"3100:3000"` and use `:3100` in URLs |
| `docker compose down -v` wiped everything | The `-v` flag deletes named volumes | Don't use `-v`. The bind mount to `/volume1/docker/ctai-data` is what keeps your data safe; only `down` (without `-v`) is needed to recreate the container |
