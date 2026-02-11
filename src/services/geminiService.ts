
import { GoogleGenAI } from "@google/genai";

// Initialize AI client using named parameter and process.env.API_KEY directly.
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateAIResponse = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = getAIClient();
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are 'Nexus AI', a helpful and professional assistant integrated into a user's dashboard. You help with data analysis, productivity tips, and general inquiries. Keep responses concise and formatted in clean Markdown.",
      },
    });

    // Note: chat.sendMessage accepts the message parameter directly.
    const response = await chat.sendMessage({ message: prompt });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again in a moment.";
  }
};

export const getDashboardInsights = async (dataSummary: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this dashboard data and provide 3 quick bullet-point insights: ${dataSummary}`,
      config: {
        systemInstruction: "You are a data analyst. Provide brief, actionable insights based on the numbers provided."
      }
    });
    // Access the .text property directly.
    return response.text;
  } catch (error) {
    console.error("Dashboard Insights Error:", error);
    return "Unable to generate insights at this time.";
  }
};
