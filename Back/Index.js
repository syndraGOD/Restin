import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ16qf4yTL8fOHsqJmWD8EIcRyyRY8QkM",
  authDomain: "restin-d570e.firebaseapp.com",
  projectId: "restin-d570e",
  storageBucket: "restin-d570e.appspot.com",
  messagingSenderId: "738247474251",
  appId: "1:738247474251:web:1dabca001c3acc239761ce",
  measurementId: "G-KSK51QQ9YQ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, "cities");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}
console.log(getCities(db));
