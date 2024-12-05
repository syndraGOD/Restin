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
  stationList,
  SubwayIcons,
} from "../../../api/stationList";
import HeaderInner from "../../../components/common/HeaderInner";
import theme from "../../../style/theme";
import { TextBodyLarge } from "../../../components/designGuide";

const StoreFilterPage = () => {
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
  const navigate = useNavigate();
  const myTheme = useTheme();
  const [select, setSelect] = useState(filter);
  return (
    <FullBox
      className="divJCC"
      sx={{
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
        className="divJCC"
        sx={{
          flexDirection: "row",
          flexGrow: 1,
          // borderTop: `1px solid ${theme.palette.Gray.c400}`,
        }}
      >
        {/* line */}
        <Box
          className="divJCC"
          sx={{
            flexDirection: "column",
            backgroundColor: `${myTheme.palette.Gray.c100}`,
            width: "35%",
            height: "100%",
            justifyContent: "start",
          }}
        >
          {Object.keys(stationList).map((line) => {
            // const lineNum =
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
                    {line.replace("line", "")}호선
                  </TextBodyLarge>
                </Box>
              </Box>
            );
          })}
        </Box>
        {/* station */}
        <Box
          className="divJCC"
          sx={{
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
                  navigate(-1);
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
                  {stationIncludeLine(station).map((color_line, idx) => {
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
                  })}
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
