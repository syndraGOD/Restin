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
/**
 *
 */
// admin.initializeApp(firebaseConfig);
const verifyTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["auth_token"];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.userId = decodedToken.user_id;
    req.phoneNumber = decodedToken.phone_number;

    next();
  } catch (error) {
    console.log("Invalid token request\n", error);
    return res.status(401).json({ message: "invaild token" });
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
      next();
    } else {
      return res.status(401).json({ message: "user is not found" });
    }
  } else {
    return res.status(400).json({ message: "user is empty" });
  }
};
const user_smsVerifyMiddleware = async (req, res, next) => {
  console.log("드디어!!");
  console.log(req.body);
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
      console.log(RESForm);
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
      joinDate: new Date(),
      //joinDate auth()에 있음, 해당값 받아올것
    },
    security: {
      authToken: req.headers["auth_token"],
    },
  };
  try {
    const RES = await db_user_create(pushData);
    if (RES.resultCode === 200) {
      next();
    } else {
      res.status(400).json({ message: RES.text });
    }
  } catch {
    res.status(401).json({ message: "user create failed" });
  }
};

const user_loginMiddleware = async (req, res, next) => {
  // const pushData = {
  //   "security.lastLogin": jsDateToFirebaseDate(new Date()),
  //
  // };
  // pushdata는 front auth()에 있음, 해당값 받아올것
  // const res = await db_user_update(userId, pushData);
  if (res.resultCode === 200) {
    const userData = await db_user_read(userId);
    return userData;
  } else {
    console.log(new Date(), res.error, `\n`);
    return false;
  }
};
const user_deleteMiddleware = async () => {};
// user_isExistUser();
// user_register();
module.exports = {
  verifyTokenMiddleware,
  user_isExistUserMiddleware,
  user_smsVerifyMiddleware,
  user_registerMiddleware,
  user_loginMiddleware,
  user_deleteMiddleware,
};
