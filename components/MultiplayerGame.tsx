"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

interface MultiplayerGameProps {
  room: any;
  roomId: string;
  isOwner?: boolean;
  playerCharacter?: any;
}

export default function MultiplayerGame({
  room,
  roomId,
  isOwner = false,
  playerCharacter,
}: MultiplayerGameProps) {
  const router = useRouter();
  const [narrative, setNarrative] = useState(
    "The adventure begins... The DM sets the scene."
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

    const speaker = playerCharacter?.name || "DM";
    setGameLog((prev) => [...prev, `${speaker}: ${action}`]);
    setIsLoading(true);

    try {
      // Log to Firebase
      await updateDoc(doc(db, "rooms", roomId), {
        gameLog: arrayUnion({
          timestamp: new Date(),
          speaker,
          message: action,
        }),
      });

      // Simulate AI response
      setTimeout(() => {
        const responses = [
          "The group's combined efforts yield unexpected results...",
          "As the party acts in unison, the world responds...",
          `${speaker}'s action influences the outcome significantly.`,
          "The tension rises. All eyes are on the unfolding scene...",
          "Fortune and courage guide the party forward...",
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];
        setGameLog((prev) => [...prev, `DM: ${response}`]);
        setNarrative(response);
        setIsLoading(false);
      }, 800);
    } catch (err) {
      console.error("Error:", err);
      setIsLoading(false);
    }
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(room.code);
    alert("Room code copied!");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-bgDark via-bgPanel to-bgDark">
      <div className="max-w-6xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-bgPanel border-b border-border p-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-accent">Quest {room.code}</h1>
              <p className="text-sm text-textMuted">
                {room.players?.length + 1 || 1} adventurers in party
              </p>
            </div>
            <div className="text-right space-y-2">
              {isOwner && (
                <button
                  onClick={copyRoomCode}
                  className="block text-sm px-4 py-2 bg-primary rounded hover:bg-primaryDark transition text-white"
                >
                  Copy Code: {room.code}
                </button>
              )}
              <button
                onClick={() => router.push("/")}
                className="block text-sm px-4 py-2 bg-bgDark border border-border rounded hover:bg-primary/20 transition text-textMain"
              >
                Exit
              </button>
            </div>
          </div>
        </div>

        {/* Players List & Game Area */}
        <div className="flex-1 overflow-hidden flex gap-4 p-4">
          {/* Players Sidebar */}
          <div className="w-48 bg-bgPanel border border-border rounded-lg p-4 overflow-y-auto">
            <h3 className="text-sm font-bold text-primary mb-4">Party Members</h3>
            <div className="space-y-2">
              {/* DM */}
              <div className="p-3 bg-bgDark rounded border border-accent">
                <p className="font-bold text-accent text-sm">{room.dmCharacter.name}</p>
                <p className="text-xs text-textMuted">DM</p>
              </div>

              {/* Players */}
              {room.players?.map((player: any, i: number) => (
                <div key={i} className="p-3 bg-bgDark rounded border border-primary">
                  <p className="font-bold text-primary text-sm">{player.character.name}</p>
                  <p className="text-xs text-textMuted">
                    {player.character.class} • {player.character.race}
                  </p>
                </div>
              ))}

              {/* Current Player */}
              {playerCharacter && (
                <div className="p-3 bg-primary/20 rounded border-2 border-accent">
                  <p className="font-bold text-accent text-sm">{playerCharacter.name}</p>
                  <p className="text-xs text-textMuted">(You)</p>
                </div>
              )}
            </div>
          </div>

          {/* Main Game Area */}
          <div className="flex-1 flex flex-col">
            {/* Narrative Display */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              <div className="bg-bgPanel border border-border rounded-lg p-6">
                <h2 className="text-lg font-bold text-accent mb-4">The Unfolding Tale</h2>
                <p className="text-textMain leading-relaxed text-base">{narrative}</p>
              </div>

              {/* Game Log */}
              <div className="bg-bgPanel border border-border rounded-lg p-6 max-h-48 overflow-y-auto">
                <h3 className="text-sm font-bold text-primary mb-3">Chronicle</h3>
                <div className="space-y-2 text-sm">
                  {gameLog.map((entry, i) => (
                    <p
                      key={i}
                      className={entry.startsWith("DM:") ? "text-accent" : "text-primary"}
                    >
                      {entry}
                    </p>
                  ))}
                  <div ref={logEndRef} />
                </div>
              </div>
            </div>

            {/* Action Input */}
            <div className="bg-bgPanel border border-border rounded-lg p-6">
              <form onSubmit={handleAction} className="space-y-4">
                <label className="block text-sm font-bold text-primary">
                  {playerCharacter?.name || "Spectator"}: What do you do?
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your action for the party..."
                    disabled={isLoading || !playerCharacter}
                    className="flex-1 px-4 py-2 bg-bgDark border border-border rounded focus:outline-none focus:border-primary text-textMain disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim() || !playerCharacter}
                    className="px-6 py-2 bg-accent hover:bg-yellow-500 disabled:opacity-50 text-black font-bold rounded transition"
                  >
                    {isLoading ? "..." : "Act"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
