import { styled } from "@mui/system";
import { Box } from "@mui/material";

import { useTheme } from "@mui/material/styles";
function DeepChild() {
  const theme = useTheme();
  return <span>{`spacing ${theme.spacing}`}</span>;
}

export const PageInner = styled(Box)`
  width: 100%;
  height: 100%;
  justify-content: start;
  align-items: center;
  overflow: hidden;
`;

export const Page = ({ children, bg, bgimg, ...args }) => {
  // console.log(bgimg);
  const NewPage = styled(Box)`
    width: 100%;
    height: 100%;
    align-items: center;
    /* background-image: ${bgimg ? `url("${bgimg}")` : null || "aqua"}; */
  `;
  return (
    <NewPage>
      <PageInner {...args}>{children}</PageInner>
    </NewPage>
  );
};

export const CenterPageInner = styled(Box)`
  width: 100%;
  /* height: 100%; */
  justify-content: center;
  align-content: center;
`;

export const CenterPage = ({ children, bg, ...args }) => {
  const NewPage = styled(Box)`
    width: 100%;
    /* height: 100%; */
    align-items: center;
    /* background: ${bg ? bg : "#000000"}; */
  `;
  return (
    <NewPage>
      <CenterPageInner {...args}>{children}</CenterPageInner>
    </NewPage>
  );
};
