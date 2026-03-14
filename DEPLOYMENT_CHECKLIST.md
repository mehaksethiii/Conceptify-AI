# Deployment Checklist ✅

## Before You Start
- [ ] Push latest code to GitHub
- [ ] Have AWS credentials ready (from `.env` file)
- [ ] Create accounts on Render.com and Vercel.com

---

## Backend Deployment (Render)

### Setup (5 minutes)
- [ ] Go to https://render.com
- [ ] Sign up with GitHub
- [ ] Click **New +** → **Web Service**
- [ ] Select repo: `mehaksethiii/Conceptify-AI`

### Configuration
- [ ] Root Directory: `backend`
- [ ] Build Command: `npm install`
- [ ] Start Command: `node server.js`
- [ ] Instance Type: **Free**

### Environment Variables (Copy from your `.env`)
- [ ] AWS_REGION=eu-north-1
- [ ] AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
- [ ] AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
- [ ] PORT=5001
- [ ] JWT_SECRET=conceptify_ai_super_secret_jwt_key_2024_hackathon
- [ ] S3_BUCKET_NAME=conceptify-ai-notes
- [ ] USE_S3=true
- [ ] LEX_BOT_ID=conceptify-bot
- [ ] LEX_BOT_ALIAS_ID=TSTALIASID
- [ ] USE_LEX=false
- [ ] LEX_REGION=us-east-1
- [ ] USE_DEMO_MODE=true
- [ ] FRONTEND_URL=*

### Deploy & Test
- [ ] Click **Create Web Service**
- [ ] Wait 5-10 minutes for build
- [ ] Copy backend URL (e.g., `https://conceptify-ai-backend.onrender.com`)
- [ ] Test: Visit `https://your-backend-url.onrender.com/api/health`
- [ ] Should see: `{"status":"ok"}`
- [ ] Test S3: Visit `https://your-backend-url.onrender.com/api/test-s3`
- [ ] Should see: `{"status":"working",...}`

**✅ Backend URL:** `_________________________________`

---

## Frontend Deployment (Vercel)

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login
```bash
vercel login
```
- [ ] Complete login in browser

### Deploy
```bash
cd frontend
vercel
```

Answer prompts:
- [ ] Set up and deploy? → **Yes**
- [ ] Which scope? → **Your account**
- [ ] Link to existing project? → **No**
- [ ] Project name? → **conceptify-ai** (or your choice)
- [ ] Directory? → **./** (press Enter)
- [ ] Override settings? → **No**

### Add Environment Variable
- [ ] Go to Vercel dashboard: https://vercel.com/dashboard
- [ ] Select your project
- [ ] Go to **Settings** → **Environment Variables**
- [ ] Add variable:
  - Name: `VITE_API_URL`
  - Value: Your Render backend URL (from above)
  - Environment: **Production, Preview, Development**
- [ ] Click **Save**

### Redeploy with Environment Variable
```bash
vercel --prod
```

### Test
- [ ] Copy frontend URL (e.g., `https://conceptify-ai.vercel.app`)
- [ ] Visit the URL in browser
- [ ] Try login: `student@demo.com` / `demo123`
- [ ] Ask a question (e.g., "Explain recursion")
- [ ] Verify response appears
- [ ] Check History and Dashboard work

**✅ Frontend URL:** `_________________________________`

---

## Final Steps

### Update Backend CORS (Optional - for better security)
- [ ] Go back to Render dashboard
- [ ] Select your backend service
- [ ] Go to **Environment**
- [ ] Update `FRONTEND_URL` from `*` to your Vercel URL
- [ ] Save changes (will auto-redeploy)

### Test Full Integration
- [ ] Login works
- [ ] Questions get answered
- [ ] History saves
- [ ] Dashboard shows stats
- [ ] S3 saves data (check backend logs)
- [ ] Voice input works
- [ ] Text-to-speech works
- [ ] Dark mode toggles

---

## Share with Judges 🎉

**Your Live URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`
- GitHub: `https://github.com/mehaksethiii/Conceptify-AI`

**Demo Account:**
- Email: `student@demo.com`
- Password: `demo123`

**Sample Questions to Try:**
- "Explain recursion"
- "What is photosynthesis?"
- "Explain Newton's third law"
- "What is DNA?"
- "Explain Python programming"

---

## Troubleshooting

### Backend Issues
- **Build fails**: Check Render logs, verify all dependencies in package.json
- **Environment variables missing**: Double-check all variables are added
- **Health check fails**: Wait 30 seconds (cold start on free tier)

### Frontend Issues
- **Can't connect to backend**: Verify `VITE_API_URL` is set correctly
- **CORS errors**: Check backend `FRONTEND_URL` allows your Vercel domain
- **Build fails**: Run `npm run build` locally first to test

### Integration Issues
- **Login fails**: Check backend logs, verify JWT_SECRET is set
- **S3 not working**: Verify AWS credentials, check bucket region
- **Questions not answered**: Check backend logs for errors

---

## Important Notes

⚠️ **Free Tier Limitations:**
- Render: Backend sleeps after 15 min inactivity (30s wake time)
- First request after sleep will be slow - this is normal!
- Mention this to judges in your submission

🔒 **Security:**
- Never share your AWS credentials publicly
- `.env` file is not in GitHub (already in `.gitignore`)
- All secrets are in Render/Vercel environment variables

📱 **Mobile Friendly:**
- App works on mobile browsers
- Voice input requires HTTPS (works on Vercel)

---

## Success Criteria ✅

Your deployment is successful when:
- ✅ Frontend loads without errors
- ✅ Can login with demo account
- ✅ Questions get answered with mock responses
- ✅ History and Dashboard work
- ✅ S3 test endpoint returns "working"
- ✅ No CORS errors in browser console

**You're ready for the hackathon! 🚀**
