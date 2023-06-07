import React from 'react';
import { Card, CardBody, CardHeader, CardText, CardTitle, Progress } from 'reactstrap';
import { AlertCardWrapper } from './style';

const Alerts = () => (
  <AlertCardWrapper>
    <Card>
      <CardHeader className="earning-head">
        <CardTitle tag="h4">Alerts</CardTitle>
        <CardText className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary">
          View All
        </CardText>
      </CardHeader>
      <Card className="card-inside">
        <CardHeader>
          <CardTitle tag="h4">Profile Completion!</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText className="mb-50">
            Make it easier for others to find you by <br /> completing your profile.
          </CardText>
          <span className="font-weight-bold percentage ">45%</span>
          <Progress style={{ height: '0.5rem' }} className="progress-bar-success mt-25" value={45} />
          <div className="mt-2 font-weight-normal text-center text-primary add-det mt-25">
            Add your Availability 15%.
          </div>
        </CardBody>
      </Card>

      <Card className="card-inside">
        <CardHeader>
          <CardTitle tag="h4">Upcoming Projects</CardTitle>
          <CardText className="card-text font-small-3 me-25 mb-0">1 hour ago</CardText>
        </CardHeader>
        <CardBody className="d-flex justify-content-between align-items-center">
          <CardText className="mb-50">New Application Research </CardText>
          <span className="font-weight-normal text-center text-primary add-det mt-25">View Project</span>
        </CardBody>
      </Card>

      <Card className="card-inside">
        <CardHeader>
          <CardTitle tag="h4">Team Invitations</CardTitle>
          <CardText className="card-text font-small-3 me-25 mb-0">1 hour ago</CardText>
        </CardHeader>
        <CardBody className="d-flex justify-content-between align-items-center">
          <CardText className="mb-50">New Application Research </CardText>
          <span className="font-weight-normal text-center text-primary add-det mt-25">View Project</span>
        </CardBody>
      </Card>

      <Card className="card-inside">
        <CardHeader>
          <CardTitle tag="h4">Upcoming Projects</CardTitle>
          <CardText className="card-text font-small-3 me-25 mb-0">1 hour ago</CardText>
        </CardHeader>
        <CardBody className="d-flex justify-content-between align-items-center">
          <CardText className="mb-50">New Application Research </CardText>
          <span className="font-weight-normal text-center text-primary add-det mt-25">View Project</span>
        </CardBody>
      </Card>
    </Card>
  </AlertCardWrapper>
);
export default Alerts;
