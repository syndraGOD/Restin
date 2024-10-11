import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import NotoSansKR_Thin from "../fonts/NotoSansKR/NotoSansKR-Thin.woff";
import NotoSansKR_ExtraLight from "../fonts/NotoSansKR/NotoSansKR-ExtraLight.woff";
import NotoSansKR_Light from "../fonts/NotoSansKR/NotoSansKR-Light.woff";
import NotoSansKR_Regular from "../fonts/NotoSansKR/NotoSansKR-Regular.woff";
import NotoSansKR_Medium from "../fonts/NotoSansKR/NotoSansKR-Medium.woff";
import NotoSansKR_SemiBold from "../fonts/NotoSansKR/NotoSansKR-SemiBold.woff";
import NotoSansKR_Bold from "../fonts/NotoSansKR/NotoSansKR-Bold.woff";
import NotoSansKR_ExtraBold from "../fonts/NotoSansKR/NotoSansKR-ExtraBold.woff";
import NotoSansKR_Black from "../fonts/NotoSansKR/NotoSansKR-Black.woff";
import { Button } from "@mui/material";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    div{
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        text-align: center;
        width: 100%;
    }
    :root{
        font-family: NotoSansKR, sans-serif, Arial;
        font-size:14px;
        
        white-space: pre-wrap;
    }
    //other style
    @font-face {
        font-family: 'NotoSansKR';
        src: url(${NotoSansKR_Thin}) format('woff');
        font-style: normal;
        font-weight: 100;
    }
    @font-face {
        font-family: 'NotoSansKR';
        src: url(${NotoSansKR_ExtraLight}) format('woff');
        font-style: normal;
        font-weight: 200;
    }
    @font-face {
        font-family: 'NotoSansKR';
        src: url(${NotoSansKR_Light}) format('woff');
        font-style: normal;
        font-weight: 300;
    }
    @font-face {
        font-family: 'NotoSansKR';
        src: url(${NotoSansKR_Regular}) format('woff');
        font-style: normal;
        font-weight: 400;
    }
    @font-face {
        font-family: 'NotoSansKR';
        src: url(${NotoSansKR_Medium}) format('woff');
        font-style: normal;
        font-weight: 500;
    }
    @font-face {
        font-family: 'NotoSansKR';
        src: url(${NotoSansKR_SemiBold}) format('woff');
        font-style: normal;
        font-weight: 600;
    }
    @font-face {
        font-family: 'NotoSansKR';
        src: url(${NotoSansKR_Bold}) format('woff');
        font-style: normal;
        font-weight: 700;
    }
    @font-face {
        font-family: 'NotoSansKR';
        src: url(${NotoSansKR_ExtraBold}) format('woff');
        font-style: normal;
        font-weight: 800;
    }
    @font-face {
        font-family: 'NotoSansKR';
        src: url(${NotoSansKR_Black}) format('woff');
        font-style: normal;
        font-weight: 900;
    }
`;

export default GlobalStyle;
