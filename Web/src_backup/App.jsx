// import { useState } from "react";
// import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  // useNavigate,
  Navigate,
  Outlet,
} from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";
import Home from "./pages/App/Home";
import LoginPage from "./pages/Auth/LoginPage";
import React, { useEffect, useState } from "react";
import MobilePage from "./style/Mobile";
import LogoPage from "./pages/LogoPage";
import Welcome1 from "./pages/Auth/welcomPage/Welcome1";
import Welcome2 from "./pages/Auth/welcomPage/Welcome2";
import Welcome3 from "./pages/Auth/welcomPage/Welcome3";
import Welcome4 from "./pages/Auth/welcomPage/Welcome4";
import Welcome5 from "./pages/Auth/welcomPage/Welcome5";
import Sample1 from "./pages/sample/Sample1";
import Sample2 from "./pages/sample/Sample2";
import Sample3 from "./pages/sample/Sample3";
import Sample4 from "./pages/sample/Sample4";
import Sample5 from "./pages/sample/Sample5";
import theme from "./style/theme";
import { ThemeProvider } from "@mui/material";
import StoreDetail from "./pages/App/Home/StoreDetail";
import StoreFilterPage from "./pages/App/Home/StoreFilter";
import { Provider as Reducer } from "react-redux";
import { store } from "@/store";
import ServiceUsing from "./pages/App/Home/ServiceUsing";
import NotionPage from "./components/common/NotionPage";
import SettingPage from "./pages/Setting/SettingPage";
import TermsListPage from "./pages/Setting/TermsOfUse/TermsListPage";
import NotificationSetting from "./pages/Setting/NotificationSetting";
import PurchaseLogList from "./pages/Purchase/PurchaseLogList";
import Welcome6 from "./pages/Auth/welcomPage/Welcome6";
import RegisterPage from "./pages/Auth/LoginPage/RegisterPage";
import IsExistUser from "./pages/Auth/LoginPage/IsExistUser";
import UseAgree from "./pages/Auth/LoginPage/UseAgree";
// import { GoogleAuthProvider } from "firebase/auth";

//const app =

function App() {
  // console.log("ㅎㅇ");
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  });
  useEffect(() => {
    // console.log("로딩시작");
    setTimeout(() => {
      setLoading(!Loading);
      // console.log("로딩끝");
    }, 500);
  }, []);
  // console.log(firebaseConfig);
  // const navigate = useNavigate();
  const isLogin = () => {
    return !!false; //Math.random();
  };
  // const LoginCheckPrivateRoute = ({ children : <React.ReactNode/>}) => {
  //   return isLogin() ? children : <Navigate to="/login" />;
  // };
  return (
    <>
      <GlobalStyle />
      <Reducer store={store}>
        <ThemeProvider theme={theme}>
          {Loading ? (
            <LogoPage />
          ) : (
            <MobilePage>
              <BrowserRouter>
                <Routes>
                  <Route
                    path="/"
                    element={
                      isLogin() ? (
                        <Navigate to="/app" />
                      ) : (
                        <Navigate to="/welcome/1" />
                      )
                    }
                  />
                  <Route
                    path="/app"
                    element={<ProtectedRoute isLogin={isLogin} />}
                  >
                    <Route index element={<Home />} />
                  </Route>
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
                  </Route>
                  <Route path="/app">
                    <Route path="home" element={<Home />}>
                      <Route
                        path="filter"
                        element={<StoreFilterPage />}
                      ></Route>
                      <Route path="store" element={<StoreDetail />}></Route>
                    </Route>
                    <Route path="using" element={<ServiceUsing />}></Route>
                  </Route>
                  <Route
                    path="/purchase/listLog"
                    element={<PurchaseLogList />}
                  ></Route>
                  <Route path="/myInfo/home" element={<SettingPage />}></Route>
                  <Route
                    path="/myInfo/notifi"
                    element={<NotificationSetting />}
                  ></Route>
                  <Route
                    path="/myInfo/termsList"
                    element={<TermsListPage />}
                  ></Route>
                  <Route
                    path="/notionPage/:pageNumber"
                    element={<NotionPage />}
                  ></Route>
                </Routes>

                {/* <Button variant="contained">Hello world</Button> */}
              </BrowserRouter>
            </MobilePage>
          )}
        </ThemeProvider>
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
