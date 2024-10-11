import { WelcomeStyle } from "../../../style/WelcomePage";
import BtnDefault from "../../../components/BtnDefault";
import BtnFullBox from "../../../components/BtnFullBox";
import WelcomeImage3 from "../../../assets/images/WelcomeImage3.png";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/css";

const Welcome3 = () => {
  return (
    <WelcomeStyle>
      <img
        src={WelcomeImage3}
        alt=""
        width={300}
        height={300}
        className={css`
          /* margin: 30px 0px; */
        `}
      />
      <div className="textBox">
        <p>
          화면을 보여드리고
          <br />물 한 잔을 받아주세요
        </p>
      </div>
      <BtnFullBox>
        <BtnDefault currentPage="/welcome/4">다음</BtnDefault>
      </BtnFullBox>
    </WelcomeStyle>
  );
};

export default Welcome3;
