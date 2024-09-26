import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig.js";
// import { firebaseui } from "firebaseui";
const firebase = require("firebase");
const firebaseui = require("firebaseui");
const authUI = new firebaseui.auth.AuthUI(firebase.auth());

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

try {
  const hanwol = doc(db, "STORE/Test");
  //   const docRef = await setDoc(hanwol,
  //   {
  //     name: "한울",
  //   }
  // );
  const getData = await getDoc(hanwol);
  console.log(getData.data());
} catch (e) {
  console.error("Error adding document: ", e);
}
