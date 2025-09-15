// src/components/ProfileEditModal.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { FaPen } from "react-icons/fa";
import profileData from "../constants/json/Profile.json";
import { FaTimes } from "react-icons/fa";

const EditProfileModal = ({ onClose }) => {
  const [name, setName] = useState(profileData.name);
  const [school, setSchool] = useState(profileData.school);
  const [major, setMajor] = useState(profileData.major);
  const [admissionType, setAdmissionType] = useState(profileData.admissionType);
  const [profileImageUrl, setProfileImageUrl] = useState(
    profileData.profileImageUrl
  );

  const handleSubmit = () => {
    console.log({ name, school, major, admissionType, profileImageUrl });
    onClose();
  };

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <ModalTitle>프로필 수정하기</ModalTitle>
          <CloseButton onClick={onClose}>
            <FaTimes size={20} />
          </CloseButton>
        </Header>

        <ContentWrapper>
          <ImageWrapper>
            <ProfileImage src={profileImageUrl} alt="프로필" />
            <EditImageButton>
              <FaPen size={18} />
            </EditImageButton>
          </ImageWrapper>

          <FieldWrapper>
            <InputLabel>닉네임</InputLabel>
            <TextInput value={name} onChange={(e) => setName(e.target.value)} />
          </FieldWrapper>

          <FieldWrapper>
            <InputLabel>학교</InputLabel>
            <TextInput
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          </FieldWrapper>

          <FieldWrapper>
            <InputLabel>전공 / 전형</InputLabel>
            <SelectWrapper>
              <Select value={major} onChange={(e) => setMajor(e.target.value)}>
                <option value="인문사회">인문·사회</option>
                <option value="경상">경상</option>
                <option value="경영">경영</option>
                <option value="자연과학">자연과학</option>
                <option value="공학IT">공학IT</option>
                <option value="예체능">예체능</option>
                <option value="기타">기타</option>
              </Select>

              <Select
                value={admissionType}
                onChange={(e) => setAdmissionType(e.target.value)}
              >
                <option value="학종">학종</option>
                <option value="논술">논술</option>
                <option value="실기">실기</option>
                <option value="정시">정시</option>
                <option value="기타">기타</option>
              </Select>
            </SelectWrapper>
          </FieldWrapper>
        </ContentWrapper>

        <SubmitWrapper>
          <SubmitButton onClick={handleSubmit}>제출하기</SubmitButton>
        </SubmitWrapper>
      </ModalContainer>
    </Overlay>
  );
};

export default EditProfileModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 9px;
  width: 600px;
  max-width: 90%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.h3`
  text-align: center;
  flex: 1;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 18px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 120px;
  margin: 0 auto 20px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
`;

const EditImageButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #4caf4f;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InputLabel = styled.label`
  font-weight: bold;
`;

const TextInput = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const SelectWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Select = styled.select`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  background: #4caf4f;
  color: white;
  padding: 10px 16px;
  border-radius: 9px;
  border: none;
  cursor: pointer;
  float: right;
  margin-top: 30px;

  &:hover {
    background: #3a692c;
  }
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`;
