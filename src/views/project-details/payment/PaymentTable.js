import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, CardBody, CardText, Input, Table } from 'reactstrap';
import { formatDate } from '../../../utility/Utils';
import { PAYMENT_STATUS, userTypes } from '../../../utility/constants/Constant';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';
import { getMilestonePaymentListing } from '../../../redux/actions/milestonePaymentActions';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import MakePaymentModal from '../../modals/MakePaymentModal';
import { userData } from '../../../redux/selectors/dashboardSelectors';

const PaymentTable = () => {
  const [selectedPaymentId, setSelectedPaymentId] = useState([]);
  const [selectedPaymentData, setSelectedPaymentData] = useState([]);
  const [makePaymentModal, setMakePaymentModal] = useState(false);

  const milestoneData = useSelector((state) => state.milestonePayment?.milestoneListDetails);
  const listLoading = useSelector((state) => state.milestonePayment?.listLoading);
  const projectDetailsData = useSelector(projectDetails);
  const user = useSelector(userData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (projectDetailsData?._id) {
      dispatch(getMilestonePaymentListing(projectDetailsData?._id, () => {}));
    }
  }, [projectDetailsData?._id]);

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
      const selectedTransaction = milestoneData.find((item) => item._id === id);
      setSelectedPaymentData((prev) => [...prev, selectedTransaction]);
      setSelectedPaymentId((prev) => [...prev, id]);
    }
  };

  const getTagSettings = (tag) => {
    if (tag === PAYMENT_STATUS.PAYMENT_FAILED || tag === PAYMENT_STATUS.FAILED) {
      return { theme: 'light-danger', text: 'Payment Failed' };
    }
    if (tag === PAYMENT_STATUS.PAYMENT_DUE || tag === PAYMENT_STATUS.PENDING) {
      return { theme: 'light-warning', text: 'Payment Due' };
    }
    if (tag === PAYMENT_STATUS.PAYMENT_PROCESSING || tag === PAYMENT_STATUS.INITIATED) {
      return { theme: 'light-primary', text: 'Payment Processing' };
    }
    if (tag === PAYMENT_STATUS.PAYMENT_SUCCESSFUL || tag === PAYMENT_STATUS.PAID) {
      return { theme: 'light-success', text: 'Payment Success' };
    }
    return { theme: 'light-primary', text: tag };
  };

  const totalAmount = selectedPaymentData.reduce((acc, curr) => acc + curr.estimated_cost, 0);

  const trumioFee = (totalAmount * 20) / 100;
  const totalPending = totalAmount + trumioFee;

  const handlePayment = () => {
    setMakePaymentModal(true);
  };

  const handleCancel = () => {
    setMakePaymentModal(false);
  };

  const isDisabled = (paymentStatus) =>
    paymentStatus === PAYMENT_STATUS.PAID ||
    paymentStatus === PAYMENT_STATUS.PAYMENT_SUCCESSFUL ||
    paymentStatus === PAYMENT_STATUS.INITIATED ||
    paymentStatus === PAYMENT_STATUS.PAYMENT_PROCESSING;

  return (
    <>
      {makePaymentModal && (
        <MakePaymentModal
          modal={makePaymentModal}
          toggleModal={handleCancel}
          selectedMilestoneIds={selectedPaymentId}
        />
      )}
      <Card className="p-1" style={{ backgroundColor: 'transparent' }}>
        <div className="p-2 pb-0">
          <CardText className="fs-4 mb-0 fw-bold">Milestone Payment</CardText>
        </div>
        <hr />
        {listLoading ? (
          <ComponentSpinner />
        ) : (
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
                  {milestoneData?.map((item) => (
                    <tr key={item?._id}>
                      {item?.transaction_id?.length > 0 || user.user_type !== userTypes.client ? (
                        <td>{}</td>
                      ) : (
                        <td>
                          <Input
                            type="checkbox"
                            checked={selectedPaymentId.includes(item?._id)}
                            name={item?._id}
                            onChange={(e) => handlePaymentSelect(e)}
                            className="p-50 payment-form-control"
                            disabled={isDisabled(item.payment_status)}
                          />
                        </td>
                      )}
                      <td className="fw-bolder">{item?.transaction_id}</td>
                      <td>{item?.name}</td>
                      <td>{formatDate(item?.created_at)}</td>
                      <td>
                        <Badge color={getTagSettings(item?.payment_status).theme}>
                          {getTagSettings(item?.payment_status).text}
                        </Badge>
                      </td>
                      <td>{`$ ${item.estimated_cost.toLocaleString()}`}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {user.user_type === userTypes.client && (
              <div className="d-flex w-100 mt-2 justify-content-between">
                <CardText style={{ fontSize: '16px', fontWeight: '500' }}>Trumio fee (20%)</CardText>
                <CardText>{`$${trumioFee}`}</CardText>
              </div>
            )}
            <hr />
            {user.user_type === userTypes.client && (
              <div className="d-flex w-100 mt-2 justify-content-between">
                <CardText style={{ fontSize: '16px', fontWeight: '500' }}>
                  Total payment (Inclusive of Trumio fee)
                </CardText>
                <CardText style={{ fontSize: '16px', fontWeight: '500' }}>{`$${totalPending}`}</CardText>
              </div>
            )}

            {user.user_type === userTypes.client && (
              <div className="d-flex justify-content-end w-100 mt-5">
                <Button
                  onClick={handlePayment}
                  className="d-contents"
                  color="primary"
                  disabled={selectedPaymentId.length === 0}
                >
                  {totalPending > 0 ? `Pay $${totalPending}` : 'Make Payment'}
                </Button>
              </div>
            )}
          </CardBody>
        )}
      </Card>
    </>
  );
};

export default PaymentTable;
