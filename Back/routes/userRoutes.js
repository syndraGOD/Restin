const { verifyTokenMiddleware } = require("../controllers/auth.js");
const {
  usage_isUsing,
  usage_start,
  usage_stop,
} = require("../controllers/usage.js");

const express = require("express");
const router = express.Router();

router.use(verifyTokenMiddleware);

router.post("/usage/start", usage_start, (req, res) => {
  res.status(200).json({ message: "user start usage", data: req.userData });
});
router.post("/usage/stop", usage_stop, (req, res) => {
  res.status(200).json({ message: "user stoped usage", data: req.userData });
});
router.post("/usage/isUsage", usage_isUsing, (req, res) => {
  res.status(200).json({
    message: `user is usage !${req.startTime}!`,
    startTime: req.startTime,
  });
});

module.exports = router;
