import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { themeToggle } from "../../store/modules/themeSlice";
import { Button } from "@mui/material";

const Home = () => {
  const theme = useSelector((state: RootState) => state.themeR.theme);
  const dispatch = useDispatch();
  return (
    <div>
      u a login clear!
      <h1>Restin</h1>
      <h2>Theme : {theme}</h2>
      <Button
        variant="contained"
        onClick={() => dispatch(themeToggle("undefind"))}
      >
        Reducer Test
      </Button>
      <Button variant="contained" onClick={() => dispatch(themeToggle("asd"))}>
        Reducer Test2
      </Button>
    </div>
  );
};

export default Home;
