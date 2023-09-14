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

const ActiveProjectCard = ({ data, className }) => {
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
    navigate(`/project-details/${data._id}/bid`);
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
          <p className="active-project-name mt-1">{data?.name}</p>
          <div className="team-badge px-1 mb-75">
            <p className="mb-0">Team</p>
          </div>
          <p className="active-project-team-name mb-50">
            {'name' in data?.bid_by ? data?.bid_by?.name : `${data?.bid_by?.first_name} ${data?.bid_by?.last_name}`}
          </p>
          <div className="mb-1">
            {data?.worker_details.length > 3 ? (
              <span className="d-flex avatars">
                <AvatarGroup
                  size="sm"
                  className="mr-4"
                  data={[
                    ...data?.worker_details?.slice(0, 3)?.map((worker) => ({
                      title: `${worker?.first_name} ${worker?.last_name} ` || 'user',
                      img: worker.image_uri || defaultAvatar,
                      placement: 'bottom',
                      imgHeight: 33,
                      imgWidth: 33,
                    })),
                  ]}
                />
              </span>
            ) : (
              <AvatarGroup
                size="sm"
                data={[
                  ...data?.worker_details?.map((worker) => ({
                    title: `${worker?.first_name} ${worker?.last_name} ` || 'user',
                    img: worker.image_uri || defaultAvatar,
                    placement: 'bottom',
                    imgHeight: 33,
                    imgWidth: 33,
                  })),
                ]}
              />
            )}
          </div>
          <p className="active-project-simple-heading">Project</p>
          <div className="bottom-detail d-flex mt-1">
            <div className="design-planning-wrapper">
              <div className="design-planning">
                <CardText className="mb-25">Start Date</CardText>
                <h6 className="mb-0">{`${DateTime.fromMillis(data?.start_date).toFormat('MMM dd, yy') || '-'}`}</h6>
              </div>
            </div>
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

export default ActiveProjectCard;

ActiveProjectCard.propTypes = {
  data: Proptypes.object,
  className: Proptypes.string,
};

ActiveProjectCard.defaultProps = {
  data: {},
  className: '',
};
