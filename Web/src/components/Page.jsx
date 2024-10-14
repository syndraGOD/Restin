import { styled } from "@mui/system";
import { Box } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import asd from "@pages/sample/img1.png";
function DeepChild() {
  const theme = useTheme();
  return <span>{`spacing ${theme.spacing}`}</span>;
}

export const PageInner = styled(Box)`
  width: 88%;
  height: 100%;
  justify-content: start;
  display: none;
`;

export const Page = ({ children, bg, bgimg, ...args }) => {
  console.log(bgimg);
  const NewPage = styled(Box)`
    width: 100%;
    height: 100%;
    align-items: center;
    /* background-image: ${bgimg ? `url("${bgimg}")` : null || "aqua"}; */
    /* background-image: "url(${asd})"; */
  `;
  return (
    <NewPage
      // style={{ backgroundImage: `url(${asd})` }}
      sx={{ backgroundImage: `url(${asd})` }}
    >
      <PageInner {...args}>{children}</PageInner>
    </NewPage>
  );
};

export const CenterPageInner = styled(Box)`
  width: 88%;
  height: 100%;
  justify-content: center;
  align-content: center;
`;

export const CenterPage = ({ children, bg, ...args }) => {
  const NewPage = styled(Box)`
    width: 100%;
    height: 100%;
    align-items: center;
    /* background: ${bg ? bg : "#000000"}; */
  `;
  return (
    <NewPage>
      <CenterPageInner {...args}>{children}</CenterPageInner>
    </NewPage>
  );
};
