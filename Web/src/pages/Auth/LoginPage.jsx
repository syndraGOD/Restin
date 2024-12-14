import { Button, Box, Link, Input } from "@mui/material";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import Logo from "../../assets/Logo/logo48.png";
import { css } from "@emotion/css";
import { Link as RouterLink } from "react-router-dom";
import {
  TextBody,
  TextBodyLarge,
  TextBodySmall,
  TextHeader1,
} from "../../components/designGuide";
import { useRef, useState } from "react";

const LoginPage = () => {
  const AuthGoogleLogin = async () => {
    // const userGoogle = fbAuth.currentUser;
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      try {
        // 강제로 새로운 토큰 요청
        const newToken = await user.getIdToken(true);
        console.log("새로운 토큰:", newToken);
      } catch (error) {
        console.error("토큰 발급 오류:", error);
      }
    } else {
      console.log("사용자가 로그인되어 있지 않습니다.");
    }
    console.log(user);
  };
  // const phoneNumber = "+1 1042512171";
  const AuthPhoneSignin = async () => {
    fbAuth.settings.appVerificationDisabledForTesting = false;
    let appVerifer = (window.recaptchaVerifier = new RecaptchaVerifier(
      fbAuth,
      "recaptcha-container",
      {
        size: "invisible",
        // callback: (response) => {
        //   console.log("capcha 통과!");
        // },
      }
    ));
    signInWithPhoneNumber(fbAuth, test, appVerifer)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        return true;
      })
      .catch((error) => {
        // window.confirmationResult = null;
        console.log(`SignInerror! : \n${error}`);
        grecaptcha.reset(window.recaptchaWidgetId);
        return false;
      });
  };
  const verifiResult = () => {
    confirmationResult
      .confirm(testVerifi)
      .then((result) => {
        // User signed in successfully.
        // const user = result.user;
        console.log(result);
      })
      .catch((error) => {
        console.log("인증번호 불일치합니다");
      });
  };
  const AuthLogOut = async () => {
    let userName;
    if (fbAuth.currentUser) {
      userName = fbAuth.currentUser.displayName;
    }
    const outed = await fbAuth.signOut();
    console.log(userName, outed);
  };

  const [test, setTest] = useState();
  const [testVerifi, setTestVerifi] = useState();
  return (
    <Box className="divJCC" sx={{ position: "relative" }}>
      <Box
        id="recaptcha-container"
        // sx={{ position: "absolute", width: "100px" }}
      >
        asd
      </Box>
      <Box className="divJCC">
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
      {/* google login */}
      <Button
        color="PrimaryBrand"
        variant="contained"
        onClick={() => {
          const provider = new GoogleAuthProvider();
          signInWithPopup(fbAuth, provider)
            .then((result) => {
              const user = result.user;
              console.log(`after_auth : `, user);
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
      {/* phone number login */}
      <Button variant="contained" onClick={AuthPhoneSignin}>
        핸드폰으로 로그인
      </Button>
      <Input
        onChange={(e) => {
          setTest(e.target.value);
          // console.log(test);
        }}
      ></Input>
      <Input
        onChange={(e) => {
          setTestVerifi(e.target.value);
          // console.log(test);
        }}
      ></Input>
      <Button variant="contained" onClick={verifiResult}>
        인증번호제출
      </Button>
      <Button variant="contained" onClick={AuthGoogleLogin}>
        Login State?
      </Button>
      <Button variant="contained" onClick={AuthLogOut}>
        Logout
      </Button>{" "}
      <Link sx={{ m: 3 }} component={RouterLink} to="/app/home">
        <TextBody>로그인하지 않고 둘러보기</TextBody>
      </Link>
    </Box>
  );
};

export default LoginPage;
