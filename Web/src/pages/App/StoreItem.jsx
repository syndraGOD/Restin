import { Box } from "@mui/material";
import React from "react";
import TestImage from "@assets/images/Test1.png";
import {
  TextBody,
  TextHeader2,
  TextHeader3,
} from "../../components/designGuide";
const StoreItem = ({ item, userDistance }) => {
  const { imgURL, name, unitPrice } = item;
  console.log(imgURL);
  return (
    <Box className="StoreItem">
      <img src={imgURL ? imgURL[0] : TestImage} alt="" />
      {/* TextBox */}
      <Box className="TextBox" sx={{ flexDirection: "row" }}>
        <Box className="LeftBox" sx={{ flexDirection: "column" }}>
          <TextHeader3>{name}</TextHeader3>
          <TextBody>
            (내 위치 기준) ${userDistance ? userDistance : "00"}m
          </TextBody>
        </Box>
        <Box className="RightBox" sx={{ flexDirection: "row" }}>
          <TextHeader2>${unitPrice}</TextHeader2>
          <TextHeader3>/10분</TextHeader3>
        </Box>
      </Box>
    </Box>
  );
};

export default StoreItem;
