import { Button } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import theme from "../../style/theme";
import { TextHeader2 } from "../designGuide";

export const DefaultBtn = ({ children, ...args }) => {
  return (
    <Button
      css={css`
        width: 100%;
        height: 60px;
        margin-bottom: 10vw;
        border-radius: 16px;
        color: ${theme.palette.White.main};
        background-color: ${theme.palette.PrimaryBrand.main};
        &.Mui-disabled {
          background-color: ${theme.palette.Gray.c400};
          color: ${theme.palette.White.main};
        }
      `}
      {...args}
    >
      <TextHeader2>{children}</TextHeader2>
    </Button>
  );
};
