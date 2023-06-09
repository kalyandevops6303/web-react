import React from 'react';
import FilledStar from '@src/assets/images/filler_star.png';
import EmptyStar from '@src/assets/images/empty_star.png';
import { Badge } from 'reactstrap';
import Rating from 'react-rating';
import RatingWrap from './style';

const RatingGroup = () => {
  return (
    <RatingWrap>
      <div className="d-flex rating-row">
        <Badge color="light-warning" className="rating-badge">
          <img height={14} src={FilledStar} alt="Filled star" />
          4.5
        </Badge>
        <Rating
          className="ratings"
          initialRating={4}
          emptySymbol={<img height={14} src={EmptyStar} alt="Empty star" />}
          fullSymbol={<img height={14} src={FilledStar} alt="Filled star" />}
          readonly
        />
      </div>
    </RatingWrap>
  );
};

export default RatingGroup;
