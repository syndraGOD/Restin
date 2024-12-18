import WelcomeImage4 from "@assets/images/WelcomeImage4.png";
import ImgTextButtonPage from "@components/common/ImgTextButtonPage";
import { TextBtnText, TextHeader3 } from "@components/designGuide";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Welcome4 = () => {
  const navi = useNavigate();
  return (
    <ImgTextButtonPage>
      <img src={WelcomeImage4} alt="" />
      <TextHeader3>
        물컵을 반납하면서
        <br />
        사용을 종료해주세요
      </TextHeader3>
      <Button
        onClick={() => {
          navi("/welcome/5");
        }}
      >
        <TextBtnText>이해했어요!</TextBtnText>
      </Button>
    </ImgTextButtonPage>
  );
};

export default Welcome4;
