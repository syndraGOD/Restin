/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Dialog from "@mui/material/Dialog";
import { TextBody, TextBodyLarge, TextHeader3 } from "../designGuide";
import { Box, Button } from "@mui/material";
import theme from "../../style/theme";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { DefaultBtn } from "./Btns";

export const DialogAlert = ({ open, h2, children }) => {
  const navi = useNavigate();
  const location = useLocation();
  const onClose = () => {
    navi(-1);
  };
  return (
    <Dialog
      open={location.hash === `#${open}`}
      onClose={onClose}
      css={css`
        .MuiDialog-paper {
          width: 60%;
          min-height: 200px;
          border-radius: 15px;
          background-color: white;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}
    >
      <TextHeader3 weight="Bold">{h2}</TextHeader3>
      <TextBodyLarge>{children}</TextBodyLarge>
      {/* <DefaultBtn onClick={onClose}>확인</DefaultBtn> */}
    </Dialog>
  );
};

export const DialogPage = ({ open, h2, children }) => {
  const navi = useNavigate();
  const onClose = () => {
    navi(-1);
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      css={css`
        .MuiDialog-root {
          width: 100vw;
          max-width: 100vw;
          overflow-x: hidden;
        }
        .MuiDialog-paper {
          min-height: 100%;
          margin: 0;
          width: 100%;
          max-width: 100vw;
          border-radius: 0px;
          /* border-radius: 15px; */
          background-color: white;
          text-align: start;
          .notion-page-icon-hero {
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
export const DialogOK = ({
  open,
  isok,
  isoktext = "확인",
  iscanceltext = "취소",
  h2,
  text,
  children,
}) => {
  const navi = useNavigate();
  const location = useLocation();
  const onClose = () => {
    navi(-1);
  };

  return (
    <>
      {/* {location.hash === "#dialog" ? ( */}
      <Dialog
        open={location.hash === `#${open}`}
        onClose={onClose}
        css={css`
          .MuiDialog-paper {
            width: 280px;
            min-height: 200px;
            border-radius: 15px;
            background-color: white;
            text-align: center;
            display: flex;
            /* justify-content: center; */
            align-items: center;
          }
        `}
      >
        {/* <Test onClose={onClose}> */}
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            flex: 1,
          }}
        >
          <TextHeader3 padding="16px 0" color="Gray.c900" weight="Bold">
            {h2}
          </TextHeader3>
          <TextBodyLarge padding="0 0 15px 0" color="Gray.c900">
            {text}
          </TextBodyLarge>
          {children}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
            textAlign: "center",
            marginBottom: "9px",
            marginTop: "12px",
          }}
        >
          <Box>
            <Button
              sx={{
                marginRight: "8px",
                width: "127px",
                height: "56px",
                bgcolor: "White.main",
                borderRadius: "14px",
                border: `1px solid ${theme.palette.Gray.c400}`,

                // borderColor: "Gray.c400",
              }}
              // border={`1px soild ${theme.palette.Gray.c400}`}
              onClick={onClose}
            >
              <TextBodyLarge color="Gray.c800" weight="Bold">
                취소
              </TextBodyLarge>
            </Button>
            <Button
              sx={{
                width: "127px",
                height: "56px",
                bgcolor: "PrimaryBrand.main",
                borderRadius: "14px",
              }}
              onClick={isok}
            >
              <TextBodyLarge color="White.main" weight="Bold">
                {isoktext}
              </TextBodyLarge>
            </Button>
          </Box>
        </Box>
        {/* </Test> */}
      </Dialog>
      {/* ) : null} */}
    </>
  );
};

export const DialogInfoSimple = ({ open, children }) => {
  const navi = useNavigate();
  const location = useLocation();
  const onClose = () => {
    navi(-1);
  };
  return (
    <Dialog
      open={location.hash === `#${open}`}
      onClose={onClose}
      css={css`
        .MuiDialog-paper {
          border-radius: 30px;
        }
      `}
    >
      <Box
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          width: 60vw;
          height: 45vw;
          background-color: ${theme.palette.Gray.c200};
        `}
      >
        {children}
      </Box>
    </Dialog>
  );
};

export const DialogList = (props) => {
  const navi = useNavigate();
  // const onClose = () => {
  //   navi(-1);
  // };
  const { data, title, onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      css={css`
        .MuiDialog-paper {
          display: flex;
          justify-content: start;
          text-align: start;
          width: 75vw;
          max-width: 75vw;
          min-height: 215px;
          padding: 7% 10% 4.5% 7%;
          box-sizing: border-box;
          border-radius: 14px;
          .MuiButtonBase-root {
            display: flex;
            justify-content: start;
          }
          p {
            text-align: start;
            display: inline;
            /* border-bottom: 1px solid #e0e0e0; */
          }
        }
      `}
    >
      <TextHeader3 weight="Bold">{title}</TextHeader3>
      <List sx={{ pt: "20px", pl: 0 }}>
        {data.map((value) => (
          <ListItem
            disableGutters
            key={value}
            css={css`
              padding: 6px 0px;
            `}
          >
            <ListItemButton
              sx={{ p: 0 }}
              onClick={() => handleListItemClick(value.key)}
            >
              <TextBodyLarge weight="Medium">{value}</TextBodyLarge>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
