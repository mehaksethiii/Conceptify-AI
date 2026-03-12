# 🚀 AWS Services Integration - Conceptify AI

## ✅ Currently Integrated Amazon Services

### 1. **Amazon Bedrock Runtime** ⭐ ACTIVE
**Purpose:** AI-powered explanations using Nova Micro model

**Implementation:**
```javascript
// backend/server.js
const bedrockClient = new BedrockRuntimeClient({...});
const command = new InvokeModelCommand({
  modelId: 'amazon.nova-micro-v1:0',
  ...
});
```

**Features:**
- Generates explanations
- Creates real-life analogies
- Produces practice questions
- Adapts to student level

**Status:** ✅ Fully implemented and working (demo mode active)

---

### 2. **Amazon Textract** 📸 READY
**Purpose:** Extract text from uploaded images

**Implementation:**
```javascript
// backend/server.js
const textractClient = new TextractClient({...});
const command = new DetectDocumentTextCommand({
  Document: { Bytes: image.buffer }
});
```

**Features:**
- Read printed text from images
- Extract handwritten notes
- Process diagrams with labels
- Support PNG, JPEG, PDF

**Status:** ✅ Code implemented, disabled in demo mode

---

### 3. **Amazon S3** ☁️ NEW!
**Purpose:** Cloud storage for user notes and history

**Implementation:**
```javascript
// backend/s3Storage.js
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
```

**Features:**
- Save doubt history to cloud
- Bookmark favorite explanations
- Export notes as text/PDF
- Sync across devices
- Backup user data

**Files:**
- `backend/s3Storage.js` - S3 operations
- Bucket structure: `users/{userId}/history/{timestamp}.json`

**Status:** ✅ Fully implemented, optional (set `USE_S3=true`)

---

### 4. **Amazon Lex** 🎤 NEW!
**Purpose:** Advanced voice interaction and conversational AI

**Implementation:**
```javascript
// backend/lexIntegration.js
import { LexRuntimeV2Client, RecognizeTextCommand } from '@aws-sdk/client-lex-runtime-v2';
```

**Features:**
- Natural language understanding
- Intent recognition (AskDoubt, GetHistory, Bookmark)
- Voice command processing
- Multi-turn conversations
- Context awareness

**Intents:**
- `AskDoubt` - "Explain photosynthesis"
- `GetHistory` - "Show my last 10 questions"
- `BookmarkNote` - "Save this note"
- `ChangeLevel` - "Change to BTech level"

**Status:** ✅ Fully implemented, optional (set `USE_LEX=true`)

---

## 📊 Service Comparison

| Service | Purpose | Status | Cost Impact |
|---------|---------|--------|-------------|
| **Bedrock (Nova)** | AI Explanations | ✅ Active | Low |
| **Textract** | Image OCR | ✅ Ready | Medium |
| **S3** | Cloud Storage | ✅ Ready | Very Low |
| **Lex** | Voice AI | ✅ Ready | Low |

---

## 🔧 Configuration

### Environment Variables (.env)

```env
# AWS Credentials
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret

# Amazon Bedrock (Nova)
# Always enabled

# Amazon Textract
# Enable by setting isDemoMode=false in server.js

# Amazon S3
S3_BUCKET_NAME=conceptify-ai-notes
USE_S3=true  # Set to true to enable

# Amazon Lex
LEX_BOT_ID=your_bot_id
LEX_BOT_ALIAS_ID=TSTALIASID
USE_LEX=true  # Set to true to enable
```

---

## 🎯 Feature Matrix

### What's Using What:

| Feature | Browser API | AWS Service |
|---------|-------------|-------------|
| **AI Explanations** | - | ✅ Bedrock Nova |
| **Voice Input (Basic)** | ✅ Web Speech API | - |
| **Voice Input (Advanced)** | - | ✅ Lex |
| **Text-to-Speech** | ✅ Speech Synthesis | - |
| **Image Upload** | - | ✅ Textract |
| **History (Local)** | ✅ LocalStorage | - |
| **History (Cloud)** | - | ✅ S3 |
| **Bookmarks** | ✅ LocalStorage | ✅ S3 (optional) |
| **Export Notes** | ✅ Download API | ✅ S3 |

---

## 🚀 How to Enable Each Service

### 1. Enable Amazon Bedrock (Already Active)
```bash
# Already configured and working in demo mode
# To use real AWS:
# 1. Add AWS credentials to .env
# 2. Set isDemoMode=false in server.js
# 3. Restart backend
```

### 2. Enable Amazon Textract
```bash
# 1. Add Textract permissions to IAM user
# 2. Set isDemoMode=false in server.js
# 3. Upload images - text will be extracted automatically
```

