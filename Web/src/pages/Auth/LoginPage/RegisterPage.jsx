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
import { useNavigate } from "react-router-dom";
import { BgColorDefault } from "../../../components/common/Bg";

const RegisterPage = () => {
  const navi = useNavigate();
  const nameRef = useRef();
  const [nameState, setNameState] = useState("");
  const [birthdayState, setBirthdayState] = useState("");

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  return (
    <FullBox sx={{ height: "100%" }}>
      <BgColorDefault />
      <FullBox className="divJCC" sx={{ height: "100%", display: "flex" }}>
        <HeaderInner></HeaderInner>
        <InBox sx={{ textAlign: "start", display: "flex" }}>
          <TextHeader2 color="InfoDark" width={"100%"}>
            처음 뵙네요. 반가워요!
          </TextHeader2>
        </InBox>

        <InBox sx={{ flexDirection: "column", flex: 1, display: "flex" }}>
          <Box className="divJCC" sx={{ width: "100%", flex: 1 }}>
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
                style: { fontSize: 20, color: theme.palette.SubText.main },
              }} // font size of input label
              css={css`
                margin-bottom: 10vw;
                .MuiFormHelperText-root {
                  font-size: 12px;
                  color: ${theme.palette.SubText.main};
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
                style: { fontSize: 20, color: theme.palette.SubText.main },
              }} // font size of input label
              css={css`
                .MuiFormHelperText-root {
                  font-size: 12px;
                  color: ${theme.palette.SubText.main};
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
            onClick={() => {
              navi("/login/useagree");
            }}
          >
            인증 확인
          </DefaultBtn>
        </InBox>
      </FullBox>
    </FullBox>
  );
};

export default RegisterPage;
