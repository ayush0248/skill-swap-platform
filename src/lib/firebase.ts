// lib/firebase.ts
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCl3DIkTHF8qsuFNMRaPh4sF3GhSstyJ3I",
  authDomain: "odoo-45db4.firebaseapp.com",
  projectId: "odoo-45db4",
  storageBucket: "odoo-45db4.appspot.com", // ✅ Fixed this
  messagingSenderId: "258429835952",
  appId: "1:258429835952:web:1efc6da522245f3c3fb975",
  measurementId: "G-TEWYG46V62"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
