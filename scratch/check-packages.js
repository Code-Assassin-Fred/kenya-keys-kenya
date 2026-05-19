const fs = require('fs');
const path = require('path');

// 1. Load env
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            const key = match[1];
            let value = match[2] || '';
            if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
                value = value.substring(1, value.length - 1);
            }
            if (value.length > 0 && value.charAt(0) === "'" && value.charAt(value.length - 1) === "'") {
                value = value.substring(1, value.length - 1);
            }
            process.env[key] = value;
        }
    });
}

// 2. Init Firebase
const admin = require('firebase-admin');
const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKey) {
    console.error("Missing env variables");
    process.exit(1);
}

privateKey = privateKey.trim().replace(/\\n/g, '\n');

admin.initializeApp({
    credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
    })
});

const db = admin.firestore();

async function run() {
    const snapshot = await db.collection('packages').get();
    console.log(`Total packages in collection: ${snapshot.size}`);
    snapshot.forEach(doc => {
        console.log(`ID: ${doc.id} | Title: "${doc.data().title}" | Amount: ${doc.data().amount} | Period: "${doc.data().period}"`);
    });
    process.exit(0);
}

run();
