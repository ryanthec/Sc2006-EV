// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApHiTaDt7Az0WHrBNEmoKkjtwEBczw-R0",
  authDomain: "ev-app-7e8bc.firebaseapp.com",
  projectId: "ev-app-7e8bc",
  storageBucket: "ev-app-7e8bc.appspot.com",
  messagingSenderId: "276652350740",
  appId: "1:276652350740:web:982ea55f5fc4848333b601",
  measurementId: "G-PY7D684G82"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const FIREBASE_AUTH = getAuth(app);

