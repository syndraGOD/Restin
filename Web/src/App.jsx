// import { useState } from "react";
// import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  // useNavigate,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";
import Home from "./pages/App/Home";
import LoginPage from "./pages/Auth/LoginPage";
import React, { useEffect, useState } from "react";
import MobilePage from "./style/Mobile.jsx";
import LogoPage from "./pages/LogoPage";
import Welcome1 from "./pages/Auth/welcomPage/Welcome1";
import Welcome2 from "./pages/Auth/welcomPage/Welcome2";
import Welcome3 from "./pages/Auth/welcomPage/Welcome3";
import Welcome4 from "./pages/Auth/welcomPage/Welcome4";
import Welcome5 from "./pages/Auth/welcomPage/Welcome5";
import theme from "./style/theme";
import { Button, ThemeProvider } from "@mui/material";
import StoreDetail from "./pages/App/Home/StoreDetail";
import StoreFilterPage from "./pages/App/Home/StoreFilter";
import { Provider as Reducer, useDispatch, useSelector } from "react-redux";
import { store } from "@/store";
import ServiceUsing from "./pages/App/Home/ServiceUsing";
import SettingPage from "./pages/Setting/SettingPage";
import TermsListPage from "./pages/Setting/TermsOfUse/TermsListPage";
import NotificationSetting from "./pages/Setting/Setting/NotificationSetting";
import PurchaseLogList from "./pages/Purchase/PurchaseLogList";
import Welcome6 from "./pages/Auth/welcomPage/Welcome6";
import RegisterPage from "./pages/Auth/LoginPage/RegisterPage";
import IsExistUser from "./pages/Auth/LoginPage/IsExistUser";
import UseAgree from "./pages/Auth/LoginPage/UseAgree";
import PurchaseIng from "./pages/Purchase/PurchaseIng";
import PurchaseFinish from "./pages/Purchase/PurchaseFinish";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import { restinAPI } from "./api/config";
import { setuserData } from "./store/modules/userSlice";
import { setVerifiToken } from "./store/modules/tokenSlice";
import { sendMessageToRN } from "./api/RN/RNsend";
import * as PortOne from "@portone/browser-sdk/v2";
import KakaoChannelGuide from "./pages/Setting/Setting/KakaoChannelGuide.jsx";
import UserInfoModify from "./pages/Setting/Setting/UserInfoModify.jsx";
import UseGuide from "./pages/App/Home/UseGuide.jsx";
import NotionLocList from "./api/NotionLocList.js";
import GetNotionJSX from "./components/common/NotionPageGet.jsx";
import PointCharge from "./pages/Point/PointCharge.jsx";
import PointRequestComplete from "./pages/Point/PointRequestComplete.jsx";
// import { GoogleAuthProvider } from "firebase/auth";

//const app =

