/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box, Button } from "@mui/material";
import {
  TextBodyLarge,
  TextHeader1,
  TextHeader3,
  TextBtnText,
} from "@components/designGuide";
import ImgTextButtonPage from "@components/common/ImgTextButtonPage";
import { useNavigate } from "react-router-dom";
import Logo from "@assets/Logo/logo48.png";
import { BgColorDefault } from "../../../components/common/Bg";

const Welcome6 = () => {
  const navi = useNavigate();
  return (
    <ImgTextButtonPage>
      <Box className="divJCC">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "27vh",
          }}
        >
          <img src={Logo} alt="" width={50} css={css``} />
          <TextHeader1 color="">Restin</TextHeader1>
          <></>
        </Box>
        <Box>
          <TextBodyLarge color="#666666" sx={{ m: 3 }}>
            음료주문 없는
            <br />
            카페 사용 서비스
          </TextBodyLarge>
        </Box>
      </Box>
      <TextHeader3> </TextHeader3>
      <Button
        onClick={() => {
          navi("/login/isuser");
        }}
      >
        <TextBtnText>전화번호로 시작하기</TextBtnText>
      </Button>
      <BgColorDefault bgColor="InfoLight.main" />
    </ImgTextButtonPage>
  );
};

export default Welcome6;
