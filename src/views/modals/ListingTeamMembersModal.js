import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  Row,
  Col,
  Spinner,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Mail, MoreVertical, Trash2 } from 'react-feather';
import FilledStar from '@src/assets/images/filler_star.png';
import { capitalize } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@components/avatar';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import DateTime from '../../lib/date-time';
import { GrayBorderContainer } from '../styled';
import theme from '../../configs/themeVariables';
import { getInvitedMember, getTeamMembers } from '../../redux/actions/dashboardActions';
import { selectGetInvitedMember, selectGetTeamMember } from '../../redux/selectors/dashboardSelectors';
import { MessageIconWrap } from './style';
import { inviteTalents } from '../../redux/actions/inviteTalent';
import { userTypes } from '../../utility/constants/Constant';
import { selectAuthUserData, selectSavedUserData, selectUserData } from '../../redux/selectors/authSelectors';
import ChangeClubMemberModal from './ChangeClubMemberModal';
import { getTeamId } from '../../utility/Utils';

const ClubDropDownWrapper = styled.div`
  .logout {
    color: ${theme.red};
    padding: 1rem 1.2rem;
    display: block;
  }
  .edit {
    color: ${theme.primary};
    padding: 1rem 1.2rem;
    display: block;
    &:active {
      color: white;
    }
  }
  .dropdown-item {
    width: 100%;
  }
`;

