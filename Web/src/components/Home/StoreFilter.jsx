import { useState } from "react";
import FullBox from "../common/FullBox";
import InBox from "../common/InBox";
import { TextBody, TextBold, TextHeader2, TextHeader3 } from "../designGuide";
import { RxCross2 } from "react-icons/rx";
import { Box, Button, Select, useTheme } from "@mui/material";

const StoreFilterPage = ({
  filter,
  setFilter,
  stationList,
  ToggleFilterPage,
}) => {
  //   const { line, station } = filter;
  // stationList = stationList.
  const myTheme = useTheme();
  const [select, setSelect] = useState(filter);
  return (
    <FullBox
      sx={{
        position: "absolute",
        height: "100%",
        zIndex: 1,
        backgroundColor: "white",
        justifyContent: "start",
      }}
    >
      {/* h2 */}
      <FullBox
        sx={{
          alignItems: "center",
          position: "relative",
          padding: "10px 0px",
          borderBottom: `1px solid ${myTheme.palette.SubText.main}`,
          height: "70px",
        }}
      >
        <Box
          component={Button}
          onClick={ToggleFilterPage}
          sx={{ position: "absolute", lineHeight: "70px", left: "10px" }}
        >
          <RxCross2 size={"40px"} color={myTheme.palette.InfoDark.main} />
        </Box>
        <TextHeader3
          sx={{ margin: "5px 0", alignItems: "center" }}
          color="InfoDark"
        >
          필터
        </TextHeader3>
      </FullBox>
      {/* Fillter */}
      <FullBox sx={{ flexDirection: "row", flexGrow: 1 }}>
        {/* line */}
        <Box
          sx={{
            flexDirection: "column",
            backgroundColor: `${myTheme.palette.MainBackground.main}`,
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
                  backgroundColor: `${
                    line === select.line
                      ? "white"
                      : myTheme.palette.MainBackground.main
                  }`,
                  borderRight: `1px solid ${myTheme.palette.SubText.main}`,
                  borderRadius: "0px",
                  height: "45px",
                  borderBottom: `1px solid ${myTheme.palette.SubText.main}`,
                  boxSizing: "border-box",
                  textDecoration: "none",
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
                <Box
                  sx={{
                    position: "absolute",
                    left: "0px",
                    width: "15%",
                    height: "100%",
                    backgroundColor: `${
                      line === select.line
                        ? myTheme.palette.PrimaryBrand.main
                        : myTheme.palette.MainBackground.main
                    }`,
                  }}
                />
                <Box
                //   sx={{
                //     height: "100%",

                //   }}
                >
                  <TextBold sx={{ textDecoration: "none" }} color={"InfoDark"}>
                    {line.replace("line", "")}호선
                  </TextBold>
                </Box>
              </Box>
            );
          })}
        </Box>
        {/* station */}
        <Box
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
                  borderBottom: `1px solid ${myTheme.palette.SubText.main}`,
                  boxSizing: "border-box",
                  textDecoration: "none",
                  justifyContent: "start",
                }}
                component={Button}
                onClick={() => {
                  setFilter({
                    ...select,
                    station,
                  });
                  ToggleFilterPage();
                }}
                key={idx}
              >
                <TextBody sx={{ textDecoration: "none" }} color={"InfoDark"}>
                  {station}
                </TextBody>
              </Box>
            );
          })}
        </Box>
      </FullBox>
    </FullBox>
  );
};

export default StoreFilterPage;
