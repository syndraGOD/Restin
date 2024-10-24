/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { Page } from "../../../components/Page";
import FullBox from "../../../components/common/FullBox";
import {
  TextBody,
  TextBodyLarge,
  TextBodySmall,
  TextBold,
  TextBtnText,
  TextHeader2,
  TextHeader3,
} from "../../../components/designGuide";
import InBox from "../../../components/common/InBox";
import { Box, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import theme from "../../../style/theme";
import { PiWifiHighBold } from "react-icons/pi";
import manImage from "@assets/icons/Icon-ToiletMan-36px-ICE.png";
import womanImage from "@assets/icons/Icon-ToiletWoman-36px-HOT.png";

const ServiceUsing = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const myTheme = useTheme();
  console.log(item);
  return (
    <Page
      css={css`
        position: relative;
        .center {
          display: flex;
          justify-content: center;
        }
        .innerBox {
          background-color: ${theme.palette.InfoLight.main}BF;
          border-radius: 17px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}
    >
      <Box
        sx={{
          backgroundImage: `url("${item.imgURL[0]}")`,
          backgroundSize: "100% 100%",
        }}
        css={css`
          width: 100%;
          height: 100%;
          position: absolute;
          filter: blur(0.3em);
          z-index: -1;
        `}
      ></Box>
      <Box
        css={css`
          width: 100%;
          height: 100%;
          background-color: black;
          opacity: 50%;
          position: absolute;
          z-index: -1;
        `}
      ></Box>

      <FullBox className="center">
        <InBox sx={{ textAlign: "center" }}>
          <TextHeader3 color="InfoLight" sx={{ padding: "15px" }}>
            사용 중
          </TextHeader3>
        </InBox>
      </FullBox>
      <FullBox className="center">
        <InBox>
          <TextHeader2 color="InfoLight" sx={{ padding: "0px 0px 30px 0px" }}>
            다솜 카페
          </TextHeader2>
        </InBox>
      </FullBox>
      <FullBox
        className="center"
        css={css`
          height: 20%;
        `}
      >
        <InBox sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
          <Box
            css={css`
              flex: 1;
              width: 50%;
              height: 100%;
              margin-right: 5px;
              flex-direction: column;
            `}
            className="innerBox"
          >
            <Box
              css={css`
                width: 80px;
                height: 80px;
                background-color: ${theme.palette.InfoLight.main};
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <PiWifiHighBold
                size={"5em"}
                color={theme.palette.MainText.main}
              />
            </Box>
            <TextBold sx={{ marginTop: "10px" }}>Wifi: {item.wifiId}</TextBold>
            <TextBodySmall sx={{ fontWeight: "bold" }} color="MainText">
              Pw: {item.wifiPw}
            </TextBodySmall>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              width: "50%",
              height: "100%",
              marginLeft: "5px",
            }}
          >
            <Box sx={{ flex: 1, marginBottom: "5px" }} className="innerBox">
              <Box width={"34%"}>
                <Box
                  css={css`
                    width: 44px;
                    height: 44px;
                    background-color: ${theme.palette.SecondaryBrand_Back.main};
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0px 10px;
                  `}
                >
                  <img src={manImage}></img>
                </Box>
              </Box>
              <Box width={"66%"}>
                <TextBold
                  color="InfoDark"
                  sx={{
                    textWrap: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    marginRight: "12px",
                  }}
                >
                  {item.toiletManLocation}
                </TextBold>
                <TextBold color="MainText">{item.toiletManPw}</TextBold>
              </Box>
            </Box>

            <Box sx={{ flex: 1, marginTop: "5px" }} className="innerBox">
              <Box width={"34%"}>
                <Box
                  css={css`
                    width: 44px;
                    height: 44px;
                    background-color: ${theme.palette.PrimaryBrand_Back.main};
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0px 10px;
                  `}
                >
                  <img src={womanImage}></img>
                </Box>
              </Box>
              <Box width={"66%"}>
                <TextBold
                  color="InfoDark"
                  sx={{
                    textWrap: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    marginRight: "12px",
                  }}
                >
                  {item.toiletWomanLocation}
                </TextBold>
                <TextBold color="MainText">{item.toiletWomanPw}</TextBold>
              </Box>
            </Box>
          </Box>
        </InBox>
      </FullBox>
      <FullBox className="center">
        <InBox>
          <Box
            className="innerBox"
            sx={{ marginTop: "10px", padding: "15px", flexDirection: "column" }}
          >
            <img
              src={item.imgURL[1]}
              width={"50%"}
              css={css`
                border-radius: 17px;
              `}
            ></img>
            <TextBold
              color="MainText"
              sx={{ padding: "10px", textAlign: "center" }}
            >
              화면을 보여주고
              <br />물 한 잔을 받아주세요
            </TextBold>
          </Box>
        </InBox>
      </FullBox>
      <FullBox className="center">
        <InBox>
          <Box
            className="innerBox"
            width={"100%"}
            sx={{ textAlign: "center", padding: "15px 0px", marginTop: "10px" }}
          >
            <Box width={"50%"}>
              <TextBodyLarge sx={{ fontWeight: "bold" }} color="InfoDark">
                0시간 27분
              </TextBodyLarge>
              <TextBold color="MainText">사용 시간</TextBold>
            </Box>
            <Box width={"50%"}>
              <TextBodyLarge sx={{ fontWeight: "bold" }} color="InfoDark">
                1,500원
              </TextBodyLarge>
              <TextBold color="MainText">사용 요금</TextBold>
            </Box>
          </Box>
        </InBox>
      </FullBox>
      <FullBox className="center">
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
            // disabled={storeState === "사용가능" ? false : true}
            bgcolor={myTheme.palette.SecondaryBrand.main}
          >
            <TextBtnText color="InfoLight">사용 종료하기</TextBtnText>
          </Box>
        </InBox>
      </FullBox>
    </Page>
  );
};

export default ServiceUsing;
