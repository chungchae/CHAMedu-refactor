import React, { useState } from "react";
import styled from "styled-components";
import { Input, Select } from "antd";
import axios from "axios";
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

const EditProfileModal = ({ profile, onClose, onSuccess }) => {
  const [nickname, setNickname] = useState(profile.nickname);
  const [university, setUniversity] = useState(profile.university);
  const [major, setMajor] = useState(profile.major || "기타");
  const [recruitmentType, setRecruitmentType] = useState(
    profile.recruitmentType || "기타"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nickname || !university) {
      alert("닉네임과 학교는 필수 입력란입니다.");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const updateData = {
        nickname,
        university,
        major,
        recruitmentType,
      };

      console.log("[PROFILE] PUT /api/member/me - payload:", updateData);

      await axios.put(`${BASE_URL}/api/member/me`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("프로필이 수정되었습니다!");
      console.log("[PROFILE] 수정 성공");
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(
        "[PROFILE] 수정 실패:",
        error.response?.status,
        error.response?.data || error.message
      );
      const serverMessage =
        error.response?.data?.message || error.response?.data || error.message;
      alert(`프로필 수정 중 오류가 발생했습니다.\n${serverMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <HeaderContent>
            <ModalTitle>프로필 수정</ModalTitle>
            <ModalSubtitle>프로필 정보를 수정해주세요</ModalSubtitle>
          </HeaderContent>
          <CloseButton onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <InfoSection>
            <InfoLabel>구분</InfoLabel>
            <RoleDisplay>{profile.mentor ? "멘토" : "멘티"}</RoleDisplay>
            <InfoNote>멘토/멘티 구분은 변경할 수 없습니다.</InfoNote>
          </InfoSection>

          <FieldGroup>
            <label htmlFor="nickname">닉네임</label>
            <Input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임"
            />
          </FieldGroup>

          <FieldGroup>
            <label htmlFor="university">학교</label>
            <Input
              id="university"
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="학교"
            />
          </FieldGroup>

          <DropdownGroup>
            <FieldGroup>
              <label htmlFor="major">전공</label>
              <Select
                id="major"
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

            <FieldGroup>
              <label htmlFor="recruitmentType">전형</label>
              <Select
                id="recruitmentType"
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
          </DropdownGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "수정 중..." : "수정 완료"}
          </SubmitButton>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EditProfileModal;

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

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: #f9f9fb;
  border-radius: 0.875rem;
`;

const InfoLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.3px;
`;

const RoleDisplay = styled.div`
  font-size: 1.08rem;
  color: #4caf4f;
  font-weight: 600;
`;

const InfoNote = styled.p`
  font-size: 0.8rem;
  color: #8b92a0;
  margin: 0;
  margin-top: 0.25rem;
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
  
  &:hover:not(:disabled) {
    background-color: #3d9842;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(76, 175, 80, 0.25);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
