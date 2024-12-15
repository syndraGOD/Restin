/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { Page } from "../../../components/Page";
import FullBox from "../../../components/common/FullBox";
import {
  TextBody,
  TextBodyLarge,
  TextBodySmall,
  TextHeader2,
  TextHeader3,
  TextHeader4,
} from "../../../components/designGuide";
import InBox from "../../../components/common/InBox";
import { Box, Button } from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import theme from "../../../style/theme";
import { PiWifiHighBold } from "react-icons/pi";
import manImage from "@assets/icons/Icon-ToiletMan-36px-ICE.png";
import womanImage from "@assets/icons/Icon-ToiletWoman-36px-HOT.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restinAPI } from "../../../api/config";
import { setuserData } from "../../../store/modules/userSlice";
import WelcomeImage3 from "@assets/images/WelcomeImage3.png";
import { IoIosArrowBack } from "react-icons/io";
import { BiBox } from "react-icons/bi";
import { TextBox_header2 } from "../../../components/common/TextBox";
import HeaderInner from "../../../components/common/HeaderInner";
import { DefaultBtn } from "../../../components/common/Btns";
import {
  DialogInfoSimple,
  DialogOK,
} from "../../../components/common/DialogOk";

const ServiceUsing = () => {
  const auth_token = useSelector((state) => state.tokenR.verifiToken);
  const userData = useSelector((state) => state.userR.userData);
  const storeData = useSelector((state) => state.storeR.storeData);
  const dispatch = useDispatch();
  const location = useLocation();
  // const { item } = location.state || {};
  const item = storeData.filter(
    (store) => store.UUID === userData.usage.storeUUID
  )[0];
  const myTheme = useTheme();
  const navi = useNavigate();
  // console.log(item);
  const [useDurationTime, setuseDurationTime] = useState(0);
  const usageEndClick = async () => {
    try {
      const res = await fetch(`${restinAPI}/user/usage/stop`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + auth_token,
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
        navi(-1);
        const awaitRES = await res.json();
        console.log("이용종료 실패", awaitRES.message);
      }
    } catch (error) {
      navi(-1);
      console.log(error);
    }
  };

  useEffect(() => {
    const fbDate = userData.usage.startTime;
    let durationMillisec, durationSec, durationMin;

    const duration = () => {
      console.log("duration 실행");
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

    const intervalId = setInterval(reloadDurationTime, 1000);

    return () => {
      console.log("언마운트");
      clearInterval(intervalId);
    };
  }, []);
  return (
    // after select cafe, show cafe's detail info
    <Page
      css={css`
        background-color: ${theme.palette.Gray.c200};
        position: relative;
        display: flex;
        flex-direction: column;
        .center {
          display: flex;
          justify-content: center;
        }
        .innerBox {
          background-color: ${theme.palette.Gray.c100};
          border-radius: 17px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}
    >
      {/* background Image & blur */}
      {/* <Box className="BackgroundImageBlur">
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
      </Box> */}
      {/* Header& h1 사용 중 */}
      <HeaderInner bgColor="Gray.c200">사용중</HeaderInner>
      {/* <FullBox className="Header1 center">
        <Box
          component={Button}
          onClick={() => {
            navi(-1);
          }}
          sx={{ position: "absolute", lineHeight: "70px", left: "10px" }}
        >
          <IoIosArrowBack size={"40px"} color={theme.palette.White.main} />
        </Box>
        <InBox sx={{ textAlign: "center" }}>
          <TextHeader3 sx={{ padding: "15px" }}>사용 중</TextHeader3>
        </InBox>
      </FullBox> */}
      {/* Header& h2 Name */}
      <FullBox className="Header2 center">
        <InBox>
          <TextBox_header2 weight="Bold">{item.name}</TextBox_header2>
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
              justify-content: start !important;
              align-items: start !important;
              padding: 20px;
              box-sizing: border-box;
            `}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="start"
              height="30px"
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  bgcolor: "White.main",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
              >
                <PiWifiHighBold size={"16px"} color={theme.palette.Gray.c900} />
              </Box>
              <TextBodyLarge color="Gray.c900" weight="Bold">
                {"   "}와이파이
              </TextBodyLarge>
            </Box>
            <Box
              flex="1"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              justifyContent="center"
            >
              <TextBody color="Gray.c700">ID</TextBody>
              <TextBodyLarge weight="Bold">{item.wifiId}</TextBodyLarge>
            </Box>
            <Box
              flex="1"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <TextBody color="Gray.c700">FW</TextBody>
              <TextBodyLarge weight="Bold" color="Gray.c900">
                {item.wifiPw}
              </TextBodyLarge>
            </Box>
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
                navi("#manToilet");
              }}
            >
              <Box width={"32%"}>
                <Box
                  css={css`
                    width: 24px;
                    height: 24px;
                    background-color: ${theme.palette.White.main};
                    border-radius: 50%;
                    display: flex;
                    /* flex-direction: column; */
                    justify-content: center;
                    align-items: center;
                    justify-self: end;

                    margin: 2px 10px 0 0;
                  `}
                >
                  <img src={manImage} width={18}></img>
                </Box>
                {/*화장실 아이콘을 위로 올리기 위해  */}
                <TextBody> </TextBody>
              </Box>
              <Box flex={1}>
                <TextBodyLarge
                  weight="Bold"
                  color="Black.main"
                  sx={{
                    // textWrap: "nowrap",
                    // textOverflow: "ellipsis",
                    // overflow: "hidden",
                    // whiteSpace: "nowrap",
                    marginRight: "12px",
                    marginBottom: "4px",
                  }}
                >
                  남자 화장실
                </TextBodyLarge>
                <TextBody color="Gray.c700">자세히 보기</TextBody>
              </Box>
            </Box>

            {/* woman */}
            <Box
              sx={{ flex: 1, marginTop: "5px" }}
              className="innerBox"
              onClick={() => {
                navi("#womanToilet");
              }}
            >
              <Box width={"32%"}>
                <Box
                  css={css`
                    width: 24px;
                    height: 24px;
                    background-color: ${theme.palette.White.main};
                    border-radius: 50%;
                    display: flex;
                    /* flex-direction: column; */
                    justify-content: center;
                    align-items: center;
                    justify-self: end;

                    margin: 2px 10px 0 0;
                  `}
                >
                  <img src={womanImage} width={18}></img>
                </Box>
                {/*화장실 아이콘을 위로 올리기 위해  */}
                <TextBody> </TextBody>
              </Box>
              <Box flex={1}>
                <TextBodyLarge
                  weight="Bold"
                  color="Black.main"
                  sx={{
                    // textWrap: "nowrap",
                    // textOverflow: "ellipsis",
                    // overflow: "hidden",
                    // whiteSpace: "nowrap",
                    marginRight: "12px",
                    marginBottom: "4px",
                  }}
                >
                  여자 화장실
                </TextBodyLarge>
                <TextBody color="Gray.c700">자세히 보기</TextBody>
              </Box>
            </Box>
          </Box>
        </InBox>
      </FullBox>
      {/* takewater */}
      <FullBox className="contents2 takewater center">
        <InBox>
          <Box
            className="innerBox"
            sx={{
              marginTop: "7%",
              padding: "15px",
            }}
            css={css`
              justify-content: space-between !important;
              /* align-items: start; */
            `}
          >
            <Box
              css={css`
                width: 100%;
                height: 100% !important;
                display: flex;
                flex-direction: column;
                justify-content: start;
              `}
            >
              <Box display="flex" alignItems="center" marginTop="7px">
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: "White.main",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                  }}
                >
                  <TextBodyLarge weight="Bold">i</TextBodyLarge>
                </Box>
                <TextBodyLarge weight="Bold">{"  "}이용 안내</TextBodyLarge>
              </Box>
              <TextBody
                color="Gray.c800"
                sx={{ textAlign: "start", margin: "20% 0" }}
              >
                화면을 보여주고
                <br />물 한 잔을 받아주세요
              </TextBody>
            </Box>
            <img
              src={WelcomeImage3}
              width={"40%"}
              css={css`
                border-radius: 17px;
                margin: 0 0 15px 0;
              `}
            ></img>
          </Box>
        </InBox>
      </FullBox>
      {/* useTime &  charged pay*/}
      <FullBox className="contents3 usetime center">
        <InBox>
          <Box
            className="innerBox"
            width={"100%"}
            sx={{ textAlign: "center", padding: "20px 0px", marginTop: "7%" }}
          >
            <Box width={"50%"}>
              <TextBody color="Gray.c700" marginBottom="5px">
                사용 시간
              </TextBody>
              <TextHeader4 sx={{ fontWeight: "bold" }} color="Black">
                {useDurationTime > 60
                  ? `${Math.floor(useDurationTime / 60)}시간`
                  : ``}
                {`${useDurationTime % 60 < 0 ? "0" : useDurationTime % 60}`}분
              </TextHeader4>
            </Box>
            <Box width={"50%"}>
              <TextBody color="Gray.c700" marginBottom="5px">
                사용 요금
              </TextBody>
              <TextHeader4 sx={{ fontWeight: "bold" }} color="Black">
                {item.unitPrice * (1 + Math.floor(useDurationTime / 10))}원
              </TextHeader4>
            </Box>
          </Box>
        </InBox>
      </FullBox>
      {/* end button */}
      <Box className="EmptyBoxFlex1" flex={1}>
        {" "}
      </Box>
      <FullBox className="endbutton center">
        <InBox>
          <DefaultBtn
            onClick={() => {
              navi("#isEnd");
            }}
          >
            사용 종료하기
          </DefaultBtn>

          {/*Dialogs  */}
          <DialogOK
            open="isEnd"
            h2="종료할까요?"
            text={`종료 시 자리 청소를 위해\n사장님께 종료 알림을 보내드려요`}
            isok={usageEndClick}
            isoktext="사용 종료하기"
          ></DialogOK>
          <DialogInfoSimple open="manToilet">
            <Box>
              <Box
                css={css`
                  padding: 10px;
                  background-color: ${theme.palette.White.main};
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
              <TextBody
                weight="Bold"
                color="Black"
                sx={{
                  marginRight: "12px",
                  margin: "5px",
                }}
              >
                {item.toiletManLocation}
              </TextBody>
              <TextBody weight="Bold" color="Gray.c900">
                {item.toiletManPw}
              </TextBody>
            </Box>
          </DialogInfoSimple>
          <DialogInfoSimple open="womanToilet">
            <Box>
              <Box
                css={css`
                  padding: 10px;
                  background-color: ${theme.palette.White.main};
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin: 15px;
                `}
              >
                <img src={womanImage} width={40}></img>
              </Box>
            </Box>
            <Box>
              <TextBody
                weight="Bold"
                color="Black"
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
              </TextBody>
              <TextBody weight="Bold" color="Gray.c900">
                {item.toiletWomanPw}
              </TextBody>
            </Box>
          </DialogInfoSimple>
        </InBox>
      </FullBox>
    </Page>
  );
};

export default ServiceUsing;
