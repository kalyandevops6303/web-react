/* eslint-disable no-undef */
import React from 'react';
import Proptypes from 'prop-types';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import '../custom-styles.scss';
import SwitchMember from '../../assets/images/gifs/switch.gif';
import { InviteUsersListContainer } from '../CreateProject/style';

const ChangeClubMemberModal = ({ modal, toggleModal, memberType }) => {
  const member = memberType === 'ADMIN' ? 'Member' : 'Admin';
  const handleClose = () => {
    toggleModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={handleClose} />
      <ModalBody className="px-3 py-0">
        <div className="d-flex align-items-center">
          <img src={SwitchMember} alt="great-job" width={120} height={120} className="me-4" />
          <div className="w-100">
            <h2 className="fw-bold font-large-1 mb-1">Change Membership</h2>
            <p className="fw-light font-medium-3 mt-75">
              You are about to change the role type to <span className="text-primary fw-bolder">{member}.</span>
            </p>
            <InviteUsersListContainer>
              <Row className="d-flex align-items-center mb-2 mx-0">
                <Col sm="12" md="12" lg="12">
                  <div className="d-flex align-items-center">
                    <Avatar img={defaultAvatar} imgHeight="48" imgWidth="48" className="me-2 user-pic" />
                    <div>
                      <p className="font-medium-1 fw-bold m-0 mb-50">Gertrude Barton</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </InviteUsersListContainer>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-1 mb-2">
          <Button color="outline-secondary" className="me-1" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleClose}>
            Change
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ChangeClubMemberModal;

ChangeClubMemberModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  memberType: Proptypes.string,
};

ChangeClubMemberModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  memberType: '',
};
