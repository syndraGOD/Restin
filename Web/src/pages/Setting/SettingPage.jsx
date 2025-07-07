/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import theme from "../../style/theme";
import React, { useState } from "react";
import { Page } from "../../components/Page";
import FullBox from "../../components/common/FullBox";
import InBox from "../../components/common/InBox";
import InfoBox from "../../components/common/InfoBox";
import { Box, Button } from "@mui/material";
import {
  TextBody,
  TextBodyLarge,
  TextBodySmall,
  TextHeader3,
} from "../../components/designGuide";
import { IoIosArrowForward } from "react-icons/io";
import Navigation from "../../components/common/Navigation";
import { useLocation, useNavigate } from "react-router-dom";
import { BgColorDefault } from "../../components/common/Bg";
import { useDispatch, useSelector } from "react-redux";
import { setuserData } from "../../store/modules/userSlice";
import { setVerifiToken } from "../../store/modules/tokenSlice";
import { DialogOK } from "../../components/common/DialogOk";
import { sendMessageToRN } from "../../api/RN/RNsend";

export const SettingInfoBox = ({ onClick, children }) => {
  return (
    <InfoBox
      css={css`
        margin-top: 0;
      `}
    >
      <Button
        onClick={onClick}
        sx={{
          width: "100%",
          color: "Black.main",
          padding: "14px 0",
          marginTop: 0,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextBodyLarge>{children}</TextBodyLarge>
        <IoIosArrowForward />
      </Button>
    </InfoBox>
  );
};
const SettingPage = () => {
  const newDate = new Date().getTime();
  const navi = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userR.userData);

  const userDeleteId = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/userdata`, {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + userData.security?.auth_token,
        },
      });
      if (res.status === 200) {
        dispatch(setuserData({}));
        dispatch(setVerifiToken(""));
        // navi("/purchase/payment", { state: { item } });
      } else {
        navi(-1);
        const awaitRES = await res.json();
        console.log("회원탈퇴 실패", awaitRES.message);
      }
    } catch (error) {
      navi(-1);
      console.log("front error!", error);
    }
  };
  return (
    <>
      <Page sx={{ display: "flex", flexDirection: "column" }}>
        <BgColorDefault />
        <InBox>
          <Box
            className="TextHeader3Box"
            sx={{
              width: "100%",
              padding: "32px 0 16px 0",
              boxSizing: "border-box",
              textAlign: "start",
            }}
          >
            <TextHeader3 weight="Bold">{userData.profile.nick} 님</TextHeader3>
          </Box>
        </InBox>
        <InBox className="PointInfoBox">
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              padding: "20px 12px",
              bgcolor: "Gray.c100",
              boxSizing: "border-box",
              borderRadius: "16px",
              margin: "16px 0",
              justifyContent: "space-between",
              // text,
            }}
          >
            <TextBodyLarge weight="Bold">
              보유 포인트 {userData.point.amount ? userData.point.amount : 0}원
            </TextBodyLarge>
            <Box display="flex">
              <Box
                sx={{
                  padding: "4px 12px",
                  borderRadius: "12px",
                  //custom
                  bgcolor: "White.main",
                  border: "1px solid",
                  borderColor: "Gray.c400",
                  color: "Gray.c800",
                  mr: 1,
                }}
                onClick={() => {
                  navi("/point/loglist");
                }}
              >
                <TextBody weight="Bold">내역</TextBody>
              </Box>
              <Box
                sx={{
                  padding: "4px 12px",
                  borderRadius: "12px",
                  //custom
                  bgcolor: "PrimaryBrand.main",
                  // border: "1px solid",
                  // borderColor: "Gray.c400",
                  color: "White.main",
                }}
                onClick={() => {
                  navi("/point/charge");
                }}
              >
                <TextBody weight="Bold">충전</TextBody>
              </Box>
            </Box>
          </Box>
        </InBox>
        <FullBox
          sx={{
            alignContent: "center",
            flexDirection: "column",
            textAlign: "center",
            flex: 1,
            overflowY: "auto",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "start", //inbox scroll page는 start해줘야함
            // a: 1,
            // a: 1,
          }}
        >
          <InBox>
            <SettingInfoBox
              onClick={() => {
                navi("/myInfo/userinfomodify");
              }}
            >
              내 정보 수정
            </SettingInfoBox>
            {/* <SettingInfoBox
              onClick={() => {
                navi("/myInfo/notifi");
              }}
            >
              알림 설정
            </SettingInfoBox> */}
            <SettingInfoBox
              onClick={() => {
                navi("#announce");
              }}
            >
              공지사항
            </SettingInfoBox>
            <SettingInfoBox
              onClick={() => {
                navi("#faq");
              }}
            >
              자주 묻는 질문
            </SettingInfoBox>
            <SettingInfoBox
              onClick={() => {
                // navi("/myInfo/kakaochannel");
                sendMessageToRN({
                  type: "addkakaofriend",
                  payload: {},
                });
                // Kakao.Channel.addChannel({
                //   channelPublicId: "_xexnIln",
                // });
              }}
            >
              1:1 채팅 상담 (10:00~19:00)
            </SettingInfoBox>
            <SettingInfoBox
              onClick={() => {
                navi("/myInfo/termsList");
              }}
            >
              서비스 약관
            </SettingInfoBox>
            <SettingInfoBox
              onClick={() => {
                // setlogoutDialog(true);
                navi("#logout");
              }}
            >
              로그아웃
            </SettingInfoBox>

            <SettingInfoBox
              onClick={() => {
                // setdeleteUserIdDialog(true);
                navi("#deleteId");
              }}
            >
              회원탈퇴
            </SettingInfoBox>
            {
              (process.env.NODE_ENV === 'production' && userData?.ADMIN_FG === 'Y') && 
              <>
                <SettingInfoBox
                  css={css`
                    margin-top: 50px;
                    background-color: ${theme.palette.PrimaryBrand.main};
                    color: ${theme.palette.White.main};
                  `}
                  onClick={() => {
                    // setdeleteUserIdDialog(true);
                    // navi("#deleteId");
                    window.location.href = "https://dev.restin.co.kr/app/home?t=" + newDate;
                  }}
                >
                  데브 접속
                </SettingInfoBox>

                <SettingInfoBox
                  css={css`
                    background-color: ${theme.palette.PrimaryBrand.main};
                    color: ${theme.palette.White.main};
                  `}
                  onClick={() => {
                    // setdeleteUserIdDialog(true);
                    // navi("#deleteId");
                    // window.location.href = "https://restin.co.kr/admin";
                  }}
                >
                  관리자 센터
                </SettingInfoBox>
              </>
            }
          </InBox>
          <Box bgcolor="Gray.c200" width={"100%"} height="5px" mt={2}>
            {" "}
          </Box>
          <InBox
            sx={{ textAlign: "start", pt: 2, pb: 4, boxSizing: "border-box" }}
          >
            <TextBody color="Black.main" sx={{ padding: "0.5em 0" }}>
              사업자 정보
            </TextBody>
            <TextBodySmall color="Gray.c600">
              상호명 : 레스틴(Restin) | 대표 김정민
            </TextBodySmall>
            <TextBodySmall color="Gray.c600">
              사업자등록번호 : 768-17-02378
            </TextBodySmall>
            <TextBodySmall color="Gray.c600">
              통신판매업신고 : 제 2024-별내-2106 호
            </TextBodySmall>
            <TextBodySmall color="Gray.c600">
              당사는 서울보증보험에 가입된 회사입니다
            </TextBodySmall>
            <TextBodySmall color="Gray.c600"> </TextBodySmall>
            <TextBodySmall color="Gray.c600">
              주소 : 경기도 남양주시 별내3로 322
            </TextBodySmall>
            <TextBodySmall color="Gray.c600">
              메일 : corporationrestin@naver.com
            </TextBodySmall>
            <TextBodySmall color="Gray.c600">
              고객센터 : 070-8095-9289 (10:00~19:00)
            </TextBodySmall>
            <TextBodySmall color="Gray.c600"> </TextBodySmall>
            <TextBodySmall color="Gray.c600">v1.06</TextBodySmall>
          </InBox>
        </FullBox>

        <Navigation select={"info"}></Navigation>
      </Page>

      {/* dialog */}
      <DialogOK
        open="logout"
        h2="로그아웃"
        text="로그아웃 할까요?"
        isok={() => {
          dispatch(setuserData({}));
          dispatch(setVerifiToken(""));
        }}
      ></DialogOK>
      <DialogOK
        open="deleteId"
        h2="회원 탈퇴하기"
        text={`탈퇴 버튼 선택 시, 계정은\n삭제되며 복구되지 않습니다.`}
        isok={userDeleteId}
      ></DialogOK>
    </>
  );
};

export default SettingPage;
