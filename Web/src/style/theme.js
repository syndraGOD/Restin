import { createTheme } from "@mui/material";
// export const wBox = styled("div", {
//   name: "MuiDiv",
//   overridesResolver: (props, styles) => {
//     return [styles.root];
//   },
// })();
export const theme = createTheme({
  overrides: {
    MuiList: {
      root: {
        width: "fit-content",
      },
    },
  },
  typography: {},
  palette: {
    PrimaryBrand: {
      main: "#F58515",
      Light: "#FFA554",
      Pale: "#FFC999",
      get default() {
        return this.main;
      },
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
    // MainText: {
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
  },
});
export default theme;
