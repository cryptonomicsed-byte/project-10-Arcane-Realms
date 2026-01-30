"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Character } from "@/lib/characters";

interface SoloGameProps {
  character: Character;
}

export default function SoloGame({ character }: SoloGameProps) {
  const router = useRouter();
  const [narrative, setNarrative] = useState(
    `You awaken as ${character.name}, a ${character.race} ${character.class}. ${character.backstory} The path ahead is uncertain, filled with danger and wonder...`
  );
  const [gameLog, setGameLog] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [gameLog]);

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const action = input.trim();
    setInput("");
    setGameLog((prev) => [...prev, `You: ${action}`]);
    setIsLoading(true);

    // Simulate AI response (in production, call LLM)
    setTimeout(() => {
      const responses = [
        "As you attempt your action, the world around you shifts mysteriously...",
        "Your skills prove useful in this moment. The outcome is not what you expected.",
        "The consequences of your action ripple through the realm...",
        "Fate seems to smile upon your decision, for now.",
        `As ${character.name}, your ${character.class} training comes into play.`,
        "The shadows grow darker. Something stirs in the distance...",
        "Your heart races as you realize the magnitude of your choice.",
      ];

      const response = responses[Math.floor(Math.random() * responses.length)];
      setGameLog((prev) => [...prev, `DM: ${response}`]);
      setNarrative(response);
      setIsLoading(false);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-bgDark via-bgPanel to-bgDark">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-bgPanel border-b border-border p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-accent">{character.name}</h1>
            <p className="text-sm text-textMuted">
              {character.class} • {character.race}
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-bgDark border border-border rounded hover:bg-primary/20 transition text-textMain"
          >
            Exit Adventure
          </button>
        </div>

        {/* Main Game Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Narrative Display */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-bgPanel border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold text-accent mb-4">The Tale Unfolds</h2>
              <p className="text-textMain leading-relaxed text-lg">{narrative}</p>
            </div>

            {/* Game Log */}
            <div className="bg-bgPanel border border-border rounded-lg p-6 max-h-48 overflow-y-auto">
              <h3 className="text-sm font-bold text-primary mb-3">Chronicle</h3>
              <div className="space-y-2 text-sm">
                {gameLog.map((entry, i) => (
                  <p
                    key={i}
                    className={entry.startsWith("You:") ? "text-primary" : "text-accent"}
                  >
                    {entry}
                  </p>
                ))}
                <div ref={logEndRef} />
              </div>
            </div>
          </div>

          {/* Action Input */}
          <div className="border-t border-border bg-bgPanel p-6">
            <form onSubmit={handleAction} className="space-y-4">
              <label className="block text-sm font-bold text-primary">What do you do?</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your action..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-bgDark border border-border rounded focus:outline-none focus:border-primary text-textMain disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-2 bg-accent hover:bg-yellow-500 disabled:opacity-50 text-black font-bold rounded transition"
                >
                  {isLoading ? "..." : "Act"}
                </button>
              </div>
            </form>

            {/* Character Skills Display */}
            <div className="mt-4 flex flex-wrap gap-2">
              {character.skills.map((skill, i) => (
                <button
                  key={i}
                  onClick={() => setInput(`I use ${skill} to...`)}
                  className="text-xs bg-primary/20 text-primary px-3 py-1 rounded hover:bg-primary/40 transition"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
