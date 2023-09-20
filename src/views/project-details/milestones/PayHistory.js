import React from 'react';
import { Badge, Card, CardText, Table } from 'reactstrap';
import Proptypes from 'prop-types';
import { formatDate } from '../../../utility/Utils';

const PayHistory = ({ transactions = [] }) => (
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
            <tr key={item?._id}>
              <td className="fw-bolder">{item?._id}</td>
              <td>{formatDate(item?.created_at)}</td>
              <td>
                <Badge color={item?.status === 'PENDING' ? 'light-danger' : 'light-success'}>{item?.status}</Badge>
              </td>
              <td>${item?.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </Card>
);

PayHistory.propTypes = {
  transactions: Proptypes.array.isRequired,
};

export default PayHistory;
