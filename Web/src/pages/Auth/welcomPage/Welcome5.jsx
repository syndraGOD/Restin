import WelcomeImage5 from "@assets/images/WelcomeImage5.png";
import ImgTextButtonPage from "@components/common/ImgTextButtonPage";
import { TextHeader2, TextHeader3 } from "@components/designGuide";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BgColorDefault } from "../../../components/common/Bg";
import { TextBodyLarge } from "../../../components/designGuide";

const Welcome5 = () => {
  const navi = useNavigate();
  return (
    <ImgTextButtonPage count={5}>
      <img src={WelcomeImage5} alt="" />
      <TextHeader2 weight="Bold">
        이제 주변 개인 카페를
        <br />
        찾아볼까요?
      </TextHeader2>
      <Button
        onClick={() => {
          navi("/login/isuser");
        }}
      >
        <TextBodyLarge weight="Bold" color="White.main">
          좋아요
        </TextBodyLarge>
      </Button>
      <BgColorDefault bgColor="White.main" />
    </ImgTextButtonPage>
  );
};

export default Welcome5;
