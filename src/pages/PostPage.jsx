// src/pages/PostDetail.jsx
import React, { useState } from "react";
import styled from "styled-components";
import RequestCard from "../components/requestCard";
import ReviewCard from "../components/ReviewCard";
import post from "../constants/json/Post.json";
import profile from "../constants/json/Profile.json";
import ReviewModal from "../components/ReviewModal";

const PostPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageContainer>
      <Container>
        <ImageSection>
          <Logo
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA2MjlfMjc3%2FMDAxNTYxNzkzMjMyNzQx.rYw5bDAPVOZDTrL3piW7HXoXyTZpl5LXJ4Lqxd6AURYg.FiHQbU0HtpFT-wpigZSf3gT_mSKn7RpWvtTGaVRasbYg.JPEG.mnlpo%2Funiversities.jpg&type=sc960_832"
            alt="로고1"
          />
        </ImageSection>

        <PostBox>
          <PostSection>
            <Title>{post.myPost}</Title>
            <PostContent>{post.myPostContent}</PostContent>
            <HashTag>{post.hashTag}</HashTag>

            <ReviewHeader>
              <h3>리뷰 {post.myReview.length}개</h3>
              <ReviewButton onClick={() => setIsModalOpen(true)}>
                리뷰 작성하기
              </ReviewButton>
            </ReviewHeader>

            {post.myReview.map((review, idx) => (
              <ReviewCard key={idx} reviewData={review} />
            ))}
          </PostSection>

          <Sidebar>
            <RequestCard
              name={profile.name}
              major={profile.major}
              school={profile.school}
              email={profile.email}
              profileImageUrl={profile.profileImageUrl}
            />
          </Sidebar>
        </PostBox>
      </Container>

      {isModalOpen && <ReviewModal onClose={() => setIsModalOpen(false)} />}
    </PageContainer>
  );
};

export default PostPage;

const PageContainer = styled.div`
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
  width: 90%;
  max-width: 1350px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 20px;
`;

const Logo = styled.img`
  width: 100%;
  object-fit: contain;
`;

const PostBox = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  max-width: 1200px;
  gap: 80px;
  margin: 0 auto;
`;

const PostSection = styled.div`
  flex: 3;
`;

const Sidebar = styled.div`
  flex: 1;
  position: sticky;
  top: 20px;
  align-self: flex-start;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const PostContent = styled.p`
  line-height: 1.6;
  margin-bottom: 20px;
`;

const HashTag = styled.div`
  color: #4caf4f;
  margin-bottom: 20px;
`;

const ReviewHeader = styled.div`
  margin-top: 60px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewButton = styled.button`
  margin-top: 20px;
  width: 100px;
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
