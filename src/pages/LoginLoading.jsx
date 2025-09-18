import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const LoginLoading = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        console.log("[KAKAO] Authorization code:", code);

        const res = await axios.post(
          `${BASE_URL}/api/kakao`,
          code ?? "", // null 방지
          {
            headers: { "Content-Type": "text/plain" },
          }
        );

        const accessToken = res?.data;
        if (accessToken && accessToken.length > 0) {
          console.log(
            "[KAKAO] Access token (masked):",
            accessToken.slice(0, 10) + "..."
          );
          // localStorage.setItem("accessToken", accessToken);
          // navigate("/");
        } else {
          console.warn("[KAKAO] No token returned from backend");
        }
      } catch (error) {
        console.error("[KAKAO] Login failed:", error);
      }
    };

    if (code) kakaoLogin();
  }, [code, navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-customColor bg-opacity-20">
      <p className="text-xl font-semibold">로그인 중입니다 ...</p>
    </div>
  );
};

export default LoginLoading;
