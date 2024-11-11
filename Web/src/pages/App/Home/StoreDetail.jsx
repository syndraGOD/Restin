/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import FullBox from "../../../components/common/FullBox";
import Test1 from "@assets/images/Test1.png";
import Test2 from "@assets/images/Test2.png";
import Test3 from "@assets/images/Test3.png";
import Test4 from "@assets/images/Test4.png";
import Test5 from "@assets/images/Test5.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BtnFullBox from "../../../components/BtnFullBox";
import { Page } from "../../../components/Page";
import InBox from "../../../components/common/InBox";
import { GrMapLocation } from "react-icons/gr";
import { useTheme } from "@mui/material/styles";
import {
  TextBody,
  TextBodyLarge,
  TextBold,
  TextBtnText,
  TextHeader2,
} from "../../../components/designGuide";
import { IoIosArrowBack } from "react-icons/io";
import { Box, Button, Dialog } from "@mui/material";
import InnerBox from "../../../components/common/InnerBox";
import { FaRegClock } from "react-icons/fa";
import { BiPhoneCall } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import BtnDefault from "../../../components/BtnDefault";
import { today } from "../../../api/timeCheck";
import { FaAngleDown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import theme from "../../../style/theme";
import NotionLocList from "../../../api/NotionLocList";
import { restinAPI } from "../../../api/config";
import { useSelector } from "react-redux";

const StoreDetail = () => {
  const userData = useSelector((state) => state.userR.userData);
  const innerBoxIconSize = "18px";
  const innerBoxWidth = "26px";
  const myTheme = useTheme();
  const location = useLocation();
  const { item } = location.state || {};
  const storeData = item;
  console.log(storeData);
  const [accordionIsVisible, setAccordionIsVisible] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const innerSize = "12px";
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    useCSS: true,
  };

  const nextBtnClick = async () => {
    const res = await fetch(`${restinAPI}/user/usage/start`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + userData.security.auth_token,
      },
      body: JSON.stringify({
        userData,
        storeInfo: {
          id: storeData.id,
          uuid: storeData.UUID,
        },
      }),
    });
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
  let nextButtonText = "사용 시작하기";
  const [storeState, storeCloseReason] = StoreOpeningText();

  const navigate = useNavigate();
  return (
    <Page className="divJCC">
      <FullBox
        sx={{
          position: "absolute",
          height: "100%",
          zIndex: 1,
          backgroundColor: "white",
          justifyContent: "start",
        }}
      >
        {/* BackButton */}
        <Box
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
          <IoIosArrowBack size={"50px"} color={theme.palette.InfoLight.main} />
        </Box>
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
            {item.imgURL.map((URL) => {
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
          <FullBox className="divJCC">
            <InBox
              sx={{
                justifyContent: "start",
                textAlign: "start",
              }}
            >
              <TextHeader2 color="InfoDark" sx={{ mt: 2, mb: 2 }}>
                {item.name}
              </TextHeader2>
              <InnerBox
                text={
                  <GrMapLocation
                    color={myTheme.palette.SubText.main}
                    size={innerBoxIconSize}
                    css={css`
                      top: 0.1em !important;
                    `}
                  />
                }
                w={innerBoxWidth}
              >
                <Box>
                  <TextBold
                    css={css`
                      display: inline-block;
                    `}
                    color="PrimaryBrand"
                  >
                    걸어서 {1}분
                  </TextBold>
                  <TextBody
                    css={css`
                      display: inline-block;
                    `}
                    color="MainText"
                  >
                    {" "}
                    · {70}m
                  </TextBody>
                  <TextBody color="MainText">{item.location}</TextBody>
                </Box>
              </InnerBox>
              <Box
                css={css`
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 20px 24px;
                  border-radius: 20px;
                  margin: 15px 0px;
                `}
                bgcolor={myTheme.palette.MainBackground.main}
              >
                <TextBodyLarge color="MainText">10분당</TextBodyLarge>
                <TextHeader2 color="PrimaryBrand">
                  {item.unitPrice}원
                </TextHeader2>
              </Box>
            </InBox>
          </FullBox>
          <FullBox>
            <Box
              css={css`
                height: 10px;
                margin: 15px 0px;
              `}
              bgcolor={myTheme.palette.MainBackground.main}
            ></Box>
          </FullBox>
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
                    color={myTheme.palette.SubText.main}
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
                    <TextBold color="PrimaryBrand">{storeState}</TextBold>
                    <TextBody color="MainText"> · {storeCloseReason}</TextBody>
                    <Box
                      color={myTheme.palette.SubText.main}
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
                        color={today().day === 1 ? "PrimaryBrand" : "MainText"}
                      >
                        월요일
                        {timeForText(
                          item.businessTime.monopen,
                          item.businessTime.monclose,
                          item.businessTime.monbreak
                        )}
                      </TextBody>
                      <TextBody
                        color={today().day === 2 ? "PrimaryBrand" : "MainText"}
                      >
                        화요일
                        {timeForText(
                          item.businessTime.tueopen,
                          item.businessTime.tueclose,
                          item.businessTime.tuebreak
                        )}
                      </TextBody>
                      <TextBody
                        color={today().day === 3 ? "PrimaryBrand" : "MainText"}
                      >
                        수요일
                        {timeForText(
                          item.businessTime.wedopen,
                          item.businessTime.wedclose,
                          item.businessTime.wedbreak
                        )}
                      </TextBody>
                      <TextBody
                        color={today().day === 4 ? "PrimaryBrand" : "MainText"}
                      >
                        목요일
                        {timeForText(
                          item.businessTime.thuopen,
                          item.businessTime.thuclose,
                          item.businessTime.thubreak
                        )}
                      </TextBody>
                      <TextBody
                        color={today().day === 5 ? "PrimaryBrand" : "MainText"}
                      >
                        금요일
                        {timeForText(
                          item.businessTime.friopen,
                          item.businessTime.friclose,
                          item.businessTime.fribreak
                        )}
                      </TextBody>
                      <TextBody
                        color={today().day === 6 ? "PrimaryBrand" : "MainText"}
                      >
                        토요일
                        {timeForText(
                          item.businessTime.satopen,
                          item.businessTime.satclose,
                          item.businessTime.satbreak
                        )}
                      </TextBody>
                      <TextBody
                        color={today().day === 0 ? "PrimaryBrand" : "MainText"}
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
                    color={myTheme.palette.SubText.main}
                    size={innerBoxIconSize}
                  />
                }
              >
                <TextBody color="MainText">{item.storeCall}</TextBody>
              </InnerBox>
              <InnerBox
                w={innerBoxWidth}
                text={
                  <FaInstagram
                    color={myTheme.palette.SubText.main}
                    size={innerBoxIconSize}
                  />
                }
              >
                <TextBody color="MainText">{item.insta}</TextBody>
              </InnerBox>
            </InBox>
          </FullBox>
        </FullBox>

        {/* StartButton */}
        <Dialog
          open={isStart}
          onClose={() => {
            setIsStart(false);
          }}
        >
          <Button
            onClick={() => {
              setIsStart(false);
            }}
          >
            취소
          </Button>
          <Button onClick={nextBtnClick}>시작</Button>
        </Dialog>
        <FullBox
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InBox>
            <Box
              component={Button}
              css={css`
                width: 100%;
                height: 60px;
                margin: 30px 0px;
                border-radius: 15px;
                /* background-color: skyblue; */
              `}
              disabled={storeState === "사용가능" ? false : true}
              bgcolor={
                storeState === "사용가능"
                  ? myTheme.palette.PrimaryBrand.main
                  : myTheme.palette.SubText.main
              }
              onClick={() => {
                setIsStart(true);
              }}
            >
              <TextBtnText color="InfoLight">{nextButtonText}</TextBtnText>
            </Box>
          </InBox>
        </FullBox>
      </FullBox>
    </Page>
  );
};

export default StoreDetail;
