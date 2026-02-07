import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { PRODUCTS } from '../constants';

const API_KEY = process.env.API_KEY || '';

class GeminiService {
  private ai: GoogleGenAI | null = null;
  private chatSession: Chat | null = null;

  constructor() {
    if (API_KEY) {
      this.ai = new GoogleGenAI({ apiKey: API_KEY });
    } else {
      console.warn("Gemini API Key is missing.");
    }
  }

  public async startChat() {
    if (!this.ai) return;

    // Create a context string from the product list to ground the AI
    const productContext = PRODUCTS.map(p => 
      `- ${p.name} (₹${p.price}): ${p.description} (Category: ${p.category})`
    ).join('\n');

    const systemInstruction = `
      You are "Reddy", the intelligent virtual assistant for "Poreddy's", a trendy mobile accessory shop.
      
      Your goal is to help customers find the perfect mobile case, pouch, or tempered glass.
      You should be friendly, trendy, and use emojis occasionally.
      
      Here is our current inventory list:
      ${productContext}
      
      Rules:
      1. Only recommend products from the inventory list above.
      2. If a user asks for something we don't have, politely suggest a similar item from our stock (e.g., if they want Dragon Ball but we only have Naruto, suggest Naruto).
      3. Keep responses concise (under 50 words unless asked for details).
      4. If asked about prices, always quote the specific price from the list in Rupees (₹).
      5. We specialize in Anime and Marvel cases.
      
      User is asking for help. Be proactive!
    `;

    this.chatSession = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });
  }

  public async sendMessage(message: string): Promise<string> {
    if (!this.ai || !this.chatSession) {
      return "Sorry, I'm having trouble connecting to the brain right now. Please try again later!";
    }

    try {
      const response: GenerateContentResponse = await this.chatSession.sendMessage({
        message: message
      });
      return response.text || "I'm speechless! Try asking something else.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Oops! I tripped over a charging cable. Can you say that again?";
    }
  }
}

export const geminiService = new GeminiService();