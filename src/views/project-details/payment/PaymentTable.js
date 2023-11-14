/* eslint-disable no-nested-ternary */
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, CardBody, CardText, Input, Table, UncontrolledTooltip } from 'reactstrap';
import { ChevronDown, ChevronUp } from 'react-feather';
import { PAYMENT_STATUS, userTypes } from '../../../utility/constants/Constant';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';
import {
  getApplicationFee,
  getMilestonePaymentListing,
  getMilestoneTransactions,
} from '../../../redux/actions/milestonePaymentActions';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import MakePaymentModal from '../../modals/MakePaymentModal';
import { userData } from '../../../redux/selectors/dashboardSelectors';
import { formatDate } from '../../../utility/Utils';
import TransactionTimeline from './TransactionTimeline';
import PaymentStatusForRow from './PaymentStatusForRow';
import PaymentBy from './PaymentBy';
import { clearMilestoneTransactions } from '../../../redux/reducers/milestonePayment';
import PaymentTableWrapper from './style';

const PaymentTable = () => {
  const [selectedPaymentId, setSelectedPaymentId] = useState([]);
  const [selectedPaymentData, setSelectedPaymentData] = useState([]);
  const [makePaymentModal, setMakePaymentModal] = useState(false);
  const [feeStructure, setFeeStructure] = useState(null);
  const [open, setOpen] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const milestoneData = useSelector((state) => state.milestonePayment?.milestoneListDetails);
  const listLoading = useSelector((state) => state.milestonePayment?.listLoading);
  const projectDetailsData = useSelector(projectDetails);
  const milestoneTransactionLoading = useSelector((state) => state.milestonePayment?.transactionLoading);
  const milestoneTransactionDetails = useSelector((state) => state.milestonePayment?.milestoneTransactionDetails);
  const user = useSelector(userData);

  const dispatch = useDispatch();

  const PAYMENT_TYPES = {
    CHECKOUT: 'CHECKOUT',
    TRANSFER: 'TRANSFER',
  };

  const handleCopyToClipboard = (text) => {
    // eslint-disable-next-line no-undef
    navigator.clipboard.writeText(text);
  };

  const getTimelineItem = (type, transaction_id, date) => ({
    color: type === PAYMENT_TYPES.CHECKOUT ? '#FF9F43' : '#7367F0',
    customContent: (
      <div className="d-flex flex-column">
        {transaction_id?.length > 8 && (
          <UncontrolledTooltip placement="top" target={transaction_id.replace(/^[^a-zA-Z_]/, '_')}>
            {transaction_id}
          </UncontrolledTooltip>
        )}
        <span
          className="fw-bold"
          style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '80px', whiteSpace: 'nowrap' }}
          id={transaction_id.replace(/^[^a-zA-Z_]/, '_')}
          onClick={() => handleCopyToClipboard(transaction_id)}
        >
          {transaction_id}
        </span>

        <span>{formatDate(date)}</span>
      </div>
    ),
  });

  const timelineData = milestoneTransactionDetails?.map((item) =>
    getTimelineItem(item?.payment_type, item?.transaction_id, item?.created_at),
  );

  const paymentStatusList = milestoneTransactionDetails?.map((item) => item?.status);
  const isClient = user?.user_type === userTypes.client;

  const isPaymentDone = (milestone) =>
    milestone?.payment_status === PAYMENT_STATUS.PAID ||
    milestone?.payment_status === PAYMENT_STATUS.PAYMENT_SUCCESSFUL;

  useEffect(() => {
    if (isOpen) {
      dispatch(clearMilestoneTransactions());
      dispatch(getMilestoneTransactions(projectDetailsData?._id, open));
    }
  }, [isOpen]);

  const showMilestoneTransanctions = (milestoneId, item) => {
    if (isClient && isPaymentDone(item)) {
      if (open === milestoneId) {
        setIsOpen(false);
        setOpen(null);
      } else {
        setIsOpen(true);
        setOpen(milestoneId);
      }
    }
  };

  const onGetApplicationFee = (data) => {
    setFeeStructure(data);
  };

  useEffect(() => {
    if (isClient) {
      dispatch(getApplicationFee(onGetApplicationFee));
    }
  }, []);

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

  const totalAmount = selectedPaymentData.reduce((acc, curr) => acc + curr.estimated_cost, 0);

  const applicationFee = feeStructure?.application_fee;
  // eslint-disable-next-line no-unsafe-optional-chaining
  const trumioFee = (totalAmount * applicationFee?.percentage) / 100;
  const totalPending = totalAmount + trumioFee;

  const handlePayment = () => {
    setMakePaymentModal(true);
  };

  const handleCancel = () => {
    setMakePaymentModal(false);
  };

  const isFirstTwoMilestonePaid =
    isPaymentDone(milestoneData?.length > 0 && milestoneData[0]) ||
    isPaymentDone(milestoneData?.length > 0 && milestoneData[1]);

  const isAllMilestonePaid = milestoneData?.every(
    (mile) => mile.payment_status === PAYMENT_STATUS.PAID || mile.payment_status === PAYMENT_STATUS.PAYMENT_SUCCESSFUL,
  );
  const isDisabled = (paymentStatus) =>
    paymentStatus === PAYMENT_STATUS.PAID ||
    paymentStatus === PAYMENT_STATUS.PAYMENT_SUCCESSFUL ||
    paymentStatus === PAYMENT_STATUS.INITIATED ||
    paymentStatus === PAYMENT_STATUS.PAYMENT_PROCESSING;

  const isPaymentDisabled = () => {
    if (selectedPaymentId.length === 0) {
      return true;
    }
    if (milestoneData?.length === 1) return false;
    if (!isFirstTwoMilestonePaid && selectedPaymentId?.length < 2) {
      return true;
    }
    return false;
  };

  return (
    <>
      {makePaymentModal && (
        <MakePaymentModal
          modal={makePaymentModal}
          toggleModal={handleCancel}
          selectedMilestoneIds={selectedPaymentId}
        />
      )}

      {listLoading ? (
        <ComponentSpinner />
      ) : (
        <Card className="p-1" style={{ backgroundColor: 'transparent' }}>
          <div className="p-2 pb-0">
            <CardText className="fs-4 mb-0 fw-bold">Milestone Payment</CardText>
          </div>
          <hr />
          <CardBody>
            <div className="w-100 shadow rounded" style={{ backgroundColor: 'white' }}>
              <PaymentTableWrapper>
                <Table responsive className="w-100">
                  <thead>
                    <tr>
                      {isClient ? <th className="checkboxCol"> </th> : null}
                      {isClient ? <th className="transactionCol">Transaction ID</th> : null}
                      <th>Milestone</th>
                      <th>{}</th>
                      <th>Status</th>
                      <th>{}</th>
                      <th>Amount</th>
                      {isClient ? <th> </th> : null}
                    </tr>
                  </thead>
                  <tbody>
                    {milestoneData?.map((item) => (
                      <>
                        <tr
                          className={isPaymentDone(item) ? 'cursor-pointer' : ''}
                          key={item?._id}
                          onClick={() => showMilestoneTransanctions(item?._id, item)}
                        >
                          {isClient ? (
                            !isPaymentDone(item) ? (
                              <td className="py-1">
                                <Input
                                  type="checkbox"
                                  checked={selectedPaymentId.includes(item?._id)}
                                  name={item?._id}
                                  onChange={(e) => handlePaymentSelect(e)}
                                  className="p-50 payment-form-control"
                                  disabled={isDisabled(item.payment_status)}
                                />
                              </td>
                            ) : (
                              <td>{}</td>
                            )
                          ) : null}
                          {isClient ? (
                            <td>
                              {/* <div className="d-flex flex-column">
                                <span className="fw-bolder">{item?._id}</span>
                                <span className="fw-light" style={{ fontSize: '12px' }}>
                                  {formatDate(item?.created_at)}
                                </span>
                              </div> */}
                            </td>
                          ) : null}
                          <td>{item?.name}</td>
                          <td>{}</td>
                          <td className="statusCol">
                            <Badge color={getTagSettings(item?.payment_status).theme}>
                              {getTagSettings(item?.payment_status).text}
                            </Badge>
                          </td>
                          <td>{}</td>
                          <td className="amountCol">{`$ ${item.estimated_cost.toLocaleString()}`}</td>
                          {isClient && isPaymentDone(item) ? (
                            <td className="accordionCol">{open === item?._id ? <ChevronUp /> : <ChevronDown />}</td>
                          ) : null}
                        </tr>

                        {item?._id === open && isPaymentDone(item) ? (
                          milestoneTransactionLoading ? (
                            <tr>
                              <td>{}</td>
                              <td>{}</td>
                              <td>{}</td>
                              <td>Loading...</td>
                              <td>{}</td>
                              <td>{}</td>
                              <td>{}</td>
                              <td>{}</td>
                            </tr>
                          ) : (
                            <>
                              <tr style={{ borderBottom: '1px solid white' }}>
                                <td>{}</td>
                                <td>
                                  <div className="d-flex flex-column">
                                    <span>Amount</span>
                                    <span>{`${applicationFee?.name}`}</span>
                                  </div>
                                </td>
                                <td>{}</td>
                                <td>{}</td>
                                <td>{}</td>
                                <td>{}</td>
                                <td>
                                  <div className="d-flex flex-column">
                                    <span>
                                      ${' '}
                                      {milestoneTransactionDetails?.find(
                                        (transaction) => transaction?.payment_type === PAYMENT_TYPES.CHECKOUT,
                                      )?.amount ?? 0}
                                    </span>
                                    <span>
                                      $
                                      {milestoneTransactionDetails?.find(
                                        (transaction) => transaction?.payment_type === PAYMENT_TYPES.CHECKOUT,
                                      )?.applicationFee ?? 0}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>{}</td>
                                <td>
                                  <TransactionTimeline transactionData={timelineData} />
                                </td>
                                <td>{}</td>
                                <td>
                                  <PaymentStatusForRow paymentStatus={paymentStatusList} />
                                </td>
                                <td>{}</td>
                                <td colSpan={2}>
                                  <PaymentBy paymentBy={milestoneTransactionDetails} />
                                </td>

                                <td>{}</td>
                              </tr>
                            </>
                          )
                        ) : null}
                      </>
                    ))}
                  </tbody>
                </Table>
              </PaymentTableWrapper>
            </div>
            {user.user_type === userTypes.client && (
              <div className="d-flex w-100 mt-2 justify-content-between">
                <CardText style={{ fontSize: '16px', fontWeight: '500' }}>{`${applicationFee?.name ?? ''} (${
                  applicationFee?.percentage ?? 0
                }%)`}</CardText>
                <CardText>{`$${Number.isNaN(trumioFee) ? 0 : trumioFee.toLocaleString()}`}</CardText>
              </div>
            )}
            <hr />
            {user.user_type === userTypes.client && (
              <div className="d-flex w-100 mt-2 justify-content-between">
                <CardText style={{ fontSize: '16px', fontWeight: '500' }}>
                  {`Total payment (Inclusive of ${applicationFee?.name ?? ''})`}
                </CardText>
                <CardText style={{ fontSize: '16px', fontWeight: '500' }}>{`$${
                  Number.isNaN(totalPending) ? 0 : totalPending.toLocaleString()
                }`}</CardText>
              </div>
            )}

            {user.user_type === userTypes.client && !isAllMilestonePaid && (
              <div className="d-flex justify-content-end w-100 mt-5">
                <Button onClick={handlePayment} className="d-contents" color="primary" disabled={isPaymentDisabled()}>
                  {totalPending > 0 ? `Pay $${totalPending}` : 'Make Payment'}
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default PaymentTable;
