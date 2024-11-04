// @ts-check
/**
 * Firebase Timestamp object format.
 * @typedef {Object} FirebaseDateObject
 * @property {number} seconds - UTC seconds since epoch (1970-01-01T00:00:00Z).
 * @property {number} nanoseconds - Fractional seconds in nanoseconds.
 */
/**
 * 가게 정보
 * @typedef {Object} StoreInfo
 * @property {?string} UUID - 고유 DB 인식 코드 (입력 X)
 * @property {?number} id - 가게 고유번호, 1부터 순차적으로 증가
 * @property {?FirebaseDateObject} signDate - Restin에 가게 등록한 날짜 (수정 X)
 * @property {?string} name - 가게 이름
 * @property {?string} storeOwnerName - 가게 소유주 이름
 * @property {?string} accountHolder - 계좌 명의자
 * @property {?string} settlementAccount - 정산 계좌 번호
 * @property {?number} unitPrice - 단가
 * @property {?string} location - 가게 위치
 * @property {?SubwayStation} subwayStation - 인근 지하철역
 * @property {?GpsCoordinates} gps - GPS 좌표
 * @property {?BusinessTime} businessTime - 영업 시간 정보
 * @property {?boolean} BusinessState - 영업 상태 (true: 기본값, false: 휴폐업 또는 일시정지)
 * @property {?Array<any>} BusinessAdminPause - 임시 휴무일 및 기간
 * @property {?string} ownerCall - 소유주 전화번호
 * @property {?string} storeCall - 가게 전화번호
 * @property {?string} insta - 인스타그램 핸들 (null 시 없음)
 * @property {?string} wifiId - Wi-Fi ID (null 시 없음)
 * @property {?string} wifiPw - Wi-Fi 비밀번호 (null 시 없음)
 * @property {?string} toiletManLocation - 남성 화장실 위치
 * @property {?string} toiletManPw - 남성 화장실 비밀번호
 * @property {?string} toiletWomanLocation - 여성 화장실 위치
 * @property {?string} toiletWomanPw - 여성 화장실 비밀번호
 * @property {?Array<string>} imgURL - 이미지 URL 목록
 */

/**
 * 인근 지하철역 정보
 * @typedef {Object} SubwayStation
 * @property {?Array<string>} line1 - 지하철 1호선 인근 역
 * @property {?Array<string>} line2 - 지하철 2호선 인근 역
 * @property {?Array<string>} line3 - 지하철 3호선 인근 역
 * @property {?Array<string>} line4 - 지하철 4호선 인근 역
 * @property {?Array<string>} line5 - 지하철 5호선 인근 역
 * @property {?Array<string>} line6 - 지하철 6호선 인근 역
 * @property {?Array<string>} line7 - 지하철 7호선 인근 역
 * @property {?Array<string>} line8 - 지하철 8호선 인근 역
 * @property {?Array<string>} line9 - 지하철 9호선 인근 역
 * @property {?Array<string>} line10 - 지하철 10호선 인근 역
 * @property {?Array<string>} line11 - 지하철 11호선 인근 역
 * @property {?Array<string>} line12 - 지하철 12호선 인근 역
 * @property {?Array<string>} line13 - 지하철 13호선 인근 역
 * @property {?Array<string>} line14 - 지하철 14호선 인근 역
 * @property {?Array<string>} line15 - 지하철 15호선 인근 역
 * @property {?Array<string>} line16 - 지하철 16호선 인근 역
 * @property {?Array<string>} line17 - 지하철 17호선 인근 역
 * @property {?Array<string>} line18 - 지하철 18호선 인근 역
 * @property {?Array<string>} line19 - 지하철 19호선 인근 역
 * @property {?Array<string>} line20 - 지하철 20호선 인근 역
 * @property {?Array<string>} line21 - 지하철 21호선 인근 역
 * @property {?Array<string>} line22 - 지하철 22호선 인근 역
 * @property {?Array<string>} line23 - 지하철 23호선 인근 역
 * @property {?Array<string>} line24 - 지하철 24호선 인근 역
 */

/**
 * GPS 좌표
 * @typedef {Object} GpsCoordinates
 * @property {?string} Latitude - 위도
 * @property {?string} longitude - 경도
 */

/**
 * 영업 시간 정보
 * @typedef {Object} BusinessTime
 * @property {?string} monopen - 월요일 오픈 시간 (ex: "0930")
 * @property {?string} monclose - 월요일 마감 시간 (ex: "1800")
 * @property {?Array<string>} monbreak - 월요일 브레이크 타임 (ex: ["11001300", "15001600"])
 * @property {?string} tueopen - 화요일 오픈 시간
 * @property {?string} tueclose - 화요일 마감 시간
 * @property {?Array<string>} tuebreak - 화요일 브레이크 타임
 * @property {?string} wedopen - 수요일 오픈 시간
 * @property {?string} wedclose - 수요일 마감 시간
 * @property {?Array<string>} wedbreak - 수요일 브레이크 타임
 * @property {?string} thuopen - 목요일 오픈 시간
 * @property {?string} thuclose - 목요일 마감 시간
 * @property {?Array<string>} thubreak - 목요일 브레이크 타임
 * @property {?string} friopen - 금요일 오픈 시간
 * @property {?string} friclose - 금요일 마감 시간
 * @property {?Array<string>} fribreak - 금요일 브레이크 타임
 * @property {?string} satopen - 토요일 오픈 시간
 * @property {?string} satclose - 토요일 마감 시간
 * @property {?Array<string>} satbreak - 토요일 브레이크 타임
 * @property {?string} sunopen - 일요일 오픈 시간
 * @property {?string} sunclose - 일요일 마감 시간
 * @property {?Array<string>} sunbreak - 일요일 브레이크 타임
 */

