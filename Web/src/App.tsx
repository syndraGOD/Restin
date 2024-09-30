import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "@mui/material/Button";
import firebaseConfig from "./assets/firebaseConfig.js";
import { initializeApp } from "firebase/app";
// import { GoogleAuthProvider } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log(result);
    console.log(user);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.log(error);
  });

function App() {
  const [count, setCount] = useState(0);
  // console.log(firebaseConfig);
  return (
    <>
      <h1>Restin</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>식빵, 여기는 어플이 아닌 웹입니다, Restin Test Server</p>
      </div>
      <Button variant="contained">Hello world</Button>
    </>
  );
}

export default App;
