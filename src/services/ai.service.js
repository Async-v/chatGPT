import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function generateResponse(content) {
  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: content,
  });

  return response.text;
}

