/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FullBox from "@components/common/FullBox";
import HeaderInner from "@components/common/HeaderInner";
import { TextBody, TextBodySmall, TextHeader2 } from "@components/designGuide";
import { Page } from "@components/Page";
import InBox from "@components/common/InBox";
import { Box, Button, Input, InputAdornment, TextField } from "@mui/material";
import theme from "@style/theme";
import { DefaultBtn } from "@components/common/Btns";
import { useEffect, useRef, useState } from "react";
import { RxChatBubble } from "react-icons/rx";
import { Form, useNavigate } from "react-router-dom";
import { BgColorDefault } from "@components/common/Bg";
import { restinAPI } from "@api/config";
import { setuserData } from "@store/modules/userSlice";
import { useDispatch } from "react-redux";
import { setVerifiToken } from "@store/modules/tokenSlice";
import { DialogAlert } from "./DialogOk";

export const smsVerifiCode_isTrue = () => {};
export const Input_SMSVerify = ({
  phoneRef: PhoneNumberRef,
  verificodeRef: verifiRef,
  //ref end
  phoneState: inputPhoneNumber,
  setphoneState: setInputPhoneNumber,
  isFirstVerifiCodeSend: isFirstVerifiCodeSend,
  //state end
  verificodeState: inputVerifiCode,
  setverificodeState: setInputVerifiCode,
  setIsFirstVerifiCodeSend: setIsFirstVerifiCodeSend,
  //setstate end
  verifiTrueFunc,
  verifiFalseFunc,
  //
}) => {
  //input - number 폼을 실시간 규격화

  const dispatch = useDispatch();
  const navi = useNavigate();
  const [confirmBtn, setConfirmBtn] = useState(false);
  const [verifiCode, setVerifiCode] = useState();
  const [verifiFail, setVerifiFail] = useState(false);
  const [failedReason, setFailedReason] = useState("");
  //input - 인증번호 폼을 실시간 규격화

  const NextBtnClick = async (e) => {
    try {
      const phoneNumber = inputPhoneNumber.replaceAll(" ", "");
      const res = await fetch(`${import.meta.env.VITE_RESTIN_API}/auth/login_smsCodeVerify`, {
        mode: "cors",
        method: "GET",
        headers: {
          phonenumber: phoneNumber,
          userVerifiCode: inputVerifiCode,
        },
      });
      const resData = await res.json();

      if (res.status === 200 && resData.exist) {
        const userData = resData.user.data;
        dispatch(setuserData(userData));
        dispatch(setVerifiToken(userData.security.auth_token));
        //global state에 유저정보 set
        navi("/app/home", { replace: true });
      } else if (res.status === 200 && !resData.exist) {
        navi("/login/register", {
          state: { phoneNumber: inputPhoneNumber.replaceAll(" ", "") },
        });
      } else if (res.status === 412) {
        setInputVerifiCode("");
        verifiRef.current.focus();
        setVerifiFail(true);
        setConfirmBtn(false);
      } else {
        console.log(res.status, resData);
        setFailedReason("인증에 실패하였습니다. 잠시 후 다시 시도해주세요");
        navi("#failedPurchase");
      }
    } catch (error) {
      console.log(error);
      setFailedReason("인증에 실패하였습니다. 잠시 후 다시 시도해주세요");
      navi("#failedPurchase");
    }
  };

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
      const res = await fetch(`${import.meta.env.VITE_RESTIN_API}/auth/smsVerify`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
        }),
      });
      if (res.status === 200) {
        setIsFirstVerifiCodeSend(true);
      } else {
        console.log(res.status, resData);
        setFailedReason("전송에 실패하였습니다. 잠시 후 다시 시도해주세요");
        navi("#failedPurchase");
      }
      // const awaitData = await data.verifiCode;
      // setVerifiCode(String(awaitData));
    } catch (error) {
      console.log(error);
      setFailedReason("전송에 실패하였습니다. 잠시 후 다시 시도해주세요");
      navi("#failedPurchase");
    }
    //res = { message, verifiCode }
    verifiRef.current.focus();
  };

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

  return (
    <InBox
      sx={{
        flexDirection: "column",
        flex: 1,
        display: "flex",
        justifyContent: "start",
      }}
    >
      {/* phonenumber input */}
      {!isFirstVerifiCodeSend ? (
        <Box width={"100%"} component="form" noValidate autoComplete="off">
          <TextField
            inputRef={PhoneNumberRef}
            disabled={isFirstVerifiCodeSend}
            variant="standard"
            fullWidth
            label="휴대폰 번호"
            placeholder="010 1234 5678"
            // helperText={`ex) 010 1234 5678${
            //   isFirstVerifiCodeSend
            //     ? "\n번호가 잘못돼었을 경우 뒤로가기를 눌러주세요"
            //     : ""
            // }`}
            color="PrimaryBrand"
            inputProps={{
              inputMode: "numeric",
            }}
            css={css``}
            value={inputPhoneNumber}
            onChange={PhoneNumberAutoSpace}
          ></TextField>
        </Box>
      ) : (
        // verifi code
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
                : null //"* 어떤 경우에도 타인에게 공유하지 마세요"
            }
            color="PrimaryBrand"
            inputProps={{ inputMode: "numeric" }} // font size of input text
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">
                    <Box
                      className="Tail_ResendVerificode"
                      onClick={VerifiSendBtnClick}
                      css={css`
                        background-color: ${theme.palette.Gray.c200};
                        border-radius: 8px;
                        padding: 7px 12px;
                        align-self: start;
                        /* margin-top: 2vw; */
                      `}
                    >
                      <TextBodySmall weight="Bold" color="Gray.c900">
                        인증 번호 재전송
                      </TextBodySmall>
                    </Box>
                    {/* <Button
                      onClick={VerifiSendBtnClick}
                      css={css`
                        font-family: NotoSansKR, sans-serif, Arial;
                        border: 1px solid ${theme.palette.Gray.c900};
                        position: relative;
                        margin-bottom: 5px;
                        border-radius: 15px;
                        padding: 5px;
                        color: ${theme.palette.Black.main};
                        &.Mui-disabled {
                          border: 1px solid ${theme.palette.Gray.c400};
                        }
                      `}
                      disabled={
                        isFirstVerifiCodeSend || inputPhoneNumber.length !== 13
                      }
                    >
                      <TextBodySmall>인증번호 전송</TextBodySmall>
                    </Button> */}
                  </InputAdornment>
                ),
              },
            }}
            value={inputVerifiCode}
            onChange={VerifiCodeInputState}
          ></TextField>
        </Box>
      )}

      {!isFirstVerifiCodeSend ? (
        <DefaultBtn
          fixed={true}
          disabled={inputPhoneNumber.length !== 13}
          onClick={VerifiSendBtnClick}
        >
          인증 문자받기
        </DefaultBtn>
      ) : (
        <DefaultBtn
          fixed={true}
          disabled={!confirmBtn || !isFirstVerifiCodeSend}
          onClick={NextBtnClick}
        >
          인증 확인
        </DefaultBtn>
      )}
      <DialogAlert open="failedPurchase" h2="인증 실패">
        {failedReason}
      </DialogAlert>
    </InBox>
  );
};
