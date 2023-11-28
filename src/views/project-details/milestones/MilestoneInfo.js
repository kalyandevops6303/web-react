import React, { useEffect, useState } from 'react';
import { Info } from 'react-feather';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { userData } from '../../../redux/selectors/dashboardSelectors';
import { PAYMENT_STATUS, userTypes } from '../../../utility/constants/Constant';

function MilestoneInfo({ milestonesData, currentIndex }) {
  const userDetailsData = useSelector(userData);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const isAllMilestonePaid = milestonesData.every(
    (mile) => mile.payment_status === PAYMENT_STATUS.PAID || mile.payment_status === PAYMENT_STATUS.PAYMENT_SUCCESSFUL,
  );
  const isClient = userDetailsData?.user_type === userTypes.client;
  const milestoneCount = milestonesData?.length;
  const isPaymentDone = (milestone) =>
    milestone?.payment_status === PAYMENT_STATUS.PAID ||
    milestone?.payment_status === PAYMENT_STATUS.PAYMENT_SUCCESSFUL;

  const isFirstTwoMilestonePaid = isPaymentDone(milestonesData[0]) && isPaymentDone(milestonesData[1]);

  const firstNonPaidMilestone = milestonesData.find((mile) => !isPaymentDone(mile));
  const showInfo = () => {
    if (isClient) {
      if (isAllMilestonePaid) return false;
      if (milestoneCount === 1) return true;
      if (!isFirstTwoMilestonePaid && currentIndex === 1) {
        return true;
      }

      if (milestoneCount > 2 && currentIndex > 1 && milestonesData[currentIndex]?._id === firstNonPaidMilestone?._id) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (showInfo()) setIsInfoVisible(true);
    else setIsInfoVisible(false);
  }, []);

  return isInfoVisible ? (
    <div
      className="d-flex w-100 p-1"
      style={{
        background: 'rgba(1, 133, 228, 0.12)',
        fontSize: '15px',
        color: '#0185E4',
        borderRadius: '0px 0px 6px 6px',
      }}
    >
      <div>
        <Info size={18} color="#0185E4" id="amount-info" className="me-50" style={{ marginBottom: '4px' }} />
      </div>
      {milestoneCount === 1 ? (
        <div>
          <span>
            Complete the payment for <b>Milestone: {milestonesData[currentIndex]?.name}</b>.
          </span>
        </div>
      ) : null}
      {!isFirstTwoMilestonePaid ? (
        <div>
          <span>
            Complete payment for the <b>first two</b> milestones to start the project.
          </span>
        </div>
      ) : null}
      {milestoneCount > 2 && currentIndex > 1 && milestonesData[currentIndex]?._id === firstNonPaidMilestone?._id && (
        <div>
          <span>
            <strong>{`${milestonesData[currentIndex]?.name} `}</strong>
            {`payment is due at the end of `}
            <strong>{`${milestonesData[currentIndex - 2]?.name}`}</strong>
            {` and must be paid before the end of `}
            <strong>{` ${milestonesData[currentIndex - 1]?.name}`}</strong>
            {`. If payment is not received by the end of `}
            <strong>{`${milestonesData[currentIndex - 1]?.name}`}</strong>, the project goes on hold. The project
            terminates if no payment is received within 1 week of the due date.
          </span>
        </div>
      )}
    </div>
  ) : null;
}

MilestoneInfo.propTypes = {
  milestonesData: PropTypes.array,
  currentIndex: PropTypes.number,
};

MilestoneInfo.defaultProps = {
  milestonesData: [],
  currentIndex: 0,
};

export default MilestoneInfo;
