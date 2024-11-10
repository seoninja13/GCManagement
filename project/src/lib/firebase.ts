import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_UBJafV8LnDbtpP4SxT-0GKy6s75mEbk",
  authDomain: "jobber-clone.firebaseapp.com",
  projectId: "jobber-clone",
  storageBucket: "jobber-clone.firebasestorage.app",
  messagingSenderId: "489497407222",
  appId: "1:489497407222:web:3f67b22097b10084cb46d7"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);