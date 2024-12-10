const express = require("express");
const router = express.Router();
const { verifyTokenMiddleware } = require("../controllers/auth");
const { db_user_read } = require("../utils/CRUD_userData");
const { db } = require("../configFiles/firebaseConfig.js");
const { v4: uuidv4 } = require("uuid");
const {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} = require("firebase/firestore");
const PurchaseTicketForm = require("../models/purchaseTicketForm");
const PointTicketForm = require("../models/pointTicketForm");
const UsageTicketForm = require("../models/usageTicketForm");
const { queryRead } = require("../utils/CRUD_DATA.js");

router.post("/usage/point", verifyTokenMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const purchaseTicketUUID = uuidv4();
    const pointTicketUUID = uuidv4();

    // 유저 데이터 조회
    const userRes = await db_user_read(userId);
    if (userRes.resultCode !== 200) {
      return res.status(400).json({
        success: false,
        error: "사용자 정보를 찾을 수 없습니다.",
      });
    }
    //결제대기건이 남ㅇ있는지 확인
    const ifusageIngRef = await queryRead(
      "USAGE_WAIT_PURCHASE_TICKET",
      "usage.userId",
      userId
    );
    console.log(ifusageIngRef.data);
    if (ifusageIngRef.data.length === 0) {
      return res.status(400).json({
        success: false,
        error: "결제대기건이 없습니다.",
      });
    }

    const currentPoint = userRes.data.point.amount || 0;
    const totalAmount = userRes.data.usage.totalUsagePrice;

    // 포인트 잔액 확인
    if (currentPoint < totalAmount) {
      return res.status(400).json({
        success: false,
        error: "포인트가 부족합니다.",
      });
    }

    // 구매 티켓 생성
    const purchaseTicket = new PurchaseTicketForm({
      purchaseTicketId: purchaseTicketUUID,
      pointTicketId: pointTicketUUID,
      usageLogTicketId: userRes.data.usage.usageLogId,
      userId: userRes.data.userId,
      userInfo: {
        phoneNumber: userRes.data.profile.phoneNumber,
        nick: userRes.data.profile.nick,
      },
      storeId: userRes.data.usage.storeId,
      storeUUID: userRes.data.usage.storeUUID,
      purchaseDate: new Date(),
      amount: userRes.data.usage.totalUsagePrice,
      paymentMethod: "point",
      status: "complete",
    });

    // 포인트 차감 기록
    const pointTicket = new PointTicketForm({
      userId: userRes.data.userId,
      pointTicketId: pointTicketUUID,
      amount: -userRes.data.usage.totalUsagePrice,
      beforeAmount: currentPoint,
      afterAmount: currentPoint - totalAmount,
      description: "상품 구매",
      purchaseTicket: purchaseTicketUUID,
    });

    // 초기화된 usage 데이터 생성
    const newUsage = new UsageTicketForm({ userId: userRes.data.userId });

    // 구매 티켓 저장
    const purchaseRef = doc(db, "PURCHASE_TICKET", purchaseTicketUUID);
    await setDoc(purchaseRef, { ...purchaseTicket });

    // 포인트 티켓 저장
    const pointRef = doc(db, "POINT_TICKET", pointTicketUUID);
    await setDoc(pointRef, { ...pointTicket });

    // USAGE_ING_TICKET에서 데이터 가져오기
    const usageIngRef = doc(
      db,
      "USAGE_WAIT_PURCHASE_TICKET",
      userRes.data.usage.usageLogId
    );
    const usageEndRef = doc(
      db,
      "USAGE_END_TICKET",
      userRes.data.usage.usageLogId
    );
    // USAGE_WAIT_PURCHASE_TICKET의 데이터를 USAGE_END_TICKET으로 이동
    await setDoc(usageEndRef, {
      usage: {
        ...userRes.data.usage,
        status: "complete",
        purchaseTicketId: purchaseTicketUUID,
        pointTicketId: pointTicketUUID,
        endDate: new Date(),
      },
    });

    // USAGE_WAIT_PURCHASE_TICKET 문서 삭제
    await deleteDoc(usageIngRef);

    // 유저의 포인트 잔액과 usage 데이터 업데이트
    const userRef = doc(db, "USER", userId);

    await updateDoc(userRef, {
      "point.amount": currentPoint - totalAmount,
      "point.lastUpdated": new Date(),
      usage: { ...newUsage.usage },
    });
    const New_userRes = await db_user_read(userId);

    res.status(200).json({
      success: true,
      data: {
        purchaseAmount: userRes.data.usage.totalUsagePrice,
        usageDurationMinutes: userRes.data.usage.totalUsageDurationMinutes,
        selectedPayment: "point",
      },
      userData: New_userRes.data,
    });
    console.log("purchase complete", userId);
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
