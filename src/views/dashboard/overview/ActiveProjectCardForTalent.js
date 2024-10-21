/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Card, CardBody, Spinner } from 'reactstrap';
import AvatarGroup from '@components/avatar-group';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { ProjectWrapper } from './style';
import { CustomBadge } from '../../styled';
import ProjectModalViews from './ProjectModalViews';
import { userTypes } from '../../../utility/constants/Constant';
import NewTag from '../../../@core/components/new-tag';
import { updateCardStatus } from '../../../redux/actions/dashboardActions';
import DurationSegment from './DurationSegment';
import { convertUnixTimestampToDate } from '../../../utility/Utils';
import { selectSavedUserData } from '../../../redux/selectors/authSelectors';

const ActiveProjectCardForTalent = ({ accordionName, data, className }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [switchModal, setSwitchModal] = useState(false);
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

  const viewProject = () => {
    // navigate(`/project-details/${data._id}/milestone`);
    setShowModal(true);
  };

  const updateCard = ({ switch_team_id }) => {
    const postData = {
      metadata: {
        project_id: data._id,
      },
      type: accordionName,
    };
    if (data?.is_read === false) {
      dispatch(updateCardStatus({ switch_team_id, id: data?._id, data: postData, type: 'activeProjectsForTalent' }));
    }
  };

  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design new-tag-relative-card">
        {!data?.is_read && <NewTag />}
        <CardBody>
          <CustomBadge>
            <Badge className={`${data?.status}`} color="badge">
              {statusEnum[data?.status]}
            </Badge>
          </CustomBadge>
          <p className="truncate-2 mt-1" style={{ height: '40px', color: 'black' }}>
            {data?.name}
          </p>
          <div className="client-badge px-1 mb-75">
            <p className="mb-0">Client</p>
          </div>
          <p className="active-project-team-name mb-50">{`${data?.client_info?.first_name} ${data?.client_info?.last_name}`}</p>
          <div className="mb-1">
            <span className="d-flex avatars">
              <AvatarGroup
                size="sm"
                className="mr-4"
                data={[
                  {
                    user_type: userTypes.client,
                    user_id: data?.client_info?.user_id,
                    title: `${data?.client_info?.first_name} ${data?.client_info?.last_name} ` || 'user',
                    img: data?.client_info?.image_uri || defaultAvatar,
                    placement: 'bottom',
                    imgHeight: 33,
                    imgWidth: 33,
                    tooltipId: `tooltip-${data?.client_info?.first_name?.replace(
                      /\s+/g,
                      '-',
                    )}-${data?.client_info?.last_name?.replace(/\s+/g, '-')}`,
                  },
                ]}
              />
            </span>
          </div>
          <p className="active-project-simple-heading">Project</p>
          <DurationSegment start_date={data?.start_date} end_date={data?.end_date} />
          <p className="active-project-simple-heading">Milestone {data?.current_milestone?.seq}</p>
          <div className="bottom-detail d-flex mt-1">
            <div className="design-planning-wrapper">
              <div className="design-planning">
                <p className="mb-25 details-box-title">
                  Due Date
                </p>
                <p className="mb-0 details-box">
                   {`${
                  convertUnixTimestampToDate(data?.current_milestone?.due_date, savedUserData?.availability?.timezone?.name ) || '-'
                }`}
                </p>
              </div>
              <p className="active-project-milestone-name">{data?.current_milestone?.name}</p>
            </div>
          </div>
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

export default ActiveProjectCardForTalent;

ActiveProjectCardForTalent.propTypes = {
  data: Proptypes.object,
  className: Proptypes.string,
  accordionName: Proptypes.string,
};

ActiveProjectCardForTalent.defaultProps = {
  data: {},
  className: '',
  accordionName: '',
};