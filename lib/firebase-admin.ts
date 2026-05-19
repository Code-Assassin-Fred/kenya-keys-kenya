import * as admin from 'firebase-admin';

let adminDb: admin.firestore.Firestore;
let adminAuth: admin.auth.Auth;
let adminStorage: admin.storage.Storage;

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (projectId && clientEmail && privateKey) {
  // Clean private key: remove enclosing quotes and fix newline characters
  privateKey = privateKey.trim();
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.substring(1, privateKey.length - 1);
  } else if (privateKey.startsWith("'") && privateKey.endsWith("'")) {
    privateKey = privateKey.substring(1, privateKey.length - 1);
  }
  
  // Handle case where it might be stringified JSON from some environments
  if (privateKey.startsWith('{')) {
    try {
      const parsed = JSON.parse(privateKey);
      if (parsed.privateKey) privateKey = parsed.privateKey;
      else if (parsed.private_key) privateKey = parsed.private_key;
    } catch (e) {}
  }

  // Replace literal '\n' string with actual newlines
  privateKey = privateKey.replace(/\\n/g, '\n');
  
  // If the key has spaces instead of newlines (common issue with some hosting dashboards)
  if (!privateKey.includes('\n') && privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
     privateKey = privateKey.replace('-----BEGIN PRIVATE KEY-----', '-----BEGIN PRIVATE KEY-----\n');
     privateKey = privateKey.replace('-----END PRIVATE KEY-----', '\n-----END PRIVATE KEY-----');
     // The base64 part might have spaces, we should replace them with newlines
     const parts = privateKey.split('\n');
     if (parts.length === 3) {
         parts[1] = parts[1].replace(/\s+/g, '\n');
         privateKey = parts.join('');
     }
  }

  let initialized = false;
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
      initialized = true;
    } catch (error) {
      console.error('Firebase admin initialization error:', error);
    }
  } else {
    initialized = true;
  }

  if (initialized) {
    try {
      adminDb = admin.firestore();
      adminAuth = admin.auth();
      adminStorage = admin.storage();
    } catch (error) {
      console.error('Firebase services initialization error:', error);
      adminDb = {} as any;
      adminAuth = {} as any;
      adminStorage = {} as any;
    }
  } else {
    console.warn('Firebase Admin failed to initialize. Using placeholders.');
    adminDb = {} as any;
    adminAuth = {} as any;
    adminStorage = {} as any;
  }
} else {
  const missing = [];
  if (!projectId) missing.push('FIREBASE_PROJECT_ID');
  if (!clientEmail) missing.push('FIREBASE_CLIENT_EMAIL');
  if (!privateKey) missing.push('FIREBASE_PRIVATE_KEY');
  
  console.warn(`Firebase Admin environment variables are missing: ${missing.join(', ')}. Using placeholders for build safety.`);
  adminDb = {} as any;
  adminAuth = {} as any;
  adminStorage = {} as any;
}

export { adminDb, adminAuth, adminStorage };


