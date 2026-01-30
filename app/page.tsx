"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CharacterSelector from "@/components/CharacterSelector";
import CreateRoom from "@/components/CreateRoom";
import JoinRoom from "@/components/JoinRoom";

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState<"main" | "solo" | "create" | "join">("main");
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const handleSoloAdventure = () => {
    setStep("solo");
  };

  const handleCreateRoom = () => {
    setStep("create");
  };

  const handleJoinRoom = () => {
    setStep("join");
  };

  const handleCharacterSelected = (characterId: string) => {
    setSelectedCharacter(characterId);
    router.push(`/solo?character=${characterId}`);
  };

  const handleBackClick = () => {
    setStep("main");
    setSelectedCharacter(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-bgDark via-bgPanel to-bgDark p-4">
      <div className="max-w-4xl mx-auto">
        {step === "main" && (
          <div className="text-center space-y-8 py-20">
            <h1 className="text-5xl font-heading font-bold text-accent mb-4">
              Arcane Realms
            </h1>
            <p className="text-textMain text-lg max-w-2xl mx-auto">
              Enter a world of endless adventure. Choose your path: face challenges alone,
              gather allies in a multiplayer quest, or join friends in their unfolding saga.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {/* Solo Adventure */}
              <button
                onClick={handleSoloAdventure}
                className="p-8 bg-gradient-to-b from-primary to-primaryDark hover:shadow-lg hover:shadow-primary/50 rounded-lg transition duration-300 transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-white mb-2">Solo Adventure</h2>
                <p className="text-textMuted text-sm">
                  Embark on a personal quest with AI-guided narration
                </p>
              </button>

              {/* Create Room */}
              <button
                onClick={handleCreateRoom}
                className="p-8 bg-gradient-to-b from-accent to-yellow-600 hover:shadow-lg hover:shadow-accent/50 rounded-lg transition duration-300 transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-black mb-2">Create Quest</h2>
                <p className="text-gray-800 text-sm">
                  Start a multiplayer adventure and invite friends
                </p>
              </button>

              {/* Join Room */}
              <button
                onClick={handleJoinRoom}
                className="p-8 bg-gradient-to-b from-purple-500 to-purple-700 hover:shadow-lg hover:shadow-purple-500/50 rounded-lg transition duration-300 transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-white mb-2">Join Quest</h2>
                <p className="text-textMuted text-sm">
                  Enter an existing adventure using a room code
                </p>
              </button>
            </div>
          </div>
        )}

        {step === "solo" && (
          <div>
            <button
              onClick={handleBackClick}
              className="mb-6 px-4 py-2 bg-bgPanel text-textMain rounded hover:bg-primary/20 transition"
            >
              ← Back
            </button>
            <CharacterSelector onCharacterSelected={handleCharacterSelected} />
          </div>
        )}

        {step === "create" && (
          <div>
            <button
              onClick={handleBackClick}
              className="mb-6 px-4 py-2 bg-bgPanel text-textMain rounded hover:bg-primary/20 transition"
            >
              ← Back
            </button>
            <CreateRoom />
          </div>
        )}

        {step === "join" && (
          <div>
            <button
              onClick={handleBackClick}
              className="mb-6 px-4 py-2 bg-bgPanel text-textMain rounded hover:bg-primary/20 transition"
            >
              ← Back
            </button>
            <JoinRoom />
          </div>
        )}
      </div>
    </main>
  );
}
