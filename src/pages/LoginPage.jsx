// src/pages/LoginPage.jsx

import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ProfileSetupModal from "../components/ProfileSetupModal";
import { KAKAO_AUTH_URL } from "../auth/Auth";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [baseUser, setBaseUser] = useState(null); // { email, nickname, token, role }

  // 공통: 로그인 후 처리
  const handleLoginResponse = (data) => {
    const { newUser, email, nickname, token, role } = data;

    const base = {
      email,
      nickname,
      token,
      role,
      loginTime: new Date().toISOString(),
    };

    if (newUser) {
      // 신규 유저: 프로필 설정 모달 띄움
      setBaseUser(base);
      localStorage.setItem("user", JSON.stringify(base));
      setShowProfileModal(true);
    } else {
      // 기존 유저: 바로 localStorage 저장 후 메인으로
      localStorage.setItem("user", JSON.stringify(base));
      window.location.href = "/";
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/member/login`, {
        email,
        password,
      });
      handleLoginResponse(res.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "로그인 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  // 프로필 설정 완료 시
  const handleProfileSubmit = async (profileData) => {
    if (!baseUser) return;
    try {
      // 1) 서버에 프로필 저장
      await axios.post(
        `${BASE_URL}/api/member/profile`,
        {
          ...profileData,
          email: baseUser.email,
        },
        {
          headers: {
            Authorization: `Bearer ${baseUser.token}`,
          },
        }
      );

      // 2) localStorage에 최종 유저 정보 업데이트
      const finalUser = {
        ...baseUser,
        nickname: profileData.nickname,
        university: profileData.university,
        major: profileData.major,
        recruitmentType: profileData.recruitmentType,
        role: profileData.role,
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem("user", JSON.stringify(finalUser));

      setShowProfileModal(false);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("프로필 설정 중 오류가 발생했습니다.");
    }
  };

  const handleKakaoLoginClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Wrapper>
      <Container>
        <Logo>CHAMedu</Logo>
        <Heading>로그인</Heading>
        <Subheading>멘토와 함께 꿈을 이뤄보세요</Subheading>

        <FormWrapper>
          {error && <ErrorText>{error}</ErrorText>}

          <form onSubmit={handleEmailLogin}>
            <Field>
              <Label>이메일</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
              />
            </Field>

            <Field>
              <Label>비밀번호</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
              />
            </Field>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? "로그인 중..." : "로그인"}
            </SubmitButton>
          </form>

          <Divider />

          <SocialButton type="button" onClick={handleKakaoLoginClick}>
            🟨 카카오로 계속하기
          </SocialButton>

          <BottomLinks>
            <LinkItem href="#" onClick={(e) => { e.preventDefault(); alert("아이디 찾기는 준비중입니다."); }}>
              아이디 찾기
            </LinkItem>
            <Separator>|</Separator>
            <LinkItem href="#" onClick={(e) => { e.preventDefault(); alert("비밀번호 찾기는 준비중입니다."); }}>
              비밀번호 찾기
            </LinkItem>
            <Separator>|</Separator>
            <LinkItem href="/signup">
              회원가입
            </LinkItem>
          </BottomLinks>
        </FormWrapper>
      </Container>

      {showProfileModal && baseUser && (
        <ProfileSetupModal
          userEmail={baseUser.email}
          onProfileSubmit={handleProfileSubmit}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </Wrapper>
  );
};

export default LoginPage;

// 스타일들
const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
  padding: 20px;
  width: 100%;
  overflow-y: auto;
`;

const Container = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08);
  padding: 48px 36px;
  width: 100%;
  max-width: 420px;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: #4caf4f;
  text-align: center;
  margin-bottom: 20px;
`;

const Heading = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #222;
  text-align: center;
  margin-bottom: 8px;
`;

const Subheading = styled.p`
  font-size: 0.95rem;
  color: #888;
  text-align: center;
  margin-bottom: 32px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 12px;
`;

const SignupForm = styled.form`
  margin-top: 16px;
  padding: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  background: #fafbfc;
`;

const ErrorText = styled.div`
  color: #ef4444;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 10px 12px;
  background: #fee2e2;
  border-radius: 8px;
  text-align: center;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 700;
  color: #333;
`;

const Input = styled.input`
  border-radius: 10px;
  border: 1px solid #e5e5e5;
  padding: 12px 14px;
  font-size: 0.95rem;
  color: #333;
  outline: none;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border-color: #4caf4f;
    box-shadow: 0 0 0 4px rgba(76, 175, 79, 0.1);
  }
`;

const SubmitButton = styled.button`
  margin-top: 8px;
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: #4caf4f;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.16s;

  &:hover:not(:disabled) {
    background: #3d9842;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #e5e5e5;
  margin: 12px 0;
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #f3e600;
  background: #fee500;
  color: #3c1e1e;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.16s;

  &:hover {
    background: #fcd34d;
  }
`;

const BottomLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
`;

const LinkItem = styled.a`
  font-size: 0.85rem;
  color: #888;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #4caf4f;
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  font-size: 0.8rem;
  color: #ddd;
`;

const Card = styled.div`
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
  width: 100%;
  max-width: 420px;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const TabWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 0.6rem 0;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  background: ${({ $active }) => ($active ? "#4caf4f" : "#f3f4f6")};
  color: ${({ $active }) => ($active ? "#fff" : "#6b7280")};
  transition: background 0.2s;
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background: #e5e7eb;
`;

const DividerText = styled.span`
  font-size: 0.8rem;
  color: #9ca3af;
`;

