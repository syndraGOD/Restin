/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import FullBox from "@components/common/FullBox";
import HeaderInner from "@components/common/HeaderInner";
import { TextBody, TextHeader2 } from "@components/designGuide";
import InBox from "@components/common/InBox";
import { Box, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import theme from "../../../style/theme";
import { DefaultBtn } from "@components/common/Btns";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InfoBox from "../../../components/common/InfoBox";
import { IoIosArrowForward } from "react-icons/io";
import { BgColorDefault } from "../../../components/common/Bg";
import NotionLocList from "../../../api/NotionLocList";
import { restinAPI } from "../../../api/config";
import { useDispatch, useSelector } from "react-redux";
import { setuserData } from "../../../store/modules/userSlice";
import GetNotionJSX from "../../../components/common/NotionPageGet";
import { setVerifiToken } from "../../../store/modules/tokenSlice";
import { CheckBox } from "@mui/icons-material";
import { TextBox_header2 } from "../../../components/common/TextBox";
import { BiSquareRounded } from "react-icons/bi";

const UseAgree = () => {
  const location = useLocation();
  const profile = location.state || {};
  const navi = useNavigate();
  const [inputRef1, setInputRef1] = useState(false);
  const [inputRef2, setInputRef2] = useState(false);
  const [inputRef3, setInputRef3] = useState(false);
  const [inputRef4, setInputRef4] = useState(false);
  const dispatch = useDispatch();

  const nextBtnClick = async () => {
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
      dispatch(setVerifiToken(user.data.security.auth_token));
      //userState에 연결
      navi("/app/home");
    } else {
      console.log(error);
    }
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <FullBox sx={{ height: "100%" }}>
      <BgColorDefault />
      <FullBox
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <HeaderInner></HeaderInner>

        <TextBox_header2>
          {profile.nick}님
          <br />
          환영합니다!
        </TextBox_header2>
        <Box className="EmptyBox" sx={{ width: "100%", flex: 1 }}></Box>
        <InBox
          css={css`
            background-color: ${theme.palette.Gray.c100};
            border-radius: 20px;
            padding: 20px 24px;
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
                  icon={<BiSquareRounded size="26px" />}
                  checked={inputRef1}
                  onChange={(e) => {
                    setInputRef1(e.target.checked);
                  }}
                ></Checkbox>

                <TextBody
                  onClick={() => {
                    navi("#termsofuse");
                  }}
                  color="Gray.c900"
                >
                  {"   "}
                  (필수) 서비스 이용 약관
                </TextBody>
              </Box>
              <Button
                className="NotionButton"
                css={css`
                  padding: 5px;
                  min-width: 0px;
                `}
                onClick={() => {
                  navi("#termsofuse");
                }}
              >
                <IoIosArrowForward color={theme.palette.Black.main} />
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
                  icon={<BiSquareRounded size="26px" />}
                  checked={inputRef2}
                  onChange={(e) => {
                    setInputRef2(e.target.checked);
                  }}
                />
                <TextBody
                  onClick={() => {
                    navi("#privacypolicy");
                  }}
                  color="Gray.c900"
                >
                  {"   "}
                  (필수) 개인정보 처리 방침
                </TextBody>
              </Box>
              <Button
                className="NotionButton"
                css={css`
                  padding: 5px;
                  min-width: 0px;
                `}
                onClick={() => {
                  navi("#privacypolicy");
                }}
              >
                <IoIosArrowForward color={theme.palette.Black.main} />
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
                  icon={<BiSquareRounded size="26px" />}
                  checked={inputRef3}
                  onChange={(e) => {
                    setInputRef3(e.target.checked);
                  }}
                />
                <TextBody
                  onClick={() => {
                    navi("#locationinformation");
                  }}
                  color="Gray.c900"
                >
                  {"   "}
                  (필수) 위치정보 이용약관
                </TextBody>
              </Box>
              <Button
                className="NotionButton"
                css={css`
                  padding: 5px;
                  min-width: 0px;
                `}
                onClick={() => {
                  navi("#locationinformation");
                }}
              >
                <IoIosArrowForward color={theme.palette.Black.main} />
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
                  icon={<BiSquareRounded size="26px" />}
                  checked={inputRef4}
                  onChange={(e) => {
                    setInputRef4(e.target.checked);
                  }}
                />
                <TextBody
                  onClick={() => {
                    navi("#otp_marketing");
                  }}
                  color="Gray.c900"
                >
                  {"   "}
                  (선택) 마케팅 수신 동의
                </TextBody>
              </Box>
              <Button
                className="NotionButton"
                css={css`
                  padding: 5px;
                  min-width: 0px;
                `}
                onClick={() => {
                  navi("#otp_marketing");
                }}
              >
                <IoIosArrowForward color={theme.palette.Black.main} />
              </Button>
            </Box>
          </InfoBox>
        </InBox>
        <InBox>
          {inputRef1 && inputRef2 && inputRef3 ? (
            <DefaultBtn onClick={nextBtnClick}>확인</DefaultBtn>
          ) : (
            <DefaultBtn
              onClick={() => {
                setInputRef1(true);
                setInputRef2(true);
                setInputRef3(true);
                setInputRef4(true);
              }}
            >
              모두 동의하기
            </DefaultBtn>
          )}
        </InBox>
      </FullBox>
    </FullBox>
  );
};

export default UseAgree;
