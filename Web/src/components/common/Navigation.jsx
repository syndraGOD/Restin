import { Box, useTheme } from "@mui/system";
import { css } from "@emotion/react";
import React from "react";
import FullBox from "./FullBox";
import { RiHome2Line } from "react-icons/ri";
import { IoCardOutline, IoPersonCircleOutline } from "react-icons/io5";
import { TextBodySmall } from "../designGuide";
import { Link as RouterLink } from "react-router-dom";
const Navigation = ({ select }) => {
  const myTheme = useTheme();
  return (
    <FullBox
      sx={{
        // width: "100vw",
        height: "80px",
        flexDirection: "row",
        overflowY: "hidden",
        borderRadius: "15px 15px 0 0",
        backgroundColor: "white",
      }}
      className="divJCC"
    >
      {/* home */}
      <Box
        sx={{ flex: 1, height: "100%", alignContent: "center" }}
        component={RouterLink}
        to="/app/home"
      >
        <Box sx={{ alignItems: "center", marginBottom: "5px" }}>
          <RiHome2Line
            size={"20px"}
            color={
              select !== "home"
                ? myTheme.palette.SubText.main
                : myTheme.palette.InfoDark.main
            }
          />
        </Box>
        <Box>
          <TextBodySmall
            sx={{
              textDecoration: "none",
            }}
            color={
              select !== "home"
                ? myTheme.palette.SubText.main
                : myTheme.palette.InfoDark.main
            }
          >
            홈
          </TextBodySmall>
        </Box>
      </Box>
      {/* purchase */}
      <Box
        sx={{ flex: 1, height: "100%", alignContent: "center" }}
        component={RouterLink}
        to="/app/purchase"
      >
        <Box sx={{ alignItems: "center", marginBottom: "5px" }}>
          <IoCardOutline
            size={"20px"}
            color={
              select !== "purchase"
                ? myTheme.palette.SubText.main
                : myTheme.palette.InfoDark.main
            }
          />
        </Box>
        <Box>
          <TextBodySmall
            color={
              select !== "purchase"
                ? myTheme.palette.SubText.main
                : myTheme.palette.InfoDark.main
            }
          >
            결제
          </TextBodySmall>
        </Box>
      </Box>
      {/* info */}
      <Box
        sx={{ flex: 1, height: "100%", alignContent: "center" }}
        component={RouterLink}
        to="/app/info"
      >
        <Box sx={{ alignItems: "center", marginBottom: "5px" }}>
          <IoPersonCircleOutline
            size={"20px"}
            color={
              select !== "info"
                ? myTheme.palette.SubText.main
                : myTheme.palette.InfoDark.main
            }
          />
        </Box>
        <Box>
          <TextBodySmall
            color={
              select !== "info"
                ? myTheme.palette.SubText.main
                : myTheme.palette.InfoDark.main
            }
          >
            내 정보
          </TextBodySmall>
        </Box>
      </Box>
    </FullBox>
  );
};

export default Navigation;
