import { Card } from 'reactstrap';
import styled from 'styled-components';
import theme from '../../../configs/themeVariables';

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
  border: 1px solid ${(props) => (props.isActive ? `${theme.blueBorderColorv2} !important` : '')}; // active-border color
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
    font-weight: 300;
    font-size: 13px;
  }
  .time {
    font-size: 13px;
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
      font-weight: 300;
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
      font-weight: 300;
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
    font-weight: 300;
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
    font-weight: 300 !important;
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
    font-weight: 300;
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
    font-weight: 300;
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
export {
  StatboxWrap,
  ReviewWrap,
  LeftSidebarProfileWrapper,
  UserBioWrap,
  RecentProjectsWrap,
  ReviewsContainer,
  RecentProjectWrap,
};
