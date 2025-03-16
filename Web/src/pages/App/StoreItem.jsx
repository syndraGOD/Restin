import { Box, Button, css } from "@mui/material";
import React from "react";
import TestImage from "@assets/images/Test1.png";
import {
  TextBody,
  TextBodyLarge,
  TextHeader2,
  TextHeader3,
} from "../../components/designGuide";
import InBox from "../../components/common/InBox";
import { Link, useNavigate } from "react-router-dom";
import theme from "../../style/theme";
import { IoLocationSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

const StoreItem = ({ item, userDistance, onClick }) => {
  const filter = useSelector((state) => state.filterR.filter);
  const { id, imgURL, name, unitPrice } = item;
  const navi = useNavigate();
  const onClickStore = () => {
    navi(`/app/store?UUID=${item.UUID}`);
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

  return (
    <Box className="StoreItem" marginBottom={3}>
      <Box
        // component={Button}
        onClick={onClickStore}
        sx={{
          width: "100%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          backgroundImage: `url("${imgURL[0]}")`,
          position: "relative",
          border: `1px solid ${theme.palette.Gray.c200}`,
          //이미지 백그라운드 radius 하면, radius 부분에 1프레임정도 버그가 있어, 밑에 4개 추가
          boxSizing: "border-box",
          borderRadius: "20px",
          backgroundSize: "100% 307px",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          className="TextBox"
          sx={{
            display: "flex",
            alignContent: "center",
            textAlign: "center",

            flexDirection: "row",
            backgroundColor: "White.main",
            height: "96px",
            width: "100%",
            position: "absolute",
            bottom: 0,
            boxSizing: "border-box",
            padding: 2,
            paddingBottom: 3,
            justifyContent: "space-between",
            // borderRadius: "0 0 20px 20px",
          }}
        >
          <Box
            className="LeftBox"
            sx={{
              display: "flex",
              alignContent: "center",
              textAlign: "center",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            <TextHeader3 weight="Bold" color="Gray.c900" alignItems={"center"}>
              {name}
            </TextHeader3>
            {/* 1자리 남았어요 */}
            <Box display={"flex"} alignItems={"center"} color="Gray.c600">
              <IoLocationSharp />
              {/* <TextBody textOverflow={"ellipsis"}> */}
              <TextBody>
                {" "}
                {minDistanceStation !== null ? (
                  <>
                    {minDistanceStation}역 {minDistanceWayOut}번 출구{" "}
                    {minDistanceTime}분
                  </>
                ) : (
                  "도보 정보가 없습니다"
                )}
              </TextBody>
            </Box>
          </Box>
          <Box
            className="RightBox"
            sx={{
              display: "flex",
              alignContent: "center",
              textAlign: "center",

              alignItems: "end",
              flexDirection: "row",
              verticalAlign: "center",
              justifyContent: "end",
            }}
          >
            {unitPrice === 0 || unitPrice === "0" ? (
              <TextBodyLarge weight="Bold" color="PrimaryBrand">
                무료 공간
              </TextBodyLarge>
            ) : (
              <>
                {" "}
                <TextBodyLarge weight="Bold" color="Gray.c700">
                  {unitPrice}원{" "}
                </TextBodyLarge>
                <TextBodyLarge weight="Bold" color="PrimaryBrand">
                  /10분당
                </TextBodyLarge>
              </>
            )}
          </Box>
        </Box>
      </Box>
      {/* TextBox */}
    </Box>
  );
};

export default StoreItem;
