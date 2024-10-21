import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResultPage from './components/ResultPage';
import MyForm from './components/MyForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MyForm />} />
                <Route path='/result' element={<ResultPage />} />
            </Routes>
        </Router>
    );
};

export default App;
