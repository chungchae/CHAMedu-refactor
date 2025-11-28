import React from "react";
import styled from "styled-components";

const ConsultRequestCard = ({ name, major, school, email, profileImageUrl, onRequestClick }) => {
  return (
    <Card>
      <ProfileHeader>
        <ProfileCircle>
          {name ? name[0] : "?"}
        </ProfileCircle>
        <div>
          <Nickname>{name}</Nickname>
          <Email>{email}</Email>
        </div>
      </ProfileHeader>

      <InfoList>
        <InfoItem>
          <Label>학교</Label>
          <Value>{school}</Value>
        </InfoItem>

        <InfoItem>
          <Label>전공</Label>
          <Badge color="#4caf4f">{major || "기타"}</Badge>
        </InfoItem>
      </InfoList>

      <RequestButton onClick={onRequestClick}>상담 신청하기</RequestButton>
    </Card>
  );
};

export default ConsultRequestCard;

const Card = styled.div`
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 10px 30px rgba(15,23,42,0.06);
  padding: 1.6rem 1.4rem 1.4rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  height: fit-content;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ProfileCircle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #e9f5ee;
  color: #4caf4f;
  font-size: 1.9rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Nickname = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #222;
`;

const Email = styled.div`
  font-size: 0.92rem;
  color: #8b92a0;
  margin-top: 0.18rem;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Label = styled.div`
  font-size: 1rem;
  color: #8b92a0;
  min-width: 48px;
  font-weight: 500;
`;

const Value = styled.div`
  font-size: 1.08rem;
  color: #222;
  font-weight: 500;
`;

const Badge = styled.span`
  display: inline-block;
  background: ${({ color }) => color || "#eee"};
  color: #fff;
  font-size: 0.98rem;
  font-weight: 600;
  border-radius: 1rem;
  padding: 0.32em 1.1em;
  letter-spacing: -0.5px;
`;

const RequestButton = styled.button`
  margin-top: 0.6rem;
  width: 100%;
  background: #4caf4f;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  border-radius: 0.9rem;
  padding: 0.8rem 0;
  cursor: pointer;
  transition: background 0.16s;
  &:hover {
    background: #429f43;
  }
`;
