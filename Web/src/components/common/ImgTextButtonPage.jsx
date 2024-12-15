/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Page } from "../Page";
import InBox from "./InBox";
import { Box } from "@mui/material";
import theme from "../../style/theme";
const WelcomeStyle = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  font-size: 24px;
`;
const ImgTextButtonPage = ({ children }) => {
  const [img, text, button, ...args] = children;
  return (
    <Page
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <InBox
        css={css`
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 10vw 0;
          box-sizing: border-box;
          .contents {
            width: 100%;
          }

          .contents_img > img {
            width: 100%;
            /* height: 80vw; */
            margin-top: 20vw;
            border-radius: 20px;
          }
          .contents_p > p {
            max-height: 100px;
          }
          .contents_btn > button {
            width: 100%;
            height: 60px;
            margin-bottom: 10vw;
            border-radius: 16px;
            color: ${theme.palette.White};
            background-color: ${theme.palette.PrimaryBrand.main};
          }
        `}
      >
        <Box className="contents contents_img">{img}</Box>
        <Box
          css={css`
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center;
          `}
          className="contents contents_p"
        >
          {text}
        </Box>
        {...args}
        <Box className="contents contents_btn">{button}</Box>
      </InBox>
    </Page>
  );
};

export default ImgTextButtonPage;
