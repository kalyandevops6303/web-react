/* eslint-disable no-unsafe-optional-chaining */
import React from 'react';
import Proptypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AvatarGroup from '@components/avatar-group';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { Card, CardBody, CardText } from 'reactstrap';
import { ProjectWrapper } from './style';
import DateTime from '../../../lib/date-time';

const UpcomingProjectCardForTalent = ({ data, className }) => {
  const navigate = useNavigate();

  const viewProject = () => {
    navigate(`/project-details/${data._id}/bid`);
  };

  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design">
        <CardBody>
          <p className="active-project-name truncate-2" style={{ height: '40px' }}>
            {data?.name}
          </p>
          <div className="client-badge px-1">
            <p className="mb-25">Client</p>
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
          <div className="bottom-detail d-flex mt-1">
            <div className="design-planning-wrapper">
              <div className="design-planning">
                <CardText className="mb-25">Start Date</CardText>
                <h6 className="mb-0">{`${DateTime.fromMillis(data?.start_date).toFormat('MMM dd, yy') || '-'}`}</h6>
              </div>
              <div className="design-planning">
                <CardText className="mb-25">Amount</CardText>
                <h6 className="mb-0">${data?.amount}</h6>
              </div>
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

export default UpcomingProjectCardForTalent;

UpcomingProjectCardForTalent.propTypes = {
  data: Proptypes.object,
  className: Proptypes.string,
};

UpcomingProjectCardForTalent.defaultProps = {
  data: {},
  className: '',
};
