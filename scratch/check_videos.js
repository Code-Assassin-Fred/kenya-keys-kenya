// We can read and parse lib/videosData.ts directly to extract URLs
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../lib/videosData.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Simple regex to extract urls
const urlRegex = /url:\s*"([^"]+)"/g;
let match;
const urls = [];

while ((match = urlRegex.exec(content)) !== null) {
    urls.push(match[1]);
}

async function checkVideos() {
    console.log(`Checking ${urls.length} video URLs...\n`);
    
    for (const url of urls) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            console.log(`URL:    ${url}`);
            console.log(`Status: ${response.status} ${response.statusText}`);
            if (response.status === 200) {
                console.log(`✅ Reachable`);
            } else {
                console.log(`❌ NOT Reachable`);
            }
            console.log('-'.repeat(60));
        } catch (error) {
            console.log(`URL:    ${url}`);
            console.log(`❌ Error: ${error.message}`);
            console.log('-'.repeat(60));
        }
    }
}

checkVideos();
