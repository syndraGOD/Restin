import { Button } from "@mui/material";
import { initializeApp } from "firebase/app";
import React from "react";
import firebaseConfig from "./firebaseConfig";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginPage = () => {
  return (
    <>
      <h2>u a Not Login</h2>
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
    </>
  );
};

export default LoginPage;
