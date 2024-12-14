// Firebase 초기화
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

// Firebase 설정

/**
 * Firebase Timestamp object format.
 * @typedef {Object} FirebaseDateObject
 * @property {number} seconds - UTC seconds since epoch (1970-01-01T00:00:00Z).
 * @property {number} nanoseconds - Fractional seconds in nanoseconds.
 */

// UserForm 인스턴스 생성 예제

/**
 * Firestore에 새로운 UserForm 데이터를 생성하는 함수
 */
async function createUserInFirestore(user) {
  const userRef = doc(db, "users", user.userId);
  await setDoc(userRef, JSON.parse(JSON.stringify(user)));
  console.log("User data created in Firestore:", user);
}

/**
 * Firestore에서 특정 userId로 사용자 데이터를 검색하고 일부 필드를 업데이트하는 함수
 * @param {string} userId - 업데이트할 사용자의 ID
 */
async function updateUserInFirestore(userId) {
  const userRef = doc(db, "users", userId);

  try {
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      // 예를 들어 프로필 이름과 포인트를 업데이트하고자 할 때
      const updatedData = {
        "profile.name": "Updated Alice",
        "points.reward_points": 200,
      };
      await updateDoc(userRef, updatedData);
      console.log("User data updated in Firestore:", updatedData);
    } else {
      console.log("No such user found!");
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

// 실행 예제
(async () => {
  await createUserInFirestore(userData);
  await updateUserInFirestore("user12345");
})();
