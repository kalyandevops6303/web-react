import { Card } from 'reactstrap';
import styled from 'styled-components';
import theme from '../../../configs/themeVariables';

const gradeColors = {
  "Novice": "#FBC02D",
  "Intermediate": "#00BCD4",
  "Proficient": "#7C4DFF",
  "Mastery": "#414DFD",
}

const getPadding = (props) => {
  if (props.time) {
    return '1.22rem';
  }
  if (props.isMarketPlaceTab) {
    return '1.2rem 1.5rem';
  }
  return '1.4rem 1.2rem';
};

const StatboxWrap = styled(Card)`
  border: 1.5px solid ${(props) => (props.isActive ? `${theme.blueBorderColorv2} !important` : '')}; // active-border color
  background: ${(props) => (props.isActive ? `${theme.blueCardBg} !important` : '')}; // active-bg color
  flex: ${(props) => props.isMarketPlaceTab && '1'};
  svg {
    height: ${(props) => props.isMarketPlaceTab && '1.5rem'};
  }
  .card-body {
    padding: ${(props) => getPadding(props)};
  }
  .stat-avatar {
    padding: ${(props) => (props.isMarketPlaceTab ? '0.35rem' : '0.2rem')};
    cursor: auto;
  }
  .stat-desc {
    font-weight: 400;
    font-size: 13px;
  }
  .time {
    font-size: 13px;
  }

  .bg-light-orange {
    background: ${theme.badgeIconOrange}1f; // light-orange
    svg {
      color: ${theme.badgeIconOrange}; // orange
    }
  }
  .bg-light-turquoise {
    background: ${theme.turquoiseColor}1f; // light-turquoise
    svg {
      color: ${theme.turquoiseColor}; // turquoise
    }
  }
  .bg-light-blue {
    background: ${theme.royalBlueColor}1f; // light-blue
    svg {
      color: ${theme.royalBlueColor}; // blue
    }
  }
  .bg-light-purple {
    background: ${theme.purpleColor}1f; // light-purple
    svg {
      color: ${theme.purpleColor}; // purple
    }
  }
  .bg-light-purple-2 {
    background: ${theme.purpleTimelimeColor}1f; // light-purple-2
    svg {
      color: ${theme.purpleTimelimeColor}; // purple
    }
  }
  .bg-light-info {
    background: ${theme.info}1f; // light-purple
    svg {
      color: ${theme.info}; // purple
    }
  }
  .bg-light-green {
    background: ${theme.green}1f; // light-purple
    svg {
      color: ${theme.green}; // purple
    }
  }
  .bg-light-dark-red {
    background: ${theme.darkRedColor}1f; // light-purple
    svg {
      color: ${theme.darkRedColor}; // purple
    }
  }
  .bg-light-red {
    background: ${theme.red}1f; // light-purple
    svg {
      color: ${theme.red}; // purple
    }
  }

  .no-border-radius {
    border-radius: 0 !important;
  }
`;

const LeftSidebarProfileWrapper = styled.div`
  .outline-btn {
    font-size: 13px;
  }
  .not-clickable {
    cursor: auto !important;
  }
  .btn-outline-primary:hover:not(.disabled):not(:disabled) {
    background: inherit !important;
    color: ${theme.primary} !important;
  }
  .btn-outline-primary:focus:not(.disabled):not(:disabled) {
    background: inherit !important;
    color: ${theme.primary} !important;
  }
  .user-image {
    display: flex;
    img {
      height: 7.5rem;
      margin: 3rem auto 1.5rem auto;
      border-radius: 6px;
    }
  }

  .public {
    margin: 1rem auto 1.8rem auto;
    .user-name {
      font-size: 17px;
      font-weight: 400;
    }
  }

  .private {
    margin: 1rem auto 1.8rem auto;
    .user-name {
      font-size: 17px;
      font-weight: 600;
    }
  }

  .projects-rating {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      margin: 0 0.2rem;
    }
    .project-text {
      font-weight: 400;
    }
  }

  .user-details {
    .main {
      font-weight: 400 !important;
      border-bottom: 1px solid ${theme.cardHeaderBorderColor};
      padding-bottom: 0.5rem;
    }
    .uni-name {
      font-size: 16px;
    }
  }

  .info-key {
    font-weight: 400;
    margin-right: 1rem;
  }

  .social-links {
    .avatar {
      img {
        border-radius: 0;
      }
    }
  }

  .report-text {
    color: #ea5455;
    font-size: 16px;
  }

  .profile-completion {
    display: flex;
    margin: auto;
    width: 9rem;
    flex-direction: column;
  }

  // Invited box
  .invited-box {
    button {
      padding: 0.8rem 1rem;
    }
  }

  .project-rating-count {
    font-weight: 300;
  }
  .client-name {
    line-height: 1.75rem;
  }
  .client-title {
    line-height: 1.5rem;
  }
`;

