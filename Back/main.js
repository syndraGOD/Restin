import { NotionAPI } from "notion-client";
import express from "express";
import cors from "cors";
import user from "./routes/userRoutes.js";
import store from "./routes/storeRoutes.js";
import auth from "./routes/authRoutes.js";
import { restinPort } from "./configFiles/config.js";
// const express = require("express");
// const cors = require("cors");
const app = express();
const port = restinPort;

//라우터 설정
app.use(cors());
app.use(express.json({ extended: true }));
app.use("/user", user);
app.use("/store", store);
app.use("/auth", auth);

const getNotion = async (loc) => {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage(loc);
  return recordMap;
};

app.post;
app.get("/useStore/:token");
app.get("/notion/:notionPageCode", async (req, res) => {
  const loc = req.params.notionPageCode;
  const notion = await getNotion(loc);
  res.send(notion);
});
app.get((req, res) => {
  res.status(404).send("not founds");
});
app.listen(port, () => {
  console.log(`Server running on ${port}port`);
});
