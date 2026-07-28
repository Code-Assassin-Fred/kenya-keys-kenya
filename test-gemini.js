const path = require('path');
const dotenv = require('dotenv');
const { GoogleGenAI } = require('@google/genai');

// Load environment variables. First check .env.local, then fallback to .env
dotenv.config({ path: path.join(__dirname, '.env.local') });
dotenv.config({ path: path.join(__dirname, '.env') });

async function run() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("Error: GEMINI_API_KEY is not defined in your environment variables.");
        process.exit(1);
    }

    console.log("Initializing GoogleGenAI client with GEMINI_API_KEY...");
    const ai = new GoogleGenAI({ apiKey });

    // Attempt to use gemini-2.5-flash as requested. If not available, fall back to gemini-3.6-flash.
    const models = ['gemini-2.5-flash', 'gemini-3.6-flash'];
    let lastError = null;

    for (const modelName of models) {
        try {
            console.log(`Sending prompt to ${modelName} model...`);
            const response = await ai.models.generateContent({
                model: modelName,
                contents: 'Say hello in one sentence',
            });

            console.log(`\nResponse from Gemini API (using ${modelName}):`);
            console.log(response.text.trim());
            return; // Success!
        } catch (error) {
            console.warn(`Warning: Failed to call model ${modelName}: ${error.message}\n`);
            lastError = error;
        }
    }

    console.error("Error calling Gemini API on all attempted models:", lastError);
    process.exit(1);
}

run();
