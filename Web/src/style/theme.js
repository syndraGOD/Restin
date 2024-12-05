import { createTheme } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  style_TextHeader1,
  style_TextHeader4,
} from "../components/designGuide";
import { BiSquareRounded } from "react-icons/bi";
// export const wBox = styled("div", {
//   name: "MuiDiv",
//   overridesResolver: (props, styles) => {
//     return [styles.root];
//   },
// })();
const palette = {
  PrimaryBrand: {
    main: "#F58515",
    Light: "#FFA554",
    Pale: "#FFC999",
    // get default() {
    //   return this.main;
    // },
  },
  Black: {
    main: "#181818",
  },
  White: {
    main: "#FFFFFF",
  },
  Red: {
    main: "#E53939",
  },
  // Black: {
  //   main: "#0E0E2C",
  // },
  // White: {
  //   main: "#FAFCFE",
  // },
  // Gray.c900: {
  //   main: "#4A4A68",
  // },
  // Gray.c400: {
  //   main: "#8C8CA1",
  // },
  // MainBackground: {
  //   main: "#ECF1F4",
  // },
  Gray: {
    c100: "#f8f8f8",
    c200: "#E8E8E8",
    c300: "#D1D1D1",
    c400: "#BABABA",
    c500: "#A3A3A3",
    c600: "#8B8B8B",
    c700: "#747474",
    c800: "#464646",
    c900: "#2F2F2F",
  },
};
export const theme = createTheme({
  overrides: {
    MuiList: {
      root: {
        width: "fit-content",
      },
    },
  },
  components: {
    MuiDialog: {
      default: {},
    },
    MuiCheckbox: {
      defaultProps: {
        color: "PrimaryBrand",
        size: "small",
        // children: <>gdgd</>,
      },
      styleOverrides: {
        root: css`
          padding: 0;
          /* font-size: 28px; */
          color: ${palette.Gray.c400};
          .MuiCheckbox-colorPrimary {
            color: ${palette.PrimaryBrand.main};
          }

          .MuiSvgIcon-root {
            font-size: 26px !important;
          }
        `,
      },
    },
    //texrField는 styledcomponents와 충돌이 난다
    //fullbox 사용시 한글자 입력하면 리렌더링 문제 발생
    MuiTextField: {
      defaultProps: {
        // {{console.log(this)}}
      },
      styleOverrides: {
        root: css`
          .MuiInput-underline {
            padding-bottom: 8px;
          }
          .MuiInputLabel-root {
            ${style_TextHeader4}
            /* font-weight: bold; */
            color: ${palette.Black.main};
            &.Mui-focused,
            &.MuiFormLabel-filled {
              color: ${palette.Black.main};
              font-weight: bold;
            }
          }
          .MuiInputBase-input {
            ${style_TextHeader4}
            font-weight: normal;
          }
          .MuiFormHelperText-root {
            font-family: NotoSansKR, sans-serif, Arial;
            font-size: 12px;
            color: ${palette.Gray.c600};
          }
          .Mui-error {
            font-family: NotoSansKR, sans-serif, Arial;
            color: ${palette.Red.main};
          }
        `,
      },
    },
  },
  typography: {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
  },
  palette,
});
export default theme;
