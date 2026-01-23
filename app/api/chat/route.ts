import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";


export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("GEMINI_API_KEY is missing");
            return NextResponse.json({ error: "Configuration error: API Key missing" }, { status: 500 });
        }

        const body = await req.json();
        const { messages } = body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: "No messages provided" }, { status: 400 });
        }

        // Load knowledge base
        const kbPath = path.join(process.cwd(), "knowldgebase.json");
        let knowledgeBase;
        try {
            const kbContent = await fs.readFile(kbPath, "utf-8");
            knowledgeBase = JSON.parse(kbContent);
        } catch (kbError) {
            console.error("Error loading knowledge base:", kbError);
            return NextResponse.json({ error: "Failed to load knowledge base" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are the Kenya Keys Virtual Assistant, a warm and helpful digital representative of Kenya Keys, a nonprofit educational organization. 
      
      Your Identity:
      - Name: Kenya Keys Virtual Assistant (or simply Kenya Keys AI).
      - Purpose: To help visitors learn about Kenya Keys' mission to empower rural Kenyan youth through education.
      
      Context gathered from knowledge base:
      ${JSON.stringify(knowledgeBase, null, 2)}
      
      Instructions:
      1. When asked "Who are you?" or similar identity questions, introduce yourself as the Kenya Keys Virtual Assistant and briefly mention your mission to support education in rural Kenya.
      2. Be warm, professional, and empathetic.
      3. Use the knowledge base provided above as your source of truth for programs, impact, and organization details.
      4. If you don't know an answer, politely suggest they reach out via the Contact section of the website.
      5. Keep responses concise and engaging.
      6. Do NOT mention you are an AI model from Google or that you are using a JSON file. Speak as a dedicated part of the Kenya Keys team.`
        });

        // Extract the last message and history
        const lastMessage = messages[messages.length - 1].content;
        const history = messages.slice(0, -1).map((m: any) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }],
        }));

        const chat = model.startChat({
            history: history,
        });

        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ role: "assistant", content: text });
    } catch (error: any) {
        console.error("Chat API error:", error);
        return NextResponse.json({
            error: "Failed to get response from AI",
            details: error.message
        }, { status: 500 });
    }
}
