import { initializeApp } from "firebase/app";
import { getAut, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAq-s2_VJGIx4jvkqLvVRzuAbxCqFbajEM",
  authDomain: "fir-course-47e73.firebaseapp.com",
  projectId: "fir-course-47e73",
  storageBucket: "fir-course-47e73.firebasestorage.app",
  messagingSenderId: "749362660268",
  appId: "1:749362660268:web:820efaff05e7efdb773009",
  measurementId: "G-TS46ER40L4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export { auth };
