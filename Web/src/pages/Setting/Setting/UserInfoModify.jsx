import { Box, TextField } from "@mui/material";
import FullBox from "../../../components/common/FullBox";
import HeaderInner from "../../../components/common/HeaderInner";
import InBox from "../../../components/common/InBox";
import { TextBodyLarge } from "../../../components/designGuide";
import { Page } from "../../../components/Page";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { DefaultBtn } from "../../../components/common/Btns";
import { DialogOK } from "../../../components/common/DialogOk";
import { useLocation, useNavigate } from "react-router-dom";

const UserInfoModify = () => {
  const location = useLocation();
  const navi = useNavigate();
  const userData = useSelector((state) => state.userR.userData);
  const nameRef = useRef();
  const phoneRef = useRef();
  const [nameState, setNameState] = useState(userData.profile.nick);
  const [phoneState, setPhoneState] = useState(
    `${userData.profile.phoneNumber.slice(
      0,
      3
    )}-${userData.profile.phoneNumber.slice(
      3,
      7
    )}-${userData.profile.phoneNumber.slice(7, 12)}`
  );
  const [dataModifyDialog, setdataModifyDialog] = useState(false);

  const userDataUpdate = async () => {
    try {
      const res = await fetch(``, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + userData.security?.auth_token,
        },
      });
      if (res.status === 200) {
        // dispatch(setuserData({}));
        // dispatch(setVerifiToken(""));
        // navi("/purchase/payment", { state: { item } });
      } else {
        navi(-1);
        const awaitRES = await res.json();
        console.log("회원정보 수정 실패", awaitRES.message);
      }
    } catch (error) {
      navi(-1);
      console.log("front error!", error);
    }
  };
  return (
    <FullBox height="100%" display="flex" flexDirection="column">
      <HeaderInner>내 정보 수정</HeaderInner>
      <InBox
        sx={{
          textAlign: "start",
          justifySelf: "center",
          padding: "40px 0",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxSizing: "border-box",
          alignItems: "start",
        }}
      >
        <TextBodyLarge weight="Bold" pb={4}>
          로그인 정보
        </TextBodyLarge>
        <TextField
          sx={{ mb: 3 }}
          inputRef={nameRef}
          variant="standard"
          fullWidth
          label="이름"
          placeholder="레스틴"
          color="PrimaryBrand"
          value={nameState}
          onChange={(e) => {
            if (e.target.value.length > 8) e.target.value.pop();
            e.target.value = e.target.value.slice(0, 8);
            setNameState(e.target.value);
          }}
          inputProps={{
            inputMode: "text",
          }}
        ></TextField>
        <TextField
          disabled={true}
          //   inputRef={}
          variant="standard"
          fullWidth
          label="휴대폰 번호"
          placeholder="010-1234-5678"
          color="PrimaryBrand"
          value={phoneState}
          onChange={(e) => {
            setPhoneState(e.target.value);
          }}
          inputProps={{
            inputMode: "text",
          }}
        ></TextField>
        <Box className="EmptyBox" flex="1" width={"100%"}>
          {"  "}
        </Box>
        <DefaultBtn
          onClick={() => {
            navi("#isOK");
          }}
        >
          변경사항 저장하기
        </DefaultBtn>
      </InBox>
      <DialogOK
        open="isOK"
        h2="회원정보 변경"
        text="정말 변경하시겠어요?"
        isok={userDataUpdate}
      ></DialogOK>
    </FullBox>
  );
};

export default UserInfoModify;
