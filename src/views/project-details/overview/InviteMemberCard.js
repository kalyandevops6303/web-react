import React from 'react';
import { Button, Card, CardBody, CardText } from 'reactstrap';
import { useSelector } from 'react-redux';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import RatingBadge from '../../../@core/components/rating-group/RatingBadge';

const InviteMemberCard = () => {
  const invitedByData = useSelector((state) => state.projectDetails.invitedBy);

  return (
    <Card>
      <CardBody>
        <CardText> You&apos;ve been invited to join a project</CardText>
        <div className="d-flex">
          <Avatar
            img={
              invitedByData?.invitation_by?.image_uri?.length > 0
                ? invitedByData?.invitation_by?.image_uri
                : defaultAvatar
            }
            imgHeight="35"
            imgWidth="35"
            className="project-details-card-photo me-1 mt-50"
          />
          <div>
            <CardText className="mb-0 ms-25">
              {invitedByData?.invitation_by?.first_name} {invitedByData?.invitation_by?.last_name}
            </CardText>
            <div className="d-flex">
              <RatingBadge number={invitedByData?.client_details?.rating} />
              <CardText className="ps-75 font-small-2 fw-300 rating-label">
                {invitedByData?.client_details?.projects_listed_count} Projects
              </CardText>
            </div>
          </div>
        </div>
        <Button className="m-auto mt-2 d-block" color="primary">
          View client
        </Button>
      </CardBody>
    </Card>
  );
};

export default InviteMemberCard;
