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
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
} from 'reactstrap';
import { PropTypes } from 'prop-types';
import { MakePaymentModalWrapper } from './style';
import { getApplicationFee, makeMilestonePayment } from '../../redux/actions/milestonePaymentActions';
import { PAYMENT_STATUS } from '../../utility/constants/Constant';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';

function MakePaymentModal({ toggleModal, modal, selectedMilestoneIds }) {
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
  const trumioFee = (totalAmount * applicationFee?.percentage) / 100;
  const totalPending = totalAmount + trumioFee;

  const onGetApplicationFee = (data) => {
    setFeeStructure(data);
  };

  useEffect(() => {
    dispatch(getApplicationFee(onGetApplicationFee));
  }, []);

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
    const payload = {
      milestones: [...selectedIds],
      success_url: currentURL,
      cancel_url: currentURL,
    };
    dispatch(makeMilestonePayment(payload, onSuccess));
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
    if (selectedIds.length === 0) {
      return true;
    }
    if (milestoneData?.length === 1) return false;
    if (!isFirstTwoMilestonePaid && selectedIds?.length < 2) {
      return true;
    }
    return false;
  };
  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onClose} />
      <ModalBody>
        <MakePaymentModalWrapper>
          <CardTitle className="d-flex justify-content-center modal-header">Milestone Payment</CardTitle>
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
                  style={{ height: '55px', backgroundColor: selectedIds.includes(item._id) ? '#0185E41F' : 'white' }}
                  className="d-flex justify-content-center"
                  key={item._id}
                >
                  <CardBody className="d-flex justify-content-between">
                    <div className="d-flex">
                      <Input
                        type="checkbox"
                        id={item._id}
                        checked={selectedIds.includes(item._id)}
                        onChange={(evt) => handleMilestoneSelect(evt, item._id)}
                        disabled={isDisabled(item.payment_status)}
                        className="payment-form-control"
                      />
                      <div className="d-flex flex-column" style={{ marginTop: '-2px' }}>
                        <Label
                          for={item._id}
                          className="text-truncate"
                          style={{ marginLeft: '10px', fontSize: '16px' }}
                        >
                          {item.name}
                        </Label>
                      </div>
                    </div>
                    <Badge
                      color={getTagSettings(item.payment_status).theme}
                      style={{ width: 'fit-content', marginLeft: '10px' }}
                    >
                      {getTagSettings(item.payment_status).text}
                    </Badge>
                    <div style={{ fontSize: '16px', fontWeight: '500' }}>{`$ ${item.estimated_cost}`}</div>
                  </CardBody>
                </Card>
              ))}
            {paymentFeeLoading ? (
              <ComponentSpinner size="sm" />
            ) : selectedIds.length === 0 ? null : (
              <>
                <div className="d-flex justify-content-between px-1">
                  <CardText style={{ fontSize: '16px' }}>{`${applicationFee?.name ?? ''} (${
                    applicationFee?.percentage ?? 0
                  }%)`}</CardText>
                  <CardText style={{ fontSize: '16px' }}>{`$ ${Number.isNaN(trumioFee) ? 0 : trumioFee}`}</CardText>
                </div>
                <hr className="m-0 card-header-border" />
                <div className="d-flex justify-content-between p-1">
                  <CardText style={{ fontSize: '16px', fontWeight: '500' }}>
                    {`Total payment (Inclusive of ${applicationFee?.name ?? ''})`}
                  </CardText>
                  <CardText style={{ fontSize: '16px', fontWeight: '500' }}>{`$ ${
                    Number.isNaN(totalPending) ? 0 : totalPending.toLocaleString()
                  }`}</CardText>
                </div>
              </>
            )}
            {paymentFeeLoading || selectedIds.length === 0 ? null : (
              <div className="d-flex justify-content-end py-1">
                <Button color="primary" onClick={handlePayment} disabled={isPaymentDisabled()}>
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
};

MakePaymentModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  selectedMilestoneIds: [],
};

export default MakePaymentModal;
