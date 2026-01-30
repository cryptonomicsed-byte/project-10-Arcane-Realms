#!/bin/bash

echo "🎭 Starting Arcane Realms..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies (this takes 1-2 minutes)..."
  npm install
fi

echo ""
echo "🚀 Starting dev server on http://localhost:3000"
echo ""
echo "   - Solo Adventure: Play with predefined characters"
echo "   - Create Quest: Start a multiplayer game (requires API key)"
echo "   - Join Quest: Enter a room code to join friends"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
