/* eslint-disable no-nested-ternary */
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, CardBody, CardText, Input, Table, UncontrolledTooltip } from 'reactstrap';
import { ChevronDown, ChevronUp, Copy, Info } from 'react-feather';
import classnames from 'classnames';
import { PAYMENT_STATUS, PAYMENT_TYPES, paymentText, userTypes } from '../../../utility/constants/Constant';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';
import {
  getApplicationFee,
  getMilestonePaymentListing,
  getMilestoneTransactions,
} from '../../../redux/actions/milestonePaymentActions';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import MakePaymentModal from '../../modals/MakePaymentModal';
import { userData } from '../../../redux/selectors/dashboardSelectors';
import { formatDate, roundOfAmount } from '../../../utility/Utils';
import TransactionTimeline from './TransactionTimeline';
import PaymentStatusForRow from './PaymentStatusForRow';
import PaymentBy from './PaymentBy';
import { clearMilestoneTransactions, milestoneListSuccess } from '../../../redux/reducers/milestonePayment';
import PaymentTableWrapper from './style';
import theme from '../../../configs/themeVariables';
import { PaymentInfoBanner } from '../style';
import { CustomBadge } from '../../styled';

const PaymentTable = () => {
  const [selectedPaymentId, setSelectedPaymentId] = useState([]);
  const [selectedPaymentData, setSelectedPaymentData] = useState([]);
  const [makePaymentModal, setMakePaymentModal] = useState(false);
  const [feeStructure, setFeeStructure] = useState(null);
  const [open, setOpen] = useState('');
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [selectedAndDisabledPaymentId, setSelectedAndDisabledPaymentId] = useState([]);

  const milestoneData = useSelector((state) => state.milestonePayment?.milestoneListDetails);
  const listLoading = useSelector((state) => state.milestonePayment?.listLoading);
  const projectDetailsData = useSelector(projectDetails);
  const milestoneTransactionLoading = useSelector((state) => state.milestonePayment?.transactionLoading);
  const milestoneTransactionDetails = useSelector((state) => state.milestonePayment?.milestoneTransactionDetails);
  const user = useSelector(userData);

  const dispatch = useDispatch();

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
        <div
          className="d-flex align-items-center"
          onMouseEnter={() => setSelectedTransactionId(transaction_id)}
          onMouseLeave={() => setSelectedTransactionId(null)}
          onClick={() => handleCopyToClipboard(transaction_id)}
          id={transaction_id.replace(/^[^a-zA-Z_]/, '_')}
        >
          <span
            className="fw-bold"
            style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '80px', whiteSpace: 'nowrap' }}
          >
            {transaction_id}
          </span>
          <Copy
            size={20}
            color={selectedTransactionId === transaction_id ? theme.activeNavPillText : theme.infoIcon}
            className="ms-50"
          />
        </div>
        <span>{formatDate(date)}</span>
      </div>
    ),
  });

  const timelineData = milestoneTransactionDetails?.map((item) =>
    getTimelineItem(item?.payment_type, item?.transaction_id ?? item?._id, item?.created_at),
  );

  const isClient = user?.user_type === userTypes.client;

  const isPaymentDone = (milestone) =>
    milestone?.payment_status === PAYMENT_STATUS.PAID ||
    milestone?.payment_status === PAYMENT_STATUS.PAYMENT_SUCCESSFUL;

  const isPaymentInitiated = (milestone) => milestone?.payment_status === PAYMENT_STATUS.INITIATED;

  const showMilestoneTransanctions = (milestoneId, item) => {
    if ((isPaymentDone(item) && isClient) || (isPaymentDone(item) && item.status === 'COMPLETED')) {
      if (open === milestoneId) {
        setOpen(null);
      } else {
        setOpen(milestoneId);
        dispatch(clearMilestoneTransactions());
        dispatch(getMilestoneTransactions(projectDetailsData?._id, milestoneId, isClient));
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

    return () => {
      dispatch(milestoneListSuccess([]));
    };
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

  const isAllMilestonePaid = milestoneData?.every(
    (mile) => mile.payment_status === PAYMENT_STATUS.PAID || mile.payment_status === PAYMENT_STATUS.PAYMENT_SUCCESSFUL,
  );

  useEffect(() => {
    if (milestoneData && !isAllMilestonePaid) {
      if (milestoneData?.length >= 2) {
        // if there are 2 or more milestones
        const firstMilestone = milestoneData[0];
        const secondMilestone = milestoneData[1];

        // checking if first and second milestones are paid
        const isFirstAndSecondMilestonePaid = isPaymentDone(firstMilestone) && isPaymentDone(secondMilestone);

        // checking if first and second milestones are payment initiated
        const isFirstAndSecondMilestoneInitiated =
          isPaymentInitiated(firstMilestone) && isPaymentInitiated(secondMilestone);

        if (!isFirstAndSecondMilestoneInitiated && !isFirstAndSecondMilestonePaid) {
          // this will run for both the cases - total milestones > 2 or total milestones = 2
          // if first and second milestones are not paid then selecting both of them for payment and these will be disabled from user's selection
          setSelectedPaymentData([firstMilestone, secondMilestone]);
          setSelectedPaymentId([firstMilestone._id, secondMilestone._id]);
          setSelectedAndDisabledPaymentId([firstMilestone._id, secondMilestone._id]);
        } else if (milestoneData?.length > 2) {
          // this will run only for total milestones > 2
          // selecting latest not paid milestone in the list for the payment and this will be disabled from user's selection
          const firstNotPaidMilestoneInTheList = milestoneData.find(
            (mile) => !isPaymentDone(mile) && !isPaymentInitiated(mile),
          );
          setSelectedPaymentData([firstNotPaidMilestoneInTheList]);
          setSelectedPaymentId([firstNotPaidMilestoneInTheList._id]);
          setSelectedAndDisabledPaymentId([firstNotPaidMilestoneInTheList._id]);
        }
      } else {
        // if there is only 1 milestone
        const firstMilestone = milestoneData[0];

        if (!isPaymentDone(firstMilestone) && !isPaymentInitiated(firstMilestone)) {
          // checking if first milestone is not paid then selecting that milestone for payment and this will be disabled from user's selection
          setSelectedPaymentData([firstMilestone]);
          setSelectedPaymentId([firstMilestone._id]);
          setSelectedAndDisabledPaymentId([firstMilestone._id]);
        }
      }
    }
  }, [milestoneData]);

  const getTagSettings = (tag) => {
    const { payment_status = '', status = '' } = tag;
    if (payment_status === PAYMENT_STATUS.PAYMENT_FAILED || payment_status === PAYMENT_STATUS.FAILED) {
      return {
        theme: 'light-danger',
        text: isClient ? paymentText.RETRY_PAYMENT : paymentText.NOT_FUNDED,
      };
    }
    if (payment_status === PAYMENT_STATUS.PAYMENT_DUE || payment_status === PAYMENT_STATUS.PENDING) {
      return { theme: 'light-warning', text: isClient ? paymentText.PAYMENT_DUE : paymentText.NOT_FUNDED };
    }
    if (payment_status === PAYMENT_STATUS.PAYMENT_PROCESSING) {
      return { theme: 'light-primary', text: isClient ? paymentText.PAYMENT_PROCESSING : paymentText.NOT_FUNDED };
    }
    if (payment_status === PAYMENT_STATUS.INITIATED) {
      return { theme: 'light-primary', text: isClient ? paymentText.PAYMENT_INITIATED : paymentText.NOT_FUNDED };
    }

    if (payment_status === PAYMENT_STATUS.PAID && isClient) {
      return {
        theme: 'light-success',
        text: status !== 'COMPLETED' ? paymentText.FUNDED : paymentText.PAID,
      };
    }
    if (payment_status === PAYMENT_STATUS.PAID && !isClient) {
      return {
        theme: 'light-success',
        text: status !== 'COMPLETED' ? paymentText.FUNDS_AVAILABLE : paymentText.PAID,
      };
    }
    return { theme: 'light-primary', text: payment_status };
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

    return false;
  };

  const getTotalCost = (item) => {
    if (isClient) {
      return item.estimated_cost + item.transaction_service_fee + item.application_fee;
    }
    return item.estimated_cost;
  };
  const showPaymentCalculation =
    user?.user_type === userTypes.client && !isAllMilestonePaid && selectedPaymentId.length > 0;

  if (listLoading) {
    return <ComponentSpinner />;
  }

  return (
    <>
      {makePaymentModal && (
        <MakePaymentModal
          modal={makePaymentModal}
          toggleModal={handleCancel}
          selectedMilestoneIds={selectedPaymentId}
          selectedAndDisabledPaymentId={selectedAndDisabledPaymentId}
        />
      )}
      {milestoneData?.length > 0 && (
        <Card className="" style={{ backgroundColor: 'transparent' }}>
          <div className="p-2 pb-0">
            <CardText className="fs-4 mb-0 fw-bold">Milestone Payment</CardText>
          </div>
          <hr />
          <CardBody>
            {user?.user_type === userTypes.client && !isAllMilestonePaid && (
              <PaymentInfoBanner className="mb-2 d-flex px-1 py-2">
                <Info size={18} color={theme.activeNavPillText} className="me-50 info-banner-icon" />
                <p className="font-medium-1 m-0 info">
                  <span className="fw-bolder font-medium-1">Note:</span> In order for the project to start, at any given
                  point of time a minimum of 2 milestone payments need to be made.
                </p>
              </PaymentInfoBanner>
            )}
            <div className="shadow rounded" style={{ backgroundColor: 'white', width: '100%' }}>
              <PaymentTableWrapper>
                <Table responsive className="w-100">
                  <thead>
                    <tr>
                      {/* {!isTeam ? <th className="checkboxCol"> </th> : null} */}
                      <th style={{ minWidth: '12%' }} className="checkboxCol">
                        {' '}
                      </th>
                      <th style={{ minWidth: '12%' }}>Milestone</th>
                      <th style={{ minWidth: '10rem' }}>{}</th>
                      <th style={{ minWidth: '12%' }}>Status</th>
                      <th style={{ minWidth: '12%' }}>{}</th>
                      <th style={{ minWidth: '12%' }}>Amount</th>
                      {/* {!isTeam ? <th> </th> : null} */}
                      <th style={{ minWidth: '12%' }}>{}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {milestoneData?.map((item) => (
                      <>
                        <tr
                          className={
                            (isPaymentDone(item) && isClient) || (isPaymentDone(item) && item.status === 'COMPLETED')
                              ? 'cursor-pointer'
                              : ''
                          }
                          key={item?._id}
                          onClick={() => showMilestoneTransanctions(item?._id, item)}
                        >
                          {isClient ? (
                            <td className="py-1">
                              <div className="form-check">
                                <Input
                                  type="checkbox"
                                  checked={selectedPaymentId.includes(item?._id)}
                                  name={item?._id}
                                  onChange={(e) =>
                                    !selectedAndDisabledPaymentId?.includes(item?._id) && handlePaymentSelect(e)
                                  }
                                  className="p-50 payment-form-control"
                                  disabled={isDisabled(item.payment_status)}
                                />
                              </div>
                            </td>
                          ) : (
                            <td> </td>
                          )}
                          <td>{item?.name}</td>
                          <td>{}</td>
                          <td className="statusCol">
                            <CustomBadge>
                              <Badge
                                className={classnames({
                                  NOT_FUNDED: !isClient && !isPaymentDone(item),
                                  PAID_AMOUNT: item?.payment_status === 'PAID' && item?.status === 'COMPLETED',
                                  FUNDED: item?.payment_status === 'PAID' && item?.status !== 'COMPLETED',
                                  [item?.payment_status]: item?.payment_status !== 'PAID',
                                })}
                              >
                                {getTagSettings(item).text}
                              </Badge>
                            </CustomBadge>
                          </td>
                          <td>{}</td>
                          <td className="amountCol">$ {roundOfAmount(getTotalCost(item))}</td>{' '}
                          {(isPaymentDone(item) && isClient) || (isPaymentDone(item) && item.status === 'COMPLETED') ? (
                            <td className="accordionCol">{open === item?._id ? <ChevronUp /> : <ChevronDown />}</td>
                          ) : !isPaymentDone(item) ? (
                            <td>{}</td>
                          ) : (
                            <td>{}</td>
                          )}
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
                            </tr>
                          ) : (
                            <>
                              {isClient ? (
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
                                  <td>
                                    <div className="d-flex flex-column">
                                      <span>
                                        ${' '}
                                        {roundOfAmount(
                                          milestoneTransactionDetails?.find(
                                            (transaction) => transaction?.payment_type === PAYMENT_TYPES.CHECKOUT,
                                          )?.amount ?? 0,
                                        )}
                                      </span>
                                      <span>
                                        ${' '}
                                        {roundOfAmount(
                                          milestoneTransactionDetails?.find(
                                            (transaction) => transaction?.payment_type === PAYMENT_TYPES.CHECKOUT,
                                          )?.application_fee ?? 0,
                                        )}
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              ) : null}
                              <tr>
                                <td>{}</td>
                                <td>
                                  <TransactionTimeline transactionData={timelineData} />
                                </td>
                                <td>
                                  <div className="d-flex flex-column" style={{ gap: '60px' }}>
                                    {milestoneTransactionDetails?.map((transaction) => (
                                      <span key={transaction?._id}>$ {transaction?.amount}</span>
                                    ))}
                                  </div>
                                </td>
                                <td>
                                  <PaymentStatusForRow
                                    milestoneTransactionDetails={milestoneTransactionDetails}
                                    isClient={isClient}
                                  />
                                </td>
                                <td>{}</td>
                                <td colSpan={2}>
                                  <PaymentBy paymentBy={milestoneTransactionDetails} />
                                </td>
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
            {showPaymentCalculation && selectedPaymentId?.length > 0 && (
              <div className="d-flex w-100 mt-2 justify-content-between">
                <CardText style={{ fontSize: '16px', fontWeight: '500' }}>{`${applicationFee?.name ?? ''} (${
                  applicationFee?.percentage ?? 0
                }%)`}</CardText>
                <CardText>{`$${Number.isNaN(trumioFee) ? 0 : trumioFee}`}</CardText>{' '}
              </div>
            )}
            <hr />
            {showPaymentCalculation && selectedPaymentId?.length > 0 && (
              <div className="d-flex w-100 mt-2 justify-content-between">
                <CardText style={{ fontSize: '16px', fontWeight: '500' }}>
                  {`Total payment (Inclusive of ${applicationFee?.name ?? ''})`}
                </CardText>
                <CardText style={{ fontSize: '16px', fontWeight: '500' }}>{`$${
                  Number.isNaN(totalPending) ? 0 : totalPending
                }`}</CardText>
              </div>
            )}

            {showPaymentCalculation && !isAllMilestonePaid && selectedPaymentId?.length > 0 && (
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
