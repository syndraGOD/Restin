import Logo from "../assets/Logo/logo192.png";
import theme from "../style/theme";
import { Box } from "@mui/material";

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
    <>
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
      <Box
        sx={{
          width: "inherit",
          height: "inherit",
          bgcolor: "white",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 9998,
        }}
      ></Box>
    </>
  );
};

export default LoadingPage;
