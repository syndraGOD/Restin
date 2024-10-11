import { Link as RouterLink } from "react-router-dom";
import img5 from "./img5.png";
const Sample5 = () => {
  return (
    <RouterLink to={"/sample/6"}>
      <img src={img5} alt="" />
    </RouterLink>
  );
};

export default Sample5;
