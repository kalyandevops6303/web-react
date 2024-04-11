import { Button, Card, CardBody, CardText, CardTitle, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router';
import Rating from 'react-rating';
import { DateTime } from 'luxon';
import { Mail } from 'react-feather';

import TeamNoDataGif from '@src/assets/images/gifs/team_no_data.gif';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import Avatar from '@components/avatar';
import FilledStar from '@src/assets/images/filler_star.png';
import EmptyStar from '@src/assets/images/empty_star.png';
import { MemberRowWrapper, TeamVieWrapper } from '../style';
import MemberRow from './MemberRow';

import { getInvitedMember, getTeamMembers, getUnassignedRoles } from '../../../redux/actions/projectDetailsAction';
import InviteTalentToTeam from '../../invite-talent-to-team';
import { selectSavedUserData, selectUserData } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import { inviteTalents } from '../../../redux/actions/inviteTalent';
import theme from '../../../configs/themeVariables';
import { getTeamId, returnFormattedRating } from '../../../utility/Utils';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';

const InvitedMemberComponent = () => {
  const inviteMembers = useSelector((state) => state.projectDetails.getInvitedMember);
  const [hasMore, setHasMore] = useState(true);
  const [loadingItems, setLoadingItems] = useState({});
  const param = useParams();

  const dispatch = useDispatch();

  const selectInvitedMembersMetadata = useSelector((state) => state.projectDetails.invitedMemberMetaData);
  const selectInvitedMembercurrentPreview = useSelector((state) => state.projectDetails.invitedMemberCurrentPreview);
  const isClubAdmin = useSelector((state) => state.inviteTalent.isClubAdmin);
  const userDetailsData = useSelector(selectUserData);
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
    dispatch(getInvitedMember({ metadata, project_id: param?.projectId }));
  }, []);

  const fetchMore = () => {
    const newMeteData = {
      ...metadata,
      // eslint-disable-next-line no-unsafe-optional-chaining
      page: selectInvitedMembersMetadata?.current_page + 1 || 1,
    };
    dispatch(getInvitedMember({ metadata: newMeteData, project_id: param?.projectId }));
  };
  const teamId = getTeamId('team_id');

  const handleSendMail = ({ id, role, user_id }) => {
    setLoadingItems((prevLoadingItems) => ({
      ...prevLoadingItems,
      [id]: true,
    }));

    const newPostData = {
      message: '',
      // eslint-disable-next-line no-undef
      requests_to: {
        user_ids: [user_id],
        team_ids: [],
        email_ids: [],
      },
      request_for: {
        project_id: param?.projectId || '',
        team_id: teamId || '',
        role: role || '',
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
        <Card>
          <CardTitle className="main-card-title">Invites Sent</CardTitle>

          <div id="scrollableDivInvitedMemberModal" className="p-2" style={{ maxHeight: '22rem', overflowY: 'auto' }}>
            <InfiniteScroll
              dataLength={inviteMembers?.length}
              next={fetchMore}
              hasMore={hasMore}
              scrollableTarget="scrollableDivInvitedMemberModal"
              loader={<div className="d-flex justify-content-center">Loading...</div>}
            >
              {inviteMembers.map((data) => (
                <Card key={data?.send_to?.user_id}>
                  <CardBody>
                    <section className="d-flex justify-content-between">
                      <div className="d-flex align-items-center gap-1 w-100">
                        <div style={{ flex: '2' }} className="name-info d-flex gap-50 align-items-center">
                          <Avatar img={data?.send_to?.image_uri || defaultAvatar} imgHeight="38" imgWidth="38" />
                          <div className="ms-50">
                            <h6 className="mb-0 fw-bolder">
                              {data?.send_to?.first_name} {data?.send_to?.last_name}
                            </h6>
                          </div>
                        </div>
                        <CardText style={{ flex: '2' }} className="fw-bold m-auto me-4">
                          {data?.request_for?.role || 'Team Member'}
                        </CardText>
                        <div style={{ flex: '2' }} className="me-4">
                          <Rating
                            initialRating={returnFormattedRating(data?.send_to?.rating)}
                            emptySymbol={<img height={20} src={EmptyStar} alt="Empty star" />}
                            fullSymbol={<img height={20} src={FilledStar} alt="Filled star" />}
                            readonly
                          />
                          <CardText className="mt-25 font-small-3 project-count">
                            {data?.send_to?.projects_worked_on_count || 0} Projects
                          </CardText>
                        </div>

                        <div style={{ flex: '2' }} className="me-2">
                          <span className="key">Invited on</span>
                          <CardText className="value">
                            {data?.created_at ? DateTime.fromMillis(data?.created_at).toFormat('MMM dd, yy') : '-'}
                          </CardText>
                        </div>
                        <div style={{ flex: '1' }} className="me-1 d-none">
                          <span className="key">Status</span>
                          <CardText className="value">{data?.status}</CardText>
                        </div>
                      </div>
                      {userDetailsData?.team_type === userTypes.club ? (
                        <div className="d-flex justify-content-center m-auto">
                          {isClubAdmin && (
                            <div className="d-flex justify-content-center m-auto">
                              {loadingItems[data?._id] ? (
                                <div className="d-flex justify-content-center m-auto">
                                  <Spinner size="sm" />
                                </div>
                              ) : (
                                <span
                                  onClick={() =>
                                    handleSendMail({
                                      user_id: data?.send_to?.user_id,
                                      id: data?._id,
                                      role: data?.request_for?.role,
                                    })
                                  }
                                  className="mail-bg cursor-pointer m-auto"
                                >
                                  <Mail size={20} className="mail-icon" color={theme.activeColor} />
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="d-flex justify-content-center m-auto">
                          {loadingItems[data?._id] ? (
                            <div className="d-flex justify-content-center m-auto">
                              <Spinner size="sm" />
                            </div>
                          ) : (
                            <span
                              onClick={() =>
                                handleSendMail({
                                  user_id: data?.send_to?.user_id,
                                  id: data?._id,
                                  role: data?.request_for?.role,
                                })
                              }
                              className="mail-bg cursor-pointer m-auto"
                            >
                              <Mail size={20} className="mail-icon" color={theme.activeColor} />
                            </span>
                          )}
                        </div>
                      )}
                    </section>
                  </CardBody>
                </Card>
              ))}
            </InfiniteScroll>
          </div>
        </Card>
      )}
    </div>
  );
};

const TeamView = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const userData = useSelector(selectUserData);
  const savedUser = useSelector(selectSavedUserData);
  const projectDetailsData = useSelector(projectDetails);
  const teamMembers = useSelector((state) => state.projectDetails.getTeamMember);
  const unassigned = useSelector((state) => state.projectDetails.unassignedRole);
  const isTeamLoading = useSelector((state) => state.projectDetails.getTeamMemberLoading);
  const isUnassignLoading = useSelector((state) => state.projectDetails.getUnassignedRoleLoading);
  const isClubAdmin = useSelector((state) => state.inviteTalent.isClubAdmin);
  const metadata = { page: 1, page_size: 10 };

  useEffect(() => {
    dispatch(getTeamMembers({ project_id: params.projectId }));
    if (userData?.user_type === userTypes.team) {
      dispatch(getUnassignedRoles({ project_id: params.projectId }));
    }
  }, []);

  const [inviteModal, setInviteModal] = useState(false);
  const [inviteRole, setInviteRole] = useState(false);
  const [inviteTalentToTeamModal, setInviteTalentToTeamModal] = useState(null);

  const handleAssign = (data) => {
    setInviteModal(true);
    setInviteTalentToTeamModal(true);
    setInviteRole(data?.role);
  };

  const toggleModal = () => {
    setInviteModal(!inviteModal);
  };
  const doesObjectExist = (array, idToCheck) => array?.some((obj) => obj.user_id === idToCheck);
  const hasDeleleteAccess = doesObjectExist(teamMembers, savedUser?._id);
  if (isTeamLoading || isUnassignLoading) {
    return <ComponentSpinner />;
  }

  const modalTextForClubView = {
    heading: 'Invite Member',
    subHeading: `Invite talent to work on this project ${inviteRole ? `as a ${inviteRole}` : ''}`,
    desc: 'If a talent is not already part of your team, they will need to join before they can be added to the project',
  };

  const onInviteSucess = () => {
    dispatch(getInvitedMember({ metadata, project_id: params?.projectId }));
  };
  return (
    <TeamVieWrapper>
      <Card>
        <CardTitle className="main-card-title">Project Team</CardTitle>
        <CardBody className="main-card-body">
          {teamMembers?.length > 0 ? (
            teamMembers?.map((item) => (
              <MemberRow
                teamMembersCount={teamMembers?.length}
                hasDeleleteAccess={hasDeleleteAccess}
                data={item}
                key={item.user_id}
                withReview={false}
              />
            ))
          ) : (
            <>
              <img src={TeamNoDataGif} width={230} height={170} className="d-flex empty-gif m-auto" alt="empty-gif" />
              <div className="font-weig ht-normal text-center text-primary project-cta mt-25 cursor-pointer">
                No team members found
              </div>
            </>
          )}
        </CardBody>
      </Card>

      {userData?.user_type === userTypes.team && unassigned?.length > 0 && (
        <Card>
          <CardTitle className="main-card-title">Add Team Member</CardTitle>
          <CardBody className="main-card-body">
            <MemberRowWrapper>
              {unassigned?.map((item) => (
                <Card key={item?.user_id}>
                  <CardBody>
                    <div className="d-flex align-items-center justify-content-between  gap-1">
                      <CardText className="d-flex gap-25 fw-bold me-4 mt-auto mb-auto">
                        {item?.role} <span className="indicator" />
                      </CardText>

                      <div className="d-flex gap-3">
                        <Button
                          onClick={() => handleAssign({ role: item?.role })}
                          color="primary"
                          type="secondary"
                          outline
                          disabled={userData?.team_type === userTypes.club && !isClubAdmin}
                        >
                          Assign team member
                        </Button>
                        <div
                          className={`${item?.number_of_weeks > 0 || item?.hours_per_week > 0 ? '' : 'hidden'} d-flex`}
                        >
                          <div className="me-2">
                            <span className="key">Duration</span>
                            <CardText className="value">{item?.number_of_weeks}w</CardText>
                          </div>
                          <div className="me-1">
                            <span className="key">Hours/week</span>
                            <CardText className="value">{item?.hours_per_week}</CardText>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </MemberRowWrapper>
          </CardBody>
        </Card>
      )}
      {(projectDetailsData?.status === 'OPEN' || projectDetailsData?.status === 'IN_REVIEW') && (
        <InvitedMemberComponent />
      )}

      {inviteTalentToTeamModal && (
        <InviteTalentToTeam
          inviteTeamMemberModal={inviteModal}
          toggleInviteTeamMemberModal={toggleModal}
          setInviteTalentToTeamModal={setInviteTalentToTeamModal}
          inviteRole={inviteRole}
          projectId={params.projectId}
          isClubInvitation={userData?.team_type === 'CLUB'}
          text={userData?.team_type === 'CLUB' ? modalTextForClubView : null}
          isClubView={userData?.team_type === 'CLUB'}
          onInviteSucess={onInviteSucess}
        />
      )}
    </TeamVieWrapper>
  );
};
export default TeamView;
