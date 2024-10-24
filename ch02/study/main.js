const express = require("express");
const path = require("path");
const app = express();
app.use(express.json()); //미들웨어
const port = 3000;

const data = ["123", "456", "789", "101112", "131415"];
let roster = [
  { id: 1, name: "전지현", age: 21, addr: "인천" },
  { id: 2, name: "김지현", age: 22, addr: "부천" },
  { id: 3, name: "이지현", age: 23, addr: "김천" },
  { id: 4, name: "성지현", age: 24, addr: "간천" },
  { id: 5, name: "주지현", age: 25, addr: "복천" },
];
let no = roster.length + 1;
app.post("/roster/:id", (req, res) => {
  const newItem = {
    id: no++,
    name: req.body.name,
    age: req.body.age,
    addr: req.body.addr,
  };
  roster.push(newItem);
  res.send(roster);
});
app.delete("/roster/:id", (req, res) => {
  const num = Number(req.params.id);
  roster = roster.filter((item) => item.id !== num);
  res.send(roster);
});

app.get("*", (req, res) => {
  res.json("<h2>페이지를 찾을 수 없습니다.</h2>");
});
app.listen(port, (req, res) => {
  console.log(`example app listening on port ${port}`);
});

//localhost:3000
// {
//     "name" : " ",
//     "age" : 20,
//     "addr" : " ",
// }
