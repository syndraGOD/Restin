import { WelcomeStyle } from "../../../style/WelcomePage";
import BtnDefault from "../../../components/BtnDefault";
import BtnFullBox from "../../../components/BtnFullBox";
import WelcomeImage5 from "../../../assets/images/WelcomeImage5.png";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/css";

const Welcome5 = () => {
  return (
    <WelcomeStyle className="divJCC">
      <img
        src={WelcomeImage5}
        alt=""
        width={300}
        height={300}
        className={css`
          /* margin: 30px 0px; */
        `}
      />
      <div className="textBox">
        <p>
          이제 주변 개인 카페를
          <br />
          찾아볼까요?
        </p>
      </div>
      <BtnFullBox>
        <BtnDefault currentPage="/login">다음</BtnDefault>
      </BtnFullBox>
    </WelcomeStyle>
  );
};

export default Welcome5;
