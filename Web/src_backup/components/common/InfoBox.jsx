/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import theme from "../../style/theme";
import { Box } from "@mui/material";
import React from "react";

const InfoBox = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      className="divJCC"
      css={css`
        background-color: ${theme.palette.InfoLight.main};
        border-radius: 25px;
        padding: 14px;
        margin-top: 20px;
        button {
          display: flex;
          justify-content: space-between;
        }
        svg {
          font-size: 18px;
          color: ${theme.palette.InfoDark.main};
        }
      `}
    >
      {children}
    </Box>
  );
};

export default InfoBox;
