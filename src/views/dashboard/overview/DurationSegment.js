import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { convertUnixTimestampToDate } from '../../../utility/Utils';
import { selectSavedUserData } from '../../../redux/selectors/authSelectors';

const DurationSegment = ({ start_date, end_date }) => {
    const savedUserData = useSelector(selectSavedUserData);
  return(
  <div className="bottom-detail d-flex mt-1">
    <div className="design-planning-wrapper">
      <div className="design-planning">
        <p className="mb-25 details-box-title">
          Start Date
        </p>
        <p className="mb-0 details-box">
          {/* {`${
          DateTime.fromMillis(start_date).toFormat('MMM dd, yy') || '-'
        }`} */}
        {`${
          convertUnixTimestampToDate(start_date, savedUserData?.availability?.timezone?.name || 'America/New_York') || '-'
        }`}
        </p>
      </div>
      <div className="design-planning">
        <p className="mb-25 details-box-title">
          End Date
        </p>
        <p className="mb-0 details-box">
          {/* {`${
          DateTime.fromMillis(end_date).toFormat('MMM dd, yy') || '-'
        }`} */}
         {`${
          convertUnixTimestampToDate(end_date, savedUserData?.availability?.timezone?.name || 'America/New_York') || '-'
        }`}
        </p>
      </div>
    </div>
  </div>
);};

DurationSegment.propTypes = {
  start_date: PropTypes.number.isRequired, 
  end_date: PropTypes.number.isRequired, 
};

export default DurationSegment;
