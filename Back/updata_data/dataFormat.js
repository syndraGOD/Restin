const data = [
  {
    doc: "", // 저장될 문서의 이름 = 가게 인식코드
    data: {
      id: "카페식별코드", // 저장될 문서의 이름 = 가게 인식코드
      signDate: null, //입력X
      name: "다솜카페",
      storeOwnerName: "김사장",
      accountHolder: "김사장",
      settlementAccount: "00-1111-2222-33",
      unitPrice: "500",
      location: "강남구 논현로 555 1층",
      locationLinkNaver: "",
      locationLinkKakao: "",
      subwayStation: "강남",
      distance: "700m",
      walkingTime: "5", // 분 단위 - distance값 나누기 75_소수점첫째자리에서 반올림)
      businessTime: {
        open: "0930",
        close: "1800",
      },
      BusinessState: false,
      breakTime: "1시부터 2시까지는 브레이크 타임입니다~", // null 입력시 breaktime 없음
      phone: "02-1234-5678",
      insta: "dassom_coffee",
      wifiId: "CAFE Dassom",
      wifiPw: "a123456789",
      toiletManLocation: "매장 1층",
      toiletManPw: "비밀번호 없음",
      toiletWomanLocation: "매장 2층",
      toiletWomanPw: "8837*",
    },
  },
  //가게 하나
  {
    doc: "", // 저장될 문서의 이름 = 가게 인식코드
    data: {
      id: "", // 저장될 문서의 이름 = 가게 인식코드
      signDate: null, //입력X
      name: "",
      storeOwnerName: "",
      accountHolder: "",
      settlementAccount: "",
      unitPrice: "",
      location: "",
      locationLinkNaver: "",
      locationLinkKakao: "",
      subwayStation: "",
      distance: "",
      walkingTime: "", // 분 단위 - distance값 나누기 75_소수점첫째자리에서 반올림)
      businessTime: {
        open: "",
        close: "",
      },
      BusinessState: false,
      breakTime: null, // null 입력시 breaktime 없음
      phone: "",
      insta: "",
      wifiId: "",
      wifiPw: "",
      toiletManLocation: "",
      toiletManPw: "",
      toiletWomanLocation: "",
      toiletWomanPw: "",
    },
  },
  //가게 둘
];
