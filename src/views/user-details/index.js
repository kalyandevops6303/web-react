import { Briefcase, Calendar, Check } from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import MoneyIcon from '@src/assets/images/money.png';
import Statbox from './overview/Statbox';
import round from '../../lib/round';
import LeftSidebarProfile from './overview/LeftSidebarProfile';
import UserBio from './overview/UserBio';
import RecentProjects from './overview/RecentProjects';
import Reviews from './overview/Reviews';
import { getProfile, getPublicTeamMembers, getRecentProjects, getReview } from '../../redux/actions/profileActions';
import { selectCurrentProfile, selectError, selectLoading } from '../../redux/selectors/profileSelectors';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import { clearData, makeTeamMemberSuccess } from '../../redux/reducers/profile';
import Error from '../Error';
import { userTypes } from '../../utility/constants/Constant';
import {
  selectAuthUserData,
  selectFlexternBoolean,
  selectTrumioIsFlextern,
  selectUserData,
  appPermissionsSelector,
} from '../../redux/selectors/authSelectors';
import AcceptClubInviationModal from '../modals/AcceptClubInviationModal';
import DeclineClubInvitaionModal from '../modals/DeclineClubInvitationModal';
import { getProfilePercentage, getTeamProfilePercentage, updateInvitation } from '../../redux/actions/dashboardActions';
import { getRequestStatusSuccess } from '../../redux/reducers/inviteTalent';
import DetailsHeader from './overview/DetailsHeader';
import DetailsCTAHeader from './overview/DetailsCTAHeader';
import { DetailsHeaderSection, DetailsWrap } from './overview/style';
import PublicTeamMembersListingModal from '../modals/PublicTeamMembersListingModal';
import MembersListingCard from './overview/MembersListingCard';
import AssessedSkills from './overview/AssessedSkills';
import AssessedSkillsTeam from './overview/AssessedSkillsTeam';
import { getProfileCompletionFlextern } from '../../redux/actions/talentOnboardingActions';
import PermissionWrapper from '@/PermissionWrapper';

