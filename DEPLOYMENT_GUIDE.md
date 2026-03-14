# Deployment Guide for Conceptify AI

## Deploy Backend to Render (Free)

### Step 1: Sign up for Render
1. Go to https://render.com
2. Sign up with GitHub account
3. Authorize Render to access your repositories

### Step 2: Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your repository: `mehaksethiii/Conceptify-AI`
3. Configure the service:
   - **Name**: `conceptify-ai-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`

### Step 3: Add Environment Variables
Click **"Environment"** and add these variables:

```
AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
PORT=5001
JWT_SECRET=conceptify_ai_super_secret_jwt_key_2024_hackathon
S3_BUCKET_NAME=conceptify-ai-notes
USE_S3=true
LEX_BOT_ID=conceptify-bot
LEX_BOT_ALIAS_ID=TSTALIASID
USE_LEX=false
LEX_REGION=us-east-1
USE_DEMO_MODE=true
FRONTEND_URL=*
```

**Note:** After deploying frontend, come back and update `FRONTEND_URL` to your Vercel URL for better security.

### Step 4: Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Copy your backend URL (e.g., `https://conceptify-ai-backend.onrender.com`)

---

## Deploy Frontend to Vercel (Free)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy Frontend
```bash
cd frontend
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → `conceptify-ai`
- **Directory?** → `./` (current directory)
- **Override settings?** → No

### Step 4: Add Environment Variable
After deployment, go to Vercel dashboard:
1. Select your project
2. Go to **Settings** → **Environment Variables**
3. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: Your Render backend URL (e.g., `https://conceptify-ai-backend.onrender.com`)

### Step 5: Redeploy
```bash
vercel --prod
```

---

## Alternative: Deploy Both to Render

If you prefer to deploy both on Render:

### Frontend on Render:
1. Create another Web Service
2. **Root Directory**: `frontend`
3. **Build Command**: `npm install && npm run build`
4. **Start Command**: `npm run preview`
5. Add environment variable: `VITE_API_URL=https://your-backend-url.onrender.com`

---

## Update Frontend API Calls

After deployment, update `frontend/src/App.jsx` to use the backend URL:

```javascript
// At the top of App.jsx
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Update axios default
axios.defaults.baseURL = API_URL;
```

---

## Test Your Deployment

1. **Backend Health Check**: 
   - Visit: `https://your-backend-url.onrender.com/api/health`
   - Should return: `{"status":"ok"}`

2. **S3 Test**:
   - Visit: `https://your-backend-url.onrender.com/api/test-s3`
   - Should return: `{"status":"working",...}`

3. **Frontend**:
   - Visit your Vercel URL
   - Try logging in with: `student@demo.com` / `demo123`
   - Ask a question and verify it works

---

## Important Notes

⚠️ **Free Tier Limitations:**
- Render free tier: Backend sleeps after 15 min of inactivity (takes 30s to wake up)
- Vercel free tier: Unlimited bandwidth for personal projects
- Both have generous free limits for hackathons

🔒 **Security:**
- Never commit `.env` file to GitHub (already in `.gitignore`)
- Environment variables are set in Render/Vercel dashboards
- AWS credentials are safe in environment variables

📝 **For Judges:**
- Provide both URLs in your hackathon submission
- Mention the 30s cold start time for Render free tier
- Demo account: `student@demo.com` / `demo123`

---

## Your Live URLs (After Deployment)

- **Frontend**: https://conceptify-ai.vercel.app (or your custom domain)
- **Backend**: https://conceptify-ai-backend.onrender.com
- **GitHub**: https://github.com/mehaksethiii/Conceptify-AI

---

## Troubleshooting

**Backend not responding:**
- Check Render logs for errors
- Verify all environment variables are set
- Wait 30s for cold start on free tier

**Frontend can't connect to backend:**
- Check CORS settings in backend
- Verify `VITE_API_URL` is set correctly
- Check browser console for errors

**S3 not working:**
- Verify AWS credentials in Render environment variables
- Check bucket region matches `AWS_REGION`
- Test with `/api/test-s3` endpoint
