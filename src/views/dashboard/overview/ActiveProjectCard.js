/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Card, CardBody, Spinner } from 'reactstrap';
import AvatarGroup from '@components/avatar-group';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { useNavigate } from 'react-router-dom';
import { ProjectWrapper } from './style';
import { CustomBadge } from '../../styled';
import ProjectModalViews from './ProjectModalViews';
import { userTypes } from '../../../utility/constants/Constant';
import NewTag from '../../../@core/components/new-tag';
import { updateCardStatus } from '../../../redux/actions/dashboardActions';
import DurationSegment from './DurationSegment';
import { convertUnixTimestampToDate, truncateSentence } from '../../../utility/Utils';
import { selectSavedUserData } from '../../../redux/selectors/authSelectors';
import { generateAvatar } from '@/CometChatWorkspace/src/util/HelperFunctions';

const getBidByName = (bidBy) => {
  if (!bidBy) return '';
  if ('name' in bidBy) return bidBy.name;
  return `${bidBy.first_name} ${bidBy.last_name}`;
};

const ActiveProjectCard = ({ accordionName, data, className }) => {
  const [showModal, setShowModal] = useState(false);
  const [switchModal, setSwitchModal] = useState(false);
  const dispatch = useDispatch();
  const savedUserData = useSelector(selectSavedUserData);
  const isModalLoading = useSelector((state) => state.dashboard.projectModalDataLoading);
  const projectModalId = useSelector((state) => state.dashboard.projectModalId);

  const statusEnum = {
    OPEN: 'Open Listing',
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
        project_id: data._id,
      },

      type: accordionName,
    };
    if (data?.is_read === false) {
      dispatch(updateCardStatus({ id: data?._id, data: postData, type: 'activeProjectsForClient' }));
    }
  };
  const viewProject = () => {
    updateCard();
    navigate(`/project-details/${data._id}/milestone`);
  };
  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design new-tag-relative-card project-card-dashboard">
        {!data?.is_read && <NewTag />}
        <CardBody className="project-card-body">
          <CustomBadge>
            <Badge className={`${data?.status}`} color="badge">
              {(data?.secondary_status === 'MILESTONE'
                ? `${secondaryStatusEnum[data?.secondary_status]} ${data?.current_milestone?.seq}`
                : secondaryStatusEnum[data?.secondary_status]) || statusEnum[data?.status]}
            </Badge>
          </CustomBadge>
          <h4 className="active-project-name truncate-2">{data?.name || 'Unknown Project Name'}</h4>
          {data?.worker_details.length > 0 && (
            <div className="team-badge px-1">
              <p className="mb-25">Team</p>
            </div>
          )}
          <div className="mb-1 mt-6">
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
          </div>
          <p className="active-project-simple-heading">Project</p>
          <DurationSegment start_date={data?.start_date} end_date={data?.end_date} />
          {data?.current_milestone && (
            <>
              <p className="active-project-simple-heading">Milestone {data?.current_milestone?.seq}</p>
              <div className="bottom-detail d-flex mt-1">
                <div className="design-planning-wrapper">
                  <div className="design-planning">
                    <p className="mb-25 details-box-title">Due Date</p>
                    <p className="mb-0 details-box">
                      {`${
                        convertUnixTimestampToDate(
                          data?.current_milestone?.due_date,
                          savedUserData?.availability?.timezone?.name,
                        ) || '-'
                      }`}
                    </p>
                  </div>
                  <h4 className="active-project-milestone-name">{data?.current_milestone?.name}</h4>
                </div>
              </div>
            </>
          )}

          <div
            onClick={viewProject}
            className="cursor-pointer font-weight-normal text-center text-primary project-cta mt-50"
          >
            {isModalLoading && projectModalId === data?._id ? <Spinner size="sm" /> : 'View Project'}
          </div>
        </CardBody>
      </Card>
      {(showModal || switchModal) && (
        <ProjectModalViews
          cardData={data}
          onUpdateCard={updateCard}
          isActiveProject
          project_id={data?._id}
          showModal={showModal}
          toggleModal={() => setShowModal(!showModal)}
          switchModal={switchModal}
          setSwitchModal={setSwitchModal}
        />
      )}
    </ProjectWrapper>
  );
};

export default ActiveProjectCard;

ActiveProjectCard.propTypes = {
  accordionName: Proptypes.string,
  data: Proptypes.object,
  className: Proptypes.string,
};

ActiveProjectCard.defaultProps = {
  accordionName: '',
  data: {},
  className: '',
};
