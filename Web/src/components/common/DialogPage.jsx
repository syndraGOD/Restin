import { Box, Dialog } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const DialogPage = ({ state, onClose, children }) => {
  return (
    <Dialog
      open={state}
      onClose={onClose}
      css={css`
        .MuiDialog-paper {
          /* top: 0; */
          /* position: absolute; */
          max-height: 100%;
          margin: 0;
          width: 100%;
          height: 2000px;
          border-radius: 0px;
          /* border-radius: 15px; */
          background-color: white;
          letter-spacing: 0.1em;
          line-height: 1.6em;
          word-spacing: 2px;
          /* text-align: center; */
          display: flex;
          /* justify-content: center; */
          align-items: center;
        }
      `}
    >
      <Box
        css={css`
          width: 75%;
          margin: 10vw 0;
        `}
      >
        {children}
      </Box>
    </Dialog>
  );
};

export default DialogPage;
