import React from 'react';
import PropTypes from 'prop-types';

function PaymentBy({ projectBy = [] }) {
  return (
    <div className="d-flex flex-column" style={{ gap: '60px' }}>
      {projectBy.map((item) => (
        <span key={Math.random()}>{item}</span>
      ))}
    </div>
  );
}

PaymentBy.propTypes = {
  projectBy: PropTypes.array,
};

PaymentBy.defaultProps = {
  projectBy: [],
};

export default PaymentBy;
