import WelcomeImage1 from "@assets/images/WelcomeImage1.png";
import ImgTextButtonPage from "@components/common/ImgTextButtonPage";
import { TextBtnText, TextHeader3 } from "@components/designGuide";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Welcome1 = () => {
  const navi = useNavigate();
  return (
    <ImgTextButtonPage>
      <img src={WelcomeImage1} alt="" />
      <TextHeader3>
        자리 요금만 내고
        <br />
        카페를 사용 할 수 있어요
      </TextHeader3>
      <Button
        onClick={() => {
          navi("/welcome/2");
        }}
      >
        <TextBtnText>진짜요?</TextBtnText>
      </Button>
    </ImgTextButtonPage>
  );
};

export default Welcome1;
