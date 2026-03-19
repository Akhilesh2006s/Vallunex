# Subdomain Setup (VI + CC)

This workspace contains:

- Main landing app: `E:/Vallunex` (or `E:/Vallunex/VI` in the parallel copy)
- VI/AFS app: `E:/Vallunex/Vallunex CC/AFS`
- CC app: `E:/Vallunex/Vallunex CC/CC`

## 1) Local development ports

- Landing app: `http://localhost:8080`
- VI/AFS app: `http://localhost:8081`
- CC app: `http://localhost:8082`

Run each app in a separate terminal:

```powershell
cd E:\Vallunex
npm run dev
```

```powershell
cd "E:\Vallunex\Vallunex CC\AFS"
npm run dev
```

```powershell
cd "E:\Vallunex\Vallunex CC\CC"
npm run dev
```

## 2) Landing links to subdomains

Set these values in the landing app `.env`:

```env
VITE_VI_APP_URL=https://vi.domain.com
VITE_CC_APP_URL=https://cc.domain.com
```

Then rebuild/redeploy the landing app.

## 3) CC app handoff to VI/AFS

When users choose AFS from CC, CC redirects to `VITE_VI_APP_URL`.

Set this in `E:/Vallunex/Vallunex CC/CC/.env`:

```env
VITE_VI_APP_URL=https://vi.domain.com
```

## 4) DNS / hosting mapping

Create DNS records:

- `vi.domain.com` -> host serving `AFS` build output
- `cc.domain.com` -> host serving `CC` build output

Configure both hosts for SPA fallback to `index.html`.
