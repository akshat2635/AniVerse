// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
// import {}
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGXxldsus1yvoTMtT1WqbRoUF6ICdBItE",
  authDomain: "anime-recom-64c5c.firebaseapp.com",
  projectId: "anime-recom-64c5c",
  storageBucket: "anime-recom-64c5c.appspot.com",
  messagingSenderId: "1065153685837",
  appId: "1:1065153685837:web:1932a94cec606974e4af04",
  measurementId: "G-MBEKBRT6XP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);