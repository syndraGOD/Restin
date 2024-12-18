import WelcomeImage1 from "@assets/images/WelcomeImage1.png";
import ImgTextButtonPage from "@components/common/ImgTextButtonPage";
import { TextHeader2, TextHeader3 } from "@components/designGuide";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BgColorDefault } from "../../../components/common/Bg";

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
        <TextHeader2 weight="Bold" color="White.main">
          진짜요?
        </TextHeader2>
      </Button>
      <BgColorDefault bgColor="White.main" />
    </ImgTextButtonPage>
  );
};

export default Welcome1;
