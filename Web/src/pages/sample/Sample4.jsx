import { Link as RouterLink } from "react-router-dom";
import img4 from "./img4.png";
const Sample4 = () => {
  return (
    <RouterLink to={"/sample/5"}>
      <img src={img4} alt="" />
    </RouterLink>
  );
};

export default Sample4;
