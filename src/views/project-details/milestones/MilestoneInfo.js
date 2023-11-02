import React from 'react';
import { Info } from 'react-feather';
import PropTypes from 'prop-types';

function MilestoneInfo({ milestoneCount, milestoneData, currentIndex }) {
  return (
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
      {milestoneCount < 3 ? (
        <div>
          <span>
            Complete the payment for atleast <b>2</b> milestones to proceed.
          </span>
        </div>
      ) : null}
      {milestoneCount > 2 && (
        <div>
          <span>
            {`Payment is due at the end of `}
            <strong>{`${milestoneData[currentIndex - 2]?.name}`}</strong>
            {` and must be paid before the end of `}
            <strong>{` ${milestoneData[currentIndex - 1]?.name}`}</strong>
            {`. If payment is not received by the end of `}
            <strong>{`${milestoneData[currentIndex - 1]?.name}`}</strong>, the project goes on hold. The project
            terminates if no payment is received within 1 week of the due date.
          </span>
        </div>
      )}
    </div>
  );
}

MilestoneInfo.propTypes = {
  milestoneCount: PropTypes.number,
  milestoneData: PropTypes.array,
  currentIndex: PropTypes.number,
};

MilestoneInfo.defaultProps = {
  milestoneCount: 0,
  milestoneData: [],
  currentIndex: 0,
};

export default MilestoneInfo;
