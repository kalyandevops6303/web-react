/* eslint-disable no-unsafe-optional-chaining */
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
import { useDispatch } from 'react-redux';

import { ProjectWrapper } from './style';
import ProjectModal from '../../modals/ProjectModal';
import RatingBadge from '../../../@core/components/rating-group/RatingBadge';
import { userTypes } from '../../../utility/constants/Constant';
import NewTag from '../../../@core/components/new-tag';
import { updateCardStatus } from '../../../redux/actions/dashboardActions';

const MyTeamCard = ({ accordionName, data, className }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [isNewTag, setIsNewTag] = useState(true);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  const users = [];
  data?.team_members?.map((user) =>
    users.push({
      user_id: user?.user_id,
      user_type: userTypes.talent,
      title: `${user?.first_name} ${user?.last_name} ` || 'user',
      img: user.image_uri || avatar7,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    }),
  );

  const updateCard = () => {
    const onSuccess = () => {
      setIsNewTag(false);
    };
    const postData = {
      metadata: {
        team_id: data?._id,
      },
      type: accordionName,
    };
    dispatch(updateCardStatus({ data: postData, onSuccess }));
  };

  const handleViewTeam = (id) => {
    updateCard();
    navigate(`/profile/team/${id}`);
  };

  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design new-tag-relative-card">
        {isNewTag && <NewTag />}
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
                    data={[
                      ...users.slice(0, 3).map((user) => ({
                        ...user,
                        tooltipId: `${data?.name}-${user.title}`.replace(/[^a-zA-Z0-9-]/g, '-'),
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
                      tooltipId: `${data?.name}-${user.title}`.replace(/[^a-zA-Z0-9-]/g, '-'),
                    })),
                  ]}
                />
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
  accordionName: PropTypes.string,
  data: PropTypes.object,
  className: PropTypes.string,
};
export default MyTeamCard;
