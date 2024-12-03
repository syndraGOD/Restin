import WelcomeImage2 from "@assets/images/WelcomeImage2.png";
import ImgTextButtonPage from "@components/common/ImgTextButtonPage";
import { TextHeader2, TextHeader3 } from "@components/designGuide";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BgColorDefault } from "../../../components/common/Bg";

const Welcome2 = () => {
  const navi = useNavigate();
  return (
    <ImgTextButtonPage>
      <img src={WelcomeImage2} alt="" />
      <TextHeader3>
        버튼 하나로
        <br />
        사용을 시작 할 수 있어요
      </TextHeader3>
      <Button
        onClick={() => {
          navi("/welcome/3");
        }}
      >
        <TextHeader2 weight="Bold" color="White.main">
          간편하네요!
        </TextHeader2>
      </Button>
      <BgColorDefault bgColor="White.main" />
    </ImgTextButtonPage>
  );
};

export default Welcome2;
