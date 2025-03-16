import FullBox from "../../../components/common/FullBox";
import HeaderInner from "../../../components/common/HeaderInner";
import InBox from "../../../components/common/InBox";
import { Page } from "../../../components/Page";
import useguideimg from "./UseGuide.png";

const UseGuide = () => {
  return (
    <Page>
      <FullBox
        sx={{
          height: "100%",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <HeaderInner>이용 안내</HeaderInner>
        <InBox justifySelf="center">
          <img src={useguideimg} width={"100%"} />
        </InBox>
      </FullBox>
    </Page>
  );
};

export default UseGuide;
