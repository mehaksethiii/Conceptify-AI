# Testing Guide for Judges 🎯

## Quick Start (5 minutes)

### Prerequisites
- Node.js 18+ installed
- Git installed
- AWS credentials (provided in submission)

### Setup
```bash
# Clone repository
git clone https://github.com/mehaksethiii/Conceptify-AI
cd Conceptify-AI

# Install dependencies
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Start backend (Terminal 1)
cd backend
npm run dev

# Start frontend (Terminal 2)
cd frontend
npm run dev
```

### Access
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5001

---

## Demo Account
- **Email**: `student@demo.com`
- **Password**: `demo123`

---

## Testing Checklist ✅

### 1. Authentication (2 minutes)
- [ ] Open http://localhost:3000
- [ ] Login with demo account
- [ ] Verify welcome message shows user name
- [ ] Click "Logout" and verify redirect to login

### 2. Core Functionality (3 minutes)
Test these sample questions:

**Elementary Level:**
- [ ] "What is a circle?"
- [ ] "Explain the water cycle"
- [ ] "Why do we need water?"

**High School Level:**
- [ ] "Explain Newton's third law"
- [ ] "What is a quadratic equation?"
- [ ] "Explain gravity"

**Engineering Level:**
- [ ] "Explain recursion"
- [ ] "What is stack overflow?"
- [ ] "Explain big o notation"

**Medical Level:**
- [ ] "Explain the cardiac cycle"

**General Topics:**
- [ ] "What is photosynthesis?"
- [ ] "Explain Python programming"
- [ ] "What is DNA?"
- [ ] "Explain democracy"

**Verify each response includes:**
- ✅ Clear explanation
- ✅ Real-life analogy
- ✅ 3 practice questions

### 3. Education Levels (1 minute)
- [ ] Change level dropdown to different options
- [ ] Verify 15 levels available (Nursery to PhD)
- [ ] Submit same question at different levels

### 4. Advanced Features (5 minutes)

**Dark Mode:**
- [ ] Click moon/sun icon in top-right
- [ ] Verify theme switches
- [ ] Check readability in both modes

**Voice Input:**
- [ ] Click microphone icon
- [ ] Allow microphone permission
- [ ] Speak a question
- [ ] Verify text appears in input box

**Text-to-Speech:**
- [ ] After getting a response, click speaker icon
- [ ] Verify audio plays
- [ ] Click again to stop

**History:**
- [ ] Click "📚 History" button
- [ ] Verify past questions appear
- [ ] Click on a history item
- [ ] Verify it loads that question/answer
- [ ] Close history panel

**Dashboard:**
- [ ] Click "📊 Dashboard" button
- [ ] Verify stats show:
  - Questions asked count
  - Day streak
  - Levels explored
  - Bookmarked items
- [ ] Close dashboard panel

**Difficulty Meter:**
- [ ] Change education level
- [ ] Verify difficulty meter updates
- [ ] Check color changes (green → yellow → red)

**Share/Download:**
- [ ] After getting response, click "Share" button
- [ ] Verify share options appear
- [ ] Click "Download as Text"
- [ ] Verify file downloads

### 5. AWS Integration (2 minutes)

**S3 Storage Test:**
- [ ] Visit: http://localhost:5001/api/test-s3
- [ ] Verify response: `{"status":"working",...}`
- [ ] Check backend console for S3 logs
- [ ] Ask a question and verify S3 save message in console

**Backend Health:**
- [ ] Visit: http://localhost:5001/api/health
- [ ] Verify response: `{"status":"ok"}`

### 6. Persistence (1 minute)
- [ ] Ask 3-4 questions
- [ ] Refresh the page (F5)
- [ ] Click "History" button
- [ ] Verify all questions are saved
- [ ] Verify login session persists

---

## Expected Behavior

### ✅ What Should Work:
- Login/logout with demo account
- 21+ topics with detailed responses
- All 15 education levels
- Dark mode toggle
- Voice input (requires microphone)
- Text-to-speech
- History saves locally (localStorage)
- Dashboard shows accurate stats
- S3 cloud backup (if AWS credentials provided)
- Responsive design (works on mobile)

