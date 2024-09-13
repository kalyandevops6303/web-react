/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from 'reactstrap';
import classnames from 'classnames';
import { PropTypes } from 'prop-types';
import { MakePaymentModalWrapper } from './style';
import { getApplicationFee, makeMilestonePayment } from '../../redux/actions/milestonePaymentActions';
import { PAYMENT_STATUS, paymentText, userTypes } from '../../utility/constants/Constant';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import { CustomBadge } from '../styled';
import { selectAuthUserData } from '../../redux/selectors/authSelectors';
import { projectDetails } from '../../redux/selectors/projectDetailsSelectors';

import theme from '../../configs/themeVariables';

function MakePaymentModal({ toggleModal, modal, selectedMilestoneIds, selectedAndDisabledPaymentId }) {
  const [selectedIds, setSelectedIds] = useState(selectedMilestoneIds);
  const [feeStructre, setFeeStructure] = useState(null);

  const dispatch = useDispatch();

  const milestoneData = useSelector((state) => state.milestonePayment?.milestoneListDetails);
  const milestoneDataLoading = useSelector((state) => state.milestonePayment?.checkoutLoading);
  const paymentFeeLoading = useSelector((state) => state.milestonePayment?.paymentFeeLoading);

  const filteredMilestones = milestoneData?.filter((milestone) => selectedIds.includes(milestone._id));

  const totalAmount = filteredMilestones?.reduce((acc, curr) => acc + curr.estimated_cost, 0);

  const applicationFee = feeStructre?.application_fee;
  // eslint-disable-next-line no-unsafe-optional-chaining

  const trumioFeeBeforeDiscount = (totalAmount * applicationFee?.percentage) / 100;
  const trumioFeeDiscount = (trumioFeeBeforeDiscount * (applicationFee?.discount_coupon?.percent_off ?? 0)) / 100;
  const trumioFeeAfterDiscount = trumioFeeBeforeDiscount - trumioFeeDiscount;

  const totalPending = parseFloat(totalAmount + trumioFeeAfterDiscount).toFixed(2);

  const user = useSelector(selectAuthUserData);
  const projectDetailsData = useSelector(projectDetails);
  const isClient = user?.user_type === userTypes.client;

  const onGetApplicationFee = (data) => {
    setFeeStructure(data);
  };

  useEffect(() => {
    if (projectDetailsData?._id) {
      dispatch(getApplicationFee(projectDetailsData?._id, onGetApplicationFee));
    }
  }, [projectDetailsData?._id]);

  const getTagSettings = (tag) => {
    const { payment_status = '', status = '' } = tag;
    if (payment_status === PAYMENT_STATUS.PAYMENT_FAILED || payment_status === PAYMENT_STATUS.FAILED) {
      return { theme: 'light-danger', text: paymentText.RETRY_PAYMENT };
    }
    if (payment_status === PAYMENT_STATUS.PAYMENT_DUE || payment_status === PAYMENT_STATUS.PENDING) {
      return { theme: 'light-warning', text: paymentText.PAYMENT_DUE };
    }
    if (payment_status === PAYMENT_STATUS.PAYMENT_PROCESSING) {
      return { theme: 'light-primary', text: paymentText.PAYMENT_PROCESSING };
    }
    if (payment_status === PAYMENT_STATUS.INITIATED) {
      return { theme: 'light-primary', text: paymentText.PAYMENT_INITIATED };
    }
    if (payment_status === PAYMENT_STATUS.PAID) {
      return {
        theme: 'light-success',
        text: status !== 'COMPLETED' ? paymentText.FUNDED : paymentText.PAID,
      };
    }

    return { theme: 'light-primary', text: payment_status };
  };
  const handleMilestoneSelect = (evt, id) => {
    const isSelected = selectedIds.find((item) => item === id);
    if (isSelected) {
      const newArray = selectedIds.filter((item) => item !== id);
      setSelectedIds(newArray);
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const onClose = () => {
    toggleModal();
  };

  const onSuccess = (data) => {
    // eslint-disable-next-line no-undef
    window.open(data?.session_url, '_self');
  };

  // eslint-disable-next-line no-undef
  const currentURL = window.location.href;

  const handlePayment = () => {
    const url = new URL(currentURL);

    // Remove the query parameters
    const baseURL = url.origin + url.pathname;

    const payload = {
      milestones: [...selectedIds],
      success_url: baseURL,
      cancel_url: baseURL,
    };
    dispatch(makeMilestonePayment(payload, onSuccess));
  };

  const isDisabled = (paymentStatus) =>
    paymentStatus === PAYMENT_STATUS.PAID ||
    paymentStatus === PAYMENT_STATUS.PAYMENT_SUCCESSFUL ||
    paymentStatus === PAYMENT_STATUS.INITIATED ||
    paymentStatus === PAYMENT_STATUS.PAYMENT_PROCESSING;

  const isPaymentDisabled = () => {
    if (selectedIds.length === 0) {
      return true;
    }
    if (milestoneData?.length === 1) return false;

    return false;
  };

  const getCardStyle = (isSelected) => ({
    height: '55px',
    backgroundColor: isSelected ? theme.selectedBlugBg : 'white',
    border: isSelected ? `1.5px solid ${theme.activeNavPillText}` : '',
    borderRadius: '5px',
  });
  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onClose} />
      <ModalBody>
        <MakePaymentModalWrapper>
          <CardTitle className="d-flex justify-content-center modal-heading">Milestone Payment</CardTitle>
          <div className="px-4">
            <CardText className="mt-1">
              At any given point of time a minimum of 2 milestone payments need to be paid. This does not apply for
              projects with only 1 milestone.
            </CardText>
            <CardText>
              <b>Note: </b> Without the minimum milestone payment the project will be put on hold.
            </CardText>
            {milestoneData?.length > 0 &&
              milestoneData.map((item) => (
                <Card
                  style={getCardStyle(selectedIds.includes(item._id))}
                  className="d-flex justify-content-center mb-1"
                  key={item._id}
                >
                  <CardBody className="d-flex justify-content-between pe-0">
                    <Row className="w-100">
                      <Col sm="12" md="5" lg="5">
                        <div className="d-flex form-check w-100">
                          <Input
                            type="checkbox"
                            id={item._id}
                            checked={selectedIds.includes(item._id)}
                            onChange={(evt) =>
                              !selectedAndDisabledPaymentId?.includes(item?._id) && handleMilestoneSelect(evt, item._id)
                            }
                            disabled={isDisabled(item.payment_status)}
                            className="payment-form-control"
                          />
                          <div className="d-flex flex-column w-100" style={{ marginTop: '-2px' }}>
                            <Label for={item._id} className="text-truncate truncated-milestone-name">
                              Milestone #{item?.seq}
                            </Label>
                          </div>
                        </div>
                      </Col>
                      <Col sm="12" md="5" lg="4">
                        <CustomBadge bordered rounded>
                          <Badge
                            className={classnames({
                              RETRY_PAYMENT:
                                isClient &&
                                (item?.payment_status === 'PAYMENT_FAILED' || item?.payment_status === 'FAILED'),
                              PAID_AMOUNT: item?.payment_status === 'PAID' && item?.status === 'COMPLETED',
                              FUNDED: item?.payment_status === 'PAID' && item?.status !== 'COMPLETED',
                              [item?.payment_status]: item?.payment_status !== 'PAID',
                            })}
                          >
                            {getTagSettings(item).text}
                          </Badge>
                        </CustomBadge>
                      </Col>
                      <Col sm="12" md="5" lg="3">
                        <div
                          style={{ fontSize: '16px', fontWeight: '500' }}
                          className="text-end"
                        >{`$ ${item.estimated_cost}`}</div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              ))}
            {paymentFeeLoading ? (
              <ComponentSpinner size="sm" />
            ) : selectedIds.length === 0 ? null : (
              <>
                <div className="d-flex justify-content-between px-1">
                  <CardText style={{ fontSize: '16px' }}>
                    {`${applicationFee?.name ?? ''} (${applicationFee?.percentage ?? 0}%)`}
                  </CardText>
                  <CardText style={{ fontSize: '16px' }}>{`$ ${Number.isNaN(trumioFeeBeforeDiscount) ? 0 : trumioFeeBeforeDiscount}`}</CardText>
                </div>
                {
                  applicationFee?.discount_coupon?.code && (
                    <div className="d-flex justify-content-between px-1">
                      <CardText style={{ fontSize: '16px' }}>
                        {`Discount (${applicationFee?.discount_coupon?.code ?? 0})`}
                      </CardText>
                      <CardText style={{ fontSize: '16px' }}>
                        {`- $ ${Number.isNaN(trumioFeeDiscount) ? 0 : trumioFeeDiscount}`}
                      </CardText>
                    </div>
                  )
                }
                <hr className="m-0 card-header-border" />
                <div className="d-flex justify-content-between p-1">
                  <CardText style={{ fontSize: '16px', fontWeight: '500' }}>
                    {`Total payment (Inclusive of ${applicationFee?.name ?? ''})`}
                  </CardText>
                  <CardText style={{ fontSize: '16px', fontWeight: '500' }}>
                    {`$ ${Number.isNaN(totalPending) ? 0 : totalPending.toLocaleString()}`}
                  </CardText>
                </div>
              </>
            )}
            {paymentFeeLoading || selectedIds.length === 0 ? null : (
              <div className="d-flex justify-content-end py-1">
                <Button color="primary" onClick={handlePayment} disabled={isPaymentDisabled() || milestoneDataLoading}>
                  {milestoneDataLoading ? (
                    <Spinner size="sm" />
                  ) : (
                    `Pay $ ${Number.isNaN(totalPending) ? 0 : totalPending.toLocaleString()}`
                  )}
                </Button>
              </div>
            )}
          </div>
        </MakePaymentModalWrapper>
      </ModalBody>
    </Modal>
  );
}

MakePaymentModal.propTypes = {
  modal: PropTypes.bool,
  toggleModal: PropTypes.func,
  selectedMilestoneIds: PropTypes.array,
  selectedAndDisabledPaymentId: PropTypes.array,
};

MakePaymentModal.defaultProps = {
  modal: false,
  toggleModal: () => { },
  selectedMilestoneIds: [],
  selectedAndDisabledPaymentId: [],
};

export default MakePaymentModal;
