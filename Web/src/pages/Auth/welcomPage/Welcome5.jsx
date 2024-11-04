import WelcomeImage5 from "@assets/images/WelcomeImage5.png";
import ImgTextButtonPage from "@components/common/ImgTextButtonPage";
import { TextBtnText, TextHeader3 } from "@components/designGuide";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BgColorDefault } from "../../../components/common/Bg";

const Welcome5 = () => {
  const navi = useNavigate();
  return (
    <ImgTextButtonPage>
      <img src={WelcomeImage5} alt="" />
      <TextHeader3>
        물컵을 반납하면서
        <br />
        사용을 종료해주세요
      </TextHeader3>
      <Button
        onClick={() => {
          navi("/welcome/6");
        }}
      >
        <TextBtnText>이해했어요!</TextBtnText>
      </Button>
      <BgColorDefault bgColor="InfoLight.main" />
    </ImgTextButtonPage>
  );
};

export default Welcome5;
