const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const data = ["123", "456", "789", "101112", "131415"];
const roster = [
  { id: 1, name: "전지현", age: 21, addr: "인천" },
  { id: 2, name: "김지현", age: 22, addr: "부천" },
  { id: 3, name: "이지현", age: 23, addr: "김천" },
  { id: 4, name: "성지현", age: 24, addr: "간천" },
  { id: 5, name: "주지현", age: 25, addr: "복천" },
];

app.get("/", (req, res) => {
  res.send("<h2>숫자 목록</h2>");
});
app.get("/roster", (res, req) => {
  res.send({ data: roster });
});
app.get("/list", (req, res) => {
  res.send(`<h2>${data}</h2>`);
});
app.get("/api/user", (req, res) => {
  const obj = {
    id: 1,
    name: "홍길동",
    age: 20,
  };
  res.json(obj);
});
app.get("/download", (req, res) => {
  const filePath = path.join(__dirname, "test00.txt");
  res.download(filePath);
  console.log(filePath);
});
//req.params -> 동적 변수
//req.body -> 필드(속성)
app.get("/test/1:id", (req, res) => {
  const id = req.params.id; //
  console.log(typeof id);
  res.send("<h2>숫자 목록</h2>");
});
app.get("/test/2", (req, res) => {
  const name = req.query.name || "손님";
  //   쿼리 파라미터 이름 받기 ?name=dddd
  res.send(`쿼리 파라미터? 값 ${name}`);
});

app.get("*", (req, res) => {
  res.json("<h2>페이지를 찾을 수 없습니다.</h2>");
});
app.listen(port, (req, res) => {
  console.log(`example app listening on port ${port}`);
});

//localhost:3000
