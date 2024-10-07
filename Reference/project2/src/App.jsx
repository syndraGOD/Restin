import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GlobalStyle from './styled/GlobalStyle';

import Main from './pages/main/Main';
import Layout from './components/Layout';
import LayoutSub from './components/LayoutSub';
import About from './pages/about/About';
import Project from './pages/project/Project';
import Notice from './pages/notice/Notice';
import NoticeAdd from './pages/notice/NoticeAdd';
import NoticeEdit from './pages/notice/NoticeEdit';
import Login from './pages/login/Login';
import Logout from './pages/login/Logout';
import Join from './pages/login/Join';

const App = () => {
    return (
        <>
            <Router>
                <GlobalStyle />
                <Routes></Routes>
            </Router>
        </>
    );
};

export default App;
