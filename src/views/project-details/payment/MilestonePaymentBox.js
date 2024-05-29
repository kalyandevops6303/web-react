import React from 'react';
import { Card, CardBody, Input, Label, Badge } from 'reactstrap';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { PAYMENT_STATUS, paymentText, userTypes } from '../../../utility/constants/Constant';
import PaymentTableWrapper from './style';
import { userData } from '../../../redux/selectors/dashboardSelectors';
import { CustomBadge } from '../../styled';

function MilestonePaymentBox({ id, milestoneName, payableAmount, paymentStatus, milestoneStatus, checked, onSelect }) {
  const user = useSelector(userData);
  const isClient = user?.user_type === userTypes.client;
  const getTagSettings = (tag) => {
    if (tag === PAYMENT_STATUS.PAYMENT_FAILED || tag === PAYMENT_STATUS.FAILED) {
      return { theme: 'light-danger', text: isClient ? paymentText.RETRY_PAYMENT : paymentText.NOT_FUNDED };
    }
    if (tag === PAYMENT_STATUS.PAYMENT_DUE || tag === PAYMENT_STATUS.PENDING) {
      return { theme: 'light-warning', text: isClient ? paymentText.PAYMENT_DUE : paymentText.NOT_FUNDED };
    }
    if (tag === PAYMENT_STATUS.PAYMENT_PROCESSING) {
      return { theme: 'light-primary', text: isClient ? paymentText.PAYMENT_PROCESSING : paymentText.NOT_FUNDED };
    }
    if (tag === PAYMENT_STATUS.INITIATED) {
      return { theme: 'light-primary', text: isClient ? paymentText.PAYMENT_INITIATED : paymentText.NOT_FUNDED };
    }
    if (tag === PAYMENT_STATUS.PAID && isClient) {
      return {
        theme: 'light-success',
        text: milestoneStatus !== 'COMPLETED' ? paymentText.FUNDED : paymentText.PAID,
      };
    }
    if (tag === PAYMENT_STATUS.PAID && !isClient) {
      return {
        theme: 'light-success',
        text: milestoneStatus !== 'COMPLETED' ? paymentText.FUNDS_AVAILABLE : paymentText.PAID,
      };
    }
    return { theme: 'light-primary', text: tag };
  };

  const isDisabled =
    paymentStatus === PAYMENT_STATUS.PAID ||
    paymentStatus === PAYMENT_STATUS.PAYMENT_SUCCESSFUL ||
    paymentStatus === PAYMENT_STATUS.INITIATED ||
    paymentStatus === PAYMENT_STATUS.PAYMENT_PROCESSING;

  return (
    <PaymentTableWrapper>
      <Card style={{ height: '72px' }} className="d-flex justify-content-center">
        <CardBody className="d-flex justify-content-between">
          <div className="d-flex form-check">
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
              <CustomBadge bordered rounded>
                <Badge
                  className={classnames({
                    RETRY_PAYMENT: isClient && (paymentStatus === 'PAYMENT_FAILED' || paymentStatus === 'FAILED'),
                    FUNDED: paymentStatus === 'PAID' && milestoneStatus !== 'COMPLETED',
                    PAID_AMOUNT: paymentStatus === 'PAID' && milestoneStatus === 'COMPLETED',
                    [paymentStatus]: paymentStatus !== 'PAID',
                  })}
                  style={{ width: 'fit-content', marginLeft: '10px' }}
                >
                  {getTagSettings(paymentStatus).text}
                </Badge>
              </CustomBadge>
            </div>
          </div>
          <div style={{ fontSize: '16px', fontWeight: '500' }}>{`$ ${payableAmount}`}</div>{' '}
        </CardBody>
      </Card>
    </PaymentTableWrapper>
  );
}

MilestonePaymentBox.propTypes = {
  id: PropTypes.string.isRequired,
  milestoneName: PropTypes.string.isRequired,
  payableAmount: PropTypes.string.isRequired,
  paymentStatus: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  milestoneStatus: PropTypes.string.isRequired,
};
MilestonePaymentBox.defaultValues = {
  id: '',
  milestoneName: '',
  payableAmount: '',
  paymentStatus: '',
  checked: false,
  onSelect: () => {},
  milestoneStatus: '',
};

export default MilestonePaymentBox;
