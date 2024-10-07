import { FcShop } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { HeaderWrap } from '../styled/Style';

const Header = () => {
    return (
        <HeaderWrap>
            <div className="inner">
                <h1>
                    <Link to="/">
                        <FcShop />
                    </Link>
                </h1>
                <NavBar />

                {/* <p className="login">
                        <span> xxx </span>님
                    </p> */}
            </div>
        </HeaderWrap>
    );
};

export default Header;
