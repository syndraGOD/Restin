import { useState } from "react";
import FullBox from "../../../components/common/FullBox";
import { TextBody } from "@components/designGuide";
import { Box, Button, Select, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../../store/modules/filterSlice";
import { useNavigate } from "react-router-dom";
import { stationList } from "../../../api/stationList";
import HeaderInner from "../../../components/common/HeaderInner";
import theme from "../../../style/theme";

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
      <HeaderInner>필터</HeaderInner>
      {/* Fillter */}
      <FullBox
        className="divJCC"
        sx={{
          flexDirection: "row",
          flexGrow: 1,
          borderTop: `1px solid ${theme.palette.Gray.c400}`,
        }}
      >
        {/* line */}
        <Box
          className="divJCC"
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
                  borderRight: `1px solid ${myTheme.palette.Gray.c400}`,
                  borderRadius: "0px",
                  height: "45px",
                  borderBottom: `1px solid ${myTheme.palette.Gray.c400}`,
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
                  <TextBody
                    weight="Bold"
                    sx={{ textDecoration: "none" }}
                    color={"Black"}
                  >
                    {line.replace("line", "")}호선
                  </TextBody>
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
                  borderBottom: `1px solid ${myTheme.palette.Gray.c400}`,
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
                <TextBody sx={{ textDecoration: "none" }} color={"Black"}>
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
