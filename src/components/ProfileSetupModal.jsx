import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Select } from 'antd';
import { PRIMARY } from '../utils/colors';

const majorOptions = [
  '인문사회', '경상', '경영', '자연과학', '공학IT', '예체능', '기타'
];

const recruitmentOptions = [
  '학종', '논술', '실기', '정시', '기타'
];

const ProfileSetupModal = ({ onProfileSubmit, onClose }) => {
  const [isMentor, setIsMentor] = useState(false);
  const [nickname, setNickname] = useState('');
  const [university, setUniversity] = useState('');
  const [recruitmentType, setRecruitmentType] = useState(recruitmentOptions[0]);
  const [major, setMajor] = useState(majorOptions[0]);
  // const navigate = useNavigate();

  const handleMentorClick = () => setIsMentor(true);
  const handleMenteeClick = () => setIsMentor(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickname || !university) {
      alert('닉네임과 학교는 필수 입력 항목입니다.');
      return;
    }
    onProfileSubmit({
      isMentor,
      nickname,
      university,
      recruitmentType,
      major,
    });
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>프로필 설정</ModalTitle>
          <CloseButton onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ToggleButtons>
            <ToggleButton
              type="button"
              onClick={handleMentorClick}
              $isActive={isMentor}
            >
              멘토
            </ToggleButton>
            <ToggleButton
              type="button"
              onClick={handleMenteeClick}
              $isActive={!isMentor}
            >
              멘티
            </ToggleButton>
          </ToggleButtons>
          
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
              <label htmlFor="recruitmentType">전형</label>
              <Select
                id="recruitmentType"
                value={recruitmentType}
                onChange={(value) => setRecruitmentType(value)}
              >
                {recruitmentOptions.map((option) => (
                  <Select.Option key={option} value={option}>{option}</Select.Option>
                ))}
              </Select>
            </FieldGroup>

            <FieldGroup>
              <label htmlFor="major">전공</label>
              <Select
                id="major"
                value={major}
                onChange={(value) => setMajor(value)}
              >
                {majorOptions.map((option) => (
                  <Select.Option key={option} value={option}>{option}</Select.Option>
                ))}
              </Select>
            </FieldGroup>
          </DropdownGroup>
          <SubmitButton type="submit">
            제출하기
          </SubmitButton>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ProfileSetupModal;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 2.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 42rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
`;

const CloseButton = styled.button`
  color: #a0a0a0;
  &:hover {
    color: #606060;
  }
  transition: color 0.3s;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ToggleButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ToggleButton = styled.button`
  flex: 1;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.3s;
  ${(props) =>
    props.$isActive
      ? `
      background-color: #4caf4f;
      color: #fff;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    `
      : `
      background-color: #e5e7eb;
      color: #4b5563;
      &:hover {
        background-color: #d1d5db;
      }
    `}
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
    margin-bottom: 0.5rem;
  }
  .ant-input, .ant-select-selector {
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    &:focus, &:hover {
      border-color: #4caf4f !important;
      box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.5) !important;
    }
  }
`;

const DropdownGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: #4caf4f;
  color: #fff;
  font-weight: 600;
  border-radius: 9999px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:hover {
    background-color: #429f43;
  }
  transition: background-color 0.3s;
  cursor: pointer;
`;
