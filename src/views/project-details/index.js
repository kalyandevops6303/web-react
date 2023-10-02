/* eslint-disable no-undef */
import React, { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import { Card, CardBody, Col, Input, Label, Row } from 'reactstrap';
import { Route, Routes, useLocation } from 'react-router-dom';

import LeftSidebarProjectDetails from './overview/LeftSidebarProjectDetails';
import CustomStep from '../../@core/components/custom-stepper';
import { InviteView, steps } from './overview/constants';
import BidView from './overview/BidView';
import TeamView from './overview/TeamView';
import { projectDetails } from '../../redux/selectors/projectDetailsSelectors';
import InviteMemberCard from './overview/InviteMemberCard';
import InvitationView from './overview/InvitationView';
import Milestone from './milestones/Milestone';
import RatingView from './overview/RatingView';

const ProjectDetails = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(location?.pathname?.split('/')?.[3]);
  const projectDetailsData = useSelector(projectDetails);
  const invitedByData = useSelector((state) => state.projectDetails.invitedBy);

  const changeStep = (step) => {
    setCurrentStep(step);
  };
  useEffect(() => {
    window?.scrollTo(0, 0);
  }, []);

  const isInviteView = location?.pathname?.includes('project-invitation');

  return (
    <div>
      <BreadCrumbs
        data={
          isInviteView
            ? [{ title: projectDetailsData?.details?.name }]
            : [
                { title: 'Marketplace', link: '/marketplace/all_listings' },
                { title: projectDetailsData?.details?.name },
              ]
        }
      />
      <Row>
        <Col lg="3">
          {isInviteView && invitedByData && <InviteMemberCard />}
          <LeftSidebarProjectDetails />
          <Col>
            <h4>Milestone Payment - Due</h4>
            <Card>
              <CardBody className="d-flex justify-content-between">
                <div className="d-flex">
                  <Input type="checkbox" id="m1" />
                  <Label for="m1" style={{ marginLeft: '10px', fontSize: '16px' }}>
                    Milestone #1
                  </Label>
                </div>
                <div>$4539</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="d-flex justify-content-between">
                <div className="d-flex">
                  <Input type="checkbox" id="m1" />
                  <Label for="m1" style={{ marginLeft: '10px', fontSize: '16px' }}>
                    Milestone #1
                  </Label>
                </div>
                <div>$4539</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="d-flex justify-content-between">
                <div className="d-flex">
                  <Input type="checkbox" id="m1" />
                  <Label for="m1" style={{ marginLeft: '10px', fontSize: '16px' }}>
                    Milestone #1
                  </Label>
                </div>
                <div>$4539</div>
              </CardBody>
            </Card>
          </Col>
        </Col>
        <Col lg="9">
          <CustomStep steps={isInviteView ? InviteView : steps} currentStep={currentStep} onChangeStep={changeStep} />
          <Routes>
            <Route path="bid" element={<BidView />} />
            <Route path="milestone" element={<Milestone />} />
            <Route path="team" element={<TeamView />} />
            <Route path="rating" element={<RatingView />} />
            <Route path="project/project-invitation/:inviteId" element={<InvitationView />} />
            <Route path="milestone/project-invitation/milestone" element={<Milestone />} />
            <Route path="project/project-invitation-by-client/:inviteId" element={<InvitationView />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
};

export default memo(ProjectDetails);
