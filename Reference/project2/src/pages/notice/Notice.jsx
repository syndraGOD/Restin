import { NoticeWrap } from './NoticeStyle';
import NoticeItem from './NoticeItem';

const Notice = () => {
    return (
        <NoticeWrap>
            <div className="inner">
                <h2> 공지사항 </h2>
                <ul>
                    <NoticeItem />
                </ul>
                <button>글쓰기</button>
            </div>
        </NoticeWrap>
    );
};

export default Notice;
