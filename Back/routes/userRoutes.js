// Firebase Admin SDK 초기화
const express = require("express");
const admin = require("firebase-admin");
const app = express();
app.use(express.json());

const serviceAccount = require("./path/to/your-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// 사용자의 데이터를 Firestore에 추가하는 API
app.post("/api.restin.co.kr/db/createUser", async (req, res) => {
  const {
    userId,
    profile = {},
    opt = {},
    usage = {},
    address = {},
    security = {},
    points = {},
    preference = {},
  } = req.body;

  const userData = {
    userId: userId ?? null,
    profile: {
      userId,
      gender: profile.gender ?? null,
      name: profile.name ?? null,
      email: profile.email ?? null,
      phoneNumber: profile.phoneNumber ?? null,
      birth: profile.birth ?? null,
      joinDate: profile.joinDate ?? null,
      userType: profile.userType ?? null,
      accountState: profile.accountState ?? null,
    },
    opt: {
      email_opt: opt.email_opt ?? null,
      sms_opt: opt.sms_opt ?? null,
      push_opt: opt.push_opt ?? null,
      night_opt: opt.night_opt ?? null,
    },
    usage: {
      usageLogId: usage.usageLogId ?? null,
      startTime: usage.startTime ?? null,
      endTime: usage.endTime ?? null,
      totalUsageDuration: usage.totalUsageDuration ?? null,
    },
    address: {
      addressId: address.addressId ?? null,
      addressType: address.addressType ?? null,
      addressLine1: address.addressLine1 ?? null,
      city: address.city ?? null,
      state: address.state ?? null,
      postal_code: address.postal_code ?? null,
      country: address.country ?? null,
    },
    security: {
      lastLogin: security.lastLogin ?? null,
      login_attempts: security.login_attempts ?? null,
      auth_token: security.auth_token ?? null,
    },
    points: {
      reward_points: points.reward_points ?? null,
      vip_tier: points.vip_tier ?? null,
      points_expiration: points.points_expiration ?? null,
    },
    preference: {
      recently_viewed: preference.recently_viewed ?? null,
      wishlist: preference.wishlist ?? null,
      preferred_category: preference.preferred_category ?? null,
      purchase_history: preference.purchase_history ?? null,
    },
  };

  try {
    const userRef = db.collection("users").doc(userId);
    await userRef.set(userData);
    res.status(200).json({ message: "User created successfully", userData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
});

// 사용자의 특정 필드를 업데이트하는 API
app.post("/api.restin.co.kr/db/updateUser", async (req, res) => {
  const { userId, fieldsToUpdate } = req.body;

  if (!userId || !fieldsToUpdate) {
    return res
      .status(400)
      .json({ message: "userId and fieldsToUpdate are required." });
  }

  try {
    const userRef = db.collection("users").doc(userId);
    await userRef.update(fieldsToUpdate);
    res
      .status(200)
      .json({ message: "User updated successfully", fieldsToUpdate });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
