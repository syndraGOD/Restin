/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { Page } from "../../../components/Page";
import HeaderInner from "../../../components/common/HeaderInner";
import FullBox from "../../../components/common/FullBox";
import { TextBody, TextBold } from "../../../components/designGuide";
import { IoIosArrowForward } from "react-icons/io";
import InfoBox from "../../../components/common/InfoBox";
import { Box, Button } from "@mui/material";
import InBox from "../../../components/common/InBox";
import { useNavigate } from "react-router-dom";
import NotionLocList from "../../../api/NotionLocList";
import Navigation from "../../../components/common/Navigation";
import { useState } from "react";
import GetNotionJSX from "../../../components/common/NotionPageGet";
import DialogPage from "../../../components/common/DialogPage";

const TermsListPage = () => {
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
    <Page sx={{ display: "flex", flexDirection: "column" }}>
      <DialogPage
        state={dialog}
        onClose={() => {
          setDialog(false);
        }}
        h2={dialogH2}
      >
        {dialogText}
      </DialogPage>
      <Box
        className="BackgroundImageBlur"
        sx={{
          backgroundColor: "MainBackground.main",
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
          <InfoBox>
            <Button
              onClick={() => {
                SetDialogPage({
                  text: <GetNotionJSX loc={NotionLocList.termsofuse} />,
                  h2: "",
                });
              }}
            >
              <TextBold color="InfoDark">서비스 이용약관</TextBold>
              <IoIosArrowForward />
            </Button>
            <Button
              onClick={() => {
                SetDialogPage({
                  text: <GetNotionJSX loc={NotionLocList.privacypolicy} />,
                  h2: "",
                });
              }}
            >
              <TextBold color="InfoDark">개인정보 처리방침</TextBold>
              <IoIosArrowForward />
            </Button>
            <Button
              onClick={() => {
                SetDialogPage({
                  text: (
                    <GetNotionJSX loc={NotionLocList.locationinformation} />
                  ),
                  h2: "",
                });
              }}
            >
              <TextBold color="InfoDark">위치정보 이용약관</TextBold>
              <IoIosArrowForward />
            </Button>
            <Button>
              <TextBold color="InfoDark">버전정보</TextBold>
              <TextBody color="InfoDark">v1.0</TextBody>
            </Button>
          </InfoBox>
        </InBox>
        <Box sx={{ flex: 1 }}> </Box>
        <Navigation></Navigation>
      </FullBox>
    </Page>
  );
};

export default TermsListPage;
