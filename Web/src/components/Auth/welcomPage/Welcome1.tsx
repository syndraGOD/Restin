import styled from "styled-components";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Welcome = styled.div`
  display: "flex";
  align-items: center;
  font-size: 24px;
`;

const Welcome1 = () => {
  return (
    <>
      <Welcome>
        <p>음료주문 없는</p>
        <p>카페 사용 서비스</p>
        <p>Restin 에서는\n\n</p>
        <p>자리값만 내고</p>
        <p>카페를 사용할 수 있어요</p>
      </Welcome>
      <Link
        component={RouterLink}
        to="/login"
        variant="body2"
        underline="hover"
        color="text.secondary"
      >
        회원가입 하기
      </Link>
    </>
  );
};

export default Welcome1;
