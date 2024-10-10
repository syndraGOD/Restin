/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
interface ASD {
  component: any;
}
const StyledButton = styled(Button)`
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
`;

const BtnDefault = ({
  children,
  currentPage,
}: {
  children: string;
  currentPage: string;
}) => {
  return (
    <StyledButton component={RouterLink} to={currentPage}>
      <p className="TEXT_BtnText">{children}</p>
    </StyledButton>
  );
};
export default BtnDefault;
