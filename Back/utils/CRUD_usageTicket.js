const { db } = require("../configFiles/firebaseConfig.js");
const {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  where,
  query,
  getDocs,
} = require("firebase/firestore");

const colName = "USAGE_TICKETS";
const {
  firebaseDateToJSDate,
  jsDateToFirebaseDate,
} = require("./firebaseDateConverter.js");

const db_usageTicket_create = async (usage) => {
  const { usageLogId } = usage;
  const newUserForm = new UserForm({
    ...usage,
  });
  const obj_userData = {
    ...newUserForm,
  };
  try {
    const userRef = doc(db, colName, usageLogId); //obj_userData.userId);
    await setDoc(userRef, obj_userData);
    console.log("New UsageTicket Created / nick : ", usageLogId);
    return new RESForm({
      resultCode: 200,
    });
  } catch (error) {
    return new RESForm({
      resultCode: 500,
      text: "Error creating usageTicket",
      error,
    });
  }
};
const db_usageTicket_delete = async (ticketNumber) => {};
module.exports(db_usageTicket_create, db_usageTicket_delete);
