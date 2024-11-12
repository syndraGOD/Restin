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
  typography: {
    Text_Title: {
      fontWeight: "700px",
      fontSize: "40px",
    },
    Text_Header1: {},
    Text_Header2: {},
    Text_Header3: {},
    TEXT_BodyLarge: {},
    TEXT_Body: {},
    TEXT_BodySmall: {},
    TEXT_Bold: {},
    TEXT_BtnText: {},
  },
  palette: {
    PrimaryBrand: {
      main: "#F58515",
      Light: "#FFA554",
      Pale: "#FFC999",
    },

    PrimaryBrand_Back: {
      main: "#FFF5E9",
    },

    SecondaryBrand: {
      main: "#50ABE5",
    },

    SecondaryBrand_Back: {
      main: "#E9F3FF",
    },
    InfoDark: {
      main: "#0E0E2C",
    },
    InfoLight: {
      main: "#FAFCFE",
    },
    MainText: {
      main: "#4A4A68",
    },
    SubText: {
      main: "#8C8CA1",
    },
    MainBackground: {
      main: "#ECF1F4",
    },
    Gray: {
      100: "#f8f8f8",
      200: "#E8E8E8",
      300: "#D1D1D1",
      400: "#BABABA",
      500: "#A3A3A3",
      600: "#8B8B8B",
      700: "#747474",
      800: "#464646",
      900: "#2F2F2F",
    },
    Red: {
      main: "#E53939",
    },
  },
});
export default theme;
