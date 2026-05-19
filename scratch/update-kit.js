const fs = require('fs');
const path = require('path');

// 1. Manually parse .env.local to load environment variables
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            const key = match[1];
            let value = match[2] || '';
            // Remove wrapping quotes
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

// 2. Initialize Firebase Admin
const admin = require('firebase-admin');

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKey) {
    console.error("Error: Missing Firebase environment variables in .env.local!");
    process.exit(1);
}

privateKey = privateKey.trim();
privateKey = privateKey.replace(/\\n/g, '\n');

try {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
        })
    });
    console.log("Firebase Admin successfully initialized.");
} catch (error) {
    console.error("Firebase admin initialization error:", error);
    process.exit(1);
}

const db = admin.firestore();

// 3. Find and update packages with title "Landing Kit"
async function run() {
    try {
        console.log("Querying packages collection...");
        const snapshot = await db.collection('packages').get();
        if (snapshot.empty) {
            console.log("No packages found.");
            return;
        }

        let updatedCount = 0;
        for (const doc of snapshot.docs) {
            const data = doc.data();
            console.log(`Found package: "${data.title}" ($${data.amount})`);
            
            if (data.title && data.title.toLowerCase().trim() === 'landing kit') {
                console.log(`Updating document ${doc.id} from "${data.title}" to "Launch Kit"...`);
                await db.collection('packages').doc(doc.id).update({
                    title: 'Launch Kit'
                });
                updatedCount++;
            }
        }
        
        console.log(`\nSuccessfully updated ${updatedCount} packages.`);
    } catch (err) {
        console.error("Error running update:", err);
    } finally {
        process.exit(0);
    }
}

run();
