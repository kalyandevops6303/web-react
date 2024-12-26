/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Card, CardBody, Spinner } from 'reactstrap';
// import AvatarGroup from '@components/avatar-group';
// import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { useNavigate } from 'react-router-dom';
import { ProjectWrapper } from './style';
import { CustomBadge } from '../../styled';
// import ProjectModalViews from './ProjectModalViews';
// import { userTypes } from '../../../utility/constants/Constant';
import NewTag from '../../../@core/components/new-tag';
import { updateCardStatus } from '../../../redux/actions/dashboardActions';
import DurationSegment from './DurationSegment';
import { convertUnixTimestampToDate, getModifiedProjectResponse, truncateSentence } from '../../../utility/Utils';
import { selectSavedUserData } from '../../../redux/selectors/authSelectors';
// import { generateAvatar } from '@/CometChatWorkspace/src/util/HelperFunctions';
import ProjectModal from '@/views/modals/ProjectModal';

const getBidByName = (bidBy) => {
  if (!bidBy) return '';
  if ('name' in bidBy) return bidBy.name;
  return `${bidBy.first_name} ${bidBy.last_name}`;
};

const OpenProjectCardForClient = ({ accordionName, data, className }) => {
  const [showModal, setShowModal] = useState(false);
  const handleToggle = () => {
    setShowModal(!showModal);
  };
  const dispatch = useDispatch();
  const savedUserData = useSelector(selectSavedUserData);
  const isModalLoading = useSelector((state) => state.dashboard.projectModalDataLoading);
  const projectModalId = useSelector((state) => state.dashboard.projectModalId);
  const [currentMilestoneData, setCurrentMilestoneData] = useState({});

    useEffect(()=>{
      if(data?.project?.milestones && data?.project?.milestones.length>0){
          const currentMilestone = data?.milestones?.map((milestone)=>milestone?.status === 'ACTIVE');
        const requiredData = {
          seq: currentMilestone?.seq,
          due_date: currentMilestone?.end_date,
          name: currentMilestone?.name,
        };
          setCurrentMilestoneData(requiredData);
      }
    },[data?.project?.milestones]);
  const statusEnum = {
    OPEN: 'Open',
    IN_REVIEW: 'In Review',
    ON_GOING: 'On Going',
    ACTIVE: 'Active',
    TERMINATED: 'Terminated',
    CLOSED: 'Closed',
    LISTING_EXPIRED: 'Listing Expired',
  };

  const secondaryStatusEnum = {
    SIGN_CONTRACT: 'Sign Contract',
    SIGN_NDA: 'Sign NDA',
    COMPLETED: 'Completed',
    SIGN_REQUESTED: 'Sign Requested',
    SIGN_DOCUMENTS: 'Sign Documents',
    MILESTONE: 'Milestone',
  };

  const navigate = useNavigate();

  const updateCard = () => {
    const postData = {
      metadata: {
        project_id: data.project?._id,
      },

      type: accordionName,
    };
    if (data?.project?.is_read === false) {
      dispatch(updateCardStatus({ id: data.project?._id, data: postData, type: 'openProjectsForClient' }));
    }
  };
  const viewProject = () => {
    updateCard();
    navigate(`/project-details/${data.project?._id}/milestone`);
  };
  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design new-tag-relative-card">
        {!data.project?.is_read && <NewTag />}
        <CardBody>
          <CustomBadge>
            <Badge className={`${data?.project?.status}`} color="badge">
              {statusEnum[data?.project?.status]}
            </Badge>
          </CustomBadge>
          <h4 className="active-project-name mt-1 truncate-2">
            {truncateSentence({ sentence: getBidByName(data?.bid_by) || data?.project?.name, maxCharacters: 30 })}
          </h4>
          {/* {data?.worker_details.length > 0 && (
            <div className="team-badge px-1">
              <p className="mb-25">Team</p>
            </div>
          )} */}
          {/* <div className="mb-1 mt-6">
            {data?.worker_details.length > 0 ? (
              <span className="d-flex avatars">
                <AvatarGroup
                  totalCount={data?.team_members_count || data?.workers_count || data?.worker_details.length}
                  size="sm"
                  className="mr-4"
                  data={[
                    ...data?.worker_details?.slice(0, 3)?.map((worker) => ({
                      user_id: worker?.user_id,
                      user_type: userTypes.talent,
                      title: `${worker?.first_name} ${worker?.last_name} ` || 'user',
                      img:
                        (worker.image_uri?.length > 0
                          ? worker.image_uri
                          : generateAvatar(
                              worker?.user_id,
                              (worker?.first_name?.charAt(0)?.toUpperCase() || '') +
                                (worker?.last_name?.charAt(0)?.toUpperCase() || ''),
                            )) || defaultAvatar,
                      placement: 'bottom',
                      imgHeight: 33,
                      imgWidth: 33,
                      tooltipId: `tooltip-${worker?.first_name?.replace(/\s+/g, '-')}-${worker?.last_name?.replace(
                        /\s+/g,
                        '-',
                      )}`,
                    })),
                  ]}
                />
              </span>
            ) : (
              <AvatarGroup
                size="sm"
                data={[
                  ...data?.worker_details?.map((worker) => ({
                    user_id: worker?.user_id,
                    user_type: userTypes.talent,
                    title: `${worker?.first_name} ${worker?.last_name} ` || 'user',
                    img: worker.image_uri || defaultAvatar,
                    placement: 'bottom',
                    imgHeight: 33,
                    imgWidth: 33,
                    tooltipId: `tooltip-${worker?.first_name?.replace(/\s+/g, '-')}-${worker?.last_name?.replace(
                      /\s+/g,
                      '-',
                    )}`,
                  })),
                ]}
              />
            )}
          </div> */}
          <p className="active-project-simple-heading">Project</p>
           <DurationSegment start_date={data?.project?.expected_start_date} end_date={data?.project?.listing_end_date} />
          {
            currentMilestoneData?.length > 0 && 
<>
<p className="active-project-simple-heading">Milestone {currentMilestoneData?.seq}</p>
          <div className="bottom-detail d-flex mt-1">
            <div className="design-planning-wrapper">
              <div className="design-planning">
                <p className="mb-25 details-box-title">Due Date</p>
                <p className="mb-0 details-box">
                  {`${
                    convertUnixTimestampToDate(
                      currentMilestoneData?.due_date,
                      savedUserData?.availability?.timezone?.name,
                    ) || '-'
                  }`}
                </p>
              </div>
              <p className="active-project-milestone-name">{currentMilestoneData.name}</p>
            </div>
          </div>
          </>}

          <div
            onClick={viewProject}
            className="cursor-pointer font-weight-normal text-center text-primary project-cta mt-50"
          >
            {isModalLoading && projectModalId === data?.project?._id ? <Spinner size="sm" /> : 'View Project'}
          </div>
        </CardBody>
      </Card>
            {showModal && (
              <ProjectModal
                data={getModifiedProjectResponse({ data })}
                modal={showModal}
                toggleModal={handleToggle}
                isMyTeam={false}
              />
            )}
    </ProjectWrapper>
  );
};

export default OpenProjectCardForClient;

OpenProjectCardForClient.propTypes = {
  accordionName: Proptypes.string,
  data: Proptypes.object,
  className: Proptypes.string,
};

OpenProjectCardForClient.defaultProps = {
  accordionName: '',
  data: {},
  className: '',
};
