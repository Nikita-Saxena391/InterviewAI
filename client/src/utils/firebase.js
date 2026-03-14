import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-bf6db.firebaseapp.com",
  projectId: "interviewiq-bf6db",
  storageBucket: "interviewiq-bf6db.firebasestorage.app",
  messagingSenderId: "89208278374",
  appId: "1:89208278374:web:2bd77e7aa89fa310ef0ca7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };