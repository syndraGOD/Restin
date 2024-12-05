import { Box, useTheme } from "@mui/system";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import FullBox from "./FullBox";
import { RiHome2Line } from "react-icons/ri";
import { IoCardOutline, IoPersonCircleOutline } from "react-icons/io5";
import {
  TextBody,
  TextBodyLarge,
  TextBodySmall,
  TextHeader3,
  TextHeader4,
} from "../designGuide";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getImg } from "../../api/fsImgDown";
import { IoIosArrowUp } from "react-icons/io";
import theme from "../../style/theme";
//@ts-check
/**@param select 네비게이션 선택*/
/**@param {"home"|"purchase"|"info"|null} select*/
const Navigation = ({ select }) => {
  const navi = useNavigate();
  const myTheme = useTheme();
  const userData = useSelector((state) => state.userR.userData);
  const storeData = useSelector((state) => state.storeR.storeData);
  const [storeImage, setstoreImage] = useState();
  // const [useStoreData, setUseStoreData] = useState();
  const now = new Date();

  const fbDate = userData.usage.startTime || { seconds: 0, nanoseconds: 0 };
  const [useDurationTime, setuseDurationTime] = useState(
    Math.floor(
      (now.getTime() - (fbDate.seconds * 1000 + fbDate.nanoseconds / 1e6)) /
        1000 /
        60
    )
  );
  // const [useStoreData, setuseStoreData] = useState();

  const useStoreData = storeData.find(
    (store) => store.UUID === userData?.usage.storeUUID
  );
  useEffect(() => {
    const isUsage = async () => {
      if (userData?.usage?.startTime) {
        const fbDate = userData.usage.startTime;
        // const ref = `StoreImage/store(${userData.usage.storeId})/img1.png`;
        // const res = await getImg(ref);
        // setstoreImage(res);
        // const image = storeData.find(
        //   (store) => store.UUID === userData.usage.storeUUID
        // ).imgURL[0];
        // setstoreImage(image);

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

        // console.log(useStoreData);

        reloadDurationTime();
        setInterval(reloadDurationTime, 1000);
      }
    };
    isUsage();
  }, []);
  return (
    <Box>
      {userData?.usage?.startTime && useStoreData ? (
        <Box
          sx={{
            backgroundColor: "Gray.c900",
            borderRadius: "20px 20px 0 0",
            height: "80px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "White.main",
            padding: "16px 24px",
            boxSizing: "border-box",
          }}
        >
          <Box display="flex" marginLeft={"7px"} height="100%">
            {/* <img
              src={storeImage}
              width={46}
              css={css`
                border-radius: 50%;
                margin-right: 16px;
              `}
            ></img> */}
            <Box
              textAlign="start"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="100%"
            >
              <Box>
                <TextBodySmall color="Gray" weight="Reguler">
                  이용중
                </TextBodySmall>
              </Box>
              <Box>
                <TextBodyLarge sx={{ fontWeight: 700 }}>
                  {useStoreData?.name}
                </TextBodyLarge>
              </Box>
            </Box>
          </Box>
          <Box
            textAlign="start"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
          >
            <TextBodySmall color="Gray" weight="Reguler">
              이용 요금
            </TextBodySmall>
            {useDurationTime !== 0 ? (
              <Box display="flex" alignItems="center">
                <TextHeader4 weight="Bold" color="White.main">
                  {Math.floor(useDurationTime / 60)}시간 {useDurationTime % 60}
                  분
                </TextHeader4>
                <TextBody color="Gray.c300">
                  {"  "}|{"  "}
                </TextBody>

                <TextHeader4 weight="Bold" color="White.main">
                  {useStoreData?.unitPrice *
                    (1 + Math.floor(useDurationTime / 10))}
                  원
                </TextHeader4>
              </Box>
            ) : (
              " "
            )}
          </Box>
          <Box
            height="100%"
            display="flex"
            alignItems="start"
            onClick={() => {
              navi("/app/using", {
                state: {
                  item: storeData.find(
                    (store) => store.UUID === userData.usage.storeUUID
                  ),
                },
              });
            }}
          >
            <IoIosArrowUp
              size={"22px"}
              color={theme.palette.Gray.c300}
              // css={css`
              //   align-self: start;
              // `}
            />
          </Box>
        </Box>
      ) : null}

      <FullBox
        sx={{
          // width: "100vw",
          height: "80px",
          flexDirection: "row",
          overflowY: "hidden",
          borderRadius: "15px 15px 0 0",
          backgroundColor: "white",
        }}
        className="Navigation divJCC"
      >
        {/* home */}
        <Box
          sx={{ flex: 1, height: "100%", alignContent: "center" }}
          component={RouterLink}
          to="/app/home"
        >
          <Box sx={{ alignItems: "center", marginBottom: "5px" }}>
            <RiHome2Line
              size={"20px"}
              color={
                select !== "home"
                  ? myTheme.palette.Gray.c400
                  : myTheme.palette.Black.main
              }
            />
          </Box>
          <Box>
            <TextBodySmall
              sx={{
                textDecoration: "none",
              }}
              color={
                select !== "home"
                  ? myTheme.palette.Gray.c400
                  : myTheme.palette.Black.main
              }
            >
              홈
            </TextBodySmall>
          </Box>
        </Box>
        {/* purchase */}
        <Box
          sx={{ flex: 1, height: "100%", alignContent: "center" }}
          component={RouterLink}
          to="/purchase/listLog"
        >
          <Box sx={{ alignItems: "center", marginBottom: "5px" }}>
            <IoCardOutline
              size={"20px"}
              color={
                select !== "purchase"
                  ? myTheme.palette.Gray.c400
                  : myTheme.palette.Black.main
              }
            />
          </Box>
          <Box>
            <TextBodySmall
              color={
                select !== "purchase"
                  ? myTheme.palette.Gray.c400
                  : myTheme.palette.Black.main
              }
            >
              이용 내역
            </TextBodySmall>
          </Box>
        </Box>
        {/* info */}
        <Box
          sx={{ flex: 1, height: "100%", alignContent: "center" }}
          component={RouterLink}
          to="/myInfo/home"
        >
          <Box sx={{ alignItems: "center", marginBottom: "5px" }}>
            <IoPersonCircleOutline
              size={"20px"}
              color={
                select !== "info"
                  ? myTheme.palette.Gray.c400
                  : myTheme.palette.Black.main
              }
            />
          </Box>
          <Box>
            <TextBodySmall
              color={
                select !== "info"
                  ? myTheme.palette.Gray.c400
                  : myTheme.palette.Black.main
              }
            >
              내 정보
            </TextBodySmall>
          </Box>
        </Box>
      </FullBox>
    </Box>
  );
};

export default Navigation;
