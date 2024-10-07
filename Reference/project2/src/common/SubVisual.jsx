import styled from 'styled-components';

const SubVisualWrap = styled.section`
    display: flex;
    height: 350px;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: cover;
    background-image: url(${(props) => (props.bgimg ? props.bgimg : '')});

    h2 {
        font-size: 60px;
        font-weight: 500;
        color: #fff;
    }
`;

const SubVisual = () => {
    return (
        <SubVisualWrap bgimg="">
            <h2> xxx 페이지영역입니다. </h2>
        </SubVisualWrap>
    );
};

export default SubVisual;
