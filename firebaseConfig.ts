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
  apiKey: "AIzaSyDHx57lXdNxffe8Lz1R9FwIvVcLR3CByMQ",
  authDomain: "my-nuxt-app-65966.firebaseapp.com",
  projectId: "my-nuxt-app-65966",
  storageBucket: "my-nuxt-app-65966.firebasestorage.app",
  messagingSenderId: "448069639486",
  appId: "1:448069639486:web:594a94b8d482547ad9e06f",
  measurementId: "G-5VQ9DHNR4M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const db = getFirestore(app);

if (process.client) {
  const { getAnalytics } = await import('firebase/analytics');
  const analytics = getAnalytics(app);
}

export { db };