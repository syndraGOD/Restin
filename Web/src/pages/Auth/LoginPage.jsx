import { Button, Box, Link } from "@mui/material";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Logo from "../../assets/Logo/logo48.png";
import { css } from "@emotion/css";
import { Link as RouterLink } from "react-router-dom";
import {
  TextBody,
  TextBodyLarge,
  TextBodySmall,
  TextHeader1,
} from "../../components/designGuide";

const LoginPage = () => {
  return (
    <>
      <Box>
        <Box sx={{ flexDirection: "row", alignItems: "center" }}>
          <img src={Logo} alt="" width={50} height={50} />
          <TextHeader1 color="">Restin</TextHeader1>
          <></>
        </Box>
        <Box>
          <TextBodyLarge color="#666666" sx={{ m: 3 }}>
            음료주문 없는
            <br />
            카페 사용 서비스
          </TextBodyLarge>
        </Box>
      </Box>
      <Button
        color="HOT.light"
        variant="contained"
        onClick={() => {
          initializeApp(firebaseConfig);
          const provider = new GoogleAuthProvider();

          const auth = getAuth();
          console.log(`befor_auth : `, auth.currentUser);
          signInWithPopup(auth, provider)
            .then((result) => {
              const user = result.user;
              console.log(user);
              console.log(`after_auth : `, auth);
            })
            .catch((error) => {
              console.log(
                `google login Error: ${error.code} \n ${error.message}`
              );
            });
        }}
      >
        Google Login
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          initializeApp(firebaseConfig);
          // const provider = new GoogleAuthProvider();

          const auth = getAuth();
          const user = auth.currentUser;
          console.log(user);
        }}
      >
        Login State?
      </Button>
      <Link component={RouterLink} to="/app/home">
        <TextBody sx={{ m: 5 }}>로그인하지 않고 둘러보기</TextBody>
      </Link>
    </>
  );
};

export default LoginPage;
