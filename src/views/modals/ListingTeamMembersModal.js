import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, Card, CardBody, Row, Col } from 'reactstrap';
import { Mail, Trash2 } from 'react-feather';
import { capitalize } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@components/avatar';
import InfiniteScroll from 'react-infinite-scroll-component';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import DateTime from '../../lib/date-time';
import { GrayBorderContainer } from '../styled';
import theme from '../../configs/themeVariables';
import { getInvitedMember, getTeamMembers } from '../../redux/actions/dashboardActions';
import { selectGetInvitedMember, selectGetTeamMember } from '../../redux/selectors/dashboardSelectors';
import { selectUserData } from '../../redux/selectors/authSelectors';
import { MessageIconWrap } from './style';

const TeamMembersComponent = ({ onInviteTeamMemberClick, handleRemoveMember }) => {
  const teamMembers = useSelector(selectGetTeamMember);
  const userData = useSelector(selectUserData);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();
  const selectTeamMembersMetadata = useSelector((state) => state.dashboard.getMemberMetaData);
  const selectTeamMembercurrentPreview = useSelector((state) => state.dashboard.memberCurrentPreview);
  const metadata = { page: 1, page_size: 10 };

  useEffect(() => {
    setHasMore(true);
    if (
      selectTeamMembercurrentPreview?.length === 0 ||
      teamMembers?.length === selectTeamMembersMetadata?.total_records
    ) {
      setHasMore(false);
    }
  }, [selectTeamMembercurrentPreview]);

  useEffect(() => {
    dispatch(getTeamMembers({ metadata }));
  }, []);

  const fetchMore = () => {
    const newMeteData = {
      ...metadata,
      // eslint-disable-next-line no-unsafe-optional-chaining
      page: selectTeamMembersMetadata?.current_page + 1 || 1,
    };
    dispatch(getTeamMembers({ metadata: newMeteData }));
  };

  return (
    <div>
      <GrayBorderContainer className="d-flex justify-content-between px-2 py-1">
        <h3 className="font-medium-4">Team Member</h3>
        <Button color="primary" onClick={onInviteTeamMemberClick}>
          Invite Team Member
        </Button>
      </GrayBorderContainer>
      <div className="p-2 mb-2" id="scrollableDivTeamMemberModal" style={{ maxHeight: '22rem', overflowY: 'auto' }}>
        <InfiniteScroll
          dataLength={teamMembers?.length}
          next={fetchMore}
          hasMore={hasMore}
          endMessage={
            <div className="d-flex justify-content-center ">
              {teamMembers?.length > 0 ? (
                <span className="mt-2">You have seen it all!</span>
              ) : (
                <span className="mt-2">No data found!</span>
              )}
            </div>
          }
          scrollableTarget="scrollableDivTeamMemberModal"
          loader={<div className="d-flex justify-content-center">Loading...</div>}
        >
          {teamMembers?.map((item) => (
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
                        <p className="font-small-3 m-0">{item?.role?.name}</p>
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
                        <Trash2 onClick={() => handleRemoveMember(item)} color={theme.red} className="cursor-pointer" />
                      </div>
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};
TeamMembersComponent.propTypes = {
  onInviteTeamMemberClick: Proptypes.func,
  handleRemoveMember: Proptypes.func,
};
TeamMembersComponent.defaultProps = {
  onInviteTeamMemberClick: () => {},
  handleRemoveMember: () => {},
};

const InvitedMemberComponent = () => {
  const inviteMembers = useSelector(selectGetInvitedMember);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();
  const selectInvitedMembersMetadata = useSelector((state) => state.dashboard.invitedMemberMetaData);
  const selectInvitedMembercurrentPreview = useSelector((state) => state.dashboard.invitedMemberCurrentPreview);
  const metadata = { page: 1, page_size: 10 };

  useEffect(() => {
    setHasMore(true);
    if (
      selectInvitedMembercurrentPreview?.length === 0 ||
      inviteMembers?.length === selectInvitedMembersMetadata?.total_records
    ) {
      setHasMore(false);
    }
  }, [selectInvitedMembercurrentPreview]);

  useEffect(() => {
    dispatch(getInvitedMember({ metadata }));
  }, []);

  const fetchMore = () => {
    const newMeteData = {
      ...metadata,
      // eslint-disable-next-line no-unsafe-optional-chaining
      page: selectInvitedMembersMetadata?.current_page + 1 || 1,
    };
    dispatch(getInvitedMember({ metadata: newMeteData }));
  };
  return (
    <div>
      {inviteMembers?.length > 0 && (
        <div>
          <GrayBorderContainer className="d-flex justify-content-between px-2 py-1">
            <h3 className="font-medium-4">Invite sent</h3>
          </GrayBorderContainer>

          <div id="scrollableDivInvitedMemberModal" className="p-2" style={{ maxHeight: '22rem', overflowY: 'auto' }}>
            <InfiniteScroll
              dataLength={inviteMembers?.length}
              next={fetchMore}
              hasMore={hasMore}
              endMessage={
                <div className="d-flex justify-content-center ">
                  {inviteMembers?.length > 0 ? (
                    <span className="mt-2">You have seen it all!</span>
                  ) : (
                    <span className="mt-2">No data found!</span>
                  )}
                </div>
              }
              scrollableTarget="scrollableDivInvitedMemberModal"
              loader={<div className="d-flex justify-content-center">Loading...</div>}
            >
              {inviteMembers?.map((item) => (
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
                            <p className="font-small-3 m-0">{item?.role?.name}</p>
                          </div>
                        </div>
                      </Col>
                      <Col sm="12" md="3" lg="2">
                        <p className="fw-bold m-0">Team Member</p>
                      </Col>
                      <Col sm="12" md="3" lg="3">
                        <p className="m-0">Accepted on</p>
                        <p className="fw-bold font-medium-2 m-0">
                          {DateTime.fromMillis(item?.invited_on).toFormat('MMM dd, yy') || '-'}
                        </p>
                      </Col>
                      <Col sm="12" md="3" lg="2">
                        <p className="fw-bold m-0">{item?.status && capitalize(item?.status)}</p>
                      </Col>

                      <Col sm="12" md="1" lg="1">
                        <MessageIconWrap>
                          <span className="mail-bg">
                            <Mail size={20} className="mail-icon" color={theme.activeColor} />
                          </span>
                        </MessageIconWrap>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              ))}
            </InfiniteScroll>
          </div>
        </div>
      )}
    </div>
  );
};

const ListingTeamMembersModal = ({
  modal,
  toggleModal,
  onRemove,
  toggleInviteTeamMemberModal,
  setInviteTalentToTeamModal,
}) => {
  const onInviteTeamMemberClick = () => {
    toggleModal();
    toggleInviteTeamMemberModal(true);
    setInviteTalentToTeamModal(true);
  };

  const handleRemoveMember = (item) => {
    onRemove(item);
    toggleModal();
  };

  return (
    <div>
      <Modal isOpen={modal} contentClassName="listing-team-members-modal-style" className="modal-dialog-centered">
        <div className="gray-modal">
          <ModalHeader toggle={toggleModal} />
          <ModalBody className="p-0">
            <div style={{ minHeight: '35rem' }}>
              <TeamMembersComponent
                handleRemoveMember={handleRemoveMember}
                onInviteTeamMemberClick={onInviteTeamMemberClick}
              />
              <InvitedMemberComponent />
            </div>
          </ModalBody>
        </div>
      </Modal>
    </div>
  );
};

export default ListingTeamMembersModal;

ListingTeamMembersModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  toggleInviteTeamMemberModal: Proptypes.func,
  setInviteTalentToTeamModal: Proptypes.func,
  onRemove: Proptypes.func,
};

ListingTeamMembersModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  toggleInviteTeamMemberModal: () => {},
  setInviteTalentToTeamModal: () => {},
  onRemove: () => {},
};
