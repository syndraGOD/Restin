const data = [
  // {
  //   doc: "", // 저장될 문서의 이름 = 가게 인식코드
  //   data: {
  //     id: "카페식별코드", // 저장될 문서의 이름 = 가게 인식코드
  //     signDate: null, //입력X
  //     name: "다솜카페",
  //     storeOwnerName: "김사장",
  //     accountHolder: "김사장",
  //     settlementAccount: "00-1111-2222-33",
  //     unitPrice: "500",
  //     location: "강남구 논현로 555 1층",
  //     locationLinkNaver: "",
  //     locationLinkKakao: "",
  //     subwayStation: "강남",
  //     distance: "700m", // 네이버지도에서 하드넘버 가져오기 or 내위치(GPS)와 location 거리 계산값
  //     walkingTime: "5", // 분 단위 - distance값 나누기 75_소수점버림
  //     businessTime: {
  //       open: "0930",
  //       close: "1800",
  //     },
  //     BusinessState: false,
  //     breakTime: {
  //       open: "1200",
  //       close: "1300",
  //     }, // null 입력시 breaktime 없음
  //     phone: "02-1234-5678",
  //     insta: "dassom_coffee", // null 입력시 insta 없음
  //     wifiId: "CAFE Dassom", // null 입력시 wifi 없음
  //     wifiPw: "a123456789", // null 입력시 wifi 없음
  //     toiletManLocation: "매장 1층",
  //     toiletManPw: "비밀번호 없음",
  //     toiletWomanLocation: "매장 2층",
  //     toiletWomanPw: "8837*",
  //   },
  // },
  //가게 하나
  {
    UUID: "", //입력X, 고유인식값
    id: "1",
    signDate: null,
    name: "호우수원",
    storeOwnerName: "홍길동",
    accountHolder: "홍길동",
    settlementAccount: "00-0000-0000-00",
    unitPrice: "500",
    location: "경기 수원시 팔달구 덕영대로895번길 20 1층 호우수원",
    subwayStation: "수원",
    distance: "287",
    walkingTime: "3",
    businessTime: {
      open: "1200",
      close: "2200",
    },
    breakTime: {
      open: "1200",
      close: "1300",
    }, // null 입력시 breaktime 없음
    BusinessState: false,
    phone: "02-1234-5678",
    insta: "dassom_coffee",
    wifiId: "CAFE Dassom",
    wifiPw: "a123456789",
    toiletManLocation: "매장 1층",
    toiletManPw: "비밀번호 없음",
    toiletWomanLocation: "매장 1층",
    toiletWomanPw: "비밀번호 없음",
  },
  //가게 둘
];
export default data;
