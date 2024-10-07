import { MainCon1Warp } from '../../components/main/MainCon1Style';
import Visual from '../../components/main/Visual';
import { InnerWrap } from '../../styled/Style';
import { MainWrap, VisualWrap } from './MainStyle';

const Main = () => {
    return (
        <>
            <VisualWrap>
                <Visual />
            </VisualWrap>

            <MainWrap className="main">
                <MainCon1Warp>
                    <InnerWrap className="inner">
                        <h2>첫 페이지 입니다</h2>
                    </InnerWrap>
                </MainCon1Warp>
            </MainWrap>
        </>
    );
};

export default Main;
