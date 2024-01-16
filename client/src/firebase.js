import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCy84V1LKpZngcaH6avoc95oSrL1vdbU48",
  authDomain: "clone-699d3.firebaseapp.com",
  projectId: "clone-699d3",
  storageBucket: "clone-699d3.appspot.com",
  messagingSenderId: "240555290445",
  appId: "1:240555290445:web:13bd0213f7f55e1da85104",
  measurementId: "G-BJY16CTHNN",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;

// Initialize Firebase
