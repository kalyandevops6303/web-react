import React from 'react';
import FilledStar from '@src/assets/images/filler_star.png';
import { Badge } from 'reactstrap';
import styled from 'styled-components';
import theme from '../../../configs/themeVariables';
import { returnFormattedRating } from '../../../utility/Utils';

const RatingBadge = ({ number }) => {
  const BadgeWrap = styled.div`
    .rating-badge {
      display: inline-flex;
      align-items: center;
      color: ${theme.textColor} !important;
      gap: 0.2rem;
      img {
        height: 0.8rem;
      }
    }
  `;
  return (
    <BadgeWrap>
      <Badge color="light-warning" className="rating-badge">
        <img height={14} src={FilledStar} alt="Filled star" />
        {returnFormattedRating(number, 1)}
      </Badge>
    </BadgeWrap>
  );
};

export default RatingBadge;
