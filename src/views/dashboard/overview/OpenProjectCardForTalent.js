/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Card, CardBody, Spinner } from 'reactstrap';
import AvatarGroup from '@components/avatar-group';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { ProjectWrapper } from './style';
import { CustomBadge } from '../../styled';
import { statusEnum, userTypes } from '../../../utility/constants/Constant';
import NewTag from '../../../@core/components/new-tag';
import { updateCardStatus } from '../../../redux/actions/dashboardActions';
import DurationSegment from './DurationSegment';
import {
  convertUnixTimestampToDate,
  getModifiedProjectResponse,
  isEmpty,
  truncateSentence,
} from '../../../utility/Utils';
import { selectSavedUserData } from '../../../redux/selectors/authSelectors';
import ProjectModal from '@/views/modals/ProjectModal';

const OpenProjectCardForTalent = ({ accordionName, data, className }) => {
  const dispatch = useDispatch();
  const [currentMilestoneData, setCurrentMilestoneData] = useState({});
  const savedUserData = useSelector(selectSavedUserData);
  const isModalLoading = useSelector((state) => state.dashboard.projectModalDataLoading);
  const projectModalId = useSelector((state) => state.dashboard.projectModalId);

  useEffect(() => {
    if (!isEmpty(data?.project?.milestones)) {
      const currentMilestone = data?.milestones?.map((milestone) => milestone?.status === 'ACTIVE');
      const requiredData = {
        seq: currentMilestone?.seq,
        due_date: currentMilestone?.end_date,
        name: currentMilestone?.name,
      };
      setCurrentMilestoneData(requiredData);
    }
  }, [data?.project?.milestones]);

  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    setShowModal(!showModal);
  };
  const updateCard = () => {
    const postData = {
      metadata: {
        project_id: data?.project?._id,
      },
      type: accordionName,
    };
    if (data?.project?.is_read === false) {
      dispatch(
        updateCardStatus({
          switch_team_id: null,
          id: data?.project?._id,
          data: postData,
          type: 'openProjectsForTalent',
        }),
      );
    }
    setShowModal(true);
  };

  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design new-tag-relative-card">
        {!data?.project?.is_read && <NewTag />}
        <CardBody>
          <CustomBadge>
            <Badge className={`${data?.project?.status}`} color="badge">
              {statusEnum[data?.project?.status]}
            </Badge>
          </CustomBadge>
          <p className="truncate-2 mt-1" style={{ height: '40px', color: 'black' }}>
            {truncateSentence({ sentence: data?.project?.name, maxCharacters: 30 })}
          </p>
          <div className="client-badge px-1 mb-75">
            <p className="mb-0">Client</p>
          </div>
          <p className="active-project-team-name mb-50">{`${data?.client?.first_name} ${data?.client?.last_name}`}</p>
          <div className="mb-1">
            <span className="d-flex avatars">
              <AvatarGroup
                size="sm"
                className="mr-4"
                data={[
                  {
                    user_type: userTypes.client,
                    user_id: data?.client?._id,
                    title: `${data?.client?.first_name} ${data?.client?.last_name} ` || 'user',
                    img: data?.client?.image_uri || defaultAvatar,
                    placement: 'bottom',
                    imgHeight: 33,
                    imgWidth: 33,
                    tooltipId: `tooltip-${data?.client?.first_name?.replace(
                      /\s+/g,
                      '-',
                    )}-${data?.client?.last_name?.replace(/\s+/g, '-')}`,
                  },
                ]}
              />
            </span>
          </div>
          <p className="active-project-simple-heading">Project</p>
          <DurationSegment start_date={data?.project?.expected_start_date} end_date={data?.project?.listing_end_date} />
          {currentMilestoneData?.length > 0 && (
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
            </>
          )}

          <div
            onClick={updateCard}
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

export default OpenProjectCardForTalent;

OpenProjectCardForTalent.propTypes = {
  data: Proptypes.object,
  className: Proptypes.string,
  accordionName: Proptypes.string,
};

OpenProjectCardForTalent.defaultProps = {
  data: {},
  className: '',
  accordionName: '',
};
