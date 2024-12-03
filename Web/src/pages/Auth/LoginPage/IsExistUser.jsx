/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FullBox from "@components/common/FullBox";
import HeaderInner from "@components/common/HeaderInner";
import { TextBody, TextBodySmall, TextHeader2 } from "@components/designGuide";
import { Page } from "@components/Page";
import InBox from "@components/common/InBox";
import { Box, Button, Input, InputAdornment, TextField } from "@mui/material";
import theme from "../../../style/theme";
import { DefaultBtn } from "@components/common/Btns";
import { useEffect, useRef, useState } from "react";
import { RxChatBubble } from "react-icons/rx";
import { Form, useNavigate } from "react-router-dom";
import { BgColorDefault } from "../../../components/common/Bg";
import { restinAPI } from "../../../api/config";
import { setuserData } from "../../../store/modules/userSlice";
import { useDispatch } from "react-redux";
import { setVerifiToken } from "../../../store/modules/tokenSlice";
import { TextBox_header2 } from "../../../components/common/TextBox";
import {
  Input_SMSVerify,
  smsVerifiCode_isTrue,
} from "../../../components/common/smsVerify";

const IsExistUser = () => {
  //다음페이지로 넘어가기
  //가입 번호면 data를 store에 저장 + app/home, 미가입번호면 registerPage

  //페이지 진입시 폰번호 입력칸에 자동 포커스

  const [phoneState, setphoneState] = useState("");
  const [verificodeState, setverificodeState] = useState("");
  const [isFirstVerifiCodeSend, setIsFirstVerifiCodeSend] = useState(false);
  const phoneRef = useRef();
  const verificodeRef = useRef();
  const verifiTrueFunc = () => {};
  const verifiFalseFunc = () => {};
  useEffect(() => {
    // phoneRef.current.focus();
  }, []);
  return (
    <FullBox sx={{ height: "100%" }}>
      <BgColorDefault />
      <FullBox className="divJCC" sx={{ height: "100%" }}>
        <HeaderInner></HeaderInner>
        {!isFirstVerifiCodeSend ? (
          <TextBox_header2>
            안녕하세요!
            <br />
            휴대폰 번호를 알려주세요
          </TextBox_header2>
        ) : (
          <TextBox_header2>
            인증번호를
            <br />
            입력해 주세요
          </TextBox_header2>
        )}
        <Input_SMSVerify
          phoneRef={phoneRef}
          verificodeRef={verificodeRef}
          //ref end
          phoneState={phoneState}
          setphoneState={setphoneState}
          isFirstVerifiCodeSend={isFirstVerifiCodeSend}
          //state end
          verificodeState={verificodeState}
          setverificodeState={setverificodeState}
          setIsFirstVerifiCodeSend={setIsFirstVerifiCodeSend}
          //setstate end
          verifiTrueFunc={verifiTrueFunc}
          verifiFalseFunc={verifiFalseFunc}
        ></Input_SMSVerify>
      </FullBox>
    </FullBox>
  );
};

export default IsExistUser;
