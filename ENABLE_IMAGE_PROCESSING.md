# 🖼️ How to Enable Image Processing

Currently, image upload is **disabled in demo mode** to avoid AWS costs. Here's how to enable it:

---

## Current Status

✅ **UI Ready:** File upload button works  
✅ **Backend Ready:** Textract code implemented  
✅ **AWS SDK:** Installed and configured  
❌ **Processing:** Disabled (demo mode active)

---

## Steps to Enable

### Step 1: Add Textract Permissions to AWS IAM

1. Go to AWS Console → IAM → Users
2. Click on your user: `conceptify-ai-user`
3. Click "Add permissions" → "Attach policies directly"
4. Search for: `AmazonTextractFullAccess`
5. Check the box and click "Add permissions"

---

### Step 2: Enable Image Processing in Code

Edit `backend/server.js` line 62:

**Change from:**
```javascript
const isDemoMode = true; // Force demo mode to avoid rate limits
```

**Change to:**
```javascript
const isDemoMode = false; // Enable real AWS processing
```

---

### Step 3: Restart Backend

```bash
cd backend
npm run dev
```

---

## How It Works

Once enabled:

1. **User uploads image** (photo of textbook question, handwritten note, diagram)
2. **Frontend sends** image to backend as FormData
3. **Amazon Textract** extracts text from image:
   ```javascript
   const textractCommand = new DetectDocumentTextCommand({
     Document: { Bytes: image.buffer }
   });
   ```
4. **Extracted text** becomes the "doubt" input
5. **Amazon Nova Micro** generates explanation
6. **Response** sent back to user

---

## Supported Image Types

- **PNG** - Screenshots, diagrams
- **JPEG/JPG** - Photos from phone
- **PDF** - Scanned documents (first page only)
- **TIFF** - High-quality scans

**Max size:** 5MB per image

---

## Example Use Cases

### 1. Textbook Question
- Take photo of physics problem
- Upload to app
- Textract reads: "Explain Newton's third law"
- Nova generates explanation

### 2. Handwritten Note
- Student writes: "What is photosynthesis?"
- Takes photo
- App reads handwriting and explains

### 3. Diagram with Labels
- Upload water cycle diagram
- Textract reads labels
- Nova explains the process

---

## Testing Image Processing

### Test 1: Printed Text
1. Take screenshot of this text: "Explain recursion"
2. Upload to app
3. Select level: Engineering
4. Should extract text and explain recursion

### Test 2: Handwritten
1. Write on paper: "What is gravity?"
2. Take clear photo
3. Upload to app
4. Should read handwriting and explain

---

## Cost Considerations

**Amazon Textract Pricing:**
- First 1 million pages/month: $1.50 per 1,000 pages
- For testing: ~$0.0015 per image
- 100 test images = $0.15

**Amazon Nova Micro Pricing:**
- Very low cost per request
- Combined cost for demo: < $1

---

## Why It's Disabled Now

We're in demo mode because:
1. You hit AWS rate limits earlier
2. Avoiding additional costs during development
3. Demo responses work without AWS calls

---

## For Hackathon Demo

### Option 1: Show Code (No AWS Cost)
- Show Textract integration in `server.js` lines 40-58
- Explain how it works
- Show UI accepting images
- Mention: "Disabled to avoid costs, but fully implemented"

### Option 2: Enable for Live Demo
- Follow steps above
- Upload real image during presentation
- Show live text extraction + explanation
- More impressive but costs ~$0.01 per demo

---

## Troubleshooting

### Error: "Access Denied"
- Add `AmazonTextractFullAccess` to IAM user

### Error: "Invalid image format"
- Use PNG, JPEG, or PDF only
- Check file size < 5MB

### Error: "Could not extract text"
- Image quality too low
- Text too small or blurry
- Try clearer photo

---

## Summary

**To enable image processing:**
1. Add Textract permissions in AWS IAM
2. Set `isDemoMode = false` in server.js
3. Restart backend
4. Upload images!

**Current state:** Fully implemented, temporarily disabled for demo mode.
