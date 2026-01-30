export interface LLMConfig {
  provider: "openai" | "anthropic" | "google" | "ollama";
  apiKey: string;
  modelId?: string;
}

export async function callLLM(config: LLMConfig, prompt: string): Promise<string> {
  try {
    switch (config.provider) {
      case "openai":
        return await callOpenAI(config.apiKey, prompt);
      case "anthropic":
        return await callClaude(config.apiKey, prompt);
      case "google":
        return await callGemini(config.apiKey, prompt);
      case "ollama":
        return await callOllama(prompt);
      default:
        throw new Error(`Unknown provider: ${config.provider}`);
    }
  } catch (error) {
    console.error("LLM Error:", error);
    return "The DM grows silent, lost in thought...";
  }
}

async function callOpenAI(apiKey: string, prompt: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content || "The DM grows silent...";
}

async function callClaude(apiKey: string, prompt: string): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-sonnet-20240229",
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  return data.content[0].text || "The DM grows silent...";
}

async function callGemini(apiKey: string, prompt: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();
  return data.candidates[0].content.parts[0].text || "The DM grows silent...";
}

async function callOllama(prompt: string): Promise<string> {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistral",
      prompt,
      stream: false,
    }),
  });

  const data = await response.json();
  return data.response || "The DM grows silent...";
}
