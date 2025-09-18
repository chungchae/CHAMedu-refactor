// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header.jsx";
import MentorsPage from "./pages/MentorsPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AllMentorsPage from "./pages/AllMentorsPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import LoginLoading from "./pages/LoginLoading.jsx";

const AppWrapper = () => {
  const location = useLocation();
  const noHeaderRoutes = ["/login"]; // 헤더 안 보여줄 경로

  return (
    <>
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path='/' element={<MentorsPage />} />
        <Route path='/mentors' element={<MentorsPage />} />
        <Route path='/allMentors' element={<AllMentorsPage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/post' element={<PostPage />} />
        <Route path='/login/oauth2/callback/kakao' element={<LoginLoading />} />
      </Routes>
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <Router>
    <AppWrapper />
  </Router>
);
