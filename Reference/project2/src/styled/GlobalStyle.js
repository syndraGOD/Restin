import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  
  body {
    font-size: 16px;
    line-height: 1.6;
    font-family: 'Noto Sans KR', sans-serif;
    color:#333;
  }
  a {
    text-decoration: none;
    color:#333; 
  }
  li { list-style:none }
  img { vertical-align: top; }
  
  .inner { width:1400px; margin:auto; box-sizing:border-box; position:relative }
`;

export default GlobalStyle;
