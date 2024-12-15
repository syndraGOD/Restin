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
const UsageTicketForm = require("../models/usageTicketForm.js");
const { db_store_read } = require("../utils/CRUD_storeData.js");
const TotalPriceMath = (b, c) => {
  b = parseInt(b);
  c = parseInt(c);
  const result = b + b * 0.5 * Math.max(0, Math.ceil((c - 10) / 5));
  return result;
};

// console.log(typeof b, typeof c);
// console.log(b, c);
// console.log(b + b * 0.5 * Math.max(0, Math.ceil((c - 10) / 5)));
//b: 가격, c: 이용시간
// 고민하다가, 나온 결로
// 이용종료 티켓은 말 그대로 '기록' 이니 USERDATA에 남아있을 필요 없지만
// 이용 종료 및 결제 대기중인 티켓은 USERDATA에 남아있어야 함.

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
  try {
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

      if (dbRes.resultCode === 200) {
        let userRes = await db_user_update(userId, { usage });
        if (userRes.resultCode === 200) {
          next();
        } else {
          res.status(userRes.resultCode).json({ message: userRes.text });
        }
      } else {
        res.status(dbRes.resultCode).json({ message: dbRes.text });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error", error });
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
    // 총 이용시간을 분으로 변환
    const totalUsageDurationMinutes = Math.floor(
      (usage.endTime.seconds - usage.startTime.seconds) / 60
    );
    //총 이용시간 초로 변환 소수점 두쨰자리
    const totalUsageDurationSeconds = Math.floor(
      (usage.endTime.seconds - usage.startTime.seconds) % 60
    );
    const storeRES = await db_store_read(usage.storeUUID);
    const storeData = storeRES.data;
    usage = {
      ...usage,
      totalUsageDurationMinutes,
      totalUsageDurationSeconds,
      totalUsagePrice: TotalPriceMath(
        storeData.unitPrice,
        totalUsageDurationMinutes
      ),
    };

    // const newUsage = new UsageTicketForm({ userId });
    // userData.usage = newUsage;
    userData.usage = usage;
    req.userData = userData;
    // let dbRes = await db_user_update(userId, { usage: newUsage.usage });
    let dbRes = await db_user_update(userId, { usage });
    if (dbRes.resultCode === 200) {
      let userRes = await db_usageTicket_end(usage);
      if (userRes.resultCode === 200) {
        next();
      } else {
        res.status(userRes.resultCode).json({ message: userRes.text });
      }
    } else {
      res.status(dbRes.resultCode).json({ message: dbRes.text });
    }
  }
};

module.exports = { usage_isUsing, usage_start, usage_stop };
