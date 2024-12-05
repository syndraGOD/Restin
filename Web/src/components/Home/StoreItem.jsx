import { Box, Button, css } from "@mui/material";
import React from "react";
import TestImage from "@assets/images/Test1.png";
import {
  TextBody,
  TextBodyLarge,
  TextHeader2,
  TextHeader3,
} from "../designGuide";
import InBox from "../common/InBox";
import { Link, useNavigate } from "react-router-dom";
import theme from "../../style/theme";
import { IoLocationSharp } from "react-icons/io5";

const StoreItem = ({ item, userDistance, onClick }) => {
  const { id, imgURL, name, unitPrice } = item;
  const navigate = useNavigate();
  const onClickStore = () => {
    navigate(`/app/store?UUID=${item.UUID}`);
  };
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
          className="TextBox divJCC"
          sx={{
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
            className="LeftBox divJCC"
            sx={{
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
              <TextBody>수원역에서 3분 · 100m</TextBody>
            </Box>
          </Box>
          <Box
            className="RightBox divJCC"
            sx={{
              alignItems: "end",
              flexDirection: "row",
              verticalAlign: "center",
              justifyContent: "end",
            }}
          >
            <TextBodyLarge weight="Bold" color="Gray.c700">
              {unitPrice}원{" "}
            </TextBodyLarge>
            <TextBodyLarge weight="Bold" color="PrimaryBrand">
              /10분
            </TextBodyLarge>
          </Box>
        </Box>
      </Box>
      {/* TextBox */}
    </Box>
  );
};

export default StoreItem;
