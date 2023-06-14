import styled from 'styled-components';
import theme from '../../../configs/themeVariables';

const BadgeGroupWrap = styled.div`
  .badge-box-wrap {
    .bg-light-blue {
      background: ${theme.lightBlueBgColor};
      color: ${theme.lightBlueColor};
    }
    .bg-light-success-2 {
      background: ${theme.darkGreenBgColor};
      color: ${theme.darkGreenColor};
    }
    .badge-box {
      .info-key {
        font-weight: 300;
        margin-right: 1rem;
      }
      .badge {
        margin: 0 0.5rem 0.9rem 0;
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
