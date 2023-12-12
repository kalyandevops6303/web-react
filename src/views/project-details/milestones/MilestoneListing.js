import React from 'react';

import { ChevronRight } from 'react-feather';
import { Badge, Card, CardBody, CardText } from 'reactstrap';
import { PropTypes } from 'prop-types';
import AvatarGroup from '@components/avatar-group';

import { formatDate } from '../../../utility/Utils';
import MilestoneInfo from './MilestoneInfo';

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
    return { theme: 'light-success', text: 'Yet to start' };
  }
  if (tag === 'IN_REVIEW') {
    return { theme: 'light-primary', text: 'In Review' };
  }
  return { theme: 'light-primary', text: tag };
};

const getCompletedDate = (mile) => {
  let result;
  switch (true) {
    // To set the completed date for older milestones, since it was blank
    case mile.end_date === 0 && mile.status === 'COMPLETED':
      result = formatDate(mile.updated_at);
      break;
    case mile.end_date > 0:
      result = formatDate(mile.end_date);
      break;
    default:
      result = '-';
  }
  return result;
};

const users = [
  {
    user_id: '64c21be7ac3eff2cc24be84c',
    member_type: 'MEMBER',
    first_name: 'Nilesh130',
    title: 'Nilesh130',
    last_name: 'Dangi130',
    image_uri: '',
    projects_worked_on_count: 0,
    tagline: 'asdsadsa',
    hourly_rate: 250,
    work_experience: 0,
    rating: 0,
    professional_intro: 'sadsadsad',
  },
  {
    user_id: '64b7c4d28092ba3f44b80f16',
    member_type: 'MEMBER',
    first_name: 'Nilesh121',
    title: 'Nilesh121',
    last_name: 'Dangi121',
    image_uri: '',
    projects_worked_on_count: 0,
    tagline: 'dsadxasdas',
    hourly_rate: 400,
    work_experience: 0,
    rating: 0,
    professional_intro: 'asdasdasd',
  },
  {
    user_id: '64e373744556ff69c1e31be5',
    member_type: 'MEMBER',
    first_name: 'Reena',
    last_name: 'Jain',
    title: 'Reena',
    image_uri:
      'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/8387eb29-18c4-4ebc-b137-a0ebbf3cb9a4.jpeg',
    projects_worked_on_count: 3,
    tagline: 'Engineering Data bit by bit',
    hourly_rate: 150,
    work_experience: 12,
    rating: 5,
    professional_intro: 'ABCG',
  },
  {
    user_id: '64e373744556ff69c1e31be3',
    member_type: 'MEMBER',
    first_name: 'Reena',
    last_name: 'Jain',
    title: 'Reena',
    image_uri:
      'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64e373744556ff69c1e31be5/8387eb29-18c4-4ebc-b137-a0ebbf3cb9a4.jpeg',
    projects_worked_on_count: 3,
    tagline: 'Engineering Data bit by bit',
    hourly_rate: 150,
    work_experience: 12,
    rating: 5,
    professional_intro: 'ABCG',
  },
];

const MilestoneListing = ({ setSelectedMilestoneIndex, milestonesData }) => (
  <div>
    {milestonesData.map((mile, index) => (
      <Card className="cursor-pointer" onClick={() => setSelectedMilestoneIndex(index)} key={mile._id}>
        <CardBody className="py-1 basic-title">
          <div className="d-flex align-items-center justify-content-between">
            <CardText className="fw-bold mb-0">{mile.name}</CardText>
            <div style={{ width: '60%' }} className="d-flex align-items-center justify-content-between">
              <div className="me-2">
                {users.length > 3 ? (
                  <span className="d-flex avatars">
                    <AvatarGroup totalCount={users.length} size="sm" className="mr-4" data={users.slice(0, 3)} />
                  </span>
                ) : (
                  <AvatarGroup size="sm" data={users} />
                )}
              </div>

              <section className="d-flex align-items-center">
                <Badge color={getTagSettings(mile.status).theme}>{getTagSettings(mile.status).text}</Badge>
                <div className="ms-2">
                  <CardText className="fw-normal mb-0 fs-6">Start Date</CardText>
                  <CardText className="fw-bolder fs-5 mb-0">
                    {mile.start_date ? formatDate(mile.start_date) : '-'}
                  </CardText>
                </div>
                <div className="mx-2">
                  <CardText className="fw-normal mb-0 fs-6">Completed</CardText>
                  <CardText className="fw-bolder fs-5 mb-0">{getCompletedDate(mile)}</CardText>
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

MilestoneListing.propTypes = {
  setSelectedMilestoneIndex: PropTypes.func.isRequired,
  milestonesData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MilestoneListing;
