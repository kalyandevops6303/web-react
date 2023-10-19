import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, Spinner } from 'reactstrap';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import Avatar from '@components/avatar';
import AcceptGif from '../../assets/images/gifs/accept_bid.gif';
import { AcceptModalWrapper } from './style';

const JoinTeamModal = ({ title, isLoading, data, onAccept, modal, toggleModal }) => {
  const onClose = () => {
    toggleModal();
  };
  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onClose} />
      <ModalBody>
        <AcceptModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" style={{ margin: 'auto' }} src={AcceptGif} width={160} height={160} alt="gif" />
            <div className="content-side">
              <CardTitle className="modal-title-custom">{title}</CardTitle>
              <CardText className="desc fw-light">
                By doing this you will be sending a join request to this team
              </CardText>
              <div className="mt-2 d-flex align-items-center">
                <Avatar
                  img={data?.team_logo?.length > 0 ? data?.team_logo : defaultAvatar}
                  imgHeight="45"
                  imgWidth="45"
                />
                <div className="d-flex flex-column ms-50">
                  <span className="text-truncate fs-4 fw-bold">{data?.name}</span>
                  <span className="text-truncate">{data?.tagline}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex gap-1 mt-2 justify-content-end">
            <Button onClick={onClose} outline color="primary">
              Cancel
            </Button>
            <Button disabled={isLoading} color="primary" onClick={onAccept}>
              {isLoading ? <Spinner size="sm" /> : 'Send'}
            </Button>
          </div>
        </AcceptModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default JoinTeamModal;

JoinTeamModal.propTypes = {
  title: Proptypes.string,
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  data: Proptypes.object,
  onAccept: Proptypes.func,
  isLoading: Proptypes.bool,
};

JoinTeamModal.defaultProps = {
  title: 'Request',
  modal: false,
  toggleModal: () => {},
  data: {},
  onAccept: () => {},
  isLoading: false,
};
