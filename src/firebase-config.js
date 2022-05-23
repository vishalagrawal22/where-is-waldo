import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-oO3aYW5IvCF6p1U-IwnZp941kiaHjLo",
  authDomain: "where-is-waldo-a7ec5.firebaseapp.com",
  projectId: "where-is-waldo-a7ec5",
  storageBucket: "where-is-waldo-a7ec5.appspot.com",
  messagingSenderId: "546512989745",
  appId: "1:546512989745:web:76366ed572f0d303deef10",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");
export const db = getFirestore(app);
connectFirestoreEmulator(db, "localhost", "8080");
