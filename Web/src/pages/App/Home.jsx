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
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  MenuList,
  Select,
  Typography,
  FormLabel,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
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
import StoreFilterPage from "../../components/Home/StoreFilter.jsx";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
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
  const sortList = {
    recommend: {
      text: "추천 순",
      identifier: "recommend",
    },
    distance: {
      text: "거리 순",
      identifier: "distance",
    },
    populer: {
      text: "인기 순",
      identifier: "populer",
    },
    payment: {
      text: "가격 순",
      identifier: "payment",
    },
  };
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    line: "line1",
    station: stationList["line1"][0],
  });
  const [FilterPage, setFilterPage] = useState(false);
  const [SortPage, setSortPage] = useState(false);
  const [sortUser, sortUserSet] = useState(sortList.recommend);
  const ToggleFilterPage = () => {
    // setFilterPage(!FilterPage);
    let navigate = useNavigate();
    navigate(`/filter`);
  };
  useEffect(() => {
    storeListUpdate(db);
  }, []);
  // useEffect(() => {
  //   const
  // }, [sortUser]); //기준별로 데이터 정렬
  //이거 전에 필터별러ㅗ 데이터 필터링 먼저 구현

  const sort = ["recommend", "distance", "like", "cheap"];
  const myTheme = useTheme();

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Page
      bgimg="../../assets/images/WelcomeImage1.png"
      css={css`
        height: 100%;
      `}
    >
      {/* <Outlet /> */}
      {FilterPage ? (
        <StoreFilterPage
          filter={filter}
          setFilter={setFilter}
          stationList={stationList}
          ToggleFilterPage={ToggleFilterPage}
        ></StoreFilterPage>
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
        }}
      >
        <Box
          sx={{
            width: 1 / 2,
            borderRadius: "0px",
            borderRight: "2px solid #b0b0b0",
            alignItems: "center",
            padding: "15px 0px",
            display: "flex",
            justifyContent: "center",
          }}
          component={Link}
          // onClick={ToggleFilterPage}
          to={{
            pathname: "filter",
            state: {
              filter: { filter },
              setFilter: { setFilter },
              stationList: { stationList },
              ToggleFilterPage: { ToggleFilterPage },
            },
          }}
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
        <Box
          sx={{ width: 1 / 2, padding: "15px 0px", position: "relative" }}
          onClick={() => {
            setSortPage(!SortPage);
          }}
        >
          {SortPage ? (
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "300%",
                height: `${Object.keys(sortList).length * 100}%`,
                top: "51px",
                zIndex: 1,
                backgroundColor: "white",
                borderRadius: "0px 0px 15px 15px",
                border: "1px solid #e0e0e0",
              }}
            >
              <FormControl
                css={css`
                  /* background-color: black; */
                  height: 100%;
                `}
              >
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={sortUser.identifier}
                  onChange={(e) => sortUserSet(sortList[e.currentTarget.value])}
                  css={css`
                    height: 100%;
                    .MuiFormControlLabel-root {
                      /* background-color: #e0e0e0; */
                      width: 100%;
                      margin: 0;
                      flex: 1;
                      justify-content: center;
                      margin-left: -30px;
                    }
                  `}
                >
                  {Object.entries(sortList).map((item) => {
                    {
                      console.log(item);
                    }
                    return (
                      <FormControlLabel
                        key={item[1].identifier}
                        value={item[1].identifier}
                        control={<Radio />}
                        label={item[1].text}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Box>
          ) : null}

          <TextBold color="InfoDark">{sortUser.text}</TextBold>
          {/* <FormControl variant="standard" sx={{ minWidth: 1 }}>
            <Select

              onChange={handleChange}
              autoWidth
              label="Age"
              sx={{ border: "none" }}
              value={20}
            >
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={21}>Twenty one</MenuItem>
              <MenuItem value={22}>Twenty</MenuItem>
            </Select>
          </FormControl> */}
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
