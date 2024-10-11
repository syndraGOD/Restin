import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store";
// import { themeToggle } from "../../store/modules/themeSlice.js";
// import { Button } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TextBody, TextHeader2 } from "../../components/designGuide.jsx";
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
      `}
    >
      <Box
        css={css`
          align-items: start;
        `}
      >
        <TextHeader2 sx={{ margin: "5px 0" }} color="InfoDark">
          Restin
        </TextHeader2>
        <Box
          sx={{
            flexDirection: "row",
            margin: "20px 0",
          }}
        >
          <Box sx={{ width: 1 / 2 }}>
            <img></img>
            <TextBody
              color="InfoDark"
              sx={{
                borderRight: "2px solid #b0b0b0",
              }}
            >
              혜화
            </TextBody>
          </Box>
          <Box sx={{ width: 1 / 2 }}>
            <TextBody color="InfoDark">거리 순</TextBody>
          </Box>
        </Box>
      </Box>
      <Box>asd</Box>
      {/* <Button variant="contained" onClick={() => dispatch(themeToggle("asd"))}>
        Reducer Test2
      </Button> */}
    </Box>
  );
};

export default Home;
