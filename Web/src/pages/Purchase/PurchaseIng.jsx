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
import { useDispatch, useSelector } from "react-redux";
import { BsFillRecordCircleFill } from "react-icons/bs";
import tossPayImg from "@assets/Logo/tossLogo.png";
import kakaoPayImg from "@assets/Logo/kakaoLogo.png";
import { VscCircleLarge } from "react-icons/vsc";
import { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { DialogAlert, DialogOK } from "../../components/common/DialogOk";
import { setuserData } from "@store/modules/userSlice";
import { sendMessageToRN } from "../../api/RN/RNsend";
import { v4 as uuidv4 } from "uuid";

//다른 결제 페이지를 만들어야 한다면, 먼저 서버에 purchaseTicket(임시)를 만들고
// 음 url/purchase?ticket=~~ 방식으로 접근 해서 티켓 데이터를 받아오는건 어떨까?
// 티켓이 일정시간 이상 결제안되면 삭제시켜버리고 ㅇㅇ

const PurchaseIng = () => {
  const userData = useSelector((state) => state.userR.userData);
  const storeDataAll = useSelector((state) => state.storeR.storeData);
  const auth_token = useSelector((state) => state.tokenR.verifiToken);
  const usageData = userData.usage;
  const storeData = storeDataAll.find(
    (store) => store.UUID === userData.usage.storeUUID
  );

  const [selectedPayment, setSelectedPayment] = useState("point");
  const [failedReason, setFailedReason] = useState("");

  const navi = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const nextBtnClick = () => {
    if (selectedPayment === "point") {
      if (userData.point.amount < usageData.totalUsagePrice) {
        navi("#pointShortage");
      } else {
        paymentFunction();
      }
    } else {
      paymentFunction();
    }
  };
  const paymentFunction = async () => {
    // dispatch(setLoading(true));
    const portOnePayment = async (data) => {
      const uid = uuidv4();
      sendMessageToRN({
        type: "purchase_portone",
        payload: {
          auth_token,
          data: {
            storeId: import.meta.env.VITE_PORTONE_STORE_ID,
            paymentId: uid,
            orderName: "서비스 이용",
            currency: "CURRENCY_KRW",
            ...data,
          },
        },
      });
    };
    if (selectedPayment === "point") {
      try {
        const res = await fetch(`${import.meta.env.VITE_RESTIN_API}/purchase/usage/point`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${auth_token}`,
          },
        });
        const RESdata = await res.json();
        const data = RESdata.data;
        const New_userData = RESdata.userData;
        if (res.status === 200) {
          dispatch(setuserData(New_userData));
          navi(
            `/purchase/finish?purchaseAmount=${data.purchaseAmount}&usageDurationMinutes=${data.usageDurationMinutes}&selectedPayment=${selectedPayment}`
          );
        } else {
          setFailedReason(
            "결제에 실패하였습니다. 오류일 수 있으니 만약 결제를 완료하신 상태면, 어플을 재부팅 후 확인해주세요"
          );
          console.log(data.message || data.error);
          navi("#failedPurchase");
        }
      } catch (error) {
        setFailedReason("오류가 발생하였습니다.");
        console.error("Error:", error);
        navi("#failedPurchase");
      }
    } else if (selectedPayment === "tosspay") {
      const data = {
        channelKey: import.meta.env.VITE_PORTONE_TOSSPAY_PRODUCTION,
        totalAmount: parseInt(usageData.totalUsagePrice),
        payMethod: "EASY_PAY",
        selectedPayment: "tosspay",
      };
      portOnePayment(data);
    } else if (selectedPayment === "kakaopay") {
      const data = {
        channelKey: import.meta.env.VITE_PORTONE_KAKAOPAY_TEST,
        totalAmount: parseInt(usageData.totalUsagePrice),
        payMethod: "EASY_PAY",
        selectedPayment: "kakaopay",
      };
      portOnePayment(data);
    }
    // dispatch(setLoading(false));
  };
  useEffect(() => {
    // const receiver = platform === ios ? window : document;
    const receiver = async (event) => {
      // const loc = useLocation(); useLocation 값이 왼지는 모르겠으나
      // 처음 참고한 그시점에서 고정되어버림 window사용

      if (typeof window !== "undefined" && window.ReactNativeWebView) {
        const { type, payload } = JSON.parse(event.data);
        if (type === "portone_complete") {
          try {
            const { result, purchaseData } = payload;
            console.log(purchaseData.selectedPayment);
            const res = await fetch(`${import.meta.env.VITE_RESTIN_API}/purchase/usage/portone`, {
              mode: "cors",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth_token}`,
              },
              body: JSON.stringify({
                paymentId: result.paymentId,
                paymentMethod: purchaseData.payMethod,
                selectedPayment: purchaseData.selectedPayment,
              }),
            });
            // if (res.status === 200) {
            //   console.log('결제완료!', result);
            // }
            const RESdata = await res.json();
            const { data, userData: New_userData } = RESdata;
            if (res.status === 200) {
              console.log("portone_complete", data);
              dispatch(setuserData(New_userData));
              navi(
                `/purchase/finish?purchaseAmount=${data.purchaseAmount}&usageDurationMinutes=${data.usageDurationMinutes}&selectedPayment=${purchaseData.selectedPayment}`
              );
            } else {
              setFailedReason(
                "결제에 실패하였습니다. 오류일 수 있으니 만약 결제를 완료하신 상태면, 어플을 재부팅 후 확인해주세요"
              );
              console.log(data.message || data.error);
              navi("#failedPurchase");
            }
          } catch (error) {
            setFailedReason("오류가 발생하였습니다.");
            console.error("Error:", error);
            navi("#failedPurchase");
          }
        }
      }
    };
    window.addEventListener("message", receiver);
    document.addEventListener("message", receiver);
    return () => {
      window.removeEventListener("message", receiver);
      document.removeEventListener("message", receiver);
    };
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
      }}
    >
      <HeaderInner fixed={true} backTo="/app/home">
        결제
      </HeaderInner>
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
          {usageData.totalUsagePrice === 0 ? (
            <TextBody color="Gray.c600">
              ㄴ 결제금액이 0원일경우 포인트 결제 선택
            </TextBody>
          ) : null}
          <Box
            sx={{
              ...styles.paymentMethod,
            }}
          >
            <Box
              sx={{
                ...styles.methodItem,
                width: "100%",
                justifyContent: "space-between",
              }}
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
              <Box sx={{ justifySelf: "flex-end" }}>
                <TextBodySmall>내 포인트</TextBodySmall>
                <TextBodySmall>
                  {String(userData.point.amount).toLocaleString()}원
                </TextBodySmall>
              </Box>
            </Box>
            {usageData.totalUsagePrice === 0 ? null : (
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
                {
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      component="img"
                      src={tossPayImg}
                      alt="토스페이"
                      height="20px"
                    />
                    <TextBodyLarge>토스페이</TextBodyLarge>
                  </Box>
                }
              </Box>
            )}
            {/* <Box
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
                <Box
                  component="img"
                  src={kakaoPayImg}
                  alt="카카오페이"
                  height="20px"
                />
                <TextBodyLarge>카카오페이</TextBodyLarge>
              </Box>
            </Box> */}
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
        <DefaultBtn fixed={true} onClick={nextBtnClick}>
          결제하기
        </DefaultBtn>
      </InBox>
      <DialogOK
        open="pointShortage"
        h2="포인트가 부족해요"
        text={`충전 후 결제할까요?`}
        isok={() => {
          navi("/point/charge", { replace: true });
        }}
      />
      <DialogAlert open="failedPurchase" h2="결제 실패">
        {failedReason}
      </DialogAlert>
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
