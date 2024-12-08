import { Box, styled } from "@mui/material";
import { TextBodyLarge, TextHeader4 } from "@components/designGuide";
import FullBox from "@components/common/FullBox";
import HeaderInner from "@components/common/HeaderInner";
import { DefaultBtn } from "@components/common/Btns";
import InBox from "@components/common/InBox";
import theme from "@style/theme";
import {
  Boxs,
  TextBody,
  TextBodySmall,
  TextHeader3,
} from "./../../components/designGuide";
import { useSelector } from "react-redux";
import { BsFillRecordCircleFill } from "react-icons/bs";
import tossPayImg from "@assets/Logo/tossLogo.png";
import kakaoPayImg from "@assets/Logo/kakaoLogo.png";
import { VscCircleLarge } from "react-icons/vsc";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";

const PurchaseIng = () => {
  const userData = useSelector((state) => state.userR.userData);
  const storeDataAll = useSelector((state) => state.storeR.storeData);

  const usageData = userData.usage;
  const storeData = storeDataAll.find(
    (store) => store.UUID === userData.usage.storeUUID
  );

  const [selectedPayment, setSelectedPayment] = useState("point");
  const navi = useNavigate();
  const location = useLocation();

  return (
    <FullBox sx={{ height: "100%", overflowY: "auto", position: "relative" }}>
      <HeaderInner fixed={true}>결제</HeaderInner>
      <InBox justifySelf="center">
        {/* 이용 내역 */}
        <Box sx={styles.section}>
          <TextHeader4 weight="Bold" color="Black.main">
            이용 내역
          </TextHeader4>
          <Box sx={styles.storeInfo}>
            <Box
              component="img"
              src={storeData.imgURL[0]}
              alt={storeData.name}
              sx={styles.storeImage}
            />
            <Box>
              <TextBodyLarge weight="Bold" mb={1}>
                {storeData.name}
              </TextBodyLarge>
              <TextBody color="Gray.c400">{storeData.insta}</TextBody>
            </Box>
          </Box>
        </Box>
      </InBox>
      <Boxs variant="SecctionLine" />
      <InBox justifySelf="center">
        {/* 결제 금액 */}
        <Box sx={styles.section}>
          <Box sx={styles.amountRow} mb={1}>
            <TextHeader4 weight="Bold" color="Black">
              결제 금액
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
        {/* 결제 수단 */}
        <Box sx={styles.section}>
          <TextHeader4 color="Black" weight="Bold">
            결제 수단
          </TextHeader4>
          <Box sx={styles.paymentMethod}>
            <Box
              sx={styles.methodItem}
              onClick={() => setSelectedPayment("point")}
            >
              <Box display="flex" alignItems="center" gap={1.5}>
                {selectedPayment === "point" ? (
                  <BsFillRecordCircleFill
                    color={theme.palette.PrimaryBrand.main}
                    size={20}
                  />
                ) : (
                  <VscCircleLarge size={20} color={theme.palette.Gray.c400} />
                )}
                <TextBodyLarge display="inline-flex">
                  포인트 결제{" "}
                  <TextBodySmall
                    component="span"
                    weight="Bold"
                    display="inline"
                    bgcolor="PrimaryBrand.Pale"
                    padding="4px 8px"
                    color="PrimaryBrand.main"
                    borderRadius="40px"
                    alignSelf="center"
                  >
                    +7.5% 추가적립
                  </TextBodySmall>
                </TextBodyLarge>
                <Boxs variant="EmptyBox" />
              </Box>
              <TextBodySmall sx={{ justifySelf: "flex-end" }}>
                내 포인트 : 13,000원
              </TextBodySmall>
            </Box>
            <Box
              sx={styles.methodItem}
              onClick={() => setSelectedPayment("tosspay")}
            >
              {selectedPayment === "tosspay" ? (
                <BsFillRecordCircleFill
                  color={theme.palette.PrimaryBrand.main}
                  size={20}
                />
              ) : (
                <VscCircleLarge size={20} color={theme.palette.Gray.c400} />
              )}
              <Box display="flex" alignItems="center" gap={1}>
                <Box component="img" src={tossPayImg} alt="토스페이" />
                <TextBodyLarge>토스페이</TextBodyLarge>
              </Box>
            </Box>
            <Box
              sx={styles.methodItem}
              onClick={() => setSelectedPayment("kakaopay")}
            >
              {selectedPayment === "kakaopay" ? (
                <BsFillRecordCircleFill
                  color={theme.palette.PrimaryBrand.main}
                  size={20}
                />
              ) : (
                <VscCircleLarge size={20} color={theme.palette.Gray.c400} />
              )}
              <Box display="flex" alignItems="center" gap={1}>
                <Box component="img" src={kakaoPayImg} alt="카카오페이" />
                <TextBodyLarge>카카오페이</TextBodyLarge>
              </Box>
            </Box>
          </Box>
        </Box>
      </InBox>
      <InBox justifySelf="center">
        {/* 약관 정보 */}
        <Box sx={styles.terms}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "Gray.c600",
            }}
          >
            <TextBodySmall>서비스 이용약관</TextBodySmall>
            <IoIosArrowForward
              onClick={() => {
                navi(`${location.search}#termsofuse`);
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "Gray.c600",
            }}
          >
            <TextBodySmall>취소 및 환불 규칙</TextBodySmall>
            <IoIosArrowForward
              onClick={() => {
                navi(`${location.search}#refundrule`);
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "Gray.c600",
            }}
          >
            <TextBodySmall>개인정보 처리방침</TextBodySmall>
            <IoIosArrowForward
              onClick={() => {
                navi(`${location.search}#privacypolicy`);
              }}
            />
          </Box>
          <TextBodySmall mt={1} color="Gray.c400">
            레스틴(Restin)은 통신판매 중개자로서 통신판매의 당사자가 아니며
            상품의 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게
            있습니다.
          </TextBodySmall>
          <TextBodySmall
            textAlign="center"
            marginTop={1}
            mb={8}
            color="Gray.c400"
          >
            위 내용을 확인하였으며 결제에 동의합니다
          </TextBodySmall>
        </Box>
      </InBox>

      {/* 결제하기 버튼 */}
      <InBox justifySelf="center">
        <DefaultBtn fixed={true} onClick={() => console.log("결제 진행")}>
          결제하기
        </DefaultBtn>
      </InBox>
    </FullBox>
  );
};

const styles = {
  section: {
    padding: "24px 0px",
  },
  storeInfo: {
    display: "flex",
    alignItems: "center",
    mt: 2,
    gap: 1.5,
  },
  storeImage: {
    width: 64,
    height: 64,
    borderRadius: "10px",
    objectFit: "cover",
  },
  amountRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mt: 1.5,
  },
  paymentMethod: {
    mt: 2,
    display: "flex",
    flexDirection: "column",
    // gap: 1.5,
  },
  methodItem: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    pt: 1,
    pb: 1,
    borderRadius: 1,
  },
  methodIcon: {
    width: 24,
    height: 24,
    borderRadius: "50%",
  },
  terms: {
    // pt: 2.5,
    pb: 2.5,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: 1,
    textAlign: "left",
  },
};

export default PurchaseIng;
