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
const userData = new UserForm({
  userId: "user12345",
  profile: {
    userId: "user12345",
    gender: 1,
    name: "Alice",
    email: "alice@example.com",
    phoneNumber: "+1234567890",
    birth: { seconds: 631152000, nanoseconds: 0 }, // 예: 1990년 1월 1일
    joinDate: { seconds: 1672531200, nanoseconds: 0 }, // 예: 2023년 1월 1일
    userType: "user",
    accountState: "active",
  },
  opt: {
    email_opt: true,
    sms_opt: false,
    push_opt: true,
    night_opt: false,
  },
  usage: {
    usageLogId: "log123",
    startTime: { seconds: 1672531200, nanoseconds: 0 },
    endTime: { seconds: 1672534800, nanoseconds: 0 },
    totalUsageDuration: 3600,
  },
  address: {
    addressId: "address123",
    addressType: "home",
    addressLine1: "123 Main St",
    city: "Seoul",
    state: "Seoul",
    postal_code: "12345",
    country: "South Korea",
  },
  security: {
    lastLogin: { seconds: 1672531200, nanoseconds: 0 },
    login_attempts: 1,
    auth_token: "token123",
  },
  points: {
    reward_points: 100,
    vip_tier: "Gold",
    points_expiration: { seconds: 1680211200, nanoseconds: 0 },
  },
  preference: {
    recently_viewed: ["item1", "item2"],
    wishlist: ["itemA", "itemB"],
    preferred_category: ["electronics", "books"],
    purchase_history: ["item1", "itemB"],
  },
});

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
