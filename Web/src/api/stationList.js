import SubwayLineIcon_1 from "../assets/subwayicons/line (1).png";
import SubwayLineIcon_2 from "../assets/subwayicons/line (2).png";
import SubwayLineIcon_3 from "../assets/subwayicons/line (3).png";
import SubwayLineIcon_4 from "../assets/subwayicons/line (4).png";
import SubwayLineIcon_5 from "../assets/subwayicons/line (5).png";
import SubwayLineIcon_6 from "../assets/subwayicons/line (6).png";
import SubwayLineIcon_7 from "../assets/subwayicons/line (7).png";
import SubwayLineIcon_8 from "../assets/subwayicons/line (8).png";
import SubwayLineIcon_9 from "../assets/subwayicons/line (9).png";
import SubwayLineIcon_10 from "../assets/subwayicons/line (10).png";
import SubwayLineIcon_11 from "../assets/subwayicons/line (11).png";
import SubwayLineIcon_12 from "../assets/subwayicons/line (12).png";
import SubwayLineIcon_13 from "../assets/subwayicons/line (13).png";
import SubwayLineIcon_14 from "../assets/subwayicons/line (14).png";
import SubwayLineIcon_15 from "../assets/subwayicons/line (15).png";
import SubwayLineIcon_16 from "../assets/subwayicons/line (16).png";
import SubwayLineIcon_17 from "../assets/subwayicons/line (17).png";
import SubwayLineIcon_18 from "../assets/subwayicons/line (18).png";
import SubwayLineIcon_19 from "../assets/subwayicons/line (19).png";
import SubwayLineIcon_20 from "../assets/subwayicons/line (20).png";
import SubwayLineIcon_21 from "../assets/subwayicons/line (21).png";
import SubwayLineIcon_22 from "../assets/subwayicons/line (22).png";

export const stationList = {
  line1: ["수원", "금정"],
  line2: ["당산", "신당"],
  line5: ["신금호"],
  line6: ["신당"],
  line9: ["당산"],
};

export const stationIncludeLine = (station) => {
  return Object.keys(stationList).filter((line) =>
    stationList[line].includes(station)
  );
};
export const LineInfo = {
  line1: {
    color: "#0D3692",
  },
  line2: {
    color: "#26AE29",
  },
  line3: {
    color: "#F75730",
  },
  line4: {
    color: "#3F63CC",
  },
  line5: {
    color: "#9446B8",
  },
  line6: {
    color: "#8D4718",
  },
  line7: {
    color: "#54640C",
  },
  line8: {
    color: "#E21A65",
  },
  line9: {
    color: "#BEB193",
  },
};

export const stationInfo = {
  수원: {
    gps: {
      Latitude: "37.5637435",
      longitude: "127.0170079",
    },
  },
};

export const SubwayIcons = {
  line1: SubwayLineIcon_1,
  line2: SubwayLineIcon_2,
  line3: SubwayLineIcon_3,
  line4: SubwayLineIcon_4,
  line5: SubwayLineIcon_5,
  line6: SubwayLineIcon_6,
  line7: SubwayLineIcon_7,
  line8: SubwayLineIcon_8,
  line9: SubwayLineIcon_9,
  line10: SubwayLineIcon_10,
  line11: SubwayLineIcon_11,
  line12: SubwayLineIcon_12,
  line13: SubwayLineIcon_13,
  line14: SubwayLineIcon_14,
  line15: SubwayLineIcon_15,
  line16: SubwayLineIcon_16,
  line17: SubwayLineIcon_17,
  line18: SubwayLineIcon_18,
  line19: SubwayLineIcon_19,
  line20: SubwayLineIcon_20,
  line21: SubwayLineIcon_21,
};

// const test = async () => {
//   const res = await fetch(
//     "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=서울 강남구 강남대로 396",
//     {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "x-ncp-apigw-api-key-id": "wnly5twcnp",
//         "x-ncp-apigw-api-key": "PrNhsrSFlkYcomT7uq1gu8Y517BsGbR5aLWECJqD",
//       },
//     }
//   );
//   const awaitRes = await res.json();
//   console.log(res);
//   console.log(awaitRes);
// };
// test();
// 혜화 4호선
// 수원 1호선
// 신금호 5호선
// 왕십리역 5/2호선
