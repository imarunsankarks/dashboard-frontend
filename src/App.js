import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();
  // console.log(user.role);

  return (
    <>
      <div className="app">
        <BrowserRouter>
          {user && <Navbar />}
          <div className="pages">
            <Routes>
              <Route path="/new-member" element={user ? <Signup /> : <Navigate to="/login" />} />
              <Route path="/add" element={user ? <Add /> : <Navigate to="/login" />} />
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
