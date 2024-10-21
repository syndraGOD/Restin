/** @jsxImportSource @emotion/react */
import { useLocation } from "react-router-dom";
import FullBox from "../../../components/common/FullBox";
import Test1 from "@assets/images/Test1.png";
import Test2 from "@assets/images/Test2.png";
import Test3 from "@assets/images/Test3.png";
import Test4 from "@assets/images/Test4.png";
import Test5 from "@assets/images/Test5.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { css } from "@emotion/react";
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
import { Box, Button } from "@mui/material";
import InnerBox from "../../../components/common/InnerBox";
import { FaRegClock } from "react-icons/fa";
import { BiPhoneCall } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import BtnDefault from "../../../components/BtnDefault";
const StoreDetail = () => {
  const innerBoxIconSize = "18px";
  const innerBoxWidth = "26px";
  const myTheme = useTheme();
  const location = useLocation();
  const { item } = location.state || {};
  const innerSize = "12px";
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    useCSS: true,
  };
  // console.log(location);
  console.log(item);
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
            <div>
              <img src={Test1} alt="" width={"100%"} />
            </div>
            <div>
              <img src={Test2} alt="" width={"100%"} />
            </div>
            <div>
              <img src={Test3} alt="" width={"100%"} />
            </div>
            <div>
              <img src={Test4} alt="" width={"100%"} />
            </div>
            <div>
              <img src={Test5} alt="" width={"100%"} />
            </div>
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
                다솜 카페
              </TextHeader2>
              <InnerBox
                text={
                  <GrMapLocation
                    color={myTheme.palette.SubText.main}
                    size={innerBoxIconSize}
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
                    걸어서 1분{" "}
                  </TextBold>
                  <TextBody
                    css={css`
                      display: inline-block;
                    `}
                    color="MainText"
                  >
                    · 70m
                  </TextBody>
                  <TextBody color="MainText">주소</TextBody>
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
                <TextHeader2 color="PrimaryBrand">?원</TextHeader2>
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
                  <Box>
                    <TextBold color="PrimaryBrand">영업 전</TextBold>
                    <TextBody color="MainText"> · 12:00에 영업 시작</TextBody>
                  </Box>
                  <TextBody color="MainText">월요일</TextBody>
                  <TextBody color="MainText">월요일</TextBody>
                  <TextBody color="MainText">월요일</TextBody>
                  <TextBody color="MainText">월요일</TextBody>
                  <TextBody color="MainText">월요일</TextBody>
                  <TextBody color="MainText">월요일</TextBody>
                  <TextBody color="MainText">월요일</TextBody>
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
                <TextBody color="MainText">02-1234-5678</TextBody>
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
                <TextBody color="MainText">Dassom_coffee</TextBody>
              </InnerBox>
            </InBox>
          </FullBox>
        </FullBox>
        {/* StartButton */}
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
                background: #f6912c;
                margin: 30px 0px;
                border-radius: 15px;
              `}
            >
              <TextBtnText color="InfoLight">사용 시작하기</TextBtnText>
            </Box>
          </InBox>
        </FullBox>
      </FullBox>
    </Page>
  );
};

export default StoreDetail;
