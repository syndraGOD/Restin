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
import { useState } from "react";
import { RxChatBubble } from "react-icons/rx";
import { Form, useNavigate } from "react-router-dom";
import { TextBold } from "../../../components/designGuide";

const IsExistUser = () => {
  const navi = useNavigate();
  let [isFirstVerifiCodeSend, setIsFirstVerifiCodeSend] = useState(false);
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [inputVerifiCode, setInputVerifiCode] = useState("");
  const [confirmBtn, setConfirmBtn] = useState(false);
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
  const VerifiCodeAutoSpace = (e) => {
    console.log(e.target.value.replace(/\s/g, "").length);
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
  const NextBtnClick = async () => {
    //백으로 있는 유저인지 확인
    const result = await true;
    if (result) {
      navi("/app/home");
    }
  };
  return (
    <FullBox sx={{ height: "100%" }}>
      <FullBox className="divJCC" sx={{ height: "100%" }}>
        <HeaderInner></HeaderInner>
        <InBox sx={{ textAlign: "start" }}>
          <TextHeader2 color="InfoDark" width={"100%"}>
            반가워요!
            <br />
            휴대폰 번호를 알려주세요
          </TextHeader2>
        </InBox>
        <InBox sx={{ flexDirection: "column", flex: 1 }}>
          <Box width={"100%"} component="form" noValidate autoComplete="off">
            <TextField
              variant="standard"
              fullWidth
              label="휴대폰 번호"
              helperText="ex) 010 1234 5678"
              color="PrimaryBrand"
              inputProps={{ style: { fontSize: 20 } }} // font size of input text
              InputLabelProps={{
                style: { fontSize: 20, color: theme.palette.SubText.main },
              }} // font size of input label
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="start">
                      <Button
                        onClick={() => {
                          setIsFirstVerifiCodeSend(true);
                        }}
                        css={css`
                          border: 1px solid ${theme.palette.MainText.main};
                          position: relative;
                          margin-bottom: 5px;
                          border-radius: 15px;
                          padding: 5px;
                          color: ${theme.palette.InfoDark.main};
                        `}
                        disabled={isFirstVerifiCodeSend}
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
              variant="standard"
              fullWidth
              label="인증번호"
              helperText="* 어떤 경우에도 타인에게 공유하지 마세요"
              color="PrimaryBrand"
              inputProps={{ style: { fontSize: 20 } }} // font size of input text
              InputLabelProps={{
                style: { fontSize: 20, color: theme.palette.SubText.main },
              }} // font size of input label
              css={css`
                .MuiFormHelperText-root {
                  font-size: 12px;
                  color: ${theme.palette.SubText.main};
                }
              `}
              value={inputVerifiCode}
              onChange={VerifiCodeAutoSpace}
            ></TextField>
          </Box>
          {isFirstVerifiCodeSend ? (
            <Box
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
          <DefaultBtn disabled={!confirmBtn} onClick={NextBtnClick}>
            인증 확인
          </DefaultBtn>
        </InBox>
      </FullBox>
    </FullBox>
  );
};

export default IsExistUser;
