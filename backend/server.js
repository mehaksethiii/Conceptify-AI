import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { TextractClient, DetectDocumentTextCommand } from '@aws-sdk/client-textract';
import { mockResponses } from './mockResponses.js';
import { registerUser, loginUser, generateToken, authenticateToken, getUserByEmail } from './auth.js';
import { saveToS3, getHistoryFromS3, saveBookmark, exportNotes } from './s3Storage.js';
import { lexConversation } from './lexIntegration.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const upload = multer({ storage: multer.memoryStorage() });

// CORS configuration - allow requests from Vercel frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const textractClient = new TextractClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const user = await registerUser(email, password, name);
    const token = generateToken(user);
    
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await loginUser(email, password);
    const token = generateToken(user);
    
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.get('/api/auth/qr-setup', authenticateToken, async (req, res) => {
  try {
    const { generateQRCode } = await import('./qrAuth.js');
    const qrData = await generateQRCode(req.user.email);
    res.json(qrData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/qr-verify', async (req, res) => {
  try {
    const { email, token } = req.body;
    const { verifyQRToken } = await import('./qrAuth.js');
    
    const isValid = await verifyQRToken(email, token);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid QR code' });
    }

    const { getUserByEmail } = await import('./auth.js');
    const user = await getUserByEmail(email);
    const authToken = generateToken(user);
    
    res.json({ user, token: authToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// S3 Storage routes
app.get('/api/history', authenticateToken, async (req, res) => {
  try {
    const useS3 = process.env.USE_S3 === 'true';
    
    if (useS3) {
      const history = await getHistoryFromS3(req.user.email);
      res.json({ history, source: 's3' });
    } else {
      // Fallback to localStorage (client-side)
      res.json({ history: [], source: 'local', message: 'Using client-side storage' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/bookmark', authenticateToken, async (req, res) => {
  try {
    const { itemId, bookmarked } = req.body;
    const useS3 = process.env.USE_S3 === 'true';
    
    if (useS3) {
      await saveBookmark(req.user.email, itemId, bookmarked);
      res.json({ success: true, source: 's3' });
    } else {
      res.json({ success: true, source: 'local' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/export-notes', authenticateToken, async (req, res) => {
  try {
    const format = req.query.format || 'text';
    const result = await exportNotes(req.user.email, format);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lex voice assistant routes
app.post('/api/lex/text', authenticateToken, async (req, res) => {
  try {
    const { text, sessionId } = req.body;
    const result = await lexConversation(req.user.email, text, sessionId, false);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/lex/voice', authenticateToken, upload.single('audio'), async (req, res) => {
  try {
    const { sessionId } = req.body;
    const audioBuffer = req.file.buffer;
    const result = await lexConversation(req.user.email, audioBuffer, sessionId, true);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Protected route - requires authentication
app.post('/api/explain', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    let { doubt, level } = req.body;
    const image = req.file;

    // Use mock responses only - reliable for hackathon demo
    const doubtLower = doubt.toLowerCase();
    let key = 'default';
    
    // Check for keywords in the doubt
    if (doubtLower.includes('circle')) key = 'circle';
    else if (doubtLower.includes('water') && (doubtLower.includes('need') || doubtLower.includes('why'))) key = 'water';
    else if (doubtLower.includes('multipl')) key = 'multiplication';
    else if (doubtLower.includes('water') && doubtLower.includes('cycle')) key = 'water cycle';
    else if (doubtLower.includes('photo')) key = 'photosynthesis';
    else if (doubtLower.includes('gravity')) key = 'gravity';
    else if (doubtLower.includes('newton')) key = 'newton';
    else if (doubtLower.includes('quadratic')) key = 'quadratic';
    else if (doubtLower.includes('recurs')) key = 'recursion';
    else if (doubtLower.includes('stack')) key = 'stack overflow';
    else if (doubtLower.includes('big o')) key = 'big o';
    else if (doubtLower.includes('cardiac')) key = 'cardiac cycle';
    else if (doubtLower.includes('integrat')) key = 'integration';
    else if (doubtLower.includes('python')) key = 'python';
    else if (doubtLower.includes('mitochondria')) key = 'mitochondria';
    else if (doubtLower.includes('democracy')) key = 'democracy';
    else if (doubtLower.includes('algorithm')) key = 'algorithm';
    else if (doubtLower.includes('climate')) key = 'climate';
    else if (doubtLower.includes('dna')) key = 'dna';
    else if (doubtLower.includes('electric')) key = 'electricity';
    else if (doubtLower.includes('shakespeare')) key = 'shakespeare';
    
    const response = mockResponses[key] || mockResponses['default'];
    
    // Save to S3 if enabled
    const useS3 = process.env.USE_S3 === 'true';
    if (useS3) {
      try {
        await saveToS3(req.user.email, doubt, level, response);
      } catch (err) {
        console.log('S3 Save Error:', err);
        console.log('S3 save failed, continuing...');
      }
    }
    
    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate explanation' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Test S3 connection (no auth required)
app.get('/api/test-s3', async (req, res) => {
  try {
    const useS3 = process.env.USE_S3 === 'true';
    
    if (!useS3) {
      return res.json({ 
        status: 'disabled', 
        message: 'S3 is disabled in .env (USE_S3=false)',
        bucket: process.env.S3_BUCKET_NAME,
        region: process.env.AWS_REGION
      });
    }

    // Try to save a test file
    const testData = {
      test: true,
      timestamp: new Date().toISOString(),
      message: 'S3 connection test successful!'
    };

    await saveToS3('test@conceptify.ai', 'S3 Connection Test', 'Test', testData);
    
    res.json({ 
      status: 'working', 
      message: 'S3 is connected and working! ✅',
      bucket: process.env.S3_BUCKET_NAME,
      region: process.env.AWS_REGION
    });
  } catch (error) {
    res.json({ 
      status: 'error', 
      message: error.message,
      bucket: process.env.S3_BUCKET_NAME,
      region: process.env.AWS_REGION,
      hint: 'Check AWS credentials and bucket region'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
