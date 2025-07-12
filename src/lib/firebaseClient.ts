// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl3DIkTHF8qsuFNMRaPh4sF3GhSstyJ3I",
  authDomain: "odoo-45db4.firebaseapp.com",
  projectId: "odoo-45db4",
  storageBucket: "odoo-45db4.firebasestorage.app",
  messagingSenderId: "258429835952",
  appId: "1:258429835952:web:1efc6da522245f3c3fb975",
  measurementId: "G-TEWYG46V62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); 
export const auth = getAuth(app);
export const db = getFirestore(app);