import styled from 'styled-components';
import theme from '../../configs/themeVariables';

const CardWrap = styled.div`
  .card-body {
    padding: 2.1rem 2.6rem 2.6rem;
  }
`;

const ProjectCardWrap = styled(CardWrap)`
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
  .marketplace-card-title {
    font-size: 22px;
    color: ${theme.activeNavPillText};
    line-height: 22px;
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
  }
  .rating-label {
    color: ${theme.bodyColor};
    font-weight: 300;
  }
`;
export { CardWrap, ProjectCardWrap, InstituteCardWrap, UserCardWrap };
