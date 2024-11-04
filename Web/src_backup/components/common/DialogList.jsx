/** @jsxImportSource @emotion/react */
import * as React from "react";
import PropTypes, { any } from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import { TextBody, TextHeader3 } from "../designGuide";
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
          justify-content: center;
          text-align: center;
          width: 60vw;
          padding: 20px 0px;
          border-radius: 25px;
          .MuiButtonBase-root {
            display: flex;
            justify-content: center;
          }
          p {
            text-align: center;
            display: inline;
            /* border-bottom: 1px solid #e0e0e0; */
          }
        }
      `}
    >
      <TextHeader3>{title}</TextHeader3>
      <List sx={{ pt: 3, textAlign: "center" }}>
        {data.map((value) => (
          <ListItem
            disableGutters
            key={value}
            css={css`
              padding: 4px 0px;
            `}
          >
            <ListItemButton onClick={() => handleListItemClick(value)}>
              <TextBody>{value}</TextBody>
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
