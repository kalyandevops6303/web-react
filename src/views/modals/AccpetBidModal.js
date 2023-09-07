import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import AcceptGif from '../../assets/images/gifs/accept_contract.gif';
import { AcceptModalWrapper } from './style';

const AcceptBidModal = ({ data, onAccept, modal, toggleModal }) => {
  const onClose = () => {
    toggleModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onClose} />
      <ModalBody>
        <AcceptModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" src={AcceptGif} width={150} height={150} alt="gif" />
            <div className="content-side">
              <CardTitle className="modal-title-custom">Sign Contract</CardTitle>
              <CardSubtitle className="mb-75 fw-bold subtitle">Agree & Accept Contract</CardSubtitle>

              <CardText className="desc fw-light">Are you sure you want to sign the contract? </CardText>
              <section className="d-flex gap-2 stats">
                <div>
                  <CardText className="value mb-25">{data?.name || 'Talent/Team name'}</CardText>
                  <small className="key">Talent/Team name</small>
                </div>
                <div>
                  <CardText className="value mb-25">$-</CardText>
                  <small className="key">Project value</small>
                </div>
              </section>
            </div>
          </div>
          <div className="d-flex gap-1 mt-3 justify-content-end">
            <Button outline color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={onAccept}>
              Agree & Sign
            </Button>
          </div>
        </AcceptModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default AcceptBidModal;

AcceptBidModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  data: Proptypes.object,
  onAccept: Proptypes.func,
};

AcceptBidModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  data: {},
  onAccept: () => {},
};
