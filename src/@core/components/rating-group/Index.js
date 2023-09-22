import React from 'react';
import PropTypes from 'prop-types';
import FilledStar from '@src/assets/images/filler_star.png';
import EmptyStar from '@src/assets/images/empty_star.png';
import Rating from 'react-rating';
import RatingWrap from './style';
import RatingBadge from './RatingBadge';

const RatingGroup = ({ rating }) => {
  return (
    <RatingWrap>
      <div className="d-flex rating-row">
        <RatingBadge number={rating || 0} />
        <Rating
          className="ratings"
          initialRating={rating || 0}
          emptySymbol={<img height={14} src={EmptyStar} alt="Empty star" />}
          fullSymbol={<img height={14} src={FilledStar} alt="Filled star" />}
          readonly
        />
      </div>
    </RatingWrap>
  );
};
RatingGroup.propTypes = {
  rating: PropTypes.number,
};
RatingGroup.defaultProps = {
  rating: 0,
};

export default RatingGroup;
