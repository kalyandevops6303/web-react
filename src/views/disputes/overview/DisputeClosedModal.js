import React from 'react';
import '../../custom-styles.scss';
import Proptypes from 'prop-types';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import DisputeClosedGif from '../../../assets/images/disputeClosed.gif';
import { DisputeClosedModalContainer } from '../style';

const DisputeClosedModal = ({ modal, toggleModal }) => (
  <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered">
    <ModalHeader toggle={toggleModal} />
    <ModalBody className="pt-0 px-5">
      <DisputeClosedModalContainer className="d-flex justify-content-between">
        <img src={DisputeClosedGif} alt="closed" height={174} width={174} className="mt-2" />
        <div>
          <h2 className="font-large-1 text-blue">Dispute Closed</h2>
          <h4 className="my-1">Dispute Type</h4>
          <p className="font-medium-3">
            labore et dolore magna aliqua. Eu scelerisque felis imperdiet proin fermentum. Donec enim diam vulputate ut
            pharetra sit. Elementum pulvinar etiam{' '}
          </p>
          <div className="d-flex align-items-center mt-1">
            <Avatar img={defaultAvatar} imgHeight="50" imgWidth="50" className="me-1" />
            <div>
              <p className="fw-bold font-medium-3 mb-0">Leona Watkins</p>
              <p className="mb-0">R&D</p>
            </div>
          </div>
          <div className="d-flex justify-content-end mb-2 mt-1">
            <Button color="primary" outline onClick={toggleModal}>
              Okay
            </Button>
          </div>
        </div>
      </DisputeClosedModalContainer>
    </ModalBody>
  </Modal>
);

export default DisputeClosedModal;

DisputeClosedModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

DisputeClosedModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
