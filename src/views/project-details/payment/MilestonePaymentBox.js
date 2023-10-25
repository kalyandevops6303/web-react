import React from 'react';
import { Card, CardBody, Input, Label, Badge } from 'reactstrap';
import { PropTypes } from 'prop-types';

function MilestonePaymentBox({ id, milestoneName, payableAmount, paymentStatus, checked, onSelect }) {
  const getTagSettings = (tag) => {
    if (tag === 'PENDING') {
      return { theme: 'light-danger', text: 'Payment Due' };
    }
    return { theme: 'light-primary', text: tag };
  };

  return (
    <Card style={{ height: '72px' }} className="d-flex justify-content-center">
      <CardBody className="d-flex justify-content-between">
        <div className="d-flex">
          <Input type="checkbox" id="m1" onChange={(e) => onSelect(e, id)} checked={checked} />
          <div className="d-flex flex-column" style={{ marginTop: '-2px' }}>
            <Label for="m1" className="text-truncate" style={{ marginLeft: '10px', fontSize: '16px' }}>
              {milestoneName}
            </Label>
            <Badge color={getTagSettings(paymentStatus).theme} style={{ width: 'fit-content', marginLeft: '10px' }}>
              {getTagSettings(paymentStatus).text}
            </Badge>
          </div>
        </div>
        <div>${payableAmount}</div>
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
