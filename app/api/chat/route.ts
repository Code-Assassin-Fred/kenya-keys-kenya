import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

// Load the knowledge base once at module level
const knowledgeBasePath = path.join(process.cwd(), "knowledge-base.json");
const knowledgeBase = JSON.parse(fs.readFileSync(knowledgeBasePath, "utf-8"));

const SYSTEM_PROMPT = `You are the Kenya Keys Virtual Assistant — a friendly, knowledgeable, and professional chatbot for the Kenya Keys organization.

Your role is to help website visitors learn about Kenya Keys, its mission, programs, and how they can get involved.

Here is the organization's knowledge base that you must use to answer questions:
${JSON.stringify(knowledgeBase, null, 2)}

Guidelines:
- Always be warm, welcoming, and helpful.
- Answer questions based on the knowledge base provided above.
- If a visitor asks something outside the scope of Kenya Keys, politely redirect them to relevant topics.
- Keep responses concise but informative (2-4 sentences for simple questions).
- Encourage visitors to donate, sponsor a student, or learn more about programs when appropriate.
- If you don't know the answer, suggest they contact Kenya Keys directly via the provided email addresses.
- Never make up information that is not in the knowledge base.`;

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "Server configuration error. Please try again later." },
                { status: 500 }
            );
        }

        const { messages } = await req.json();
        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Invalid request format." },
                { status: 400 }
            );
        }

        const ai = new GoogleGenAI({ apiKey });

        // Build conversation history for the Gemini API
        const contents = messages.map((msg: { role: string; content: string }) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
        }));

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents,
            config: {
                systemInstruction: SYSTEM_PROMPT,
            },
        });

        const text = response.text?.trim() || "I'm sorry, I couldn't generate a response. Please try again.";

        return NextResponse.json({ role: "assistant", content: text });
    } catch (error: any) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: error.message || "An unexpected error occurred. Please try again later." },
            { status: 500 }
        );
    }
}
