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
const app = express();
//
// 라우터 설정
const corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
};

app.use(cors(corsOptions));
app.use(express.json({ extended: true }));
app.use("/store", store);
app.use("/auth", auth);
app.use("/user", user);
app.use("/notification", notification);
app.use("/notion", notion);
app.use("/api/admin", adminRouter);
app.use("/point", point); //point 관련 라우터
app.use("/purchase", purchase); //purchase 관련 라우터
app.get((req, res) => {
  res.status(404).send("not founds");
});

app.listen(8080, () => {
  console.log(`Server running on 8080`);
});
// exports.api = functions.https.onRequest(app);
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
