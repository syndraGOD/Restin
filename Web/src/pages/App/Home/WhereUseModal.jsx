import "../../../style/modal.scss";

const WhereUseModal = () => {
  return (
    <>
      <div id="where_use_dialog">
        <div className="dim"></div>
        <div className="dialog">
          <div className="header">
            <div className="header_text">지역을 알려주세요</div>
            <div className="close">×</div>
          </div>

          <div className="subtext">
            레스틴을 어디서 사용하고 싶으세요?<br></br>알려주신 지역부터 카페를
            모집할게요!
          </div>
          <div className="input_frame">
            <textarea
              id="locationWrite"
              type="text"
              placeholder="동네 이름, 역세권, ○○학교 앞 등"
            />
          </div>
          <div className="button_frame">
            <button>의견 보내기</button>
          </div>
        </div>
      </div>
    </>
  );
};
// 헤이룽 뭐가 안되나용 수진님은 제 마우스 위치 ㅂ여용/?네 보여요 전 안보여요
// 뭔가 흔드는것 같은데 안 움직였어요 ㅇㅋㅇㅋ

export default WhereUseModal;
