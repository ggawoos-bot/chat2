import { GoogleGenAI } from "@google/genai";

const defaultMission = "Reach for the stars and don't look down!";

export async function generateMission(): Promise<string> {
  try {
    // The API key is sourced from environment variables, assumed to be securely managed.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: "Generate a short, quirky, and fun single-sentence mission for a mobile game called 'Cat Jump'. The mission should be encouraging and creative. Do not include any prefixes like 'Mission:' or 'Your mission:'. Make it sound exciting!",
        config: {
            temperature: 0.8,
            maxOutputTokens: 60,
            thinkingConfig: { thinkingBudget: 20 },
        }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating mission with Gemini API:", error);
    // Fallback to a default mission if the API call fails
    return defaultMission;
  }
}
