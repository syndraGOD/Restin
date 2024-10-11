import { WelcomeStyle } from "../../../style/WelcomePage";
import BtnDefault from "../../../components/BtnDefault";
import BtnFullBox from "../../../components/BtnFullBox";
import WelcomeImage2 from "../../../assets/images/WelcomeImage2.png";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/css";

const Welcome2 = () => {
  return (
    <WelcomeStyle>
      <img
        src={WelcomeImage2}
        alt=""
        width={300}
        height={300}
        className={css`
          /* margin: 30px 0px; */
        `}
      />
      <div className="textBox">
        <p>
          버튼 하나로
          <br />
          사용을 시작할 수 있어요
        </p>
      </div>
      <BtnFullBox>
        <BtnDefault currentPage="/welcome/3">다음</BtnDefault>
      </BtnFullBox>
    </WelcomeStyle>
  );
};

export default Welcome2;
