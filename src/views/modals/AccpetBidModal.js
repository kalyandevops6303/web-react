import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, CardSubtitle, Spinner } from 'reactstrap';
import AcceptGif from '../../assets/images/gifs/green_check.gif';
import { AcceptModalWrapper } from './style';

const AcceptBidModal = ({ isLoading, data, onAccept, modal, toggleModal }) => {
  const onClose = () => {
    toggleModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onClose} />
      <ModalBody>
        <AcceptModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" style={{ margin: 'auto' }} src={AcceptGif} width={120} height={120} alt="gif" />
            <div className="content-side">
              <CardTitle className="modal-title-custom">Great Choice</CardTitle>
              <CardSubtitle className="mb-75 fw-bold subtitle">Accept bid</CardSubtitle>

              <CardText className="desc fw-light">
                By accepting this bid your assigning this project to the below{' '}
              </CardText>
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
            <Button onClick={onClose} outline color="primary">
              Cancel
            </Button>
            <Button disabled={isLoading} color="primary" onClick={onAccept}>
              {isLoading ? <Spinner /> : 'Accept Bid'}
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
  isLoading: Proptypes.bool,
};

AcceptBidModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  data: {},
  onAccept: () => {},
  isLoading: false,
};
