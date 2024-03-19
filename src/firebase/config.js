// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-_Gqk5rXD2O_EgG4NSp0wXMDWrdpc1oU",
  authDomain: "sc2006-b41bd.firebaseapp.com",
  projectId: "sc2006-b41bd",
  storageBucket: "sc2006-b41bd.appspot.com",
  messagingSenderId: "629425142873",
  appId: "1:629425142873:web:437931a4b80ac0131d8548",
  measurementId: "G-RB6QXDLLPJ"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);