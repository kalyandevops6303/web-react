/* eslint-disable no-nested-ternary */
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, CardBody, CardText, Input, Table } from 'reactstrap';
import { ChevronDown, ChevronUp } from 'react-feather';
import { PAYMENT_STATUS, userTypes } from '../../../utility/constants/Constant';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';
import { getApplicationFee, getMilestonePaymentListing } from '../../../redux/actions/milestonePaymentActions';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import MakePaymentModal from '../../modals/MakePaymentModal';
import { userData } from '../../../redux/selectors/dashboardSelectors';
import { formatDate } from '../../../utility/Utils';
import TransactionTimeline from './TransactionTimeline';
import PaymentStatusForRow from './PaymentStatusForRow';
import PaymentBy from './PaymentBy';

const PaymentTable = () => {
  const [selectedPaymentId, setSelectedPaymentId] = useState([]);
  const [selectedPaymentData, setSelectedPaymentData] = useState([]);
  const [makePaymentModal, setMakePaymentModal] = useState(false);
  const [feeStructure, setFeeStructure] = useState(null);
  const [open, setOpen] = useState('');

  // const milestonesData = useSelector((state) => state.milestonePayment?.milestoneListDetails);
  const listLoading = useSelector((state) => state.milestonePayment?.listLoading);
  const projectDetailsData = useSelector(projectDetails);
  const user = useSelector(userData);

  const dispatch = useDispatch();

  const timelineData = [
    {
      color: '#7367F0',
      customContent: (
        <div className="d-flex flex-column">
          <span>#1321</span>
          <span>Jan 10, 23</span>
        </div>
      ),
    },
    {
      color: '#7367F0',
      customContent: (
        <div className="d-flex flex-column">
          <span>#1321</span>
          <span>Jan 10, 23</span>
        </div>
      ),
    },
    {
      color: '#7367F0',
      customContent: (
        <div className="d-flex flex-column">
          <span>#1321</span>
          <span>Jan 10, 23</span>
        </div>
      ),
    },
    {
      color: '#FF9F43',
      customContent: (
        <div className="d-flex flex-column">
          <span>#1321</span>
          <span>Jan 10, 23</span>
        </div>
      ),
    },
    {
      color: '#FF9F43',
      customContent: <span>#1321</span>,
    },
    {
      color: '#FF9F43',
      customContent: <span>#1321</span>,
    },
    {
      color: '#FF9F43',
      customContent: <span>#1321</span>,
    },
  ];
  const milestoneData = [
    {
      _id: '64ff210ac9c3c174b544fb63',
      created_at: 1694441738703,
      updated_at: 1699354848949,
      is_deleted: false,
      payment_status: 'PAID',
      deleted_by: '',
      bid_id: '64ff2062c9c3c174b544fb0d',
      description: 'desc',
      project_id: '64ff2053c9c3c174b544fb06',
      deliverables: [],
      end_date: 0,
      links: [],
      estimated_duration: {
        duration: 4,
        duration_type: 'WEEK',
      },
      numbers_of_hours: 0,
      status: 'IN_REVIEW',
      milestone_by: {
        entity: 'TEAM',
        entity_id: '64e43ef14556ff69c1e31d27',
        team_member_id: '64e373744556ff69c1e31be5',
      },
      workers: [],
      estimated_cost: 4000.0,
      start_date: 1694441959470,
      documents: [
        {
          file_name: 'June 2023 Rent and Maintenance Bills.pdf',
          file_key: 'milestones/64e373744556ff69c1e31be5/05549684-f80e-4014-b022-a792c569bdae.pdf',
          download_url:
            'https://trumiodevsa.blob.core.windows.net/trumio-private/milestones/64e373744556ff69c1e31be5/05549684-f80e-4014-b022-a792c569bdae.pdf?se=2023-11-08T11%3A16%3A02Z&sp=r&sv=2023-08-03&sr=b&sig=hqfFEkjj/ZeJPli92UfL3ZNnNveaQiBmLSSbh2MSNP8%3D',
          size: 0,
          created_at: 0,
        },
      ],
      name: 'Milestone 1',
      seq: 0,
    },
    {
      _id: '64ff210ac9c3c174b544fb64',
      created_at: 1694441738703,
      updated_at: 1699354848949,
      is_deleted: false,
      payment_status: 'FAILED',
      deleted_by: '',
      bid_id: '64ff2062c9c3c174b544fb0d',
      description: '',
      project_id: '64ff2053c9c3c174b544fb06',
      deliverables: [],
      end_date: 0,
      links: [],
      estimated_duration: {
        duration: 6,
        duration_type: 'WEEK',
      },
      numbers_of_hours: 0,
      status: 'IN_REVIEW',
      milestone_by: {
        entity: 'TEAM',
        entity_id: '64e43ef14556ff69c1e31d27',
        team_member_id: '64e373744556ff69c1e31be5',
      },
      workers: [],
      estimated_cost: 6000.0,
      start_date: 1698070759543,
      documents: [
        {
          file_name: 'Insertion sort.pdf',
          file_key: 'milestones/64e373744556ff69c1e31be5/ef194ddd-1f02-4ccf-a550-33f1d8c19727.pdf',
          download_url:
            'https://trumiodevsa.blob.core.windows.net/trumio-private/milestones/64e373744556ff69c1e31be5/ef194ddd-1f02-4ccf-a550-33f1d8c19727.pdf?se=2023-11-08T11%3A16%3A02Z&sp=r&sv=2023-08-03&sr=b&sig=UUsZsV5S5tiZsF9aeTS5PTK3OGGJ0aAl53iEw3r%2BUuw%3D',
          size: 0,
          created_at: 0,
        },
      ],
      name: 'milestone 2',
      seq: 0,
    },
  ];

  const isClient = user?.user_type === userTypes.client;

  const toggle = (id) => {
    if (isClient) {
      if (open === id) {
        setOpen(null);
      } else setOpen(id);
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

  const isPaymentDone = (milestone) =>
    milestone?.payment_status === PAYMENT_STATUS.PAID ||
    milestone?.payment_status === PAYMENT_STATUS.PAYMENT_SUCCESSFUL;

  const isFirstTwoMilestonePaid =
    isPaymentDone(milestoneData?.length > 0 && milestoneData[0]) ||
    isPaymentDone(milestoneData?.length > 0 && milestoneData[1]);

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
              <Table responsive className="w-100">
                <thead>
                  <tr>
                    {isClient ? <th> </th> : null}
                    {isClient ? <th>Transaction ID</th> : null}
                    <th>Milestone</th>
                    <th>{}</th>
                    <th>Status</th>
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
                        onClick={() => toggle(item?._id)}
                      >
                        {isClient ? (
                          !isPaymentDone(item) ? (
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
                          ) : (
                            <td>{}</td>
                          )
                        ) : null}
                        {isClient ? (
                          isPaymentDone(item) ? (
                            <td>
                              <div className="d-flex flex-column">
                                <span className="fw-bolder">{item?._id}</span>
                                <span className="fw-light" style={{ fontSize: '12px' }}>
                                  {formatDate(item?.created_at)}
                                </span>
                              </div>
                            </td>
                          ) : (
                            <td>{}</td>
                          )
                        ) : null}
                        <td>{item?.name}</td>
                        <td>{}</td>
                        <td>
                          <Badge color={getTagSettings(item?.payment_status).theme}>
                            {getTagSettings(item?.payment_status).text}
                          </Badge>
                        </td>
                        <td>{`$ ${item.estimated_cost.toLocaleString()}`}</td>
                        {isClient && isPaymentDone(item) ? (
                          <td>{open === item?._id ? <ChevronUp /> : <ChevronDown />}</td>
                        ) : null}
                      </tr>

                      {item?._id === open && isPaymentDone(item) ? (
                        <>
                          <tr style={{ borderStyle: 'none' }}>
                            <td>{}</td>
                            <td>
                              <div className="d-flex flex-column">
                                <span>Amount</span>
                                <span>Trumio Fee 20%</span>
                              </div>
                            </td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>
                              <div className="d-flex flex-column">
                                <span>$1000.12</span>
                                <span>$89.90</span>
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
                              <PaymentStatusForRow
                                paymentStatus={['PENDING', 'INITIATED', 'PAID', 'PAID', 'PAID', 'FAILED', 'FAILED']}
                              />
                            </td>
                            <td>{}</td>
                            <td>
                              <PaymentBy
                                projectBy={['Client', 'Trumio', 'Trumio', 'Stripe', 'Client', 'Stripe', 'Trumio']}
                              />
                            </td>
                          </tr>
                        </>
                      ) : null}
                    </>
                  ))}
                </tbody>
              </Table>
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

            {user.user_type === userTypes.client && (
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
