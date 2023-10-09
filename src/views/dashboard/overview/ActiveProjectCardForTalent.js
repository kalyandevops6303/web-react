/* eslint-disable no-unsafe-optional-chaining */
import React from 'react';
import Proptypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Badge, Card, CardBody, CardText } from 'reactstrap';
import AvatarGroup from '@components/avatar-group';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { ProjectWrapper } from './style';
import { CustomBadge } from '../../styled';
import DateTime from '../../../lib/date-time';

const ActiveProjectCardForTalent = ({ data, className }) => {
  const navigate = useNavigate();

  const statusEnum = {
    OPEN: 'Open Listing',
    IN_REVIEW: 'In Review',
    ON_GOING: 'On Going',
    TERMINATED: 'Terminated',
    CLOSED: 'Closed',
    LISTING_EXPIRED: 'Listing Expired',
  };

  const viewProject = () => {
    navigate(`/project-details/${data._id}/milestone`);
  };

  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design">
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
                    title: `${data?.client_info?.first_name} ${data?.client_info?.last_name} ` || 'user',
                    img: data?.client_info.image_uri || defaultAvatar,
                    placement: 'bottom',
                    imgHeight: 33,
                    imgWidth: 33,
                  },
                ]}
              />
            </span>
          </div>
          <p className="active-project-simple-heading">Milestone {data?.completed_milestones + 1}</p>
          <div className="bottom-detail d-flex mt-1">
            <div className="design-planning-wrapper">
              <div className="design-planning">
                <CardText className="mb-25">Due Date</CardText>
                <h6 className="mb-0">{`${DateTime.fromMillis(data?.start_date).toFormat('MMM dd, yy') || '-'}`}</h6>
              </div>
              <p className="active-project-milestone-name">{data?.current_milestone?.name}</p>
            </div>
          </div>
          <div
            onClick={viewProject}
            className="cursor-pointer font-weight-normal text-center text-primary project-cta mt-50"
          >
            View Project
          </div>
        </CardBody>
      </Card>
    </ProjectWrapper>
  );
};

export default ActiveProjectCardForTalent;

ActiveProjectCardForTalent.propTypes = {
  data: Proptypes.object,
  className: Proptypes.string,
};

ActiveProjectCardForTalent.defaultProps = {
  data: {},
  className: '',
};
