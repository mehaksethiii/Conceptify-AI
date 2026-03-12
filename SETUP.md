# 🚀 Quick Setup Guide - Conceptify AI

## What's Been Built (100% MVP Complete)

### ✅ Backend (3 files)
- `server.js` - Express API with Amazon Bedrock integration
- `package.json` - Dependencies (Express, AWS SDK, CORS)
- `.env.example` - AWS configuration template

### ✅ Frontend (6 files)
- `App.jsx` - Main UI component with form and response display
- `App.css` - Beautiful gradient styling
- `main.jsx` - React entry point
- `index.html` - HTML template
- `package.json` - Dependencies (React, Vite, Axios)
- `vite.config.js` - Dev server with proxy

### ✅ Features Implemented
- Text-based doubt input ✓
- AI explanation generation (Amazon Bedrock Nova Micro) ✓
- Real-life analogies ✓
- 3 practice questions ✓
- Adaptive explanation levels (Class 9/BTech/Competitive) ✓
- Image upload UI (ready for Textract) ✓

---

## 🏃 How to Run

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure AWS Credentials
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your AWS credentials:
# AWS_REGION=us-east-1
# AWS_ACCESS_KEY_ID=your_key_here
# AWS_SECRET_ACCESS_KEY=your_secret_here
# PORT=5000
```

### Step 3: Start Backend Server
```bash
npm run dev
```
Backend will run on: http://localhost:5000

### Step 4: Install Frontend Dependencies (New Terminal)
```bash
cd frontend
npm install
```

### Step 5: Start Frontend
```bash
npm run dev
```
Frontend will run on: http://localhost:3000

---

## 🧪 Test the App

1. Open browser: http://localhost:3000
2. Enter a doubt: "Explain stack overflow in simple way"
3. Select level: BTech
4. Click "Get Explanation"
5. See: Explanation + Analogy + 3 Practice Questions

---

## 🔑 Getting AWS Credentials

1. Go to AWS Console: https://console.aws.amazon.com
2. Navigate to IAM → Users → Create User
3. Attach policy: `AmazonBedrockFullAccess`
4. Create Access Key → Copy credentials to `.env`
5. Enable Bedrock in your region (us-east-1 recommended)

---

## 📦 What's Missing (Future Features)

- [ ] Image processing with Amazon Textract
- [ ] History storage with Amazon S3
- [ ] Voice interaction with Amazon Lex
- [ ] Visual diagram generation

---

## 🐛 Troubleshooting

**Backend won't start?**
- Check if AWS credentials are correct in `.env`
- Verify Bedrock is enabled in your AWS region

**Frontend can't connect?**
- Make sure backend is running on port 5000
- Check browser console for errors

**AWS errors?**
- Verify IAM permissions for Bedrock
- Check AWS region matches in `.env`
