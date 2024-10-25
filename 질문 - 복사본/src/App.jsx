import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyForm from "./components/MyForm";
import { Provider as Reducer } from "react-redux";
import { store } from "./store";

const App = () => {
  return (
    <Reducer store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MyForm />} />
        </Routes>
      </Router>
    </Reducer>
  );
};

export default App;