/**
 * StoreForm 클래스는 가게 정보를 관리합니다.
 */
export class StoreForm {
  /**
   * @param {StoreInfo} args - 가게 정보 객체
   */
  constructor(args) {
    this.UUID = args.UUID ?? null;
    this.id = args.id ?? null;
    this.signDate = args.signDate ?? null;
    this.name = args.name ?? null;
    this.storeOwnerName = args.storeOwnerName ?? null;
    this.accountHolder = args.accountHolder ?? null;
    this.settlementAccount = args.settlementAccount ?? null;
    this.unitPrice = args.unitPrice ?? null;
    this.location = args.location ?? null;
    this.subwayStation = {
      line1: args.subwayStation?.line1 ?? null,
    };
    this.gps = {
      Latitude: args.gps?.Latitude ?? null,
      longitude: args.gps?.longitude ?? null,
    };
    this.businessTime = {
      monopen: args.businessTime?.monopen ?? null,
      monclose: args.businessTime?.monclose ?? null,
      monbreak: args.businessTime?.monbreak ?? null,
      tueopen: args.businessTime?.tueopen ?? null,
      tueclose: args.businessTime?.tueclose ?? null,
      tuebreak: args.businessTime?.tuebreak ?? null,
      wedopen: args.businessTime?.wedopen ?? null,
      wedclose: args.businessTime?.wedclose ?? null,
      wedbreak: args.businessTime?.wedbreak ?? null,
      thuopen: args.businessTime?.thuopen ?? null,
      thuclose: args.businessTime?.thuclose ?? null,
      thubreak: args.businessTime?.thubreak ?? null,
      friopen: args.businessTime?.friopen ?? null,
      friclose: args.businessTime?.friclose ?? null,
      fribreak: args.businessTime?.fribreak ?? null,
      satopen: args.businessTime?.satopen ?? null,
      satclose: args.businessTime?.satclose ?? null,
      satbreak: args.businessTime?.satbreak ?? null,
      sunopen: args.businessTime?.sunopen ?? null,
      sunclose: args.businessTime?.sunclose ?? null,
      sunbreak: args.businessTime?.sunbreak ?? null,
    };
    this.BusinessState = args.BusinessState ?? true;
    this.BusinessAdminPause = args.BusinessAdminPause ?? null;
    this.ownerCall = args.ownerCall ?? null;
    this.storeCall = args.storeCall ?? null;
    this.insta = args.insta ?? null;
    this.wifiId = args.wifiId ?? null;
    this.wifiPw = args.wifiPw ?? null;
    this.toiletManLocation = args.toiletManLocation ?? null;
    this.toiletManPw = args.toiletManPw ?? null;
    this.toiletWomanLocation = args.toiletWomanLocation ?? null;
    this.toiletWomanPw = args.toiletWomanPw ?? null;
    this.imgURL = args.imgURL ?? [];
  }
}
const storeData = new StoreForm({
  UUID: "", // 유일한 식별자
  id: 1, // 고유 가게 번호
  signDate: { seconds: 1672531199, nanoseconds: 0 }, // 등록 날짜 예시
  name: "호우수원",
  storeOwnerName: "김무개",
  accountHolder: "김무개",
  settlementAccount: "00-0000-0000-00",
  unitPrice: 1000,
  location: "경기 수원시 팔달구 덕영대로895번길 20 1층 호우수원",
  subwayStation: {
    line1: ["수원"],
  },
  gps: {
    Latitude: "37.2692324",
    longitude: "127.0005632",
  },
  businessTime: {
    monopen: "1200",
    monclose: "2200",
    monbreak: ["11001300", "15001600"],
    tueopen: "1200",
    tueclose: "2200",
    tuebreak: ["11001300", "15001600"],
    wedopen: null,
    wedclose: null,
    wedbreak: [],
    thuopen: "1200",
    thuclose: "2200",
    thubreak: ["11001300", "15001600"],
    friopen: "1200",
    friclose: "2200",
    fribreak: ["11001300", "15001600"],
    satopen: "1200",
    satclose: "2200",
    satbreak: ["11001300", "15001600"],
    sunopen: "1200",
    sunclose: "2200",
    sunbreak: ["11001300", "15001600"],
  },
  BusinessState: true,
  BusinessAdminPause: ["1999.10.11", 1],
  ownerCall: "010-0000-0000",
  storeCall: "0507-1471-2079",
  insta: "@hou_suwon",
  wifiId: "HOU_5G",
  wifiPw: "HOU1234567",
  toiletManLocation: "출입문 오른쪽 건물",
  toiletManPw: "비밀번호 없음",
  toiletWomanLocation: "출입문 오른쪽 건물",
  toiletWomanPw: "비밀번호 없음",
  imgURL: [""],
});
