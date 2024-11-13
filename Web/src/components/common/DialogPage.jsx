import { Box, Dialog } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AiOutlineClose } from "react-icons/ai";
const DialogPage = ({ state, onClose, h2, children }) => {
  return (
    <Dialog
      open={state}
      onClose={onClose}
      css={css`
        .MuiDialog-root {
          width: 100vw;
          max-width: 100vw;
          overflow-x: hidden;
        }
        .MuiDialog-paper {
          /* top: 0; */
          /* position: absolute; */
          /* overflow-x: hidden; */
          min-height: 100%;
          margin: 0;
          width: 100%;
          max-width: 100vw;
          border-radius: 0px;
          /* border-radius: 15px; */
          background-color: white;
          text-align: start;
          /* letter-spacing: 0.1em; */
          /* line-height: 1.6em; */
          /* word-spacing: 2px; */
          /* text-align: center; */
          /* display: flex; */
          /* justify-content: center; */
          /* align-items: center; */
          /* h2 {
            font-size: 36px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 65px;
          } */
          .notion-page-icon-hero {
            /* display: block; */
            /* width: 100%; */
            left: 15vw;
          }
          .notion-page {
            a {
              display: none;
            }
          }
        }
        .close_dialogpage {
          position: fixed;
          top: 0;
          right: 0;
          margin-top: 6vw;
          margin-right: 6vw;
          padding-top: 0;
          font-size: 36px;
          color: white;
        }
      `}
    >
      <Box
        css={css`
          width: 100%;
          /* margin: 10vw 0; */
        `}
      >
        {h2 === "" ? "" : <h2>{h2}</h2>}

        {children}
      </Box>
      <Box className="close_dialogpage" onClick={onClose}>
        <AiOutlineClose />
      </Box>
    </Dialog>
  );
};

export default DialogPage;
