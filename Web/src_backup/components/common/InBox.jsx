import { Box, styled } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// export const InBox = styled(Box)`
//   width: 88vw;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
export const InBox = ({ children, className, ...args }) => {
  return (
    <Box
      className={className ? className + " InBox" : "InBox"}
      css={css`
        width: 88vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
      {...args}
    >
      {children}
    </Box>
  );
};

export default InBox;
