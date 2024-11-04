import { db } from "../configFiles/firebaseConfig.js";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import UserForm from "../models/userDataForm.js";
import { RESForm } from "../models/inPacketForm.js";
const colName = "USER";

// 사용자 생성 함수
const db_user_create = async (userId, userData) => {
  const obj_userData = {
    ...userData,
  };
  try {
    const userRef = doc(db, colName, userId);
    await setDoc(userRef, obj_userData);
    return new RESForm({
      resultCode: 200,
      text: "User created successfully",
    });
  } catch (error) {
    return new RESForm({
      resultCode: 500,
      text: "Error creating user",
      error,
    });
  }
};

// 사용자 읽기 함수
const db_user_read = async (userId) => {
  try {
    const userRef = doc(db, colName, userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return new RESForm({
        resultCode: 200,
        text: "User retrieved successfully",
        data: userSnap.data(),
      });
    } else {
      return new RESForm({
        resultCode: 404,
        text: "User not found",
      });
    }
  } catch (error) {
    return new RESForm({
      resultCode: 500,
      text: "Error retrieving user",
      error,
    });
  }
};

// 사용자 업데이트 함수
const db_user_update = async (userId, userData) => {
  const obj_userData = {
    ...userData,
  };
  try {
    const userRef = doc(db, colName, userId);
    await updateDoc(userRef, userData);
    return new RESForm({
      resultCode: 200,
      text: "User updated successfully",
    });
  } catch (error) {
    return new RESForm({});
    return {
      resultCode: 500,
      text: "Error updating user",
      error,
    };
  }
};

// 사용자 삭제 함수
const db_user_delete = async (userId) => {
  try {
    const userRef = doc(db, colName, userId);
    await deleteDoc(userRef);
    return new RESForm({
      resultCode: 200,
      text: "User deleted successfully",
    });
  } catch (error) {
    return new RESForm({
      resultCode: 500,
      text: "Error deleting user",
      error,
    });
  }
};

const a = db_user_create(
  "hanwol",
  new UserForm({ userId: "hi", profile: { name: "hello" } })
);
a.then((result) => {
  console.log(result);
});
console.log(a);
export { db_user_create, db_user_read, db_user_update, db_user_delete };
