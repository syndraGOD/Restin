import styled from 'styled-components';

export const HeaderWrap = styled.header`
    border-bottom: 1px solid #000;
    .inner {
        height: 150px;
    }
    h1 {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        a {
            font-size: 70px;
        }
    }
    .login {
        position: absolute;
        right: 0;
        top: 10px;
        color: blue;
    }
`;

export const NavWrap = styled.nav`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    ul {
        display: flex;
        li {
            margin-left: 80px;
            a {
                font-size: 20px;
                font-weight: 700;
                transition: 0.3s;
                &:hover {
                    color: tomato;
                }
            }
        }
    }
`;

export const FooterWrap = styled.footer`
    background-color: #000;
    .inner {
        height: 250px;
    }
    h2 {
        padding-top: 80px;
        font-size: 20px;
        color: #fff;
    }
`;

export const SpinnerWrap = styled.div`
    .spinner {
        position: fixed;
        z-index: 10;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .spinner-circle {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: inherit;
        padding: 0.5rem 1rem;
    }

    .spinner-circle:before {
        z-index: 5;
        content: '';
        position: absolute;
        border-radius: 50%;
        border: 3px dashed skyblue;
        width: 50px;
        height: 50px;
        border-left: 3px solid transparent;
        border-bottom: 3px solid transparent;
        animation: loading 1s linear infinite;
    }

    .spinner-circle:after {
        content: '';
        position: absolute;
        border-radius: 50%;
        border: 3px dashed skyblue;
        width: 50px;
        height: 50px;
        border-left: 3px solid transparent;
        border-bottom: 3px solid transparent;
        animation: loading 1s ease infinite;
        z-index: 10;
    }

    @keyframes loading {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const InnerWrap = styled.div`
    width: 1400px;
    margin: auto;
    position: relative;
    box-sizing: border-box;
`;
