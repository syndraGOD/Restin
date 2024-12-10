/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { DialogPage } from "../components/common/DialogOk";
import GetNotionJSX from "../components/common/NotionPageGet";
import NotionLocList from "../api/NotionLocList";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import theme from "./theme";
// const setScreenSize = () => {
//   let vh = window.innerHeight * 0.01;

//   document.documentElement.style.setProperty("--vh", `${vh}px`);
// };

// setScreenSize();
// export const MobilePage = styled.div`
//   :root {
//     --vh: 100%;
//   }
//   min-width: 360px;
//   width: 100vw;
//   /* margin: 0px 6vw; */
//   height: calc(var(--vh, 1vh) * 100);
//   position: absolute;
//   top: 0;
//   left: 50%;
//   transform: translateX(-50%);
//   /* transform: translate(-50%, -50%); */
//   box-sizing: border-box;
// `;

// const fullHeight = useRef(0);
// useEffect(() => {
//   const handleVisualViewportResize = () => {
//     // 이전의 visualViewport 영역
//     const currentVisualViewport = window.visualViewport.height;
//     if (
//       fullHeight.current - 30 >
//       currentVisualViewport
//       // && fullHeight.current - 100 < currentVisualViewport
//     ) {
//       console.log("keyboard on");
//       // alert("hi");
//       const scrollHeight = window.document.scrollingElement.scrollHeight;
//       const scrollTop = scrollHeight - window.visualViewport.height;

//       window.scrollTo(0, scrollTop); // 입력창이 키보드에 가려지지 않도록 조절
//     }
//     fullHeight.current = window.visualViewport.height;
//   };
//   window.visualViewport.addEventListener(
//     "resize",
//     handleVisualViewportResize
//   );
//   return () => {
//     window.visualViewport.removeEventListener(
//       "resize",
//       handleVisualViewportResize
//     );
//   };
// }, []);

export const MobilePage = ({ children }) => {
  const location = useLocation();
  const loading = useSelector((state) => state.varR.loading);
  const [windowViewHeight, setwindowViewHeight] = useState(
    window.visualViewport?.height || window.innerHeight
  );
  const fullHeight = useRef(0);
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

  const LoadingPage = () => {
    const getInitialColor = (index) => {
      switch (index) {
        case 0:
          return theme.palette.PrimaryBrand.main;
        case 1:
          return theme.palette.PrimaryBrand.Light;
        case 2:
          return theme.palette.PrimaryBrand.Pale;
        default:
          return theme.palette.PrimaryBrand.main;
      }
    };
    const bounce = (index) => ({
      bgcolor: getInitialColor(index),
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      animation: `colorChange 3s infinite ${index * 1}s`,
      "@keyframes colorChange": {
        "0%": {
          backgroundColor: getInitialColor(index % 3),
        },
        "33.33%": {
          backgroundColor: getInitialColor((index + 1) % 3),
        },
        "66.66%": {
          backgroundColor: getInitialColor((index + 2) % 3),
        },
        "100%": {
          backgroundColor: getInitialColor(index % 3),
        },
      },
    });

    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="20px"
        >
          <Box sx={bounce(0)}></Box>
          <Box sx={bounce(1)}></Box>
          <Box sx={bounce(2)}></Box>
        </Box>
      </Box>
    );
  };
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
