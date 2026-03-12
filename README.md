# 🔥 Conceptify AI - Doubt-to-Concept Visual Tutor

An AI-powered educational assistant that converts student doubts into crystal clear concepts with explanations, analogies, and practice questions.

## Problem Statement
Students struggle with understanding difficult concepts due to lack of instant doubt resolution and overly complex explanations.

## Solution
Conceptify AI provides:
- ✅ Simple explanations adapted to student level
- 💡 Real-life analogies
- ✍️ 3 practice questions per concept
- 📸 Image-based doubt solving (coming soon)
- 📚 History storage (coming soon)

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **AI**: Amazon Bedrock (Nova Micro)
- **Future**: Amazon Textract, S3, Lex

## Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Add your AWS credentials to .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:3000

## AWS Configuration
1. Create AWS account
2. Enable Amazon Bedrock access
3. Get access keys from IAM
4. Add credentials to backend/.env

## Features (MVP)
- [x] Text-based doubt input
- [x] AI explanation generation
- [x] Real-life analogies
- [x] 3 practice questions
- [x] Adaptive explanation levels (Class 9 / BTech / Competitive)
- [ ] Image upload for question solving
- [ ] History storage
- [ ] Voice interaction
Conceptify AI – Making our doubts into crystal clear concepts:  An AI-powered educational assistant that converts student doubts into clear, structured explanations with analogies and practice questions.

Problem Statement
Students often struggle with understanding difficult concepts due to:
Lack of instant doubt resolution
Overly complex explanations
No adaptive explanation levels

Conceptify AI solves this by providing:
Simple explanations
Real-life examples
Practice questions
Image-based doubt solving

Features for (MVP)

Text-based doubt input
AI explanation generation
Real-life analogies
3 practice questions
Image upload for question solving
History storage
