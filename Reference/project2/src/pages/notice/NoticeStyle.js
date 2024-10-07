import styled from 'styled-components';

export const NoticeWrap = styled.div`
    .inner {
        padding: 100px 0;
    }
    h2 {
        font-size: 30px;
        font-weight: 700;
    }
    ul {
        margin-top: 30px;
        li {
            display: flex;
            border: 1px solid #999;
            line-height: 60px;
            margin-bottom: 10px;
            box-sizing: border-box;
            padding: 0 15px;
            position: relative;
            span {
                margin-left: 20px;
            }
            p {
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                button {
                    width: 80px;
                    height: 50px;
                    border: none;
                    background: #000;
                    color: #fff;
                    cursor: pointer;
                    margin-right: 5px;
                }
            }
            &.on {
                text-decoration: line-through;
                color: tomato;
            }
        }
    }
    button {
        width: 250px;
        height: 50px;
        border: none;
        background: #000;
        color: #fff;
        cursor: pointer;
    }
`;

export const NoticeAddWrap = styled.div`
    .inner {
        padding: 100px 0;
    }
    h2 {
        font-size: 30px;
        font-weight: 700;
    }
    form {
        margin-top: 40px;
        p {
            margin-bottom: 30px;

            input[type='text'] {
                width: 800px;
                height: 40px;
                padding: 5px;
            }
            button {
                width: 200px;
                height: 50px;
                border: none;
                background: #000;
                color: #fff;
                cursor: pointer;
                margin-right: 5px;
            }
        }
    }
`;

export const NoticeEditWrap = styled.div`
    .inner {
        padding: 100px 0;
    }
    h2 {
        font-size: 30px;
        font-weight: 700;
    }
    form {
        margin-top: 40px;
        p {
            margin-bottom: 30px;
            label {
                width: 150px;
                display: inline-block;
            }
            input[type='text'] {
                width: 800px;
                height: 40px;
                padding: 5px;
            }
            button {
                width: 200px;
                height: 50px;
                border: none;
                background: #000;
                color: #fff;
                cursor: pointer;
                margin-right: 5px;
                margin-top: 40px;
            }
        }
    }
`;
