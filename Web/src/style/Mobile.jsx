import { ExpandCircleDownTwoTone } from "@mui/icons-material";
import styled from "styled-components";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
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
    // const handleVisualViewportResize = () => {
    //   // 이전의 visualViewport 영역
    //   const currentVisualViewport = window.visualViewport.height;
    //   if (
    //     fullHeight.current - 30 >
    //     currentVisualViewport
    //     // && fullHeight.current - 100 < currentVisualViewport
    //   ) {
    //     console.log("keyboard on");
    //     // alert("hi");
    //     const scrollHeight = window.document.scrollingElement.scrollHeight;
    //     const scrollTop = scrollHeight - window.visualViewport.height;

    //     window.scrollTo(0, scrollTop); // 입력창이 키보드에 가려지지 않도록 조절
    //   }
    //   fullHeight.current = window.visualViewport.height;
    // };
    // window.visualViewport.addEventListener(
    //   "resize",
    //   handleVisualViewportResize
    // );
    // return () => {
    //   window.visualViewport.removeEventListener(
    //     "resize",
    //     handleVisualViewportResize
    //   );
    // };
  }, []);
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
      {children}
    </div>
  );
};
export default MobilePage;
