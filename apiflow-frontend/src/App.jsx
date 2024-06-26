import "./App.css";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./pages/error/Error";
import DetermineError from "./pages/error/DetermineError";
import DrawingBoardPage from "./pages/DrawingBoardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        {/* <Route index element={<Home />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/auth/login" element={<Auth component={Login} />} />
        <Route path="/auth/register" element={<Auth component={Register} />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/drawing-board" element={<DrawingBoardPage />} />
        <Route path="/*" element={<DetermineError />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
