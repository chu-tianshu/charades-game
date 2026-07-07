/// <reference types="node" />

import Anthropic from "@anthropic-ai/sdk";

interface GenerateCategoryRequest {
  method?: string;
  body?: unknown;
}

interface GenerateCategoryResponse {
  status(code: number): GenerateCategoryResponse;
  json(body: unknown): void;
}

const MAX_NAME_LENGTH = 60;
const MAX_INSTRUCTIONS_LENGTH = 300;
const WORD_COUNT = 50;

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          word: { type: "string" },
          description: { type: "string" },
        },
        required: ["word", "description"],
        additionalProperties: false,
      },
    },
  },
  required: ["items"],
  additionalProperties: false,
} as const;

export default async function handler(req: GenerateCategoryRequest, res: GenerateCategoryResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = (req.body ?? {}) as { name?: unknown; instructions?: unknown };
  const name = typeof body.name === "string" ? body.name.trim().slice(0, MAX_NAME_LENGTH) : "";
  const instructions =
    typeof body.instructions === "string" ? body.instructions.trim().slice(0, MAX_INSTRUCTIONS_LENGTH) : "";

  if (!name) {
    res.status(400).json({ error: "Category name is required" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY is not set");
    res.status(500).json({ error: "Category generation is not configured" });
    return;
  }

  const anthropic = new Anthropic({ apiKey });

  const instructionsClause = instructions ? ` Extra instructions from the user: ${instructions}` : "";

  try {
    const message = await anthropic.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 4096,
      output_config: {
        format: { type: "json_schema", schema: RESPONSE_SCHEMA },
      },
      messages: [
        {
          role: "user",
          content:
            `Generate a charades word list for a category called "${name}".${instructionsClause}\n\n` +
            `Produce exactly ${WORD_COUNT} distinct, non-repeating words or short phrases that fit this ` +
            "category well and make fun charades prompts — things a player could act out, mime, or " +
            "describe for teammates to guess. For each one, write a short one-sentence description " +
            "(roughly 8-18 words) explaining what it is, to be revealed to players after they guess it. " +
            "Keep everything appropriate for a general-audience party game.",
        },
      ],
    });

    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      console.error("No text block in Claude response");
      res.status(502).json({ error: "Failed to generate category" });
      return;
    }

    const parsed = JSON.parse(textBlock.text) as { items?: { word?: unknown; description?: unknown }[] };
    const items = Array.isArray(parsed.items) ? parsed.items : [];

    const words: string[] = [];
    const descriptions: Record<string, string> = {};
    for (const item of items) {
      if (typeof item.word !== "string" || typeof item.description !== "string") continue;
      const word = item.word.trim();
      if (!word || word in descriptions) continue;
      words.push(word);
      descriptions[word] = item.description.trim();
    }

    if (words.length === 0) {
      console.error("Claude response contained no usable words");
      res.status(502).json({ error: "Failed to generate category" });
      return;
    }

    res.status(200).json({ words, descriptions });
  } catch (error) {
    console.error("Failed to generate category:", error);
    res.status(500).json({ error: "Failed to generate category" });
  }
}
