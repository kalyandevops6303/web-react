import styled from 'styled-components';
import theme from '../../../configs/themeVariables';

const RatingWrap = styled.div`
  .rating-row {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    .rating-badge {
      display: inline-flex;
      align-items: center;
      color: ${theme.textColor} !important;
      gap: 0.2rem;
      img {
        height: 0.8rem;
      }
    }
    .ratings {
      padding-bottom: 0.2rem;
    }
  }
`;
export default RatingWrap;
