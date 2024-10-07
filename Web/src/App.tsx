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
// import { GoogleAuthProvider } from "firebase/auth";

//const app =

function App() {
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  });
  useEffect(() => {
    // console.log("로딩시작");
    // setTimeout(() => {
    //   setLoading(!Loading);
    //   console.log("로딩끝");
    // }, 500);
  }, []);
  // console.log(firebaseConfig);
  // const navigate = useNavigate();
  const isLogin = (): boolean => {
    return !!false; //Math.random();
  };
  // const LoginCheckPrivateRoute = ({ children : <React.ReactNode/>}) => {
  //   return isLogin() ? children : <Navigate to="/login" />;
  // };
  return (
    <>
      <GlobalStyle />
      {!Loading ? (
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
              <Route path="/app" element={<ProtectedRoute isLogin={isLogin} />}>
                <Route index element={<Home />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/welcome">
                <Route index path="/welcome/1" element={<Welcome1 />}></Route>
                <Route path="/welcome/2" element={<Welcome2 />}></Route>
                <Route path="/welcome/3" element={<Welcome3 />}></Route>
                <Route path="/welcome/4" element={<Welcome4 />}></Route>
              </Route>
            </Routes>

            {/* <Button variant="contained">Hello world</Button> */}
          </BrowserRouter>
        </MobilePage>
      )}
    </>
  );
}
interface ProtectedRouteProps {
  isLogin: () => boolean;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLogin }) => {
  if (isLogin()) {
    return <Outlet />;
  } else {
    return <Navigate to="/welcome" />;
  }
};
export default App;
