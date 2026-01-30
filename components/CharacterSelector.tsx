"use client";

import { useState } from "react";
import { PREDEFINED_CHARACTERS, Character } from "@/lib/characters";

interface CharacterSelectorProps {
  onCharacterSelected: (characterId: string) => void;
}

export default function CharacterSelector({ onCharacterSelected }: CharacterSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);

  const handleSelect = (character: Character) => {
    setSelectedId(character.id);
    setSelectedChar(character);
  };

  const handleConfirm = () => {
    if (selectedId) {
      onCharacterSelected(selectedId);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-accent text-center">Choose Your Character</h2>

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
            <div className="mt-2 flex flex-wrap gap-1">
              {char.skills.slice(0, 2).map((skill, i) => (
                <span key={i} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {selectedChar && (
        <div className="fixed bottom-0 left-0 right-0 bg-bgPanel border-t border-border p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold text-accent">{selectedChar.name}</h3>
            <p className="text-textMuted">{selectedChar.backstory}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-bold text-primary mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedChar.skills.map((skill, i) => (
                    <span key={i} className="text-xs bg-primary/20 text-primary px-3 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-6 py-2 bg-accent text-black font-bold rounded hover:bg-yellow-500 transition"
                >
                  Start Adventure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
