import React, { useState } from 'react';
import { Badge, Button, Card, CardBody, CardText, Input, Table } from 'reactstrap';
import Proptypes from 'prop-types';
import { formatDate } from '../../../utility/Utils';

const PaymentTable = ({ transactions = [] }) => {
  const [selectedPayment, setSelectedPayment] = useState([]);

  const handlePaymentSelect = (e) => {
    const id = e.target.name;
    const isExisting = selectedPayment.find((item) => item === id);
    if (isExisting) {
      const newArray = selectedPayment.filter((item) => item !== id);
      setSelectedPayment(newArray);
    }
    if (!isExisting) {
      setSelectedPayment((prev) => [...prev, id]);
    }
  };

  const totalAmount = transactions.reduce((acc, curr) => {
    if (selectedPayment.includes(curr?._id)) {
      return acc + curr.amount;
    }
    return 0;
  }, 0);

  const trumioFee = (totalAmount * 20) / 100;
  const totalPending = totalAmount + trumioFee;

  return (
    <Card className="p-1" style={{ backgroundColor: 'transparent' }}>
      <div className="p-2 pb-0">
        <CardText className="fs-4 mb-0 fw-bold">Milestone Payment</CardText>
      </div>
      <hr />
      <CardBody>
        <div className="w-100 shadow rounded" style={{ backgroundColor: 'white' }}>
          <Table responsive className="milestone-table w-100">
            <thead>
              <tr>
                <th> </th>
                <th>Transaction ID</th>
                <th>Milestone</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((item) => (
                <tr key={item?._id}>
                  <td>
                    <Input
                      type="checkbox"
                      checked={selectedPayment.includes(item._id)}
                      name={item?._id}
                      onChange={(e) => handlePaymentSelect(e)}
                      className="p-50"
                    />
                  </td>
                  <td className="fw-bolder">{item?._id}</td>
                  <td>Milestone 1</td>
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
        <div className="d-flex w-100 mt-2 justify-content-between">
          <CardText>Trumio fee 20%</CardText>
          <CardText>{`$${trumioFee}`}</CardText>
        </div>
        <hr />
        <div className="d-flex w-100 mt-2 justify-content-between">
          <CardText>Inclusive of Trumio fee 20%</CardText>
          <b>{`$${totalPending}`}</b>
        </div>

        <div className="d-flex justify-content-end w-100 mt-5">
          <Button onClick={() => {}} className="d-contents" color="primary">
            {`Pay $${totalPending}`}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

PaymentTable.propTypes = {
  transactions: Proptypes.array.isRequired,
};

export default PaymentTable;
