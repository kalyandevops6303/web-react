import React, { useState } from 'react';
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
import { makeMilestonePayment } from '../../redux/actions/milestonePaymentActions';
import { PAYMENT_STATUS } from '../../utility/constants/Constant';

function MakePaymentModal({ toggleModal, modal, selectedMilestoneIds }) {
  const [selectedIds, setSelectedIds] = useState(selectedMilestoneIds);

  const dispatch = useDispatch();

  const milestoneData = useSelector((state) => state.milestonePayment?.milestoneListDetails);
  const milestoneDataLoading = useSelector((state) => state.milestonePayment?.checkoutLoading);

  const filteredMilestones = milestoneData?.filter((milestone) => selectedIds.includes(milestone._id));

  const totalAmount = filteredMilestones?.reduce((acc, curr) => acc + curr.estimated_cost, 0);

  const trumioFee = (totalAmount * 20) / 100;
  const totalPending = totalAmount + trumioFee;

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

  const handlePayment = () => {
    const payload = {
      milestones: [...selectedIds],
      success_url: 'https://www.stripe.com',
      cancel_url: 'https://www.stripe.com',
    };
    dispatch(makeMilestonePayment(payload, onSuccess));
  };
  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onClose} />
      <ModalBody>
        <MakePaymentModalWrapper>
          <CardTitle className="d-flex justify-content-center modal-header">Milestone Payment</CardTitle>
          <div className="px-4">
            <CardTitle className="modal-title">Let&apos;s Start!</CardTitle>
            <CardText className="mt-1">
              In order for the project to start, at any given point of time minimum of 2 milestone payments needs to be
              made.
            </CardText>
            <CardText>
              <b>Note: </b> Insufficient funds will result in putting the upcoming milestone on hold
            </CardText>
            {milestoneData?.length > 0 &&
              milestoneData.map((item) => (
                <Card style={{ height: '55px' }} className="d-flex justify-content-center" key={item._id}>
                  <CardBody className="d-flex justify-content-between">
                    <div className="d-flex">
                      <Input
                        type="checkbox"
                        id="m1"
                        checked={selectedIds.includes(item._id)}
                        onChange={(evt) => handleMilestoneSelect(evt, item._id)}
                      />
                      <div className="d-flex flex-column" style={{ marginTop: '-2px' }}>
                        <Label for="m1" className="text-truncate" style={{ marginLeft: '10px', fontSize: '16px' }}>
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
                    <div
                      style={{ fontSize: '16px', fontWeight: '500' }}
                    >{`$ ${item.estimated_cost.toLocaleString()}`}</div>
                  </CardBody>
                </Card>
              ))}
            <div className="d-flex justify-content-between px-1">
              <CardText style={{ fontSize: '16px' }}>Trumio Fee 20%</CardText>
              <CardText style={{ fontSize: '16px' }}>{`$ ${trumioFee.toLocaleString()}`}</CardText>
            </div>
            <hr className="m-0 card-header-border" />
            <div className="d-flex justify-content-between p-1">
              <CardText style={{ fontSize: '16px', fontWeight: '500' }}>Inclusive of Trumio fee 20%</CardText>
              <CardText
                style={{ fontSize: '16px', fontWeight: '500' }}
              >{`$ ${totalPending.toLocaleString()}`}</CardText>
            </div>
            <div className="d-flex justify-content-end py-1">
              <Button color="primary" onClick={handlePayment}>
                {milestoneDataLoading ? <Spinner size="sm" /> : `Pay $ ${totalPending.toLocaleString()}`}
              </Button>
            </div>
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
