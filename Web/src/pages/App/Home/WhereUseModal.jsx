import "../../../style/modal.scss";
import cancelSVG from "@assets/icons/close.svg";
import { useEffect, useRef, useState } from "react";
import { restinAPI } from "../../../api/config";
import { useSelector } from "react-redux";

const WhereUseModal = ({ onClose }) => {
  const auth_Token = useSelector((state) => state.tokenR.verifiToken);
  const [contents, setContents] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchExistWantLocation = async () => {
      const res = await fetch(`${restinAPI}/survey/submit/WHERE_USE_LOCATION`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + auth_Token,
        },
        body: JSON.stringify({ contents }),
      });
      const awaitRes = await res.json();
      if (res.status !== 200) {
      } else {
        console.log(awaitRes);
      }
      onClose();
    };
    fetchExistWantLocation();
  };

  const handleCloseBtn = () => {
    onClose();
  };
  return (
    <>
      <div id="where_use_dialog">
        <div className="dim"></div>
        <div className="dialog">
          <div className="header">
            <div className="header_text">지역을 알려주세요</div>
            {/* <div onClick={handleCloseBtn} className="close"> 
              <img src={cancelSVG}></img>
            </div> */}
          </div>

          <div className="subtext">
            레스틴을 어디서 사용하고 싶으세요?<br></br>알려주신 지역부터 카페를
            모집할게요!
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input_frame">
              <textarea
                id="locationWrite"
                type="text"
                placeholder="동네 이름, 역세권, ○○학교 앞 등&#13;&#10;자유롭게 작성해 주세요"
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                minLength={2}
                required
              />
            </div>
            <div className="button_frame">
              <button type="submit">의견 보내기</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WhereUseModal;
