import React from "react";
import styled from "styled-components";

const ProfileCard = ({
  name,
  school,
  major,
  email,
  profileImageUrl,
  onEdit,
}) => {
  return (
    <Card>
      <ProfileImage src={profileImageUrl} alt="프로필" />
      <Name>{name}</Name>
      <Info>
        {school} {major}
      </Info>
      <Info>{email}</Info>
      <Button onClick={onEdit}>프로필 수정하기</Button>
    </Card>
  );
};

export default ProfileCard;

const Card = styled.div`
  width: 200px;
  height: 330px;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  background-color: #fff;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 170px;
  height: 170px;
`;

const Name = styled.h3`
  margin: 20px 0 20px;
`;

const Info = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const Button = styled.button`
  margin-top: 20px;
  width: 180px;
  padding: 8px 12px;
  border-radius: 9px;
  border: 1px solid #ccc;
  color: #6e6e6e;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #70756e;
    color: white;
  }
`;
