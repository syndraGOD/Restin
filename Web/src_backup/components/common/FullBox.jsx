import { Box, styled } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
export const FullBox = ({ children, className, ...args }) => {
  return (
    <Box
      className={className ? className + " FullBox" : "FullBox"}
      css={css`
        width: 100vw;
        display: flex; ///
        justify-content: center;
        align-items: center;
      `}
      {...args}
    >
      {children}
    </Box>
  );
};
export default FullBox;
