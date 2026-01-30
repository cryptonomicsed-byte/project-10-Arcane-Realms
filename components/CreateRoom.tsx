"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getRandomCharacter } from "@/lib/characters";

export default function CreateRoom() {
  const router = useRouter();
  const [provider, setProvider] = useState<"openai" | "anthropic" | "google" | "ollama">(
    "openai"
  );
  const [apiKey, setApiKey] = useState("");
  const [modelId, setModelId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!apiKey && provider !== "ollama") {
        throw new Error("API Key is required");
      }

      const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const dmCharacter = getRandomCharacter();

      const docRef = await addDoc(collection(db, "rooms"), {
        code: roomCode,
        createdAt: serverTimestamp(),
        provider,
        apiKey: provider !== "ollama" ? apiKey : null,
        modelId: modelId || null,
        dmCharacter,
        players: [],
        gameLog: [],
        isActive: true,
      });

      router.push(`/room/${docRef.id}?owner=true`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create room");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-bgPanel border border-border rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-accent">Create a New Quest</h2>
        <p className="text-textMuted">
          Only you need to provide API credentials. Other players just choose their character.
        </p>

        {error && (
          <div className="p-4 bg-red-900/30 border border-red-500 text-red-200 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-6">
          {/* LLM Provider Selection */}
          <div>
            <label className="block text-sm font-bold text-primary mb-2">AI Provider</label>
            <div className="grid grid-cols-2 gap-3">
              {["openai", "anthropic", "google", "ollama"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProvider(p as any)}
                  className={`p-3 rounded border-2 transition ${
                    provider === p
                      ? "border-accent bg-primary/20"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <span className="capitalize font-bold text-textMain">{p}</span>
                </button>
              ))}
            </div>
          </div>

          {/* API Key Input */}
          {provider !== "ollama" && (
            <div>
              <label className="block text-sm font-bold text-primary mb-2">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={`Enter your ${provider.toUpperCase()} API key`}
                className="w-full px-4 py-2 bg-bgDark border border-border rounded focus:outline-none focus:border-primary text-textMain"
                required
              />
              <p className="text-xs text-textMuted mt-2">
                Your API key is only stored with room data. Never shared publicly.
              </p>
            </div>
          )}

          {/* Model ID (Optional) */}
          <div>
            <label className="block text-sm font-bold text-primary mb-2">
              Model ID (Optional)
            </label>
            <input
              type="text"
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              placeholder={`e.g., gpt-4, claude-3-opus, gemini-pro`}
              className="w-full px-4 py-2 bg-bgDark border border-border rounded focus:outline-none focus:border-primary text-textMain"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent hover:bg-yellow-500 disabled:opacity-50 text-black font-bold rounded transition"
          >
            {loading ? "Creating Quest..." : "Create Quest"}
          </button>
        </form>
      </div>
    </div>
  );
}