function App() {
  // console.log("ㅎㅇ");
  const [Loading, setLoading] = useState(true);
  // 0 = not has token // 1 = has token, but server disable this token // 2 = has token, allow token
  //token 확인해서 자동로그인
  const userData = useSelector((state) => state.userR.userData);
  const auth_Token = useSelector((state) => state.tokenR.verifiToken);
  const dispatch = useDispatch();
  // const location = useLocation();
  const tokenLogin = async () => {
    if (JSON.stringify(userData) !== "{}") {
      console.log("로그인되어있음 - 유지");
      return;
    }
    if (auth_Token === "") {
      console.log("토큰 없음-로그인 진행");
      return;
    } else {
      console.log("토큰 발견 > 데이터 내부 토큰으로 로그인 진행");
      try {
        const res = await fetch(`${restinAPI}/auth/login`, {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + auth_Token,
          },
        });
        if (res.status === 200) {
          const awaitRES = await res.json();
          const resUserData = awaitRES.user.data;
          dispatch(setuserData(resUserData));
          dispatch(setVerifiToken(resUserData.security.auth_token));
          console.log("토큰 로그인 성공!");
        } else {
          dispatch(setVerifiToken(""));
          console.log("토큰 로그인 실패..");
        }
      } catch (error) {
        //토큰로그인 오류가 났다고 해서 자동로그인 데이터를 초기화하는게 맞는가?
        //한번 고민해보자, 그런데 만약 계속 에러가나는 상황이면, 초기화해주는게 오히려 나은데 말이지
        dispatch(setVerifiToken(""));
        console.log("토큰 로그인 에러!", error);
      }
    }
  };
  useEffect(() => {
    const webInit = async () => {
      const displaySet = () => {
        document.documentElement.style.setProperty(
          "--vh",
          `${window.innerHeight * 0.01}px`
        );
      };
      const storeImgDownload = async () => {};
      const autoLogin = async () => {
        await tokenLogin();
      };
      await displaySet();
      await storeImgDownload();
      await autoLogin();
      setLoading(false);
    };
    webInit();
  }, []);
  const loginProcess = async () => {
    //진입시 userData 확인
    //  있으면 그대로 children return
    //  없으면 토큰 있는지 확인
    //    토큰 있으면 토큰 로그인 시도
    //
    //    토큰 없으면
  };
  const loginInit = () => {
    sendMessageToRN({
      type: "token",
      payload: {
        auth_token: userData.security.auth_token,
      },
    });
  };
  const AuthProtect = ({ children }) => {
    // const location = useLocation();
    // console.log(location.pathname);
    if (JSON.stringify(userData) !== "{}") {
      return children;
    } else {
      console.log("userData : ", userData);
      console.log("token : ", auth_Token);
      return <Navigate to="/login/isuser"></Navigate>;
    }
  };
  const uid = Date.now().toString(16);
  return (
    <>
      <GlobalStyle />
      <Reducer store={store}>
        <PersistGate loading={<LogoPage />} persistor={persistor}>
          <ThemeProvider theme={theme}>
            {/* <Button
                  sx={{ p: 3, m: 3 }}
                  onClick={async () => {
                    // window.location = "kakaotalk://kakaopay/home";
                    // dispatch(setuserData({}));
                    const response = await PortOne.requestPayment({
                      storeId: "store-3aaf2448-f4cd-44ca-8162-0c81eb934d6e",
                      channelKey:
                        "channel-key-453920ce-40b4-4f6d-b50f-c2aa365b9adb",
                      paymentId: uid,
                      orderName: "주문명",
                      totalAmount: 1000,
                      currency: "CURRENCY_KRW",
                      payMethod: "EASY_PAY",
                      redirectUrl: `http://test.restin.co.kr/`,
                      // customer: {
                      //   fullName: "김",
                      // },
                    });
                    if (response.code !== undefined) {
                      // 오류 발생
                      return alert(response.message);
                    }
                  }}
                >
                  react
                </Button> */}
            <BrowserRouter>
              <MobilePage>
                <Routes>
                  <Route
                    path="/"
                    element={
                      JSON.stringify(userData) !== "{}" ? (
                        <Navigate to="/app/home" />
                      ) : (
                        <Navigate to="/welcome/1" />
                      )
                    }
                  />
                  {/* 밑에는 AuthProtect 미적용 */}
                  <Route path="/welcome">
                    <Route index path="1" element={<Welcome1 />}></Route>
                    <Route path="2" element={<Welcome2 />}></Route>
                    <Route path="3" element={<Welcome3 />}></Route>
                    <Route path="4" element={<Welcome4 />}></Route>
                    <Route path="5" element={<Welcome5 />}></Route>
                    <Route path="5" element={<Welcome5 />}></Route>
                    <Route path="6" element={<Welcome6 />}></Route>
                  </Route>
                  <Route path="/login">
                    <Route
                      index
                      path="isuser"
                      element={<IsExistUser />}
                    ></Route>
                    <Route path="register" element={<RegisterPage />}></Route>
                    <Route path="useagree" element={<UseAgree />}></Route>
                    <Route path="numbertest" element={<LoginPage />}></Route>
                  </Route>
                  {/* 밑에는 AuthProtect 적용 */}
                  <Route path="/app">
                    <Route
                      path="home"
                      element={
                        <AuthProtect>
                          <Home />
                        </AuthProtect>
                      }
                    ></Route>

                    <Route
                      path="filter"
                      element={
                        <AuthProtect>
                          <StoreFilterPage />
                        </AuthProtect>
                      }
                    ></Route>
                    <Route
                      path="store"
                      element={
                        <AuthProtect>
                          <StoreDetail />
                        </AuthProtect>
                      }
                    ></Route>
                    <Route
                      path="useguide"
                      element={
                        <AuthProtect>
                          <UseGuide />
                        </AuthProtect>
                      }
                    ></Route>
                    <Route
                      path="using"
                      element={
                        <AuthProtect>
                          <ServiceUsing />
                        </AuthProtect>
                      }
                    ></Route>
                  </Route>
                  <Route path="/purchase">
                    <Route
                      path="listLog"
                      element={
                        <AuthProtect>
                          <PurchaseLogList />
                        </AuthProtect>
                      }
                    ></Route>
                    <Route
                      path="payment"
                      element={
                        <AuthProtect>
                          <PurchaseIng />
                        </AuthProtect>
                      }
                    ></Route>
                    <Route
                      path="finish"
                      element={
                        <AuthProtect>
                          <PurchaseFinish />
                        </AuthProtect>
                      }
                    ></Route>
                  </Route>
                  <Route
                    path="/myInfo/home"
                    element={
                      <AuthProtect>
                        <SettingPage />
                      </AuthProtect>
                    }
                  ></Route>
                  <Route
                    path="/myInfo/notifi"
                    element={
                      <AuthProtect>
                        <NotificationSetting />
                      </AuthProtect>
                    }
                  ></Route>
                  <Route
                    path="/myInfo/termsList"
                    element={
                      <AuthProtect>
                        <TermsListPage />
                      </AuthProtect>
                    }
                  ></Route>
                  <Route
                    path="/myInfo/kakaochannel"
                    element={
                      <AuthProtect>
                        <KakaoChannelGuide />
                      </AuthProtect>
                    }
                  ></Route>
                  <Route
                    path="/myInfo/userinfomodify"
                    element={
                      <AuthProtect>
                        <UserInfoModify />
                      </AuthProtect>
                    }
                  ></Route>
                  <Route path="/point">
                    <Route path="charge" element={<PointCharge />}></Route>
                    <Route
                      path="chargecomplete"
                      element={<PointRequestComplete />}
                    ></Route>
                  </Route>
                </Routes>
              </MobilePage>

              {/* <Button variant="contained">Hello world</Button> */}
            </BrowserRouter>
          </ThemeProvider>
        </PersistGate>
      </Reducer>
    </>
  );
}
// interface ProtectedRouteProps {
//   isLogin: () => boolean;
// }
// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLogin }) => {
const ProtectedRoute = ({ isLogin }) => {
  if (isLogin()) {
    return <Outlet />;
  } else {
    return <Navigate to="/welcome" />;
  }
};
export default App;
