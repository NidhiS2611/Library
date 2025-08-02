// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEjjnL8o8fCsoFEmK1OcYYtxXUdRUpWJ8",
  authDomain: "library-3390a.firebaseapp.com",
  projectId: "library-3390a",
  storageBucket: "library-3390a.appspot.com",
  messagingSenderId: "410717725920",
  appId: "1:410717725920:web:f879df68bbfa2cf72a5c85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app);
export { messaging }