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
        <b>Note : Milestone 3&4&nbsp;</b>
        <span>
          Payment is due at end of Milestone 1 and must be paid before end of Milestone 2. If Payment is not received by
          end of <b>Milestone 2</b>, project goes on hold. Project Terminates if no payment is received 1 weeks after it
          is past due.
        </span>
      </div>
    </div>
  );
}

export default MilestoneInfo;
