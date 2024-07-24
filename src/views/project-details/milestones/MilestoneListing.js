import React from 'react';

import { ChevronRight } from 'react-feather';
import { Badge, Card, CardBody, CardText } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import AvatarGroup from '@components/avatar-group';

import { convertUnixTimestampToDate } from '../../../utility/Utils';
import MilestoneInfo from './MilestoneInfo';
import { userTypes } from '../../../utility/constants/Constant';
import { CustomBadge } from '../../styled';
import { selectSavedUserData } from '../../../redux/selectors/authSelectors';

const getTagSettings = (tag) => {
  if (tag === 'COMPLETED') {
    return { theme: 'light-success', text: 'Completed' };
  }
  if (tag === 'CREATED') {
    return { theme: 'light-success', text: 'Created' };
  }
  if (tag === 'IN_PROGRESS') {
    return { theme: 'light-warning', text: 'In Progress' };
  }
  if (tag === 'ON_GOING') {
    return { theme: 'light-warning', text: 'On Going' };
  }
  if (tag === 'YET_TO_START') {
    return { theme: 'light-success', text: 'Yet to Start' };
  }
  if (tag === 'IN_REVIEW') {
    return { theme: 'light-primary', text: 'In Review' };
  }
  return { theme: 'light-primary', text: tag };
};

const getCompletedDate = (mile, savedUserData) => {
  let result;
  switch (true) {
    // To set the completed date for older milestones, since it was blank
    case mile.end_date === 0 && mile?.status === 'COMPLETED':
      result = convertUnixTimestampToDate(mile.updated_at, savedUserData?.availability?.timezone?.name || 'America/New_York');
      break;
    case mile.end_date > 0:
      result = convertUnixTimestampToDate(mile.end_date, savedUserData?.availability?.timezone?.name || 'America/New_York');
      break;
    default:
      result = '-';
  }
  return result;
};

const MilestoneListing = ({ milestonesData }) => {
  const params = useParams();
  const navigate = useNavigate();
  const savedUserData = useSelector(selectSavedUserData);
  return (
    <div>
      {milestonesData.map((mile, index) => (
        <Card
          className="cursor-pointer"
          onClick={() => navigate(`/project-details/${params?.projectId}/milestone-details/${mile._id}`)}
          key={mile._id}
        >
          <CardBody className="py-1 basic-title">
            <div className="d-flex align-items-center justify-content-between">
              <CardText className="fw-bold mb-0">Milestone #{mile?.seq}</CardText>
              <div style={{ width: '60%' }} className="d-flex align-items-center justify-content-between">
                <div className="me-2">
                  {mile.workers.length > 3 ? (
                    <span className="d-flex avatars">
                      <AvatarGroup
                        totalCount={mile.workers.length}
                        size="sm"
                        className="mr-4"
                        data={[
                          // eslint-disable-next-line no-unsafe-optional-chaining
                          ...mile?.workers?.slice(0, 3)?.map((worker) => ({
                            user_id: worker?.user_id,
                            user_type: userTypes.talent,
                            title: `${worker?.first_name} ${worker?.last_name} ` || 'user',
                            img: worker.image_uri || defaultAvatar,
                            placement: 'bottom',
                            imgHeight: 33,
                            imgWidth: 33,
                            tooltipId: `tooltip-${worker?.first_name?.replace(
                              /\s+/g,
                              '-',
                            )}-${worker?.last_name?.replace(/\s+/g, '-')}`,
                          })),
                        ]}
                      />
                    </span>
                  ) : (
                    <AvatarGroup
                      size="sm"
                      data={[
                        // eslint-disable-next-line no-unsafe-optional-chaining
                        ...mile?.workers?.map((worker) => ({
                          user_id: worker?.user_id,
                          user_type: userTypes.talent,
                          title: `${worker?.first_name} ${worker?.last_name} ` || 'user',
                          img: worker.image_uri || defaultAvatar,
                          placement: 'bottom',
                          imgHeight: 33,
                          imgWidth: 33,
                          tooltipId: `tooltip-${worker?.first_name?.replace(/\s+/g, '-')}-${worker?.last_name?.replace(
                            /\s+/g,
                            '-',
                          )}`,
                        })),
                      ]}
                    />
                  )}
                </div>

                <section className="d-flex align-items-center">
                  <CustomBadge>
                    <Badge color="badge" className={`${mile?.status}`}>
                      {getTagSettings(mile.status).text}
                    </Badge>
                  </CustomBadge>
                  <div className="ms-2">
                    <CardText className="fw-normal mb-0 fs-6">Start Date</CardText>
                    <CardText className="fw-bolder fs-5 mb-0">
                      {/* {mile.start_date ? formatDate(mile.start_date) : '-'} */}
                      { mile.start_date ? convertUnixTimestampToDate(mile.start_date, savedUserData?.availability?.timezone?.name || 'America/New_York') : '-'}
                    </CardText>
                  </div>
                  <div className="mx-2">
                    <CardText className="fw-normal mb-0 fs-6">Completed On</CardText>
                    <CardText className="fw-bolder fs-5 mb-0">{getCompletedDate(mile, savedUserData)}</CardText>
                  </div>
                  <ChevronRight color="#B9B9C3" />
                </section>
              </div>
            </div>
          </CardBody>
          <MilestoneInfo milestonesData={milestonesData} currentIndex={index} />
        </Card>
      ))}
    </div>
  );
};

MilestoneListing.propTypes = {
  milestonesData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MilestoneListing;
