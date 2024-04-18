// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "taskmanager-b08af.firebaseapp.com",
  projectId: "taskmanager-b08af",
  storageBucket: "taskmanager-b08af.appspot.com",
  messagingSenderId: "282967867388",
  appId: "1:282967867388:web:d51fa6805fc9e70f91bc79"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);