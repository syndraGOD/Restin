import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import { useEffect, useState } from "react";
import { restinAPI } from "../../api/config";
// import { Code } from "react-notion-x/build/third-party/code";
// import { Collection } from "react-notion-x/build/third-party/collection";
// import { Equation } from "react-notion-x/build/third-party/equation";
// import { Modal } from "react-notion-x/build/third-party/modal";
// import { Pdf } from "react-notion-x/build/third-party/pdf";
import { Link } from "react-router-dom";

const GetNotionJSX = ({ loc }) => {
  const [notionData, setNotionData] = useState();

  useEffect(() => {
    const getNotion = async () => {
      const res = await fetch(`${restinAPI}/notion/${loc}`, {
        method: "GET",
      });
      const data = await res.json();
      setNotionData(data);
    };
    getNotion();
  }, []);
  return (
    <>
      {notionData ? (
        <NotionRenderer
          components={{
            nextLink: Link,
          }}
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
