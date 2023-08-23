import React, { useEffect } from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, Card, CardBody, Row, Col } from 'reactstrap';
import { Trash2 } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import DateTime from '../../lib/date-time';
import { GrayBorderContainer } from '../styled';
import theme from '../../configs/themeVariables';
import { getInvitedMember, getTeamMembers } from '../../redux/actions/dashboardActions';
import { selectGetInvitedMember, selectGetTeamMember } from '../../redux/selectors/dashboardSelectors';
import { selectUserData } from '../../redux/selectors/authSelectors';

const ListingTeamMembersModal = ({ modal, toggleModal, toggleInviteTeamMemberModal, setInviteTalentToTeamModal }) => {
  const dispatch = useDispatch();
  const teamMembers = useSelector(selectGetTeamMember);
  const inviteMembers = useSelector(selectGetInvitedMember);

  const userData = useSelector(selectUserData);
  const onInviteTeamMemberClick = () => {
    toggleModal();
    toggleInviteTeamMemberModal(true);
    setInviteTalentToTeamModal(true);
  };

  useEffect(() => {
    dispatch(getTeamMembers());
    dispatch(getInvitedMember());
  }, []);

  const handleRemoveMember = () => {};

  return (
    <Modal isOpen={modal} contentClassName="listing-team-members-modal-style" className="modal-dialog-centered">
      <div className="gray-modal">
        <ModalHeader toggle={toggleModal} />
        <ModalBody className="p-0">
          <div style={{ minHeight: '35rem' }}>
            <div>
              <GrayBorderContainer className="d-flex justify-content-between px-2 py-1">
                <h3 className="font-medium-4">Team Member</h3>
                <Button color="primary" onClick={onInviteTeamMemberClick}>
                  Invite Team Member
                </Button>
              </GrayBorderContainer>
              <div className="p-2 mb-2" style={{ maxHeight: '22rem', overflowY: 'auto' }}>
                {teamMembers?.data?.map((item) => (
                  <Card key={item?._id}>
                    <CardBody className="py-1">
                      <Row className="d-flex align-items-center">
                        <Col sm="12" md="3" lg="4">
                          <div className="d-flex align-items-center">
                            <Avatar
                              img={item?.image_uri || defaultAvatar}
                              imgHeight="38"
                              imgWidth="38"
                              className="me-2 user-pic"
                            />
                            <div>
                              <p className="fw-bolder m-0">
                                {item?.first_name} {item?.last_name}
                              </p>
                              <p className="font-small-3 m-0">{item?.role}</p>
                            </div>
                          </div>
                        </Col>
                        <Col sm="12" md="3" lg="2">
                          <p className="fw-bold m-0">Team Member</p>
                        </Col>
                        <Col sm="12" md="3" lg="5">
                          <p className="m-0">Accepted on</p>
                          <p className="fw-bold font-medium-2 m-0">
                            {DateTime.fromMillis(item?.created_at).toFormat('MMM dd, yy') || '-'}
                          </p>
                        </Col>
                        <Col sm="12" md="1" lg="1">
                          {userData?.created_by?.user_id !== item?.user_id && (
                            <div className="d-flex justify-content-end">
                              <Trash2
                                onClick={() => handleRemoveMember(item)}
                                color={theme.red}
                                className="cursor-pointer"
                              />
                            </div>
                          )}
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
            {inviteMembers?.data?.length > 0 && (
              <div>
                <GrayBorderContainer className="d-flex justify-content-between px-2 py-1">
                  <h3 className="font-medium-4">Invite sent</h3>
                </GrayBorderContainer>

                <div className="p-2" style={{ maxHeight: '22rem', overflowY: 'auto' }}>
                  {inviteMembers?.data?.map((item) => (
                    <Card key={item?._id}>
                      <CardBody className="py-1">
                        <Row className="d-flex align-items-center">
                          <Col sm="12" md="3" lg="4">
                            <div className="d-flex align-items-center">
                              <Avatar
                                img={item?.image_uri || defaultAvatar}
                                imgHeight="38"
                                imgWidth="38"
                                className="me-2 user-pic"
                              />
                              <div>
                                <p className="fw-bolder m-0">
                                  {item?.first_name} {item?.last_name}
                                </p>
                                <p className="font-small-3 m-0">{item?.role}</p>
                              </div>
                            </div>
                          </Col>
                          <Col sm="12" md="3" lg="2">
                            <p className="fw-bold m-0">Team Member</p>
                          </Col>
                          <Col sm="12" md="3" lg="5">
                            <p className="m-0">Accepted on</p>
                            <p className="fw-bold font-medium-2 m-0">
                              {DateTime.fromMillis(item?.created_at).toFormat('MMM dd, yy') || '-'}
                            </p>
                          </Col>
                          <Col sm="12" md="1" lg="1">
                            {userData?.created_by?.user_id !== item?.user_id && (
                              <div className="d-flex justify-content-end">
                                <Trash2
                                  onClick={() => handleRemoveMember(item)}
                                  color={theme.red}
                                  className="cursor-pointer"
                                />
                              </div>
                            )}
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            )}
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
  toggleInviteTeamMemberModal: Proptypes.func,
  setInviteTalentToTeamModal: Proptypes.func,
};

ListingTeamMembersModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  toggleInviteTeamMemberModal: () => {},
  setInviteTalentToTeamModal: () => {},
};
