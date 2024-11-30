import { useDispatch, useSelector } from "react-redux";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TextBody, TextTitle1 } from "../../components/designGuide.jsx";
import { Box } from "@mui/material";
import { Page } from "@components/Page.jsx";
// import image from "../../assets/images/WelcomeImage1.png";
import { useEffect, useState } from "react";
import { db } from "@api/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import StoreItem from "../../components/Home/StoreItem.jsx";
import Navigation from "../../components/common/Navigation.jsx";
import InBox from "../../components/common/InBox.jsx";
import FullBox from "../../components/common/FullBox.jsx";
import { useTheme } from "@mui/material/styles";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { getImg, getImgList } from "../../api/fsImgDown.js";
import { setStoreData } from "../../store/modules/storeSlice.js";
import { DialogList } from "../../components/common/DialogList.jsx";
import HeaderText from "../../components/common/HeaderText.jsx";
import SubwayIcons from "../../api/getSubwayImage.js";
const Home = () => {
  console.log("렌더링");
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
  const filter = useSelector((state) => state.filterR.filter);
  const storeData = useSelector((state) => state.storeR.storeData);
  const userData = useSelector((state) => state.userR.userData);
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [SortPageOpen, setSortPageOpen] = useState(false);
  const [sortUser, sortUserSet] = useState(sortList.recommend);
  const navi = useNavigate();
  const dispatch = useDispatch();
  const myTheme = useTheme();

  const storeListGetAll = async (db) => {
    if (storeData.length === 0) {
      const colName = "STORE";
      const col = collection(db, colName);

      const temps = await getDocs(col);
      const resData = [];
      temps.forEach((item) => {
        resData.push(item.data());
      });
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
      await getItemImgList(resData);
    } else {
      return;
    }
  };

  const storeListFilltering = async () => {
    let newData = storeData.filter((item, idx) => {
      const arrSet = new Set(...Object.values(item.subwayStation));
      return arrSet.has(filter.station);
    });
    setData(newData);
    if (newData.length === 0) setData();
  };

  useEffect(() => {
    console.log("이미지 다운로드 및 실행");
    const init = async () => {
      await storeListGetAll(db);
      await storeListFilltering();
      setLoading(true);
    };
    init();
  }, []);
  useEffect(() => {
    storeListFilltering();
  }, [filter]);
  // useEffect(() => {
  //   storeListFilltering();
  // }, [storeData]);

  // useEffect(() => {
  //   if (!Loading && Array.isArray(data) && data.length !== 0) {
  //     setLoading(true);
  //   }
  // }, [data]);

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
                src={SubwayIcons[filter.line.replace("line", "")]}
                // {`/src/assets/subwayicons/line (${filter.line.replace(
                //   "line",
                //   ""
                // )}).png`}
                alt="subway line icons"
                width={"24px"}
                css={css`
                  margin-right: 8px;
                  border-radius: 10px;
                `}
              />
              <TextBody weight="Bold" color="Black">
                {filter.station}역
              </TextBody>
            </Box>
            <Box
              sx={{ width: 1 / 2, padding: "15px 0px", position: "relative" }}
              onClick={() => {
                setSortPageOpen(true);
              }}
            >
              <TextBody weight="Bold" color="Black">
                {sortUser.text}
              </TextBody>
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
