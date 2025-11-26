import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoIcon from "../assets/images/logo.png";
import { KAKAO_AUTH_URL } from "../auth/Auth";

const Header = () => {
  const [selectedMenu, setSelectedMenu] = useState("/mentors");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setIsLoggedIn(true);
      setUserName(parsedUser.name || "사용자");
      console.log("로그인 상태 감지:");
      console.log("사용자 정보:", parsedUser);
    } else {
      console.log("로그인 상태 없음 (로컬스토리지에 user 데이터 없음)");
    }
  }, []);

  const handleMenuClick = (path) => {
    setSelectedMenu(path);
  };

  const handleKakaoButtonClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleLogout = () => {
    // 로컬스토리지에서 사용자 정보 삭제
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    console.log("🚪 로그아웃 완료 - 로컬스토리지 user 데이터 삭제됨");
  };

  return (
    <HeaderContainer>
      <Logo as={Link} to="/">
        <LogoImage src={LogoIcon} alt="Logo" />
        <Title>CHAMedu</Title>
      </Logo>

      <Menu>
        <MenuItem
          as={Link}
          to="/mentors"
          selected={selectedMenu === "/mentors"}
          onClick={() => handleMenuClick("/mentors")}
        >
          멘토 둘러보기
        </MenuItem>

        <MenuItem
          as={Link}
          to="/chat"
          selected={selectedMenu === "/chat"}
          onClick={() => handleMenuClick("/chat")}
        >
          나의 채팅
        </MenuItem>

        <MenuItem
          as={Link}
          to="/mypage"
          selected={selectedMenu === "/mypage"}
          onClick={() => handleMenuClick("/mypage")}
        >
          마이페이지
        </MenuItem>

        {isLoggedIn ? (
          <UserSection>
            <UserName>{userName}님</UserName>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </UserSection>
        ) : (
          <LoginButton onClick={handleKakaoButtonClick}>로그인</LoginButton>
        )}
      </Menu>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;
  text-decoration: none;
`;

const LogoImage = styled.img`
  width: auto;
  height: 40px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin-left: 10px;
`;

const Menu = styled.nav`
  display: flex;
  gap: 15px;
  margin-right: 50px;
  white-space: nowrap;
  align-items: center;
  flex-shrink: 1;
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  color: ${({ selected }) => (selected ? "#4CAF4F" : "#000")};
  font-size: 16px;
  cursor: pointer;
  padding: 5px 10px;
  text-decoration: none;

  &:hover {
    color: #4caf4f;
  }
`;

const LoginButton = styled.button`
  background: #4caf4f;
  color: white;
  border: none;
  padding: 5px 12px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 9px;

  &:hover {
    background: #3a692c;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserName = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

const LogoutButton = styled.button`
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  padding: 5px 12px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 9px;
  transition: all 0.2s ease;

  &:hover {
    background: #e8e8e8;
    border-color: #999;
  }
`;
