/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import FullBox from "@components/common/FullBox";
import HeaderInner from "@components/common/HeaderInner";
import { TextHeader2 } from "@components/designGuide";
import InBox from "@components/common/InBox";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import theme from "../../../style/theme";
import { DefaultBtn } from "@components/common/Btns";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InfoBox from "../../../components/common/InfoBox";
import { TextBold } from "../../../components/designGuide";
import { IoIosArrowForward } from "react-icons/io";
import { BgColorDefault } from "../../../components/common/Bg";
import NotionLocList from "../../../api/NotionLocList";
import { restinAPI } from "../../../api/config";
import { useDispatch, useSelector } from "react-redux";
import { setuserData } from "../../../store/modules/userSlice";
import DialogPage from "../../../components/common/DialogPage";
import GetNotionJSX from "../../../components/common/NotionPageGet";

const UseAgree = () => {
  const location = useLocation();
  const profile = location.state || {};
  const navi = useNavigate();
  const [inputRef1, setInputRef1] = useState(false);
  const [inputRef2, setInputRef2] = useState(false);
  const [inputRef3, setInputRef3] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [dialogText, setDialogText] = useState();
  const [dialogH2, setDialogH2] = useState();
  const SetDialogPage = ({ text, h2 }) => {
    setDialogText(text);
    setDialogH2(h2);
    setDialog(true);
  };
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userR.userData);

  useEffect(() => {
    console.log("후", userData);
  }, [userData]);

  const nextBtnClcik = async () => {
    const res = await fetch(`${restinAPI}/auth/register`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });
    if (res.status === 200) {
      const { message, user, newToken } = await res.json();
      dispatch(setuserData(user.data));
      //userState에 연결
      navi("/app/home");
    } else {
      console.log(error);
    }
  };
  return (
    <FullBox sx={{ height: "100%" }}>
      <BgColorDefault />
      <FullBox className="divJCC" sx={{ height: "100%", display: "flex" }}>
        <HeaderInner></HeaderInner>
        <InBox sx={{ textAlign: "start", display: "flex" }}>
          <TextHeader2 color="InfoDark" width={"100%"}>
            {profile.nick}님
            <br />
            환영합니다!
          </TextHeader2>
        </InBox>
        <Box className="EmptyBox" sx={{ width: "100%", flex: 1 }}></Box>
        <InBox
          css={css`
            background-color: ${theme.palette.InfoLight.main};
            border-radius: 18px;
            padding: 12px;
            box-sizing: border-box;
            margin-bottom: 10vw;
          `}
        >
          <InfoBox
            css={css`
              padding: 0;
              margin: 0;
            `}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  checked={inputRef1}
                  onChange={(e) => {
                    setInputRef1(e.target.checked);
                  }}
                />
                <TextBold
                  onClick={() => {
                    SetDialogPage({
                      text: <GetNotionJSX loc={NotionLocList.termsofuse} />,
                      h2: "",
                    });
                  }}
                  color="InfoDark"
                >
                  (필수) 서비스 이용 약관
                </TextBold>
              </Box>
              <Button
                className="NotionButton"
                css={css`
                  padding: 5px;
                  min-width: 0px;
                `}
                onClick={() => {
                  SetDialogPage({
                    text: <GetNotionJSX loc={NotionLocList.termsofuse} />,
                    h2: "",
                  });
                }}
              >
                <IoIosArrowForward />
              </Button>
            </Box>
          </InfoBox>
          <InfoBox
            css={css`
              padding: 0;
              margin: 0;
            `}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  checked={inputRef2}
                  onChange={(e) => {
                    setInputRef2(e.target.checked);
                  }}
                />
                <TextBold
                  onClick={() => {
                    SetDialogPage({
                      text: <GetNotionJSX loc={NotionLocList.privacypolicy} />,
                      h2: "",
                    });
                  }}
                  color="InfoDark"
                >
                  (필수) 개인정보 이용 방침
                </TextBold>
              </Box>
              <Button
                className="NotionButton"
                css={css`
                  padding: 5px;
                  min-width: 0px;
                `}
                onClick={() => {
                  SetDialogPage({
                    text: <GetNotionJSX loc={NotionLocList.privacypolicy} />,
                    h2: "",
                  });
                }}
              >
                <IoIosArrowForward />
              </Button>
            </Box>
          </InfoBox>
          <InfoBox
            css={css`
              padding: 0;
              margin: 0;
            `}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  checked={inputRef3}
                  onChange={(e) => {
                    setInputRef3(e.target.checked);
                  }}
                />
                <TextBold
                  onClick={() => {
                    SetDialogPage({
                      text: (
                        <GetNotionJSX loc={NotionLocList.locationinformation} />
                      ),
                      h2: "",
                    });
                  }}
                  color="InfoDark"
                >
                  (필수) 위치정보 수집 동의
                </TextBold>
              </Box>
              <Button
                className="NotionButton"
                css={css`
                  padding: 5px;
                  min-width: 0px;
                `}
                onClick={() => {
                  SetDialogPage({
                    text: (
                      <GetNotionJSX loc={NotionLocList.locationinformation} />
                    ),
                    h2: "",
                  });
                }}
              >
                <IoIosArrowForward />
              </Button>
            </Box>
          </InfoBox>
        </InBox>
        <InBox>
          {inputRef1 && inputRef2 && inputRef3 ? (
            <DefaultBtn onClick={nextBtnClcik}>시작하기</DefaultBtn>
          ) : (
            <DefaultBtn
              onClick={() => {
                setInputRef1(true);
                setInputRef2(true);
                setInputRef3(true);
              }}
            >
              모두 동의하기
            </DefaultBtn>
          )}
        </InBox>
      </FullBox>
      <DialogPage
        state={dialog}
        onClose={() => {
          setDialog(false);
        }}
        h2={dialogH2}
      >
        {dialogText}
      </DialogPage>
    </FullBox>
  );
};

export default UseAgree;
