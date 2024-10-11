/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import { TextBtnText } from "./designGuide";

// interface ComponentType {
//   component: React.ReactElement;
// }
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
// const BtnDefault = ({
//   children,
//   currentPage,
// }: {
//   children: string;
//   currentPage: string;
// }) => {
const BtnDefault = ({ children, currentPage }) => {
  return (
    <StyledButton component={RouterLink} to={currentPage}>
      <TextBtnText color="">{children}</TextBtnText>
    </StyledButton>
  );
};
export default BtnDefault;
