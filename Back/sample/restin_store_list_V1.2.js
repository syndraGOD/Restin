const data = [
  //가게 하나
  {
    UUID: "", //입력X, 고유DB인식코드
    id: 1, //가게 고유번호, 1~ 순차적으로증가
    signDate: null, //수정X, 가게를 Restin에 등록한 날짜
    name: "호우수원",
    storeOwnerName: "김정민",
    accountHolder: "김정민",
    settlementAccount: "1000-2608-4262",
    unitPrice: 600,
    location: "경기 수원시 팔달구 덕영대로895번길 20 1층 호우수원",
    subwayStation: {
      line1: ["수원"],
    },
    gps: {
      Latitude: "37.2692324", // 위도
      longitude: "127.0005632", // 경도
    },
    businessTime: {
      //null 이면 그날 휴무,
      // open : null 이면 close도 null이어야함
      monopen: "1200", //ex : "0930"
      monclose: "2200", //ex : "1800"
      monbreak: [["13001500"], ["18002000"]],
      //ex : [["13000200",],], 또는 [["11000200",], ["15000100",],],
      //["break시작시간break지속시간"] 위 사례에서는 13시부터 2시간동안 브레이크 타임
      tueopen: "1200",
      tueclose: "2200",
      tuebreak: [["13001500"], ["18002000"]],
      wedopen: null,
      wedclose: null,
      wedbreak: [],
      thuopen: "1200",
      thuclose: "2200",
      thubreak: [["13001500"], ["18002000"]],
      friopen: "1200",
      friclose: "2200",
      fribreak: [["13001500"], ["18002000"]],
      satopen: "1200",
      satclose: "2200",
      satbreak: [["13001500"], ["18002000"]],
      sunopen: "1200",
      sunclose: "2200",
      sunbreak: [["13001500"], ["18002000"]],
    },
    BusinessState: true, // true = 기본값, false = 휴폐업 또는 일시정지
    BusinessAdminPause: ["1999.10.11", 1], //설정x 임시휴무일 ex : ["2024.10.11", 기간]
    ownerCall: "010-2171-4251",
    storeCall: "0507-1471-2079",
    insta: "@hou_suwon", // null 입력시 insta 없음
    wifiId: "HOU_5G", // null 입력시 wifi 없음
    wifiPw: "HOU1234567", // null 입력시 wifi 없음
    toiletManLocation: "출입문 오른쪽 건물",
    toiletManPw: "비밀번호 없음",
    toiletWomanLocation: "출입문 오른쪽 건물",
    toiletWomanPw: "비밀번호 없음",
    imgURL: [""],
  },
  //가게 둘부턴 여기서 작성
  {
    UUID: "", //입력X
    id: 2,
    signDate: null, //수정X
    name: "당산커피",
    storeOwnerName: "류지원",
    accountHolder: "류지원",
    settlementAccount: "539101-01-051753",
    unitPrice: 350,
    location: "서울 영등포구 당산로48길 2 지하 1층 1층",
    subwayStation: {
      line2: ["당산"],
      line9: ["당산"],
    },
    gps: {
      Latitude: "37.5340826",
      longitude: "126.9025598",
    },
    businessTime: {
      monopen: "0800",
      monclose: "2100",
      monbreak: [["13001500"], ["18002000"]],
      tueopen: "0800",
      tueclose: "2100",
      tuebreak: [["13001500"], ["18002000"]],
      wedopen: "0800",
      wedclose: "2100",
      wedbreak: [["13001500"], ["18002000"]],
      thuopen: "0800",
      thuclose: "2300",
      thubreak: [["13001500"], ["18002000"]],
      friopen: "0800",
      friclose: "2300",
      fribreak: [["13001500"], ["18002000"]],
      satopen: "0800",
      satclose: "2300",
      satbreak: [["13001500"], ["18002000"]],
      sunopen: null,
      sunclose: null,
      sunbreak: [],
    },
    BusinessState: true,
    BusinessAdminPause: ["1999.10.11", 1], //설정x
    ownerCall: "010-2122-6975",
    storeCall: "0507-0288-7038",
    insta: "@dangsan_coffee",
    wifiId: "dangsancoffee지하2",
    wifiPw: "dangsan1234",
    toiletManLocation: "나가셔서 오른쪽 건물 2층",
    toiletManPw: "-",
    toiletWomanLocation: "나가셔서 오른쪽 건물 2층",
    toiletWomanPw: "-",
    imgURL: [""],
  },
  {
    UUID: "", //입력X
    id: 3,
    signDate: null, //수정X
    name: "도콘",
    storeOwnerName: "정보경",
    accountHolder: "정보경",
    settlementAccount: "110-324-722386",
    unitPrice: 600,
    location: "서울 중구 다산로40길 18 1층 104호",
    subwayStation: {
      line2: ["신당"],
      line6: ["신당"],
    },
    gps: {
      Latitude: "37.5637435",
      longitude: "127.0170079",
    },
    businessTime: {
      monopen: "1100",
      monclose: "2200",
      monbreak: [["18002000"]],
      tueopen: null,
      tueclose: null,
      tuebreak: [],
      wedopen: "1100",
      wedclose: "2200",
      wedbreak: [["18002000"]],
      thuopen: "1100",
      thuclose: "2200",
      thubreak: [["18002000"]],
      friopen: "1100",
      friclose: "2200",
      fribreak: [["18002000"]],
      satopen: "1100",
      satclose: "2200",
      satbreak: [["18002000"]],
      sunopen: "1100",
      sunclose: "1800",
      sunbreak: [],
    },
    BusinessState: true,
    BusinessAdminPause: ["1999.10.11", 1], //설정x
    ownerCall: "010-4005-0318",
    storeCall: "0507-1478-0388",
    insta: "@dokon_sindang",
    wifiId: "Dokon_5G",
    wifiPw: "dokon987654321",
    toiletManLocation: "우측 건물 1, 2층",
    toiletManPw: "비밀번호 없음",
    toiletWomanLocation: "우측 건물 1, 3층",
    toiletWomanPw: "비밀번호 없음",
    imgURL: [""],
  },
  {
    UUID: "", //입력X
    id: 4,
    signDate: null, //수정X
    name: "더커피마켓13",
    storeOwnerName: "김유림",
    accountHolder: "김유림",
    settlementAccount: "01036703790",
    unitPrice: 500,
    location: "서울 성동구 금호로13길 3",
    subwayStation: {
      line5: ["신금호"],
    },
    gps: {
      Latitude: "37.5550472",
      longitude: "127.0196660",
    },
    businessTime: {
      monopen: null, //격주 월 휴무
      monclose: null,
      monbreak: [],
      tueopen: "0700",
      tueclose: "1900",
      tuebreak: [["12001400"]],
      wedopen: "0700",
      wedclose: "1900",
      wedbreak: [["12001400"]],
      thuopen: "0700",
      thuclose: "1900",
      thubreak: [["12001400"]],
      friopen: "0700",
      friclose: "1900",
      fribreak: [["12001400"]],
      satopen: "0800",
      satclose: "1800",
      satbreak: [["12001500"]],
      sunopen: "0800",
      sunclose: "1800",
      sunbreak: [["12001500"]],
    },
    BusinessState: true,
    BusinessAdminPause: ["1999.10.11", 1], //설정x
    ownerCall: "010-3670-3790",
    storeCall: "02-2237-3790",
    insta: "@the_coffee_market13",
    wifiId: "coffeemarket13",
    wifiPw: "the131313",
    toiletManLocation: "에어컨 우측",
    toiletManPw: "1313*",
    toiletWomanLocation: "에어컨 우측",
    toiletWomanPw: "1313*",
    imgURL: [""],
  },
  {
    UUID: "", //입력X
    id: 5,
    signDate: null, //수정X
    name: "멜바",
    storeOwnerName: "김정민",
    accountHolder: "김정민",
    settlementAccount: "1000-2608-4262",
    unitPrice: 400,
    location: "경기 군포시 공단로 296 1층",
    subwayStation: {
      line1: ["금정"],
    },
    gps: {
      Latitude: "37.3706485",
      longitude: "126.9449313",
    },
    businessTime: {
      monopen: "0900",
      monclose: "1800",
      monbreak: [["12001500"]],
      tueopen: "0900",
      tueclose: "1800",
      tuebreak: [["12001500"]],
      wedopen: null,
      wedclose: null,
      wedbreak: [["12001500"]],
      thuopen: "0900",
      thuclose: "1800",
      thubreak: [["12001500"]],
      friopen: "0900",
      friclose: "1800",
      fribreak: [["12001500"]],
      satopen: "1100",
      satclose: "1800",
      satbreak: [["12001500"]],
      sunopen: "1100",
      sunclose: "1800",
      sunbreak: [["12001500"]],
    },
    BusinessState: true,
    BusinessAdminPause: ["1999.10.11", 1], //설정x
    ownerCall: "010-6654-0149",
    storeCall: "0507-2093-3486",
    insta: "@patisserie.melba",
    wifiId: "melba",
    wifiPw: "melba1023",
    toiletManLocation: "나가셔서 건물 뒤",
    toiletManPw: "매장 문 옆에 열쇠",
    toiletWomanLocation: "나가셔서 건물 뒤",
    toiletWomanPw: "매장 문 옆에 열쇠",
    imgURL: [""],
  },
  {
    UUID: "", //입력X
    id: 6,
    signDate: null, //수정X
    name: "스탠다드커피",
    storeOwnerName: "김형준",
    accountHolder: "김형준",
    settlementAccount: "1000-2608-4262",
    unitPrice: 500,
    location: "서울 중구 퇴계로 397 1층",
    subwayStation: {
      line2: ["신당"],
      line6: ["신당"],
    },
    gps: {
      Latitude: "37.5655141",
      longitude: "127.0158482",
    },
    businessTime: {
      monopen: "0800",
      monclose: "2000",
      monbreak: [["12001400"]],
      tueopen: "0800",
      tueclose: "2000",
      tuebreak: [["12001400"]],
      wedopen: "0800",
      wedclose: "2000",
      wedbreak: [["12001400"]],
      thuopen: "0800",
      thuclose: "2000",
      thubreak: [["12001400"]],
      friopen: "0800",
      friclose: "2000",
      fribreak: [["12001400"]],
      satopen: null,
      satclose: null,
      satbreak: [],
      sunopen: null,
      sunclose: null,
      sunbreak: [],
    },
    BusinessState: true,
    BusinessAdminPause: ["1999.10.11", 1], //설정x
    ownerCall: "010-3025-7615",
    storeCall: "0507-1376-6622",
    insta: "@stddcoffee",
    wifiId: "stddcoffee",
    wifiPw: "stdd22326622",
    toiletManLocation: "나가서 오른쪽 건물 1층",
    toiletManPw: "-",
    toiletWomanLocation: "나가서 오른쪽 건물 1층",
    toiletWomanPw: "-",
    imgURL: [""],
  },
];
export default data;