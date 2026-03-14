# Deploy to Replit - Step by Step Guide

## 🚀 Quick Deploy (5 minutes)

### Step 1: Create Replit Account
1. Go to https://replit.com
2. Click **"Sign up"**
3. Sign up with GitHub (easiest) or email
4. **No credit card required!** ✅

### Step 2: Import Your Project
1. Click **"+ Create Repl"**
2. Select **"Import from GitHub"**
3. Paste your repo URL: `https://github.com/mehaksethiii/Conceptify-AI`
4. Click **"Import from GitHub"**
5. Wait for import to complete (1-2 minutes)

### Step 3: Add Environment Variables (Secrets)
1. In Replit, click the **"Secrets"** tab (🔒 icon on left sidebar)
2. Click **"+ New Secret"** for each variable below:

**Add these 13 secrets:**

| Key | Value |
|-----|-------|
| `AWS_REGION` | `eu-north-1` |
| `AWS_ACCESS_KEY_ID` | `YOUR_AWS_ACCESS_KEY_ID` |
| `AWS_SECRET_ACCESS_KEY` | `YOUR_AWS_SECRET_ACCESS_KEY` |
| `PORT` | `5001` |
| `JWT_SECRET` | `conceptify_ai_super_secret_jwt_key_2024_hackathon` |
| `S3_BUCKET_NAME` | `conceptify-ai-notes` |
| `USE_S3` | `true` |
| `LEX_BOT_ID` | `conceptify-bot` |
| `LEX_BOT_ALIAS_ID` | `TSTALIASID` |
| `USE_LEX` | `false` |
| `LEX_REGION` | `us-east-1` |
| `USE_DEMO_MODE` | `true` |
| `FRONTEND_URL` | `*` |

### Step 4: Install Dependencies
In the Replit Shell (bottom panel), run:
```bash
npm install
npm run install:all
```

### Step 5: Run the App
Click the big green **"Run"** button at the top!

Replit will:
- Install all dependencies
- Start backend on port 5001
- Start frontend on port 3000
- Open a preview window

### Step 6: Get Your Live URL
1. After running, you'll see a preview window
2. Click the **"Open in new tab"** icon (↗️)
3. Your URL will be like: `https://conceptify-ai.username.repl.co`
4. **Copy this URL** - this is your live app!

### Step 7: Test Your App
1. Visit your Replit URL
2. Login with: `student@demo.com` / `demo123`
3. Ask a question: "Explain recursion"
4. Check History and Dashboard work
5. Test S3: Visit `https://your-url.repl.co/api/test-s3`

---

## 🎉 You're Done!

**Share these with judges:**
- **Live App**: `https://your-app.username.repl.co`
- **GitHub**: `https://github.com/mehaksethiii/Conceptify-AI`
- **Demo Login**: `student@demo.com` / `demo123`

---

## Important Notes

### ✅ Advantages of Replit:
- No credit card required
- Free tier is generous
- Both frontend and backend in one place
- Easy to share and demo
- Always-on URL (doesn't sleep like Render)
- Built-in code editor

### ⚠️ Free Tier Limitations:
- Repl goes to sleep after 1 hour of inactivity
- Takes 10-20 seconds to wake up on first request
- Limited to 0.5 GB RAM
- Shared CPU

### 💡 Tips:
- Keep the Replit tab open during judging to prevent sleep
- Mention the wake-up time to judges if needed
- The app works perfectly once awake!

---

## Troubleshooting

### "Command not found" error:
```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### Backend not starting:
- Check all 13 secrets are added
- Check Shell for error messages
- Restart the Repl

### Frontend can't connect to backend:
- Both should start automatically
- Check Console for errors
- Verify ports 3000 and 5001 are running

### S3 not working:
- Verify AWS secrets are correct
- Check backend logs in Shell
- Test endpoint: `/api/test-s3`

---

## Alternative: Keep Repl Always Awake

If you want to prevent sleep during hackathon judging:

### Option 1: UptimeRobot (Free)
1. Go to https://uptimerobot.com
2. Sign up (free)
3. Add monitor for your Replit URL
4. Pings every 5 minutes to keep it awake

### Option 2: Keep Tab Open
- Just keep your Replit tab open in browser
- Repl stays awake while you're viewing it

---

## Making Changes

If you need to update code:

1. **Edit in Replit**: Make changes directly in Replit editor
2. **Or push from local**: 
   ```bash
   git add .
   git commit -m "Update"
   git push origin main
   ```
3. In Replit, click **"Pull"** button to get latest code
4. Click **"Run"** again

---

## Success Checklist ✅

Your deployment is successful when:
- ✅ Replit shows "Server running on http://localhost:5001"
- ✅ Frontend loads in preview window
- ✅ Can login with demo account
- ✅ Questions get answered
- ✅ History and Dashboard work
- ✅ `/api/test-s3` returns "working"
- ✅ No errors in Console

**You're ready for the hackathon! 🚀**

---

## Sample Questions for Demo

Show judges these working examples:
- "Explain recursion"
- "What is photosynthesis?"
- "Explain Newton's third law"
- "What is DNA?"
- "Explain Python programming"
- "What is the water cycle?"
- "Explain big o notation"
- "What is democracy?"

All 21+ topics work perfectly with mock responses!
