/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/require-default-props */
// ** Third Party Components
import PropTypes from 'prop-types';
// ** Custom Components
import AvatarGroup from '@components/avatar-group';

// ** Reactstrap Imports
import { useNavigate } from 'react-router';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { useDispatch } from 'react-redux';

// ** Avatar Imports
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';

import { ProjectWrapper } from './style';
import RatingBadge from '../../../@core/components/rating-group/RatingBadge';
import { userTypes } from '../../../utility/constants/Constant';
import NewTag from '../../../@core/components/new-tag';
import { updateCardStatus } from '../../../redux/actions/dashboardActions';

const UserSection = ({ totalCount, users, name, projectName }) => (
  <div className="user-section">
    <CardText className="mt-1 truncate-2 active-project-users">{name}</CardText>
    <div className="avatar-wrap">
      {users.length > 3 ? (
        <span className="d-flex avatars">
          <AvatarGroup
            totalCount={totalCount}
            size="sm"
            className="mr-4"
            data={[
              ...users.slice(0, 3).map((user) => ({
                ...user,
                tooltipId: `${projectName ?? name}-${user.title}`.replace(/[^a-zA-Z0-9-]/g, '-'),
              })),
            ]}
          />
        </span>
      ) : (
        <AvatarGroup
          size="sm"
          data={[
            ...users?.map((user) => ({
              ...user,
              tooltipId: `${projectName ?? name}-${user.title}`.replace(/[^a-zA-Z0-9-]/g, '-'),
            })),
          ]}
        />
      )}
    </div>
  </div>
);

UserSection.propTypes = {
  users: PropTypes.array,
  name: PropTypes.string,
  totalCount: PropTypes.number,
  projectName: PropTypes.string,
};

const TeamInvitaionCard = ({ accordionName, data, className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateCard = () => {
    const postData = {
      metadata: {
        team_id: data._id,
      },
      type: accordionName,
    };
    dispatch(updateCardStatus({ data: postData }));
  };

  const handleRedirect = () => {
    updateCard();
    if (data?.project?._id) {
      navigate(`/project-details/${data?.project?._id}/project/project-invitation/${data?.request_id}`);
    } else {
      navigate(`/team-invitation/${data?.request_id}`);
    }
  };

  const users = [];

  data?.team_members?.map((user) =>
    users.push({
      user_type: userTypes.talent,
      user_id: user?.user_id,
      title: `${user?.first_name} ${user?.last_name}` || 'user',
      img: user.image_uri || avatar7,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    }),
  );

  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design new-tag-relative-card">
        {!data?.is_new && <NewTag />}
        <CardBody>
          <CardTitle className="mt-50 active-project-title truncate-2 mb-50 d-none">{data?.project?.name}</CardTitle>
          <div className="d-flex">
            <RatingBadge number="0" />
            <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
          </div>

          <UserSection
            totalCount={data?.team_members_count || data?.workers_count}
            tagName="Team"
            name={data?.name}
            users={users}
            projectName={data?.project?.name}
          />
          <div className="design-planning-wrapper pt-5 d-none">
            <div className="design-planning">
              <CardText className="mb-25">Earned</CardText>
              <h6 className="mb-0">{`$ ${data?.project?.earned ?? 0}`}</h6>
            </div>
            <div className="design-planning">
              <CardText className="mb-25">New Amt</CardText>
              <h6 className="mb-0">{`$ ${data?.project?.newAmt ?? 0}`}</h6>
            </div>
          </div>
          <div
            onClick={handleRedirect}
            className="cursor-pointer font-weight-normal text-center text-primary project-cta mt-25"
          >
            View Invites
          </div>
        </CardBody>
      </Card>
    </ProjectWrapper>
  );
};

TeamInvitaionCard.propTypes = {
  accordionName: PropTypes.string,
  data: PropTypes.object,
  className: PropTypes.string,
};
export default TeamInvitaionCard;
