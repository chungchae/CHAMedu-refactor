import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ reviewData }) => {
  const totalStars = 5; // 총 별 개수

  return (
    <Card>
      <Info>
        <Score>
          {[...Array(totalStars)].map((_, i) => (
            <FaStar
              key={i}
              color={i < reviewData.reviewScore ? "#FFD700" : "#ddd"}
            />
          ))}
          <ScoreText>{reviewData.reviewScore}</ScoreText>
        </Score>
        <DateText>{reviewData.createdAt}</DateText>
      </Info>
      <Content>{reviewData.content}</Content>
    </Card>
  );
};

export default ReviewCard;

const Card = styled.div`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 12px 14px;
  background-color: #fff;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.04);
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ScoreText = styled.span`
  font-weight: bold;
  margin-left: 6px;
  margin-top: 4px;
  color: #333;
`;

const DateText = styled.span`
  font-size: 13px;
  color: #9aa0a8;
`;

const Content = styled.p`
  margin-top: 10px;
  font-size: 15px;
  color: #111;
  line-height: 1.6;
`;
