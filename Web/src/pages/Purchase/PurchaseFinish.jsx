import img from "@assets/images/purchaseFinish.png";
import FullBox from "../../components/common/FullBox";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
const PurchaseFinish = () => {
  const navi = useNavigate();
  return (
    <FullBox
      onClick={() => {
        navi("/app/home");
      }}
    >
      <img src={img} alt="" width={"100%"} />
    </FullBox>
  );
};

export default PurchaseFinish;
