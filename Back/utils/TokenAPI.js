const utcFromTimestamp = (time) => {
  const hour9 = 32400000;
  return new Date(time * 1000 + hour9); //32400000 = 9시간 / utc 시간 한국시간맞추기
};

const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "configFiles/.env" });
const secretKey = process.env.JWT_SECRET_KEY;

const generateToken = (payload) => {
  const hour = 60 * 60;
  const day = hour * 24;
  const month = day * 30;

  const now = Math.floor(Date.now() / 1000); // 현재 시각 (초 단위)
  const tokenExp = day * 1; // 3개월을 초 단위로 환산
  // tokenExp = now;
  // console.log(utcFromTimestamp(tokenExp));
  const expirationTime = now + tokenExp; // 24시간 뒤 만료
  const options = {
    iat: now,
    exp: expirationTime,
  };
  // console.log();
  const newPayload = {
    ...payload,
    ...options,
  };
  const token = jwt.sign(newPayload, secretKey);
  return token;
};

const refreshToken = (token) => {
  try {
    // exists token is um. 음 대충 날짜지났는지, 옳은 토큰인지
    const decodedToken = jwt.verify(token, secretKey);

    // new payload
    const payload = {
      userId: decodedToken.userId,
      userType: decodedToken.userType,
    };
    const newToken = generateToken(payload);
    return newToken;
  } catch (error) {
    console.error("error refreshing token", error);
    return null;
  }
};

module.exports = { jwt, generateToken, refreshToken, utcFromTimestamp };
