/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box, styled } from "@mui/material";

// const PageInner = styled(Box)`
//   width: 100%;
//   height: 100%;
//   justify-content: start;
//   align-items: center;
// `;
const defaultWidth = "14px";
export const InnerBox = ({ children, w, text, ...args }) => {
  const NewPage = styled(Box)``;
  return (
    <NewPage
      {...args}
      css={css`
        display: flex;
        flex-direction: row;
        align-items: start;
      `}
    >
      <Box
        className="svgBox"
        css={css`
          width: ${w ? w : defaultWidth};
          position: relative;
          /* display: inline-block; */
          svg {
            position: absolute;
            top: 0.4em;
            left: 0;
          }
        `}
      >
        {text ? text : null}
      </Box>
      {children}
    </NewPage>
  );
};
export default InnerBox;
