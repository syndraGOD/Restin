const data = [
  //가게 하나
  {
    UUID: "", //입력X, 고유DB인식코드asdfqwer
    id: 1, //가게 고유번호, 1~ 순차적으로증가
    signDate: null, //수정X, 가게를 Restin에 등록한 날짜
    name: "호우수원", // 가게 이름
    storeOwnerName: "김정민", //store 대표 성함
    accountHolder: "김정민", // settlementAccount의 입금자명
    settlementAccount: "1000-2608-4262", // 정산 계좌
    unitPrice: 600, // 분당 단가
    location: "경기 수원시 팔달구 덕영대로895번길 20 1층 호우수원", //가게 주소
    subwayStation: {
      line1: ["수원"], // {ex.line1: ["수원", "신도림"], line2: ["신도림"]}
      line6: ["신당"],
    },
    stationDistance: {
      수원: { wayOut: 3, distance: 7 },
      신당: { wayOut: 5, distance: 2 },
    }, //뒤 숫자는 1(분) // 역이 여러개인 경우 여러개 다 작성
    // ex. {
    // 수원: { wayOut: 3, distance: 7 },
    // 신당: { wayOut: 5, distance: 2 },
    // }

    gps: {
      Latitude: "37.2692324", // 위도
      longitude: "127.0005632", // 경도
    },
    businessTime: {
      //null 이면 그날 휴무,
      // open : null 이면 close도 null이어야함
      monopen: "1200", //ex : "0930"
      monclose: "2200", //ex : "1800"
      monbreak: ["13001500", "18002000"],
      //ex : ["13000200"], 또는 ["11000200", "15000100"]
      //["break시작시간break종료시간"] 위 사례에서는 13시부터 2시간동안 브레이크 타임
      tueopen: "1200",
      tueclose: "2200",
      tuebreak: ["13001500", "18002000"],
      wedopen: null,
      wedclose: null,
      wedbreak: [],
      thuopen: "1200",
      thuclose: "2200",
      thubreak: ["13001500", "18002000"],
      friopen: "1200",
      friclose: "2200",
      fribreak: ["13001500", "18002000"],
      satopen: "1200",
      satclose: "2200",
      satbreak: ["13001500", "18002000"],
      sunopen: "1200",
      sunclose: "2200",
      sunbreak: ["13001500", "18002000"],
    },
    allowMaxUserCount: 0, // 0: 제한없음, 1~999 : 설정
    BusinessState: true, // true = 기본값, false = 휴폐업 또는 일시정지
    BusinessAdminPause: ["1999.10.11", 1], //설정x 임시휴무일 ex : ["2024.10.11", 기간]
    ownerCall: "010-2171-4251", // store 대표, 개인 전화번호
    storeCall: "0507-1471-2079", // store 가게 전화번호
    insta: "@hou_suwon", // null 입력시 insta 없음
    wifiId: "HOU_5G", // null 입력시 wifi 없음
    wifiPw: "HOU1234567", // null 입력시 wifi 없음
    toiletManLocation: "출입문 오른쪽 건물",
    toiletManPw: "비밀번호 없음", //비밀번호 없을시 "비밀번호 없음"
    toiletWomanLocation: "출입문 오른쪽 건물",
    toiletWomanPw: "비밀번호 없음", //비밀번호 없을시 "비밀번호 없음"
    imgURL: [""],
  },
  //가게 둘부턴 여기서 작성
];
module.exports = data;
