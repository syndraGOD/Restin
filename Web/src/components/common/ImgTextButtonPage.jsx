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
  const [img, text, button] = children;
  return (
    <Page className="divJCC">
      <InBox
        css={css`
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
            color: ${theme.palette.InfoLight.main};
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

        <Box className="contents contents_btn">{button}</Box>
      </InBox>
    </Page>
    // <InBox
    //   sx={{
    //     height: "100%",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    // >
    //   <WelcomeStyle className="divJCC">
    //     <img
    //       src={WelcomeImage1}
    //       alt=""
    //       width={"100%"}
    //       height={300}
    //       className={css`
    //         /* margin: 30px 0px; */
    //       `}
    //     />
    //     <div
    //       className="textBox divJCC"
    //       css={css`
    //         flex: 1;
    //       `}
    //     >
    //       <p>
    //         자리 요금만 내고
    //         <br />
    //         카페를 사용할 수 있어요
    //       </p>
    //     </div>

    //     <FullBox className="endbutton center divJCC">
    //       <InBox>
    //         <Box
    //           css={css`
    //             width: 100%;
    //             height: 60px;
    //             margin: 30px 0px;
    //             border-radius: 15px;
    //             /* background-color: skyblue; */
    //           `}
    //           // disabled={storeState === "사용가능" ? false : true}
    //           bgcolor="PrimaryBrand.main"
    //           className="divJCC"
    //         >
    //           <TextBtnText color="InfoLight">사용 종료하기</TextBtnText>
    //         </Box>
    //       </InBox>
    //     </FullBox>
    //   </WelcomeStyle>
    // </InBox>
  );
};

export default ImgTextButtonPage;
