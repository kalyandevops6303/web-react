import styled from 'styled-components';
import theme from '../../configs/themeVariables';
import { userTypes } from '../../utility/constants/Constant';

const CardWrap = styled.div`
  .card-body {
    padding: 2.1rem 2.6rem 1.8rem 2.6rem;
  }
`;

const ProjectCardWrap = styled(CardWrap)`
  width: 100%;
  .card-body {
    padding: 2.1rem 2.6rem 1.4rem 2.6rem;
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
  .marketplace-card-title {
    line-height: 18px;
  }
  .marketplace-card-role {
    font-size: 18px;
    color: ${theme.gray};
    font-weight: 300;
    line-height: 18xp;
  }

  .market-place-card-photo {
    height: 2.2rem;
    border-radius: 50%;
    cursor: auto !important;
  }
  .rating-label {
    color: ${theme.bodyColor};
    font-weight: 300;
  }
  .project-desc {
    font-weight: 300;
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
`;

const InstituteCardWrap = styled(CardWrap)`
  .card-title {
    font-size: 22px;
    color: ${theme.activeNavPillText};
    line-height: 22px;
  }
  .institute-desc {
    width: 56%;
  }

  .market-place-card-photo {
    height: 2.2rem;
    border-radius: 50%;
    cursor: auto !important;
  }
  .rating-label {
    color: ${theme.bodyColor};
    font-weight: 300;
  }
  .avatar-wrap {
    .avatars {
      display: flex;
      gap: 6px;
      align-items: center;
    }
  }
`;
const UserCardWrap = styled(CardWrap)`
  width: 50%;
  @media only screen and (max-device-width: 600px) {
    width: 100%;
  }
  .card {
    margin: 0.8rem 0.7rem !important;
  }
  .truncate-1 {
    width: 12rem;
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
    padding: 1rem 1rem 0.8rem 1rem !important;
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
    font-weight: 300;
  }

  .market-place-card-photo {
    height: 2rem;
    border-radius: 50%;
    cursor: auto !important;
  }
  .rating-label {
    color: ${theme.bodyColor};
    font-weight: 300;
  }

  //exp

  .circular-progressbar-container {
    width: 35px;
    height: 35px;
    margin-left: 1rem;

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
export { CardWrap, ProjectCardWrap, InstituteCardWrap, UserCardWrap };
