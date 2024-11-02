import WelcomeImage3 from "@assets/images/WelcomeImage3.png";
import ImgTextButtonPage from "@components/common/ImgTextButtonPage";
import { TextBtnText, TextHeader3 } from "@components/designGuide";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Welcome3 = () => {
  const navi = useNavigate();
  return (
    <ImgTextButtonPage>
      <img src={WelcomeImage3} alt="" />
      <TextHeader3>
        화면을 보여드리고
        <br />물 한 잔을 받아주세요
      </TextHeader3>
      <Button
        onClick={() => {
          navi("/welcome/4");
        }}
      >
        <TextBtnText>이해했어요!</TextBtnText>
      </Button>
    </ImgTextButtonPage>
  );
};

export default Welcome3;
