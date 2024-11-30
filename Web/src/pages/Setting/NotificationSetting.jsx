import React from "react";
import HeaderInner from "../../components/common/HeaderInner";
import FullBox from "../../components/common/FullBox";
import { TextBodyLarge } from "../../components/designGuide";
import { Page } from "../../components/Page";
import InBox from "../../components/common/InBox";
import { IOSSwitch } from "../../components/common/Switch_IOS";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const NotificationSetting = () => {
  const navi = useNavigate();
  return (
    <Page>
      <Box
        className="BackgroundImageBlur"
        sx={{
          backgroundColor: "MainBackground.main",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: "-1",
        }}
      />
      <HeaderInner sx={{ fontWeight: 700 }}>알림 설정</HeaderInner>
      <FullBox className="divJCC" sx={{ textAlign: "start" }}>
        <InBox sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextBodyLarge sx={{ fontWeight: "bold" }} color="Black">
            결제 알림
          </TextBodyLarge>
          <IOSSwitch></IOSSwitch>
        </InBox>
      </FullBox>
    </Page>
  );
};

export default NotificationSetting;
