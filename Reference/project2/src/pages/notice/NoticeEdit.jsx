import { NoticeEditWrap } from './NoticeStyle';

const NoticeEdit = () => {
    return (
        <NoticeEditWrap>
            <div className="inner">
                <h2>일정을 수정합니다. </h2>
                <form>
                    <p>
                        <label htmlFor="">내용:</label>
                        <input type="text" name="text" placeholder="일정을 입력하세요" />
                    </p>
                    <p>
                        <button type="submit">수정</button>

                        <button>취소</button>
                    </p>
                </form>
            </div>
        </NoticeEditWrap>
    );
};

export default NoticeEdit;
