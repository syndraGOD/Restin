import styled from "styled-components";

const StyledBtnBox = styled.div`
  position: absolute;
  bottom: 0;
  transform: translateY(-50%);
  width: 100%;
`;

const BtnFullBox = ({ children }: { children: React.ReactNode }) => {
  return <StyledBtnBox>{children}</StyledBtnBox>;
};

export default BtnFullBox;
