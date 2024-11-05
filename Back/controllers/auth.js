import UserForm from "../models/userDataForm.js";
import {
  db_user_create,
  db_user_read,
  db_user_read_query,
  db_user_update,
} from "../utils/CRUD_userData.js";
import { v4 as uuidv4 } from "uuid";
import { jsDateToFirebaseDate } from "../utils/firebaseDateConverter.js";
const user_isExistUser = async (phoneNumber) => {
  const getUserArray = await db_user_read_query(
    "profile.phoneNumber",
    phoneNumber
  ).data;
  if (getUserArray.length) {
    return getUserArray[0].userId;
  } else {
    return false;
  }
};

//전화번호로 로그인해서 계정 UUID가 발급되는지 확인필요
const user_register = async (phoneNumber, nick, birth, authToken) => {
  const pushData = {
    userId: uuidv4(),
    profile: {
      phoneNumber,
      nick,
      birth,
      userType: "user",
      joinDate: jsDateToFirebaseDate(new Date()),
    },
    security: {
      authToken,
    },
  };
  const res = await db_user_create(pushData);
};

const user_login = async (userId, authToken) => {
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
const user_delete = async () => {};
// user_isExistUser();
user_register();
