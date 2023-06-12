import React from 'react';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { AlertCardWrapper } from './style';
import NoMeeting from '../../../assets/images/meetings.gif';

const Meetings = () => (
  <AlertCardWrapper>
    <Card>
      <CardHeader className="earning-head">
        <CardTitle tag="h4">Meetings</CardTitle>
        <CardText className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary">
          View All
        </CardText>
      </CardHeader>
      <Card className="card-inside">
        <CardBody className="d-flex flex-column justify-content-center">
          <img src={NoMeeting} alt="no-meetings" className="no-meetings-gif" />
          <CardText className="text-center card-text font-medium-1 fw-bold mb-1 text-primary">No Meetings</CardText>
        </CardBody>
      </Card>
    </Card>
  </AlertCardWrapper>
);

export default Meetings;
