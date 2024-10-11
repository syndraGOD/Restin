import { Link as RouterLink } from "react-router-dom";
import img2 from "./img2.png";
const Sample2 = () => {
  return (
    <RouterLink to={"/sample/3"}>
      <img src={img2} alt="" />
    </RouterLink>
  );
};

export default Sample2;
