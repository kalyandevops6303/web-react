import React from 'react';
import { Info } from 'react-feather';

function MilestoneInfo() {
  return (
    <div
      className="d-flex w-100 p-1"
      style={{
        background: 'rgba(1, 133, 228, 0.12)',
        height: '74px',
        fontSize: '15px',
        color: '#0185E4',
        borderRadius: '0px 0px 6px 6px',
      }}
    >
      <div>
        <Info size={18} color="#0185E4" id="amount-info" className="me-50" style={{ marginBottom: '4px' }} />
      </div>
      <div>
        <b>Note : </b>
        <span>Milestone payments need to be made for 2 periods in advance for the project to continue.</span>
      </div>
    </div>
  );
}

export default MilestoneInfo;
