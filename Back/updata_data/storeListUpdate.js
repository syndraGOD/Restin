import data from "./data.js";

import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  runTransaction,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig.js";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const storeListUpdate = async (db) => {
  const colName = "STORE";
  const col = collection(db, colName);
  data.map(async (itemData) => {
    const docRefUUID = await addDoc(col, itemData);
    const newDoc = doc(db, colName, docRefUUID.id);
    await updateDoc(newDoc, { UUID: docRefUUID.id });
  });
};

// try {
//   await runTransaction(db, async (transaction) => {
//     // const sfDoc = await transaction.get(sfDocRef);
//     // if (!sfDoc.exists()) {
//     //   throw "Document does not exist!";
//     // }

//     // const newPopulation = sfDoc.data().population + 1;
//     transaction.update(sfDocRef, { population: newPopulation });
//   });
//   console.log("Transaction successfully committed!");
// } catch (e) {
//   console.log("Transaction failed: ", e);
// }

storeListUpdate(db);
export default storeListUpdate;
