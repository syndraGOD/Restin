/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import FullBox from "../../../components/common/FullBox";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BtnFullBox from "../../../components/BtnFullBox";
import { Page } from "../../../components/Page";
import InBox from "../../../components/common/InBox";
import { GrMapLocation } from "react-icons/gr";
import { useTheme } from "@mui/material/styles";
import {
  Boxs,
  TextBody,
  TextBodyLarge,
  TextBodySmall,
  TextHeader1,
  TextHeader2,
  TextHeader3,
} from "../../../components/designGuide";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Box, Button } from "@mui/material";
import InnerBox from "../../../components/common/InnerBox";
import { FaRegClock } from "react-icons/fa";
import { BiArrowToRight, BiPhoneCall } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import BtnDefault from "../../../components/BtnDefault";
import { today } from "../../../api/timeCheck";
import { FaAngleDown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import theme from "../../../style/theme";
import NotionLocList from "../../../api/NotionLocList";
import { restinAPI } from "../../../api/config";
import { useDispatch, useSelector } from "react-redux";
import { setuserData } from "../../../store/modules/userSlice";

import GetNotionJSX from "../../../components/common/NotionPageGet";
import HeaderInner from "../../../components/common/HeaderInner";
import { GoCopy } from "react-icons/go";
import { DefaultBtn } from "../../../components/common/Btns";
// import UseGuide from "./UseGuide";
import UseGuide from "./UseGuide.png";
import { DialogOK } from "../../../components/common/DialogOk";
import { sendMessageToRN } from "../../../api/RN/RNsend";

const StoreDetail = () => {
  const filter = useSelector((state) => state.filterR.filter);
  const userData = useSelector((state) => state.userR.userData);
  const storeData = useSelector((state) => state.storeR.storeData);
  const dispatch = useDispatch();
  const innerBoxIconSize = "18px";
  const innerBoxWidth = "26px";
  const myTheme = useTheme();
  const navi = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const selectUUID = searchParams.get("UUID");
  // const { item } = location.state || {};
  const item = storeData.filter((store) => store.UUID === selectUUID)[0];
  const [accordionIsVisible, setAccordionIsVisible] = useState(false);
  const innerSize = "12px";
  let nextButtonText = "이용 시작하기";

  // console.log("detail 리로드", "localstate : ", location.state || {});
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    useCSS: true,
    nextArrow: <></>, // nextn=button delete
  };

  const nextBtnClick = async () => {
    try {
      const res = await fetch(`${restinAPI}/user/usage/start`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + userData.security?.auth_token,
        },
        body: JSON.stringify({
          userData,
          storeInfo: {
            id: item.id,
            uuid: item.UUID,
          },
        }),
      });
      if (res.status === 200) {
        const awaitRES = await res.json();
        const resUserData = awaitRES.data;
        dispatch(setuserData(resUserData));
        navi("/app/using", { state: { item } });
      } else {
        navi(-1);
        console.log("이용시작 실패");
      }
    } catch (error) {
      navi(-1);
      console.log(error);
    }
    //resultCODE가 200일때와 아닐때 예외처리

    // navigate("", { state: { item } });
  };
  const timeForText = (open, close, breakTime) => {
    const Forkey = ({ children }) => {
      return <>{children}</>;
    };
    let resultText = "";
    let plusComponent = [];
    if (open && close) {
      resultText =
        "   " +
        open.substring(0, 2) +
        ":" +
        open.substring(2, 4) +
        " ~ " +
        close.substring(0, 2) +
        ":" +
        close.substring(2, 4);
      if (breakTime.length !== 0) {
        breakTime.map((breakOne, idx) => {
          plusComponent.push(
            <Forkey key={idx}>
              <br />
              <span
                css={css`
                  color: white;
                `}
              >
                살려줘
              </span>
              {"   "}
              <span>
                {breakOne.substring(0, 2) +
                  ":" +
                  breakOne.substring(2, 4) +
                  " ~ " +
                  breakOne.substring(4, 6) +
                  ":" +
                  breakOne.substring(6, 8)}
                {"   피크타임"}
              </span>
            </Forkey>
          );
        });
      }
    } else {
      resultText = "   " + "휴무일";
    }
    return (
      <>
        {resultText}
        {plusComponent ? <>{plusComponent}</> : null}
      </>
    );
  };

  const StoreOpeningText = () => {
    const for0To9ToText = (num) => {
      if (num < 10) {
        return `0${num}`;
      } else {
        return `${num}`;
      }
    };
    const openData = item.businessTime;
    const today = new Date();
    const todayText = String(today).substring(0, 3).toLowerCase();
    const todayHourMin = `${for0To9ToText(today.getHours())}${for0To9ToText(
      today.getMinutes()
    )}`;

    // console.log(todayHourMinText);
    const isClose = (todayText) => {
      const open = openData[`${todayText}open`];
      const close = openData[`${todayText}close`];
      if (open === null && close === null) {
        nextButtonText = "휴무일이에요";
        return ["휴무일", ""];
      }
      const breaks = openData[`${todayText}break`];
      let result = [
        "사용가능",
        `${
          open.substring(0, 2) +
          ":" +
          open.substring(2, 4) +
          " ~ " +
          close.substring(0, 2) +
          ":" +
          close.substring(2, 4)
        }`,
      ];

      if (!(open < todayHourMin && todayHourMin < close)) {
        result = [
          "사용시간 전",
          `${
            open.substring(0, 2) +
            ":" +
            open.substring(2, 4) +
            " ~ " +
            close.substring(0, 2) +
            ":" +
            close.substring(2, 4)
          }`,
        ];
        nextButtonText = `${
          open.substring(0, 2) + ":" + open.substring(2, 4)
        } 부터 사용할 수 있어요`;
      }
      breaks.map((breakOne) => {
        const breakOpen = breakOne.substring(0, 4);
        const breakClose = breakOne.substring(4, 8);
        if (breakOpen < todayHourMin && todayHourMin < breakClose) {
          result = [
            "사용시간 전",
            `${
              breakOne.substring(0, 2) +
              ":" +
              breakOne.substring(2, 4) +
              " ~ " +
              breakOne.substring(4, 6) +
              ":" +
              breakOne.substring(6, 8) +
              "   피크타임"
            }`,
          ];
        }
      });
      return result;
    };
    return isClose(todayText);
  };
  const [storeState, storeCloseReason] = StoreOpeningText();

  const navigate = useNavigate();
  const [markdown, setMarkdown] = useState("");
  // useEffect(() => {
  //   fetch("../../../api/Rules/allRules.md")
  //     .then(async (res) => {
  //       return await res.text();
  //     })
  //     .then((text) => setMarkdown(text));
  // }, []);

  /*
  /
  //
  /
  /
  */
  const NextButton = () => {
    const for0To9ToText = (num) => {
      if (num < 10) {
        return `0${num}`;
      } else {
        return `${num}`;
      }
    };
    const openData = item.businessTime;
    const today = new Date();
    const todayText = String(today).substring(0, 3).toLowerCase();
    const open = openData[`${todayText}open`];
    const close = openData[`${todayText}close`];
    const todayHourMin = `${for0To9ToText(today.getHours())}${for0To9ToText(
      today.getMinutes()
    )}`;
    if (userData.usage.startTime) {
      return (
        <DefaultBtn fixed={true} disabled={true}>
          다른 카페를 사용 중이에요
        </DefaultBtn>
      );
    } else if (!open && !close) {
      return (
        <DefaultBtn fixed={true} disabled={true}>
          휴무일이에요
        </DefaultBtn>
      );
    } else if (!(open < todayHourMin && todayHourMin < close)) {
      return (
        <DefaultBtn disabled={true} fixed={true}>
          {open.substring(0, 2) + ":" + open.substring(2, 4)} 부터 사용할 수
          있어요
        </DefaultBtn>
      );
    } else if (open < todayHourMin && todayHourMin < close) {
      console.log(open, close, todayHourMin);
      return (
        <DefaultBtn
          fixed={true}
          onClick={() => {
            navi(`${location.search}#isStart`);
          }}
        >
          사용 시작하기
        </DefaultBtn>
      );
    } else {
      console.log("오류 발생");
    }
  };
  let minDistanceStation = null;
  let minDistanceTime = Infinity;
  let minDistanceWayOut = null;
  if (item.stationDistance) {
    minDistanceTime = item.stationDistance[filter.station].distance;
    minDistanceStation = filter.station;
    minDistanceWayOut = item.stationDistance[filter.station].wayOut;
    // for (const [key, value] of Object.entries(item.stationDistance)) {
    //   const distance = parseInt(value.distance);
    //   if (distance < minDistanceTime) {
    //     minDistanceTime = distance;
    //     minDistanceStation = key;
    //     minDistanceWayOut = value.wayOut;
    //   }
    // }
  }

  // console.log(`가장 가까운 역: ${minDistanceStation}, 거리: ${minDistanceTime}`);
  return (
    <Page
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <FullBox
        sx={{
          // position: "absolute",
          // height: "130vh",
          overflow: "auto",
          backgroundColor: "white",
          justifyContent: "start",
        }}
      >
        {/* BackButton */}
        {/* <Box
          component={Button}
          onClick={() => {
            navigate(-1);
          }}
          sx={{
            position: "absolute",
            zIndex: 2,
            lineHeight: "70px",
            left: 0,
            top: 10,
          }}
        >
          <IoIosArrowBack size={"50px"} color={theme.palette.White.main} />
        </Box> */}

        <HeaderInner fixed={true}>이용 안내</HeaderInner>
        {/* image slider */}
        <FullBox
          className="slider-container"
          css={css`
            .slick-dots {
              bottom: 25px;
              li {
                button::before {
                  /* background-color: white;
                  border-radius: 50%; */
                  font-size: 10px;
                  color: #d6d6d6;
                }
              }
              .slick-active {
                button::before {
                  color: white;
                }
              }
            }
          `}
        >
          <Slider {...settings}>
            {item.imgURL.map((URL, idx) => {
              if (idx === item.imgURL.length - 1) return null;
              return (
                <div key={URL}>
                  <img src={URL} alt="cafeImage" width={"100%"} />
                </div>
              );
            })}
          </Slider>
        </FullBox>
        {/* Contents */}
        <FullBox>
          <FullBox
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <InBox
              sx={{
                justifyContent: "start",
                textAlign: "start",
              }}
            >
              <TextHeader3
                weight="Bold"
                color="Black.main"
                sx={{ mt: "21px", mb: "10px" }}
              >
                {item.name}
              </TextHeader3>

              <Box>
                <TextBodyLarge
                  weight="Medium"
                  css={css`
                    display: inline-block;
                  `}
                  color="Black.main"
                >
                  {minDistanceStation !== null ? (
                    <>
                      {minDistanceStation}역 {minDistanceWayOut}번 출구에서 도보{" "}
                      {minDistanceTime}분
                    </>
                  ) : (
                    "역 출구 도보 정보가 없습니다"
                  )}
                </TextBodyLarge>
                {/* <TextBodyLarge
                  css={css`
                    display: inline-block;
                  `}
                  color="Gray.c900"
                >
                  {" "}
                  · {70}m
                </TextBodyLarge> */}
              </Box>
              <Box
                css={css`
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 16px 24px;
                  border-radius: 14px;
                  margin: 20px 0 8px 0;
                `}
                bgcolor={myTheme.palette.Gray.c100}
              >
                <TextBodyLarge weight="Bold" color="Gray.c800">
                  10분당
                </TextBodyLarge>
                <TextHeader1 weight="Bold" color="PrimaryBrand">
                  {item.unitPrice}원
                </TextHeader1>
              </Box>
            </InBox>
          </FullBox>
          <Boxs variant="SecctionLine" sx={{ my: 2.5 }}></Boxs>
          <FullBox
            css={css`
              display: flex;
              justify-content: center;
            `}
          >
            <InBox
              css={css`
                .MuiTypography-root {
                  margin: 4px 0px;
                }
              `}
            >
              <InnerBox
                w={innerBoxWidth}
                text={
                  <FaRegClock
                    color={myTheme.palette.Gray.c400}
                    size={innerBoxIconSize}
                  />
                }
                css={css`
                  .MuiTypography-root {
                    display: inline-block;
                  }
                  display: flex;
                `}
              >
                <Box
                  css={css`
                    display: flex;
                    flex-direction: column;
                    text-align: start;
                  `}
                >
                  <Box
                    css={css`
                      position: relative;
                    `}
                  >
                    {}
                    <TextBody weight="Bold" color="PrimaryBrand">
                      {storeState}
                    </TextBody>
                    <TextBody color="Gray.c900"> · {storeCloseReason}</TextBody>
                    <Box
                      color={myTheme.palette.Gray.c400}
                      css={css`
                        position: absolute;
                        display: inline-block;
                        top: 50%;
                        transform: translateY(-50%);
                        margin-left: 0.5em;
                        padding: 3px;
                        /* margin: auto 0; */
                      `}
                      onClick={() => {
                        setAccordionIsVisible(!accordionIsVisible);
                      }}
                    >
                      <FaAngleDown size={18} />
                    </Box>
                  </Box>
                  {accordionIsVisible ? (
                    <Box
                      css={css`
                        display: flex;
                        flex-direction: column;
                        text-align: start;
                      `}
                    >
                      <TextBody
                        color={today().day === 1 ? "PrimaryBrand" : "Gray.c900"}
                      >
                        월요일
                        {timeForText(
                          item.businessTime.monopen,
                          item.businessTime.monclose,
                          item.businessTime.monbreak
                        )}
                      </TextBody>
                      <TextBody
                        color={today().day === 2 ? "PrimaryBrand" : "Gray.c900"}
                      >
                        화요일
                        {timeForText(
                          item.businessTime.tueopen,
                          item.businessTime.tueclose,
                          item.businessTime.tuebreak
                        )}
                      </TextBody>
                      <TextBody
                        color={today().day === 3 ? "PrimaryBrand" : "Gray.c900"}
                      >
                        수요일
                        {timeForText(
                          item.businessTime.wedopen,
                          item.businessTime.wedclose,
                          item.businessTime.wedbreak
                        )}
                      </TextBody>
                      <TextBody
                        color={today().day === 4 ? "PrimaryBrand" : "Gray.c900"}
                      >
                        목요일
                        {timeForText(
                          item.businessTime.thuopen,
                          item.businessTime.thuclose,
                          item.businessTime.thubreak
                        )}
                      </TextBody>
                      <TextBody
                        color={today().day === 5 ? "PrimaryBrand" : "Gray.c900"}
                      >
                        금요일
                        {timeForText(
                          item.businessTime.friopen,
                          item.businessTime.friclose,
                          item.businessTime.fribreak
                        )}
                      </TextBody>
                      <TextBody
                        color={today().day === 6 ? "PrimaryBrand" : "Gray.c900"}
                      >
                        토요일
                        {timeForText(
                          item.businessTime.satopen,
                          item.businessTime.satclose,
                          item.businessTime.satbreak
                        )}
                      </TextBody>
                      <TextBody
                        color={today().day === 0 ? "PrimaryBrand" : "Gray.c900"}
                      >
                        일요일
                        {timeForText(
                          item.businessTime.sunopen,
                          item.businessTime.sunclose,
                          item.businessTime.sunbreak
                        )}
                      </TextBody>
                    </Box>
                  ) : null}
                </Box>
              </InnerBox>
              <InnerBox
                w={innerBoxWidth}
                text={
                  <BiPhoneCall
                    color={myTheme.palette.Gray.c400}
                    size={innerBoxIconSize}
                  />
                }
              >
                <TextBody color="Gray.c900">{item.storeCall}</TextBody>
              </InnerBox>
              <InnerBox
                w={innerBoxWidth}
                text={
                  <FaInstagram
                    color={myTheme.palette.Gray.c400}
                    size={innerBoxIconSize}
                  />
                }
              >
                <TextBody color="Gray.c900">{item.insta}</TextBody>
              </InnerBox>
            </InBox>
          </FullBox>

          <Boxs variant="SecctionLine" sx={{ my: 2.5 }}></Boxs>
          <InBox
            sx={{
              justifySelf: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: 1,
            }}
          >
            <TextBodyLarge weight="Bold" color="Black.main">
              카페 길찾기
            </TextBodyLarge>

            <TextBodyLarge
              weight="Medium"
              display="inline-flex"
              color="Gray.c600"
              textAlign="start"
            >
              {item.location}
              {"  "}
              <Box
                sx={{
                  display: "inline-flex",
                  height: "100%",
                  color: "Gray.c600",
                  transform: "scaleX(-1)",
                }}
                onClick={() => {
                  sendMessageToRN({
                    type: "copy",
                    payload: {
                      text: item.location,
                    },
                  });
                }}
              >
                <GoCopy size={20} />
              </Box>
            </TextBodyLarge>

            {Object.entries(item.stationDistance).map(([key, value]) => {
              return (
                <TextBody color="Gray.c400">
                  {/* <Box sx={{ display: "inline" }}></Box> */}⦁ {key}역{" "}
                  {value.wayOut}번 출구에서 도보 {value.distance}분
                </TextBody>
              );
            })}

            <Box
              sx={{
                borderRadius: "16px",
                my: 3,
              }}
              component="img"
              width={"100%"}
              src={item.imgURL[item.imgURL.length - 1]}
            ></Box>
          </InBox>

          {/* start button */}
          <NextButton></NextButton>
        </FullBox>
      </FullBox>

      {/* isStart? dialog */}

      <DialogOK
        open="isStart"
        h2="사용 시작할까요?"
        text={`사용한 시간만큼 요금이 계산되고\n사용 종료 후 결제해요!`}
        isok={nextBtnClick}
        isoktext="사용 시작하기"
      >
        <Box color="Gray.c600">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextBodySmall>서비스 이용약관</TextBodySmall>
            <IoIosArrowForward
              onClick={() => {
                navi(`${location.search}#termsofuse`);
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextBodySmall>취소 및 환불 규칙</TextBodySmall>
            <IoIosArrowForward
              onClick={() => {
                navi(`${location.search}#refundrule`);
              }}
            />
          </Box>
          <TextBodySmall marginTop={1}>
            위 내용을 확인하였으며 결제에 동의합니다
          </TextBodySmall>
        </Box>
      </DialogOK>
    </Page>
  );
};

export default StoreDetail;
