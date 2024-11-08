const {
  db_user_create,
  db_user_read,
  db_user_read_query,
  db_user_update,
  db_user_delete,
} = require("../utils/CRUD_userData.js");

const UserForm = require("../models/userDataForm.js");
const { firebaseConfig, admin } = require("../configFiles/firebaseConfig.js");
const { jsDateToFirebaseDate } = require("../utils/firebaseDateConverter.js");
const sendMsg = require("../utils/SMS_message.js");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/TokenAPI.JS");

/**
 *
 */
// admin.initializeApp(firebaseConfig);
const verifyTokenMiddleware = async (req, res, next) => {
  const userToken = req.headers["authorization"]?.split(" ")[1];

  //token = jwt token || "null" || undefined
  if (!userToken || userToken === "null") {
    res.status(401).json({
      result: "forbidden-approach",
      message: "token is null or undefind",
    });
  }
  try {
    const secretKey = process.env.JST_SECRET_KEY;
    const jwtDecoded = jwt.verify(userToken, secretKey);

    const userId = jwtDecoded.userId;
    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).json({
      result: "forbidden-approach",
      message: "token is expired or invaild",
    });
  }
};

// import { jsDateToFirebaseDate } from "../utils/firebaseDateConverter.js";
const user_isExistUserMiddleware = async (req, res, next) => {
  const phoneNumber = req.headers.phonenumber;
  console.log(req.headers.phonenumber);
  if (phoneNumber) {
    const getUserData = await db_user_read_query(
      "profile.phoneNumber",
      phoneNumber
    );
    if (getUserData.resultCode === 200) {
      req.userId = getUserData.data;
      next();
    } else {
      res.status(401).json({ message: "user is not found" });
    }
  } else {
    res.status(400).json({ message: "user is empty" });
  }
};
const user_smsVerifyMiddleware = async (req, res, next) => {
  if (
    req.body.phoneNumber !== undefined &&
    req.body.phoneNumber.length === 11
  ) {
    const phoneNumber = req.body.phoneNumber;
    const verifiCode = Math.floor(100000 + Math.random() * 900000);
    req.body.verifiCode = verifiCode;
    try {
      sendMsg(phoneNumber, `Restin : ${verifiCode}`);
      next();
    } catch (RESForm) {
      // console.log(RESForm);
      res.status(400).json({ message: RESForm });
    }
  } else {
    res.status(500).json({ message: "is not phoneNumber format" });
  }
};
const user_registerMiddleware = async (req, res, next) => {
  const { nick, birth, phoneNumber } = req.body;
  // console.log(nick, birth);
  const userId = uuidv4();
  const pushData = {
    userId,
    profile: {
      phoneNumber,
      nick,
      birth,
      userType: "user",
      joinDate: jsDateToFirebaseDate(new Date()),
      accountState: "alive",
    },
  };
  try {
    const RES = await db_user_create(pushData);
    if (RES.resultCode === 200) {
      req.userId = userId;
      next();
    } else {
      res.status(400).json({ message: RES.text });
    }
  } catch {
    res.status(401).json({ message: "user create failed" });
  }
};

const user_loginMiddleware = async (req, res, next) => {
  const { userId } = req;
  const user = await db_user_read(userId);

  if (user.resultCode === 404 || user.resultCode === 500) {
    res.status(404).json({ message: user.text });
  }
  const payload = {
    userId: user.data.userId,
    userType: user.data.profile.userType,
  };
  const newToken = generateToken(payload);
  user.data.security = {
    ...user.data.security,
    lastLogin: jsDateToFirebaseDate(new Date()),
    auth_token: newToken,
  };
  await db_user_update(userId, user.data);
  res.status(200).json({ message: "user login access", user, newToken });
};
const user_deleteMiddleware = async () => {};
// user_isExistUser();
// user_register();
//로그아웃은 프론트에서 token 삭제 + useradata state 삭제
module.exports = {
  verifyTokenMiddleware,
  user_isExistUserMiddleware,
  user_smsVerifyMiddleware,
  user_registerMiddleware,
  user_loginMiddleware,
  user_deleteMiddleware,
};
