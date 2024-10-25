import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyForm from "./components/MyForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyForm />} />
      </Routes>
    </Router>
  );
};

export default App;
