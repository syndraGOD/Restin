/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
const StyledBtnBox = styled.div`
  position: absolute;
  bottom: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 60px;
`;

// const BtnFullBox = ({ children }: { children: React.ReactNode }) => {
const BtnFullBox = ({ children }) => {
  return <StyledBtnBox>{children}</StyledBtnBox>;
};

export default BtnFullBox;
