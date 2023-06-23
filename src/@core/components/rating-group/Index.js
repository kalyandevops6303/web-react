import React from 'react';
import FilledStar from '@src/assets/images/filler_star.png';
import EmptyStar from '@src/assets/images/empty_star.png';
import Rating from 'react-rating';
import RatingWrap from './style';
import RatingBadge from './RatingBadge';

const RatingGroup = () => {
  return (
    <RatingWrap>
      <div className="d-flex rating-row">
        <RatingBadge number={4} />
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
