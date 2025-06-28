/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { DialogOK, DialogPage } from "../components/common/DialogOk";
import GetNotionJSX from "../components/common/NotionPageGet";
import NotionLocList from "../api/NotionLocList";
import { useDispatch, useSelector } from "react-redux";
import { setuserData } from "../store/modules/userSlice";
import { setVerifiToken } from "../store/modules/tokenSlice";
import { setStoreData } from "../store/modules/storeSlice";
import LoadingPage from "../pages/LoadingPage";
import { sendMessageToRN } from "../api/RN/RNsend";
import { setAnnounceImgs, setLoading } from "../store/modules/varSlice";

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
    sendMessageToRN({
      type: "cacheClear",
      payload: {},
    });
    
    // if((window.VisualViewport?.width || window.innerWidth) > 500) {
    //   root.style.setProperty('--vw', '5px');
    // }else{
    //   root.style.setProperty('--vw', (window.VisualViewport?.width || window.innerWidth)/100);
    // }    
    // if((window.VisualViewport?.height || window.innerHeight) > 500) {
    //   root.style.setProperty('--vh', '11px');
    // }else{
    //   root.style.setProperty('--vh', (window.VisualViewport?.height || window.innerHeight)/100);
    // }
    const handleResize = () => {
      setwindowViewHeight(window.visualViewport?.height || window.innerHeight);
      console.log("높이", window.visualViewport?.height || window.innerHeight);
      window.scrollTo(0, 0);
      setTimeout(() => {window.scrollTo(0, 0);}, 50);
      setTimeout(() => {window.scrollTo(0, 0);}, 100);
      setTimeout(() => {window.scrollTo(0, 0);}, 300);
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
    console.log("WEB View : V 1.016");
    dispatch(setLoading(true));
    const tokenLogin = async () => {
      if (auth_Token !== "") {
        try {
          const res = await fetch(`${import.meta.env.VITE_RESTIN_API}/auth/login`, {
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
            navi("/welcome/1");
            console.log("토큰 로그인 실패 (잘못된 토큰)");
          } else {
            navi("/welcome/1");
            console.log("토큰 로그인 실패 (서버 오류)");
          }
        } catch (error) {
          console.log("토큰 로그인 에러!", error);
        }
      }
      if (auth_Token === "") {
        console.log("토큰 없음-로그인 진행");
        navi("/welcome/1");
      }
      dispatch(setLoading(false));
    };

    tokenLogin();
  }, []);
  useEffect(() => {
    const storeDataSet = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_RESTIN_API}/imgs/announce_list`, {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + auth_Token,
          },
        });
        if (res.status === 200) {
          const RESjson = await res.json();
          const imgs = RESjson.data;
          dispatch(setAnnounceImgs(imgs));
          // console.log("imgs : ", imgs);
          console.log("공지 이미지 로드 성공!");
        } else {
          console.log("공지 이미지 로드 실패");
        }
      } catch (error) {
        console.log("공지 이미지 로드 에러", error);
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_RESTIN_API}/store/getStoreData`, {
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

  useEffect(() => {
    if (storeData.length === 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [storeData]);
  // const loginInit = () => {
  // };
  //
  //
  //
  useEffect(() => {
    // const receiver = platform === ios ? window : document;
    const receiver = (event) => {
      // const loc = useLocation(); useLocation 값이 왼지는 모르겠으나
      // 처음 참고한 그시점에서 고정되어버림 window사용

      if (typeof window !== "undefined" && window.ReactNativeWebView) {
        console.log("pathname", window.location.pathname);
        console.log("hash", window.location.hash);
        // console.log("event", event);
        const { type, payload } = JSON.parse(event.data);
        if (type === "back") {
          if (window.location.hash !== "") {
            if (window.location.hash === "#isMobileAppEnd") {
              sendMessageToRN({
                type: "close",
                payload: {},
              });
            } else {
              navi(-1);
            }
            return;
          } else if (
            window.location.pathname === "/app/home" ||
            window.location.pathname === "/welcome/1" ||
            window.location.pathname === "/login/isuser"
          ) {
            navi(window.location.pathname + "#isMobileAppEnd");
          } else if (
            window.location.pathname === "/purchase/payment" ||
            window.location.pathname === "/purchase/finish"
          ) {
            navi("/app/home");
          } else if (window.location.pathname === "/point/chargecomplete") {
            navi(-2);
          } else {
            // console.log(location.pathname, "back");
            navi(-1);
          }
        } else if (type === "loading") {
          dispatch(setLoading(payload));
        }
        // const handler = receiveWebviewMessageMap.get(type);
        // handler?.(data);
      }
    };
    // const BackHandle = () => {};
    window.addEventListener("message", receiver);
    document.addEventListener("message", receiver);
    // window.addEventListener("popstate", receiver);
    return () => {
      window.removeEventListener("message", receiver);
      document.removeEventListener("message", receiver);
      // window.removeEventListener("popstate", receiver);
    };
  }, []);

  const renderPage = () => {
    return (
      <div
        className="MobilePage"
        css={css`
          :root {
            --vh: 100%;
          }
          min-width: 360px;
          mix-width: 500px;
          width: 100vw;
          max-width: 100vw;
          max-height: 100vh;
          overflow: hidden;
          /* margin: 0px 6vw; */
          height: ${windowViewHeight}px;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          /* transform: translate(-50%, -50%); */
          box-sizing: border-box;
          //IOS설정
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
        <DialogOK
          open="isMobileAppEnd"
          h2="어플을 종료하시겠어요?"
          text={`종료 키 또는 뒤로가기 추가 입력시 어플이 종료됩니다`}
          isok={() => {
            navi(-1);
            sendMessageToRN({
              type: "close",
              payload: {},
            });
          }}
          isoktext="종료하기"
        ></DialogOK>
      </div>
    )
  }

  return (
    (window.VisualViewport?.width || window.innerWidth) > 500 || 
    process.env.NODE_ENV === 'production' && !window.ReactNativeWebView
    ? (
      <div>
        pc 미지원 모바일 앱입니다.
      </div>
    ) : (
      renderPage()
    )
  );
};
export default MobilePage;
