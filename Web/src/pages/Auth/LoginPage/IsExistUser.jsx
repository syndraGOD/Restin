/** @jsxImportSource @emotion/react */
import FullBox from "@components/common/FullBox";
import HeaderInner from "@components/common/HeaderInner";
import { TextBody, TextBodySmall, TextHeader2 } from "@components/designGuide";
import { Page } from "@components/Page";
import InBox from "@components/common/InBox";
import { Box, Button, Input, InputAdornment, TextField } from "@mui/material";
import theme from "../../../style/theme";
import { css } from "@emotion/react";
import { DefaultBtn } from "@components/common/Btns";
import { useEffect, useRef, useState } from "react";
import { RxChatBubble } from "react-icons/rx";
import { Form, useNavigate } from "react-router-dom";
import { TextBold } from "../../../components/designGuide";
import { BgColorDefault } from "../../../components/common/Bg";
import { restinAPI } from "../../../api/config";
import { setuserData } from "../../../store/modules/userSlice";
import { useDispatch } from "react-redux";
import { setVerifiToken } from "../../../store/modules/tokenSlice";

const IsExistUser = () => {
  const dispatch = useDispatch();
  const navi = useNavigate();
  let [isFirstVerifiCodeSend, setIsFirstVerifiCodeSend] = useState(false);
  const PhoneNumberRef = useRef();
  const verifiRef = useRef();
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [inputVerifiCode, setInputVerifiCode] = useState("");
  const [confirmBtn, setConfirmBtn] = useState(false);
  const [verifiCode, setVerifiCode] = useState();
  const [verifiFail, setVerifiFail] = useState(false);
  //input - number 폼을 실시간 규격화
  const PhoneNumberAutoSpace = (e) => {
    if (e.target.value.replace(/\s/g, "").length < 12) {
      setInputPhoneNumber(
        e.target.value
          .replace(/[^0-9]/g, "")
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1 $2 $3")
          .replace(/\s{1,2}$/g, "")
      );
    }
  };
  //input - 인증번호 폼을 실시간 규격화
  const VerifiCodeInputState = (e) => {
    if (e.target.value.replace(/\s/g, "").length < 7) {
      setInputVerifiCode(e.target.value.replace(/[^0-9]/g, ""));
      if (confirmBtn) {
        setConfirmBtn(false);
      }
    }
    if (e.target.value.replace(/\s/g, "").length === 6) {
      if (!confirmBtn) {
        setConfirmBtn(true);
      }
    }
  };
  //인증번호 검증 / send : smsverify & 인증번호 res.json().verifiCode
  //인증번호가 동일하면 버튼 disables를 비활성화, 보안에 문제있는 방식이긴 하겠지만,
  // 우선은 디자이너 의도에 따라 개발
  const VerifiSendBtnClick = async () => {
    try {
      const phoneNumber = inputPhoneNumber.replaceAll(" ", "");
      const res = await fetch(`${restinAPI}/auth/smsVerify`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
        }),
      });
      const data = await res.json();
      const awaitData = await data.verifiCode;
      setVerifiCode(String(awaitData));
    } catch (error) {
      console.log(error);
    }
    //res = { message, verifiCode }
    setIsFirstVerifiCodeSend(true);
    verifiRef.current.focus();
  };

  //다음페이지로 넘어가기
  //가입 번호면 data를 store에 저장 + app/home, 미가입번호면 registerPage
  const NextBtnClick = async (e) => {
    //백으로 있는 유저인지 확인
    if (verifiCode !== inputVerifiCode) {
      setInputVerifiCode("");
      verifiRef.current.focus();
      setVerifiFail(true);
      setConfirmBtn(false);
      return;
    }
    const phoneNumber = inputPhoneNumber.replaceAll(" ", "");
    const res = await fetch(`${restinAPI}/auth/is_exist`, {
      mode: "cors",
      method: "GET",
      headers: {
        phonenumber: phoneNumber,
      },
    });
    const resData = await res.json();
    if (res.status === 200) {
      const res_login = await fetch(`${restinAPI}/auth/login_sms`, {
        mode: "cors",
        method: "GET",
        headers: {
          userVerifiCode: inputVerifiCode,
          phonenumber: phoneNumber,
          userId: resData.userId,
        },
      });
      const awaitRESLogin = await res_login.json();
      const userData = awaitRESLogin.user.data;
      dispatch(setuserData(userData));
      console.log(userData.security);
      dispatch(setVerifiToken(userData.security.auth_token));
      //global state에 유저정보 set
      navi("/app/home");
    } else {
      navi("/login/register", {
        state: { phoneNumber: inputPhoneNumber.replaceAll(" ", "") },
      });
    }
  };

  //페이지 진입시 폰번호 입력칸에 자동 포커스
  useEffect(() => {
    PhoneNumberRef.current.focus();
  }, []);
  return (
    <FullBox sx={{ height: "100%" }}>
      <BgColorDefault />
      <FullBox className="divJCC" sx={{ height: "100%" }}>
        <HeaderInner></HeaderInner>
        <InBox sx={{ textAlign: "start", display: "flex" }}>
          <TextHeader2 color="InfoDark" width={"100%"}>
            반가워요!
            <br />
            휴대폰 번호를 알려주세요
          </TextHeader2>
        </InBox>
        <InBox sx={{ flexDirection: "column", flex: 1, display: "flex" }}>
          <Box width={"100%"} component="form" noValidate autoComplete="off">
            <TextField
              inputRef={PhoneNumberRef}
              disabled={isFirstVerifiCodeSend}
              variant="standard"
              fullWidth
              label="휴대폰 번호"
              helperText={`ex) 010 1234 5678${
                isFirstVerifiCodeSend
                  ? "\n번호가 잘못돼었을 경우 뒤로가기를 눌러주세요"
                  : ""
              }`}
              color="PrimaryBrand"
              inputProps={{ inputMode: "numeric", style: { fontSize: 20 } }} // font size of input text
              InputLabelProps={{
                style: { fontSize: 20, color: theme.palette.SubText.main },
              }} // font size of input label
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="start">
                      <Button
                        onClick={VerifiSendBtnClick}
                        css={css`
                          border: 1px solid ${theme.palette.MainText.main};
                          position: relative;
                          margin-bottom: 5px;
                          border-radius: 15px;
                          padding: 5px;
                          color: ${theme.palette.InfoDark.main};
                          &.Mui-disabled {
                            border: 1px solid ${theme.palette.SubText.main};
                          }
                        `}
                        disabled={
                          isFirstVerifiCodeSend ||
                          inputPhoneNumber.length !== 13
                        }
                      >
                        <TextBodySmall>인증번호 전송</TextBodySmall>
                      </Button>
                    </InputAdornment>
                  ),
                },
              }}
              css={css`
                margin: 20vw 0 6vw 0;
                .MuiFormHelperText-root {
                  font-size: 12px;
                  color: ${theme.palette.SubText.main};
                }
              `}
              value={inputPhoneNumber}
              onChange={PhoneNumberAutoSpace}
            ></TextField>
          </Box>
          <Box width={"100%"}>
            <TextField
              error={verifiFail && inputVerifiCode.length === 0}
              inputRef={verifiRef}
              variant="standard"
              fullWidth
              label="인증번호"
              helperText={
                verifiFail && inputVerifiCode.length !== 0
                  ? "* 인증번호를 다시 확인해주세요"
                  : "* 어떤 경우에도 타인에게 공유하지 마세요"
              }
              color="PrimaryBrand"
              inputProps={{ inputMode: "numeric", style: { fontSize: 20 } }} // font size of input text
              InputLabelProps={{
                style: { fontSize: 20, color: theme.palette.SubText.main },
              }} // font size of input label
              css={css`
                .MuiFormHelperText-root {
                  font-size: 12px;
                  color: ${theme.palette.SubText.main};
                }
                .Mui-error {
                  color: ${theme.palette.error.main};
                }
              `}
              value={inputVerifiCode}
              onChange={VerifiCodeInputState}
            ></TextField>
          </Box>
          {isFirstVerifiCodeSend ? (
            <Box
              onClick={VerifiSendBtnClick}
              css={css`
                background-color: ${theme.palette.InfoDark.main};
                border-radius: 8px;
                padding: 6px 10px;
                align-self: start;
                margin-top: 2vw;
              `}
            >
              <TextBold
                css={css`
                  font-size: 11px;
                `}
                color="InfoLight"
              >
                인증번호 재전송
              </TextBold>
            </Box>
          ) : null}
          <Box className="EmptyBox" sx={{ flex: 1 }}></Box>
          <DefaultBtn
            disabled={!confirmBtn || !isFirstVerifiCodeSend}
            onClick={NextBtnClick}
          >
            인증 확인
          </DefaultBtn>
        </InBox>
      </FullBox>
    </FullBox>
  );
};

export default IsExistUser;
