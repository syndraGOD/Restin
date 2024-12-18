// import { initializeApp, getApps } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");
const firebaseConfig = {
  apiKey: "AIzaSyDQ16qf4yTL8fOHsqJmWD8EIcRyyRY8QkM",
  authDomain: "restin-d570e.firebaseapp.com",
  projectId: "restin-d570e",
  storageBucket: "restin-d570e.appspot.com",
  messagingSenderId: "738247474251",
  appId: "1:738247474251:web:1dabca001c3acc239761ce",
  measurementId: "G-KSK51QQ9YQ",
};

const admin = require("firebase-admin");
admin.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
module.exports = { firebaseConfig, app, db, admin, storage };
