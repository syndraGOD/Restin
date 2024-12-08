import { Box, Button } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import theme from "../../style/theme";
import { TextBodyLarge, TextHeader2 } from "../designGuide";
import InBox from "./InBox";

export const DefaultBtn = ({ fixed = false, children, ...args }) => {
  return (
    <InBox
      sx={{
        // width: "1",
        height: "60px",
        position: "relative",
        justifySelf: "center",
      }}
    >
      <Button
        css={css`
          width: inherit;
          height: inherit;
          max-width: inherit;
          // box-sizing: border-box;
          margin-bottom: 4vw;
          position: ${fixed ? "fixed" : "static"};
          bottom: ${fixed ? "0" : ""};
          // left: 0;

          border-radius: 16px;
          color: ${theme.palette.White.main};
          background-color: ${theme.palette.PrimaryBrand.main};
          &.Mui-disabled {
            background-color: ${theme.palette.Gray.c400};
            color: ${theme.palette.Black.main};
          }
        `}
        {...args}
      >
        <TextBodyLarge weight="Bold">{children}</TextBodyLarge>
      </Button>
    </InBox>
  );
};
