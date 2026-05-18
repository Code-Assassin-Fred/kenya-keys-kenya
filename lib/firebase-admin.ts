import * as admin from 'firebase-admin';

let adminDb: admin.firestore.Firestore;
let adminAuth: admin.auth.Auth;
let adminStorage: admin.storage.Storage;

if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // Handling the newline characters in the private key
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    } catch (error) {
      console.error('Firebase admin initialization error', error);
    }
  }
  adminDb = admin.firestore();
  adminAuth = admin.auth();
  adminStorage = admin.storage();
} else {
  console.warn('Firebase Admin environment variables are missing. Using placeholders for build safety.');
  adminDb = {} as any;
  adminAuth = {} as any;
  adminStorage = {} as any;
}

export { adminDb, adminAuth, adminStorage };

