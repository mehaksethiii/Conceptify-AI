import { LexRuntimeV2Client, RecognizeTextCommand, RecognizeUtteranceCommand } from '@aws-sdk/client-lex-runtime-v2';

const lexClient = new LexRuntimeV2Client({
  region: process.env.LEX_REGION || 'us-east-1', // Use separate region for Lex
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const BOT_ID = process.env.LEX_BOT_ID || 'conceptify-bot';
const BOT_ALIAS_ID = process.env.LEX_BOT_ALIAS_ID || 'TSTALIASID';
const LOCALE_ID = 'en_US';

// Process text input through Lex
export const processTextWithLex = async (userId, text, sessionId) => {
  try {
    const command = new RecognizeTextCommand({
      botId: BOT_ID,
      botAliasId: BOT_ALIAS_ID,
      localeId: LOCALE_ID,
      sessionId: sessionId || userId,
      text: text
    });

    const response = await lexClient.send(command);
    
    return {
      intent: response.sessionState?.intent?.name,
      slots: response.sessionState?.intent?.slots,
      messages: response.messages?.map(m => m.content),
      sessionState: response.sessionState
    };
  } catch (error) {
    console.error('Lex Text Error:', error);
    throw error;
  }
};

// Process voice input through Lex
export const processVoiceWithLex = async (userId, audioBuffer, sessionId) => {
  try {
    const command = new RecognizeUtteranceCommand({
      botId: BOT_ID,
      botAliasId: BOT_ALIAS_ID,
      localeId: LOCALE_ID,
      sessionId: sessionId || userId,
      requestContentType: 'audio/x-l16; sample-rate=16000; channel-count=1',
      inputStream: audioBuffer
    });

    const response = await lexClient.send(command);
    
    // Parse response
    const transcript = response.inputTranscript;
    const intent = response.sessionState?.intent?.name;
    
    return {
      transcript,
      intent,
      confidence: response.sessionState?.intent?.confirmationState,
      messages: response.messages
    };
  } catch (error) {
    console.error('Lex Voice Error:', error);
    throw error;
  }
};

// Intent handlers
export const handleLexIntent = async (intent, slots) => {
  switch (intent) {
    case 'AskDoubt':
      return {
        action: 'explain',
        doubt: slots?.doubt?.value?.interpretedValue,
        level: slots?.level?.value?.interpretedValue || 'Class 9-10'
      };
      
    case 'GetHistory':
      return {
        action: 'history',
        limit: slots?.limit?.value?.interpretedValue || 10
      };
      
    case 'BookmarkNote':
      return {
        action: 'bookmark',
        noteId: slots?.noteId?.value?.interpretedValue
      };
      
    case 'ChangeLevel':
      return {
        action: 'changeLevel',
        level: slots?.level?.value?.interpretedValue
      };
      
    case 'RepeatExplanation':
      return {
        action: 'repeat'
      };
      
    default:
      return {
        action: 'unknown',
        message: 'I didn\'t understand that. Try asking a question or saying "help".'
      };
  }
};

// Lex bot conversation flow
export const lexConversation = async (userId, input, sessionId, isVoice = false) => {
  try {
    // Process through Lex
    const lexResponse = isVoice 
      ? await processVoiceWithLex(userId, input, sessionId)
      : await processTextWithLex(userId, input, sessionId);
    
    // Handle intent
    const action = await handleLexIntent(
      lexResponse.intent,
      lexResponse.slots
    );
    
    return {
      ...action,
      lexMessages: lexResponse.messages,
      transcript: lexResponse.transcript
    };
  } catch (error) {
    console.error('Lex Conversation Error:', error);
    return {
      action: 'error',
      message: 'Voice assistant temporarily unavailable. Please type your question.'
    };
  }
};

// Sample Lex bot configuration (for AWS Console)
export const getLexBotConfig = () => {
  return {
    botName: 'ConceptifyBot',
    description: 'AI tutor bot for student doubts',
    intents: [
      {
        name: 'AskDoubt',
        sampleUtterances: [
          'Explain {doubt}',
          'What is {doubt}',
          'Tell me about {doubt}',
          'I have a doubt about {doubt}',
          'Can you explain {doubt} for {level} level'
        ],
        slots: [
          { name: 'doubt', type: 'AMAZON.AlphaNumeric', required: true },
          { name: 'level', type: 'EducationLevel', required: false }
        ]
      },
      {
        name: 'GetHistory',
        sampleUtterances: [
          'Show my history',
          'What did I ask before',
          'Show last {limit} questions'
        ],
        slots: [
          { name: 'limit', type: 'AMAZON.Number', required: false }
        ]
      },
      {
        name: 'BookmarkNote',
        sampleUtterances: [
          'Bookmark this',
          'Save this note',
          'Mark as favorite'
        ]
      },
      {
        name: 'ChangeLevel',
        sampleUtterances: [
          'Change level to {level}',
          'Set difficulty to {level}',
          'I am in {level}'
        ],
        slots: [
          { name: 'level', type: 'EducationLevel', required: true }
        ]
      }
    ],
    slotTypes: [
      {
        name: 'EducationLevel',
        values: [
          'Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
          'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12',
          'Undergraduate', 'Engineering', 'Medical', 'Postgraduate',
          'JEE', 'NEET', 'UPSC', 'SSC', 'GRE', 'GMAT', 'CAT'
        ]
      }
    ]
  };
};
