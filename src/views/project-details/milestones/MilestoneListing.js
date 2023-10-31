import React from 'react';
import { ChevronRight } from 'react-feather';
import { Badge, Card, CardBody, CardText } from 'reactstrap';
import { PropTypes } from 'prop-types';

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

const MilestoneListing = ({ setSelectedMilestoneIndex, milestonesData }) => (
  <div>
    {milestonesData.map((mile, index) => (
      <Card className="cursor-pointer" onClick={() => setSelectedMilestoneIndex(index)} key={mile._id}>
        <CardBody className="py-1 basic-title">
          <div className="d-flex align-items-center justify-content-between">
            <CardText className="fw-bold mb-0">{mile.name}</CardText>
            <div className="d-flex align-items-center">
              <Badge color={getTagSettings(mile.status).theme}>{getTagSettings(mile.status).text}</Badge>
              <div className="ms-2">
                <CardText className="fw-normal mb-0 fs-6">Start Date</CardText>
                <CardText className="fw-bolder fs-5 mb-0 text-center">
                  {mile.start_date ? formatDate(mile.start_date) : '-'}
                </CardText>
              </div>
              <div className="mx-2">
                <CardText className="fw-normal mb-0 fs-6">End Date</CardText>
                <CardText className="fw-bolder fs-5 mb-0 text-center">
                  {mile.end_date ? formatDate(mile.end_date) : '-'}
                </CardText>
              </div>
              <ChevronRight color="#B9B9C3" />
            </div>
          </div>
        </CardBody>
        {index === 0 ? <MilestoneInfo /> : null}
      </Card>
    ))}
  </div>
);

MilestoneListing.propTypes = {
  setSelectedMilestoneIndex: PropTypes.func.isRequired,
  milestonesData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MilestoneListing;
