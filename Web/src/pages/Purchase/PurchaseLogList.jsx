import { Box } from "@mui/material";
import FullBox from "../../components/common/FullBox";
import HeaderText from "../../components/common/HeaderText";
import InBox from "../../components/common/InBox";
import Navigation from "../../components/common/Navigation";
import { TextBodyLarge, TextHeader3 } from "../../components/designGuide";
import { Page } from "../../components/Page";

const PurchaseLogList = () => {
  return (
    <Page sx={{ backgroundColor: "MainBackground.main" }}>
      <FullBox
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <HeaderText>사용 내역</HeaderText>
        <InBox
          className="divJCC"
          sx={{ flex: 1, backgroundColor: "White.main", m: 4 }}
        >
          <TextBodyLarge color="MainText">
            아직 사용 내역이 없어요
          </TextBodyLarge>
          <TextHeader3 color="Black">카페 찾아보기</TextHeader3>
        </InBox>
        <Box className="divJCC">
          <Navigation select={"purchase"} />
        </Box>
      </FullBox>
    </Page>
  );
};

export default PurchaseLogList;