### 3. Enable Amazon S3
```bash
# 1. Create S3 bucket: conceptify-ai-notes
# 2. Add S3 permissions to IAM user
# 3. Set USE_S3=true in .env
# 4. Restart backend
# History will now save to cloud
```

### 4. Enable Amazon Lex
```bash
# 1. Create Lex bot in AWS Console
# 2. Configure intents (see lexIntegration.js for config)
# 3. Add Lex permissions to IAM user
# 4. Set LEX_BOT_ID and USE_LEX=true in .env
# 5. Restart backend
# Voice commands will use Lex
```

---

## 💰 Cost Estimation (Monthly)

### For 1000 Students:

**Amazon Bedrock (Nova Micro):**
- 10 questions/student/day = 300,000 requests/month
- Cost: ~$15-30/month

**Amazon Textract:**
- 2 images/student/day = 60,000 pages/month
- Cost: ~$90/month

**Amazon S3:**
- 1MB/student = 1GB storage
- Cost: ~$0.02/month

**Amazon Lex:**
- 5 voice commands/student/day = 150,000 requests/month
- Cost: ~$60/month

**Total:** ~$165-180/month for 1000 active students

---

## 📝 API Endpoints

### Bedrock (Nova)
```
POST /api/explain
- Generates AI explanation
- Uses: Amazon Bedrock Nova Micro
```

### Textract
```
POST /api/explain (with image)
- Extracts text from image
- Then generates explanation
- Uses: Amazon Textract + Bedrock
```

### S3
```
GET /api/history
- Retrieves user history from S3

POST /api/bookmark
- Saves bookmark to S3

GET /api/export-notes
- Exports notes from S3
```

### Lex
```
POST /api/lex/text
- Process text through Lex
- Returns intent and action

POST /api/lex/voice
- Process voice through Lex
- Returns transcript and action
```

---

## 🎬 Demo Flow with All Services

### Scenario 1: Text Question
1. User types: "Explain photosynthesis"
2. **Bedrock Nova** generates explanation
3. **S3** saves to cloud history
4. User sees result

### Scenario 2: Image Question
1. User uploads textbook photo
2. **Textract** extracts text
3. **Bedrock Nova** generates explanation
4. **S3** saves to cloud
5. User sees result

### Scenario 3: Voice Question (Basic)
1. User clicks voice button
2. **Browser Speech API** transcribes
3. **Bedrock Nova** generates explanation
4. **Browser TTS** reads aloud
5. **S3** saves to cloud

### Scenario 4: Voice Question (Advanced with Lex)
1. User speaks: "Explain recursion for BTech level"
2. **Lex** recognizes intent and extracts slots
3. **Bedrock Nova** generates explanation
4. **S3** saves to cloud
5. **Lex** responds with confirmation

---

## 🔒 IAM Permissions Required

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": "arn:aws:bedrock:*:*:model/amazon.nova-micro-v1:0"
    },
    {
      "Effect": "Allow",
      "Action": [
        "textract:DetectDocumentText",
        "textract:AnalyzeDocument"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::conceptify-ai-notes",
        "arn:aws:s3:::conceptify-ai-notes/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "lex:RecognizeText",
        "lex:RecognizeUtterance"
      ],
      "Resource": "arn:aws:lex:*:*:bot-alias/*/*"
    }
  ]
}
```

---

## 📈 Scalability

### Current Architecture:
- **Bedrock:** Auto-scales, no limits
- **Textract:** 100 pages/second limit
- **S3:** Unlimited storage
- **Lex:** 10,000 requests/second

### For 10,000+ Students:
- Add CloudFront CDN
- Use Lambda for serverless scaling
- Implement caching (Redis)
- Add DynamoDB for faster queries

---

## 🎯 Hackathon Highlights

### What Makes This Special:

1. **4 AWS Services** integrated (Bedrock, Textract, S3, Lex)
2. **Hybrid approach** (Browser APIs + AWS)
3. **Graceful fallbacks** (works without AWS)
4. **Cost-optimized** (optional cloud features)
5. **Production-ready** (error handling, security)

### Demo Points:
- Show code for each AWS service
- Explain why each service was chosen
- Demonstrate cost-effectiveness
- Highlight scalability

---

## 📚 Documentation

- `backend/server.js` - Main server with Bedrock & Textract
- `backend/s3Storage.js` - S3 operations
- `backend/lexIntegration.js` - Lex voice AI
- `backend/auth.js` - JWT authentication
- `backend/qrAuth.js` - QR code 2FA

---

**Built for Amazon Nova Hackathon** 🏆
**Using: Bedrock Nova Micro + Textract + S3 + Lex**
