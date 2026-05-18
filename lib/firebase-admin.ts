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
  privateKey = privateKey.replace(/\\n/g, '\n');

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
  console.warn('Firebase Admin environment variables are missing. Using placeholders for build safety.');
  adminDb = {} as any;
  adminAuth = {} as any;
  adminStorage = {} as any;
}

export { adminDb, adminAuth, adminStorage };


