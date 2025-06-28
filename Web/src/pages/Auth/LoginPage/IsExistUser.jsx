/** @jsxImportSource @emotion/react */
import FullBox from "@components/common/FullBox";
import HeaderInner from "@components/common/HeaderInner";
import { useEffect, useRef, useState } from "react";
import { BgColorDefault } from "../../../components/common/Bg";
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
      <FullBox
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          textAlign: "center",
          height: "100%",
          gap: 1,
        }}
      >
        <HeaderInner></HeaderInner>
        {!isFirstVerifiCodeSend ? (
          <TextBox_header2 weight="Bold">
            안녕하세요!
            <br />
            휴대폰 번호를 알려주세요
          </TextBox_header2>
        ) : (
          <TextBox_header2 weight="Bold">
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
