import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, CardSubtitle, Spinner } from 'reactstrap';
import AcceptGif from '../../assets/images/gifs/accept_bid.gif';
import { AcceptModalWrapper } from './style';

const AcceptRequestModal = ({ title, isLoading, data, onAccept, modal, toggleModal }) => {
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
              <CardSubtitle className="mb-75 fw-bold subtitle">Accept request</CardSubtitle>

              <CardText className="desc fw-light">
                {`By accepting this request ${
                  title === 'Team Join Request' ? 'this user' : 'you'
                } will be added to the `}
                {title === 'Team Invitation Request' || title === 'Team Join Request' ? 'team' : 'project and team'}
              </CardText>
              <section className="d-flex gap-2 stats">
                <div>
                  <CardText className="value mb-25">{`${
                    data?.request_for?.team_name || data?.request_for?.project_name
                  }`}</CardText>
                  <small className="key">{data?.request_for?.team_name ? 'Team name' : 'Project name'}</small>
                </div>
                {title === 'Project Team Invitation Request' && (
                  <div>
                    <CardText className="value mb-25">{`${data?.request_from?.team_name}`}</CardText>
                    <small className="key">{data?.request_from?.team_name ? 'Team name' : ''}</small>
                  </div>
                )}
                <div className="d-none">
                  <CardText className="value mb-25">$-</CardText>
                  <small className="key">Project value</small>
                </div>
              </section>
            </div>
          </div>
          <div className="d-flex gap-1 mt-2 justify-content-end">
            <Button onClick={onClose} outline color="primary">
              Cancel
            </Button>
            <Button disabled={isLoading} color="primary" onClick={onAccept}>
              {isLoading ? <Spinner size="sm" /> : 'Accept'}
            </Button>
          </div>
        </AcceptModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default AcceptRequestModal;

AcceptRequestModal.propTypes = {
  title: Proptypes.string,
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  data: Proptypes.object,
  onAccept: Proptypes.func,
  isLoading: Proptypes.bool,
};

AcceptRequestModal.defaultProps = {
  title: 'Request',
  modal: false,
  toggleModal: () => {},
  data: {},
  onAccept: () => {},
  isLoading: false,
};
