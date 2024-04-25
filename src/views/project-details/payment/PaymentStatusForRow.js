import React from 'react';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import { PAYMENT_STATUS, paymentText } from '../../../utility/constants/Constant';

function PaymentStatusForRow({ paymentStatus = [], isClient }) {
  const getTagSettings = (tag) => {
    if (tag === PAYMENT_STATUS.PAYMENT_FAILED || tag === PAYMENT_STATUS.FAILED) {
      return { theme: 'light-danger', text: paymentText.PAYMENT_FAILED };
    }
    if (tag === PAYMENT_STATUS.PAYMENT_DUE || tag === PAYMENT_STATUS.PENDING) {
      return { theme: 'light-warning', text: isClient ? paymentText.PAYMENT_DUE : paymentText.FUNDS_UNAVAILABLE };
    }
    if (tag === PAYMENT_STATUS.PAYMENT_PROCESSING) {
      return { theme: 'light-primary', text: paymentText.PAYMENT_PROCESSING };
    }
    if (tag === PAYMENT_STATUS.INITIATED) {
      return { theme: 'light-primary', text: paymentText.PAYMENT_INITIATED };
    }
    if (tag === PAYMENT_STATUS.PAYMENT_SUCCESSFUL || tag === PAYMENT_STATUS.PAID) {
      return { theme: 'light-success', text: paymentText.PAID };
    }
    return { theme: 'light-primary', text: tag };
  };

  return (
    <div className="d-flex flex-column" style={{ gap: '60px' }}>
      {paymentStatus.map((status) => (
        <div key={Math.random()}>
          <Badge color={getTagSettings(status).theme}>{getTagSettings(status).text}</Badge>
        </div>
      ))}
    </div>
  );
}

PaymentStatusForRow.propTypes = {
  paymentStatus: PropTypes.array,
  isClient: PropTypes.bool,
};

PaymentStatusForRow.defaultProps = {
  paymentStatus: [],
  isClient: false,
};
export default PaymentStatusForRow;
