import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store";
// import { themeToggle } from "../../store/modules/themeSlice.js";
// import { Button } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TextBody, TextHeader2 } from "../../components/designGuide.jsx";
import { Box, Button, Typography } from "@mui/material";
import { Page } from "@components/Page.jsx";
// import image from "../../assets/images/WelcomeImage1.png";
import { useEffect, useState } from "react";
import { app, db } from "@common/firebaseConfig";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  runTransaction,
} from "firebase/firestore";
import StoreItem from "./StoreItem";
const Home = () => {
  // const theme = useSelector((state: RootState) => state.themeR.theme);
  // const theme = useSelector((state) => state.themeR.theme);
  // const dispatch = useDispatch();
  const storeListUpdate = async (db) => {
    const colName = "STORE";
    const col = collection(db, colName);

    const temps = await getDocs(col);
    const temparr = [];
    temps.forEach((item) => {
      temparr.push(item.data());
    });
    setData(temparr);
    // console.log(data);
    // temps.forEach((doc) => {
    //   console.log(doc.data());
    // });

    // setData(temps);
    // console.log(data);
    // data.forEach((doc) => {
    //   console.log(doc.data());
    // });
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    storeListUpdate(db);
  }, []);
  // const data = [{ name: "sex1" }, { name: "sex2" }, { name: "sex3" }];
  const filter = { line1: ["수원"] };
  const sort = ["recommend", "distance", "like", "cheap"];
  const [sortUser, sortUserSet] = useState("");
  return (
    <Page
      bgimg="../../assets/images/WelcomeImage1.png"
      css={css`
        align-items: start;
      `}
    >
      {/* h2 */}
      <TextHeader2
        sx={{ margin: "5px 0", alignItems: "start" }}
        color="InfoDark"
      >
        Restin
      </TextHeader2>
      {/* header */}
      <Box
        sx={{
          flexDirection: "row",
          margin: "20px 0",
        }}
      >
        <Box
          sx={{
            width: 1 / 2,
            borderRadius: "0px",
            borderRight: "2px solid #b0b0b0",
          }}
          component={Button}
          onClick={() => {}}
        >
          <img></img>
          <TextBody color="InfoDark">ㅇㅇ역</TextBody>
        </Box>
        <Box sx={{ width: 1 / 2 }}>
          <TextBody color="InfoDark">거리 순</TextBody>
        </Box>
      </Box>
      {/* contents */}
      <Box
        css={css`
          height: 100%;
        `}
      >
        {console.log(data)}
        {data
          ? data.map((item, idx) => {
              return (
                <StoreItem
                  key={item.id}
                  item={item}
                  userDistance={5}
                ></StoreItem>
              );
            })
          : null}
      </Box>
      {/* navigation */}
      <Box
        css={css`
          /* align-self: flex-end; */
          /* position: fixed; */
        `}
      >
        navigation
        <p>hello hy</p>
        <p>hello hy</p>
        <p>hello hy</p>
      </Box>
      {/* <Button variant="contained" onClick={() => dispatch(themeToggle("asd"))}>
        Reducer Test2
      </Button> */}
    </Page>
  );
};

export default Home;
