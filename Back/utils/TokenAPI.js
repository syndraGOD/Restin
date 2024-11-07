const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "configFiles/.env" });

const secretKey = process.env.JWT_SECRET_KEY;
const generateToken = (payload) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: "5m" });
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
module.exports = { jwt, generateToken, refreshToken };
