import React from "react";
import styled from "styled-components";

const ProfileInfoCard = ({ profile, onEditClick }) => {
  return (
    <Card>
      <ProfileHeader>
        <ProfileCircle>
          {profile.nickname[0]}
        </ProfileCircle>
        <div>
          <Nickname>{profile.nickname}</Nickname>
          <Email>{profile.email}</Email>
        </div>
      </ProfileHeader>
      <InfoList>
        <InfoItem>
          <Label>학교</Label>
          <Value>{profile.university}</Value>
        </InfoItem>
        <InfoItem>
          <Label>전공</Label>
          <Badge color="#4caf4f">{profile.major || "기타"}</Badge>
        </InfoItem>
        <InfoItem>
          <Label>전형</Label>
          <Badge color="#00b8ff">{profile.recruitmentType || "기타"}</Badge>
        </InfoItem>
        <InfoItem>
          <Label>구분</Label>
          <Badge color="#f5a623">{profile.mentor ? "멘토" : "멘티"}</Badge>
        </InfoItem>
      </InfoList>
      <EditButton onClick={onEditClick}>프로필 수정하기</EditButton>
    </Card>
  );
};

export default ProfileInfoCard;

const Card = styled.div`
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: fit-content;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ProfileCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #e9f5ee;
  color: #4caf4f;
  font-size: 2.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Nickname = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #222;
`;

const Email = styled.div`
  font-size: 0.98rem;
  color: #8b92a0;
  margin-top: 0.2rem;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
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

const EditButton = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  background: #4caf4f;
  color: #fff;
  font-size: 1.08rem;
  font-weight: 600;
  border: none;
  border-radius: 1rem;
  padding: 0.9rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #429f43;
  }
`;
