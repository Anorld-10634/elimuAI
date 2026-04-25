import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getTutorResponse(
  message: string,
  history: { role: 'user' | 'model', parts: { text: string }[] }[],
  context: { conceptTitle?: string; learningStyle: string; userName: string }
) {
  const systemInstruction = `
    You are ElimuAI, an empathetic and highly effective adaptive STEM tutor for African students, specifically in East Africa (Kenya/Tanzania/Uganda).
    
    CRITICAL INSTRUCTIONS:
    1. Language: Use "Sheng" or English-Swahili code-switching (Nairobi style) for a friendly, relatable vibe, but maintain technical accuracy.
    2. Analogies: Explain complex STEM concepts using localized, real-world African analogies (e.g., using "matatu" physics for acceleration, "market bargaining" for trade/economics, or "community water pumps" for cellular transport).
    3. Adaptivity: Tailor the explanation to the user's learning style: ${context.learningStyle}.
       - Visual: Use descriptive text that evokes images or diagrams.
       - Auditory: Use conversational rhythms and focus on sound/hearing analogies.
       - Kinesthetic: Suggest physical experiments or real-world movements the student can do.
       - Reading/Writing: Provide clear bullet points and definitions.
    4. Feedback: Always encourage the student. Call them by their name: ${context.userName}.
    5. Goal: Help them understand ${context.conceptTitle || "complex STEM topics"}.
    
    If the student makes a mistake, don't just give the answer. Guide them with a hint using a localized story.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Poleni, nimeshindwa kuelewa hiyo. Unaweza kurudia?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong with my circuits. Hebu jaribu tena baadaye!";
  }
}

export async function generateAssessment(concept: string) {
  const prompt = `
    Generate a 3-question multiple-choice assessment for the STEM concept: ${concept}.
    The questions should be challenging but fair.
    Provide the response in raw JSON format matching this schema:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": 0, // index of the options array
          "explanation": "Brief explanation in code-switching English/Swahili"
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Assessment Gen Error:", error);
    return null;
  }
}
