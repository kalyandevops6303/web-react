import React from 'react';
import Proptypes from 'prop-types';
import { Star, User } from 'react-feather';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Badge } from 'reactstrap';
import '../custom-styles.scss';
import GreatJobTick from '../../assets/images/greatJobGif.gif';
import { InviteUsersListContainer } from './style';
import theme from '../../configs/themeVariables';

const InvitationSentModal = ({ modal, toggleModal, selectedTalents }) => (
  <Modal
    isOpen={modal}
    toggle={toggleModal}
    contentClassName="custom-modal-style"
    className="modal-dialog-centered modal-lg"
  >
    <ModalHeader toggle={toggleModal} />
    <ModalBody className="px-3 py-0">
      <div className="d-flex align-items-center">
        <img src={GreatJobTick} alt="great-job" width={120} height={120} className="me-4" />
        <div className="w-100">
          <h2 className="fw-bold font-large-1 mb-1">Great Job!</h2>
          <h4 className="fw-bold font-small-5">Invitation sent</h4>
          <p className="fw-light font-medium-3 mt-75">You’ve sent a team member invitation</p>
          <InviteUsersListContainer>
            {selectedTalents.map((talent) => (
              <Row key={talent.id} className="d-flex align-items-center mb-2">
                <Col sm="12" md="12" lg="12">
                  <div className="d-flex align-items-center">
                    <div className="user-pic p-75 me-2">
                      <User size={30} />
                    </div>
                    <div>
                      <p className="font-medium-1 fw-bold m-0 mb-75">{talent.name}</p>
                      <div className="d-flex align-items-center">
                        <Badge>
                          <div className="d-flex align-items-center">
                            <Star size={12} color={theme.starRatingBg} fill={theme.starRatingBg} className="me-50" />
                            <p className="m-0 fw-bolder rating-text">{talent.rating}</p>
                          </div>
                        </Badge>
                        <p className="m-0 font-small-3 fw-light ms-1">{talent.projects} Projects</p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            ))}
          </InviteUsersListContainer>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-1 mb-2">
        <Button color="primary" onClick={toggleModal} className="mb-1">
          Close
        </Button>
      </div>
    </ModalBody>
  </Modal>
);

export default InvitationSentModal;

InvitationSentModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  selectedTalents: Proptypes.array,
};

InvitationSentModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  selectedTalents: [],
};
