/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import FullBox from "../../../components/common/FullBox";
import { TextBody } from "@components/designGuide";
import { Box, Button, Select, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../../store/modules/filterSlice";
import { useNavigate } from "react-router-dom";
import {
  LineInfo,
  stationIncludeLine,
  SubwayIcons,
} from "../../../api/stationList";
import HeaderInner from "../../../components/common/HeaderInner";
import theme from "../../../style/theme";
import { TextBodyLarge } from "../../../components/designGuide";

const StoreFilterPage = () => {
  const storeData = useSelector((state) => state.storeR.storeData);

  // console.log("ㅎㅇ");
  //   const { line, station } = filter;
  // stationList = stationList.
  // const location = useLocation();
  // console.log(location);
  // const { filter, setFilter, stationList, ToggleFilterPage } =
  //   location.state || {};
  // console.log(filter, setFilter, stationList, ToggleFilterPage);

  const filter = useSelector((state) => state.filterR.filter);
  const dispatch = useDispatch();
  const navi = useNavigate();
  const myTheme = useTheme();
  const [select, setSelect] = useState(filter);

  // 각 노선을 순회하면서 중복된 역을 제거
  let stationList = {};
  storeData.map((store) => {
    for (const [line, stations] of Object.entries(store.subwayStation)) {
      // Set을 사용하여 중복된 역 제거
      // console.log(line, stations);
      const uniqueStations = new Set();
      uniqueStations.add(...stations);
      // const Array_uniqueStations = [...uniqueStations];
      // stationList[line] = Array_uniqueStations;
      if (stationList[line] === undefined) {
        stationList[line] = uniqueStations;
      } else {
        stationList[line].add(...uniqueStations);
      }
    }
  });
  //집합을 배열로 변환
  Object.entries(stationList).forEach(([line, stations]) => {
    stationList[line] = [...stationList[line]];
  });
  //호선 순으로 정렬
  const sortedStationList = Object.keys(stationList)
    .map((line) => parseInt(line.replace("line", "")))
    .sort((a, b) => a - b) // 키를 정렬
    .map((line) => `line${line}`);
  // .reduce((acc, key) => {
  //   acc[key] = stationList[key];
  //   return acc;
  // }, {});

  return (
    <FullBox
      sx={{
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
        textAlign: "center",

        position: "absolute",
        height: "100%",
        zIndex: 1,
        backgroundColor: "white",
        justifyContent: "start",
      }}
    >
      {/* h2 */}
      <HeaderInner>지역 선택</HeaderInner>
      {/* Fillter */}
      <FullBox
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
          flexDirection: "row",
          flexGrow: 1,
          // borderTop: `1px solid ${theme.palette.Gray.c400}`,
        }}
      >
        {/* line */}
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            textAlign: "start",
            flexDirection: "column",
            backgroundColor: `${myTheme.palette.Gray.c100}`,
            width: "35%",
            height: "100%",
            justifyContent: "start",
          }}
        >
          {sortedStationList.map((line) => {
            return (
              <Box
                sx={{
                  position: "relative",
                  // backgroundColor: `${
                  //   line === select.line ? "white" : myTheme.palette.White.main
                  // }`,
                  // borderRight: `1px solid ${myTheme.palette.Gray.c400}`,
                  borderRadius: "0px",
                  height: "45px",
                  // borderBottom: `1px solid ${myTheme.palette.Gray.c400}`,
                  boxSizing: "border-box",
                  textDecoration: "none",
                  backgroundColor: "Gray.c100",
                  // display: "flex",
                  // alignItems: "center",
                  // justifyContent: "start",
                  // marginLeft: "16px",
                }}
                component={Button}
                onClick={() => {
                  setSelect({
                    ...select,
                    line,
                  });
                }}
                key={line}
              >
                {/* <Box
                  sx={{
                    position: "absolute",
                    left: "0px",
                    width: "15%",
                    height: "100%",
                    backgroundColor: `${
                      line === select.line
                        ? myTheme.palette.PrimaryBrand.main
                        : myTheme.palette.White.main
                    }`,
                  }}
                /> */}
                <Box
                //   sx={{
                //     height: "100%",

                //   }}
                >
                  <TextBodyLarge
                    weight="Bold"
                    sx={{ textDecoration: "none" }}
                    color={"Gray.c900"}
                    position={"relative"}
                    css={css`
                      ::before {
                        content: "";
                        position: absolute;
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        margin: auto;
                        border-radius: 50%;
                        left: -15px;
                        top: 40%;
                        background-color: ${LineInfo[line].color};
                      }
                    `}
                  >
                    {LineInfo[line].name}
                  </TextBodyLarge>
                </Box>
              </Box>
            );
          })}
        </Box>
        {/* station */}
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            textAlign: "center",
            flexDirection: "column",
            marginLeft: "5%",
            width: "60%",
            height: "100%",
            justifyContent: "start",
          }}
        >
          {stationList[select.line].map((station, idx) => {
            return (
              <Box
                sx={{
                  borderRadius: "0px",
                  height: "45px",
                  // borderBottom: `1px solid ${myTheme.palette.Gray.c400}`,
                  boxSizing: "border-box",
                  textDecoration: "none",
                  justifyContent: "start",
                }}
                component={Button}
                onClick={() => {
                  dispatch(
                    setFilter({
                      ...select,
                      station,
                    })
                  );
                  // ToggleFilterPage();
                  navi(-1);
                }}
                key={idx}
              >
                <TextBodyLarge
                  sx={{ textDecoration: "none" }}
                  color={"Gray.c900"}
                  weight="Medium"
                >
                  {station}
                </TextBodyLarge>
                <Box display={"flex"} alignItems={"center"}>
                  {stationIncludeLine(station, stationList).map(
                    (color_line, idx) => {
                      return (
                        <>
                          {/* <img
                          src={SubwayIcons[color_line]}
                          alt="subway line icons"
                          width={"20px"}
                          css={css`
                            margin-left: 8px;
                            margin-top: 2px;
                            border-radius: 10px;
                          `}
                        /> */}
                        </>
                        // <Box
                        //   key={color_line}
                        //   css={css`
                        //     display: inline-block;
                        //     width: 8px;
                        //     height: 8px;
                        //     margin-left: 10px;
                        //     border-radius: 50%;
                        //     /* background-color: ${LineInfo[color_line].color}; */
                        //   `}
                        // ></Box>
                      );
                    }
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </FullBox>
    </FullBox>
  );
};

export default StoreFilterPage;
