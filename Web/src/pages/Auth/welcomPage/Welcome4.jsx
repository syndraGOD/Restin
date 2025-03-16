import WelcomeImage4 from "@assets/images/WelcomeImage4.png";
import ImgTextButtonPage from "@components/common/ImgTextButtonPage";
import { TextHeader2, TextHeader3 } from "@components/designGuide";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BgColorDefault } from "../../../components/common/Bg";
import { TextBodyLarge } from "../../../components/designGuide";

const Welcome4 = () => {
  const navi = useNavigate();
  return (
    <ImgTextButtonPage count={4}>
      <img src={WelcomeImage4} alt="" />
      <TextHeader2 weight="Bold">
        물컵을 반납하면서
        <br />
        사용을 종료해주세요
      </TextHeader2>
      <Button
        onClick={() => {
          navi("/welcome/5");
        }}
      >
        <TextBodyLarge weight="Bold" color="White.main">
          물론이죠
        </TextBodyLarge>
      </Button>
      <BgColorDefault bgColor="White.main" />
    </ImgTextButtonPage>
  );
};

export default Welcome4;
