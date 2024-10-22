import { WelcomeStyle } from "../../../style/WelcomePage";
import BtnDefault from "../../../components/BtnDefault";
import BtnFullBox from "../../../components/BtnFullBox";
import WelcomeImage4 from "../../../assets/images/WelcomeImage4.png";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/css";

const Welcome4 = () => {
  return (
    <WelcomeStyle className="divJCC">
      <img
        src={WelcomeImage4}
        alt=""
        width={300}
        height={300}
        className={css`
          /* margin: 30px 0px; */
        `}
      />
      <div className="textBox">
        <p>
          물건을 반납하면서
          <br />
          사용을 종료해주세요
        </p>
      </div>
      <BtnFullBox>
        <BtnDefault currentPage="/welcome/5">다음</BtnDefault>
      </BtnFullBox>
    </WelcomeStyle>
  );
};

export default Welcome4;
