/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { DialogPage } from "../components/common/DialogOk";
import GetNotionJSX from "../components/common/NotionPageGet";
import NotionLocList from "../api/NotionLocList";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import theme from "./theme";
import { setuserData } from "../store/modules/userSlice";
import { setVerifiToken } from "../store/modules/tokenSlice";
import { setStoreData } from "../store/modules/storeSlice";
import { restinAPI } from "../api/config";
import LoadingPage from "../pages/LoadingPage";

export const MobilePage = ({ children }) => {
  const userData = useSelector((state) => state.userR.userData);
  const storeData = useSelector((state) => state.storeR.storeData);
  const auth_Token = useSelector((state) => state.tokenR.verifiToken);
  const location = useLocation();
  const navi = useNavigate();
  const loading = useSelector((state) => state.varR.loading);
  const [windowViewHeight, setwindowViewHeight] = useState(
    window.visualViewport?.height || window.innerHeight
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      setwindowViewHeight(window.visualViewport?.height || window.innerHeight);
      console.log("높이", window.visualViewport?.height || window.innerHeight);
    };
    window.visualViewport.addEventListener("resize", handleResize);
    return () => {
      window.visualViewport.removeEventListener("resize", handleResize);
    };
  }, []);
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  useEffect(() => {
    const tokenLogin = async () => {
      if (auth_Token !== "") {
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
            navi("/app/home");
          } else if (res.status === 401) {
            dispatch(setVerifiToken(""));
            console.log("토큰 로그인 실패 (잘못된 토큰)");
          } else {
            console.log("토큰 로그인 실패 (서버 오류)");
          }
        } catch (error) {
          console.log("토큰 로그인 에러!", error);
        }
      }
      if (auth_Token === "") {
        console.log("토큰 없음-로그인 진행");
        navi("/welcome/1");
        return;
      }
    };

    tokenLogin();
  }, []);
  useEffect(() => {
    const storeDataSet = async () => {
      try {
        const res = await fetch(`${restinAPI}/store/getStoreData`, {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + auth_Token,
          },
        });
        if (res.status === 200) {
          const awaitRES = await res.json();
          dispatch(setStoreData(awaitRES.data));
          console.log("스토어 정보 로드 성공");
        } else {
          console.log("스토어 정보 로드 실패");
        }
      } catch (error) {
        console.log("스토어 정보 로드 에러", error);
      }
    };
    if (auth_Token !== "") {
      storeDataSet();
    }
  }, [auth_Token]);

  // const loginInit = () => {
  //   sendMessageToRN({
  //     type: "token",
  //     payload: {
  //       auth_token: userData.security.auth_token,
  //     },
  //   });
  // };
  //
  //
  //

  return (
    <div
      className="MobilePage"
      css={css`
        :root {
          --vh: 100%;
        }
        min-width: 360px;
        width: 100vw;
        /* margin: 0px 6vw; */
        height: ${windowViewHeight}px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        /* transform: translate(-50%, -50%); */
        box-sizing: border-box;
      `}
    >
      {loading ? <LoadingPage /> : null}
      {children}

      {/* {console.log(
        location.hash !== "" && NotionLocList[location.hash.replace("#", "")]
      )} */}
      <DialogPage
        open={Boolean(
          location.hash !== "" && NotionLocList[location.hash.replace("#", "")]
        )}
      >
        <GetNotionJSX loc={NotionLocList[location.hash.replace("#", "")]} />
      </DialogPage>
    </div>
  );
};
export default MobilePage;
