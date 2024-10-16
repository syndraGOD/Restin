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
  },
});
export default theme;
