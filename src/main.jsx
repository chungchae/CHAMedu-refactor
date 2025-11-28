// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ConfigProvider } from "antd";

import Header from "./components/Header.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MentorsPage from "./pages/MentorsPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import AllMentorsPage from "./pages/AllMentorsPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import LoginLoading from "./pages/LoginLoading.jsx";

const AppWrapper = () => {
  const location = useLocation();
  const noHeaderRoutes = ["/login", "/signup"];
  return (
    <>
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path='/' element={<MentorsPage />} />
        <Route path='/mentors' element={<MentorsPage />} />
        <Route path='/allMentors' element={<ProtectedRoute><AllMentorsPage /></ProtectedRoute>} />
        <Route path='/chat' element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path='/mypage' element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/post' element={<ProtectedRoute><PostPage /></ProtectedRoute>} />
        <Route path='/login/oauth2/callback/kakao' element={<LoginLoading />} />
      </Routes>
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <ConfigProvider>
    <Router>
      <AppWrapper />
    </Router>
  </ConfigProvider>
);
