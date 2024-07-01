import React from 'react';
import PropTypes from 'prop-types';
import DateTime from '../../../lib/date-time';

const DurationSegment = ({ start_date, end_date }) => (
  <div className="bottom-detail d-flex mt-1">
    <div className="design-planning-wrapper">
      <div className="design-planning">
        <p className="mb-25" style={{ color: '#B9B9C3', fontSize: '1.2rem' }}>
          Start Date
        </p>
        <p style={{ color: 'black', fontSize: '1.2rem' }} className="mb-0">{`${
          DateTime.fromMillis(start_date).toFormat('MMM dd, yy') || '-'
        }`}</p>
      </div>
      <div className="design-planning">
        <p className="mb-25" style={{ color: '#B9B9C3', fontSize: '1.2rem' }}>
          End Date
        </p>
        <p style={{ color: 'black', fontSize: '1.2rem' }} className="mb-0">{`${
          DateTime.fromMillis(end_date).toFormat('MMM dd, yy') || '-'
        }`}</p>
      </div>
    </div>
  </div>
);

DurationSegment.propTypes = {
  start_date: PropTypes.number.isRequired, 
  end_date: PropTypes.number.isRequired, 
};

export default DurationSegment;
