import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import AvatarGroup from '@components/avatar-group';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import { TeamCardWrap } from './style';

const Team = ({ data }) => {
  const users = [];
  data?.team_members?.map((user) =>
    users.push({
      title: `${user?.talent_info?.first_name} ${user?.talent_info?.last_name}` || 'user',
      img: user.image_uri || avatar7,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    }),
  );

  return (
    <TeamCardWrap>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle className="card-title mb-1 d-flex justify-space-between">
              <span>{data?.name}</span>
            </CardTitle>
            <span className="me-3">{data?.created_at ? DateTime?.fromMillis(data?.created_at)?.toRelative() : ''}</span>
          </div>
          <CardText className="team-desc mb-1">{data?.introduction} </CardText>

          <div className="avatar-wrap mb-1">
            {users.length > 4 ? (
              <span className="d-flex avatars">
                <AvatarGroup size="md" className="mr-4" data={users.slice(0, 3)} />
              </span>
            ) : (
              <AvatarGroup size="md" data={users} />
            )}
          </div>
          <div className="d-flex">
            <RatingBadge number="0" />
            <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
          </div>
        </CardBody>
      </Card>
    </TeamCardWrap>
  );
};

Team.propTypes = {
  data: PropTypes.object,
};
Team.defaultProps = {
  data: {},
};
export default Team;