const UserDetails = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  const userData = useSelector(selectAuthUserData);
  const isFlextern = useSelector((state) => state.auth?.flextern);
  const userDataSelector = useSelector(selectUserData);
  const requestStatusData = useSelector((state) => state.inviteTalent.getRequestStatus);
  const appPermissions = useSelector(appPermissionsSelector);

  const [acceptInvitationModal, setAcceptInvitationModal] = useState(null);
  const [declineInvitationModal, setDeclineInvitationModal] = useState(null);

  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const recentProjectsMetadata = useSelector((state) => state.currentProfile.userRecentProjectMetaData);
  const [publicTeamMembersListingModal, setPublicTeamMembersListingModal] = useState(null);

  const togglePublicTeamMembersListingModal = () => {
    setPublicTeamMembersListingModal(!publicTeamMembersListingModal);
  };

  const isClient = param?.userType.toUpperCase() === userTypes.client;
  const isTalentView = param?.userType.toUpperCase() === userTypes.talent;
  const isTeamView = param?.userType.toUpperCase() === userTypes.team;
  const isClubView = param?.userType.toUpperCase() === userTypes.club;
  const showProfilePercent = param?.userId === userDataSelector?._id;

  const isEditable = userData?._id === param?.userId;

  const queryParams = new URLSearchParams(window.location.search);
  const projectId = queryParams.get('project_id');

  useEffect(() => {
    dispatch(clearData());
    dispatch(getRequestStatusSuccess(null));

    // eslint-disable-next-line no-undef
    window?.scrollTo(0, 0);

    // to fetch entity's profile data
    dispatch(
      getProfile({
        id: param?.userId,
        user_type: param?.userType === 'CLUB' ? 'TEAM' : param?.userType.toUpperCase(),
        isEditable,
        currentUserType: userData?.user_type,
        projectId: projectId || undefined,
      }),
    );

    // to fetch entity's recent projects data
    dispatch(
      getRecentProjects({
        user_id: param?.userId,
        entity: param?.userType === 'CLUB' ? 'TEAM' : param?.userType.toUpperCase(),
        metadata: { page: 1, page_size: 10 },
      }),
    );

    // to fetch entity's reviews data
    dispatch(
      getReview({
        user_id: param?.userId,
        entity: param?.userType === 'CLUB' ? 'TEAM' : param?.userType.toUpperCase(),
        metadata: { page: 1, page_size: 10 },
      }),
    );
    // to fetch entity's profile percentage data if showProfilePercent is true
    if (showProfilePercent) {
      if (isTalentView || isClient) {
        if (isFlextern) {
          dispatch(getProfileCompletionFlextern());
        } else {
          dispatch(getProfilePercentage());
        }
      }
      if (isTeamView || isClubView) {
        dispatch(getTeamProfilePercentage());
      }
    }

    // to fetch TEAM/CLUB members list data
    if (isTeamView || isClubView) {
      dispatch(getPublicTeamMembers({ teamId: param?.userId, page: 1, pageSize: 10, oldData: [] }));
    }
  }, []);

  const currentProfile = useSelector(selectCurrentProfile);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const calculateAvailableHoursPerWeek = (availability) => {
    // Calculate weekday hours per week
    let weekdayHoursPerWeek = 0;
    let weekendHoursPerWeek = 0;

    if (availability?.weekdays_avl?.days) {
      const weekdayStartTime = parseInt(availability?.weekdays_avl?.start_time, 10);
      const weekdayEndTime = parseInt(availability?.weekdays_avl?.end_time, 10);
      const weekdayDurationPerDay = weekdayEndTime - weekdayStartTime;
      const weekdaysPerWeek = availability?.weekdays_avl?.days?.length;
      weekdayHoursPerWeek = weekdayDurationPerDay * weekdaysPerWeek;
    }

    // Check if weekends_avl property exists
    if (availability?.weekends_avl?.days) {
      const weekendStartTime = parseInt(availability.weekends_avl.start_time, 10);
      const weekendEndTime = parseInt(availability.weekends_avl.end_time, 10);
      const weekendDurationPerDay = weekendEndTime - weekendStartTime;
      const weekendsPerWeek = availability?.weekends_avl?.days.length;
      weekendHoursPerWeek = weekendDurationPerDay * weekendsPerWeek;
    }

    const totalHoursPerWeek = weekdayHoursPerWeek + weekendHoursPerWeek;
    return totalHoursPerWeek;
  };

  const calculateYearsFromMonths = (totalMonths) => {
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const combined = `${years}y ${months}m`;
    return combined;
  };

  const toggleAcceptInvitationModal = () => {
    setAcceptInvitationModal(!acceptInvitationModal);
  };

  const toggleDeclineInvitaionModal = () => {
    setDeclineInvitationModal(!declineInvitationModal);
  };

  const onAccept = () => {
    const postData = {
      action: 'ACCEPT',
      request_id: requestStatusData._id,
    };
    setIsStatusUpdating(true);
    dispatch(
      updateInvitation({
        data: postData,
        onSuccess: () => {
          setIsStatusUpdating(false);
          setAcceptInvitationModal(false);
          dispatch(getRequestStatusSuccess(null));
          dispatch(makeTeamMemberSuccess());
        },
        onError: () => {
          setIsStatusUpdating(false);
        },
      }),
    );
  };

  const onDecline = () => {
    const postData = {
      action: 'REJECT',
      request_id: requestStatusData._id,
    };
    setIsStatusUpdating(true);
    dispatch(
      updateInvitation({
        data: postData,
        onSuccess: () => {
          setIsStatusUpdating(false);
          setDeclineInvitationModal(false);
          dispatch(getRequestStatusSuccess(null));
          dispatch(makeTeamMemberSuccess());
        },
        onError: () => {
          setIsStatusUpdating(false);
        },
      }),
    );
  };

  const handelRedirectToOpenListing = () => {
    navigate(`/marketplace/all_listings`, {
      state: { clientName: `${currentProfile?.first_name} ${currentProfile?.last_name}` },
    });
  };

  if (loading) {
    return <ComponentSpinner />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div>
      <DetailsWrap>
        <DetailsHeader />

        {/* Club code */}
        <div className="d-flex justify-content-between align-items-center">
          {/* <BreadCrumbs data={isOwnProfile ? defaultBreadCrumb : dynamicBreadCrumb} /> */}
          {/* {currentProfile.team_type === 'CLUB' && requestStatusData && (
          <div className="d-flex align-items-center gap-2 mb-2">
            <Button onClick={() => setDeclineInvitationModal(true)} color="flat-danger" className="me-1">
              Decline
            </Button>
            <Button color="primary " onClick={() => setAcceptInvitationModal(true)}>
              Accept
            </Button>
          </div>
        )} */}
        </div>
        <Row className="pt-75">
          <Col lg="3">
            <LeftSidebarProfile
              isTalentView={isTalentView}
              isTeamView={isTeamView || isClubView}
              isClient={isClient}
              data={currentProfile}
              isEditable={userData?._id === param?.userId}
              isClubProfile={currentProfile.team_type === 'CLUB'}
            />
            {(isTeamView || isClubView) && (
              <MembersListingCard
                toggleModal={togglePublicTeamMembersListingModal}
                teamId={param?.userId}
                publicTeamMembersListingModal={publicTeamMembersListingModal}
                isClubView={isClubView}
              />
            )}
          </Col>
          <Col lg="9">
            <DetailsHeaderSection>
              <Row className="pt-3 details-card">
                <DetailsCTAHeader
                  isTalentView={isTalentView}
                  isTeamView={isTeamView || isClubView}
                  isClient={isClient}
                  data={currentProfile}
                  isEditable={userData?._id === param?.userId}
                  isClubProfile={currentProfile.team_type === 'CLUB'}
                />
                {isClient && (
                  <Col lg="3" className="pe-75">
                    <Statbox
                      className="cursor-pointer"
                      onClick={handelRedirectToOpenListing}
                      elevate={false}
                      title={currentProfile?.open_listing_count || 0}
                      desc="Open listing(s)"
                      icon={<img src={MoneyIcon} height={22} alt="money" />}
                      color="light-warning"
                    />
                  </Col>
                )}
                <Col lg="3" className="pe-75">
                  <Statbox
                    elevate={false}
                    title={recentProjectsMetadata?.total_records || 0}
                    desc="Completed Project(s)"
                    icon={<Check height={20} />}
                    color="light-success"
                  />
                </Col>
                <PermissionWrapper
                  permissions={appPermissions}
                  permissionName={['DASHBOARD.USER_DETAILS.HOURLY_RATING']}
                >
                  {isTalentView && !currentProfile?.flextern && (
                    <Col lg="3" className="pe-75">
                      <Statbox
                        elevate={false}
                        title={`${currentProfile?.currency_preference?.code || ''} ${currentProfile?.hourly_rate || 0}`}
                        desc="Hourly Rate"
                        icon={<img src={MoneyIcon} height={22} alt="money" />}
                        color="light-warning"
                      />
                    </Col>
                  )}
                </PermissionWrapper>
                <>
                  {isTeamView ||
                    (isClubView && (
                      <Col lg="3" className="pe-75">
                        <Statbox
                          elevate={false}
                          title={`${currentProfile?.total_project_value?.code || ''} ${
                            currentProfile?.total_project_value || 0
                          }`}
                          desc="Total Project Value"
                          icon={<img src={MoneyIcon} height={22} alt="money" />}
                          color="light-warning"
                        />
                      </Col>
                    ))}
                </>
                <PermissionWrapper
                  permissions={appPermissions}
                  permissionName={['DASHBOARD.USER_DETAILS.WORK_EXPERIENCE']}
                >
                  {isTalentView && !currentProfile?.flextern && (
                    <Col lg="3" className="pe-75">
                      <Statbox
                        elevate={false}
                        title={`${calculateYearsFromMonths(currentProfile?.work_experience)}`}
                        desc="Work Experience"
                        icon={<Briefcase height={20} />}
                        color="light-warning"
                      />
                    </Col>
                  )}
                </PermissionWrapper>
                {!currentProfile?.flextern && (
                  <PermissionWrapper
                    permissions={appPermissions}
                    permissionName={['DASHBOARD.USER_DETAILS.AVAILABILITY']}
                  >
                    <Col lg="3" className="pe-75">
                      <Statbox
                        elevate={false}
                        title={
                          <>
                            {calculateAvailableHoursPerWeek(currentProfile?.availability) < 0
                              ? 0
                              : round(calculateAvailableHoursPerWeek(currentProfile?.availability), 2)}{' '}
                            hours/week <br />
                            {currentProfile?.availability?.timezone?.abbreviation}(
                            {currentProfile?.availability?.timezone?.offset_name || 'Time zone'})
                          </>
                        }
                        desc="Availability"
                        icon={<Calendar height={20} />}
                        color="light-primary"
                      />
                    </Col>
                  </PermissionWrapper>
                )}
              </Row>
            </DetailsHeaderSection>

            <Row>
              <UserBio
                data={currentProfile}
                isTalentView={isTalentView}
                isTeamView={isTeamView || isClubView}
                isClient={isClient}
                isEditable={userData?._id === param?.userId}
              />
            </Row>
            <Row>
              <PermissionWrapper
                permissions={appPermissions}
                permissionName={['DASHBOARD.USER_DETAILS.ASSESSED_SKILLS']}
              >
                {isTalentView && !currentProfile?.flextern && <AssessedSkills />}
              </PermissionWrapper>
              {isTeamView && !currentProfile?.flextern && <AssessedSkillsTeam />}
            </Row>
            <Row>
              <RecentProjects isEditable={userData?._id === param?.userId} />
            </Row>
            <Row>
              <Reviews />
            </Row>
          </Col>
        </Row>
        {acceptInvitationModal && (
          <AcceptClubInviationModal
            modal={acceptInvitationModal}
            toggleModal={toggleAcceptInvitationModal}
            description="You’ve accepted club invitation"
            selectedTalents={[currentProfile]}
            onAccept={onAccept}
            onLoading={isStatusUpdating}
          />
        )}

        {declineInvitationModal && (
          <DeclineClubInvitaionModal
            modal={declineInvitationModal}
            toggleModal={toggleDeclineInvitaionModal}
            data={currentProfile}
            onDecline={onDecline}
            onLoading={isStatusUpdating}
          />
        )}
        {publicTeamMembersListingModal && (
          <PublicTeamMembersListingModal
            modal={publicTeamMembersListingModal}
            toggleModal={togglePublicTeamMembersListingModal}
            teamId={param?.userId}
            isClubView={isClubView}
          />
        )}
      </DetailsWrap>
    </div>
  );
};

export default UserDetails;
