"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function JoinRoom() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const q = query(collection(db, "rooms"), where("code", "==", code.toUpperCase()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Room not found. Check your code.");
      }

      const roomDoc = querySnapshot.docs[0];
      router.push(`/room/${roomDoc.id}?join=true`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join room");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-bgPanel border border-border rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-accent">Join an Existing Quest</h2>
        <p className="text-textMuted">
          Enter the room code and select your character to join the adventure.
        </p>

        {error && (
          <div className="p-4 bg-red-900/30 border border-red-500 text-red-200 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleJoin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-primary mb-2">Room Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g., ABC123"
              maxLength={6}
              className="w-full px-4 py-3 bg-bgDark border border-border rounded text-center text-2xl tracking-widest focus:outline-none focus:border-primary text-textMain font-bold"
              required
            />
            <p className="text-xs text-textMuted mt-2">
              Ask the quest creator for the room code
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold rounded transition"
          >
            {loading ? "Joining..." : "Enter Quest"}
          </button>
        </form>

        <div className="p-4 bg-bgDark border border-border rounded mt-8">
          <h3 className="text-sm font-bold text-primary mb-2">Next Steps:</h3>
          <ol className="text-sm text-textMuted space-y-1 list-decimal list-inside">
            <li>Enter the room code provided by the quest creator</li>
            <li>Choose a predetermined character or create your own</li>
            <li>Join your friends in the adventure</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
