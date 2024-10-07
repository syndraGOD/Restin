import { LogoutWrap } from './LoginStyle';

const Logout = () => {
    return (
        <LogoutWrap>
            <div className="inner">
                <>
                    <h2>
                        방문해 주셔서 감사합니다.
                        <br /> 다시 방문해주세요
                    </h2>
                    <h3>
                        <span> xxx 님 이용해주셔서 감사합니다 </span>{' '}
                    </h3>

                    <p>
                        <button>로그아웃</button>
                    </p>
                </>

                <>
                    <h2> 로그인 정보를 찾을수 없습니다. </h2>
                </>
            </div>
        </LogoutWrap>
    );
};

export default Logout;
