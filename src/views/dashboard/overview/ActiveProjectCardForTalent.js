/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Card, CardBody, CardText, Spinner } from 'reactstrap';
import AvatarGroup from '@components/avatar-group';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { ProjectWrapper } from './style';
import { CustomBadge } from '../../styled';
import DateTime from '../../../lib/date-time';
import ProjectModalViews from './ProjectModalViews';
import { userTypes } from '../../../utility/constants/Constant';
import NewTag from '../../../@core/components/new-tag';
import { updateCardStatus } from '../../../redux/actions/dashboardActions';

const ActiveProjectCardForTalent = ({ accordionName, data, className }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [switchModal, setSwitchModal] = useState(false);

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

  const updateCard = () => {
    const postData = {
      metadata: {
        project_id: data._id,
      },
      type: accordionName,
    };
    dispatch(updateCardStatus({ id: data?._id, data: postData, type: 'activeProjectsForTalent' }));
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
                    img: data?.client_info.image_uri || defaultAvatar,
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
          <p className="active-project-simple-heading">Milestone {data?.current_milestone?.seq}</p>
          <div className="bottom-detail d-flex mt-1">
            <div className="design-planning-wrapper">
              <div className="design-planning">
                <CardText className="mb-25">Due Date</CardText>
                <h6 className="mb-0">{`${
                  DateTime.fromMillis(data?.current_milestone?.due_date).toFormat('MMM dd, yy') || '-'
                }`}</h6>
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
