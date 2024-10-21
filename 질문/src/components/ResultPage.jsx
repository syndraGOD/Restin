import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();

  const { age, name } = location.state || {};
  console.log(location);
  return (
    <div>
      <h1>결과 페이지</h1>
      {age && name ? (
        <>
          <p>이름: {name}</p>
          <p>나이: {age}</p>
        </>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default ResultPage;
