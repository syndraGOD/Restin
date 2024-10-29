import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import { useState } from "react";

const GetNotionJSX = ({ loc }) => {
  const [notionData, setNotionData] = useState();
  const getNotion = async () => {
    const res = await fetch(`http://localhost:3000/notion/${loc}`, {
      method: "GET",
    });
    const data = await res.json();
    setNotionData(data);
  };
  getNotion();
  return (
    <>
      {notionData ? (
        <NotionRenderer
          disableHeader
          recordMap={notionData}
          fullPage={true}
          darkMode={true}
          mapPageUrl={(pageId) => `/notionPage/${pageId}`}
        />
      ) : null}
    </>
  );
};

export default GetNotionJSX;
