import React from 'react';
import Proptypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Badge, Input } from 'reactstrap';
import { Star, User } from 'react-feather';
import '../custom-styles.scss';
import { InviteUsersListContainer } from '../CreateProject/style';
import theme from '../../configs/themeVariables';

const SendInvitationModal = ({
  modal,
  toggleModal,
  selectedTalents,
  setInvitationSentModal,
  message,
  setMessage,
  description,
}) => (
  <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
    <ModalHeader toggle={toggleModal} />
    <ModalBody>
      <div className="px-3">
        <h2 className="fw-bold font-large-1 text-center mb-3">Send Invitation</h2>
        <p className="mb-2">{description}</p>
        <InviteUsersListContainer>
          {selectedTalents.map((talent) => (
            <Row key={talent.user_id} className="d-flex align-items-center mb-2 w-100 mx-0">
              <Col sm="12" md="8" lg="6">
                <div className="d-flex align-items-center">
                  <div className="user-pic p-25 me-2">
                    <User size={28} />
                  </div>
                  <p className="font-medium-1 fw-bold m-0">{`${talent.first_name} ${talent.last_name}`}</p>
                </div>
              </Col>
              <Col sm="12" md="4" lg="6">
                <div className="d-flex align-items-center">
                  <Badge>
                    <div className="d-flex align-items-center">
                      <Star size={12} color={theme.starRatingBg} fill={theme.starRatingBg} className="me-50" />
                      <p className="m-0 fw-bolder rating-text">{talent.rating}</p>
                    </div>
                  </Badge>
                  <p className="m-0 font-small-3 fw-light ms-1">{talent.projects_worked_on_count} Projects</p>
                </div>
              </Col>
            </Row>
          ))}
        </InviteUsersListContainer>
        <Input
          type="textarea"
          rows="5"
          placeholder="Enter your message to talent."
          className="mt-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-end mb-2 mt-3 px-3">
        <Button color="primary" outline className="me-3" onClick={toggleModal}>
          <span className="px-2">Cancel</span>
        </Button>
        <Button
          color="primary"
          onClick={() => {
            toggleModal();
            setInvitationSentModal(true);
          }}
        >
          Invite
        </Button>
      </div>
    </ModalBody>
  </Modal>
);

export default SendInvitationModal;

SendInvitationModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  selectedTalents: Proptypes.array,
  setInvitationSentModal: Proptypes.func,
  message: Proptypes.string,
  setMessage: Proptypes.func,
  description: Proptypes.string,
};

SendInvitationModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  selectedTalents: [],
  setInvitationSentModal: () => {},
  message: '',
  setMessage: () => {},
  description: '',
};
