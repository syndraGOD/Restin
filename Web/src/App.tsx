// import { useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  // useNavigate,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./components/App/Home";
import LoginPage from "./components/Auth/LoginPage";
import React, { useEffect, useState } from "react";
import MobilePage from "./style/Mobile";
import LogoPage from "./components/LogoPage";
import Welcome1 from "./components/Auth/welcomPage/Welcome1";
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
    console.log("로딩시작");
    setTimeout(() => {
      setLoading(!Loading);
      console.log("로딩끝");
    }, 2000);
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
                    <Navigate to="/welcome" />
                  )
                }
              />
              <Route path="/app" element={<ProtectedRoute isLogin={isLogin} />}>
                <Route index element={<Home />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/welcome" element={<Welcome1 />} />
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
