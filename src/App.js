import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Add from "./pages/Add";

const App = () => {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/add" element={<Add />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
