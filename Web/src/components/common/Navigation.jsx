import {
  Box,
  useTheme,
} from "@mui/system"; /** @jsxImportSource @emotion/react */
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
} from "../designGuide";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getImg } from "../../api/fsImgDown";
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
  const [useDurationTime, setuseDurationTime] = useState(0);
  const [useStoreData, setuseStoreData] = useState();

  useEffect(() => {
    const fbDate = userData.usage.startTime;
    const isUsage = async () => {
      if (userData?.usage?.startTime) {
        // const ref = `StoreImage/store(${userData.usage.storeId})/img1.png`;
        // const res = await getImg(ref);
        // setstoreImage(res);
        const image = storeData.find(
          (store) => store.UUID === userData.usage.storeUUID
        ).imgURL[0];
        setstoreImage(image);

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
        setuseStoreData(
          storeData.find((store) => store.UUID === userData?.usage.storeUUID)
        );
        reloadDurationTime();
        setInterval(reloadDurationTime, 1000);
      }
    };
    isUsage();
  }, []);
  return (
    <Box>
      {userData?.usage?.startTime ? (
        <Box
          onClick={() => {
            navi("/app/using", {
              state: {
                item: storeData.find(
                  (store) => store.UUID === userData.usage.storeUUID
                ),
              },
            });
          }}
          sx={{
            backgroundColor: "InfoDark.main",
            borderRadius: "30px",
            height: "60px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "InfoLight.main",
          }}
        >
          <Box display="flex" marginLeft={"7px"}>
            <img
              src={storeImage}
              width={46}
              css={css`
                border-radius: 50%;
                margin-right: 16px;
              `}
            ></img>
            <Box>
              <Box>
                <TextBodyLarge sx={{ fontWeight: 700 }}>
                  {useStoreData?.name}
                </TextBodyLarge>
              </Box>
              <Box>
                <TextBodySmall>{useStoreData?.insta}</TextBodySmall>
              </Box>
            </Box>
          </Box>
          <Box marginRight={"24px"}>
            <TextHeader3>
              {Math.floor(useDurationTime / 60)}시간 {useDurationTime % 60}분
            </TextHeader3>
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
                  ? myTheme.palette.SubText.main
                  : myTheme.palette.InfoDark.main
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
                  ? myTheme.palette.SubText.main
                  : myTheme.palette.InfoDark.main
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
                  ? myTheme.palette.SubText.main
                  : myTheme.palette.InfoDark.main
              }
            />
          </Box>
          <Box>
            <TextBodySmall
              color={
                select !== "purchase"
                  ? myTheme.palette.SubText.main
                  : myTheme.palette.InfoDark.main
              }
            >
              결제
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
                  ? myTheme.palette.SubText.main
                  : myTheme.palette.InfoDark.main
              }
            />
          </Box>
          <Box>
            <TextBodySmall
              color={
                select !== "info"
                  ? myTheme.palette.SubText.main
                  : myTheme.palette.InfoDark.main
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
