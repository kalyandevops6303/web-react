import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router';
import { Badge, Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import MoneyIcon from '@src/assets/images/money.svg';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { Paperclip } from 'react-feather';
import BadgeGroup from '../../../@core/components/badge-group-dynamic-count';
import { LeftSidebarProjectDetailsWrapper } from '../style';
import RatingBadge from '../../../@core/components/rating-group/RatingBadge';
import { CustomBadge } from '../../styled';
import { projectDetails, projectDetailsLoading } from '../../../redux/selectors/projectDetailsSelectors';
import DateTime from '../../../lib/date-time';

import { getProjectDetails } from '../../../redux/actions/projectDetailsAction';
import ShowMoreLess from '../../../@core/components/show-more-less-comp';
import { selectSavedUserData, selectUserData } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import InviteTalentToTeamForProjectDetails from '../../invite-talent-to-team/InviteViewForProjectDetails';
import { clearModalData } from '../../../redux/reducers/createProject';
import DeleteProjectModal from '../../modals/DeleteProjectModal';
import RelistConfirmationModal from '../../modals/RelistConfirmationModal';
import RelistListingDetailsModal from '../../modals/RelistListingDetailsModal';
import RelistSuccessModal from '../../modals/RelistSuccessModal';
import ViewFilesModal from '../../modals/ViewFilesModal';
import { convertUnixTimestampToDate } from '../../../utility/Utils';
import WithdrawModal from '../../modals/WithdrawModal';

const displaySecondaryStatusTextOnSideBar = (projectDetailsData, statusEnum, statusDisplay, savedUserData) => {
  // checking whether the project has secondary status or not
  // const secondary_status_text = projectDetailsData?.secondary_status
  //   ? projectDetailsData?.secondary_status[localStorage.getItem('user_id')]?.next
  //   : projectDetailsData?.status;
  let secondary_status_text;
  if (savedUserData?.user_type === 'CLIENT') {
    secondary_status_text = projectDetailsData?.secondary_status
      ? projectDetailsData?.secondary_status[savedUserData.client_info.org_slug_id]?.next
      : projectDetailsData?.status;
  } else if (savedUserData?.user_type === 'TALENT') {
    secondary_status_text = projectDetailsData?.secondary_status
      ? projectDetailsData?.secondary_status[localStorage.getItem('user_id')]?.next
      : projectDetailsData?.status;
  }

  // checking whether the secondary status is present in the statusEnum or not
  if (Object.keys(statusDisplay)?.includes(secondary_status_text)) {
    return statusDisplay[secondary_status_text].state;
  }
  if (Object.keys(statusEnum)?.includes(secondary_status_text)) {
    return statusEnum[secondary_status_text];
  }
  return secondary_status_text;
};

const LeftSidebarProjectDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const userData = useSelector(selectUserData);
  const invitedByData = useSelector((state) => state.projectDetails.invitedBy);
  const [inviteModal, setInviteModal] = useState(false);
  const [inviteTalentToTeamModal, setInviteTalentToTeamModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState(null);

  const [relistConfirmationModal, setRelistConfirmationModal] = useState(null);
  const [relistListingDetailsModal, setRelistListingDetailsModal] = useState(null);
  const [relistSuccessModal, setRelistSuccessModal] = useState(null);
  const [projectRelistData, setProjectRelistData] = useState(null);
  const [viewFilesModal, setViewFilesModal] = useState(null);
  const [confirmWithdrawModal, setConfirmWithdrawModal] = useState(false);
  const savedUserData = useSelector(selectSavedUserData);
  const toggleViewFilesModal = () => {
    setViewFilesModal(!viewFilesModal);
  };

  const toggleModal = () => {
    setInviteModal(!inviteModal);
    dispatch(clearModalData());
  };

  const toggleRelistConfirmationModal = () => setRelistConfirmationModal(!relistConfirmationModal);

  const toggleRelistListingDetailsModal = () => setRelistListingDetailsModal(!relistListingDetailsModal);

  const toggleRelistSuccessModal = () => setRelistSuccessModal(!relistSuccessModal);

  const projectDetailsData = useSelector(projectDetails);
  // const {secondary_status} = projectDetailsData;

  const statusEnum = {
    OPEN: 'Open',
    TO_BE_LISTED: 'To Be Listed',
    IN_REVIEW: 'In Review',
    TERMINATED: 'Terminated',
    CLOSED: 'Closed',
    LISTING_EXPIRED: 'Expired',
    ON_GOING: 'On Going',
    COMPLETED: 'COMPLETED',
    ACTIVE: 'Active',
    BID_SUBMITTED: 'Bid Submitted',
    BID_IN_REVIEW: 'Bid In Review',
    BID_ACCEPTED: 'Bid Accepted',
    BID_CHANGE_REQUEST: 'Change Request',
    SIGN_CONTRACT: 'Sign Contract',
    SIGN_NDA: 'Sign NDA',
    PAYMENT_PENDING: 'Payment Pending',
    WITHDRAWN: 'Withdrawn',
    DISPUTED: 'Disputed',
    SIGN_REQUESTED: 'Sign Requested',
    NOT_FUNDED: 'Not Funded',
    INITIATE_FUND: 'Initiate Fund',
  };
  const statusDisplay = {
    ACTIVE: {
      state: 'Sign Contract',
      bgcolor: 'light-blue',
      text: 'light-blue',
    },
    ON_GOING: {
      state: 'Milestone 1',
      bgcolor: 'warning',
      text: 'warning',
    },
    TO_BE_LISTED: {
      state: 'To Be Listed',
      bgcolor: 'light-blue',
      text: 'light-blue',
    },
    LISTING_EXPIRED: {
      state: 'In Review',
      bgcolor: 'warning',
      text: 'danger',
    },
    WITHDRAWN: {
      state: 'In Review',
      bgcolor: 'warning',
      text: 'danger',
    },
    TERMINATED: {
      state: 'Ternminated',
      bgcolor: 'light-blue',
      text: 'light-blue',
    },
    COMPLETED: {
      state: 'COMPLETED',
      bgcolor: 'light-blue',
      text: 'dark-blue',
    },
    ON_HOLD: {
      state: 'COMPLETED',
      bgcolor: 'success',
      text: 'success',
    },
    DISPUTED: {
      state: 'Disputed',
      bgcolor: 'DISPUTED',
      text: 'Disputed',
    },
  };

  const entityTextEnum = {
    TALENT: 'Talent',
    TEAM: 'Team',
    CLUB: 'Club',
    CLIENT: 'Client',
  };
  const isLoading = useSelector(projectDetailsLoading);
  const isBidView = location.pathname.startsWith('/project-details/') && location.pathname.endsWith('/bid');

  useEffect(() => {
    dispatch(getProjectDetails({ projectId: params.projectId, isBidView }));
  }, []);

  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    if (projectDetailsData) {
      setDaysLeft(
        Math.max(
          0,
          Math.ceil(
            DateTime.fromFormat(projectDetailsData?.listing_details?.end_date, 'dd-MM-yyyy').diff(
              DateTime.now(),
              'days',
            ).days,
          ),
        ),
      );

      setProjectRelistData({
        id: projectDetailsData?._id,
        name: projectDetailsData?.details?.name,
      });
    }
  }, [projectDetailsData]);

  if (isLoading) {
    return <div className="d-none">Loading</div>;
  }

  const handleInvite = () => {
    setInviteModal(true);
    setInviteTalentToTeamModal(true);
  };
  const handleWithdraw = () => {
    setConfirmWithdrawModal(true);
  };

  const handleReList = () => {
    setRelistConfirmationModal(true);
  };

  const onMessageClick = () => {
    navigate(`/chat`, {
      state: { targetId: params?.projectId, targetType: 'group' },
    });
  };

  const handleDelete = () => {
    setDeleteModal(true);
    setDeleteModalData(projectDetailsData);
  };

  const onMessageClientClick = () => {
    navigate(`/chat`, {
      state: { targetId: projectDetailsData?.client_details?.user_id },
    });
  };
  return (
    <LeftSidebarProjectDetailsWrapper>
      {viewFilesModal && (
        <ViewFilesModal
          modal={viewFilesModal}
          toggleModal={toggleViewFilesModal}
          modalTitle="Project Requirements Documents"
          documents={projectDetailsData?.details?.documents}
        />
      )}
      {deleteModal && (
        <DeleteProjectModal
          modal={deleteModal}
          toggleModal={() => setDeleteModal(!deleteModal)}
          data={deleteModalData}
          workers={projectDetailsData?.worker_details}
        />
      )}
      {relistConfirmationModal && (
        <RelistConfirmationModal
          modal={relistConfirmationModal}
          toggleModal={toggleRelistConfirmationModal}
          setRelistListingDetailsModal={setRelistListingDetailsModal}
        />
      )}
      {relistListingDetailsModal && (
        <RelistListingDetailsModal
          modal={relistListingDetailsModal}
          toggleModal={toggleRelistListingDetailsModal}
          setRelistConfirmationModal={setRelistConfirmationModal}
          setRelistSuccessModal={setRelistSuccessModal}
          projectRelistData={projectRelistData}
          setProjectRelistData={setProjectRelistData}
        />
      )}
      {relistSuccessModal && (
        <RelistSuccessModal
          modal={relistSuccessModal}
          toggleModal={toggleRelistSuccessModal}
          projectRelistData={projectRelistData}
        />
      )}
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between status-head">
            <CustomBadge bordered>
              <Badge className={`${projectDetailsData?.status}`} color="badge">
                {statusEnum[projectDetailsData?.status]}
              </Badge>
            </CustomBadge>

            {projectDetailsData?.status === 'OPEN' && (
              <CardText className="fw-bold days d-none">
                {daysLeft === 0 ? 'Listing Expired' : `${daysLeft} Days left`}
              </CardText>
            )}
          </div>
          <CardTitle className="title">{projectDetailsData?.details?.name}</CardTitle>
          {projectDetailsData?.worker_details?.entity_type && userData?.user_type === userTypes.client ? (
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center">
                <Avatar
                  img={
                    // eslint-disable-next-line no-nested-ternary
                    projectDetailsData?.worker_details?.entity_type === userTypes.talent
                      ? projectDetailsData?.worker_details?.image_uri || defaultAvatar
                      : projectDetailsData?.worker_details?.entity_type === userTypes.team
                      ? projectDetailsData?.worker_details?.team_logo || defaultAvatar
                      : defaultAvatar
                  }
                  imgHeight="35"
                  imgWidth="35"
                  className="project-details-card-photo me-1 mt-50"
                />
                <CardText className="mb-0 ms-25">
                  {projectDetailsData?.worker_details?.entity_type === userTypes.talent
                    ? `${projectDetailsData?.worker_details?.first_name} 
                    ${projectDetailsData?.worker_details?.last_name}`
                    : projectDetailsData?.worker_details?.name}
                </CardText>
              </div>

              <div
                className="d-flex flex-wrap  align-items-center"
                style={{
                  marginTop: '5px',
                  gap: '5px',
                }}
              >
                {projectDetailsData?.worker_details?.entity_type === userTypes.team ||
                projectDetailsData?.worker_details?.entity_type === userTypes.club ? (
                  <CustomBadge className="">
                    <Badge className={`${userTypes.team} rounded-corner`} color="badge">
                      {entityTextEnum[projectDetailsData?.worker_details?.entity_type]}
                    </Badge>
                  </CustomBadge>
                ) : null}
                <RatingBadge number={projectDetailsData?.worker_details?.rating || 0} />
                <CardText className="ps-75 font-small-2 fw-300 rating-label">
                  {projectDetailsData?.worker_details?.projects_worked_on_count || 0} Projects
                </CardText>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center">
                <Avatar
                  img={
                    projectDetailsData?.client_details?.company_logo?.length > 0
                      ? projectDetailsData?.client_details?.company_logo
                      : defaultAvatar
                  }
                  imgHeight="35"
                  imgWidth="35"
                  className="project-details-card-photo me-1 mt-50"
                />
                <div>
                  <CardText className="mb-0 ms-25">{projectDetailsData?.client_details?.company_name}</CardText>
                  <CardText className="mb-0 ms-25">
                    {projectDetailsData?.client_delegate
                      ? `${
                          `${projectDetailsData?.client_delegate?.first_name 
                          } ${ 
                          projectDetailsData?.client_delegate?.last_name}`
                        } (${
                          `${projectDetailsData?.client_details?.first_name 
                          } ${ 
                          projectDetailsData?.client_details?.last_name}`
                        })`
                      : `${
                          `${projectDetailsData?.client_details?.first_name 
                          } ${ 
                          projectDetailsData?.client_details?.last_name}`
                        }`}
                  </CardText>
                </div>
              </div>

              <div
                className="d-flex flex-wrap align-items-center"
                style={{
                  marginTop: '5px',
                  gap: '5px',
                }}
              >
                <CustomBadge>
                  <Badge className={userTypes.client} color="badge">
                    {entityTextEnum[userTypes.client]}
                  </Badge>
                </CustomBadge>
                <RatingBadge number={projectDetailsData?.client_details?.rating || 0} />
                <CardText className="ps-75 font-small-2 fw-300 rating-label">
                  {projectDetailsData?.client_details?.projects_listed_count || 0} Projects
                </CardText>
              </div>
            </div>
          )}
          {/* <div className="d-flex">
            <Avatar
              img={
                projectDetailsData?.client_details?.company_logo?.length > 0
                  ? projectDetailsData?.client_details?.company_logo
                  : defaultAvatar
              }
              imgHeight="35"
              imgWidth="35"
              className="project-details-card-photo me-1 mt-50"
            />
            <div>
              <CardText className="mb-0 ms-25">{projectDetailsData?.client_details?.company_name}</CardText>
              <div className="d-flex flex-wrap">
                <RatingBadge number={returnFormattedRating(projectDetailsData?.client_details?.rating) || 0} />
                <CardText className="ps-75 font-small-2 fw-300 rating-label">
                  {projectDetailsData?.client_details?.projects_listed_count || 0} Projects
                </CardText>
              </div>
            </div>
          </div> */}

          <section className="stats d-flex mt-2 justify-content-between ">
            {!projectDetailsData?.pay_type?.variable_cost && (
              <div className="d-flex amount gap-50 align-items-center">
                <Avatar
                  color="light-warning"
                  icon={<img src={MoneyIcon} height={22} alt="money" />}
                  className="stat-avatar"
                />
                <div>
                  <CardText className="font-small-3 mb-0 stat-value">
                    {projectDetailsData?.pay_type?.currency?.code} {projectDetailsData?.pay_type?.fixed_cost}
                  </CardText>
                  <CardText className="font-small-2 mb-0 stat-key">Value</CardText>
                </div>
              </div>
            )}
          </section>

          <section className="project-details mt-2">
            <CardTitle className="main-title mb-75">Project Details</CardTitle>
          </section>

          <div className="d-flex justify-content-between mb-75">
            <div className="d-flex flex-wrap gap-25">
              <span className="info-key">Posted date:</span>
              <CardText className="info-value ">
                {' '}
                {convertUnixTimestampToDate(
                  projectDetailsData?.listing_details?.start_date_epoch,
                  savedUserData?.availability?.timezone?.name,
                )}
              </CardText>
            </div>
            {projectDetailsData?.details?.documents?.length > 0 && (
              <div
                className="d-flex align-items-center cursor-pointer attachments"
                onClick={() => setViewFilesModal(true)}
              >
                <Paperclip size={14} />
                <span className="ms-25">{projectDetailsData?.details?.documents?.length}</span>
              </div>
            )}
          </div>

          <div className="d-flex">
            {projectDetailsData &&
              projectDetailsData?.status !== 'OPEN' &&
              projectDetailsData?.status !== 'TO_BE_LISTED' && (
                <BadgeGroup
                  title="Status"
                  data={[
                    {
                      name: displaySecondaryStatusTextOnSideBar(
                        projectDetailsData,
                        statusEnum,
                        statusDisplay,
                        savedUserData,
                      ),
                    },
                  ]}
                  color={statusDisplay[projectDetailsData?.status]?.bgcolor}
                  id={`tooltip-${projectDetailsData?._id}`}
                />
              )}
          </div>
          <div className="d-flex">
            {(projectDetailsData?.proficiency?.skills || projectDetailsData?.proficiency?.tools) && (
              <BadgeGroup
                title="Tags"
                data={[
                  ...(projectDetailsData?.proficiency?.skills || []),
                  ...(projectDetailsData?.proficiency?.tools || []),
                ]}
                color="light-blue"
                id={`tooltip-${projectDetailsData?._id}`}
              />
            )}
          </div>

          <div className="project-desc mb-75">
            <div className="project-desc-title">Description:</div>
            <CardText className="value">
              <ShowMoreLess content={projectDetailsData?.details?.description} maxLength={250} />
            </CardText>
          </div>

          <div className="d-flex mt-2 justify-content-center d-none">
            <Button color="primary" onClick={() => setRelistConfirmationModal(true)}>
              Re-list
            </Button>
          </div>

          {userData?.user_type === userTypes.client && (
            <div>
              <div className="d-flex gap-1 mt-3 justify-content-center">
                {(projectDetailsData?.status === 'ACTIVE' || projectDetailsData?.status === 'ON_GOING') && (
                  <Button className="w-50" color="danger" onClick={handleDelete}>
                    Terminate
                  </Button>
                )}
                {(projectDetailsData?.status === 'OPEN' || projectDetailsData?.status === 'IN_REVIEW') && (
                  <Button className="w-50" color="primary" onClick={handleInvite}>
                    Invite
                  </Button>
                )}
                {(projectDetailsData?.status === 'ON_GOING' || projectDetailsData?.status === 'COMPLETED') && (
                  <Button className="w-50" outline color="primary" onClick={onMessageClick}>
                    Message
                  </Button>
                )}
                {(projectDetailsData?.status === 'OPEN' || projectDetailsData?.status === 'TO_BE_LISTED') && (
                  <Button className="w-50" color="danger" onClick={handleWithdraw}>
                    Withdraw
                  </Button>
                )}
                {projectDetailsData?.status === 'WITHDRAWN' && (
                  <Button className="w-50" color="primary" onClick={handleReList}>
                    Re-List
                  </Button>
                )}
              </div>
            </div>
          )}

          {(projectDetailsData?.status === 'ON_GOING' || projectDetailsData?.status === 'COMPLETED') &&
            projectDetailsData?.worker_details?.entity_id === userData?._id && (
              <div className="d-flex gap-1 mt-3 justify-content-center">
                <Button className="w-50" color="primary" onClick={onMessageClick}>
                  Message
                </Button>
              </div>
            )}
          {userData?.user_type === userTypes.talent && invitedByData && (
            <div className="d-flex gap-1 mt-3 justify-content-center">
              <Button className="w-50" color="primary" onClick={onMessageClientClick}>
                Message
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
      {inviteTalentToTeamModal && (
        <InviteTalentToTeamForProjectDetails
          inviteTeamMemberModal={inviteModal}
          toggleInviteTeamMemberModal={toggleModal}
          setInviteTalentToTeamModal={setInviteTalentToTeamModal}
          projectId={params.projectId}
        />
      )}
      {confirmWithdrawModal && (
        <WithdrawModal
          modal={confirmWithdrawModal}
          toggleModal={() => {
            setConfirmWithdrawModal(false);
          }}
          projectDetailsData={projectDetailsData}
        />
      )}
    </LeftSidebarProjectDetailsWrapper>
  );
};

export default LeftSidebarProjectDetails;
