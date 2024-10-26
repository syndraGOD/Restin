import { NotionRenderer } from "react-notion";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

// export const NotionPage = async (loc) => {
//   console.log("ㅎㅇ");
//   const notion = new NotionAPI();
//   const recordMap = await notion.getPage(loc);
//   console.log(recordMap);
//   return ({ recordMap }) => (
//     <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
//   );
// };

export const NotionPage = async () => {
  const data = await fetch(
    "https://lumbar-windflower-be2.notion.site/1240844ba32f804998d1e744634937d7"
  ).then((res) => res.json());
  console.log(data);
  return <NotionRenderer blockMap={data} />;
};

export default ({ blockMap }) => (
  <div style={{ maxWidth: 768 }}>
    <NotionRenderer blockMap={blockMap} />
  </div>
);
