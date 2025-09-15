import React, { useState } from "react";
import styled from "styled-components";
import { FaStar, FaTimes } from "react-icons/fa";

const ReviewModal = ({ onClose }) => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    console.log("리뷰 작성:", { rating, text });
    onClose();
  };

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <h3>리뷰 작성하기</h3>
          <CloseButton onClick={onClose}>
            <FaTimes size={20} />
          </CloseButton>
        </Header>

        <ContentWrapper>
          <Stars>
            {[...Array(5)].map((_, i) => {
              const score = i + 1;
              return (
                <StarButton
                  key={i}
                  onClick={() => setRating(score)}
                  onMouseEnter={() => setHover(score)}
                  onMouseLeave={() => setHover(null)}
                >
                  <FaStar
                    size={32}
                    color={score <= (hover || rating) ? "#FFD700" : "#e0e0e0"}
                  />
                </StarButton>
              );
            })}
            <span>{rating.toFixed(1)}</span>
          </Stars>

          <TextArea
            placeholder="리뷰를 작성해보세요."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </ContentWrapper>

        <SubmitButton onClick={handleSubmit}>제출하기</SubmitButton>
      </ModalContainer>
    </Overlay>
  );
};

export default ReviewModal;

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
  width: 700px;
  max-width: 90%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  margin-left: 35px;
  margin-top: -10px;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
const TextArea = styled.textarea`
  width: 80%;
  min-height: 120px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 30px;
  resize: none;
  margin: 0 auto 16px auto;
  display: block;
`;

const SubmitButton = styled.button`
  background: #4caf4f;
  color: white;
  padding: 10px 16px;
  border-radius: 9px;
  border: none;
  cursor: pointer;
  float: right;

  &:hover {
    background: #3a692c;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;
