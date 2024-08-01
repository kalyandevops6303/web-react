import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, Spinner } from 'reactstrap';
import AcceptGif from '../../assets/images/gifs/accept_bid.gif';
import { AcceptModalWrapper } from './style';

const AcceptBidModal = ({ isLoading, modalData, onAccept, modal, toggleModal }) => {
  const onClose = () => {
    toggleModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={isLoading ? null : onClose} />
      <ModalBody>
        <AcceptModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" style={{ margin: 'auto' }} src={AcceptGif} width={160} height={160} alt="gif" />
            <div className="content-side">
              <CardTitle className="modal-heading">Great Choice!</CardTitle>
              <CardText className="modal-body-text fw-light">
                By accepting this bid you are assigning this project to the following team or talent:
              </CardText>
              <section className="d-flex gap-2 stats">
                <div>
                  <CardText className="value mb-25">{modalData?.name || 'Talent/Team name'}</CardText>
                  <small className="key">{modalData?.role || 'Talent/Team name'}</small>
                </div>
                <div>
                  <CardText className="value mb-25">${modalData?.value}</CardText>
                  <small className="key">Bid value</small>
                </div>
              </section>
            </div>
          </div>
          <div className="d-flex gap-1 mt-3 justify-content-end">
            <Button disabled={isLoading} onClick={onClose} outline color="primary">
              Cancel
            </Button>
            <Button disabled={isLoading} color="primary" onClick={onAccept}>
              {isLoading ? <Spinner size="sm" /> : 'Accept Bid'}
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
  modalData: Proptypes.object,
  onAccept: Proptypes.func,
  isLoading: Proptypes.bool,
};

AcceptBidModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  modalData: {},
  onAccept: () => {},
  isLoading: false,
};
