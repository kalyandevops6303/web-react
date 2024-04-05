import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, Spinner } from 'reactstrap';
import DeleteGif from '../../assets/images/gifs/delete.gif';
import { DeleteModalWrapper } from './style';

const RejectBidModal = ({ isLoading, modalData, onAccept, modal, toggleModal }) => {
  const onClose = () => {
    toggleModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={isLoading ? null : onClose} />
      <ModalBody>
        <DeleteModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" src={DeleteGif} width={244} height={244} alt="gif" />
            <div>
              <CardTitle className="modal-heading">Tough Call</CardTitle>
              <CardText className="modal-body-text fw-light w-76">
                You are rejecting this project bid offered by the following team or talent:
              </CardText>
              <section className="d-flex gap-2 stats">
                <div style={{ minWidth: '10rem' }}>
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
            <Button disabled={isLoading} color="danger" onClick={onAccept}>
              {isLoading ? <Spinner size="sm" /> : 'Reject Bid'}
            </Button>
          </div>
        </DeleteModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default RejectBidModal;

RejectBidModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  modalData: Proptypes.object,
  onAccept: Proptypes.func,
  isLoading: Proptypes.bool,
};

RejectBidModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  modalData: {},
  onAccept: () => {},
  isLoading: false,
};
