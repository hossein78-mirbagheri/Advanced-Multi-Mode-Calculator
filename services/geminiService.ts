
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askMathAssistant = async (query: string, currentExpression: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a helpful mathematical assistant built into a multi-mode calculator app. 
      The user is asking: "${query}". 
      The current expression on their calculator is: "${currentExpression}".
      
      Provide a concise, helpful answer. If they want to solve a problem, show the steps. 
      If they want to know a formula, provide it. Keep it under 200 words. 
      Use Markdown for mathematical notation.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I couldn't process that mathematical query right now.";
  }
};
