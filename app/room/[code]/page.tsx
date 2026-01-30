"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import MultiplayerGame from "@/components/MultiplayerGame";
import JoinGameRoom from "@/components/JoinGameRoom";

interface RoomData {
  code: string;
  provider: string;
  dmCharacter: any;
  players: any[];
  gameLog: string[];
}

export default function RoomPage({ params }: { params: { code: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOwner = searchParams.get("owner") === "true";
  const isJoining = searchParams.get("join") === "true";

  const [room, setRoom] = useState<RoomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [playerCharacter, setPlayerCharacter] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params.code) {
      router.push("/");
      return;
    }

    // Setup real-time listener
    const roomRef = doc(db, "rooms", params.code);
    const unsubscribe = onSnapshot(
      roomRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setRoom(docSnap.data() as RoomData);
          setLoading(false);
        } else {
          setError("Room not found");
          setLoading(false);
        }
      },
      (err) => {
        console.error("Error loading room:", err);
        setError("Failed to load room");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [params.code, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bgDark">
        <p className="text-textMuted">Loading quest...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bgDark">
        <div className="text-center space-y-4">
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-primary rounded hover:bg-primaryDark transition text-white"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (!room) {
    return null;
  }

  // If joining, show character selection
  if (isJoining && !playerCharacter) {
    return (
      <JoinGameRoom
        roomCode={room.code}
        onCharacterSelected={setPlayerCharacter}
        roomId={params.code}
      />
    );
  }

  // If owner, start game directly
  if (isOwner) {
    return <MultiplayerGame room={room} roomId={params.code} isOwner={true} />;
  }

  // If player selected character, show game
  if (playerCharacter) {
    return (
      <MultiplayerGame
        room={room}
        roomId={params.code}
        playerCharacter={playerCharacter}
        isOwner={false}
      />
    );
  }

  return null;
}
