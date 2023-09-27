/* eslint-disable react/require-default-props */
// ** Third Party Components
import PropTypes from 'prop-types';
// ** Custom Components
import AvatarGroup from '@components/avatar-group';

// ** Reactstrap Imports
import { useNavigate } from 'react-router';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';

// ** Avatar Imports
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';

import { ProjectWrapper } from './style';
import RatingBadge from '../../../@core/components/rating-group/RatingBadge';

const UserSection = ({ users, name }) => (
  <div className="user-section">
    <CardText className="mt-1 truncate-2 active-project-users">{name}</CardText>
    <div className="avatar-wrap">
      {users.length > 3 ? (
        <span className="d-flex avatars">
          <AvatarGroup size="sm" className="mr-4" data={users.slice(0, 3)} />
        </span>
      ) : (
        <AvatarGroup size="sm" data={users} />
      )}
    </div>
  </div>
);

UserSection.propTypes = {
  users: PropTypes.array,
  name: PropTypes.string,
};

const TeamInvitaionCard = ({ data, className }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (data?.project) {
      navigate(`/project/${data?.project?._id}/invitation-view/id`);
    } else {
      navigate(`/profile/team/${data?._id}`);
    }
  };

  const users = [];

  data?.team_members?.map((user) =>
    users.push({
      title: `${user?.first_name} ${user?.last_name}` || 'user',
      img: user.image_uri || avatar7,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    }),
  );

  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design">
        <CardBody>
          <CardTitle className="mt-50 active-project-title truncate-2 mb-1.5">{data?.project?.name}</CardTitle>

          <div className="d-flex">
            <RatingBadge number="0" />
            <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
          </div>

          <UserSection tagName="Team" name={data?.name} users={users} />

          <div
            onClick={handleRedirect}
            className="cursor-pointer font-weight-normal text-center text-primary project-cta mt-25"
          >
            View Details
          </div>
        </CardBody>
      </Card>
    </ProjectWrapper>
  );
};

TeamInvitaionCard.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
};
export default TeamInvitaionCard;
