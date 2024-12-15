import { useDispatch, useSelector } from "react-redux";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  TextBody,
  TextHeader3,
  TextTitle1,
} from "../../components/designGuide.jsx";
import { Box } from "@mui/material";
import { Page } from "@components/Page.jsx";
// import image from "../../assets/images/WelcomeImage1.png";
import { useEffect, useState } from "react";
import StoreItem from "./StoreItem.jsx";
import Navigation from "../../components/common/Navigation.jsx";
import InBox from "../../components/common/InBox.jsx";
import FullBox from "../../components/common/FullBox.jsx";
import { useTheme } from "@mui/material/styles";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { setStoreData } from "../../store/modules/storeSlice.js";
import { DialogList } from "../../components/common/DialogOk.jsx";
import logo_small from "@assets/Logo/logo_small.png";
import { IoIosArrowDown } from "react-icons/io";
import theme from "../../style/theme.js";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { VscCircleLarge } from "react-icons/vsc";

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
    // populer: {
    //   text: "인기 순",
    //   identifier: "populer",
    // },
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
  // const storeListGetAll = async (db) => {
  //   if (storeData.length === 0) {
  //     const colName = "STORE";
  //     const col = collection(db, colName);

  //     const temps = await getDocs(col);
  //     const resData = [];
  //     temps.forEach((item) => {
  //       resData.push(item.data());
  //     });
  //     const getItemImgList = async (array) => {
  //       const newImgList = await Promise.all(
  //         array.map(async (item) => {
  //           let imgArr = [];
  //           const ref = `StoreImage/store(${item.id})`;
  //           const itemImgList = await getImgList(ref);
  //           await Promise.all(
  //             itemImgList.items.map(async (img) => {
  //               const imgURL = await getImg(img.fullPath);
  //               imgArr.push(imgURL);
  //             })
  //           );
  //           return { ...item, imgURL: imgArr };
  //         })
  //       );
  //       dispatch(setStoreData(newImgList));
  //     };
  //     await getItemImgList(resData);
  //   } else {
  //     return;
  //   }
  // };

  // useEffect(() => {
  //   console.log("이미지 다운로드 및 실행");
  //   const init = async () => {
  //     await storeListGetAll(db);
  //     await storeListFilltering();
  //     setLoading(true);
  //   };
  //   init();
  // }, []);

  const storeListFilltering = async () => {
    //필터링
    let newData = storeData.filter((item, idx) => {
      let result;
      Object.values(item.subwayStation).map((e) => {
        if (e.includes(filter.station)) {
          result = true;
        }
      });
      // console.log(item.name, result);
      return result;
    });
    if (newData.length === 0) {
      setData([]);
    } else {
      //sort index 생성
      const sortDataIndex = newData.map((item, idx) => {
        if (!item.stationDistance)
          return {
            item,
            distance: 0,
            payment: 0,
          };
        return {
          item,
          distance: item.stationDistance[filter.station].distance,
          // distance: Math.min(
          //   ...Object.entries(item.stationDistance).map(([key, value]) => {
          //     return parseInt(value.distance);
          //   })
          // ),
          payment: item.unitPrice,
        };
      });
      // storeSortIndex.recommend = sortDataIndex.sort(
      //   (a, b) => a.distance - b.distance
      // );

      if (
        sortUser.identifier === "distance" ||
        sortUser.identifier === "recommend"
      ) {
        sortDataIndex.sort((a, b) => a.distance - b.distance);
      } else if (sortUser.identifier === "payment") {
        sortDataIndex.sort((a, b) => a.payment - b.payment);
      }
      // storeSortIndex.payment = sortDataIndex.sort(
      //   (a, b) => a.payment - b.payment
      // );
      setData(sortDataIndex);
    }
  };

  useEffect(() => {
    storeListFilltering();
  }, [filter, sortUser]);

  const location = useLocation();
  return (
    <>
      <Page
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          textAlign: "center",
          // bgcolor: "red",
        }}
        className=""
        // bgimg="../../assets/images/WelcomeImage1.png"
        css={css`
          height: 100%;
        `}
      >
        {/* h2 */}
        <InBox
          sx={{
            my: 3,
            mt: 5,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Box
            component={"img"}
            src={logo_small}
            height={"21px"}
            justifySelf="flex-start"
          />
        </InBox>
        {/* header */}
        <FullBox
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row",
            textAlign: "center",
          }}
          padding={1.5}
          borderBottom={`1px solid ${theme.palette.Gray.c300}`}
        >
          <InBox textAlign={"start"}>
            <Box
              display={"flex"}
              alignItems={"center"}
              onClick={() => {
                navi("/app/filter");
              }}
            >
              <TextHeader3 weight="Bold">{filter.station}역 </TextHeader3>
              <IoIosArrowDown size={24} color={theme.palette.Gray.c900} />
            </Box>
          </InBox>
          {/* <Box
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
            </Box> */}

          <DialogList
            title="정렬"
            data={Object.values(sortList).map((obj) => {
              return (
                <Box key={obj.text} display="flex" alignItems={"center"}>
                  {obj.text !== sortUser.text ? (
                    <VscCircleLarge size={20} />
                  ) : (
                    <BsFillRecordCircleFill
                      color={theme.palette.PrimaryBrand.main}
                      size={20}
                    />
                  )}

                  {"    " + obj.text}
                  {/* <TextBody>{obj.text}</TextBody> */}
                </Box>
              );
            })}
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
          bgcolor={myTheme.palette.White.main}
          sx={{
            display: "flex",
            alignContent: "center",
            flexDirection: "column",
            textAlign: "center",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "start",
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                // textAlign: "start",
                margin: "24px 0 24px 0",
              }}
            >
              <TextBody color="Gray.c900">
                {data ? data.length : 0}개의 카페
              </TextBody>
              <Box
                sx={{
                  maxHeight: "30px",
                  border: `1px solid ${theme.palette.Gray.c300}`,
                  borderRadius: "16px",
                  padding: "4px 12px",
                }}
                onClick={() => {
                  setSortPageOpen(true);
                }}
              >
                <TextBody weight="Bold" color="Gray.c700">
                  {sortUser.text}
                </TextBody>
              </Box>
            </Box>
            <Box display="block">
              {data
                ? data.map(({ item }, idx) => {
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
          bgcolor={myTheme.palette.White.main}
          sx={
            {
              // borderRadius: "15px 15px 0 0",
            }
          }
        >
          <Navigation select="home" />
        </Box>
      </Page>
    </>
  );
};

export default Home;
