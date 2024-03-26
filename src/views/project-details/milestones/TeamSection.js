import React from 'react';
import { CardText, Col, Row } from 'reactstrap';

const TeamSection = () => (
  <div style={{ padding: '2rem' }} className="w-100 white-card medium-shadow">
    <div className="pb-0">
      <CardText className="fs-4 mb-0 fw-bold">Team Member(s)</CardText>
    </div>
    <Row className="mt-2 w-100">
      <Col sm="12" md="12" lg="4">
        <p className="content-header fw-bold mb-25">Team Member</p>
      </Col>
      <Col sm="12" md="12" lg="3">
        <p className="content-header fw-bold mb-25">Designation</p>
      </Col>
      <Col sm="12" md="12" lg="2">
        <p className="content-header fw-bold mb-25">Duration</p>
      </Col>
      <Col sm="12" md="12" lg="2">
        <p className="content-header fw-bold mb-25">Amount</p>
      </Col>
    </Row>
    <div className="w-100">
      {/* {selectedMilestone?.workers?.map((worker) => (
          <Row className="mt-1 w-100" key={worker?.role}>
            <Col sm="12" md="12" lg="4">
              <div className="d-flex align-items-center">
                <Avatar
                  img={worker?.image_uri?.length > 0 ? worker?.image_uri : defaultAvatar}
                  imgHeight="32"
                  imgWidth="32"
                  className="me-50"
                />
                {worker?.user_id ? (
                  <p className="fw-bolder content-description m-0 ms-50">
                    {worker?.first_name} {worker?.last_name}
                  </p>
                ) : (
                  <p className="fw-bolder to-be-assigned-text m-0 ms-50">To be assigned</p>
                )}
              </div>
            </Col>
            <Col sm="12" md="12" lg="3">
              <p className="fw-bold content-description">{worker?.role}</p>
            </Col>
            <Col sm="12" md="12" lg="2">
              <p className="fw-bold content-description">{worker?.number_of_weeks} week</p>
            </Col>
            <Col sm="12" md="12" lg="2">
              <p className="fw-bold content-description">${worker?.amount || 0}</p>
            </Col>
          </Row>
        ))} */}
    </div>
  </div>
);

export default TeamSection;
