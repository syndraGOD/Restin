import { WelcomeStyle } from "../../../style/Welcome";
import BtnDefault from "../../../components/BtnDefault";
import BtnFullBox from "../../../components/BtnFullBox";
const Welcome1 = () => {
  return (
    <WelcomeStyle>
      <div className="textBox">
        <p>
          음료주문 없는
          <br />
          카페 사용 서비스
          <br />
          Restin 에서는
          <br />
          <br />
          자리값만 내고
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
