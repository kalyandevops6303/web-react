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
import { selectUserData } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import { getItem } from '../../../utility/localStorageControl';
import { inviteTalents } from '../../../redux/actions/inviteTalent';
import theme from '../../../configs/themeVariables';
import { returnFormattedRating } from '../../../utility/Utils';

const InvitedMemberComponent = () => {
  const inviteMembers = useSelector((state) => state.projectDetails.getInvitedMember);
  const [hasMore, setHasMore] = useState(true);
  const [loadingItems, setLoadingItems] = useState({});
  const param = useParams();

  const dispatch = useDispatch();

  const selectInvitedMembersMetadata = useSelector((state) => state.projectDetails.invitedMemberMetaData);
  const selectInvitedMembercurrentPreview = useSelector((state) => state.projectDetails.invitedMemberCurrentPreview);
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
  const teamId = getItem('team_id');

  const handleSendMail = ({ id, role }) => {
    setLoadingItems((prevLoadingItems) => ({
      ...prevLoadingItems,
      [id]: true,
    }));

    const newPostData = {
      message: '',
      // eslint-disable-next-line no-undef
      redirect_url: `${`${window.location.protocol}//${window.location.host}`}/auth/login`,
      requests_to: {
        user_ids: [id],
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
                <Card key={data?._id}>
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
                          <CardText className="mt-25 font-small-3 project-count">0 Projects</CardText>
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
                      {loadingItems[data?._id] ? (
                        <div className="d-flex justify-content-center">
                          <Spinner size="sm" />
                        </div>
                      ) : (
                        <span
                          onClick={() => handleSendMail({ id: data?._id, role: data?.request_for?.role })}
                          className="mail-bg cursor-pointer"
                        >
                          <Mail size={20} className="mail-icon" color={theme.activeColor} />
                        </span>
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
  const teamMembers = useSelector((state) => state.projectDetails.getTeamMember);
  const unassigned = useSelector((state) => state.projectDetails.unassignedRole);
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
  return (
    <TeamVieWrapper>
      <Card>
        <CardTitle className="main-card-title">Project Team</CardTitle>
        <CardBody className="main-card-body">
          {teamMembers?.length > 0 ? (
            teamMembers?.map((item) => <MemberRow data={item} key={item.user_id} withReview={false} />)
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
      <InvitedMemberComponent />

      {inviteTalentToTeamModal && (
        <InviteTalentToTeam
          inviteTeamMemberModal={inviteModal}
          toggleInviteTeamMemberModal={toggleModal}
          setInviteTalentToTeamModal={setInviteTalentToTeamModal}
          inviteRole={inviteRole}
          projectId={params.projectId}
        />
      )}
    </TeamVieWrapper>
  );
};
export default TeamView;
