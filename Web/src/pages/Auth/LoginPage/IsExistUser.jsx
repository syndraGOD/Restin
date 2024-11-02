import FullBox from "../../../components/common/FullBox";
import HeaderInner from "../../../components/common/HeaderInner";
import { TextHeader2 } from "../../../components/designGuide";
import { Page } from "../../../components/Page";
import InBox from "../../../components/common/InBox";
import { Input, TextField } from "@mui/material";
import theme from "../../../style/theme";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const IsExistUser = () => {
  return (
    <Page>
      <HeaderInner></HeaderInner>
      <FullBox className="divJCC">
        <InBox sx={{ textAlign: "start" }}>
          <TextHeader2 color="InfoDark" width={"100%"}>
            반가워요!
            <br />
            휴대폰 번호를 알려주세요
          </TextHeader2>
        </InBox>
        <InBox sx={{ flexDirection: "column" }}>
          <TextField
            variant="standard"
            fullWidth
            label="휴대폰 번호"
            helperText="ex. 010-1234-5678"
            color="PrimaryBrand"
            inputProps={{ style: { fontSize: 20 } }} // font size of input text
            InputLabelProps={{
              style: { fontSize: 20, color: theme.palette.SubText.main },
            }} // font size of input label
            input
            sx={{
              margin: "6vw 0",
              marginTop: "10vw",
            }}
            css={css`
              .MuiFormHelperText-root {
                font-size: 12px;
                color: ${theme.palette.SubText.main};
              }
            `}
          ></TextField>
          <TextField
            variant="standard"
            fullWidth
            label="인증번호"
            helperText="어떤 경우에도 타인에게 공유하지 마세요"
            color="PrimaryBrand"
            inputProps={{ style: { fontSize: 20 } }} // font size of input text
            InputLabelProps={{
              style: { fontSize: 20, color: theme.palette.SubText.main },
            }} // font size of input label
            sx={{
              margin: "0vw 0",
            }}
            css={css`
              .MuiFormHelperText-root {
                font-size: 12px;
                color: ${theme.palette.SubText.main};
              }
            `}
          ></TextField>
        </InBox>
      </FullBox>
    </Page>
  );
};

export default IsExistUser;
