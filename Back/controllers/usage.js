// import usageTicketForm
const { Message } = require("coolsms-node-sdk");
const {
  db_user_create,
  db_user_read,
  db_user_read_query,
  db_user_update,
  db_user_delete,
} = require("../utils/CRUD_userData.js");
const {
  db_usageTicket_create,
  db_usageTicket_isuse,
  db_usageTicket_end,
} = require("../utils/CRUD_usageTicket.js");
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
  const isUsage = await db_usageTicket_isuse(req.userId);
  if (isUsage.resultCode === 500) {
    console.log(3, "[sys] user is already in use");
    res.status(500).json({ message: "user is already in use " });
  } else {
    //스토어 영업시간 이내인지 확인 만약 지났거나, 20분 이내로 남았다면 시작불가
    const { userData, storeInfo } = req.body;
    let { userId, usage } = userData;
    const { id, uuid } = storeInfo;
    usage = {
      ...usage,
      userId: req.userId,
      usageLogId: uuidv4(),
      startTime: jsDateToFirebaseDate(new Date()),
      storeId: id,
      storeUUID: uuid,
    };
    userData.usage = usage;
    req.userData = userData;
    let dbRes = await db_usageTicket_create(usage);
    if (dbRes.resultCode !== 200) {
      res.status(dbRes.resultCode).json({ message: dbRes.text });
    }
    let userRes = await db_user_update(userId, { usage });
    if (userRes.resultCode !== 200) {
      res.status(userRes.resultCode).json({ message: userRes.text });
    }
    next();
  }
};

const usage_stop = async (req, res, next) => {
  const isUsage = await db_usageTicket_isuse(req.userId);
  if (isUsage.resultCode === 200) {
    console.log(3, "[sys] user is not using");
    res.status(500).json({ message: "user is not using " });
  } else {
    const { userData } = req.body;
    // const usageData = isUsage.data.usage;
    let { userId, usage } = userData;
    usage = {
      ...usage,
      endTime: jsDateToFirebaseDate(new Date()),
    };
    usage = {
      ...usage,
      totalUsageDuration: {
        nanoseconds: usage.endTime.nanoseconds - usage.startTime.nanoseconds,
        seconds: usage.endTime.seconds - usage.startTime.seconds,
      },
    };
    userData.usage = usage;
    req.userData = userData;
    let dbRes = await db_usageTicket_end(usage);
    if (dbRes.resultCode !== 200) {
      next();
      // res.status(dbRes.resultCode).json({ message: dbRes.text });
    }
    let userRes = await db_user_update(userId, { usage });
    if (userRes.resultCode !== 200) {
      res.status(userRes.resultCode).json({ message: userRes.text });
    }
  }
};

module.exports = { usage_isUsing, usage_start, usage_stop };
