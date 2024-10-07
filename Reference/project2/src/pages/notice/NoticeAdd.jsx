import { NoticeAddWrap } from './NoticeStyle';

const NoticeAdd = () => {
    return (
        <NoticeAddWrap>
            <div className="inner">
                <h2>일정을 추가합니다. </h2>
                <form>
                    <p>
                        <label htmlFor="">내용:</label>
                        <input type="text" placeholder="일정을 입력하세요" />
                    </p>
                    <p>
                        <button>추가</button>
                    </p>
                </form>
            </div>
        </NoticeAddWrap>
    );
};

export default NoticeAdd;