const TeamMembersComponent = ({ onInviteTeamMemberClick, handleRemoveMember, isAdmin }) => {
  const teamMembers = useSelector(selectGetTeamMember);
  const userDetailsData = useSelector(selectAuthUserData);
  const savedUserData = useSelector(selectSavedUserData);
  const [hasMore, setHasMore] = useState(true);
  const [changeMemberModal, setChangeMemberModal] = useState(false);
  const [memberType, setMemberType] = useState(null);
  const dispatch = useDispatch();
  const selectTeamMembersMetadata = useSelector((state) => state.dashboard.getMemberMetaData);
  const selectTeamMembercurrentPreview = useSelector((state) => state.dashboard.memberCurrentPreview);
  const metadata = { page: 1, page_size: 10 };

  const isClubView = userDetailsData?.team_type === userTypes.club;

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

  const handleChangeMember = (item) => {
    setChangeMemberModal(true);
    setMemberType(item);
  };

  const toggleChangeMember = () => {
    setChangeMemberModal(!changeMemberModal);
  };

  return (
    <div>
      {changeMemberModal && (
        <ChangeClubMemberModal modal={changeMemberModal} toggleModal={toggleChangeMember} memberType={memberType} />
      )}
      <GrayBorderContainer className="d-flex justify-content-between px-2 py-1">
        <h3 className="font-medium-4">{isClubView ? 'Club Member' : 'Team Member'}</h3>
        {isClubView && isAdmin && (
          <Button color="primary" onClick={onInviteTeamMemberClick}>
            Invite Member
          </Button>
        )}
        {!isClubView && (
          <Button color="primary" onClick={onInviteTeamMemberClick}>
            Invite Team Member
          </Button>
        )}
      </GrayBorderContainer>
      <div className="p-2 mb-2" id="scrollableDivTeamMemberModal" style={{ maxHeight: '22rem', overflowY: 'auto' }}>
        <InfiniteScroll
          dataLength={teamMembers?.length}
          next={fetchMore}
          hasMore={hasMore}
          endMessage={
            <div className="d-flex justify-content-center ">
              {teamMembers?.length === 0 ? <span className="mt-2">No data found!</span> : ''}
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
                    <Link
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      to={`/profile/talent/${item?.user_id}`}
                      target="_blank"
                    >
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
                    </Link>
                  </Col>
                  <Col sm="12" md="3" lg="2">
                    <p className="fw-bold m-0">
                      {isClubView ? (
                        <span className="d-flex align-items-center">
                          {item.member_type === 'ADMIN' && (
                            <img
                              src={FilledStar}
                              alt="Filled star"
                              style={{ width: '12px', height: '12px', marginRight: '5px' }}
                            />
                          )}

                          {capitalize(item.member_type)}
                        </span>
                      ) : (
                        'Team Member'
                      )}
                    </p>
                  </Col>
                  <Col sm="12" md="3" lg="5">
                    <p className="m-0">{item?.is_creator ? 'Created on' : 'Accepted on'}</p>
                    <p className="fw-bold font-medium-2 m-0">
                      {DateTime.fromMillis(item?.created_at).toFormat('MMM dd, yy') || '-'}
                    </p>
                  </Col>
                  {isClubView && isAdmin && teamMembers?.length > 1 && savedUserData._id !== item?.user_id && (
                    <Col sm="12" md="1" lg="1">
                      <ClubDropDownWrapper>
                        <UncontrolledDropdown>
                          <DropdownToggle color="" className="bg-transparent btn-sm border-0 p-50">
                            <MoreVertical size={18} className="cursor-pointer" />
                          </DropdownToggle>
                          <DropdownMenu end>
                            <DropdownItem className="w-100 edit" onClick={() => handleChangeMember(item)}>
                              Change to {item.member_type === 'ADMIN' ? 'member' : 'admin'}
                            </DropdownItem>
                            <DropdownItem className="w-100 logout" onClick={() => handleRemoveMember(item)}>
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </ClubDropDownWrapper>
                    </Col>
                  )}
                  {!isClubView && (
                    <Col sm="12" md="1" lg="1">
                      {teamMembers?.length > 1 && (
                        <div className="d-flex justify-content-end">
                          <Trash2
                            onClick={() => handleRemoveMember(item)}
                            color={theme.red}
                            className="cursor-pointer"
                          />
                        </div>
                      )}
                    </Col>
                  )}
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
  isAdmin: Proptypes.bool,
};
TeamMembersComponent.defaultProps = {
  onInviteTeamMemberClick: () => {},
  handleRemoveMember: () => {},
  isAdmin: false,
};

const InvitedMemberComponent = ({ isAdmin }) => {
  const inviteMembers = useSelector(selectGetInvitedMember);
  const [hasMore, setHasMore] = useState(true);
  const [loadingItems, setLoadingItems] = useState({});

  const dispatch = useDispatch();

  const selectInvitedMembersMetadata = useSelector((state) => state.dashboard.invitedMemberMetaData);
  const selectInvitedMembercurrentPreview = useSelector((state) => state.dashboard.invitedMemberCurrentPreview);
  const userDetailsData = useSelector(selectUserData);

  const isClubView = userDetailsData?.team_type === userTypes.club;

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
  const teamId = getTeamId('team_id');

  const handleSendMail = ({ id }) => {
    setLoadingItems((prevLoadingItems) => ({
      ...prevLoadingItems,
      [id]: true,
    }));

    const newPostData = {
      message: '',
      // eslint-disable-next-line no-undef
      requests_to: {
        user_ids: [id],
        team_ids: [],
        email_ids: [],
      },
      request_for: {
        project_id: '',
        team_id: teamId || '',
        role: '',
      },
    };
    const onSuccess = () => {
      setLoadingItems((prevLoadingItems) => ({
        ...prevLoadingItems,
        [id]: false, // Set the loading state back to false
      }));
    };
    const onError = () => {
      setLoadingItems((prevLoadingItems) => ({
        ...prevLoadingItems,
        [id]: false, // Set the loading state back to false
      }));
    };

    dispatch(inviteTalents({ data: newPostData, onSuccess, onError }));
  };
  return (
    <div>
      {inviteMembers?.length > 0 && (
        <div>
          <GrayBorderContainer className="d-flex justify-content-between px-2 py-1">
            <h3 className="font-medium-4">Invites Sent</h3>
          </GrayBorderContainer>

          <div id="scrollableDivInvitedMemberModal" className="p-2" style={{ maxHeight: '22rem', overflowY: 'auto' }}>
            <InfiniteScroll
              dataLength={inviteMembers?.length}
              next={fetchMore}
              hasMore={hasMore}
              endMessage={
                <div className="d-flex justify-content-center ">
                  {inviteMembers?.length > 0 ? <span className="mt-2">No data found!</span> : ''}
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
                              {item?.first_name} {item?.last_name} {item?.user_status === "UNREGISTERED" ?  item?.user_email : ''}
                            </p>
                            <p className="font-small-3 m-0">{item?.role?.name}</p>
                          </div>
                        </div>
                      </Col>
                      <Col sm="12" md="3" lg="2">
                        <p className="fw-bold m-0">{isClubView ? capitalize(item?.member_type) : 'Team Member'}</p>
                      </Col>
                      <Col sm="12" md="3" lg="3">
                        <p className="m-0">Invited on</p>
                        <p className="fw-bold font-medium-2 m-0">
                          {DateTime.fromMillis(item?.invited_on).toFormat('MMM dd, yy') || '-'}
                        </p>
                      </Col>
                      <Col sm="12" md="3" lg="2">
                        <p className="fw-bold m-0">{item?.status && capitalize(item?.status)}</p>
                      </Col>

                      {(!isClubView || (isClubView && isAdmin)) && (
                        <Col sm="12" md="1" lg="1">
                          {loadingItems[item?._id] ? (
                            <div className="d-flex justify-content-center">
                              <Spinner size="sm" />
                            </div>
                          ) : (
                            <MessageIconWrap onClick={() => handleSendMail({ id: item?._id })}>
                              <span className="mail-bg">
                                <Mail size={20} className="mail-icon" color={theme.activeColor} />
                              </span>
                            </MessageIconWrap>
                          )}
                        </Col>
                      )}
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

InvitedMemberComponent.propTypes = {
  isAdmin: Proptypes.bool,
};
InvitedMemberComponent.defaultProps = {
  isAdmin: false,
};

const ListingTeamMembersModal = ({
  modal,
  toggleModal,
  onRemove,
  toggleInviteTeamMemberModal,
  setInviteTalentToTeamModal,
  isAdmin,
  onClubInvite,
}) => {
  const onInviteTeamMemberClick = () => {
    if (isAdmin) {
      onClubInvite();
    } else {
      toggleModal();
      toggleInviteTeamMemberModal(true);
      setInviteTalentToTeamModal(true);
    }
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
                isAdmin={isAdmin}
              />
              <InvitedMemberComponent isAdmin={isAdmin} />
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
  isAdmin: Proptypes.bool,
  toggleModal: Proptypes.func,
  toggleInviteTeamMemberModal: Proptypes.func,
  setInviteTalentToTeamModal: Proptypes.func,
  onRemove: Proptypes.func,
  onClubInvite: Proptypes.func,
};

ListingTeamMembersModal.defaultProps = {
  modal: false,
  isAdmin: false,
  toggleModal: () => {},
  toggleInviteTeamMemberModal: () => {},
  setInviteTalentToTeamModal: () => {},
  onRemove: () => {},
  onClubInvite: () => {},
};
