import styled from "styled-components";

// const setScreenSize = () => {
//   let vh = window.innerHeight * 0.01;

//   document.documentElement.style.setProperty("--vh", `${vh}px`);
// };

// setScreenSize();
export const MobilePage = styled.div`
  :root {
    --vh: 100%;
  }
  min-width: 360px;
  width: 20%;
  height: calc(var(--vh, 1vh) * 100);
  /* overflow-y: scroll;*/
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
`;

export default MobilePage;
