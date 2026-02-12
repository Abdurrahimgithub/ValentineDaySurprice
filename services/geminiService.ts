
import { GoogleGenAI } from "@google/genai";

export const generateRomanticScene = async (): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A high-quality, ultra-soft cartoon-style digital illustration for Valentine's Day. 
            A gentle young man (age 22) with a sweet expression is kneeling and proposing with a rose 
            to a beautiful young woman (age 20) with a look of surprise and joy. 
            The style is innocent, romantic, and dreamy, with soft pastel colors (pinks, whites, light reds). 
            Floating hearts and a magical atmosphere. Soft lighting, high detail, 4k.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
};
