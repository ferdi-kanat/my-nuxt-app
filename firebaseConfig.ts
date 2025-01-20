/**
 * Firebase configuration and initialization module.
 * @module firebaseConfig
 * 
 * This module initializes Firebase services including:
 * - Firebase App
 * - Firestore Database
 * - Authentication
 * - Analytics (client-side only)
 * 
 * 
 * @exports {Auth} auth - Firebase Authentication instance
 * @exports {Firestore} db - Firestore Database instance
 */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

  // Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const db = getFirestore(app);

if (process.client) {
  const { getAnalytics } = await import('firebase/analytics');
  const analytics = getAnalytics(app);
}

export { db };