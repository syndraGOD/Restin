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
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import theme from "../../../style/theme";
import { PiWifiHighBold } from "react-icons/pi";
import manImage from "@assets/icons/Icon-ToiletMan-36px-ICE.png";
import womanImage from "@assets/icons/Icon-ToiletWoman-36px-HOT.png";
import { useState } from "react";

const ServiceUsing = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const myTheme = useTheme();
  // console.log(item);
  const [manDialogOpen, setManDialogOpen] = useState(false);
  const [womanDialogOpen, setWomanDialogOpen] = useState(false);
  return (
    // after select cafe, show cafe's detail info
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
      {/* background Image & blur */}
      <Box className="BackgroundImageBlur">
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
      </Box>
      {/* Header& h1 사용 중 */}
      <FullBox className="Header1 center">
        <InBox sx={{ textAlign: "center" }}>
          <TextHeader3 color="InfoLight" sx={{ padding: "15px" }}>
            사용 중
          </TextHeader3>
        </InBox>
      </FullBox>
      {/* Header& h2 Name */}
      <FullBox className="Header2 center">
        <InBox>
          <TextHeader2 color="InfoLight" sx={{ padding: "0px 0px 30px 0px" }}>
            다솜 카페
          </TextHeader2>
        </InBox>
      </FullBox>
      {/* Wifi & Toilet */}
      <FullBox
        className="contents1 wifibox center"
        css={css`
          height: 20%;
        `}
      >
        <InBox sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
          {/* wifi */}
          <Box
            className="wifi innerBox"
            css={css`
              flex: 1;
              width: 50%;
              height: 100%;
              margin-right: 5px;
              flex-direction: column;
            `}
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
          {/* toilet */}
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
            {/* man */}
            <Box
              sx={{ flex: 1, marginBottom: "5px" }}
              className="innerBox"
              onClick={() => {
                setManDialogOpen(true);
              }}
            >
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
            <Dialog
              open={manDialogOpen}
              onClose={() => {
                setManDialogOpen(false);
              }}
              css={css`
                .MuiDialog-paper {
                  border-radius: 30px;
                }
              `}
            >
              <Box
                css={css`
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  width: 60vw;
                  height: 45vw;
                `}
              >
                <Box>
                  <Box
                    css={css`
                      width: 44px;
                      height: 44px;
                      background-color: ${theme.palette.SecondaryBrand_Back
                        .main};
                      border-radius: 50%;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      margin: 15px;
                    `}
                  >
                    <img src={manImage}></img>
                  </Box>
                </Box>
                <Box>
                  <TextBold
                    color="InfoDark"
                    sx={{
                      marginRight: "12px",
                      margin: "5px",
                    }}
                  >
                    {item.toiletManLocation}
                  </TextBold>
                  <TextBold color="MainText">{item.toiletManPw}</TextBold>
                </Box>
              </Box>
            </Dialog>
            {/* woman */}
            <Box
              sx={{ flex: 1, marginTop: "5px" }}
              className="innerBox"
              onClick={() => {
                setWomanDialogOpen(true);
              }}
            >
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
            <Dialog
              open={womanDialogOpen}
              onClose={() => {
                setWomanDialogOpen(false);
              }}
              css={css`
                .MuiDialog-paper {
                  border-radius: 30px;
                }
              `}
            >
              <Box
                css={css`
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  width: 60vw;
                  height: 45vw;
                `}
              >
                <Box>
                  <Box
                    css={css`
                      width: 44px;
                      height: 44px;
                      background-color: ${theme.palette.PrimaryBrand_Back.main};
                      border-radius: 50%;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      margin: 15px;
                    `}
                  >
                    <img src={womanImage}></img>
                  </Box>
                </Box>
                <Box>
                  <TextBold
                    color="InfoDark"
                    sx={{
                      textWrap: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      marginRight: "12px",
                      margin: "5px",
                    }}
                  >
                    {item.toiletWomanLocation}
                  </TextBold>
                  <TextBold color="MainText">{item.toiletWomanPw}</TextBold>
                </Box>
              </Box>
            </Dialog>
          </Box>
        </InBox>
      </FullBox>
      {/* takewater */}
      <FullBox className="contents2 takewater center">
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
      {/* useTime &  charged pay*/}
      <FullBox className="contents3 usetime center">
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
      {/* end button */}
      <FullBox className="endbutton center">
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
