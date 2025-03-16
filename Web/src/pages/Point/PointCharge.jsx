import { Box } from "@mui/material";
import {
  TextBodyLarge,
  TextHeader4,
  TextBody,
  TextBodySmall,
} from "@components/designGuide";
import FullBox from "@components/common/FullBox";
import HeaderInner from "@components/common/HeaderInner";
import { DefaultBtn } from "@components/common/Btns";
import InBox from "@components/common/InBox";
import { Boxs } from "@components/designGuide";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { VscCircleLarge } from "react-icons/vsc";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoCopyOutline } from "react-icons/io5";
import theme from "@style/theme";
import { sendMessageToRN } from "@api/RN/RNsend";
import { restinAPI } from "../../api/config";
import { useSelector } from "react-redux";
import { DialogAlert, DialogOK } from "../../components/common/DialogOk";

const PointCharge = () => {
  const userData = useSelector((state) => state.userR.userData);
  const auth_token = useSelector((state) => state.tokenR.verifiToken);
  const [selectedAmount, setSelectedAmount] = useState(5000);

  const [failedReason, setFailedReason] = useState("");
  const navi = useNavigate();
  const location = useLocation();

  const chargeAmounts = [
    { amount: 5000, reward: 0 },
    { amount: 10000, reward: 3 },
    { amount: 30000, reward: 5 },
    { amount: 50000, reward: 6 },
    { amount: 100000, reward: 7.5 },
  ];

  const pointChargeRequest = async () => {
    try {
      const res = await fetch(`${restinAPI}/point/request/charge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth_token}`,
        },

        body: JSON.stringify({
          chargeAmount: selectedAmount,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        navi("/point/chargecomplete", { replace: true });
      } else if (res.status === 409) {
        console.log("이미 충전중!");
        // navi(-1);
        setFailedReason("이미 처리중인 충전 요청이 있습니다.");
        navi("#failedPurchase", { replace: true });
      } else {
        console.log(data.error);
        navi(-1);
      }
    } catch (err) {
      console.log(err);
      navi(-1);
    }
  };
  const copyAccountNumber = () => {
    sendMessageToRN({
      type: "copy",
      payload: {
        text: "754237-04-024208",
      },
    });
  };

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
      <HeaderInner fixed={true}>포인트 충전 신청</HeaderInner>
      <InBox justifySelf="center">
        <Box sx={styles.section}>
          <TextHeader4 weight="Bold" color="Black.main" mb={1}>
            충전 금액을 선택해 주세요
          </TextHeader4>
          <TextBody color="Gray.c600">
            보유중인 포인트 : {userData.point.amount}원
          </TextBody>

          {chargeAmounts.map((item) => (
            <Box
              key={item.amount}
              sx={styles.amountItem}
              onClick={() => setSelectedAmount(item.amount)}
            >
              {selectedAmount === item.amount ? (
                <BsFillRecordCircleFill
                  color={theme.palette.PrimaryBrand.main}
                  size={20}
                />
              ) : (
                <VscCircleLarge size={20} color={theme.palette.Gray.c400} />
              )}
              <TextBodyLarge color="Black.main">
                {item.amount.toLocaleString()}원
              </TextBodyLarge>
              {item.reward > 0 && (
                <TextBodySmall
                  component="span"
                  weight="Bold"
                  bgcolor="PrimaryBrand.Pale"
                  padding="4px 8px"
                  color="PrimaryBrand.main"
                  borderRadius="40px"
                >
                  +{item.reward}% 리워드
                </TextBodySmall>
              )}
            </Box>
          ))}
        </Box>
      </InBox>

      <Boxs variant="SecctionLine" />

      <InBox justifySelf="center">
        <Box sx={styles.section}>
          <TextHeader4 weight="Bold" color="Black.main" mb={2}>
            결제 수단
          </TextHeader4>
          <Box sx={styles.paymentMethod}>
            <BsFillRecordCircleFill
              color={theme.palette.PrimaryBrand.main}
              size={20}
            />
            <TextBodyLarge>무통장 입금</TextBodyLarge>
          </Box>
        </Box>
      </InBox>

      <InBox justifySelf="center">
        <Box sx={styles.section}>
          <TextHeader4 weight="Bold" color="Black.main" mb={2}>
            무통장 입금 안내
          </TextHeader4>
          <Box sx={styles.accountInfo}>
            <TextBodyLarge color="Black.main" weight="Bold" display="inline">
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
              <TextBodyLarge color="Gray.c600">
                김정민 (레스틴Restin)
              </TextBodyLarge>
            </Box>
          </Box>
        </Box>
      </InBox>

      <InBox justifySelf="center">
        <Box sx={styles.terms}>
          <Box
            sx={styles.termItem}
            onClick={() => navi(`${location.search}#termsofuse`)}
          >
            <TextBodySmall color="Gray.c600">서비스 이용약관</TextBodySmall>
            <IoIosArrowForward color={theme.palette.Gray.c600} />
          </Box>
          <Box
            sx={styles.termItem}
            onClick={() => navi(`${location.search}#refundrule`)}
          >
            <TextBodySmall color="Gray.c600">취소 및 환불 규칙</TextBodySmall>
            <IoIosArrowForward color={theme.palette.Gray.c600} />
          </Box>
          <Box
            sx={styles.termItem}
            onClick={() => navi(`${location.search}#privacypolicy`)}
          >
            <TextBodySmall color="Gray.c600">개인정보 처리방침</TextBodySmall>
            <IoIosArrowForward color={theme.palette.Gray.c600} />
          </Box>
          <Box
            sx={styles.termItem}
            onClick={() => navi(`${location.search}#pointterms`)}
          >
            <TextBodySmall color="Gray.c600">포인트 이용약관</TextBodySmall>
            <IoIosArrowForward color={theme.palette.Gray.c600} />
          </Box>

          <TextBodySmall mt={2} color="Gray.c400">
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

      <InBox justifySelf="center">
        <DefaultBtn
          fixed={true}
          onClick={() => {
            navi("#isRequest");
          }}
        >
          포인트 충전 신청하기
        </DefaultBtn>
      </InBox>
      <DialogOK
        open="isRequest"
        h2="포인트 충전 신청"
        text={`${selectedAmount.toLocaleString()}원 충전 신청하시겠어요?`}
        isok={pointChargeRequest}
      />

      <DialogAlert open="failedPurchase" h2="요청 실패">
        {failedReason}
      </DialogAlert>
    </FullBox>
  );
};

const styles = {
  section: {
    padding: "24px 0px",
  },
  amountItem: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    padding: "16px 0",
    cursor: "pointer",
  },
  paymentMethod: {
    display: "flex",
    alignItems: "center",
    gap: 2,
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
  terms: {
    padding: "24px 0",
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  termItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
};

export default PointCharge;
