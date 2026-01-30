"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getCharacterById } from "@/lib/characters";
import SoloGame from "@/components/SoloGame";

export default function SoloAdventure() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const characterId = searchParams.get("character");
  const [character, setCharacter] = useState<any>(null);

  useEffect(() => {
    if (!characterId) {
      router.push("/");
      return;
    }

    const char = getCharacterById(characterId);
    if (char) {
      setCharacter(char);
    } else {
      router.push("/");
    }
  }, [characterId, router]);

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bgDark">
        <p className="text-textMuted">Loading your adventure...</p>
      </div>
    );
  }

  return <SoloGame character={character} />;
}
