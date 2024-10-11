import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store";
// import { themeToggle } from "../../store/modules/themeSlice.js";
// import { Button } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TextHeader2 } from "../../components/designGuide.jsx";
import { Box } from "@mui/material";

const Home = () => {
  // const theme = useSelector((state: RootState) => state.themeR.theme);
  // const theme = useSelector((state) => state.themeR.theme);
  // const dispatch = useDispatch();
  return (
    <Box
      height={"100%"}
      css={css`
        justify-content: start;
        background-color: skyblue;
      `}
    >
      <Box
        css={css`
          display: flex;
          justify-content: start;
          align-items: start;
        `}
      >
        <TextHeader2 color="InfoDark">Restin</TextHeader2>
      </Box>
      {/* <Button variant="contained" onClick={() => dispatch(themeToggle("asd"))}>
        Reducer Test2
      </Button> */}
    </Box>
  );
};

export default Home;
