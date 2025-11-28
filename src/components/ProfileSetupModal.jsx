import React, { useState } from "react";
import styled from "styled-components";
import { Input, Select, Alert } from "antd";
import { PRIMARY } from "../utils/colors";

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

const ProfileSetupModal = ({ userEmail, onProfileSubmit, onClose }) => {
  const [isMentor, setIsMentor] = useState(false);
  const [nickname, setNickname] = useState("");
  const [university, setUniversity] = useState("");
  const [recruitmentType, setRecruitmentType] = useState(recruitmentOptions[0]);
  const [major, setMajor] = useState(majorOptions[0]);
  const [error, setError] = useState("");
  const role = isMentor ? "MENTOR" : "MENTEE";

  const handleMentorClick = () => setIsMentor(true);
  const handleMenteeClick = () => setIsMentor(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickname || !university) {
      setError("닉네임과 학교는 필수 입력란입니다.");
      return;
    }
    setError("");
    
    // 로컬스토리지에 사용자 정보 저장
    const userData = {
      name: nickname,
      nickname: nickname,
      email: userEmail,
      university: university,
      role: role,
      recruitmentType: recruitmentType,
      major: major,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("[LOGIN] User profile saved to localStorage:", userData);
    
    onProfileSubmit({
      role: isMentor ? "MENTOR" : "MENTEE",
      nickname,
      university,
      recruitmentType,
      major,
    });
    
    // 페이지 새로고침하여 헤더 업데이트
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <HeaderContent>
            <ModalTitle>프로필 설정</ModalTitle>
            <ModalSubtitle>회원님, 환영합니다! 간단한 정보 입력으로 회원가입이 완료돼요.</ModalSubtitle>
          </HeaderContent>
          <CloseButton onClick={onClose}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </CloseButton>
        </ModalHeader>
        {error && (
          <Alert
            message="알림"
            description={error}
            type="warning"
            showIcon
            closable
            onClose={() => setError("")}
            style={{ marginBottom: "1rem" }}
          />
        )}
        <Form onSubmit={handleSubmit}>
          <SelectRole>
            <RoleLabel>당신은 어디에 더 관심이 있나요?</RoleLabel>
            <ToggleButtons>
              <ToggleButton
                type='button'
                onClick={handleMentorClick}
                $isActive={isMentor}
              >
                <RoleIcon>🎓</RoleIcon>
                <RoleText>멘토</RoleText>
                <RoleDesc>경험과 지식 나누기</RoleDesc>
              </ToggleButton>
              <ToggleButton
                type='button'
                onClick={handleMenteeClick}
                $isActive={!isMentor}
              >
                <RoleIcon>🌱</RoleIcon>
                <RoleText>멘티</RoleText>
                <RoleDesc>배우고 성장하기</RoleDesc>
              </ToggleButton>
            </ToggleButtons>
          </SelectRole>

          <FieldGroup>
            <label htmlFor='nickname'>닉네임</label>
            <Input
              id='nickname'
              type='text'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder='닉네임'
            />
          </FieldGroup>

          <FieldGroup>
            <label htmlFor='university'>학교</label>
            <Input
              id='university'
              type='text'
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder='학교'
            />
          </FieldGroup>

          <DropdownGroup>
            <FieldGroup>
              <label htmlFor='recruitmentType'>전형</label>
              <Select
                id='recruitmentType'
                value={recruitmentType}
                onChange={(value) => setRecruitmentType(value)}
              >
                {recruitmentOptions.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </FieldGroup>

            <FieldGroup>
              <label htmlFor='major'>전공</label>
              <Select
                id='major'
                value={major}
                onChange={(value) => setMajor(value)}
              >
                {majorOptions.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </FieldGroup>
          </DropdownGroup>
          <SubmitButton type='submit'>회원가입 완료</SubmitButton>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ProfileSetupModal;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 1.25rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 420px;
  margin-left: 1rem;
  margin-right: 1rem;
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.375rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.5px;
`;

const ModalSubtitle = styled.p`
  font-size: 0.9rem;
  color: #8b92a0;
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #8b92a0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    color: #1a1a1a;
    transform: scale(1.1);
  }
  
  svg {
    width: 24px;
    height: 24px;
    stroke-width: 2;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const SelectRole = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 0.5rem;
`;

const RoleLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.3px;
`;

const ToggleButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ToggleButton = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 0.875rem;
  border: 2px solid #e5e7eb;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.25s ease;
  background-color: #fff;
  color: #8b92a0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  
  ${(props) =>
    props.$isActive
      ? `
      background-color: #f0f9f1;
      border-color: #4caf4f;
      color: #1a1a1a;
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15);
    `
      : `
      &:hover {
        border-color: #d1d5db;
        background-color: #f9f9fb;
      }
    `}
`;

const RoleIcon = styled.span`
  font-size: 1.75rem;
  display: block;
`;

const RoleText = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  display: block;
`;

const RoleDesc = styled.span`
  font-size: 0.75rem;
  color: #bcc1ca;
  font-weight: 400;
  display: block;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1a1a1a;
    letter-spacing: -0.3px;
  }
  
  .ant-input,
  .ant-select-selector {
    height: 44px;
    border-radius: 0.875rem;
    border: 1.5px solid #e5e7eb;
    background-color: #f9f9fb;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    
    &:hover {
      border-color: #d1d5db;
      background-color: #fff;
    }
    
    &:focus,
    &.ant-input-focused,
    &.ant-select-focused .ant-select-selector {
      border-color: #4caf4f !important;
      background-color: #fff !important;
      box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1) !important;
    }
  }
  
  .ant-input::placeholder {
    color: #bcc1ca;
  }
`;

const DropdownGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.875rem 1.5rem;
  height: 48px;
  background-color: #4caf4f;
  color: #fff;
  font-weight: 600;
  font-size: 0.975rem;
  border-radius: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  letter-spacing: -0.3px;
  margin-top: 0.5rem;
  
  &:hover {
    background-color: #3d9842;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(76, 175, 80, 0.25);
  }
  
  &:active {
    transform: translateY(0);
  }
`;
