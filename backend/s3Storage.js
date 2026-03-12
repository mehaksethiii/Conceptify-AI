import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

let s3Client = null;

const getS3Client = () => {
  if (!s3Client) {
    s3Client = new S3Client({
      region: process.env.AWS_REGION || 'eu-north-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });
  }
  return s3Client;
};

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'conceptify-ai-notes';

// Save user's doubt history to S3
export const saveToS3 = async (userId, doubt, level, response) => {
  try {
    const client = getS3Client();
    const timestamp = Date.now();
    const key = `users/${userId}/history/${timestamp}.json`;
    
    const data = {
      id: timestamp,
      userId,
      doubt,
      level,
      response,
      timestamp: new Date().toISOString(),
      bookmarked: false
    };

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: JSON.stringify(data),
      ContentType: 'application/json',
      Metadata: {
        userId,
        doubt: doubt.substring(0, 100),
        level
      }
    });

    await client.send(command);
    return { success: true, key };
  } catch (error) {
    console.error('S3 Save Error:', error);
    throw error;
  }
};

// Get user's history from S3
export const getHistoryFromS3 = async (userId, limit = 50) => {
  try {
    const client = getS3Client();
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: `users/${userId}/history/`,
      MaxKeys: limit
    });

    const response = await client.send(command);
    
    if (!response.Contents || response.Contents.length === 0) {
      return [];
    }

    // Fetch each object's content
    const historyPromises = response.Contents.map(async (item) => {
      const getCommand = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: item.Key
      });
      
      const data = await client.send(getCommand);
      const bodyString = await streamToString(data.Body);
      return JSON.parse(bodyString);
    });

    const history = await Promise.all(historyPromises);
    return history.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('S3 Get Error:', error);
    return [];
  }
};

// Save bookmarked notes
export const saveBookmark = async (userId, itemId, bookmarked) => {
  try {
    const client = getS3Client();
    const key = `users/${userId}/history/${itemId}.json`;
    
    const getCommand = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    });
    
    const data = await client.send(getCommand);
    const bodyString = await streamToString(data.Body);
    const item = JSON.parse(bodyString);
    
    item.bookmarked = bookmarked;
    
    const putCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: JSON.stringify(item),
      ContentType: 'application/json'
    });
    
    await client.send(putCommand);
    return { success: true };
  } catch (error) {
    console.error('S3 Bookmark Error:', error);
    throw error;
  }
};

// Helper function to convert stream to string
const streamToString = (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });
};

// Export notes as PDF/Text to S3
export const exportNotes = async (userId, format = 'text') => {
  try {
    const history = await getHistoryFromS3(userId);
    const bookmarked = history.filter(item => item.bookmarked);
    
    let content = 'CONCEPTIFY AI - MY NOTES\n\n';
    bookmarked.forEach((item, index) => {
      content += `${index + 1}. ${item.doubt}\n`;
      content += `Level: ${item.level}\n`;
      content += `Date: ${new Date(item.timestamp).toLocaleDateString()}\n\n`;
      content += `Explanation:\n${item.response.explanation}\n\n`;
      content += `Analogy:\n${item.response.analogy}\n\n`;
      content += `Questions:\n${item.response.questions.map((q, i) => `${i+1}. ${q}`).join('\n')}\n\n`;
      content += '-'.repeat(80) + '\n\n';
    });
    
    const client = getS3Client();
    const key = `users/${userId}/exports/notes-${Date.now()}.${format}`;
    
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: content,
      ContentType: format === 'pdf' ? 'application/pdf' : 'text/plain'
    });
    
    await client.send(command);
    return { success: true, key };
  } catch (error) {
    console.error('S3 Export Error:', error);
    throw error;
  }
};
