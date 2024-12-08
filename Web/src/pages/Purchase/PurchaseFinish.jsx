import { Box } from "@mui/material";
import {
  TextBodyLarge,
  TextHeader4,
  TextBody,
  TextBodySmall,
  TextHeader3,
} from "@components/designGuide";
import FullBox from "@components/common/FullBox";
import HeaderInner from "@components/common/HeaderInner";
import { DefaultBtn } from "@components/common/Btns";
import InBox from "@components/common/InBox";
import { Boxs } from "@components/designGuide";
import { useSelector } from "react-redux";
import { BsFillCheckCircleFill } from "react-icons/bs";
import theme from "@style/theme";
import checkIcon from "@assets/icons/restin_ok_307.png";
const PurchaseFinish = () => {
  const userData = useSelector((state) => state.userR.userData);
  const storeDataAll = useSelector((state) => state.storeR.storeData);

  const usageData = userData.usage;
  const storeData = storeDataAll.find(
    (store) => store.UUID === userData.usage.storeUUID
  );

  return (
    <FullBox sx={{ height: "100%", overflowY: "auto", position: "relative" }}>
      <InBox justifySelf="center" mt={10}>
        <Box sx={styles.section}>
          <Box sx={styles.checkIcon}>
            <Box component="img" src={checkIcon} width={66} alt="결제완료" />
          </Box>
          <TextHeader4 weight="Bold" color="Black.main" textAlign="center">
            결제가 완료 되었습니다
          </TextHeader4>
          <TextBody color="Gray.c600" textAlign="center" mt={1}>
            이용해 주셔서 감사합니다
          </TextBody>
        </Box>
      </InBox>
      <Boxs variant="SecctionLine" />
      <InBox justifySelf="center">
        <Box sx={styles.section}>
          <Box sx={styles.amountRow} mb={1}>
            <TextHeader4 weight="Bold" color="Black">
              총 결제 금액
            </TextHeader4>
            <TextHeader3 weight="Bold" color="PrimaryBrand.main">
              {usageData.totalUsagePrice.toLocaleString("ko-KR")}원
            </TextHeader3>
          </Box>
          <Boxs variant="TextLine" />
          <Box sx={styles.amountRow}>
            <TextBody color="Gray.c600">좌석 사용 시간</TextBody>
            <TextBody color="Gray.c600">
              {Math.floor(usageData.totalUsageDurationMinutes / 60)}시간{" "}
              {Math.floor(usageData.totalUsageDurationMinutes % 60)}분
            </TextBody>
          </Box>
          <Box sx={styles.amountRow}>
            <TextBody color="Gray.c600">좌석 사용 금액</TextBody>
            <TextBody color="Gray.c600">
              {usageData.totalUsagePrice.toLocaleString("ko-KR")}원
            </TextBody>
          </Box>
        </Box>
      </InBox>
      <Boxs variant="SecctionLine" />
      <InBox justifySelf="center">
        <Box sx={styles.section}>
          <TextHeader4 color="Black" weight="Bold" mb={2}>
            결제 정보
          </TextHeader4>
          <Box sx={styles.amountRow}>
            <TextBody color="Gray.c600">결제 수단</TextBody>
            <TextBody color="Gray.c600">토스페이</TextBody>
          </Box>
          <Box sx={styles.amountRow}>
            <TextBody color="Gray.c600">결제 날짜</TextBody>
            <TextBody color="Gray.c600">
              {new Date().toLocaleString("ko-KR", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </TextBody>
          </Box>
        </Box>
      </InBox>
      <InBox justifySelf="center">
        <DefaultBtn fixed={true} onClick={() => navi("/app/home")}>
          확인
        </DefaultBtn>
      </InBox>
    </FullBox>
  );
};

const styles = {
  section: {
    padding: "24px 0px",
  },
  checkIcon: {
    display: "flex",
    justifyContent: "center",
    mb: 2,
  },
  amountRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mt: 1.5,
  },
};

export default PurchaseFinish;
