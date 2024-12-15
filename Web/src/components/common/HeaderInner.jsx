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
  bgColor,
  onClise,
  position,
  children,
  ...props
}) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ height: "50px" }}>
      <FullBox
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
        position={fixed ? "fixed" : "relative"}
        top={0}
        zIndex={2}
        backgroundColor={bgColor ? bgColor : "White.main"}
        height="inherit"
        {...props}
      >
        {backArrow ? (
          <Box
            onClick={() => {
              navigate(-1);
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
