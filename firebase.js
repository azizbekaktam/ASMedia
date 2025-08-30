// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvCqdbIIlIDUHc-F6KivKT3CXufxcVGeM",
  authDomain: "asmedia-6aed9.firebaseapp.com",
  projectId: "asmedia-6aed9",
  storageBucket: "asmedia-6aed9.firebasestorage.app",
  messagingSenderId: "833500094690",
  appId: "1:833500094690:web:0f5aaa9ee195bcff303ebb",
  measurementId: "G-PQNVDWQYB4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export let analytics;
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  });
}
