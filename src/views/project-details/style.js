import styled from 'styled-components';
import theme from '../../configs/themeVariables';

const LeftSidebarProjectDetailsWrapper = styled.div`
  // header
  .status-head {
    .days {
      color: ${theme.red};
      font-weight: 500;
    }
  }
  .title {
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.3125rem;
    margin-top: 1.2rem;
  }

  // user details

  .project-details-card-photo {
    height: 2.5rem;
    border-radius: 50%;
  }
  .rating-label {
    color: ${theme.bodyColor};
    font-weight: 300;
  }

  //stats
  .stats {
    .stat-avatar {
      padding: 0.3rem;
      height: fit-content;
    }
    .date {
      svg {
        color: ${theme.royalBlueColor};
      }
    }
    .stat-value {
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.3rem; /* 164.286% */
      color: ${theme.headingTextColor};
    }
    .stat-key {
      font-size: 0.75rem;
      font-weight: 300;
      line-height: 1.125rem; /* 150% */
    }
  }

  // Project-details
  .project-details {
    .main-title {
      font-weight: 400 !important;
      border-bottom: 1px solid ${theme.cardHeaderBorderColor};
      padding-bottom: 0.2rem;
      font-size: 1.25rem;
    }
  }
  .info-key {
    font-weight: 300;
    margin-right: 1rem;
  }

  // Project-desc
  .project-desc {
    .project-desc-title {
      font-weight: 400;
    }
    .value {
      font-weight: 300;
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { LeftSidebarProjectDetailsWrapper };
