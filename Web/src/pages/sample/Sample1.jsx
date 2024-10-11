import { Link as RouterLink } from "react-router-dom";
import img1 from "./img1.png";
const Sample1 = () => {
  return (
    <RouterLink to={"/sample/2"}>
      <img src={img1} alt="" />
    </RouterLink>
  );
};

export default Sample1;
