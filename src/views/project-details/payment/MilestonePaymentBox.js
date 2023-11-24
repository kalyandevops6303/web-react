import React from 'react';
import { Card, CardBody, Input, Label, Badge } from 'reactstrap';
import { PropTypes } from 'prop-types';

import { PAYMENT_STATUS } from '../../../utility/constants/Constant';

function MilestonePaymentBox({ id, milestoneName, payableAmount, paymentStatus, checked, onSelect }) {
  const getTagSettings = (tag) => {
    if (tag === PAYMENT_STATUS.PAYMENT_FAILED || tag === PAYMENT_STATUS.FAILED) {
      return { theme: 'light-danger', text: 'Payment Failed' };
    }
    if (tag === PAYMENT_STATUS.PAYMENT_DUE || tag === PAYMENT_STATUS.PENDING) {
      return { theme: 'light-warning', text: 'Payment Due' };
    }
    if (tag === PAYMENT_STATUS.PAYMENT_PROCESSING) {
      return { theme: 'light-primary', text: 'Payment Processing' };
    }
    if (tag === PAYMENT_STATUS.INITIATED) {
      return { theme: 'light-primary', text: 'Payment Initiated' };
    }
    if (tag === PAYMENT_STATUS.PAYMENT_SUCCESSFUL || tag === PAYMENT_STATUS.PAID) {
      return { theme: 'light-success', text: 'Payment Success' };
    }
    return { theme: 'light-primary', text: tag };
  };

  const isDisabled =
    paymentStatus === PAYMENT_STATUS.PAID ||
    paymentStatus === PAYMENT_STATUS.PAYMENT_SUCCESSFUL ||
    paymentStatus === PAYMENT_STATUS.INITIATED ||
    paymentStatus === PAYMENT_STATUS.PAYMENT_PROCESSING;

  return (
    <Card style={{ height: '72px' }} className="d-flex justify-content-center">
      <CardBody className="d-flex justify-content-between">
        <div className="d-flex">
          <Input
            type="checkbox"
            id={id}
            onChange={(e) => onSelect(e, id)}
            checked={checked}
            disabled={isDisabled}
            className="payment-form-control"
          />

          <div className="d-flex flex-column" style={{ marginTop: '-2px' }}>
            <Label
              for={id}
              style={{
                marginLeft: '10px',
                fontSize: '16px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '150px',
              }}
            >
              {milestoneName}
            </Label>
            <Badge color={getTagSettings(paymentStatus).theme} style={{ width: 'fit-content', marginLeft: '10px' }}>
              {getTagSettings(paymentStatus).text}
            </Badge>
          </div>
        </div>
        <div style={{ fontSize: '16px', fontWeight: '500' }}>{`$ ${payableAmount}`}</div>
      </CardBody>
    </Card>
  );
}

MilestonePaymentBox.propTypes = {
  id: PropTypes.string.isRequired,
  milestoneName: PropTypes.string.isRequired,
  payableAmount: PropTypes.string.isRequired,
  paymentStatus: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
MilestonePaymentBox.defaultValues = {
  id: '',
  milestoneName: '',
  payableAmount: '',
  paymentStatus: '',
  checked: false,
  onSelect: () => {},
};

export default MilestonePaymentBox;
