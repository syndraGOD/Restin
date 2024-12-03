import React from "react";
import { TextBody, TextHeader2, TextHeader3 } from "../designGuide";
import FullBox from "./FullBox";
import { IoIosArrowBack } from "react-icons/io";
import theme from "../../style/theme";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InBox from "./InBox";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const HeaderInner = ({ position, children, ...props }) => {
  const navigate = useNavigate();
  return (
    <FullBox
      className="divJCC"
      position={position ? position : "static"}
      top={0}
      zIndex={2}
      backgroundColor="White.main"
    >
      <InBox
        css={css`
          height: 50px;
          position: relative;
          display: flex;
          align-items: center;
        `}
        {...props}
      >
        <Box
          onClick={() => {
            navigate(-1);
          }}
          sx={{
            position: "absolute",
            height: "100%",
            display: "flex",
            alignItems: "center",
            left: 0,
          }}
        >
          <IoIosArrowBack size={"22px"} color={theme.palette.Gray.c900} />
        </Box>
        <TextBody
          sx={{ margin: "5px 0", alignItems: "center" }}
          color="Gray.c900"
          weight="Bold"
        >
          {typeof children === "string" ? children : null}
        </TextBody>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {typeof children !== "string" ? children : null}
        </Box>
      </InBox>
    </FullBox>
  );
};

export default HeaderInner;
