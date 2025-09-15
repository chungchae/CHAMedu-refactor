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
              color={i < reviewData.reviewScore ? "#FFD700" : "#ddd"} // 점수보다 작으면 노랑, 아니면 회색
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
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  background-color: #fff;
  margin-bottom: 16px;
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
  font-size: 14px;
  color: #888;
`;

const Content = styled.p`
  margin-top: 12px;
  font-size: 15px;
  color: #000000;
  line-height: 1.4;
`;
