import React from 'react';
import Proptypes from 'prop-types';
import '../../custom-styles.scss';
import { Modal, ModalHeader, ModalBody, Table, Badge, CardText, Button } from 'reactstrap';

const PaymentHistoryModal = ({ isOpen, toggleModal }) => (
  <Modal isOpen={isOpen} contentClassName="custom-modal-style" className="modal-dialog-centered">
    <ModalHeader toggle={toggleModal} />
    <ModalBody className="pt-0 pb-2">
      <div className="w-100 mb-2 d-flex align-items-center justify-content-between">
        <div>
          <p className="fw-bolder mb-0">Pat</p>
        </div>
        <div className="d-flex align-items-center">
          <div className="ms-2">
            <CardText className="fw-normal text-end mb-0 fs-6">Amount</CardText>
            <CardText className="fw-bolder fs-5 mb-0">$ 1250</CardText>
          </div>
        </div>
      </div>
      <div
        style={{
          border: 'solid 1px #e9ecef',
          boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.06)',
        }}
        className="w-100"
      >
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
            {[
              {
                transaction_id: '53972',
                date: '20 June 21',
                status: 'Paid',
                amount: '10800.89',
              },
              {
                transaction_id: '53972',
                date: '20 June 21',
                status: 'Paid',
                amount: '10800.89',
              },
              {
                transaction_id: '53972',
                date: '19 June 21',
                status: 'Paid',
                amount: '10800.89',
              },
              {
                transaction_id: '53972',
                date: '19 June 21',
                status: 'Paid',
                amount: '10800.89',
              },
            ]?.map((item) => (
              <tr key={item?._id}>
                <td className="fw-bolder">#{item?.transaction_id}</td>
                <td>{item?.date}</td>
                <td>
                  <Badge color="light-success">{item?.status}</Badge>
                </td>
                <td>${item?.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-end">
        <Button outline color="primary" className="mt-2" onClick={toggleModal}>
          Close
        </Button>
      </div>
    </ModalBody>
  </Modal>
);

export default PaymentHistoryModal;

PaymentHistoryModal.propTypes = {
  isOpen: Proptypes.bool,
  toggleModal: Proptypes.func,
};

PaymentHistoryModal.defaultProps = {
  isOpen: false,
  toggleModal: () => {},
};
