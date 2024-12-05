import FullBox from "../../../components/common/FullBox";
import HeaderInner from "../../../components/common/HeaderInner";
import InBox from "../../../components/common/InBox";
import { Page } from "../../../components/Page";
import kakaoimg from "./KakaoCsGuide.png";

export const KakaoChannelGuide = () => {
  return (
    <Page>
      <FullBox>
        <HeaderInner>1:1 채팅상담</HeaderInner>
        <InBox justifySelf="center">
          <img src={kakaoimg} width={"100%"} />
        </InBox>
      </FullBox>
    </Page>
  );
};

export default KakaoChannelGuide;
