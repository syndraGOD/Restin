import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { Link, Button } from "@mui/material";

const StyledButton = styled.div`
  width: 100%;
  height: 100%;

  .a {
    width: 100%;
    height: 100%;
    padding: 14px 0px;
    background: #f6912c;
    border-radius: 14px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    display: inline-flex;
    border: none;
    .TEXT_BtnText {
      text-align: center;
      color: #fafcfe;
    }
  }
`;

const BtnDefault = ({
  children,
  currentPage,
}: {
  children: string;
  currentPage: string;
}) => {
  console.log(currentPage);
  return (
    <Button
      // style={{ display: "block", width: "100%", height: "100%" }}
      component={RouterLink}
      to={currentPage}
    >
      {children}
    </Button>
  );
};

export default BtnDefault;
