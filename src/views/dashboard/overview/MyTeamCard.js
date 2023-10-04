/* eslint-disable react/require-default-props */
// ** Third Party Components
import PropTypes from 'prop-types';
// ** Custom Components
import AvatarGroup from '@components/avatar-group';

// ** Reactstrap Imports
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';

// ** Avatar Imports
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProjectWrapper } from './style';
import ProjectModal from '../../modals/ProjectModal';
import RatingBadge from '../../../@core/components/rating-group/RatingBadge';
import { setItem } from '../../../utility/localStorageControl';

const UserSection = ({ totalCount, users, name }) => (
  <div className="user-section">
    <CardText className="mt-1 truncate-2 active-project-users">{name}</CardText>
    <div className="avatar-wrap">
      {users.length > 3 ? (
        <span className="d-flex avatars">
          <AvatarGroup totalCount={totalCount} size="sm" className="mr-4" data={users.slice(0, 3)} />
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
  totalCount: PropTypes.number,
};

const MyTeamCard = ({ data, className }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  const users = [];
  data?.team_members?.map((user) =>
    users.push({
      title: `${user?.first_name} ${user?.last_name} ` || 'user',
      img: user.image_uri || avatar7,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    }),
  );

  const handleViewTeam = (id) => {
    setItem('team_id', id);
    navigate(`/profile/team/${id}`);
  };

  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design">
        <CardBody>
          <div className="d-flex">
            <RatingBadge number="0" />
            <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
          </div>
          <CardTitle className="mt-50 truncate-1 mb-1">{data?.name}</CardTitle>
          <section className="d-flex justify-content-between">
            <div>
              {users.length > 3 ? (
                <span className="d-flex avatars">
                  <AvatarGroup
                    totalCount={data?.team_members_count || data?.workers_count}
                    size="sm"
                    className="mr-4"
                    data={users.slice(0, 3)}
                  />
                </span>
              ) : (
                <AvatarGroup size="sm" data={users} />
              )}
            </div>
            <div
              className="cursor-pointer font-small-4 font-weight-normal text-center text-primary project-cta mt-25"
              onClick={() => handleViewTeam(data?._id)}
            >
              View
            </div>
          </section>
        </CardBody>
      </Card>
      {showModal && <ProjectModal data={data} modal={showModal} toggleModal={handleToggle} />}
    </ProjectWrapper>
  );
};

MyTeamCard.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
};
export default MyTeamCard;
