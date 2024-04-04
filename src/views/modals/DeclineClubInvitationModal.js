import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import Avatar from '@components/avatar';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, CardSubtitle, Spinner } from 'reactstrap';
import DeleteGif from '../../assets/images/gifs/delete.gif';
import { RemoveMemberModalWrapper } from './style';

const DeclineClubInvitaionModal = ({ modal, toggleModal, data, onDecline, onLoading }) => {
  const onClose = () => {
    toggleModal();
  };

  const handleDecline = () => {
    onDecline();
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onLoading ? null : onClose} />
      <ModalBody>
        <RemoveMemberModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" src={DeleteGif} width={244} height={244} alt="gif" />
            <div className="me-4">
              <CardTitle className="modal-heading">Tough Call</CardTitle>
              <CardSubtitle className="mb-75 fw-bold subtitle">Decline Invitation</CardSubtitle>
              <CardText className="modal-text fw-light w-76">
                You are about to decline the invitation for the below club
              </CardText>

              <div>
                <div className="d-flex gap-1 stats">
                  <Avatar img={data?.image_uri || avatar7} imgHeight="52" imgWidth="52" />
                  <div>
                    <CardText className="value mt-25 mb-25 font-weight-bolder">{data?.name}</CardText>
                    <small className="key">{data?.role?.name}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex gap-1 mt-3 me-1 justify-content-end">
            <Button disabled={onLoading} outline color="primary" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button disabled={onLoading} onClick={() => handleDecline()} color="danger">
              {onLoading ? <Spinner size="sm" /> : 'Decline'}
            </Button>
          </div>
        </RemoveMemberModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default DeclineClubInvitaionModal;

DeclineClubInvitaionModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  data: Proptypes.object,
  onDecline: Proptypes.func,
  onLoading: Proptypes.bool,
};

DeclineClubInvitaionModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  onDecline: () => {},
  onLoading: false,

  data: {},
};