const DownloadIconContainer = styled.div`
  background: ${theme.uploadIconBackground};
  border-radius: 50%;
  padding: 4px 5px;
  width: fit-content;
`;

const UserBioWrap = styled.div`
  .card {
    min-height: 8rem;
  }
  .user-cover {
    height: 10rem;
    object-fit: contain;
  }
  .text-edit {
    color: ${theme.blueBorderColor};
  }
  .user-info {
    .title {
      font-size: 15px;
    }
    width: 65%;
    padding-right: 1.5rem;
  }
  @media (max-width: 768px) {
    .card-body {
      flex-direction: column;
    }
    .user-info {
      margin-bottom: 1rem;
      width: 100%;
      padding: 0;
    }
  }
`;

const RecentProjectsWrap = styled.div`
  .text-edit {
    color: ${theme.blueBorderColor};
  }
  .card .card {
    box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1) !important;
  }
  .empty {
    margin-top: -3.5rem;
    padding-top: 1rem;
    min-height: 5rem;
  }
`;
const RecentProjectWrap = styled.div`
  .outline-btn {
    font-size: 13px;
  }
  border-radius: 12px;
  .user-cover {
    height: 8rem;
    object-fit: cover;
    border-radius: 6px;
  }
  .card-body {
    padding: 1rem 1.5rem;
  }
  .role-section {
    gap: 1rem;
  }

  .project-desc {
    font-weight: 400 !important;
    min-height: 6rem;
  }
  .truncate-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ReviewsContainer = styled.div`
  .review-title {
    font-weight: 400;
    border-bottom: 1px solid ${theme.cardHeaderBorderColor};
    padding-bottom: 1rem;
    margin: 0 2.5rem;
  }
  .empty {
    padding-top: 2rem;
    min-height: 5rem;
  }
`;
const ReviewWrap = styled.div`
  width: 85%;
  @media (max-width: 768px) {
    width: 100%;
  }
  display: flex;
  gap: 1rem;
  margin-bottom: 1.2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${theme.cardHeaderBorderColor};
  &:last-child {
    border-bottom: none;
  }
  .user-image {
    height: 5rem;
    border-radius: 50%;
  }
  .fw-300 {
    font-weight: 400;
  }
  .rounded-pill {
    border: 1px solid;
    font-weight: 500;
    margin-right: 0.8rem;
  }
  .bg-light-info {
    background: #f2fcfc !important;
  }
`;

const ActionButtonWrapper = styled.div`
  .btn-head-padding-25 {
    padding-right: 2.5rem;
    padding-left: 2.5rem;
  }
  .w-47 {
    width: 47%;
  }
`;

const DetailsWrap = styled.div`
  .content-header-left {
    margin-bottom: 0 !important;
  }
  .report-text {
    color: ${theme.red};
  }
  .top-head {
    position: relative;
    .fixed-header {
      top: 4rem;
      left: 0;
      position: fixed;
      z-index: 20;
      background-color: ${theme.bodyBgColor};
      width: 100%;
      padding: 1.8rem 2rem 0.8rem 2rem;
    }
  }

  // Back wrap
  .back-wrap {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    cursor: pointer;
    .chevron-left-bg {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background: ${theme.activeColor}1f;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .back-text {
      color: ${theme.activeColor};
    }
  }
`;

const DetailsHeaderSection = styled.div`
  .fixed-head {
    z-index: 20;
    margin-top: -5.2rem;
    padding-top: 1rem;
    position: fixed;
    width: 74%;
    background: ${theme.bodyBgColor};
    padding-bottom: 0.8rem;
    margin-left: 0.8rem;
    padding-left: 0;
    .inner-head {
      display: flex;
      justify-content: space-between;
      padding-right: 1rem;
      .back {
        padding-top: 0.5rem;
      }
    }
  }
  .details-card {
    margin-top: 0.6rem;
  }
`;

const AssessedSkillGradeBar = styled.div`
  width: 4px;
  align-self: stretch;
  border-radius: 6px;
  background: ${({ grade }) => gradeColors[grade] || 'gray'};
`

const AssessmentResultText = styled.div`
  text-transform: uppercase;
  color: ${({ grade }) => gradeColors[grade] || 'gray'};
`

export {
  ActionButtonWrapper,
  StatboxWrap,
  ReviewWrap,
  LeftSidebarProfileWrapper,
  DownloadIconContainer,
  UserBioWrap,
  RecentProjectsWrap,
  ReviewsContainer,
  RecentProjectWrap,
  DetailsWrap,
  DetailsHeaderSection,
  AssessedSkillGradeBar,
  AssessmentResultText
};
