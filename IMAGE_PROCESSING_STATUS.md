# Image Processing Status

## ✅ ENABLED - Amazon Textract Integration

Amazon Textract is now **ACTIVE** and ready to process images!

### How It Works:
1. Upload an image (photo of textbook, notes, diagram, etc.)
2. Textract extracts all text from the image
3. The extracted text is sent to Amazon Nova Micro
4. Nova generates an explanation based on your education level

### Supported Formats:
- PNG, JPEG, JPG
- Maximum file size: 5MB
- Works with: textbook pages, handwritten notes, diagrams with text, screenshots

### To Use:
1. Click "Choose File" button in the app
2. Select an image from your computer
3. Select your education level
4. Click "Get Explanation"
5. Textract will extract the text and Nova will explain it!

### Configuration:
- **Status**: ✅ ACTIVE
- **Region**: eu-north-1 (Stockholm)
- **Demo Mode**: Disabled (`USE_DEMO_MODE=false`)
- **IAM Permissions**: AmazonTextractFullAccess ✅

### Cost Considerations:
- Textract charges per page processed
- First 1,000 pages/month are free (AWS Free Tier)
- After that: ~$1.50 per 1,000 pages
- For hackathon demo: Very minimal cost

### Troubleshooting:
If Textract fails:
1. Check IAM permissions (AmazonTextractFullAccess)
2. Verify AWS credentials in `.env`
3. Check image format and size
4. Look at backend console for error messages

### To Disable (if needed):
Set `USE_DEMO_MODE=true` in `backend/.env` to use mock responses instead.
