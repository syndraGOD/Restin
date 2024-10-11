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
// import { GoogleAuthProvider } from "firebase/auth";

//const app =

function App() {
  console.log("ㅎㅇ");
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  });
  useEffect(() => {
    console.log("로딩시작");
    setTimeout(() => {
      setLoading(!Loading);
      console.log("로딩끝");
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
                <Route path="/login" element={<LoginPage />} />
                <Route path="/welcome">
                  <Route index path="/welcome/1" element={<Welcome1 />}></Route>
                  <Route path="/welcome/2" element={<Welcome2 />}></Route>
                  <Route path="/welcome/3" element={<Welcome3 />}></Route>
                  <Route path="/welcome/4" element={<Welcome4 />}></Route>
                  <Route path="/welcome/5" element={<Welcome5 />}></Route>
                </Route>
                <Route path="/sample">
                  <Route index path="/sample/1" element={<Sample1 />}></Route>
                  <Route path="/sample/2" element={<Sample2 />}></Route>
                  <Route path="/sample/3" element={<Sample3 />}></Route>
                  <Route path="/sample/4" element={<Sample4 />}></Route>
                  <Route path="/sample/5" element={<Sample5 />}></Route>
                </Route>
                <Route path="/app">
                  <Route path="/app/home" element={<Home />} />
                </Route>
              </Routes>

              {/* <Button variant="contained">Hello world</Button> */}
            </BrowserRouter>
          </MobilePage>
        )}
      </ThemeProvider>
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
