import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const majorOptions = [
  "인문사회",
  "경상",
  "경영",
  "자연과학",
  "공학IT",
  "예체능",
  "기타",
];

const recruitmentOptions = ["학종", "논술", "실기", "정시", "기타"];

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: 기본정보, 2: 추가정보
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1: 기본 정보
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");

  // Step 2: 추가 정보
  const [isMentor, setIsMentor] = useState(false);
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState(majorOptions[0]);
  const [recruitmentType, setRecruitmentType] = useState(recruitmentOptions[0]);

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !passwordConfirm || !nickname) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      setLoading(true);
      // 회원가입 API 호출
      await axios.post(`${BASE_URL}/api/member/signup`, {
        email,
        password,
        nickname,
      });
      // Step 2로 진행
      setStep(2);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "회원가입 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!university || !major || !recruitmentType) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      // 프로필 설정 API 호출
      const role = isMentor ? "MENTOR" : "MENTEE";
      await axios.post(`${BASE_URL}/api/member/profile`, {
        email,
        nickname,
        university,
        major,
        recruitmentType,
        role,
      });

      // 회원가입 완료 후 로그인 페이지로
      alert("회원가입이 완료되었습니다. 로그인해주세요.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "프로필 설정 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Container>
        <Logo>CHAMedu</Logo>
        <Heading>회원가입</Heading>

        {step === 1 ? (
          <>
            <Subheading>기본 정보를 입력해주세요</Subheading>
            <FormWrapper>
              {error && <ErrorText>{error}</ErrorText>}

              <form onSubmit={handleStep1Submit}>
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
                  <Label>닉네임</Label>
                  <Input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="닉네임을 입력하세요"
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

                <Field>
                  <Label>비밀번호 확인</Label>
                  <Input
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="비밀번호를 다시 입력하세요"
                  />
                </Field>

                <SubmitButton type="submit" disabled={loading}>
                  {loading ? "처리 중..." : "다음"}
                </SubmitButton>
              </form>

              <BackLink href="/login">
                이미 계정이 있으신가요? 로그인하기
              </BackLink>
            </FormWrapper>
          </>
        ) : (
          <>
            <Subheading>추가 정보를 입력해주세요</Subheading>
            <FormWrapper>
              {error && <ErrorText>{error}</ErrorText>}

              <form onSubmit={handleStep2Submit}>
                <RoleSection>
                  <Label>역할 선택</Label>
                  <RoleButtons>
                    <RoleBtn
                      type="button"
                      $active={!isMentor}
                      onClick={() => setIsMentor(false)}
                    >
                      👨‍🎓 멘티
                    </RoleBtn>
                    <RoleBtn
                      type="button"
                      $active={isMentor}
                      onClick={() => setIsMentor(true)}
                    >
                      👨‍🏫 멘토
                    </RoleBtn>
                  </RoleButtons>
                </RoleSection>

                <Field>
                  <Label>대학교</Label>
                  <Input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="대학교를 입력하세요"
                  />
                </Field>

                <Field>
                  <Label>전공</Label>
                  <StyledSelect
                    value={major}
                    onChange={(value) => setMajor(value)}
                  >
                    {majorOptions.map((option) => (
                      <Select.Option key={option} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </StyledSelect>
                </Field>

                <Field>
                  <Label>모집 구분 (전형)</Label>
                  <StyledSelect
                    value={recruitmentType}
                    onChange={(value) => setRecruitmentType(value)}
                  >
                    {recruitmentOptions.map((option) => (
                      <Select.Option key={option} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </StyledSelect>
                </Field>

                <SubmitButton type="submit" disabled={loading}>
                  {loading ? "완료 중..." : "회원가입 완료"}
                </SubmitButton>
              </form>

              <BackBtn onClick={() => setStep(1)}>
                이전
              </BackBtn>
            </FormWrapper>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default SignupPage;

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
  font-size: 1.8rem;
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

const StyledSelect = styled(Select)`
  .ant-select-selector {
    border-radius: 10px !important;
    border: 1px solid #e5e5e5 !important;
    padding: 8px 12px !important;
    background: #fff !important;
    height: 44px !important;
    display: flex !important;
    align-items: center !important;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:hover {
      border-color: #999 !important;
    }
  }

  .ant-select-focused .ant-select-selector {
    border-color: #4caf4f !important;
    box-shadow: 0 0 0 4px rgba(76, 175, 79, 0.1) !important;
  }

  .ant-select-arrow {
    color: #999;
  }
`;

const RoleSection = styled.div`
  margin-bottom: 20px;
`;

const RoleButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;

const RoleBtn = styled.button`
  flex: 1;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid ${({ $active }) => ($active ? "#4caf4f" : "#e5e5e5")};
  background: ${({ $active }) => ($active ? "#e8f5e9" : "#fff")};
  color: ${({ $active }) => ($active ? "#2e7d32" : "#666")};
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #4caf4f;
    background: #e8f5e9;
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

const BackLink = styled.a`
  text-align: center;
  font-size: 0.9rem;
  color: #888;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
  display: block;
  margin-top: 16px;

  &:hover {
    color: #4caf4f;
    text-decoration: underline;
  }
`;

const BackBtn = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #e5e5e5;
  background: #fff;
  color: #666;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 12px;

  &:hover {
    background: #f5f5f5;
    border-color: #999;
  }
`;
