import { NotionAPI } from "notion-client";
import express from "express";
import cors from "cors";
// const express = require("express");
// const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());

const getNotion = async (loc) => {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage(loc);
  return recordMap;
};
app.get("/useStore/:token");
app.get("/notion/:notionPageCode", async (req, res) => {
  const loc = req.params.notionPageCode;
  const notion = await getNotion(loc);
  res.send(notion);
});

app.listen(port, () => {
  console.log(`Server running on ${port}port`);
});
