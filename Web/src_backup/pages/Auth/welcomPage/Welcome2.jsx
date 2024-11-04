import WelcomeImage2 from "@assets/images/WelcomeImage2.png";
import ImgTextButtonPage from "@components/common/ImgTextButtonPage";
import { TextBtnText, TextHeader3 } from "@components/designGuide";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
        <TextBtnText>간편하네요!</TextBtnText>
      </Button>
    </ImgTextButtonPage>
  );
};

export default Welcome2;
