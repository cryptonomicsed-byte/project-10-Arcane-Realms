# Arcane Realms - Setup Guide

## Project Structure

Your new **Arcane Realms** project is ready at `/arcane-realms/`

Complete with:
- ✅ 20 predefined fantasy characters
- ✅ Solo adventure mode
- ✅ Multiplayer quest system (room-based)
- ✅ Character selection/creation
- ✅ API credential management (creator only)
- ✅ Firebase real-time sync
- ✅ Support for OpenAI, Claude, Gemini, Ollama
- ✅ Responsive dark-themed UI

## 1. Install Dependencies

```bash
cd /data/data/com.termux/files/home/arcane-realms
npm install
```

This installs:
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Firebase SDK
- And all peer dependencies

**Tip**: First install can take 1-2 minutes. Subsequent installs are instant.

## 2. Configure Firebase

### Get Firebase Credentials
1. Go to https://console.firebase.google.com/
2. Create a new project (or use existing)
3. Create a Firestore database (free tier is fine)
4. Go to Project Settings → Service Accounts
5. Click "Generate New Private Key"
6. Copy the config data

### Set Environment Variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in:
```
NEXT_PUBLIC_FIREBASE_API_KEY=abc123...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc123
```

## 3. Configure LLM (Optional for Demo)

For actual AI narration, add one of:

**OpenAI:**
```
NEXT_PUBLIC_Z_API_KEY=sk-proj-...
```
Get key: https://platform.openai.com/api-keys

**Anthropic (Claude):**
```
NEXT_PUBLIC_Z_API_KEY=sk-ant-...
```
Get key: https://console.anthropic.com/

**Google (Gemini):**
```
NEXT_PUBLIC_Z_API_KEY=AIza...
```
Get key: https://makersuite.google.com/app/apikey

**Ollama (Local - Free):**
```bash
# Install from https://ollama.ai
# Run: ollama serve
# Then: ollama pull mistral
```
No API key needed for Ollama.

## 4. Start Development Server

```bash
npm run dev
```

Server starts at: **http://localhost:3000**

You'll see:
```
 ✓ Ready in 2.5s
  ➜  Local:   http://localhost:3000
```

## 5. Test the App

### Solo Adventure (No API Key)
1. Click "Solo Adventure"
2. Select any of the 20 characters
3. Play through narrated scenarios

### Create Multiplayer Quest (Requires API Key)
1. Click "Create Quest"
2. Select AI provider (OpenAI, Claude, Gemini, or Ollama)
3. Paste your API key
4. Get room code (e.g., ABC123)
5. Share code with friends

### Join Quest
1. Ask a friend for their room code
2. Click "Join Quest"
3. Enter code
4. Choose character or create custom one
5. Play together in real-time

## Project Files

```
/arcane-realms/
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind theming
├── next.config.mjs           # Next.js config
├── postcss.config.js         # PostCSS plugins
├── .env.local.example        # Environment template
├── README.md                 # Feature documentation
├── SETUP.md                  # This file
│
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main menu (/)
│   ├── globals.css          # Global styles
│   ├── solo/
│   │   └── page.tsx         # Solo game page
│   └── room/[code]/
│       └── page.tsx         # Multiplayer room
│
├── components/              # React components
│   ├── CharacterSelector.tsx    # Choose character
│   ├── CreateRoom.tsx           # Create multiplayer quest
│   ├── JoinRoom.tsx             # Join quest with code
│   ├── JoinGameRoom.tsx         # Character selection before joining
│   ├── SoloGame.tsx             # Solo adventure UI
│   └── MultiplayerGame.tsx      # Multiplayer game UI
│
└── lib/                     # Utilities
    ├── characters.ts        # 20 character definitions
    ├── firebase.ts          # Firebase initialization
    └── llm.ts              # LLM API integration
```

## Features Explained

### 1. Character System
- **20 Predefined**: Warrior, Ranger, Wizard, Rogue, Cleric, etc.
- **Custom**: Players can create their own with any name
- Each has: class, race, backstory, 4 unique skills
- Characters persist in party during game session

### 2. Solo Adventure
- Single player with AI DM
- Choose from 20 characters
- Type actions → AI narrates response
- No multiplayer, no API key needed for demo

### 3. Room-Based Multiplayer
- **Creator**: Enters API credentials once
- **Players**: Just select character, no credentials
- **Sync**: Real-time Firestore updates
- **Party**: All actions visible to all players
- **Code**: 6-character room codes (e.g., ABC123)

### 4. AI Integration
- **Room Creator** provides API key
- Supports 4 providers:
  - OpenAI (GPT-4)
  - Anthropic (Claude)
  - Google (Gemini)
  - Ollama (Free, local)
- Narration generated per action

## Common Issues

### "npm install" taking too long?
```bash
# Use faster package manager
npm install -g pnpm
pnpm install
```

### Firebase not connecting?
- Check `.env.local` has correct keys
- Verify Firestore database exists
- Check Firebase rules allow reads/writes

### LLM calls failing?
- Verify API key is correct
- Check rate limits haven't been hit
- For Ollama, ensure `ollama serve` is running

### Port 3000 already in use?
```bash
npm run dev -- -p 3001  # Use port 3001 instead
```

## Production Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Docker
```bash
docker build -t arcane-realms .
docker run -p 3000:3000 -e NEXT_PUBLIC_FIREBASE_API_KEY=xxx arcane-realms
```

### Environment Variables for Production
Set all `.env.local` variables in:
- Vercel: Project Settings → Environment Variables
- Docker: Use `-e` flags or .env file
- Other: Platform-specific dashboard

## Next Steps

1. **Get Firebase credentials** (5 min)
2. **Configure .env.local** (2 min)
3. **Run `npm install`** (1-2 min)
4. **Start with `npm run dev`** (1 min)
5. **Test solo mode first** (no API needed)
6. **Add API key to test multiplayer** (optional)

## Support

- **Docs**: See README.md for feature overview
- **Issues**: Check Firebase console and browser console for errors
- **Questions**: Review component comments and lib/llm.ts for integration

---

**Ready to play?**

```bash
npm run dev
```

Then visit: http://localhost:3000

The tale awaits!
