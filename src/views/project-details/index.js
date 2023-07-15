import React from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import { Card, Col, Row } from 'reactstrap';
import LeftSidebarProjectDetails from './overview/LeftSidebarProjectDetails';

const ProjectDetails = () => (
  <>
    <BreadCrumbs data={[{ title: 'Project name' }]} />
    <Row>
      <Col lg="3">
        <LeftSidebarProjectDetails />
      </Col>
      <Col lg="9">
        <Card>Hello</Card>
      </Col>
    </Row>
  </>
);

export default ProjectDetails;
