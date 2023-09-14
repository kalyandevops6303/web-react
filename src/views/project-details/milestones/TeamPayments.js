import React, { useState } from 'react';
import { ChevronRight } from 'react-feather';
import { Card, CardBody, CardText } from 'reactstrap';
import { PropTypes } from 'prop-types';

import PaymentHistoryModal from './PaymentHistoryModal';
import { formatDate } from '../../../utility/Utils';

const TeamPayments = ({ teamPayments, milestonesData, selectedMilestoneIndex = 0 }) => {
  const nextMileStoneDate = milestonesData[selectedMilestoneIndex + 1]?.start_date;
  const amount =
    milestonesData.filter((item) => item.status === 'ON_GOING' || item.status === 'YET_TO_START')[0]?.estimated_cost ??
    '-';
  const [historyModalState, setHistoryModalState] = useState({
    isOpen: false,
    payments: [],
    name: '',
    role: '',
    paidAmount: 0,
  });
  return (
    <Card className="p-0 gray-card">
      <PaymentHistoryModal
        toggleModal={() => setHistoryModalState({ isOpen: false, payments: [], name: '', role: '', paidAmount: 0 })}
        isOpen={historyModalState.isOpen}
        name={historyModalState.name}
        role={historyModalState.role}
        payments={historyModalState.payments}
        amount={amount}
      />
      <div className="p-2 pb-0">
        <CardText className="fs-4 mb-0 fw-bold">Team Payment History</CardText>
      </div>
      <hr />
      <div className="p-2 pt-1 w-100">
        {teamPayments.map((item, index) => {
          const paidAmount = item.payments.reduce((acc, curr) => (curr.status === 'PAID' ? acc + curr.amount : acc), 0);
          return (
            <div
              onClick={() => {
                setHistoryModalState({
                  isOpen: true,
                  payments: item.payments,
                  name: `${item.first_name} ${item.last_name}`,
                  role: item.role,
                  paidAmount,
                });
              }}
              className="white-card mb-1 cursor-pointer px-1 medium-shadow py-16"
              // eslint-disable-next-line react/no-array-index-key
              key={item.user_id + index}
            >
              <CardBody className="w-100  pe-0 py-0 basic-title d-flex align-items-center justify-content-between">
                <div>
                  <CardText className="fw-bolder mb-0">{`${item.first_name} ${item.last_name}`}</CardText>
                  <p className="role-text mb-0">{item.role}</p>
                </div>
                <div className="d-flex align-items-center">
                  <div className="ms-2">
                    <CardText className="fw-normal text-end mb-0 fs-6">Paid</CardText>
                    <CardText className="fw-bolder fs-5 mb-0">$ {paidAmount}</CardText>
                  </div>
                  <div className="ms-2">
                    <CardText className="fw-normal mb-0 fs-6">Next Payment</CardText>
                    <CardText className="fw-bolder fs-5 mb-0">
                      {nextMileStoneDate ? formatDate(nextMileStoneDate) : '-'}
                    </CardText>
                  </div>
                  <div className="mx-2">
                    <CardText className="fw-normal mb-0 fs-6">Amount</CardText>
                    <CardText className="fw-bolder fs-5 mb-0">$ {amount}</CardText>
                  </div>
                  <ChevronRight color="#B9B9C3" />
                </div>
              </CardBody>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

TeamPayments.propTypes = {
  teamPayments: PropTypes.arrayOf(PropTypes.object).isRequired,
  milestonesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedMilestoneIndex: PropTypes.number.isRequired,
};

export default TeamPayments;
