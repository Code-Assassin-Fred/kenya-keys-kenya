import { POST } from '../app/api/chat/route';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

async function test() {
    console.log("Mocking request to /api/chat POST...");
    const mockReq = new Request('http://localhost/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: [
                { role: 'user', content: 'Say hello in one sentence' }
            ]
        })
    });
    
    try {
        const response = await POST(mockReq);
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Response data:", data);
    } catch (err) {
        console.error("Error executing POST handler:", err);
    }
}

test();
