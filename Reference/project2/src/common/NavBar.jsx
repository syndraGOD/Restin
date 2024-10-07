import { Link } from 'react-router-dom';
import { NavWrap } from '../styled/Style';

const NavBar = () => {
    return (
        <NavWrap>
            <ul>
                <li>
                    <Link to="/">홈</Link>
                </li>
            </ul>
        </NavWrap>
    );
};

export default NavBar;
