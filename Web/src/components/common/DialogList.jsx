/** @jsxImportSource @emotion/react */
import PropTypes, { any } from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Dialog from "@mui/material/Dialog";
import { TextBody, TextBodyLarge, TextHeader3 } from "../designGuide";
import { css } from "@emotion/react";

// const data = ["username@gmail.com", "user02@gmail.com"];

export const DialogList = (props) => {
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

DialogList.propTypes = {
  data: any,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
