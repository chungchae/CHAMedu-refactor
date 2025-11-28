import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ProfileInfoCard from "../components/ProfileInfoCard";
import EditProfileModal from "../components/EditProfileModal";
const BASE_URL = import.meta.env.VITE_BASE_URL;


const MyPage = () => {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("consultation");
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      console.error("로그인 정보 없음");
      return;
    }

    try {
      const user = JSON.parse(userData);
      const email = user.email;

      axios.get(`${BASE_URL}/api/member/profile`, {
        params: {
          email: email,
        },
      })
        .then(res => {
          setProfile(res.data.data);
          console.log("[MYPAGE] 프로필 로드 완료:", res.data.data);
        })
        .catch(err => {
          console.error("[MYPAGE] 프로필 로드 실패:", err.response?.data || err.message);
        });
    } catch (error) {
      console.error("[MYPAGE] localStorage 파싱 실패:", error);
    }
  }, []);

  const handleProfileUpdate = () => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      console.error("로그인 정보 없음");
      return;
    }

    try {
      const user = JSON.parse(userData);
      const email = user.email;

      axios.get(`${BASE_URL}/api/member/profile`, {
        params: {
          email: email,
        },
      })
        .then(res => {
          setProfile(res.data.data);
          console.log("[MYPAGE] 프로필 새로고침 완료:", res.data.data);
        })
        .catch(err => {
          console.error("[MYPAGE] 프로필 새로고침 실패:", err.response?.data || err.message);
        });
    } catch (error) {
      console.error("[MYPAGE] localStorage 파싱 실패:", error);
    }
  };

  if (!profile) {
    return <Loading>불러오는 중...</Loading>;
  }

  return (
    <PageWrapper>
      <ContentWrapper>
        <LeftSection>
          <ProfileInfoCard 
            profile={profile}
            onEditClick={() => setShowEditModal(true)}
          />
        </LeftSection>

        <RightSection>
          <TabContainer>
            <Tab 
              $isActive={activeTab === "consultation"}
              onClick={() => setActiveTab("consultation")}
            >
              상담 내역
            </Tab>
            <Tab 
              $isActive={activeTab === "review"}
              onClick={() => setActiveTab("review")}
            >
              작성한 리뷰
            </Tab>
          </TabContainer>

          <TabContent>
            {activeTab === "consultation" ? (
              <EmptyMessage>상담 내역이 없습니다.</EmptyMessage>
            ) : (
              <EmptyMessage>작성한 리뷰가 없습니다.</EmptyMessage>
            )}
          </TabContent>
        </RightSection>
      </ContentWrapper>

      {showEditModal && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEditModal(false)}
          onSuccess={handleProfileUpdate}
        />
      )}
    </PageWrapper>
  );
};

export default MyPage;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f7f8fa;
  padding-top: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const LeftSection = styled.div`
  flex: 0 0 320px;
`;

const RightSection = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 2rem;
  gap: 0.5rem;
`;

const Tab = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ $isActive }) => ($isActive ? "#4caf4f" : "#8b92a0")};
  padding: 1rem 0;
  cursor: pointer;
  position: relative;
  transition: color 0.25s ease;

  ${({ $isActive }) =>
    $isActive &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 3px;
      background: #4caf4f;
      border-radius: 2px 2px 0 0;
    }
  `}

  &:hover {
    color: #1a1a1a;
  }
`;

const TabContent = styled.div`
  padding: 2rem;
  flex: 1;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #8b92a0;
  font-size: 1.05rem;
  padding: 2rem;
`;

const Loading = styled.div`
  width: 100vw;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4caf4f;
  font-size: 1.2rem;
`;
