import styled from 'styled-components';
import theme from '../../../configs/themeVariables';

const BadgeGroupWrap = styled.div`
  .badge-box-wrap {
    .info-key {
      font-weight: 400;
      margin-right: 1rem;
      font-size: 0.8rem;
    }
    .bg-light-success-2 {
      background: ${theme.darkGreenBgColor};
      color: ${theme.darkGreenColor};
    }
    .badge-box {
      max-height: 2rem;
      overflow: hidden;

      .info-key {
        font-weight: 400;
        margin-right: 1rem;
        font-size: 0.75rem;
      }
      .badge {
        margin: 0 0.5rem 0.5rem 0;
        font-size: 0.75rem;
      }
    }
  }

  .truncate-1 {
    display: block;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export default BadgeGroupWrap;
