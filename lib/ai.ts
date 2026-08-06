import { GoogleGenAI } from "@google/genai";

export type Pitch = {
  ideaSummary: string;
  targetCustomer: string;
  uniqueValueProposition: string;
  growthIdeas: string[];
};

const pitchSchema = {
  type: "object",
  properties: {
    ideaSummary: {
      type: "string",
      description: "A concise summary of the business idea.",
    },
    targetCustomer: {
      type: "string",
      description: "The primary target customer.",
    },
    uniqueValueProposition: {
      type: "string",
      description: "The main value and differentiation offered to customers.",
    },
    growthIdeas: {
      type: "array",
      description: "Exactly three concise and practical growth ideas.",
      minItems: 3,
      maxItems: 3,
      items: {
        type: "string",
      },
    },
  },
  required: [
    "ideaSummary",
    "targetCustomer",
    "uniqueValueProposition",
    "growthIdeas",
  ],
};

export async function generatePitch(idea: string): Promise<Pitch> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const ai = new GoogleGenAI({
    apiKey,
  });

  const prompt = `
You are a business idea strategist.

Turn the following rough business idea into a concise mini pitch.

Return ONLY these four fields:
- ideaSummary
- targetCustomer
- uniqueValueProposition
- growthIdeas

Requirements:
- Keep the idea summary concise.
- Identify the primary target customer.
- Explain the main customer value and differentiation.
- Provide exactly 3 concise, practical growth ideas.
- Do not add any other fields.

Business idea:
${idea}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: pitchSchema,
    },
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  let pitch: Pitch;

  try {
    pitch = JSON.parse(text) as Pitch;
  } catch {
    throw new Error("Gemini returned an invalid response.");
  }

  if (
    typeof pitch.ideaSummary !== "string" ||
    typeof pitch.targetCustomer !== "string" ||
    typeof pitch.uniqueValueProposition !== "string" ||
    !Array.isArray(pitch.growthIdeas) ||
    pitch.growthIdeas.length !== 3 ||
    !pitch.growthIdeas.every((item) => typeof item === "string")
  ) {
    throw new Error("Gemini returned an unexpected pitch format.");
  }

  return pitch;
}