/* eslint-disable no-unsafe-optional-chaining */
import React from 'react';
import Proptypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import { ProjectWrapper } from './style';
import NewTag from '../../../@core/components/new-tag';
import DurationSegment from './DurationSegment';
import { truncateSentence } from '../../../utility/Utils';

const WithdrawnProjectCardForClient = ({ data, className }) => {
  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design new-tag-relative-card">
        {!data?.project?.is_read && <NewTag />}
        <CardBody>
          <p className="truncate-2 mt-1" style={{ height: '40px', color: 'black' }}>
            {truncateSentence({ sentence: data?.project?.name, maxCharacters: 30 })}
          </p>
          {/* <p className="active-project-simple-heading">Project</p> */}
          <DurationSegment
            start_date={data?.project?.expected_start_date}
            end_date={data?.project?.listing_end_date}
            showStartDate={false}
            showEndDate={false}
            showWithdrawnDate
            withdrawnDate={data?.project?.updated_at}
          />
        </CardBody>
      </Card>
    </ProjectWrapper>
  );
};

export default WithdrawnProjectCardForClient;

WithdrawnProjectCardForClient.propTypes = {
  data: Proptypes.object,
  className: Proptypes.string,
};

WithdrawnProjectCardForClient.defaultProps = {
  data: {},
  className: '',
};
