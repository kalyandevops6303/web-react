import React from 'react';
import { ChevronRight } from 'react-feather';
import { Card, CardBody, CardText } from 'reactstrap';
// import PaymentHistoryModal from './PaymentHistoryModal';

const TeamPayments = () => {
  const payments = [];
  return (
    <Card className="p-0 gray-card">
      {/* <PaymentHistoryModal isOpen /> */}
      <div className="p-2 pb-0">
        <CardText className="fs-4 mb-0 fw-bold">Team Payment History</CardText>
      </div>
      <hr />
      <div className="p-2 pt-1 w-100">
        {payments.map((item) => (
          <div className="white-card mb-1 cursor-pointer px-1 medium-shadow py-16" key={item.name}>
            <CardBody className="w-100  pe-0 py-0 basic-title d-flex align-items-center justify-content-between">
              <div>
                <CardText className="fw-bolder mb-0">{item.name}</CardText>
              </div>
              <div className="d-flex align-items-center">
                <div className="ms-2">
                  <CardText className="fw-normal text-end mb-0 fs-6">Paid</CardText>
                  <CardText className="fw-bolder fs-5 mb-0">$ 1250</CardText>
                </div>
                <div className="ms-2">
                  <CardText className="fw-normal mb-0 fs-6">Next Payment</CardText>
                  <CardText className="fw-bolder fs-5 mb-0">Apr 12, 23</CardText>
                </div>
                <div className="mx-2">
                  <CardText className="fw-normal mb-0 fs-6">Amount</CardText>
                  <CardText className="fw-bolder fs-5 mb-0">$ 1000</CardText>
                </div>
                <ChevronRight color="#B9B9C3" />
              </div>
            </CardBody>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TeamPayments;
