import { useParams } from "react-router-dom";
import GetNotionJSX from "../../components/common/NotionPageGet";

const NotionPage = () => {
  const params = useParams();
  const { pageNumber } = params;
  return <GetNotionJSX loc={pageNumber}></GetNotionJSX>;
};

export default NotionPage;
