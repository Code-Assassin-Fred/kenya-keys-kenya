import * as admin from 'firebase-admin';

let adminDb: admin.firestore.Firestore;
let adminAuth: admin.auth.Auth;
let adminStorage: admin.storage.Storage;

let projectId = process.env.FIREBASE_PROJECT_ID;
let clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = '';

// Option 1: Base64-encoded private key (most reliable for hosting platforms)
if (process.env.FIREBASE_PRIVATE_KEY_BASE64) {
  privateKey = Buffer.from(process.env.FIREBASE_PRIVATE_KEY_BASE64, 'base64').toString('utf8');
  console.info('Loaded Firebase private key from Base64 env var.');
} else {
  privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
}

// Support pasting the whole service account JSON into a single env var
const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT || process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
if (serviceAccountEnv && (!projectId || !clientEmail || !privateKey)) {
  try {
    const parsed = JSON.parse(serviceAccountEnv);
    projectId = projectId || parsed.project_id || parsed.projectId;
    clientEmail = clientEmail || parsed.client_email || parsed.clientEmail;
    privateKey = privateKey || parsed.private_key || parsed.privateKey || '';
    console.info('Loaded Firebase service account from JSON env var.');
  } catch (e) {
    // not JSON — ignore and continue with existing vars
  }
}

if (projectId && clientEmail && privateKey) {
  // Clean private key: remove enclosing quotes and fix newline characters
  privateKey = privateKey.trim().replace(/^["']|["']$/g, '');

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

  // If the key still has no newlines, try to reconstruct it
  if (!privateKey.includes('\n') && privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
    privateKey = privateKey
      .replace('-----BEGIN PRIVATE KEY-----', '-----BEGIN PRIVATE KEY-----\n')
      .replace('-----END PRIVATE KEY-----', '\n-----END PRIVATE KEY-----');
    const parts = privateKey.split('\n');
    if (parts.length === 3) {
      parts[1] = parts[1].replace(/\s+/g, '\n');
      privateKey = parts.join('');
    }
  }

  let initialized = false;
  if (!admin.apps.length) {
    try {
      console.info('Attempting Firebase Admin initialization.');
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
      console.info('Firebase Admin initialized successfully.');
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