import React from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { GrayBorderContainer, GrayCardWrapper } from '../styled';
import InfoIcon from '../../assets/images/timeline-info-icon.png';

const TeamInvitation = () => {
  const breadCrumb = [{ title: 'Dashboard' }, { title: `Team Name` || 'User', link: '#' }];

  return (
    <>
      <BreadCrumbs data={breadCrumb} />
      <Row>
        <Col sm="12" md="12" lg="10">
          <GrayCardWrapper>
            <Card>
              <CardHeader className="p-0">
                <GrayBorderContainer className="w-100 px-2 pt-2 pb-1">
                  <h4 className="m-0">Team Acceptance</h4>
                </GrayBorderContainer>
              </CardHeader>
              <CardBody>
                <div className="d-flex mt-2 align-items-start">
                  <img src={InfoIcon} alt="info" className="mt-2 me-1" />
                  <Card className="white-card-bg w-100">
                    <CardBody>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mt-1">Invite</h5>
                        <div className="d-flex text-blue text-decoration-underline">
                          <p className="me-2 cursor-pointer mb-0">Decline</p>
                          <p className="cursor-pointer mb-0">Accept</p>
                        </div>
                      </div>
                      <h5 className="mt-2 pt-50 font-small-4 mb-0">Invite Sent</h5>
                      <p className="font-small-4">Apr 12, 23</p>
                      <div className="d-flex align-items-center">
                        <Avatar img={defaultAvatar} imgHeight="38" imgWidth="38" className="me-50 user-pic" />
                        <div>
                          <p className="fw-bolder m-0">Bob Smith (Team Member)</p>
                          <p className="m-0">Frontend Developer</p>
                        </div>
                      </div>
                      <p className="fw-bolder mt-2 mb-0">Message</p>
                      <div className="w-75">
                        <p className="font-small-3 w-50">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua. Enim ut tellus elementum sagittis vitae et leo. Duis
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </CardBody>
            </Card>
          </GrayCardWrapper>
        </Col>
      </Row>
    </>
  );
};

export default TeamInvitation;
