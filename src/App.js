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
import { useState, useEffect } from "react";
import { notificationFunc } from "./redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const [openNotify, setOpenNotify] = useState(false);
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state);

  useEffect(() => {
    if (notification?.open) {
      setOpenNotify(true);
      setTimeout(() => {
        dispatch(notificationFunc({}));
      }, 4000);
    }
  }, [dispatch, notification]);

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
      {notification?.open && <Notification open={openNotify} setOpen={setOpenNotify} severity={notification.severity} message={notification.message}/>}
    </AppStyle>
  );
}

export default App;
