import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
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

const LeftSidebarProjectDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const userData = useSelector(selectUserData);
  const [inviteModal, setInviteModal] = useState(false);
  const [inviteTalentToTeamModal, setInviteTalentToTeamModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState(null);
  const toggleModal = () => {
    setInviteModal(!inviteModal);
    dispatch(clearModalData());
  };

  const projectDetailsData = useSelector(projectDetails);

  const statusEnum = {
    OPEN: 'Open',
    IN_REVIEW: 'In Review',
    TERMINATED: 'Terminated',
    CLOSED: 'Closed',
    LISTING_EXPIRED: 'Listing Expired',
    ON_GOING: 'On Going',
    COMPLETED: 'COMPLETED',
  };

  const isLoading = useSelector(projectDetailsLoading);

  useEffect(() => {
    dispatch(getProjectDetails(params.projectId));
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
            <CardText className="fw-bold days">{daysLeft === 0 ? 'Listing Expired' : `${daysLeft} Days left`}</CardText>
          </div>
          <CardTitle className="title">{projectDetailsData?.details?.name}</CardTitle>

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

          {userData?.user_type === userTypes.client && (
            <div>
              <div className="d-flex gap-1 mt-3 justify-content-center">
                <Button className="w-50" color="danger" onClick={handleDelete}>
                  Terminate
                </Button>
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
            projectDetailsData?.worker_details?.entity_id === userData._id && (
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
