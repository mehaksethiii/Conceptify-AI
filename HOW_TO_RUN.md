# 🚀 How to Run Conceptify AI

## Quick Start (5 minutes)

### Step 1: Install Backend Dependencies
Open terminal in the project folder:

```bash
cd backend
npm install
```

Wait for installation to complete (~1-2 minutes)

---

### Step 2: Start Backend Server
In the same terminal:

```bash
npm run dev
```

You should see:
```
Server running on http://localhost:5001
```

✅ Keep this terminal open!

---

### Step 3: Install Frontend Dependencies
Open a NEW terminal (keep backend running):

```bash
cd frontend
npm install
```

Wait for installation to complete (~1-2 minutes)

---

### Step 4: Start Frontend
In the same terminal:

```bash
npm run dev
```

You should see:
```
Local: http://localhost:3000
```

---

### Step 5: Open in Browser
Open your browser and go to:
```
http://localhost:3000
```

---

## 🎉 You're Ready!

### Login Options:

**Option 1: Demo Account (Fastest)**
- Email: `student@demo.com`
- Password: `demo123`
- Click "Demo Login" button

**Option 2: Create New Account**
- Click "Sign Up" tab
- Enter your name, email, password
- Click "Sign Up"

---

## 🧪 Test the App

### Test 1: Basic Question
1. Type: "explain photosynthesis"
2. Select level: "Class 6-8 (Middle School)"
3. Click "Get Explanation"
4. See explanation, analogy, and questions!

### Test 2: Voice Input
1. Click "🎤 Voice Input" button
2. Say: "explain recursion"
3. Text appears automatically
4. Click "Get Explanation"

### Test 3: Text-to-Speech
1. After getting explanation
2. Click "🔊 Listen" button
3. Explanation reads aloud!

### Test 4: Dark Mode
1. Click moon icon (top-right)
2. App switches to dark theme
3. Click sun icon to switch back

### Test 5: History
1. Click "📚 History" (bottom-left)
2. See all your past questions
3. Click any to reload it

### Test 6: Dashboard
1. Click "📊 Dashboard" (bottom-right)
2. See your learning stats
3. View streak and progress

---

## 🐛 Troubleshooting

### Backend won't start?

**Error: "Port 5001 already in use"**
```bash
# Kill the process using port 5001
# Windows:
netstat -ano | findstr :5001
taskkill /PID <PID_NUMBER> /F

# Then restart:
npm run dev
```

**Error: "Cannot find module"**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
npm run dev
```

---

### Frontend won't start?

**Error: "Port 3000 already in use"**
```bash
# Kill the process
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Then restart:
npm run dev
```

**Error: "Cannot connect to backend"**
- Make sure backend is running on port 5001
- Check backend terminal for errors

---

### Login not working?

**"Failed to get explanation"**
- This is normal in demo mode
- The app works with mock responses
- Try these questions that work:
  - "explain photosynthesis"
  - "explain recursion"
  - "what is stack overflow"
  - "explain gravity"
  - "what is water cycle"

---

## 📝 Sample Questions That Work

Copy and paste these to test:

**Elementary:**
- what is multiplication
- explain the water cycle

**Middle School:**
- what is photosynthesis
- explain gravity

**High School:**
- explain newton's third law
- what is quadratic equation

**Engineering:**
- explain recursion
- what is stack overflow
- what is big o notation

**Medical:**
- explain cardiac cycle

**Competitive:**
- solve integration by parts

---

## 🎨 Features to Try

### 1. Voice Input
- Click "🎤 Voice Input"
- Speak clearly
- Works in Chrome/Edge

### 2. Text-to-Speech
- Get an explanation first
- Click "🔊 Listen"
- Explanation reads aloud

### 3. Dark Mode
- Click moon icon (top-right)
- Theme switches instantly
- Preference saved

### 4. History
- Click "📚 History" (bottom-left)
- View past questions
- Click to reload
- Star to bookmark

### 5. Dashboard
- Click "📊 Dashboard" (bottom-right)
- See total questions
- View learning streak
- Check level breakdown

### 6. Share
- Get an explanation
- Click "🔗 Share"
- Share on social media
- Or click "📥 Download"

### 7. Difficulty Meter
- Select different levels
- Watch meter change
- Color indicates difficulty

---

## 🔧 Advanced Setup (Optional)

### Enable Real AWS (Amazon Nova)

1. Make sure you have AWS credentials in `backend/.env`
2. Edit `backend/server.js` line 62:
   ```javascript
   const isDemoMode = false; // Change from true
   ```
3. Restart backend
4. Now uses real Amazon Nova AI!

### Enable Image Upload (Textract)

1. Add Textract permissions to AWS IAM
2. Set `isDemoMode=false` (same as above)
3. Upload images - text extracted automatically!

### Enable Cloud Storage (S3)

1. Create S3 bucket: `conceptify-ai-notes`
2. Edit `backend/.env`:
   ```
   USE_S3=true
   ```
3. Restart backend
4. History saves to cloud!

---

## 📱 Access URLs

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5001
- **Backend Health:** http://localhost:5001/api/health

---

## 🛑 How to Stop

### Stop Frontend
- Go to frontend terminal
- Press `Ctrl + C`
- Type `Y` if asked

### Stop Backend
- Go to backend terminal
- Press `Ctrl + C`
- Type `Y` if asked

---

## 🔄 Restart

If you make changes to code:

**Backend changes:**
```bash
# In backend terminal
Ctrl + C
npm run dev
```

**Frontend changes:**
```bash
# In frontend terminal
Ctrl + C
npm run dev
```

---

## 💡 Tips

1. **Keep both terminals open** while using the app
2. **Use Chrome or Edge** for best experience (voice features)
3. **Try demo login first** to test quickly
4. **Check sample questions** if something doesn't work
5. **Refresh browser** if UI looks broken

---

## 🎯 Quick Commands Reference

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev          # Start server

# Frontend
cd frontend
npm install          # Install dependencies
npm run dev          # Start dev server

# Both
Ctrl + C             # Stop server
```

---

## ✅ Success Checklist

- [ ] Backend running on port 5001
- [ ] Frontend running on port 3000
- [ ] Can open http://localhost:3000
- [ ] Can login with demo account
- [ ] Can ask a question
- [ ] Can see explanation
- [ ] Voice input works
- [ ] Dark mode works
- [ ] History panel opens
- [ ] Dashboard shows stats

---

**Need Help?** Check the error message in the terminal and refer to the Troubleshooting section above.

**Everything Working?** Great! Now explore all the features! 🎉
