# 🎤 Amazon Lex Setup Guide

## ⚠️ Important: Region Selection

Amazon Lex is **NOT available in all regions**. 

### ✅ Supported Regions:
- **us-east-1** (N. Virginia) - Recommended
- **us-west-2** (Oregon)
- **ap-northeast-2** (Seoul)
- **ap-southeast-1** (Singapore)
- **ap-southeast-2** (Sydney)
- **ap-northeast-1** (Tokyo)
- **ca-central-1** (Canada)
- **eu-central-1** (Frankfurt)
- **eu-west-1** (Ireland)
- **eu-west-2** (London)

### ❌ NOT Supported:
- Europe (Stockholm)
- Most other regions

---

## 🚀 Setup Steps

### Step 1: Switch to Supported Region

1. Go to AWS Console
2. Click region dropdown (top-right)
3. Select **US East (N. Virginia)** or **EU (Ireland)**
4. This is where you'll create the Lex bot

### Step 2: Create Lex Bot

1. Go to **Amazon Lex** service
2. Click **Create bot**
3. Choose **Create a blank bot**

**Bot Configuration:**
```
Bot name: ConceptifyBot
Description: AI tutor for student doubts
IAM role: Create a new role
COPPA: No
Session timeout: 5 minutes
```

### Step 3: Add Intents

#### Intent 1: AskDoubt
```
Name: AskDoubt
Sample utterances:
- Explain {doubt}
- What is {doubt}
- Tell me about {doubt}
- I have a doubt about {doubt}
- Can you explain {doubt} for {level} level

Slots:
- doubt (AMAZON.AlphaNumeric) - Required
- level (EducationLevel) - Optional

Fulfillment: Return parameters to client
```

#### Intent 2: GetHistory
```
Name: GetHistory
Sample utterances:
- Show my history
- What did I ask before
- Show last {limit} questions

Slots:
- limit (AMAZON.Number) - Optional

Fulfillment: Return parameters to client
```

#### Intent 3: BookmarkNote
```
Name: BookmarkNote
Sample utterances:
- Bookmark this
- Save this note
- Mark as favorite

Fulfillment: Return parameters to client
```

#### Intent 4: ChangeLevel
```
Name: ChangeLevel
Sample utterances:
- Change level to {level}
- Set difficulty to {level}
- I am in {level}

Slots:
- level (EducationLevel) - Required

Fulfillment: Return parameters to client
```

### Step 4: Create Slot Type

**Slot Type: EducationLevel**
```
Values:
- Nursery
- KG
- Class 1
- Class 2
- Class 3
- Class 4
- Class 5
- Class 6
- Class 7
- Class 8
- Class 9
- Class 10
- Class 11
- Class 12
- Undergraduate
- Engineering
- Medical
- Postgraduate
- JEE
- NEET
- UPSC
- SSC
- GRE
- GMAT
- CAT
```

### Step 5: Build and Test

1. Click **Build** (top-right)
2. Wait for build to complete (~2 minutes)
3. Test in console:
   - Type: "Explain photosynthesis"
   - Should recognize AskDoubt intent

### Step 6: Create Alias

1. Go to **Aliases** tab
2. Click **Create alias**
3. Name: `Production`
4. Associate with latest version
5. Copy the **Alias ID**

### Step 7: Get Bot ID

1. Go to bot settings
2. Copy the **Bot ID** (starts with a random string)

### Step 8: Update .env

```env
LEX_REGION=us-east-1
LEX_BOT_ID=YOUR_BOT_ID_HERE
LEX_BOT_ALIAS_ID=YOUR_ALIAS_ID_HERE
USE_LEX=true
```

### Step 9: Add IAM Permissions

Add to your IAM user:
```json
{
  "Effect": "Allow",
  "Action": [
    "lex:RecognizeText",
    "lex:RecognizeUtterance"
  ],
  "Resource": "arn:aws:lex:us-east-1:*:bot-alias/*/*"
}
```

### Step 10: Restart Backend

```bash
cd backend
npm run dev
```

---

## 🧪 Testing

### Test 1: Text Input
```bash
curl -X POST http://localhost:5001/api/lex/text \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"text": "Explain recursion", "sessionId": "test123"}'
```

### Test 2: In App
1. Login to app
2. Type: "Explain photosynthesis for Class 9 level"
3. Lex should recognize intent and extract slots
4. App generates explanation

---

## 💡 Alternative: Use Without Lex

If you don't want to set up Lex, the app works fine with:
- **Browser Web Speech API** for voice input
- **Direct text processing** without intent recognition

Just keep `USE_LEX=false` in `.env`

---

## 🎯 Benefits of Using Lex

### With Lex:
- Natural language understanding
- Intent recognition
- Multi-turn conversations
- Context awareness
- Slot extraction

### Without Lex (Browser API):
- Simple speech-to-text
- No intent recognition
- Single-turn only
- No context

---

## 📊 Cost

**Amazon Lex Pricing:**
- First 10,000 requests/month: FREE
- After that: $0.004 per text request
- Voice requests: $0.004 per request

**For 1000 students:**
- 5 requests/day = 150,000/month
- Cost: ~$0.56/month (after free tier)

Very affordable! 💰

---

## 🐛 Troubleshooting

### Error: "Bot not found"
- Check BOT_ID is correct
- Ensure bot is built
- Verify region matches

### Error: "Access denied"
- Add Lex permissions to IAM user
- Check credentials are correct

### Error: "Region not supported"
- Switch to us-east-1 or eu-west-1
- Update LEX_REGION in .env

---

## 📝 Quick Setup (Minimum)

If you want to skip Lex for now:

1. Keep `USE_LEX=false` in `.env`
2. App uses browser Speech API instead
3. Still works great for voice input!
4. Add Lex later when needed

---

**For Hackathon Demo:**
- Show Lex integration code ✅
- Explain benefits ✅
- Mention it's optional ✅
- Demo works without it ✅
