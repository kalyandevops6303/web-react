import React from 'react';
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
} from 'reactstrap';
import { PropTypes } from 'prop-types';
import { MakePaymentModalWrapper } from './style';
import { useSelector } from 'react-redux';

function MakePaymentModal({ toggleModal, modal, isLoading, selectedMilestone }) {
  const milestoneData = useSelector((state) => state.milestonePayment?.milestoneDetails);
  const onClose = () => {
    toggleModal();
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
            {milestoneData.length > 0 &&
              milestoneData.map((item) => (
                <Card style={{ height: '55px' }} className="d-flex justify-content-center" key={item._id}>
                  <CardBody className="d-flex justify-content-between">
                    <div className="d-flex">
                      <Input type="checkbox" id="m1" />
                      <div className="d-flex flex-column" style={{ marginTop: '-2px' }}>
                        <Label for="m1" className="text-truncate" style={{ marginLeft: '10px', fontSize: '16px' }}>
                          {item.name}
                        </Label>
                      </div>
                    </div>
                    <Badge color="light-success" style={{ width: 'fit-content', marginLeft: '10px' }}>
                      {item.payment_status}
                    </Badge>
                    <div
                      style={{ fontSize: '16px', fontWeight: '500' }}
                    >{`$ ${item.estimated_cost.toLocaleString()}`}</div>
                  </CardBody>
                </Card>
              ))}
            <div className="d-flex justify-content-between px-1">
              <CardText style={{ fontSize: '16px' }}>Trumio Fee 20%</CardText>
              <CardText style={{ fontSize: '16px' }}>{`$ 42,123`}</CardText>
            </div>
            <hr className="m-0 card-header-border" />
            <div className="d-flex justify-content-between p-1">
              <CardText style={{ fontSize: '16px', fontWeight: '500' }}>Inclusive of Trumio fee 20%</CardText>
              <CardText style={{ fontSize: '16px', fontWeight: '500' }}>{`$ 62,123`}</CardText>
            </div>
            <div className="d-flex justify-content-end py-1">
              <Button color="primary">{`Pay $ 27,002`}</Button>
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
  isLoading: PropTypes.bool,
  selectedMilestone: PropTypes.array,
};

MakePaymentModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  isLoading: false,
  selectedMilestone: [],
};

export default MakePaymentModal;
