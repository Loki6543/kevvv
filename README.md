# StellaOS — Quick Package & Netlify Deploy

This repository contains `make_zip.py` which generates a ready-to-deploy `stella-os.zip` containing a Next.js 14 (standalone) PWA scaffold described in `aegis.txt`.

## Generate the ZIP

Run (Windows PowerShell):

```bash
python make_zip.py
```

That writes `stella-os.zip` into the current folder.

## Inspect / extract

Unzip the archive and inspect the generated project:

```bash
# Extract
unzip stella-os.zip -d stella-os
cd stella-os
```

## Local build & test

Install and build locally (Node >= 18 recommended):

```bash
npm install
npm run build
npm run start
```

- `npm run build` uses the `next` standalone output.
- `npm run start` runs the standalone server produced by Next.js.

## Netlify Deployment

Two common options:

- Manual / Quick (not recommended for SSR standalone): drag-and-drop in Netlify Sites works only for static sites. For this Next.js standalone app use the Git integration below.

- Recommended: Connect repository to Netlify (GitHub/GitLab/Bitbucket)

1. Push the project folder to a remote repo (GitHub recommended).

```bash
git init
git add .
git commit -m "Add stella-os scaffold"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. In Netlify: Site -> New site -> Import from Git -> choose your repo.

3. Configure build settings in the Netlify UI (or let `netlify.toml` be used):

- Build command: `npm run build`
- Publish directory: `.next/standalone/.next`

4. Ensure `netlify.toml` is present (this repo already includes one) and the plugin `@netlify/plugin-nextjs` is referenced there.

5. Add required static assets to `public/` (not included in the zip):
- `public/icon-192.png`
- `public/icon-512.png`

6. Deploy. Netlify will run the build and deploy the standalone Next.js output.

Notes:
- If Netlify build fails due to Node version, set the `NODE_VERSION` or `engines.node` in `package.json` or the Netlify UI to Node 18+.
- The `publish` path targets the Next.js standalone output; keep it exactly as above.

## Files of interest

- `make_zip.py` — generates `stella-os.zip`
- `netlify.toml` — Netlify build/plugin config
- `next.config.mjs` — Next.js configured with `output: 'standalone'`
- `app/manifest.ts` and `public/` — PWA assets (ensure icons exist)

## Want me to continue?

- I can push the generated project to a new Git repo in your workspace and create a minimal `.gitignore`.
- Or I can run `python make_zip.py` here and create the extracted folder for you.

Tell me which action you'd like next.