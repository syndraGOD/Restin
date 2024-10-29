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
  Dialog,
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
import { stationList } from "../../api/stationList.js";
// import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../store/modules/filterSlice.js";
import { getImg, getImgList } from "../../api/fsImgDown.js";
import { setStoreData } from "../../store/modules/storeSlice.js";
import { DialogList } from "../../components/common/DialogList.jsx";
import HeaderText from "../../components/common/HeaderText.jsx";

// import asd from "../../assets/subwayicons/";
const Home = () => {
  // const theme = useSelector((state: RootState) => state.themeR.theme);
  // const theme = useSelector((state) => state.themeR.theme);
  // const dispatch = useDispatch();
  const filter = useSelector((state) => state.filterR.filter);
  const storeData = useSelector((state) => state.storeR.storeData);
  const dispatch = useDispatch();

  const storeListGetAll = async (db) => {
    const colName = "STORE";
    const col = collection(db, colName);

    const temps = await getDocs(col);
    const resData = [];
    temps.forEach((item) => {
      resData.push(item.data());
    });
    // console.log(resData);
    setFetchData(resData);
    const getItemImgList = async (array) => {
      const newImgList = await Promise.all(
        array.map(async (item) => {
          let imgArr = [];
          const ref = `StoreImage/store(${item.id})`;
          const itemImgList = await getImgList(ref);
          await Promise.all(
            itemImgList.items.map(async (img) => {
              const imgURL = await getImg(img.fullPath);
              imgArr.push(imgURL);
            })
          );
          return { ...item, imgURL: imgArr };
        })
      );
      dispatch(setStoreData(newImgList));
    };
    getItemImgList(resData);
  };

  const storeListFilltering = async () => {
    // if (!fetchData) return;
    // return await newImgList;
    // const temp = await getItemImgList(fetchData);
    let newData = storeData.filter((item, idx) => {
      const arrSet = new Set(...Object.values(item.subwayStation));
      return arrSet.has(filter.station);
    });
    setData(newData);
    if (newData.length === 0) setData();
  };
  // useEffect(() => {
  //   const
  // }, [sortUser]); //기준별로 데이터 정렬
  //이거 전에 필터별러ㅗ 데이터 필터링 먼저 구현

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
  let noRenderFill = 0;
  const [Loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState();
  // let fetchData;
  const [data, setData] = useState();
  const [FilterPage, setFilterPage] = useState(false);
  const [SortPageOpen, setSortPageOpen] = useState(false);
  const [sortUser, sortUserSet] = useState(sortList.recommend);

  // const sort = ["recommend", "distance", "like", "cheap"];
  const myTheme = useTheme();

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    storeListGetAll(db);
    // storeListFilltering();
  }, []);
  useEffect(() => {
    storeListFilltering();
  }, [filter]);
  useEffect(() => {
    storeListFilltering();
  }, [storeData]);

  useEffect(() => {
    // console.log(storeData);
    if (!Loading && Array.isArray(data) && data.length !== 0) {
      setLoading(true);
    }
  }, [data]);
  return (
    <>
      {Loading ? (
        <Page
          className="divJCC"
          // bgimg="../../assets/images/WelcomeImage1.png"
          css={css`
            height: 100%;
          `}
        >
          {/* [Children] FilterPage, Detail */}
          <Outlet />
          {/* h2 */}
          <HeaderText>Restin</HeaderText>
          {/* header */}
          <FullBox
            className="divJCC"
            sx={{
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                width: 1 / 2,
                borderRadius: "0px",
                borderRight: "1px solid #b0b0b0",
                alignItems: "center",
                padding: "15px 0px",
                display: "flex",
                justifyContent: "center",
              }}
              component={Link}
              to={{
                pathname: "filter",
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
                setSortPageOpen(true);
              }}
            >
              <TextBold color="InfoDark">{sortUser.text}</TextBold>
            </Box>

            <DialogList
              title="정렬"
              data={Object.values(sortList).map((obj) => obj.text)}
              selectedValue={sortUser.text}
              open={SortPageOpen}
              onClose={(value) => {
                setSortPageOpen(false);
                sortUserSet(
                  ...Object.values(sortList).filter((obj) => obj.text === value)
                );
              }}
            ></DialogList>
          </FullBox>
          {/* contents */}
          <FullBox
            className="divJCC"
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
                <TextBody color="MainText">
                  {data ? data.length : 0}개의 카페
                </TextBody>
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
            bgcolor={myTheme.palette.MainBackground.main}
            sx={
              {
                // borderRadius: "15px 15px 0 0",
              }
            }
          >
            <Navigation select="home" />
          </Box>
        </Page>
      ) : null}
    </>
  );
};

export default Home;
