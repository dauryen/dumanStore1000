# Deployment

This project now supports persistent server-side product storage for hosting.

## Required environment variables

- `DUMAN_ADMIN_PASSWORD`: admin password used for the hidden admin panel.
- `DUMAN_DATA_DIR`: folder where `products.json` will be stored.

You can also use `DUMAN_PRODUCTS_FILE` if you want to set an exact file path.

## Render

Files already prepared:

- `render.yaml`
- server health endpoint: `/api/health`

Steps:

1. Push this project to GitHub.
2. In Render, create a new Blueprint or Web Service from the repo.
3. Make sure the service uses the values from `render.yaml`.
4. Set `DUMAN_ADMIN_PASSWORD` in Render secrets.
5. Deploy.

Important:

- Persistent product storage requires the attached disk.
- The disk in `render.yaml` is mounted to `/var/data`.
- The app stores admin-added products in `/var/data/products.json`.

## Railway

Steps:

1. Push this project to GitHub.
2. In Railway, create a new project from the repo.
3. Add these environment variables:
   - `DUMAN_ADMIN_PASSWORD=your-secret-password`
   - `DUMAN_DATA_DIR=/var/data`
4. Add a Volume and mount it to `/var/data`.
5. Deploy the service.

Recommended runtime commands:

- Build: `npm run build`
- Start: `npm run start`

Important:

- Without a mounted volume, admin-added products can be lost after restart or redeploy.
- With the mounted volume, clients will see the same shared catalog products added by admin.

## Local production run

```powershell
npm run build
npm run start
```

Then open `http://127.0.0.1:4173`.
