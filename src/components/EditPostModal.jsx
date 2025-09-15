import React, { useState } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const EditPostModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [major, setMajor] = useState("");
  const [admission, setAdmission] = useState("");

  const handleSubmit = () => {
    console.log({
      title,
      content,
      hashtags,
      major,
      admission,
    });
    onClose();
  };

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <ModalTitle>게시글 수정하기</ModalTitle>
          <CloseButton onClick={onClose}>
            <FaTimes size={20} />
          </CloseButton>
        </Header>

        <ContentWrapper>
          <FieldWrapper>
            <InputLabel>제목</InputLabel>
            <TextInput
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FieldWrapper>

          <FieldWrapper>
            <InputLabel>본문</InputLabel>
            <TextArea
              placeholder="본문을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FieldWrapper>

          <FieldWrapper>
            <InputLabel>#해시태그</InputLabel>
            <TextInput
              placeholder="#태그 입력"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
            />
          </FieldWrapper>

          <FieldWrapper>
            <InputLabel>전공 / 전형</InputLabel>
            <SelectWrapper>
              <Select value={major} onChange={(e) => setMajor(e.target.value)}>
                <option value="">전공 선택</option>
                <option value="인문사회">인문·사회</option>
                <option value="경상">경상</option>
                <option value="경영">경영</option>
                <option value="자연과학">자연과학</option>
                <option value="공학IT">공학IT</option>
                <option value="예체능">예체능</option>
                <option value="기타">기타</option>
              </Select>

              <Select
                value={admission}
                onChange={(e) => setAdmission(e.target.value)}
              >
                <option value="">전형 선택</option>
                <option value="학종">학종</option>
                <option value="논술">논술</option>
                <option value="실기">실기</option>
                <option value="정시">정시</option>
                <option value="기타">기타</option>
              </Select>
            </SelectWrapper>
          </FieldWrapper>
        </ContentWrapper>

        <SubmitButton onClick={handleSubmit}>제출하기</SubmitButton>
      </ModalContainer>
    </Overlay>
  );
};

export default EditPostModal;

// 스타일
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
`;

const ModalContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 9px;
  width: 800px;
  height: 70%;
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
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 6px;
`;

const InputLabel = styled.label`
  font-weight: bold;
`;

const TextInput = styled.input`
  width: 95%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 95%;
  min-height: 200px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  resize: none;
`;

const SelectWrapper = styled.div`
  display: flex;
  gap: 12px;
  width: 98%;
`;

const Select = styled.select`
  flex: 1;
  padding: 12px;
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
