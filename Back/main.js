const { firebaseConfigm, admin } = require("./configFiles/firebaseConfig.js");

const express = require("express");
const cors = require("cors");
const user = require("./routes/userRoutes.js");
const store = require("./routes/storeRoutes.js");
const auth = require("./routes/authRoutes.js");
const notification = require("./routes/notificationRoutes.js");
const notion = require("./routes/notionsRoutes.js");
const adminRouter = require("./admin/admin_routes.js"); //관리자 페이지 관련 라우터
const point = require("./routes/pointRoutes.js"); //point 관련 라우터
const purchase = require("./routes/purchaseRoutes.js"); //purchase 관련 라우터
const imgs = require("./routes/imgRoutes.js");
const survey = require("./routes/surveyRoutes.js");
const app = express();
//
// 라우터 설정
const corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
};
app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://restin.co.kr");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, DELETE, PATCH"
//   );
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/store", store); // 스토어 정보 CRUD 라우터
app.use("/auth", auth); // 회원가입, 로그인 관련 라우터
app.use("/user", user); // 유저가 인앱에서 하는 모든 행동에 관한 라우터
app.use("/notification", notification); // 앱 푸쉬알림 관련 라우터
app.use("/notion", notion); // 노션 페이지 불러오기
app.use("/api/admin", adminRouter); // 관리자 페이지
app.use("/point", point); //point 관련 라우터
app.use("/purchase", purchase); //purchase 관련 라우터
app.use("/imgs", imgs); // 이미지 전송 라우터
app.use("/survey", survey); // 설문 관련 라우터
app.get((req, res) => {
  res.status(404).send("not founds");
});

app.listen(8080, () => {
  console.log(`Server running on 8080`);
});
// exports.api = functions.https.onRequest(app);
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
