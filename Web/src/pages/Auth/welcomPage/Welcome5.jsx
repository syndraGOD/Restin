import WelcomeImage5 from "@assets/images/WelcomeImage5.png";
import ImgTextButtonPage from "@components/common/ImgTextButtonPage";
import { TextHeader2, TextHeader3 } from "@components/designGuide";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BgColorDefault } from "../../../components/common/Bg";

const Welcome5 = () => {
  const navi = useNavigate();
  return (
    <ImgTextButtonPage>
      <img src={WelcomeImage5} alt="" />
      <TextHeader3>
        이제 주변 개인 카페를
        <br />
        찾아볼까요?
      </TextHeader3>
      <Button
        onClick={() => {
          navi("/welcome/6");
        }}
      >
        <TextHeader2 weight="Bold">좋아요</TextHeader2>
      </Button>
      <BgColorDefault bgColor="White.main" />
    </ImgTextButtonPage>
  );
};

export default Welcome5;
