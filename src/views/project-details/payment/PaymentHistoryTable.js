import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Card, CardText, Table } from 'reactstrap';

import { milestoneTransactionsService } from '../../../services/projectMilestoneService';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';

import { formatDate } from '../../../utility/Utils';
import { PAYMENT_STATUS } from '../../../utility/constants/Constant';

function PaymentHistoryTable() {
  const [transactions, setTransactions] = useState([]);

  const projectDetailsData = useSelector(projectDetails);

  useEffect(() => {
    if (projectDetailsData?._id) {
      milestoneTransactionsService(projectDetailsData._id).then((res) => {
        if (res.data.data.order_history) {
          setTransactions(res.data.data.order_history);
        }
      });
    }
  }, [projectDetailsData?._id]);

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
  return (
    <Card className="gray-card p-0">
      <div className="p-2 pb-0">
        <CardText className="fs-4 mb-0 fw-bold">Payment History</CardText>
      </div>
      <hr />
      <div className="p-2 pt-1 w-100">
        <Table responsive className="milestone-table w-100">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((item) => (
              <tr key={item?.transaction_id}>
                <td className="fw-bolder">{item?._id}</td>
                <td>{formatDate(item?.created_at)}</td>
                <td>
                  <Badge color={getTagSettings(item?.status).theme}>{getTagSettings(item?.status).text}</Badge>
                </td>
                <td>${item?.milestone?.amount ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  );
}

export default PaymentHistoryTable;
