import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileSetupModal from "../components/ProfileSetupModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const LoginLoading = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const kakaoLogin = async () => {
      if (isFetching || !code) {
        return;
      }
      setIsFetching(true);

      try {
        console.log("[KAKAO] Authorization code:", code);

        // 서버에 인가 코드 전송
        const res = await axios.post(`${BASE_URL}/api/member/kakao`, code, {
          headers: { "Content-Type": "text/plain" },
        });

        const { newUser, email, nickname, token, role } = res.data;
        console.log("[KAKAO] User data received:", { newUser, email, nickname, token });

        setUserData({ email, nickname, token });
        localStorage.setItem("token", token);

        if (newUser) {
          // 신규 사용자라면 프로필 설정 모달을 표시
          setShowProfileModal(true);
        } else {
          // 기존 사용자라면 로컬스토리지에 저장 후 메인 페이지로 이동
          const existingUserData = {
            name: nickname,
            nickname: nickname,
            email: email,
            token: token,
            role: role,
            loginTime: new Date().toISOString(),
          };
          localStorage.setItem("user", JSON.stringify(existingUserData));
          console.log("[LOGIN] User data saved to localStorage:");
          console.log("  - nickname:", nickname);
          console.log("  - email:", email);
          console.log("  - token:", token || "없음");
          console.log("  - 전체 저장 데이터:", existingUserData);
          navigate("/");
        }
      } catch (error) {
        console.error("[KAKAO] Login failed:", error.response?.data || error.message);
      } finally {
        setIsFetching(false);
      }
    };

    kakaoLogin();
  }, [code, navigate]);

  const handleProfileSubmit = async (profileData) => {
    try {
      await axios.post(`${BASE_URL}/api/member/profile`, { ...profileData, email: userData.email });
      alert("프로필 설정이 완료되었습니다!");
      setShowProfileModal(false);
      navigate("/");
    } catch (error) {
      alert("프로필 설정 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("[Profile] Setup failed:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-customColor bg-opacity-20">
        <p className="text-xl font-semibold">로그인 중입니다 ...</p>
      </div>
      {showProfileModal && (
        <ProfileSetupModal
          userEmail={userData.email}
          onProfileSubmit={handleProfileSubmit}
          onClose={() => navigate("/")}
        />
      )}
    </>
  );
};

export default LoginLoading;
