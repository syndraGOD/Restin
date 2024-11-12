import img from "@assets/images/purchaseIng.png";
import FullBox from "../../components/common/FullBox";
import { useNavigate } from "react-router-dom";
const PurchaseIng = () => {
  const navi = useNavigate();
  return (
    <FullBox
      onClick={() => {
        navi("/purchase/finish");
      }}
    >
      <img src={img} alt="" width={"100%"} />
    </FullBox>
  );
};

export default PurchaseIng;
