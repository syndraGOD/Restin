import WelcomeImage4 from "@assets/images/WelcomeImage4.png";
import ImgTextButtonPage from "@components/common/ImgTextButtonPage";
import { TextHeader2, TextHeader3 } from "@components/designGuide";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BgColorDefault } from "../../../components/common/Bg";

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
        <TextHeader2 weight="Bold">물론이죠</TextHeader2>
      </Button>
      <BgColorDefault bgColor="White.main" />
    </ImgTextButtonPage>
  );
};

export default Welcome4;
