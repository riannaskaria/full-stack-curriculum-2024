// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnhsC01iHZgUqiUHQyh_ngHIRnQ9yQJ4g",
  authDomain: "tpeo-c4568.firebaseapp.com",
  projectId: "tpeo-c4568",
  storageBucket: "tpeo-c4568.firebasestorage.app",
  messagingSenderId: "206953949419",
  appId: "1:206953949419:web:2094382fa8f11a1b8876ae",
  measurementId: "G-RK0HMYTF01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()