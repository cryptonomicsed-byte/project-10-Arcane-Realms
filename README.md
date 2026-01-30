# Arcane Realms - Multiplayer AI Dungeon Master

A dynamic multiplayer D&D companion with AI-powered narration. One player creates a quest and provides API credentials, while others join with predefined or custom characters.

## Features

- **Solo Adventure Mode**: Play with 20+ predefined characters narrated by AI
- **Multiplayer Quests**: Room-based gameplay with shared narratives
- **Character System**: 20 predefined characters + custom character creation
- **API Flexibility**: Support for OpenAI, Claude, Gemini, or local Ollama
- **Real-time Sync**: Firebase Firestore for instant game state updates
- **Responsive Design**: Works on desktop, tablet, and mobile

## Quick Start

### Prerequisites
- Node.js 18+
- Firebase account
- LLM API key (OpenAI, Anthropic, Google, or Ollama)

### Setup

1. **Clone & Install**
```bash
cd arcane-realms
npm install
```

2. **Configure Environment**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:
- Firebase config (from Firebase Console)
- LLM API key (used by room creator only)

3. **Run Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000`

## Usage

### Solo Adventure
1. Click "Solo Adventure"
2. Select a predefined character
3. Play through a narrative

### Create Multiplayer Quest
1. Click "Create Quest"
2. Select AI provider and enter API key
3. Share the generated room code with friends
4. Friends join with their chosen characters

### Join Quest
1. Click "Join Quest"
2. Enter the room code
3. Choose a character (predefined or custom)
4. Play with the party

## Characters

20 predefined characters spanning:
- **Classes**: Warrior, Ranger, Wizard, Rogue, Cleric, Barbarian, Bard, Sorcerer, Monk, Warlock, Paladin, Assassin, Druid, Artificer, Knight, Titan, Enchantress, Vampire, Rogue-Gambler, Crusader
- **Races**: Human, Elf, Dwarf, Orc, Halfling, Tiefling, Gnome, Giant-Blooded, Half-Elf, Undead

Each character has unique:
- Backstory
- Skills (4 per character)
- Class and race attributes

## Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Auth)
- **LLM Integration**: OpenAI, Claude, Gemini, Ollama
- **Real-time**: Firebase Listeners

## File Structure

```
arcane-realms/
├── app/
│   ├── page.tsx           # Main menu
│   ├── layout.tsx         # Root layout
│   ├── globals.css
│   ├── solo/page.tsx      # Solo adventure
│   └── room/[code]/page.tsx # Multiplayer room
├── components/
│   ├── CharacterSelector.tsx
│   ├── CreateRoom.tsx
│   ├── JoinRoom.tsx
│   ├── JoinGameRoom.tsx
│   ├── SoloGame.tsx
│   └── MultiplayerGame.tsx
├── lib/
│   ├── characters.ts      # Character definitions
│   ├── firebase.ts        # Firebase setup
│   └── llm.ts            # LLM provider integration
├── public/               # Media files
└── package.json
```

## Environment Variables

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_Z_API_KEY=your_llm_key
NEXT_PUBLIC_ELEVENLABS_API_KEY=optional_elevenlabs_key
```

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Docker
```bash
docker build -t arcane-realms .
docker run -p 3000:3000 arcane-realms
```

## Future Enhancements

- Voice input/output (11Labs integration)
- Character progression & inventory
- Spellcasting system
- Combat mechanics
- Custom world building
- Session persistence
- Party economy system

## License

MIT

## Support

Questions? Open an issue or contact the development team.

---

**The tale is yours. What adventure awaits?**
