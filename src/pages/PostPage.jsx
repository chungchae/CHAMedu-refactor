// src/pages/PostDetail.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ConsultRequestCard from "../components/ConsultRequestCard";
import ReviewCard from "../components/ReviewCard";
import post from "../constants/json/Post.json";
import profile from "../constants/json/Profile.json";
import ReviewModal from "../components/ReviewModal";

const PostPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalReviews = post.myReview ? post.myReview.length : 0;
  const totalPages = Math.max(1, Math.ceil(totalReviews / pageSize));
  const [bannerCollapsed, setBannerCollapsed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setBannerCollapsed(y > 120);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <PageContainer>
      <ImageBannerFull $collapsed={bannerCollapsed} style={{ backgroundImage: `url(${post.backgroundImage})` }} />

      <Container>
        <PostBox>
          <PostSection>
            <PostCard>
              <Title>{post.myPost || "제목 없음"}</Title>
              <PostContent>{post.myPostContent}</PostContent>
              <HashTag>
                {(post.hashTag || "").split(/\s+/).filter(Boolean).map((t, i) => (
                  <Tag key={i}>{t.replace(/^#/, "#")}</Tag>
                ))}
              </HashTag>
            </PostCard>

            <ReviewHeader>
              <h3>리뷰 {totalReviews}개</h3>
              <ReviewButton onClick={() => setIsModalOpen(true)}>
                리뷰 작성하기
              </ReviewButton>
            </ReviewHeader>

            <ReviewsList>
              {post.myReview && post.myReview.slice((currentPage-1)*pageSize, currentPage*pageSize).map((review, idx) => (
                <ReviewCard key={idx} reviewData={review} />
              ))}
            </ReviewsList>

            <PaginationBar>
              <SmallBtn onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                이전
              </SmallBtn>
              <PageIndicator>{currentPage} / {totalPages}</PageIndicator>
              <SmallBtn onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                다음
              </SmallBtn>
            </PaginationBar>
          </PostSection>

          <Sidebar>
            <ConsultRequestCard
              name={profile.name}
              major={profile.major}
              school={profile.school}
              email={profile.email}
              profileImageUrl={profile.profileImageUrl}
              onRequestClick={() => alert("상담 신청 모달은 아직 준비중입니다.")}
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
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 20px 48px;
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
  width: 78%;
  max-width: 1160px;
  gap: 48px;
  margin: 0 auto;
`;

const PostSection = styled.div`
  flex: 3;
`;

const Sidebar = styled.div`
  width: 320px;
  flex: 0 0 320px;
  position: sticky;
  top: 100px;
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
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const Tag = styled.span`
  display: inline-block;
  background: #eaf6ec;
  color: #2f8a3a;
  border-radius: 999px;
  padding: 6px 10px;
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.06);
`;

const PostCard = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 24px 28px;
  box-shadow: 0 8px 30px rgba(15,23,42,0.04);
`;

const ReviewHeader = styled.div`
  margin-top: 32px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  h3 { margin: 0; font-size: 1.125rem; }
`;

const ReviewButton = styled.button`
  padding: 8px 12px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
  color: #6e6e6e;
  background-color: #fff;
  cursor: pointer;
  margin-left: auto;
  box-shadow: 0 6px 16px rgba(15,23,42,0.04);
  font-weight: 600;

  &:hover {
    background-color: #f7fdf8;
    color: #3d8a3b;
  }
`;

const ImageBanner = styled.div`
  width: 100%;
  height: 240px;
  background-position: center;
  background-size: cover;
  border-radius: 12px;
  margin-bottom: 18px;
`;

const ImageBannerFull = styled.div`
  width: 100vw;
  height: ${(p) => (p.$collapsed ? "180px" : "420px")};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: block;
  transition: height 320ms ease, background-size 320ms ease;
  will-change: height;
`;

const PageControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SmallBtn = styled.button`
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
  color: #333;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageIndicator = styled.span`
  font-size: 0.95rem;
  color: #8b92a0;
`;

const PaginationBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 18px;
  margin-bottom: 18px;
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 12px;
`;
