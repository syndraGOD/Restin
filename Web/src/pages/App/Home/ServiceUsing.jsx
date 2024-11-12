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
import { Box, Button, Dialog } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import theme from "../../../style/theme";
import { PiWifiHighBold } from "react-icons/pi";
import manImage from "@assets/icons/Icon-ToiletMan-36px-ICE.png";
import womanImage from "@assets/icons/Icon-ToiletWoman-36px-HOT.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restinAPI } from "../../../api/config";
import { setuserData } from "../../../store/modules/userSlice";

const ServiceUsing = () => {
  const userData = useSelector((state) => state.userR.userData);
  const dispatch = useDispatch();
  const location = useLocation();
  const { item } = location.state || {};
  const storeData = item;
  const myTheme = useTheme();
  const navi = useNavigate();
  // console.log(item);
  const [manDialogOpen, setManDialogOpen] = useState(false);
  const [womanDialogOpen, setWomanDialogOpen] = useState(false);
  const [useDurationTime, setuseDurationTime] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const usageEndClick = async () => {
    try {
      const res = await fetch(`${restinAPI}/user/usage/stop`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + userData.security?.auth_token,
        },
        body: JSON.stringify({
          userData,
        }),
      });
      if (res.status === 200) {
        const awaitRES = await res.json();
        const resUserData = awaitRES.data;
        dispatch(setuserData(resUserData));
        navi("/purchase/payment", { state: { item } });
      } else {
        setIsEnd(false);
        const awaitRES = await res.json();
        console.log("이용시작 실패", awaitRES.message);
      }
    } catch (error) {
      setIsEnd(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const fbDate = userData.usage.startTime;
    let durationMillisec, durationSec, durationMin;

    const duration = () => {
      const now = new Date();
      durationMillisec =
        now.getTime() - (fbDate.seconds * 1000 + fbDate.nanoseconds / 1e6);

      durationSec = Math.floor(durationMillisec / 1000);
      durationMin = Math.floor(durationMillisec / 1000 / 60);
    };
    const reloadDurationTime = () => {
      duration();
      setuseDurationTime(durationMin);
    };
    duration();
    setuseDurationTime(durationMin);

    setInterval(reloadDurationTime, 1000);
  }, []);
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
            {item.name}
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
                {useDurationTime > 60
                  ? `${Math.floor(useDurationTime / 60)}시간`
                  : ``}
                {`${useDurationTime % 60 < 0 ? "0" : useDurationTime % 60}`}분
              </TextBodyLarge>
              <TextBold color="MainText">사용 시간</TextBold>
            </Box>
            <Box width={"50%"}>
              <TextBodyLarge sx={{ fontWeight: "bold" }} color="InfoDark">
                {storeData.unitPrice * (1 + Math.floor(useDurationTime / 10))}원
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
            onClick={() => {
              setIsEnd(true);
            }}
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
          <Dialog
            open={isEnd}
            onClose={() => {
              setIsEnd(false);
            }}
            css={css`
              .MuiDialog-paper {
                width: 280px;
                height: 275px;
                border-radius: 15px;
                background-color: white;
                text-align: center;
                display: flex;
                /* justify-content: center; */
                align-items: center;
              }
            `}
          >
            <Box
              sx={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                flex: 1,
                marginBottom: "10px",
              }}
            >
              <TextHeader3 color="Gray.700" sx={{ fontWeight: 700 }}>
                종료할까요?
              </TextHeader3>
              <TextBody color="Gray.900">
                종료 시 자리 청소를 위해
                <br />
                사장님께 종료 알림을 보내드려요
              </TextBody>
            </Box>
            <Box className="divJCC" sx={{ marginBottom: "9px" }}>
              <Box>
                <Button
                  sx={{
                    marginRight: "8px",
                    width: "127px",
                    height: "50px",
                    bgcolor: "SubText.main",
                    borderRadius: "14px",
                  }}
                  onClick={() => {
                    setIsEnd(false);
                  }}
                >
                  <TextBodyLarge
                    color="InfoLight.main"
                    sx={{ fontWeight: 700 }}
                  >
                    취소
                  </TextBodyLarge>
                </Button>
                <Button
                  sx={{
                    width: "127px",
                    height: "50px",
                    bgcolor: "PrimaryBrand.main",
                    borderRadius: "14px",
                  }}
                  onClick={usageEndClick}
                >
                  <TextBodyLarge
                    color="InfoLight.main"
                    sx={{ fontWeight: 700 }}
                  >
                    종료
                  </TextBodyLarge>
                </Button>
              </Box>
            </Box>
          </Dialog>
        </InBox>
      </FullBox>
    </Page>
  );
};

export default ServiceUsing;
