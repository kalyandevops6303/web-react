/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/require-default-props */
// ** Third Party Components
import PropTypes from 'prop-types';
// ** Custom Components
import AvatarGroup from '@components/avatar-group';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

// ** Reactstrap Imports
import { useNavigate } from 'react-router';
import { Badge, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
// ** Avatar Imports
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';

import { DateTime } from 'luxon';
import theme from '../../../configs/themeVariables';
import { ProjectWrapper } from './style';
import { userTypes, minimumAvatarLength } from '../../../utility/constants/Constant';
import NewTag from '../../../@core/components/new-tag';
import { updateCardStatus } from '../../../redux/actions/dashboardActions';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';
import TagsSection from './TagsSection';
import { giveStrokeColor, generateToolTipId, roundOfAmount } from '../../../utility/Utils';

const UserSection = ({ totalCount, users, name, projectName, tagName }) => {
  const userSectionClasses = classNames({
    'mt-1': !projectName,
    'user-section': true,
  });
  const renderBadgeBasedOnTagName = () => {
    switch (tagName) {
      case userTypes.team:
        return (
          <Badge className="rounded talent-badge" color={`light-client'}`}>
            Team
          </Badge>
        );
      case userTypes.client:
        return (
          <Badge className="rounded light-client" color={`light-client'}`}>
            Client
          </Badge>
        );
      default:
        return null;
    }
  };
  return (
    <div className={userSectionClasses}>
      <div className="d-flex">{renderBadgeBasedOnTagName()}</div>
      {projectName && <CardText className="mt-1 truncate-2 active-project-users">{name}</CardText>}
      <div className="avatar-wrap">
        {users.length > minimumAvatarLength ? (
          <span className="d-flex avatars">
            <AvatarGroup
              totalCount={totalCount}
              size="sm"
              className="mr-4"
              data={[
                ...users.slice(0, 3).map((user) => ({
                  ...user,
                  tooltipId: generateToolTipId(projectName, name, user.title),
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
                tooltipId: generateToolTipId(projectName, name, user.title),
              })),
            ]}
          />
        )}
      </div>
    </div>
  );
};

UserSection.propTypes = {
  users: PropTypes.array,
  name: PropTypes.string,
  totalCount: PropTypes.number,
  projectName: PropTypes.string,
  tagName: PropTypes.string,
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

  const renderAmountBasedOnRequestEntity = () => {
    switch (data?.request_entity) {
      case userTypes.team:
        return (
          <div className="design-planning mt-1 bottom-detail-elements">
            <CardText className="mb-25">Amount</CardText>
            <h6 className="mb-0">{`${data?.project?.pay_type.currency?.code}-${roundOfAmount(
              data?.project?.amount,
            )}`}</h6>
          </div>
        );
      case userTypes.client:
        return !data?.pay_type?.variable_cost ? (
          <div className="design-planning mt-1 bottom-detail-elements">
            <CardText className="mb-25">Amount</CardText>
            <h6 className="mb-0">{`${data?.project?.pay_type.currency?.code}-${data?.project?.pay_type.fixed_cost}`}</h6>
          </div>
        ) : null;
      default:
        return null;
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
      <Card className="card-app-design new-tag-relative-card">
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

            {/* <div className="d-flex">
              <RatingBadge number="0" />
              <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
            </div> */}
            <div className="d-flex w-100 mb-1">
              <div className="circular-progressbar-container">
                <CircularProgressbarWithChildren
                  value={data?.match_percentage}
                  styles={{
                    path: {
                      stroke: giveStrokeColor(data?.match_percentage),
                      strokeLinecap: 'round',
                      transition: 'stroke-dashoffset 0.5s ease 0s',
                      transform: 'rotate(0turn)',
                      transformOrigin: 'center center',
                    },
                    trail: {
                      stroke: theme.progressBarBg,
                      strokeLinecap: 'round',
                      transform: 'rotate(0turn)',
                      transformOrigin: 'center center',
                    },
                  }}
                >
                  <div className="d-flex justify-content-center align-items-center">
                    <p className="percentage-text m-0">{data?.match_percentage}%</p>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
              <TagsSection open="" tags={data?.project.proficiency.skills} />
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <UserSection
                  tagName={userTypes.client}
                  name={data?.client?.company_name}
                  users={[
                    {
                      user_type: userTypes.client,
                      title: `${data?.client?.first_name} ${data?.client?.last_name}`,
                      user_id: data?.client?._id,
                      img: data?.client?.image_uri || avatar7,
                      placement: 'bottom',
                      imgHeight: 33,
                      imgWidth: 33,
                      tooltipId: `tooltip-${data?.client?.first_name?.replace(
                        /\s+/g,
                        '-',
                      )}-${data?.client_info?.last_name?.replace(/\s+/g, '-')}`,
                    },
                  ]}
                  projectName={data?.project?.details?.name}
                />
                <div className="design-planning mt-1 bottom-detail-elements">
                  <CardText className="mb-25">Start date</CardText>
                  <h6 className="mb-0">{`${
                    DateTime.fromMillis(data?.project?.listing_details?.start_date_epoch).toFormat('MMM dd, yy') || '-'
                  }`}</h6>
                </div>
              </div>
              <div>
                <UserSection
                  totalCount={
                    data?.invitation_by?.team_members_count || data?.invitation_by?.workers_count || data?.workers_count
                  }
                  tagName={userTypes.team}
                  name={data?.invitation_by?.name}
                  users={users}
                  projectName={data?.project?.details?.name}
                />
                {renderAmountBasedOnRequestEntity()}
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
