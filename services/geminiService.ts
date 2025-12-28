import { GoogleGenAI, Type } from "@google/genai";
import { SafetyStatus, SearchResult, Language } from "../types";

// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
// Assume process.env.API_KEY is pre-configured and valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzePhoneNumber = async (
  phoneNumber: string, 
  language: Language
): Promise<SearchResult> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    // Construct a prompt that asks for structured analysis
    const prompt = `
      You are an expert security system for analyzing Japanese phone numbers. 
      Analyze the following phone number: "${phoneNumber}".
      
      Context: The user is in Japan. There are many scams impersonating the Immigration Bureau (入管局), National Tax Agency (国税庁), Police, or Embassies.
      
      Your task:
      1. Identify if this number belongs to a KNOWN official entity (e.g., specific Immigration Bureau branch, City Hall, Bank, Courier).
      2. Identify if this number is associated with known scams, robo-calls, or highly suspicious patterns reported in Japan.
      3. If it is neither clearly official nor clearly a scam, mark it as UNKNOWN.
      
      Respond in the user's language: ${language}.
      
      Return JSON strictly adhering to the schema.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: {
              type: Type.STRING,
              enum: [SafetyStatus.SAFE, SafetyStatus.SCAM, SafetyStatus.UNKNOWN],
              description: "The safety verdict of the number."
            },
            entityName: {
              type: Type.STRING,
              description: "Name of the organization if Safe/Official. Or 'Unknown' if not found."
            },
            website: {
              type: Type.STRING,
              description: "Official URL if Safe. Null or empty string if unknown or scam."
            },
            description: {
              type: Type.STRING,
              description: "A short explanation in the requested language. If safe, explain who it is. If scam, explain the type of scam (e.g. Immigration scam). If unknown, warn to be cautious."
            }
          },
          required: ["status", "description"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const data = JSON.parse(text);

    return {
      phoneNumber,
      status: data.status as SafetyStatus,
      entityName: data.entityName,
      website: data.website,
      description: data.description
    };

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback in case of API error
    return {
      phoneNumber,
      status: SafetyStatus.UNKNOWN,
      description: "Service temporarily unavailable. Please try again later.",
    };
  }
};