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
import firebase from "firebase/compat/app";
import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

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

// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: "<url-to-redirect-to-on-success>",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: "<your-tos-url>",
  // Privacy policy url/callback.
  privacyPolicyUrl: function () {
    window.location.assign("<your-privacy-policy-url>");
  },
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

// <!-- The surrounding HTML is left untouched by FirebaseUI.
//      Your app may use that space for branding, controls and other customizations.-->
