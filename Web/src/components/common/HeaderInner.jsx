import React from "react";
import {
  TextBody,
  TextBodyLarge,
  TextHeader2,
  TextHeader3,
} from "../designGuide";
import FullBox from "./FullBox";
import { IoIosArrowBack } from "react-icons/io";
import theme from "../../style/theme";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InBox from "./InBox";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const HeaderInner = ({
  fixed = false,
  backArrow = true,
  backTo = -1,
  bgColor,
  onClise,
  position,
  children,
  ...props
}) => {
  const navi = useNavigate();
  return (
    <Box
      sx={{
        // width: "100vw",
        height: "50px",
        minHeight: "50px", // IOS에서 height이 안먹힘
        position: "relative",
        justifySelf: "center",
        // backgroundColor: "red",
        backgroundColor: "transparent",
      }}
    >
      <FullBox
        sx={{
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
        position={fixed ? "fixed" : "relative"}
        top={0}
        left={0}
        zIndex={2}
        backgroundColor={bgColor ? bgColor : "White.main"}
        height="inherit"
        {...props}
      >
        {backArrow ? (
          <Box
            onClick={() => {
              navi(backTo);
            }}
            sx={{
              position: "absolute",
              height: "100%",
              display: "flex",
              alignItems: "center",
              left: "5vw",
            }}
          >
            <IoIosArrowBack size={"22px"} color={theme.palette.Gray.c900} />
          </Box>
        ) : null}
        <TextBodyLarge
          sx={{ margin: "5px 0", alignItems: "center" }}
          color="Gray.c900"
          weight="Bold"
        >
          {typeof children === "string" ? children : null}
        </TextBodyLarge>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {typeof children !== "string" ? children : null}
        </Box>
      </FullBox>
    </Box>
  );
};

export default HeaderInner;
