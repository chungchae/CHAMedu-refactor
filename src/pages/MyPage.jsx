// src/pages/MyPage.jsx
import React from "react";
import styled from "styled-components";
import profile from "../constants/json/Profile.json";
import post from "../constants/json/Post.json";
import ProfileCard from "../components/ProfileCard";
import ReviewCard from "../components/ReviewCard";
import { useState } from "react";
import CreatePostModal from "../components/CreatePostModal";
import EditPostModal from "../components/EditPostModal";
import ProfileEditModal from "../components/EditProfileModal";

const MyPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // 작성 모달
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 수정 모달
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false); // 프로필 수정 모달
  const hasPost = post.myPost !== null && post.myPost !== "";

  return (
    <PageContainer>
      <ContentWrapper>
        <LeftSection>
          <ProfileCard
            name={profile.name}
            major={profile.major}
            school={profile.school}
            email={profile.email}
            profileImageUrl={profile.profileImageUrl}
            onEdit={() => setIsProfileEditOpen(true)}
          />
        </LeftSection>

        <RightSection>
          {hasPost ? (
            <>
              <PostContainer>
                <ImageWrapper>
                  <Image
                    src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA2MjlfMjc3%2FMDAxNTYxNzkzMjMyNzQx.rYw5bDAPVOZDTrL3piW7HXoXyTZpl5LXJ4Lqxd6AURYg.FiHQbU0HtpFT-wpigZSf3gT_mSKn7RpWvtTGaVRasbYg.JPEG.mnlpo%2Funiversities.jpg&type=sc960_832"
                    alt="school-logo"
                  />
                </ImageWrapper>

                <PostHeader>
                  <PostTitle>{post.myPost}</PostTitle>
                  <EditButton onClick={() => setIsEditModalOpen(true)}>
                    게시글 수정하기
                  </EditButton>
                </PostHeader>
                <PostContent>{post.myPostContent}</PostContent>
                <HashTag>{post.hashTag}</HashTag>
              </PostContainer>

              <ReviewList>
                <ReviewTitle>게시글 리뷰</ReviewTitle>
                {post.myReview.map((review, idx) => (
                  <ReviewCard key={idx} reviewData={review} />
                ))}
              </ReviewList>
            </>
          ) : (
            <CreatePostWrapper>
              <EmptyPostMessage>게시글을 작성해보세요!</EmptyPostMessage>
              <CreatePostButton onClick={() => setIsCreateModalOpen(true)}>
                게시글 작성하기
              </CreatePostButton>
            </CreatePostWrapper>
          )}
        </RightSection>
      </ContentWrapper>

      {/* 모달 렌더링 */}
      {isCreateModalOpen && (
        <CreatePostModal onClose={() => setIsCreateModalOpen(false)} />
      )}
      {isEditModalOpen && (
        <EditPostModal onClose={() => setIsEditModalOpen(false)} />
      )}
      {isProfileEditOpen && (
        <ProfileEditModal onClose={() => setIsProfileEditOpen(false)} />
      )}
    </PageContainer>
  );
};

export default MyPage;

const PageContainer = styled.div`
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 20px 50px;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  max-width: 1200px;
`;

const LeftSection = styled.div`
  flex: 0 0 280px;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 2px solid #e0e0e0;
`;

const Image = styled.img`
  width: 100%;
  object-fit: contain;
`;

const PostContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #ddd;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const EditButton = styled.button`
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

const PostContent = styled.p`
  margin-top: 12px;
  font-size: 15px;
  color: #333;
  line-height: 1.5;
`;

const HashTag = styled.p`
  margin-top: 12px;
  color: #4caf4f;
  font-size: 14px;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  margin-left: -40px;
`;

const ReviewTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
`;

const CreatePostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const CreatePostButton = styled.button`
  width: 180px;
  padding: 8px 12px;
  border-radius: 9px;
  border: 1px solid #ccc;
  color: #4caf4f;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #3a692c;
    color: white;
  }
`;

const EmptyPostMessage = styled.p`
  color: #888;
  font-size: 15px;
  margin-top: 200px;
`;
