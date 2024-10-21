import { Box, Button, css } from "@mui/material";
import React from "react";
import TestImage from "@assets/images/Test1.png";
import { TextBody, TextHeader2, TextHeader3 } from "../designGuide";
import InBox from "../common/InBox";
import { Link, useNavigate } from "react-router-dom";
const StoreItem = ({ item, userDistance, onClick }) => {
  const { id, imgURL, name, unitPrice } = item;
  const navigate = useNavigate();
  const onClickStore = () => {
    // console.log(item);
    navigate("store", { state: { item } });
  };
  return (
    <Box className="StoreItem">
      {/* ImageBox */}
      <Box
        component={Button}
        onClick={onClickStore}
        sx={{
          width: "100%",
          height: "327px",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5%",
          overflow: "hidden",
          backgroundImage: `url(${imgURL ? imgURL[0] : TestImage})`,
          backgroundSize: "100% 100%",
          marginBottom: "5px",
        }}
      >
        {/* <img
          // src={imgURL ? imgURL[0] : TestImage}
          alt="CafeDefaultImage"
          width={327}
          height={327}
        /> */}
      </Box>
      {/* TextBox */}
      <Box
        className="TextBox divJCC"
        sx={{ flexDirection: "row", marginBottom: "20px" }}
      >
        <Box
          className="LeftBox divJCC"
          sx={{ flexDirection: "column", width: "50%", alignItems: "start" }}
        >
          <TextHeader3 color="InfoDark">{name}</TextHeader3>
          <TextBody color="MainText">
            (내 위치 기준) {userDistance ? userDistance : "00"}m
          </TextBody>
        </Box>
        <Box
          className="RightBox divJCC"
          sx={{
            alignItems: "end",
            flexDirection: "row",
            verticalAlign: "center",
            width: "50%",
            justifyContent: "end",
          }}
        >
          <TextHeader2>{unitPrice}원 </TextHeader2>
          <TextHeader3 color="MainText">/10분</TextHeader3>
        </Box>
      </Box>
    </Box>
  );
};

export default StoreItem;
