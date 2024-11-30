import React from "react";
import { TextHeader2, TextHeader3 } from "../designGuide";
import FullBox from "./FullBox";
import { IoIosArrowBack } from "react-icons/io";
import theme from "../../style/theme";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeaderInner = ({ children, ...props }) => {
  const navigate = useNavigate();
  return (
    <FullBox
      {...props}
      className="divJCC"
      sx={{
        alignItems: "center",
        position: "relative",
        padding: "10px 0px",
        // borderBottom: `1px solid ${theme.palette.Gray.c400}`,
        height: "70px",
      }}
    >
      <Box
        component={Button}
        onClick={() => {
          navigate(-1);
        }}
        sx={{ position: "absolute", lineHeight: "70px", left: "10px" }}
      >
        <IoIosArrowBack size={"40px"} color={theme.palette.Black.main} />
      </Box>
      <TextHeader3 sx={{ margin: "5px 0", alignItems: "center" }} color="Black">
        {children}
      </TextHeader3>
    </FullBox>
  );
};

export default HeaderInner;
