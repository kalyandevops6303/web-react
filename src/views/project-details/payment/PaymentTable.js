import React, { useState } from 'react';
import { Badge, Button, Card, CardBody, CardText, Input, Table } from 'reactstrap';
import Proptypes from 'prop-types';
import { formatDate } from '../../../utility/Utils';

const PaymentTable = ({ transactions = [] }) => {
  const [selectedPaymentId, setSelectedPaymentId] = useState([]);
  const [selectedPaymentData, setSelectedPaymentData] = useState([]);

  const handlePaymentSelect = (e) => {
    const id = e.target.name;
    const isExisting = selectedPaymentData.find((item) => item._id === id);
    if (isExisting) {
      const newArray = selectedPaymentData.filter((item) => item._id !== id);
      const newData = selectedPaymentId.filter((item) => item !== id);
      setSelectedPaymentData(newArray);
      setSelectedPaymentId(newData);
    }
    if (!isExisting) {
      const selectedTransaction = transactions.find((item) => item._id === id);
      setSelectedPaymentData((prev) => [...prev, selectedTransaction]);
      setSelectedPaymentId((prev) => [...prev, id]);
    }
  };

  const totalAmount = selectedPaymentData.reduce((acc, curr) => acc + curr.amount, 0);

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
                      checked={selectedPaymentId.includes(item?._id)}
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
          <CardText style={{ fontSize: '16px', fontWeight: '500' }}>Trumio fee 20%</CardText>
          <CardText>{`$${trumioFee}`}</CardText>
        </div>
        <hr />
        <div className="d-flex w-100 mt-2 justify-content-between">
          <CardText style={{ fontSize: '16px', fontWeight: '500' }}>Inclusive of Trumio fee 20%</CardText>
          <CardText style={{ fontSize: '16px', fontWeight: '500' }}>{`$${totalPending}`}</CardText>
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
