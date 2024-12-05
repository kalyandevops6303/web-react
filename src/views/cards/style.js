import styled from 'styled-components';
import theme from '../../configs/themeVariables';
import { userTypes } from '../../utility/constants/Constant';

const IconWrapper = styled.div`
  .gap-70 {
    gap: 0.8rem;
  }
`;

const CardWrap = styled.div`
  .card-body {
    padding: 2.1rem 2.6rem 1.8rem 2.6rem;
  }
`;

const CardInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  font-size: 14px;
  line-height: 22px;
  .info-heading {
    font-weight: 600;
  }
  .info-content {
    font-weight: 400;
  }
`;

const EstimatedTimeHeading = styled.h1`
  background-color: #fbc02d1f;
  width: fit-content;
  padding: 0.5rem 1rem;
  margin-top: 1.5rem;
  border-radius: 0.75rem;
  color: #0284c7;
  font-weight: 600;
`;

const ProjectCardWrap = styled(CardWrap)`
  margin: auto;
  &.blocked {
    border: 1px solid ${theme.red};
    border-radius: 6px;
    margin-bottom: 16px;
    .card {
      margin-bottom: 0;
      .card-elevate {
        &:hover {
          box-shadow: none;
        }
      }
    }
    .card-body {
      padding-top: 20px;
    }
    .blocked-card-info {
      padding: 12px 40px;
      color: ${theme.red};
      background-color: ${theme.lightRedColor};
    }
  }
  margin-top: 1rem;
  width: 98%;
  .card-body {
    padding: 2.1rem 2.6rem 1.4rem 2.6rem;
  }
  a {
    color: inherit;
  }
  .status-row {
    margin-left: -0.5rem;
  }
  .nowrap {
    white-space: nowrap;
  }
  .show-more-less-clickable {
    text-decoration: none;
  }
  .project-stats {
    .project {
      margin-right: 1.2rem;
      .recom {
        margin-right: 0.3rem;
      }
      .mpin {
        margin-right: 0.3rem;
      }
    }
  }
  .name-info-rating-wrapper {
    width: 70%;
  }
  .marketplace-card-title {
    line-height: 1.25rem;
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .marketplace-card-role {
    font-size: 0.8rem !important;
    color: ${theme.gray};
    font-weight: 400;
    line-height: 1.125rem;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .market-place-card-photo {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    cursor: auto !important;
  }
  .rating-label {
    color: ${theme.bodyColor};
    font-weight: 400;
  }
  .project-desc {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  .circular-progressbar-container {
    width: 35px;
    height: 35px;
    margin-left: 4rem;
    .percentage-text {
      font-weight: 400;
      font-size: 10px;
      color: ${theme.headingTextColor};
    }
  }

  //exp

  .truncate {
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .show-more {
    text-decoration: underline;
    color: ${theme.activeNavPillText};
  }
  .show-less {
    display: none;
  }

  .collapsed .show-less {
    display: inline;
  }

  .collapsed .show-more {
    display: none;
  }
  @media only screen and (max-device-width: 600px) {
    .card-body {
      padding: 1rem;
    }
    .show-more {
      margin-bottom: 2rem !important;
    }
  }

  .empty-text {
    font-size: 16px;
    color: ${theme.infoIcon};
  }
`;

const TeamCardWrap = styled(CardWrap)`
  width: 98%;
  margin: auto;
  margin-top: 1rem;
  .card-title {
    font-size: 22px;
    color: ${theme.activeNavPillText};
    line-height: 22px;
  }
  .team-desc {
    width: 56%;
  }

  .market-place-card-photo {
    height: 2.2rem;
    width: 2.2rem;
    border-radius: 50%;
    cursor: auto !important;
  }
  .rating-label {
    color: ${theme.bodyColor};
    font-weight: 400;
  }
  .avatar-wrap {
    .avatars {
      display: flex;
      gap: 6px;
      align-items: center;
    }
  }

  .draft-badge {
    background: ${theme.draftStatusBadgeBg};
    width: fit-content;
    padding: 0.2rem 0.8rem;
    border-radius: 1rem;
    color: black;
    font-weight: 600;
  }

  @media only screen and (max-device-width: 600px) {
    .teamcard-flex-cloumn {
      flex-direction: column;
    }
    .teamcard-width {
      width: 100%;
    }
    .margin-none {
      margin: 5px 0px !important;
    }
  }
`;
const UserCardWrap = styled(CardWrap)`
  // width: ${(props) => (props.clientCard ? '100%' : '50%')};
  @media only screen and (max-device-width: 600px) {
    width: 100%;
  }
  .card {
    margin: 0.8rem 0.7rem !important;
  }
  .alma-mater {
    padding: 3px 4px 0px 4px;
    background-color: ${theme.yellowColor} !important;
    border-radius: 50%;
    margin-bottom: -1px;
  }
  .truncate-1 {
    max-width: 7rem;
    display: inline-block;
    display: block;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .truncate-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    position: relative;
  }
  .truncate-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    position: relative;
  }
  .card-body {
    min-height: ${(props) => (props.userType === userTypes.client ? '14rem' : '11.5rem')};
    padding: 1.2rem 1.2rem 0.8rem 1.2rem !important;
  }
  .marketplace-card-title {
    font-size: 0.9rem;
    line-height: 1.125rem;
    a {
      color: inherit;
    }
  }
  .marketplace-card-role {
    line-height: 1.125rem;
    font-size: 0.75rem !important;
    color: ${theme.gray};
    font-weight: 400;
  }

  .market-place-card-photo {
    height: 2rem;
    border-radius: 50%;
    cursor: auto !important;
  }

  .client-card-photo {
    // height: 2rem;
    border: 3px solid white;
    fill: #fff;
    filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.14));
    border-radius: 50%;
    cursor: auto !important;
  }
  .rating-label {
    color: ${theme.bodyColor};
    font-weight: 400;
  }

  //exp

  .circular-progressbar-container {
    width: 35px;
    height: 35px;
    // margin-left: 1rem;

    .percentage-text {
      font-weight: 400;
      font-size: 10px;
      color: ${theme.headingTextColor};
    }
  }

  .truncate {
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .show-more {
    text-decoration: underline;
    cursor: pointer;
  }

  .show-less {
    display: none;
  }

  .collapsed .show-less {
    display: inline;
  }

  .collapsed .show-more {
    display: none;
  }

  @media only screen and (max-device-width: 600px) {
    .card-body {
      padding: 1rem;
    }
    .desc {
      margin-bottom: 1rem !important;
    }
  }
`;

const ClientCardWrap = styled(CardWrap)`
  @media only screen and (max-device-width: 600px) {
    width: 100%;
  }
  .card {
    margin: 0.8rem 0.7rem !important;
  }
  .alma-mater {
    padding: 3px 4px 0px 4px;
    background-color: ${theme.yellowColor} !important;
    border-radius: 50%;
    margin-bottom: -1px;
  }
  .truncate-1 {
    max-width: 7rem;
    display: inline-block;
    display: block;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .truncate-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    position: relative;
  }
  .truncate-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    position: relative;
  }
  .card-body {
    padding: 1.2rem 1.2rem 0.8rem 1.2rem !important;
  }
  .marketplace-card-title {
    font-size: 0.9rem;
    line-height: 1.125rem;
    a {
      color: inherit;
    }
  }
  .marketplace-card-role {
    line-height: 1.125rem;
    font-size: 0.75rem !important;
    color: ${theme.gray};
    font-weight: 400;
  }

  .market-place-card-photo {
    height: 2rem;
    border-radius: 50%;
    cursor: auto !important;
  }

  .client-card-photo {
    // height: 2rem;
    border: 3px solid white;
    fill: #fff;
    filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.14));
    border-radius: 50%;
    cursor: auto !important;
  }
  .rating-label {
    color: ${theme.bodyColor};
    font-weight: 400;
  }

  //exp

  .circular-progressbar-container {
    width: 35px;
    height: 35px;
    // margin-left: 1rem;

    .percentage-text {
      font-weight: 400;
      font-size: 10px;
      color: ${theme.headingTextColor};
    }
  }

  .truncate {
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .show-more {
    text-decoration: underline;
    cursor: pointer;
  }

  .show-less {
    display: none;
  }

  .collapsed .show-less {
    display: inline;
  }

  .collapsed .show-more {
    display: none;
  }

  @media only screen and (max-device-width: 600px) {
    .card-body {
      padding: 1rem;
    }
    .desc {
      margin-bottom: 1rem !important;
    }
  }
`;

const ResponsiveGrid = styled.div`
  margin: 0 -12px;
  @media only screen and (max-device-width: 800px) {
    .responsive-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

const BidsReceivedWrapper = styled.div`
  .wrapper-title {
    font-size: 0.8rem;
  }

  .total-count {
    border-radius: 17px;
    border: 1px solid ${theme.newTagColor};
    background: rgba(194, 217, 255, 0.12);
    margin-top: -6px;
  }

  .relist-btn-wrapper {
    .btn-outline-primary:hover:not(.disabled):not(:disabled) {
      background-color: ${theme.primary};
    }

    .btn-outline-primary:hover:not(.disabled):not(:disabled) {
      color: ${theme.white};
    }

    .btn:hover {
      background-color: ${theme.primary} !important;
      border-color: ${theme.primary} !important;
    }
  }
`;

const CustomDraftProjectBadge = styled.span`
  .DRAFT {
    background: ${theme.draftStatusBadgeBg};
    color: ${theme.draftStatusBadgeColor};
    border: ${(props) => (props.bordered ? `1px solid ${theme.draftStatusBadgeColor}` : 'none')};
  }
  .rounded-corner {
    border-radius: 1.0625rem;
  }
`;

const DraftSkillsAndToolsContainer = styled.div`
  .heading {
    font-weight: 400;
    margin-right: 1rem;
    font-size: 0.8rem;
  }
  .empty-text {
  }
`;

export {
  CardWrap,
  ProjectCardWrap,
  CardInfoWrapper,
  TeamCardWrap,
  UserCardWrap,
  ClientCardWrap,
  ResponsiveGrid,
  BidsReceivedWrapper,
  IconWrapper,
  CustomDraftProjectBadge,
  DraftSkillsAndToolsContainer,
  EstimatedTimeHeading,
};
