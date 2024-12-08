const express = require("express");
const router = express.Router();
const session = require("express-session");
const path = require("path");
const {
  db_store_create,
  db_store_read,
  db_store_read_all,
  db_store_update,
  db_store_delete,
} = require("../utils/CRUD_storeData");

// admin 라우터에만 세션 미들웨어 적용
router.use(
  session({
    secret: "admin-secret-key",
    resave: false,
    saveUninitialized: false,
    //saveUninitialized: false, 설명
    //혹시 내가 js파일을 수정하고 저장하면 사용자가 가지고 있는 쿠키는? 설명해줘
    //
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, // 1시간
    },
  })
);

// 정적 파일 제공을 위한 미들웨어 추가
router.use(express.static(path.join(__dirname)));

// 여러 관리자 계정 정보
const ADMIN_ACCOUNTS = [
  {
    adminId: "01072105819",
    password: "gksdnf12@@",
    name: "김한울",
    role: "super",
  },
  {
    adminId: "01066540149",
    password: "11112222",
    name: "Dobby",
    role: "admin_normal",
  },
  {
    adminId: "01023961736",
    password: "a1234",
    name: "BulDakBoggummyun",
    role: "admin_normal",
  },
];

// 관리자 인증 미들웨어
const adminAuthMiddleware = (req, res, next) => {
  if (!req.session.isAdmin) {
    return res.status(401).json({
      success: false,
      message: "관리자 로그인이 필요합니다.",
    });
  }
  next();
};

// 슈퍼관리자 권한 체크 미들웨어
const superAdminAuthMiddleware = (req, res, next) => {
  if (!req.session.isAdmin || req.session.adminInfo.role !== "super") {
    return res.status(403).json({
      success: false,
      message: "슈퍼관리자 권한이 필요합니다.",
    });
  }
  next();
};

// 로그인 처리
router.post("/login", (req, res) => {
  const { adminId, password } = req.body;

  const admin = ADMIN_ACCOUNTS.find(
    (account) => account.adminId === adminId && account.password === password
  );

  if (admin) {
    req.session.isAdmin = true;
    req.session.adminInfo = {
      adminId: admin.adminId,
      name: admin.name,
      role: admin.role,
    };
    res.json({
      success: true,
      adminInfo: {
        name: admin.name,
        role: admin.role,
      },
    });
  } else {
    res.json({
      success: false,
      message: "잘못된 로그인 정보입니다.",
    });
  }
});

// 관리자 인증 확인
router.get("/check-auth", adminAuthMiddleware, (req, res) => {
  res.json({
    success: true,
    adminInfo: req.session.adminInfo,
  });
});

// 스토어 목록 조회
router.get("/stores", adminAuthMiddleware, async (req, res) => {
  try {
    const result = await db_store_read_all();

    if (result.resultCode === 200) {
      res.json({
        success: true,
        stores: result.data,
      });
    } else {
      res.status(result.resultCode).json({
        success: false,
        message: result.text,
        stores: [],
      });
    }
  } catch (error) {
    console.error("Store read error:", error);
    res.status(500).json({
      success: false,
      message: "스토어 목록 조회 실패",
      stores: [],
    });
  }
});

// 개별 스토어 조회
router.get("/stores/:UUID", adminAuthMiddleware, async (req, res) => {
  try {
    const result = await db_store_read(req.params.UUID);
    if (result.resultCode === 200) {
      res.json({
        success: true,
        store: result.data,
      });
    } else {
      res.status(result.resultCode).json({
        success: false,
        message: result.text,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "스토어 조회 실패",
    });
  }
});

// 스토어 생성
router.post("/stores", adminAuthMiddleware, async (req, res) => {
  try {
    // console.log(req.body);
    const result = await db_store_create(req.body);
    if (result.resultCode === 200) {
      res.json({
        success: true,
        message: "스토어가 성공적으로 생성되었습니다.",
      });
    } else {
      console.log(result.text);
      res.status(result.resultCode).json({
        success: false,
        message: result.text,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "스토어 생성 실패",
    });
  }
});

// 스토어 수정
router.put("/stores/:UUID", adminAuthMiddleware, async (req, res) => {
  try {
    const result = await db_store_update(req.params.UUID, req.body);
    if (result.resultCode === 200) {
      res.json({
        success: true,
        message: "스토어가 성공적으로 수정되었습니다.",
      });
    } else {
      res.status(result.resultCode).json({
        success: false,
        message: result.text,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "스토어 수정 실패",
    });
  }
});

// 스토어 삭제
router.delete("/stores/:UUID", adminAuthMiddleware, async (req, res) => {
  try {
    const result = await db_store_delete(req.params.UUID);
    if (result.resultCode === 200) {
      res.json({
        success: true,
        message: "스토어가 성공적으로 삭제되었습니다.",
      });
    } else {
      res.status(result.resultCode).json({
        success: false,
        message: result.text,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "스토어 삭제 실패",
    });
  }
});

// 로그아웃
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// HTML 페이지 라우트
router.get("/", (req, res) => {
  if (req.session.isAdmin) {
    res.sendFile(path.join(__dirname, "./admin_dashboard.html"));
  } else {
    res.sendFile(path.join(__dirname, "./admin_login.html"));
  }
});

// CSS와 JS 파일에 대한 접근 권한 설정
router.get("/admin_dashboard.css", adminAuthMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "admin_dashboard.css"));
});

router.get("/admin_dashboard.js", adminAuthMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "admin_dashboard.js"));
});

// 캐시 컨트롤 설정
router.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

module.exports = router;
