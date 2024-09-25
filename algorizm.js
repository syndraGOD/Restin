// const input = require("fs")
//   .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
//   .toString()
//      .trim()
//   .split("\n")
//   .map(Number);

const input = [6, 3, 0, 3, 4, 0, 5];

let arr = [];

for (let i = 1; i <= input[0]; i++) {
  input[i] ? arr.push(input[i]) : arr.pop();
}
const result = arr.reduce((a, b) => a + b);
console.log(result);