### ⚠️ Known Limitations:
- Mock responses (not real AI) - by design for demo reliability
- Amazon Nova integration disabled (rate limits)
- Amazon Textract disabled (cost savings)
- Amazon Lex disabled (uses browser Speech API instead)
- Voice input requires HTTPS in production (works on localhost)

---

## Performance Benchmarks

**Expected Response Times:**
- Login: < 500ms
- Question submission: < 100ms (mock responses)
- History load: < 50ms (localStorage)
- Dashboard render: < 100ms
- S3 save: < 1s (background, doesn't block UI)

**Browser Compatibility:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

---

## Troubleshooting

### Backend won't start:
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Frontend won't start:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port already in use:
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5001
npx kill-port 5001
```

### S3 not working:
- Check `.env` file has AWS credentials
- Verify `USE_S3=true`
- Check backend console for errors
- S3 failure doesn't break app (graceful fallback)

---

## Code Quality Check

### Architecture:
- ✅ Clean separation: Frontend (React) + Backend (Node.js)
- ✅ RESTful API design
- ✅ JWT authentication
- ✅ Environment variables for config
- ✅ Error handling and fallbacks

### Security:
- ✅ Password hashing (bcrypt)
- ✅ JWT tokens
- ✅ CORS configured
- ✅ Environment variables for secrets
- ✅ .env not in git

### AWS Integration:
- ✅ S3 for cloud storage
- ✅ Bedrock SDK integrated (Nova)
- ✅ Textract SDK integrated
- ✅ Lex SDK integrated
- ✅ Proper error handling

---

## Scoring Criteria

### Functionality (40 points)
- [ ] Login/Authentication works (10)
- [ ] Questions get answered (10)
- [ ] Multiple education levels (5)
- [ ] History and Dashboard (10)
- [ ] Advanced features (5)

### AWS Integration (30 points)
- [ ] S3 storage working (15)
- [ ] AWS SDK properly integrated (10)
- [ ] Environment configuration (5)

### User Experience (20 points)
- [ ] Clean, modern UI (10)
- [ ] Responsive design (5)
- [ ] Dark mode (5)

### Code Quality (10 points)
- [ ] Clean code structure (5)
- [ ] Documentation (3)
- [ ] Error handling (2)

---

## Questions for Developers

If you have questions during evaluation:

1. **Why mock responses instead of real AI?**
   - Ensures 100% reliability for demo
   - Avoids AWS rate limits during judging
   - Shows understanding of fallback patterns
   - Real Nova integration exists but disabled

2. **Why is S3 the only AWS service enabled?**
   - Textract costs money per request
   - Nova has rate limits
   - Lex requires complex bot setup
   - S3 is free tier and reliable

3. **Can this scale to production?**
   - Yes! Just enable Nova in `.env`
   - S3 already handles cloud storage
   - JWT auth is production-ready
   - Add rate limiting and caching

---

## Demo Script (3 minutes)

**For live presentation:**

1. **Login** (15 sec)
   - "Here's our authentication system with JWT tokens"
   - Login with demo account

2. **Ask Question** (30 sec)
   - "Let me ask about recursion at Engineering level"
   - Show explanation, analogy, and practice questions

3. **Show Features** (60 sec)
   - Toggle dark mode
   - Use voice input
   - Play text-to-speech
   - Open History panel
   - Open Dashboard with stats

4. **AWS Integration** (45 sec)
   - Show S3 test endpoint
   - Explain cloud storage
   - Show backend console with S3 logs

5. **Different Levels** (30 sec)
   - Ask same question at Nursery level
   - Ask at PhD level
   - Show how responses adapt

---

## Contact

For technical questions during evaluation:
- GitHub: https://github.com/mehaksethiii/Conceptify-AI
- Issues: https://github.com/mehaksethiii/Conceptify-AI/issues

---

## Thank You! 🙏

Thank you for taking the time to evaluate Conceptify AI. We've built this with:
- ❤️ Passion for education
- 🚀 Modern web technologies
- ☁️ AWS cloud services
- 🎨 Great user experience

We hope you enjoy testing it as much as we enjoyed building it!
