#!/bin/bash

echo "🚀 Starting Conceptify AI..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Start both servers
echo "🔥 Starting backend and frontend..."
npm run dev
