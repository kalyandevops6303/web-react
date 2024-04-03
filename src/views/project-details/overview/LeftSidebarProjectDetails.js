import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router';
import { Badge, Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import MoneyIcon from '@src/assets/images/money.svg';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import BadgeGroup from '../../../@core/components/badge-group-dynamic-count';
import { LeftSidebarProjectDetailsWrapper } from '../style';
import RatingBadge from '../../../@core/components/rating-group/RatingBadge';
import { CustomBadge } from '../../styled';
import { projectDetails, projectDetailsLoading } from '../../../redux/selectors/projectDetailsSelectors';
import DateTime from '../../../lib/date-time';
import { getProjectDetails } from '../../../redux/actions/projectDetailsAction';
import ShowMoreLess from '../../../@core/components/show-more-less-comp';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import InviteTalentToTeamForProjectDetails from '../../invite-talent-to-team/InviteViewForProjectDetails';
import { returnFormattedRating } from '../../../utility/Utils';
import { clearModalData } from '../../../redux/reducers/createProject';
import DeleteProjectModal from '../../modals/DeleteProjectModal';
import RelistConfirmationModal from '../../modals/RelistConfirmationModal';
import RelistListingDetailsModal from '../../modals/RelistListingDetailsModal';
import RelistSuccessModal from '../../modals/RelistSuccessModal';

const LeftSidebarProjectDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const userData = useSelector(selectUserData);
  const [inviteModal, setInviteModal] = useState(false);
  const [inviteTalentToTeamModal, setInviteTalentToTeamModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState(null);

  const [relistConfirmationModal, setRelistConfirmationModal] = useState(null);
  const [relistListingDetailsModal, setRelistListingDetailsModal] = useState(null);
  const [relistSuccessModal, setRelistSuccessModal] = useState(null);
  const [projectRelistData, setProjectRelistData] = useState(null);

  const toggleModal = () => {
    setInviteModal(!inviteModal);
    dispatch(clearModalData());
  };

  const toggleRelistConfirmationModal = () => setRelistConfirmationModal(!relistConfirmationModal);

  const toggleRelistListingDetailsModal = () => setRelistListingDetailsModal(!relistListingDetailsModal);

  const toggleRelistSuccessModal = () => setRelistSuccessModal(!relistSuccessModal);

  const projectDetailsData = useSelector(projectDetails);

  const statusEnum = {
    OPEN: 'Open',
    IN_REVIEW: 'In Review',
    TERMINATED: 'Terminated',
    CLOSED: 'Closed',
    LISTING_EXPIRED: 'Expired',
    ON_GOING: 'On Going',
    COMPLETED: 'COMPLETED',
    ACTIVE: 'Active',
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

  const onMessageClick = () => {
    navigate(`/chat`, {
      state: { targetId: params?.projectId, targetType: 'group' },
    });
  };

  const handleDelete = () => {
    setDeleteModal(true);
    setDeleteModalData(projectDetailsData);
  };

  return (
    <LeftSidebarProjectDetailsWrapper>
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
            <div className="d-flex">
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
              <div>
                <CardText className="mb-0 ms-25">
                  {projectDetailsData?.worker_details?.entity_type === userTypes.talent
                    ? `${projectDetailsData?.worker_details?.first_name} 
                      ${projectDetailsData?.worker_details?.last_name}`
                    : projectDetailsData?.worker_details?.name}
                </CardText>
                <div className="d-flex flex-wrap">
                  <RatingBadge number={returnFormattedRating(projectDetailsData?.worker_details?.rating) || 0} />
                  <CardText className="ps-75 font-small-2 fw-300 rating-label">
                    {projectDetailsData?.worker_details?.projects_worked_on_count || 0} Projects
                  </CardText>
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex">
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

          <div className="d-flex mb-75 flex-wrap gap-25">
            <span className="info-key">Posted date:</span>
            <CardText className="info-value">
              {DateTime.fromMillis(projectDetailsData?.listing_details?.start_date_epoch || 0).toFormat(`MMM dd, yy`)}
            </CardText>
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
                {(projectDetailsData?.status === 'OPEN' ||
                  projectDetailsData?.status === 'IN_REVIEW' ||
                  projectDetailsData?.status === 'ACTIVE') && (
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
    </LeftSidebarProjectDetailsWrapper>
  );
};

export default LeftSidebarProjectDetails;
