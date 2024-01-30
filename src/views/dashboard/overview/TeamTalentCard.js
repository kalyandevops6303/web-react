/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/require-default-props */
// ** Third Party Components
import PropTypes from 'prop-types';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
// ** Custom Components
import AvatarGroup from '@components/avatar-group';

// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap';

// ** Avatar Imports
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectWrapper } from './style';
import theme from '../../../configs/themeVariables';
import ProjectModal from '../../modals/ProjectModal';
import TagsSection from './TagsSection';
import RatingBadge from '../../../@core/components/rating-group/RatingBadge';
import { selectIsTeamLoggedIn, selectUserData } from '../../../redux/selectors/authSelectors';
import AlmaMaterImg from '../../../assets/images/almaMater.png';
import { returnFormattedRating } from '../../../utility/Utils';
import { clubStatus, userTypes } from '../../../utility/constants/Constant';
import { setItemFromSession } from '../../../utility/sessesionStorageControl';
import NewTag from '../../../@core/components/new-tag';
import { updateCardStatus } from '../../../redux/actions/dashboardActions';

const UserSection = ({ totalCount, users, name, isAlma }) => (
  <div className="user-section">
    <CardText className="truncate-2 active-project-users">{name}</CardText>
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
                tooltipId: `${name}-${user.title}`.replace(/[^a-zA-Z0-9-]/g, '-'),
              })),
            ]}
          />
          {isAlma && <img src={AlmaMaterImg} alt="alma-mater" />}
        </span>
      ) : (
        <span className="d-flex avatars">
          <AvatarGroup
            size="sm"
            data={[
              ...users?.map((user) => ({ ...user, tooltipId: `${name}-${user.title}`.replace(/[^a-zA-Z0-9-]/g, '-') })),
            ]}
          />
          {isAlma && <img src={AlmaMaterImg} alt="alma-mater" />}
        </span>
      )}
    </div>
  </div>
);

UserSection.propTypes = {
  users: PropTypes.array,
  name: PropTypes.string,
  isAlma: PropTypes.bool,
  totalCount: PropTypes.number,
};

const TeamTalentCard = ({ accordionName, isRecommendedTeam, open, data, className }) => {
  const [showModal, setShowModal] = useState(false);
  const isTeamLoggedIn = useSelector(selectIsTeamLoggedIn);
  const userDetailsData = useSelector(selectUserData);

  const [isNewTag, setIsNewTag] = useState(true);

  const dispatch = useDispatch();

  const isDisabled = userDetailsData?.club_status === clubStatus.IN_REVIEW;
  const navigate = useNavigate();

  const handleToggle = () => {
    setShowModal(!showModal);
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

  const giveStrokeColor = (percentage) => {
    if (percentage <= 40) {
      return theme.red;
      // eslint-disable-next-line
    } else if (percentage > 40 && percentage <= 70) {
      return theme.orange;
    } else {
      return theme.green;
    }
  };

  const updateCard = () => {
    const onSuccess = () => {
      setIsNewTag(false);
    };
    const postData = {
      type: accordionName,
    };
    dispatch(updateCardStatus({ data: postData, onSuccess }));
  };

  const handleViewTeam = (id) => {
    updateCard();
    setItemFromSession('team_id', id);
    navigate(`/profile/team/${id}`);
  };

  const handleViewTalent = (id) => {
    updateCard();
    navigate(`/profile/talent/${id}`);
  };

  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design new-tag-relative-card">
        {isNewTag && <NewTag />}
        <CardBody>
          {isRecommendedTeam ? (
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
              <TagsSection open={open} tags={data?.expertise?.skills ?? data?.skills} />
            </div>
          ) : (
            <TagsSection fullWidth open={open} tags={data?.expertise?.skills ?? data?.skills} />
          )}
          <div className="d-flex flex-column">
            <div className="d-flex">
              <RatingBadge number={returnFormattedRating(data?.rating) || 0} />
              <CardText className="ps-1 font-small-3 fw-300 rating-label">
                {data?.projects_worked_on_count || 0} Projects
              </CardText>
            </div>
          </div>

          <div className="main-row">
            {isRecommendedTeam ? (
              <>
                <UserSection
                  totalCount={data?.team_members_count || data?.workers_count}
                  tagName="Team"
                  name={data?.name}
                  users={users}
                  isAlma={data?.is_alma_mater}
                />
                <div className="bottom-detail d-flex mt-1">
                  <div className="design-planning-wrapper">
                    {/* <div className="design-planning">
                      <CardText className="mb-25">Start date</CardText>
                      <h6 className="mb-0">{`${
                        DateTime.fromMillis(data?.listing_details?.start_date_epoch).toFormat('MMM dd, yy') || '-'
                      }`}</h6>
                    </div> */}
                  </div>
                </div>
              </>
            ) : (
              <>
                <UserSection
                  totalCount={data?.team_members_count || data?.workers_count}
                  tagName="Client"
                  name={`${data?.first_name} ${data?.last_name}`}
                  users={[
                    {
                      user_type: userTypes.talent,
                      user_id: data?.user_id,
                      title: `${data?.first_name} ${data?.last_name}`,
                      img: data?.image_uri || avatar7,
                      placement: 'bottom',
                      imgHeight: 33,
                      imgWidth: 33,
                    },
                  ]}
                  isAlma={data?.is_alma_mater}
                />
                <div className="circular-progressbar-container-large mt-1">
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
              </>
            )}
          </div>
          {isTeamLoggedIn ? (
            <div className="cursor-pointer font-weight-normal text-center text-primary project-cta mt-1">
              {isDisabled ? (
                <span className="text-muted cursor-not-allowed">View Talent Profile</span>
              ) : (
                <span onClick={() => handleViewTalent(data?.user_id)}>View Talent Profile</span>
              )}
            </div>
          ) : (
            <div
              className="cursor-pointer font-weight-normal text-center text-primary project-cta mt-50"
              onClick={() => handleViewTeam(data?._id)}
            >
              View Team
            </div>
          )}
        </CardBody>
      </Card>
      {showModal && <ProjectModal data={data} modal={showModal} toggleModal={handleToggle} />}
    </ProjectWrapper>
  );
};

TeamTalentCard.propTypes = {
  accordionName: PropTypes.string,
  data: PropTypes.object,
  className: PropTypes.string,
  isRecommendedTeam: PropTypes.bool,
  open: PropTypes.string,
};
export default TeamTalentCard;
