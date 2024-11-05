import { db } from "../configFiles/firebaseConfig.js";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import UserForm from "../models/userDataForm.js";
import { RESForm } from "../models/inPacketForm.js";
import {
  firebaseDateToJSDate,
  jsDateToFirebaseDate,
} from "./firebaseDateConverter.js";

const colName = "USER";

// 사용자 생성 함수
/**
 * args = new UserForm
 * userId is auto create #uuid
 */
const db_user_create = async (userData) => {
  // const uuid = uuidv4();
  const newUserForm = new UserForm({
    ...userData,
  });
  const obj_userData = {
    ...newUserForm,
  };
  try {
    const userRef = doc(db, colName, "sdf"); //obj_userData.userId);
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

// 사용자 읽기 함수 (non-query)
const db_user_read = async (userId) => {
  // console.log(userId);
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
    console.log(error);
    return new RESForm({
      resultCode: 500,
      text: "Error retrieving user",
      error,
    });
  }
};

/**
 *
 * @param {string} fieldName
 * @param {string} value
 * @returns
 */
const db_user_read_query = async (fieldName, value) => {
  try {
    // 원하는 필드 기준으로 문서 검색
    const userCollectionRef = collection(db, colName);
    const q = query(userCollectionRef, where(fieldName, "==", value));
    const querySnapshot = await getDocs(q);

    // 결과 처리
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs.map((doc) => doc.data());
      return new RESForm({
        resultCode: 200,
        text: "User(s) found sucess",
        data: userData,
      });
    } else {
      return new RESForm({
        resultCode: 404,
        text: "No user found with the specified field and value",
        data: null,
      });
    }
  } catch (error) {
    return new RESForm({
      resultCode: 500,
      text: "Error reading user data",
      data: null,
      error,
    });
  }
};

// 사용자 업데이트 함수
/** userdata는 "profile.name" or object(전체업데이트)
 */
const db_user_update = async (userId, userData) => {
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

let a;

a = db_user_create({ userId: "Asd", profile: { name: "hello" } });
// a = db_user_update("hanwol", {
//   "profile.name": "hello",
//   "address.addressId": "test",
// });
// a = db_user_delete("hanwol");
// a.then((result) => {
//   console.log(result);
//   process.exit(1);
// });
export {
  db_user_create,
  db_user_read,
  db_user_read_query,
  db_user_update,
  db_user_delete,
};
