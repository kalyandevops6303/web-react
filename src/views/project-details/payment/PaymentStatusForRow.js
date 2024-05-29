import React from 'react';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PAYMENT_STATUS, PAYMENT_TYPES, paymentText } from '../../../utility/constants/Constant';
import { CustomBadge } from '../../styled';

function PaymentStatusForRow({ isClient, milestoneTransactionDetails = [] }) {
  const getTagSettings = (tag) => {
    const { status = '', payment_type = '' } = tag;
    if (status === PAYMENT_STATUS.PAYMENT_FAILED || status === PAYMENT_STATUS.FAILED) {
      return { theme: 'light-danger', text: paymentText.PAYMENT_FAILED };
    }
    if (status === PAYMENT_STATUS.PAYMENT_DUE || status === PAYMENT_STATUS.PENDING) {
      return { theme: 'light-warning', text: isClient ? paymentText.PAYMENT_DUE : paymentText.FUNDS_UNAVAILABLE };
    }
    if (status === PAYMENT_STATUS.PAYMENT_PROCESSING) {
      return { theme: 'light-primary', text: paymentText.PAYMENT_PROCESSING };
    }
    if (status === PAYMENT_STATUS.INITIATED) {
      return { theme: 'light-primary', text: paymentText.PAYMENT_INITIATED };
    }
    if (status === PAYMENT_STATUS.PAID) {
      return {
        theme: 'light-success',
        text: payment_type === PAYMENT_TYPES.CHECKOUT ? paymentText.FUNDED : paymentText.PAID,
      };
    }
    return { theme: 'light-primary', text: status };
  };

  return (
    <div className="d-flex flex-column" style={{ gap: '60px' }}>
      {milestoneTransactionDetails.map((item) => (
        <div key={Math.random()}>
          <CustomBadge rounded>
            <Badge
              className={classnames({
                [`${item?.payment_type}_${item?.status}`]: item?.status === PAYMENT_STATUS.PAID,
                [item?.status]: true,
              })}
            >
              {getTagSettings(item).text}
            </Badge>
          </CustomBadge>
        </div>
      ))}
    </div>
  );
}

PaymentStatusForRow.propTypes = {
  milestoneTransactionDetails: PropTypes.array,
  isClient: PropTypes.bool,
};

PaymentStatusForRow.defaultProps = {
  milestoneTransactionDetails: [],
  isClient: false,
};
export default PaymentStatusForRow;
