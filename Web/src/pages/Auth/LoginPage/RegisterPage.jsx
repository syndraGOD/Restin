/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import FullBox from "@components/common/FullBox";
import HeaderInner from "@components/common/HeaderInner";
import { TextHeader2 } from "@components/designGuide";
import InBox from "@components/common/InBox";
import { Box, TextField } from "@mui/material";
import theme from "../../../style/theme";
import { DefaultBtn } from "@components/common/Btns";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BgColorDefault } from "../../../components/common/Bg";
import { TextBox_header2 } from "../../../components/common/TextBox";

const RegisterPage = () => {
  const navi = useNavigate();
  const location = useLocation();
  const profile = location.state || {};
  // console.log(profile);
  const nameRef = useRef();
  const birthRef = useRef();
  const [nameState, setNameState] = useState("");
  const [birthdayState, setBirthdayState] = useState("");
  const [isNext, setIsNext] = useState(false);

  const nextPage = () => {
    navi("/login/useagree", {
      state: { ...profile, nick: nameState, birth: birthdayState },
    });
  };
  useEffect(() => {
    // nameRef.current.focus();
  }, []);

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
          gap: 1,
        }}
      >
        <HeaderInner></HeaderInner>
        {!isNext ? (
          <TextBox_header2 weight="Bold">
            이름 또는 닉네임을
            <br />
            알려주세요
          </TextBox_header2>
        ) : (
          <TextBox_header2 weight="Bold">
            생년월일을 입력하고
            <br />
            시작해볼까요?
          </TextBox_header2>
        )}

        <InBox
          sx={{
            flexDirection: "column",
            flex: 1,
            display: "flex",
            justifyContent: "start",
          }}
        >
          {!isNext ? (
            <Box width={"100%"} component="form" noValidate autoComplete="off">
              <TextField
                inputRef={nameRef}
                variant="standard"
                fullWidth
                label="이름"
                placeholder="레스틴"
                color="PrimaryBrand"
                value={nameState}
                onChange={(e) => {
                  // if (e.target.value.length > 8) e.target.value.pop();
                  e.target.value = e.target.value.slice(0, 8);
                  console.log(e.target.value);
                  setNameState(e.target.value);
                }}
                inputProps={{
                  inputMode: "text",
                }}
              ></TextField>
            </Box>
          ) : (
            <Box width={"100%"} component="form" noValidate autoComplete="off">
              <TextField
                inputRef={birthRef}
                variant="standard"
                fullWidth
                label="주민등록번호 앞 6자리"
                placeholder="YYMMDD (Ex : 990212)"
                color="PrimaryBrand"
                value={birthdayState}
                onChange={(e) => {
                  setBirthdayState(e.target.value);
                }}
                inputProps={{
                  maxLength: 6,
                  inputMode: "numeric",
                }}
              ></TextField>
            </Box>
          )}

          <Box className="EmptyBox" sx={{ flex: 1 }}></Box>
          {!isNext ? (
            <DefaultBtn
              disabled={nameState.length < 2 || nameState.length > 8}
              onClick={() => {
                setIsNext(true);
              }}
            >
              확인
            </DefaultBtn>
          ) : (
            <DefaultBtn
              disabled={birthdayState.length !== 6}
              onClick={nextPage}
              // onClick={() => {
              //   console.log(nameState, birthdayState);
              // }}
            >
              확인
            </DefaultBtn>
          )}
        </InBox>

        {/* <InBox sx={{ flexDirection: "column", flex: 1, display: "flex" }}>
          <Box  sx={{ width: "100%", flex: 1
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          textAlign: "center", }}>
            <TextField
              inputRef={nameRef}
              maxRows={5}
              variant="standard"
              fullWidth
              label="닉네임 (2-8글자)"
              color="PrimaryBrand"
              inputProps={{
                maxLength: 8,
                inputMode: "text",
                style: { fontSize: 20 },
              }} // font size of input text
              InputLabelProps={{
                style: { fontSize: 20, color: theme.palette.Gray.c400 },
              }} // font size of input label
              css={css`
                margin-bottom: 10vw;
                .MuiFormHelperText-root {
                  font-size: 12px;
                  color: ${theme.palette.Gray.c400};
                }
              `}
              value={nameState}
              onChange={(e) => {
                setNameState(e.target.value);
              }}
            ></TextField>
            <TextField
              variant="standard"
              fullWidth
              label="생년월일 (ex. 021205)"
              color="PrimaryBrand"
              inputProps={{
                maxLength: 6,
                inputMode: "numeric",
                style: { fontSize: 20 },
              }} // font size of input text
              InputLabelProps={{
                style: { fontSize: 20, color: theme.palette.Gray.c400 },
              }} // font size of input label
              css={css`
                .MuiFormHelperText-root {
                  font-size: 12px;
                  color: ${theme.palette.Gray.c400};
                }
              `}
              value={birthdayState}
              onChange={(e) => {
                setBirthdayState(e.target.value);
              }}
            ></TextField>
          </Box>
          <Box className="EmptyBox" sx={{ width: "100%", flex: 1 }}></Box>
          <DefaultBtn
            disabled={!(nameState.length >= 2 && birthdayState.length === 6)}
            onClick={nextPage}
          >
            인증 확인
          </DefaultBtn>
        </InBox> */}
      </FullBox>
    </FullBox>
  );
};

export default RegisterPage;
