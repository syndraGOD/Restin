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
import { AnnounceBanner } from "../../components/common/Banner.jsx";
import Slider from "react-slick/lib/slider.js";
import WhereUseModal from "./Home/WhereUseModal.jsx";

// window.location.reload();
const Home = () => {
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
  const auth_Token = useSelector((state) => state.tokenR.verifiToken);
  const announceImgs = useSelector((state) => state.varR.announceImgs);
  const [data, setData] = useState();
  const [SortPageOpen, setSortPageOpen] = useState(false);
  const [sortUser, sortUserSet] = useState(sortList.recommend);
  const [whereUseModalOpen, setWhereUseModalOpen] = useState(false);

  const navi = useNavigate();
  // console.log(window.history);
  const dispatch = useDispatch();
  const myTheme = useTheme();

  useEffect(() => {
    const fetchExistWantLocation = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/survey/exist/WHERE_USE_LOCATION`, {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + auth_Token,
        },
      });
      const awaitRes = await res.json();
      if (res.status !== 200) {
        setWhereUseModalOpen(true);
      }
    };
    fetchExistWantLocation();
  }, []);

  const storeListFilltering = async () => {
    //필터링
    if (storeData.length === 0) return;

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
  }, [filter, sortUser, storeData]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    useCSS: true,
    nextArrow: <></>, // nextn=button delete
  };
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
            <Box mt={3} borderRadius="20px">
              <Slider
                {...settings}
                css={css`
                  border-radius: 24px;
                  height: 25vw;
                `}
              >
                {announceImgs.map((URL, idx) => {
                  // if (idx === AnnounceImgs.length - 1) return null;
                  return (
                    <Box
                      key={URL}
                      onClick={() => {
                        if (idx === 0) {
                          navi("/point/charge");
                        } else if (idx === 1) {
                          navi("/app/useguide");
                        }
                      }}
                    >
                      <img
                        src={URL}
                        alt="announceImage"
                        width={"100%"}
                        css={css`
                          border-radius: 24px;
                        `}
                      />
                    </Box>
                  );
                })}
              </Slider>
            </Box>
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
                {/* test: 1.143156 */}
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
      {whereUseModalOpen && (
        <WhereUseModal
          onClose={() => {
            setWhereUseModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Home;
