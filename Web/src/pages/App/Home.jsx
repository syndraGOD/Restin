import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store";
// import { themeToggle } from "../../store/modules/themeSlice.js";
// import { Button } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  TextBody,
  TextBold,
  TextHeader2,
} from "../../components/designGuide.jsx";
import { Box, Button, Typography } from "@mui/material";
import { Page } from "@components/Page.jsx";
// import image from "../../assets/images/WelcomeImage1.png";
import { useEffect, useState } from "react";
import { app, db } from "@api/firebaseConfig";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  runTransaction,
} from "firebase/firestore";
import StoreItem from "../../components/Home/StoreItem.jsx";
import Navigation from "../../components/common/Navigation.jsx";
import InBox from "../../components/common/InBox.jsx";
import FullBox from "../../components/common/FullBox.jsx";
import { useTheme } from "@mui/material/styles";
import StoreFilter from "../../components/Home/StoreFilter.jsx";
// import asd from "../../assets/subwayicons/";
const Home = () => {
  // const theme = useSelector((state: RootState) => state.themeR.theme);
  // const theme = useSelector((state) => state.themeR.theme);
  // const dispatch = useDispatch();
  const storeListUpdate = async (db) => {
    const colName = "STORE";
    const col = collection(db, colName);

    const temps = await getDocs(col);
    const temparr = [];
    temps.forEach((item) => {
      temparr.push(item.data());
    });
    setData(temparr);
  };
  // 혜화 4호선
  // 수원 1호선
  // 신금호 5호선
  // 왕십리역 5/2호선
  const stationList = {
    line1: ["수원"],
    line2: ["왕십리"],
    line4: ["혜화"],
    line5: ["신금호", "왕십리"],
  };
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    line: "line1",
    station: stationList["line1"][0],
  });
  const [FilterPage, setFilterPage] = useState(false);
  const ToggleFilterPage = () => {
    setFilterPage(!FilterPage);
  };
  useEffect(() => {
    storeListUpdate(db);
  }, []);
  // const data = [{ name: "sex1" }, { name: "sex2" }, { name: "sex3" }];

  const sort = ["recommend", "distance", "like", "cheap"];
  const [sortUser, sortUserSet] = useState("");
  const myTheme = useTheme();

  return (
    <Page
      bgimg="../../assets/images/WelcomeImage1.png"
      css={css`
        height: 100%;
      `}
    >
      {FilterPage ? (
        <StoreFilter
          filter={filter}
          setFilter={setFilter}
          stationList={stationList}
          ToggleFilterPage={ToggleFilterPage}
        ></StoreFilter>
      ) : null}
      {/* h2 */}
      <InBox sx={{ alignItems: "start" }}>
        <TextHeader2
          sx={{ margin: "5px 0", alignItems: "start" }}
          color="InfoDark"
        >
          Restin
        </TextHeader2>
      </InBox>
      {/* header */}
      <FullBox
        sx={{
          flexDirection: "row",
          margin: "15px 0",
        }}
      >
        <Box
          sx={{
            width: 1 / 2,
            borderRadius: "0px",
            borderRight: "2px solid #b0b0b0",
            alignItems: "center",
          }}
          component={Button}
          onClick={ToggleFilterPage}
        >
          <img
            src={`/src/assets/subwayicons/line (${filter.line.replace(
              "line",
              ""
            )}).png`}
            alt="subway line icons"
            width={"24px"}
            css={css`
              margin-right: 8px;
              border-radius: 10px;
            `}
          />
          <TextBold color="InfoDark">{filter.station}역</TextBold>
        </Box>
        <Box sx={{ width: 1 / 2 }}>
          <TextBold color="InfoDark">거리 순</TextBold>
        </Box>
      </FullBox>
      {/* contents */}
      <FullBox
        bgcolor={myTheme.palette.MainBackground.main}
        sx={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "start",
          // height: "100%",
          position: "relative",
          overflowY: "scroll",
        }}
      >
        <InBox
          className="contents"
          sx={{
            display: "block",
          }}
        >
          <Box textAlign={"start"} margin={"15px 0px"}>
            <TextBody color="MainText">{data.length}개의 카페</TextBody>
          </Box>
          <Box
            sx={{
              display: "block",
              // height: "1000px",
            }}
          >
            {data
              ? data.map((item, idx) => {
                  return (
                    <StoreItem
                      css={css``}
                      key={item.id}
                      item={item}
                      userDistance={5}
                    ></StoreItem>
                  );
                })
              : null}
          </Box>
        </InBox>
      </FullBox>
      {/* navigation */}
      <Box
        css={css`
          /* align-self: flex-end; */
          /* position: fixed; */
        `}
      >
        <Navigation select="home" />
      </Box>
      {/* <Button variant="contained" onClick={() => dispatch(themeToggle("asd"))}>
        Reducer Test2
      </Button> */}
    </Page>
  );
};

export default Home;
