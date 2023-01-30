import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBajMHOIm0iY5vMnSachu0cd8Ujgzi-6_A",
  authDomain: "clone-9040b.firebaseapp.com",
  projectId: "clone-9040b",
  storageBucket: "clone-9040b.appspot.com",
  messagingSenderId: "382318725281",
  appId: "1:382318725281:web:160e1c5d5306aac01d88e0",
  measurementId: "G-51DY30W0Q4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
