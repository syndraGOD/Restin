/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { Page } from "../../../components/Page";
import HeaderInner from "../../../components/common/HeaderInner";
import FullBox from "../../../components/common/FullBox";
import { TextBody } from "../../../components/designGuide";
import { IoIosArrowForward } from "react-icons/io";
import InfoBox from "../../../components/common/InfoBox";
import { Box, Button } from "@mui/material";
import InBox from "../../../components/common/InBox";
import { useNavigate } from "react-router-dom";
import NotionLocList from "../../../api/NotionLocList";
import Navigation from "../../../components/common/Navigation";
import { useState } from "react";
import GetNotionJSX from "../../../components/common/NotionPageGet";
import { SettingInfoBox } from "../SettingPage";

const TermsListPage = () => {
  const navi = useNavigate();
  return (
    <Page sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        className="BackgroundImageBlur"
        sx={{
          backgroundColor: "White.main",
        }}
        css={css`
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: -1;
        `}
      />
      <HeaderInner>서비스 약관</HeaderInner>

      <FullBox
        className="divJCC"
        sx={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <InBox>
          <SettingInfoBox
            onClick={() => {
              navi("#termsofuse");
            }}
          >
            서비스 이용약관
          </SettingInfoBox>
          <SettingInfoBox
            onClick={() => {
              navi("#privacypolicy");
            }}
          >
            개인정보 처리방침
          </SettingInfoBox>
          <SettingInfoBox
            onClick={() => {
              navi("#locationinformation");
            }}
          >
            위치정보 이용약관
          </SettingInfoBox>
          <SettingInfoBox
            onClick={() => {
              navi("#otp_marketing");
            }}
          >
            마케팅 수신 동의(선택)
          </SettingInfoBox>
          <SettingInfoBox onClick={() => {}}>버전정보 v1.0</SettingInfoBox>
        </InBox>
        <Box sx={{ flex: 1 }}> </Box>
        <Navigation></Navigation>
      </FullBox>
    </Page>
  );
};

export default TermsListPage;
