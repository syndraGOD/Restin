/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { Box } from "@mui/material";

export const BgColorDefault = ({ bgColor = "MainBackground.main" }) => {
  return (
    <Box
      className="BackgroundImageBlur"
      sx={{
        backgroundColor: bgColor,
      }}
      css={css`
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
      `}
    />
  );
};
