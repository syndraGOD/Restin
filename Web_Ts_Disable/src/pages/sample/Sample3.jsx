import { Link as RouterLink } from "react-router-dom";
import img3 from "./img3.png";
const Sample3 = () => {
  return (
    <RouterLink to={"/sample/4"}>
      <img src={img3} alt="" />
    </RouterLink>
  );
};

export default Sample3;
