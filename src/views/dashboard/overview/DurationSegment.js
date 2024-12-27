import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { convertUnixTimestampToDate } from '../../../utility/Utils';
import { selectSavedUserData, selectUserData } from '../../../redux/selectors/authSelectors';
import { appRoles } from '@/utility/constants/Constant';

const DurationSegment = ({ start_date, end_date, showStartDate, showEndDate, showWithdrawnDate, withdrawnDate }) => {
  const userData = useSelector(selectUserData);
  const isFlextern = userData?.app_roles?.includes(appRoles.flexternClient || appRoles.flexternTalent);
  const savedUserData = useSelector(selectSavedUserData);
  return (
    <div className="bottom-detail d-flex mt-1">
      <div className="design-planning-wrapper">
        {showStartDate && (
          <div className="design-planning">
            <p className="mb-25 details-box-title">Start Date</p>
            <p className="mb-0 details-box">
              {`${convertUnixTimestampToDate(start_date, savedUserData?.availability?.timezone?.name, isFlextern)}`}
            </p>
          </div>
        )}
        {showEndDate && (
          <div className="design-planning">
            <p className="mb-25 details-box-title">End Date</p>
            <p className="mb-0 details-box">
              {`${convertUnixTimestampToDate(end_date, savedUserData?.availability?.timezone?.name, isFlextern)}`}
            </p>
          </div>
        )}
        {showWithdrawnDate && (
          <div className="design-planning">
            <p className="mb-25 details-box-title">Withdraw Date</p>
            <p className="mb-0 details-box withdrawn-date">
              {`${convertUnixTimestampToDate(withdrawnDate, savedUserData?.availability?.timezone?.name, isFlextern)}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

DurationSegment.propTypes = {
  start_date: PropTypes.number.isRequired,
  end_date: PropTypes.number.isRequired,
  showStartDate: PropTypes.bool,
  showEndDate: PropTypes.bool,
  showWithdrawnDate: PropTypes.bool,
  withdrawnDate: PropTypes.number,
};

DurationSegment.defaultProps = {
  showStartDate: true,
  showEndDate: true,
  showWithdrawnDate: false,
  withdrawnDate: null,
};
export default DurationSegment;
