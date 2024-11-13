/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import theme from "../../style/theme";
import React, { useState } from "react";
import { Page } from "../../components/Page";
import HeaderText from "../../components/common/HeaderText";
import FullBox from "../../components/common/FullBox";
import InBox from "../../components/common/InBox";
import InfoBox from "../../components/common/InfoBox";
import { Box, Button } from "@mui/material";
import {
  TextBody,
  TextBodySmall,
  TextBold,
} from "../../components/designGuide";
import { IoIosArrowForward } from "react-icons/io";
import Navigation from "../../components/common/Navigation";
import TermsListPage from "./TermsOfUse/TermsListPage";
import { useNavigate } from "react-router-dom";
import NotionLocList from "../../api/NotionLocList";
import { BgColorDefault } from "../../components/common/Bg";
import DialogPage from "../../components/common/DialogPage";
import GetNotionJSX from "../../components/common/NotionPageGet";

const SettingPage = () => {
  const navi = useNavigate();
  const [dialog, setDialog] = useState(false);
  const [dialogText, setDialogText] = useState();
  const [dialogH2, setDialogH2] = useState();
  const SetDialogPage = ({ text, h2 }) => {
    setDialogText(text);
    setDialogH2(h2);
    setDialog(true);
  };
  return (
    <>
      <DialogPage
        state={dialog}
        onClose={() => {
          setDialog(false);
        }}
        h2={dialogH2}
      >
        {dialogText}
      </DialogPage>
      <Page sx={{ display: "flex", flexDirection: "column" }}>
        <BgColorDefault />
        <HeaderText sx={{ mb: 2 }}>설정</HeaderText>
        <FullBox className="divJCC" sx={{ flex: 1 }}>
          <InBox sx={{ flex: 1 }}>
            <InfoBox>
              <Button
                onClick={() => {
                  navi("/myInfo/notifi");
                }}
              >
                <TextBold color="InfoDark">알림 설정</TextBold>
                <IoIosArrowForward />
              </Button>
            </InfoBox>
            <InfoBox>
              <Button
                onClick={() => {
                  SetDialogPage({
                    text: <GetNotionJSX loc={NotionLocList.announce} />,
                    h2: "",
                  });
                  // navi(`/notionPage/${NotionLocList.announce}`);
                }}
              >
                <TextBold color="InfoDark">공지 사항</TextBold>
                <IoIosArrowForward />
              </Button>
              <Button
                onClick={() => {
                  SetDialogPage({
                    text: <GetNotionJSX loc={NotionLocList.faq} />,
                    h2: "",
                  });
                }}
              >
                <TextBold color="InfoDark">자주 묻는 질문</TextBold>
                <IoIosArrowForward />
              </Button>
              <Button>
                <TextBold color="InfoDark">
                  1:1 채팅 상담 (10:00 ~ 19:00)
                </TextBold>
                <IoIosArrowForward />
              </Button>
            </InfoBox>
            <InfoBox>
              <Button
                onClick={() => {
                  navi("/myInfo/termsList");
                }}
              >
                <TextBold color="InfoDark">서비스 약관</TextBold>
                <IoIosArrowForward />
              </Button>
            </InfoBox>
          </InBox>
          <InBox sx={{ textAlign: "start", p: 4 }}>
            <TextBold color="MainText" sx={{ padding: "0.5em 0" }}>
              사업자 정보
            </TextBold>
            <TextBodySmall color="SubText">상호명 : 레스틴</TextBodySmall>
            <TextBodySmall color="SubText">대표자 : 김정민</TextBodySmall>
            <TextBodySmall color="SubText">
              사업자등록번호 : 768-17-02378
            </TextBodySmall>
            <TextBodySmall color="SubText">통신판매업신고 : </TextBodySmall>
            <TextBodySmall color="SubText">
              주소 : 경기도 남양주시 별내3로 322
            </TextBodySmall>
            <TextBodySmall color="SubText">
              메일 : corporationrestin@naver.com
            </TextBodySmall>
            <TextBodySmall color="SubText">
              고객센터 : 070-8895-9289 (10:00~19:00)
            </TextBodySmall>
          </InBox>
          <Navigation select={"info"}></Navigation>
        </FullBox>
      </Page>
    </>
  );
};

export default SettingPage;
