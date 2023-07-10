import React from 'react';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { RecentProjectsWrap } from './style';
import Project from './Project';

const RecentProjects = () => (
  <RecentProjectsWrap>
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between">
          <CardTitle className="fw-bolder">Recent Projects</CardTitle>
        </div>
        <h4 className="text-center font-small-4 empty">No projects to show</h4>
        <Row className="d-none">
          <Col lg="6" sm="12">
            <Project
              title="WebBoost Application Development"
              desc="WebBoost is a web application development platform designed to help businesses and developers create high-quality, scalable web applications"
            />
          </Col>
          <Col lg="6" sm="12">
            <Project
              title="ShopVerse online shopping"
              desc="ShopVerse is an ecommerce website that offers a wide variety of products and services to customers worldwide. The website is designed to provide an easy and convenient shopping experience..."
            />
          </Col>
          <Col lg="6" sm="12">
            <Project
              title="WebBoost Application Development"
              desc="WebBoost is a web application development platform designed to help businesses and developers create high-quality, scalable web applications"
            />
          </Col>
          <Col lg="6" sm="12">
            <Project
              title="ShopVerse online shopping"
              desc="ShopVerse is an ecommerce website that offers a wide variety of products and services to customers worldwide. The website is designed to provide an easy and convenient shopping experience..."
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  </RecentProjectsWrap>
);
RecentProjects.propTypes = {};
RecentProjects.defaultProps = {};
export default RecentProjects;
