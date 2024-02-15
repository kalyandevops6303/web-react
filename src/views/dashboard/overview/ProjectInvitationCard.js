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
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';

const UserSection = ({ totalCount, users, name, projectName }) => (
  <div className={`${projectName ? '' : 'mt-1'} user-section`}>
    {projectName && <CardText className="mt-1 truncate-2 active-project-users">{name}</CardText>}
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

const ProjectInvitaionCard = ({ accordionName, data, className }) => {
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
    if (data?.is_read === false) {
      updateCard();
    }
    if (data?.project?._id && data?.request_id) {
      navigate(`/project-details/${data?.project?._id}/project/project-invitation/${data?.request_id}`);
    } else {
      ShowToastMessage(ERROR, 'Insufficient data to redirect');
    }
  };

  const users = [];

  data?.invitation_by?.team_members?.map((user) =>
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
      <Card className="card-app-design new-tag-relative-card" style={{ height: '230px' }}>
        {!data?.is_new && <NewTag />}
        <CardBody className="d-flex flex-column justify-content-between">
          <div>
            <CardTitle
              className={`${
                data?.project?.details?.name ? '' : 'max-height'
              } mt-50 active-project-title truncate-2 mb-50`}
            >
              {data?.project?.details?.name || data?.name}
            </CardTitle>

            <div className="d-flex">
              <RatingBadge number="0" />
              <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
            </div>
            <UserSection
              totalCount={
                data?.invitation_by?.team_members_count || data?.invitation_by?.workers_count || data?.workers_count
              }
              tagName="Team"
              name={data?.invitation_by?.name}
              users={users}
              projectName={data?.project?.details?.name}
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
          </div>
          <div
            onClick={handleRedirect}
            className={`${
              data?.project?.details?.name ? '' : ''
            } cursor-pointer font-weight-normal text-center text-primary project-cta mt-25`}
          >
            View Invites
          </div>
        </CardBody>
      </Card>
    </ProjectWrapper>
  );
};

ProjectInvitaionCard.propTypes = {
  accordionName: PropTypes.string,
  data: PropTypes.object,
  className: PropTypes.string,
};
export default ProjectInvitaionCard;
