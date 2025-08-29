// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; ❌ bu build vaqtida xato beradi

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

// Exportlar
export const auth = getAuth(app);
export const db = getFirestore(app);

// Agar analytics kerak bo‘lsa, faqat clientda chaqiramiz:
export let analytics;
if (typeof window !== "undefined") {
  // dynamic import qilamiz
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  });
}
