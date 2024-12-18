import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, initializeAuth } from "firebase/auth";
export const firebaseConfig = {
  apiKey: "AIzaSyDQ16qf4yTL8fOHsqJmWD8EIcRyyRY8QkM",
  authDomain: "restin-d570e.firebaseapp.com",
  projectId: "restin-d570e",
  storageBucket: "restin-d570e.appspot.com",
  messagingSenderId: "738247474251",
  appId: "1:738247474251:web:1dabca001c3acc239761ce",
  measurementId: "G-KSK51QQ9YQ",
};

export const app = initializeApp(firebaseConfig);
export const fbAuth = getAuth(app);
// export const userAuth = getAuth(app).currentUser;
export const db = getFirestore(app);
export const storage = getStorage(app);
