import { WelcomeStyle } from "../../../style/WelcomePage";
import BtnDefault from "../../../components/BtnDefault";
import BtnFullBox from "../../../components/BtnFullBox";
import WelcomeImage1 from "../../../assets/images/WelcomeImage1.png";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/css";

const Welcome1 = () => {
  return (
    <WelcomeStyle className="divJCC">
      <img
        src={WelcomeImage1}
        alt=""
        width={300}
        height={300}
        className={css`
          /* margin: 30px 0px; */
        `}
      />
      <div className="textBox">
        <p>
          자리 요금만 내고
          <br />
          카페를 사용할 수 있어요
        </p>
      </div>
      <BtnFullBox>
        <BtnDefault currentPage="/welcome/2">다음</BtnDefault>
      </BtnFullBox>
    </WelcomeStyle>
  );
};

export default Welcome1;
