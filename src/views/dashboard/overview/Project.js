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
import { DateTime } from 'luxon';
import { ProjectWrapper } from './style';
import theme from '../../../configs/themeVariables';
import ProjectModal from '../../modals/ProjectModal';
import { CustomBadge } from '../../styled';
import TagsSection from './TagsSection';

const UserSection = ({ users, tagName, name, isAlma }) => (
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
  isAlma: PropTypes.bool,
  name: PropTypes.string,
  tagName: PropTypes.string,
};

const Project = ({ open, data, className, recommended }) => {
  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  const avatarGroupArr = [
    {
      title: 'Billy Hopkins',
      img: avatar7,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: 'Amy Carson',
      img: avatar7,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: 'Brandon Miles',
      img: avatar7,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: 'Daisy Weber',
      img: avatar7,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: 'Jenny Looper',
      img: avatar7,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
  ];

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

  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design">
        <CardBody>
          <CustomBadge>
            <Badge className={`${data?.status}`} color="badge">
              {statusEnum[data?.status]}
            </Badge>
          </CustomBadge>
          <CardTitle className="mt-50 active-project-title truncate-2 mb-1.5">
            {/* {recommendedProjectsData?.data?.details?.name} */}
            {data?.details.name}
          </CardTitle>
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
                  title: `${data?.client_info?.first_name} ${data?.client_info?.last_name}`,
                  img: data?.client_info?.image_uri || avatar7,
                  placement: 'bottom',
                  imgHeight: 33,
                  imgWidth: 33,
                },
              ]}
              isAlma={data?.client_info?.is_alma_matter}
            />
            {!recommended && <UserSection tagName="Team" name={data.teamName} users={avatarGroupArr} />}
          </div>
          {!recommended && (
            <div className="design-group mb-50 pt-2">
              <h6 className="section-label">Milestone 2</h6>
            </div>
          )}
          <div className="bottom-detail d-flex mt-1">
            <div className="design-planning-wrapper">
              <div className="design-planning">
                <CardText className="mb-25">Start date</CardText>
                <h6 className="mb-0">{`${
                  DateTime.fromMillis(data?.listing_details?.start_date_epoch).toFormat('MMM dd, yy') || '-'
                }`}</h6>
              </div>
              {!data?.pay_type?.variable_cost && (
                <div className="design-planning">
                  <CardText className="mb-25">Amount</CardText>
                  <h6 className="mb-0">{`${data?.pay_type.currency?.code}-${data?.pay_type.fixed_cost}`}</h6>
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
      {showModal && <ProjectModal data={data} modal={showModal} toggleModal={handleToggle} />}
    </ProjectWrapper>
  );
};

Project.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
  recommended: PropTypes.bool,
  open: PropTypes.string,
};
export default Project;
