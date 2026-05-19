const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

function loadEnv() {
    try {
        const envPath = path.join(__dirname, ".env.local");
        const content = fs.readFileSync(envPath, "utf-8");
        content.split("\n").forEach(line => {
            const parts = line.split("=");
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const value = parts.slice(1).join("=").trim();
                process.env[key] = value;
            }
        });
    } catch (e) {
        console.error("Failed to load .env.local", e);
    }
}

loadEnv();

async function main() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API key found in .env.local");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    try {
        const history = [
            { role: "model", parts: [{ text: "Hello! How can I help you today regarding Kenya Keys?" }] }
        ];
        const chat = model.startChat({ history });
        const result = await chat.sendMessage("Hi!");
        console.log("Success:", result.response.text());
    } catch (error) {
        console.error("Error from API:", error.message);
    }
}

main();
