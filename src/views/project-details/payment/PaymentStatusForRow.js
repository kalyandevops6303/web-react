import React from 'react';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import { PAYMENT_STATUS } from '../../../utility/constants/Constant';

function PaymentStatusForRow({ paymentStatus = [] }) {
  const getTagSettings = (tag) => {
    if (tag === PAYMENT_STATUS.PAYMENT_FAILED || tag === PAYMENT_STATUS.FAILED) {
      return { theme: 'light-danger', text: 'Payment Failed' };
    }
    if (tag === PAYMENT_STATUS.PAYMENT_DUE || tag === PAYMENT_STATUS.PENDING) {
      return { theme: 'light-warning', text: 'Milestone In Progress' };
    }
    if (tag === PAYMENT_STATUS.PAYMENT_PROCESSING) {
      return { theme: 'light-primary', text: 'Payment Processing' };
    }
    if (tag === PAYMENT_STATUS.INITIATED) {
      return { theme: 'light-primary', text: 'Payment Initiated' };
    }
    if (tag === PAYMENT_STATUS.PAYMENT_SUCCESSFUL) {
      return { theme: 'light-success', text: 'Funds Available' };
    }
    if (tag === PAYMENT_STATUS.PAID) {
      return { theme: 'light-success', text: 'Paid' };
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
};

PaymentStatusForRow.defaultProps = {
  paymentStatus: [],
};
export default PaymentStatusForRow;
