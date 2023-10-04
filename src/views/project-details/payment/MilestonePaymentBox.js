import React from 'react';
import { Card, Col, CardBody, Input, Label } from 'reactstrap';

function MilestonePaymentBox() {
  return (
    <Col>
      <h4 className="mb-1">Milestone Payment - Due</h4>
      <Card style={{ height: '55px' }} className="d-flex justify-content-center">
        <CardBody className="d-flex justify-content-between">
          <div className="d-flex">
            <Input type="checkbox" id="m1" />
            <Label for="m1" style={{ marginLeft: '10px', fontSize: '16px' }}>
              Milestone #1
            </Label>
          </div>
          <div>$4539</div>
        </CardBody>
      </Card>
      <Card style={{ height: '55px' }} className="d-flex justify-content-center">
        <CardBody className="d-flex justify-content-between">
          <div className="d-flex">
            <Input type="checkbox" id="m1" />
            <Label for="m1" style={{ marginLeft: '10px', fontSize: '16px' }}>
              Milestone #2
            </Label>
          </div>
          <div>$3539</div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default MilestonePaymentBox;
