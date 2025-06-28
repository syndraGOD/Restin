import { Box } from "@mui/material";
import {
  TextBodyLarge,
  TextHeader4,
  TextBody,
  TextHeader3,
} from "@components/designGuide";
import FullBox from "@components/common/FullBox";
import HeaderInner from "@components/common/HeaderInner";
import { DefaultBtn } from "@components/common/Btns";
import InBox from "@components/common/InBox";
import { Boxs } from "@components/designGuide";
import checkIcon from "@assets/icons/restin_ok_307.png";
import { IoCopyOutline } from "react-icons/io5";
import theme from "@style/theme";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendMessageToRN } from "@api/RN/RNsend";

const PointRequestComplete = () => {
  const navi = useNavigate();
  const auth_token = useSelector((state) => state.tokenR.verifiToken);
  const userData = useSelector((state) => state.userR.userData);
  const [requestTicket, setRequestTicket] = useState(null);
  const copyAccountNumber = () => {
    sendMessageToRN({
      type: "copy",
      payload: {
        text: "754237-04-024208",
      },
    });
  };
  useEffect(() => {
    fetch(`${restinAPI}/point/request/state`, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRequestTicket(data.requestTicket);
      });
  }, []);
  return (
    <FullBox
      sx={{
        height: "100%",
        overflowY: "auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <HeaderInner fixed={true} backTo={-2}>
        무통장 입금 안내
      </HeaderInner>

      <InBox justifySelf="center">
        <Box sx={styles.section}>
          <Box sx={styles.checkIcon}>
            <Box sx={styles.circle}>
              <Box component="img" src={checkIcon} width={66} alt="결제완료" />
            </Box>
          </Box>
          <TextHeader4 weight="Bold" color="Black.main" textAlign="center">
            무통장 입금 시 포인트가 충전됩니다
          </TextHeader4>
          <TextBody color="Gray.c600" textAlign="center" mt={1}>
            입금 확인 약 2~30분 소요, 원료 시 알림이 발송됩니다
          </TextBody>
        </Box>
      </InBox>

      <Boxs variant="SecctionLine" />

      <InBox justifySelf="center">
        <Box sx={styles.section}>
          <TextHeader4 weight="Bold" color="Black.main" mb={2}>
            무통장 입금 안내
          </TextHeader4>
          <Boxs variant="TextLine" sx={{ mb: 2 }} />
          <Box sx={styles.accountInfo}>
            <Box sx={styles.accountRow}>
              <TextBodyLarge weight="Bold" color="Black.main">
                입금 정보
              </TextBodyLarge>
              <Box sx={styles.accountDetail} textAlign="left">
                <TextBodyLarge display="flex" alignItems="center">
                  KB국민 754237-04-024208{"  "}
                  <IoCopyOutline
                    size={20}
                    color={theme.palette.Gray.c400}
                    onClick={copyAccountNumber}
                    style={{
                      transform: "rotate(180deg)",
                    }}
                  />
                </TextBodyLarge>
                <TextBodyLarge color="Black.main">
                  김정민 (레스틴Restin)
                </TextBodyLarge>
              </Box>
            </Box>
          </Box>
        </Box>
      </InBox>

      <Boxs variant="SecctionLine" />

      <InBox justifySelf="center">
        <Box sx={styles.section}>
          <Box sx={styles.amountRow}>
            <TextHeader4 weight="Bold" color="Black.main">
              충전 신청 금액
            </TextHeader4>
            <TextHeader3 weight="Bold" color="PrimaryBrand.main">
              {String(
                requestTicket?.charge?.chargeAmount
                  ? requestTicket.charge.chargeAmount
                  : 0
              ).toLocaleString()}
              원
            </TextHeader3>
          </Box>
          <Boxs variant="TextLine" sx={{ mb: 2 }} />
          <Box sx={styles.detailRow}>
            <TextBody weight="Regular" color="Gray.c400">
              현재 보유 포인트
            </TextBody>
            <TextBody weight="Regular" color="Gray.c400">
              {String(
                userData?.point?.amount ? userData.point.amount : 0
              ).toLocaleString()}
              원
            </TextBody>
          </Box>
          <Box sx={styles.detailRow}>
            <TextBody weight="Regular" color="Gray.c400">
              충전 신청 금액
            </TextBody>
            <TextBody weight="Regular" color="Gray.c400">
              {String(
                requestTicket?.charge?.chargeAmount
                  ? requestTicket.charge.chargeAmount
                  : 0
              ).toLocaleString()}
              원
            </TextBody>
          </Box>
          <Box sx={styles.detailRow}>
            <TextBody weight="Regular" color="Gray.c400">
              리워드 혜택
            </TextBody>
            <TextBody weight="Regular" color="Gray.c400">
              {String(
                requestTicket?.charge?.chargeAmount
                  ? requestTicket.charge.chargeAmount *
                      requestTicket.charge.bonusRate
                  : 0
              ).toLocaleString()}
              원
            </TextBody>
          </Box>
          <Boxs variant="TextLine" sx={{ my: 2 }} />
          <Box sx={styles.totalRow}>
            <TextBody weight="Regular">포인트 충전 및 결제 후 잔액</TextBody>
            <TextBody weight="Regular" color="Black.main">
              {String(
                requestTicket?.charge?.chargeAmount
                  ? userData?.point?.amount +
                      requestTicket.charge.chargeAmount +
                      requestTicket.charge.chargeAmount *
                        requestTicket.charge.bonusRate
                  : 0
              ).toLocaleString()}
              원
            </TextBody>
          </Box>
        </Box>
      </InBox>

      <InBox justifySelf="center">
        <DefaultBtn fixed={true} onClick={() => navi(-2)}>
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
    mb: 3,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    backgroundColor: theme.palette.PrimaryBrand.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  accountInfo: {
    display: "flex",
    flexDirection: "row",
    gap: 1,
  },
  accountDetail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 1,
  },
  accountRow: {
    display: "flex",
    flexDirection: "row",
    gap: 1,
  },
  amountRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mt: 1.5,
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default PointRequestComplete;
