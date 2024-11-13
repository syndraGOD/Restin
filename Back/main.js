/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { NotionAPI } from "notion-client";
// import express from "express";
// import cors from "cors";
// import user from "./routes/userRoutes.js";
// import store from "./routes/storeRoutes.js";
// import auth from "./routes/authRoutes.js";
// import { restinPort } from "./configFiles/config.js";

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// const functions = require("firebase-functions");
// const admin = require("");

const { firebaseConfigm, admin } = require("./configFiles/firebaseConfig.js");

const express = require("express");
const cors = require("cors");
const user = require("./routes/userRoutes.js");
// const store require("./routes/storeRoutes.js");
const auth = require("./routes/authRoutes.js");

const getNotionModule = async () => {
  const NotionModule = await import("notion-client");
  return NotionModule;
};
let NotionAPIS;
getNotionModule().then((NotionModule) => {
  const { NotionAPI } = NotionModule;
  NotionAPIS = NotionAPI;
});
const app = express();
//
//라우터 설정
let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
};

app.use(cors(corsOptions));
app.use(express.json({ extended: true }));
// app.use("/store", store);
app.use("/auth", auth);
app.use("/user", user);

const getNotion = async (loc) => {
  const notion = new NotionAPIS();
  const recordMap = await notion.getPage(loc);
  return recordMap;
};
// app.post;
app.get("/useStore/:token");
app.get("/notion/:notionPageCode", async (req, res) => {
  console.log("getnotion : ", req.params.notionPageCode);
  try {
    const loc = req.params.notionPageCode;
    // console.log(NotionAPI);
    getNotion(loc).then((notion) => res.send(notion));
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get((req, res) => {
  res.status(404).send("not founds");
});

app.listen(8080, () => {
  console.log(`Server running on 8080`);
});
// exports.api = functions.https.onRequest(app);
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
