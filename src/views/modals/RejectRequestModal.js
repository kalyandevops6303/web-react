import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, CardSubtitle, Spinner } from 'reactstrap';
import DeleteGif from '../../assets/images/gifs/delete.gif';
import { DeleteModalWrapper } from './style';

const RejectRequestModal = ({ title, isLoading, data, onReject, modal, toggleModal, isClubInvitation }) => {
  const onClose = () => {
    toggleModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onClose} />
      <ModalBody>
        <DeleteModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif m-auto" src={DeleteGif} width={160} height={160} alt="gif" />
            <div style={{ width: '60%' }}>
              <CardTitle className="modal-title-custom">
                {isClubInvitation ? 'Club Invitation Request' : title}
              </CardTitle>
              <CardSubtitle className="mb-75 fw-bold subtitle">Decline request</CardSubtitle>

              <CardText className="desc fw-light w-76">You are declining this request from</CardText>
              <section className="d-flex gap-2 stats">
                <div>
                  <CardText className="value mb-25">
                    {`${data?.request_from?.first_name} ${data?.request_from?.last_name}` || 'Talent/Team name'}
                  </CardText>
                  <small className="key d-block">{data?.request_from?.role}</small>
                </div>
                <div className="d-none">
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
            <Button color="danger" onClick={onReject}>
              {isLoading ? <Spinner size="sm" /> : 'Decline'}
            </Button>
          </div>
        </DeleteModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default RejectRequestModal;

RejectRequestModal.propTypes = {
  title: Proptypes.string,
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  data: Proptypes.object,
  onReject: Proptypes.func,
  isLoading: Proptypes.bool,
  isClubInvitation: Proptypes.bool,
};

RejectRequestModal.defaultProps = {
  title: '',
  modal: false,
  toggleModal: () => {},
  data: {},
  onReject: () => {},
  isLoading: false,
  isClubInvitation:false
};
