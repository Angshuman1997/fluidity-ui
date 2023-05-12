import { AppStyle } from "./App.styled";
import HomePage from "./pages/Homepage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import Notification from "./components/Notification/Notification";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

function App() {
  const [openNotify, setOpenNotify] = useState(false);
  return (
    <AppStyle>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Notification open={openNotify} setOpen={setOpenNotify} severity={"success"} message={"Success"}/>
    </AppStyle>
  );
}

export default App;
