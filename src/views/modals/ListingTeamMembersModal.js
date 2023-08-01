import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, Card, CardBody, Row, Col } from 'reactstrap';
import { Trash2 } from 'react-feather';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { GrayBorderContainer } from '../styled';
import theme from '../../configs/themeVariables';

const ListingTeamMembersModal = ({ modal, toggleModal, toggleSendInvitationModal }) => {
  const onInviteTeamMemberClick = () => {
    toggleModal();
    toggleSendInvitationModal(true);
  };

  return (
    <Modal isOpen={modal} contentClassName="listing-team-members-modal-style" className="modal-dialog-centered">
      <div className="gray-modal">
        <ModalHeader toggle={toggleModal} />
        <ModalBody className="p-0">
          <GrayBorderContainer className="d-flex justify-content-between px-2 py-1">
            <h3 className="font-medium-4">Team Member</h3>
            <Button color="primary" onClick={onInviteTeamMemberClick}>
              Invite Team Member
            </Button>
          </GrayBorderContainer>
          <div className="p-2">
            <Card>
              <CardBody className="py-1">
                <Row className="d-flex align-items-center">
                  <Col sm="12" md="3" lg="4">
                    <div className="d-flex align-items-center">
                      <Avatar img={defaultAvatar} imgHeight="38" imgWidth="38" className="me-2 user-pic" />
                      <div>
                        <p className="fw-bolder m-0">Bob Smith</p>
                        <p className="font-small-3 m-0">Frontend Developer</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12" md="3" lg="2">
                    <p className="fw-bold m-0">Team Member</p>
                  </Col>
                  <Col sm="12" md="3" lg="5">
                    <p className="m-0">Accepted on</p>
                    <p className="fw-bold font-medium-2 m-0">Apr 12, 23</p>
                  </Col>
                  <Col sm="12" md="1" lg="1">
                    <div className="d-flex justify-content-end">
                      <Trash2 color={theme.red} className="cursor-pointer" />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="py-1">
                <Row className="d-flex align-items-center">
                  <Col sm="12" md="3" lg="4">
                    <div className="d-flex align-items-center">
                      <Avatar img={defaultAvatar} imgHeight="38" imgWidth="38" className="me-2 user-pic" />
                      <div>
                        <p className="fw-bolder m-0">Bob Smith</p>
                        <p className="font-small-3 m-0">Frontend Developer</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12" md="3" lg="2">
                    <p className="fw-bold m-0">Team Member</p>
                  </Col>
                  <Col sm="12" md="3" lg="5">
                    <p className="m-0">Accepted on</p>
                    <p className="fw-bold font-medium-2 m-0">Apr 12, 23</p>
                  </Col>
                  <Col sm="12" md="1" lg="1">
                    <div className="d-flex justify-content-end">
                      <Trash2 color={theme.red} className="cursor-pointer" />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="py-1">
                <Row className="d-flex align-items-center">
                  <Col sm="12" md="3" lg="4">
                    <div className="d-flex align-items-center">
                      <Avatar img={defaultAvatar} imgHeight="38" imgWidth="38" className="me-2 user-pic" />
                      <div>
                        <p className="fw-bolder m-0">Bob Smith</p>
                        <p className="font-small-3 m-0">Frontend Developer</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12" md="3" lg="2">
                    <p className="fw-bold m-0">Team Member</p>
                  </Col>
                  <Col sm="12" md="3" lg="5">
                    <p className="m-0">Accepted on</p>
                    <p className="fw-bold font-medium-2 m-0">Apr 12, 23</p>
                  </Col>
                  <Col sm="12" md="1" lg="1">
                    <div className="d-flex justify-content-end">
                      <Trash2 color={theme.red} className="cursor-pointer" />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="py-1">
                <Row className="d-flex align-items-center">
                  <Col sm="12" md="3" lg="4">
                    <div className="d-flex align-items-center">
                      <Avatar img={defaultAvatar} imgHeight="38" imgWidth="38" className="me-2 user-pic" />
                      <div>
                        <p className="fw-bolder m-0">Bob Smith</p>
                        <p className="font-small-3 m-0">Frontend Developer</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12" md="3" lg="2">
                    <p className="fw-bold m-0">Team Member</p>
                  </Col>
                  <Col sm="12" md="3" lg="5">
                    <p className="m-0">Accepted on</p>
                    <p className="fw-bold font-medium-2 m-0">Apr 12, 23</p>
                  </Col>
                  <Col sm="12" md="1" lg="1">
                    <div className="d-flex justify-content-end">
                      <Trash2 color={theme.red} className="cursor-pointer" />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="py-1">
                <Row className="d-flex align-items-center">
                  <Col sm="12" md="3" lg="4">
                    <div className="d-flex align-items-center">
                      <Avatar img={defaultAvatar} imgHeight="38" imgWidth="38" className="me-2 user-pic" />
                      <div>
                        <p className="fw-bolder m-0">Bob Smith</p>
                        <p className="font-small-3 m-0">Frontend Developer</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12" md="3" lg="2">
                    <p className="fw-bold m-0">Team Member</p>
                  </Col>
                  <Col sm="12" md="3" lg="5">
                    <p className="m-0">Accepted on</p>
                    <p className="fw-bold font-medium-2 m-0">Apr 12, 23</p>
                  </Col>
                  <Col sm="12" md="1" lg="1">
                    <div className="d-flex justify-content-end">
                      <Trash2 color={theme.red} className="cursor-pointer" />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default ListingTeamMembersModal;

ListingTeamMembersModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  toggleSendInvitationModal: Proptypes.func,
};

ListingTeamMembersModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  toggleSendInvitationModal: () => {},
};
