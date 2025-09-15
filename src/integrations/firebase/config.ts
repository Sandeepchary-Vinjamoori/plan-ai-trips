// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo0jV9BD48vCPNEJX-4P8W5C7nmuO-yds",
  authDomain: "trip-planner-62cd8.firebaseapp.com",
  projectId: "trip-planner-62cd8",
  storageBucket: "trip-planner-62cd8.firebasestorage.app",
  messagingSenderId: "111192546468",
  appId: "1:111192546468:web:0e7aad8de60c394f3fda31",
  measurementId: "G-6F5VGJNP6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;

