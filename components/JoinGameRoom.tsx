"use client";

import { useState } from "react";
import { PREDEFINED_CHARACTERS, Character } from "@/lib/characters";
import { db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

interface JoinGameRoomProps {
  roomCode: string;
  roomId: string;
  onCharacterSelected: (character: Character) => void;
}

export default function JoinGameRoom({
  roomCode,
  roomId,
  onCharacterSelected,
}: JoinGameRoomProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [customName, setCustomName] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelect = (character: Character) => {
    setSelectedId(character.id);
    setSelectedChar(character);
    setUseCustom(false);
  };

  const handleConfirm = async () => {
    if (!selectedChar && !useCustom) return;

    setLoading(true);
    try {
      const characterToJoin = useCustom
        ? {
            id: `custom_${Date.now()}`,
            name: customName || "Unknown Adventurer",
            class: "Custom",
            race: "Custom",
            description: "A mysterious newcomer",
            skills: [],
            backstory: "Their story is yet to be told...",
          }
        : selectedChar;

      // Add player to room
      await updateDoc(doc(db, "rooms", roomId), {
        players: arrayUnion({
          id: `player_${Date.now()}`,
          character: characterToJoin,
          joinedAt: new Date(),
        }),
      });

      onCharacterSelected(characterToJoin);
    } catch (err) {
      console.error("Error joining room:", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bgDark via-bgPanel to-bgDark p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-accent">Join Quest {roomCode}</h2>
          <p className="text-textMuted mt-2">Choose your character</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 justify-center border-b border-border">
          <button
            onClick={() => {
              setUseCustom(false);
              setSelectedId(null);
            }}
            className={`px-6 py-3 font-bold transition ${
              !useCustom
                ? "text-accent border-b-2 border-accent"
                : "text-textMuted hover:text-textMain"
            }`}
          >
            Predefined Characters
          </button>
          <button
            onClick={() => setUseCustom(true)}
            className={`px-6 py-3 font-bold transition ${
              useCustom
                ? "text-accent border-b-2 border-accent"
                : "text-textMuted hover:text-textMain"
            }`}
          >
            Create Your Own
          </button>
        </div>

        {/* Predefined Characters */}
        {!useCustom && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PREDEFINED_CHARACTERS.map((char) => (
              <button
                key={char.id}
                onClick={() => handleSelect(char)}
                className={`p-4 rounded-lg border-2 transition duration-300 text-left ${
                  selectedId === char.id
                    ? "border-accent bg-bgPanel shadow-lg shadow-accent/50"
                    : "border-border bg-bgPanel/50 hover:border-primary"
                }`}
              >
                <h3 className="text-lg font-bold text-textMain">{char.name}</h3>
                <p className="text-sm text-accent">
                  {char.class} • {char.race}
                </p>
                <p className="text-xs text-textMuted mt-2 line-clamp-2">{char.description}</p>
              </button>
            ))}
          </div>
        )}

        {/* Custom Character */}
        {useCustom && (
          <div className="bg-bgPanel border border-border rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-accent mb-6">Create Your Character</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-primary mb-2">
                  Character Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Enter your character name"
                  className="w-full px-4 py-2 bg-bgDark border border-border rounded focus:outline-none focus:border-primary text-textMain"
                />
              </div>
              <p className="text-xs text-textMuted">
                You can customize more details after joining
              </p>
            </div>
          </div>
        )}

        {/* Confirmation Panel */}
        {(selectedChar || useCustom) && (
          <div className="fixed bottom-0 left-0 right-0 bg-bgPanel border-t border-border p-6">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-accent">
                  {selectedChar?.name || customName || "New Adventurer"}
                </h3>
                {selectedChar && (
                  <p className="text-sm text-textMuted">
                    {selectedChar.class} • {selectedChar.race}
                  </p>
                )}
              </div>
              <button
                onClick={handleConfirm}
                disabled={loading || (useCustom && !customName.trim())}
                className="px-8 py-3 bg-accent hover:bg-yellow-500 disabled:opacity-50 text-black font-bold rounded transition"
              >
                {loading ? "Joining..." : "Join Quest"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
