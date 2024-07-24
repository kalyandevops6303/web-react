import React from 'react';
import { Button, Card, CardBody, CardText } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import RatingBadge from '../../../@core/components/rating-group/RatingBadge';

const InviteMemberCard = () => {
  const navigate = useNavigate();
  const invitedByData = useSelector((state) => state.projectDetails.invitedBy);
  const handleView = () => {
    if (invitedByData?.request_from?.team_id) {
      navigate(`/profile/talent/${invitedByData?.request_from?.user_id}`);
    } else {
      navigate(`/profile/client/${invitedByData?.request_from?.user_id}`);
    }
  };
  return (
    <Card>
      <CardBody>
        <CardText> You&apos;ve been invited to join a project</CardText>
        <div className="d-flex">
          <Avatar
            img={invitedByData?.request_from?.image_uri || defaultAvatar}
            imgHeight="35"
            imgWidth="35"
            className="project-details-card-photo me-1 mt-50"
          />
          <div>
            <CardText className="mb-0 ms-25">
              {invitedByData?.request_from?.first_name} {invitedByData?.request_from?.last_name}
            </CardText>
            <div className="d-flex">
              <RatingBadge number={invitedByData?.client_details?.rating || 0} />
              <CardText className="ps-75 font-small-2 fw-300 rating-label">
                {invitedByData?.client_details?.projects_listed_count || 0} Projects
              </CardText>
            </div>
          </div>
        </div>
        <Button onClick={handleView} className="m-auto mt-2 d-block" color="primary">
          View Project
        </Button>
      </CardBody>
    </Card>
  );
};

export default InviteMemberCard;
