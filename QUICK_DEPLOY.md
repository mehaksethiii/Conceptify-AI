# Quick Deploy Instructions

## 1️⃣ Deploy Backend (5 minutes)

1. Go to https://render.com and sign up with GitHub
2. Click **New +** → **Web Service**
3. Select repository: `mehaksethiii/Conceptify-AI`
4. Settings:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Add all environment variables from `backend/.env`
6. Click **Create Web Service**
7. **Copy your backend URL** (e.g., `https://conceptify-ai-backend.onrender.com`)

## 2️⃣ Deploy Frontend (3 minutes)

### Option A: Vercel (Recommended)
```bash
cd frontend
npm install -g vercel
vercel login
vercel
```

When prompted, accept defaults. After deployment:
1. Go to Vercel dashboard
2. Settings → Environment Variables
3. Add: `VITE_API_URL` = `https://your-backend-url.onrender.com`
4. Redeploy: `vercel --prod`

### Option B: Render
1. Create another Web Service on Render
2. Root Directory: `frontend`
3. Build Command: `npm install && npm run build`
4. Start Command: `npm run preview`
5. Add env var: `VITE_API_URL=https://your-backend-url.onrender.com`

## 3️⃣ Test

- Backend: `https://your-backend-url.onrender.com/api/health`
- Frontend: `https://your-frontend-url.vercel.app`
- Login: `student@demo.com` / `demo123`

## Done! 🎉

Share these URLs with judges:
- Live App: `https://your-frontend-url.vercel.app`
- GitHub: `https://github.com/mehaksethiii/Conceptify-AI`
