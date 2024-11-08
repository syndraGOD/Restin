// import usageTicketForm
const { Message } = require("coolsms-node-sdk");
const {
  db_user_create,
  db_user_read,
  db_user_read_query,
  db_user_update,
  db_user_delete,
} = require("../utils/CRUD_userData.js");
const { v4: uuidv4 } = require("uuid");
const { jsDateToFirebaseDate } = require("../utils/firebaseDateConverter.js");

const usage_isUsing = async (req, res, next) => {
  const { userId } = req;
  const DbRes = await db_user_read(userId);
  if (DbRes.resultCode !== 200) {
    res.status(DbRes.resultCode).json({ message: DbRes.text });
  }
  const { usage } = DbRes.data;
  req.usage = usage;
  req.startTime = usage.startTime;
  next();
};

const usage_start = async (req, res, next) => {
  if (req.startTime) {
    res.status(400).json({ message: "user is already in use " });
  }
  const { userId, usage } = req;
  usage = {
    ...usage,
    userId: req.userId,
    usageLogId: uuidv4(),
    startTime: jsDateToFirebaseDate(new Date()),
  };
  let dbRes = db_usageTicket_create(usage);
  if (dbRes.resultCode !== 200) {
    res.status(res.resultCode).json({ message: res.text });
  }
  let userRes = db_user_update(userId, { usage });
  if (userRes.resultCode !== 200) {
    res.status(res.resultCode).json({ message: res.text });
  }
  next();
};

const usage_stop = async (req, res, next) => {
  if (!req.startTime) {
    res.status(400).json({ message: "user is not using " });
  }
  const { userId, startTime } = req;
  next();
};

module.exports = { usage_isUsing, usage_start, usage_stop };
