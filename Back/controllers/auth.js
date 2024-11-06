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
  const userId = req.userId;
  if (userId) {
    const getUserData = await db_user_read(userId);
    if (getUserData.resultCode === 200) {
      return res.status(200).json({ message: "who is exist user" });
    } else {
      return res.status(404).json({ message: "user is not found" });
    }
  } else {
    return res.status(404).json({ message: "user is not found" });
  }
};

const user_registerMiddleware = async (req, res, next) => {
  // console.log(verifyToken(exampleToken));
  const { nick, birth, joinDate } = req.body;
  // console.log(nick, birth);
  const pushData = {
    userId: req.userId,
    profile: {
      phoneNumber: req.phoneNumber,
      nick,
      birth,
      userType: "user",
      joinDate: jsDateToFirebaseDate(new Date()),
    },
    security: {
      authToken: req.headers["auth_token"],
    },
  };
  await db_user_create(pushData);
};

const user_loginMiddleware = async (userId, authToken) => {
  const pushData = {
    "security.lastLogin": jsDateToFirebaseDate(new Date()),
    //token어쩌지? 공부좀하고 ㄱㄷ
  };
  const res = await db_user_update(userId, pushData);
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
  user_registerMiddleware,
  user_loginMiddleware,
  user_deleteMiddleware,
};
