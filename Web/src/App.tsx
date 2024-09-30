import { useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
// import firebaseConfig from "./assets/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDQ16qf4yTL8fOHsqJmWD8EIcRyyRY8QkM",
  authDomain: "restin-d570e.firebaseapp.com",
  projectId: "restin-d570e",
  storageBucket: "restin-d570e.appspot.com",
  messagingSenderId: "738247474251",
  appId: "1:738247474251:web:1dabca001c3acc239761ce",
  measurementId: "G-KSK51QQ9YQ",
};

//const app =

function App() {
  // console.log(firebaseConfig);
  return (
    <>
      <h1>Restin</h1>

      <Button
        variant="contained"
        onClick={() => {
          initializeApp(firebaseConfig);
          const provider = new GoogleAuthProvider();

          const auth = getAuth();
          console.log(`befor_auth : `, auth.currentUser);
          signInWithPopup(auth, provider)
            .then((result) => {
              const user = result.user;
              console.log(user);
              console.log(`after_auth : `, auth);
            })
            .catch((error) => {
              console.log(
                `google login Error: ${error.code} \n ${error.message}`
              );
            });
        }}
      >
        Google Login
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          initializeApp(firebaseConfig);
          // const provider = new GoogleAuthProvider();

          const auth = getAuth();
          const user = auth.currentUser;
          console.log(user);
        }}
      >
        Login State
      </Button>

      {/* <Button variant="contained">Hello world</Button> */}
    </>
  );
}

export default App;
