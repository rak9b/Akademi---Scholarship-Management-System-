// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtbgnbGvToRZkpvPyXBs9GnExjAojWt68",
  authDomain: "akademi-scholershi.firebaseapp.com",
  projectId: "akademi-scholershi",
  storageBucket: "akademi-scholershi.firebasestorage.app",
  messagingSenderId: "982543316528",
  appId: "1:982543316528:web:9bae2eaf7ff0ba25295ff5",
  measurementId: "G-KSVKVVMXRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default auth;
export { app, analytics };