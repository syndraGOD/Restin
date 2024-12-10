const { collection, query, where, getDocs } = require("firebase/firestore");
const { db } = require("../configFiles/firebaseConfig");

// 컬렉션에서 userId로 쿼리하는 함수
async function queryRead(collectionName, key, value) {
  try {
    const q = query(collection(db, collectionName), where(key, "==", value));

    const querySnapshot = await getDocs(q);
    const results = [];

    querySnapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return {
      success: true,
      data: results,
    };
  } catch (error) {
    console.error("Query error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
module.exports = { queryRead };

// 사용 예시:
// const result = await queryByUserId("COLLECTION_NAME", "USER_ID_VALUE");
