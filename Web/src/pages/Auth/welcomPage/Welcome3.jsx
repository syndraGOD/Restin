import WelcomeImage3 from "@assets/images/WelcomeImage3.png";
import ImgTextButtonPage from "@components/common/ImgTextButtonPage";
import { TextHeader2, TextHeader3 } from "@components/designGuide";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BgColorDefault } from "../../../components/common/Bg";
import { TextBodyLarge } from "../../../components/designGuide";
const Welcome3 = () => {
  const navi = useNavigate();
  return (
    <ImgTextButtonPage count={3}>
      <img src={WelcomeImage3} alt="" />
      <TextHeader2 weight="Bold">
        화면을 보여드리고
        <br />물 한 잔을 받아주세요
      </TextHeader2>
      <Button
        onClick={() => {
          navi("/welcome/4");
        }}
      >
        <TextBodyLarge weight="Bold" color="White.main">
          따듯하군요
        </TextBodyLarge>
      </Button>
      <BgColorDefault bgColor="White.main" />
    </ImgTextButtonPage>
  );
};

export default Welcome3;
