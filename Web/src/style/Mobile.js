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
  width: 100vw;
  /* margin: 0px 6vw; */
  height: calc(var(--vh, 1vh) * 100);
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  /* transform: translate(-50%, -50%); */
  box-sizing: border-box;
`;

export default MobilePage;
