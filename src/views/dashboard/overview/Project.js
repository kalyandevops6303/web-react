/* eslint-disable react/require-default-props */
// ** Third Party Components
import PropTypes from 'prop-types';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
// ** Custom Components
import AvatarGroup from '@components/avatar-group';

// ** Reactstrap Imports
import { Card, CardTitle, CardBody, CardText, Badge } from 'reactstrap';

// ** Avatar Imports
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import hat from '@src/assets/images/hat.png';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ProjectWrapper } from './style';
import DateTime from '../../../lib/date-time';

import theme from '../../../configs/themeVariables';
import ProjectModal from '../../modals/ProjectModal';
import { CustomBadge } from '../../styled';
import TagsSection from './TagsSection';
import CreateBidModal from '../../modals/CreateBidModal';
import CompleteProfileModal from '../../modals/CompleteProfileModal';
import { userTypes } from '../../../utility/constants/Constant';
import NewTag from '../../../@core/components/new-tag';
import { updateCardStatus } from '../../../redux/actions/dashboardActions';

const UserSection = ({ totalCount, users, tagName, name, isAlma }) => (
  <div className="user-section">
    <div className="d-flex">
      <Badge className="rounded light-client" color={`light-client'}`}>
        {tagName}
      </Badge>
      {isAlma && (
        <Badge className="client-badge">
          <img src={hat} alt="client-badge" />
        </Badge>
      )}
    </div>
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
  isAlma: PropTypes.bool,
  name: PropTypes.string,
  tagName: PropTypes.string,
  totalCount: PropTypes.number,
};

const Project = ({ accordionName, open, data, className }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setShowModal(!showModal);
  };

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

  const statusEnum = {
    OPEN: 'Open Listing',
    IN_REVIEW: 'In Review',
    TERMINATED: 'Terminated',
    CLOSED: 'Closed',
    LISTING_EXPIRED: 'Listing Expired',
  };

  const [createBidModal, setCreateBidModal] = useState(null);
  const [completeProfileModal, setCompleteProfileModal] = useState(null);

  const toggleCreateBidModal = () => {
    setCreateBidModal(!createBidModal);
  };

  const toggleCompleteProfileModal = () => {
    setShowModal(false);
    setCompleteProfileModal(!completeProfileModal);
  };

  const updateCard = () => {
    const postData = {
      metadata: {
        project_id: data._id,
      },
      type: accordionName,
    };
    if (data?.is_read === false) {
      dispatch(updateCardStatus({ id: data?._id, data: postData, type: 'recommendedProjects' }));
    }
  };
  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design new-tag-relative-card">
        {!data?.is_read && <NewTag />}
        <CardBody>
          <CustomBadge>
            <Badge className={`${data?.status}`} color="badge">
              {statusEnum[data?.status]}
            </Badge>
          </CustomBadge>
          <CardTitle className="mt-50 active-project-title truncate-2 mb-1.5">{data?.details.name}</CardTitle>
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
            <TagsSection open={open} tags={data?.proficiency.skills} />
          </div>
          <div className="main-row">
            <UserSection
              tagName="Client"
              name={`${data?.client_info?.first_name} ${data?.client_info?.last_name}`}
              users={[
                {
                  user_type: userTypes.client,
                  user_id: data?.client_info?.user_id,
                  title: `${data?.client_info?.first_name} ${data?.client_info?.last_name}`,
                  img: data?.client_info?.image_uri || avatar7,
                  placement: 'bottom',
                  imgHeight: 33,
                  imgWidth: 33,
                  tooltipId: `tooltip-${data?.client_info?.first_name?.replace(
                    /\s+/g,
                    '-',
                  )}-${data?.client_info?.last_name?.replace(/\s+/g, '-')}`,
                },
              ]}
              isAlma={data?.client_info?.is_alma_mater}
            />
          </div>

          <div className="bottom-detail d-flex mt-1">
            <div className="design-planning-wrapper">
              <div className="design-planning">
              <p className="mb-25" style={{ color: '#B9B9C3', fontSize: '1.2rem' }}>Start date</p>
              <p style={{ color: 'black', fontSize: '1.2rem' }} className="mb-0">{`${
                  DateTime.fromMillis(data?.listing_details?.start_date_epoch).toFormat('MMM dd, yy') || '-'
                }`}</p>
              </div>
              {!data?.pay_type?.variable_cost && (
                <div className="design-planning">
                  <p className="mb-25" style={{ color: '#B9B9C3', fontSize: '1.3rem' }}>Amount</p>
                  <p style={{ color: 'black', fontSize: '1.3rem' }} className="mb-0">{`${data?.pay_type.currency?.code}-${data?.pay_type.fixed_cost}`}</p>
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => setShowModal(true)}
            className="cursor-pointer font-weight-normal text-center text-primary project-cta mt-25"
          >
            View Project
          </div>
        </CardBody>
      </Card>
      {showModal && (
        <ProjectModal
          cardData={data}
          onUpdateCard={updateCard}
          data={data}
          modal={showModal}
          toggleModal={handleToggle}
          setCreateBidModal={setCreateBidModal}
          toggleCompleteProfileModal={toggleCompleteProfileModal}
          isMyTeam={false}
        />
      )}
      {createBidModal && (
        <CreateBidModal modal={createBidModal} toggleModal={toggleCreateBidModal} selectedProject={data} />
      )}
      {completeProfileModal && (
        <CompleteProfileModal
          modal={completeProfileModal}
          toggleModal={toggleCompleteProfileModal}
          modalInfoText="create bid"
        />
      )}
    </ProjectWrapper>
  );
};

Project.propTypes = {
  accordionName: PropTypes.string,
  data: PropTypes.object,
  className: PropTypes.string,
  open: PropTypes.string,
};
export default Project;
