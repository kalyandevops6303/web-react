import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import { RecentProjectsWrap } from './style';
import Project from './Project';

const RecentProjects = ({ isEditable }) => (
  <RecentProjectsWrap>
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between">
          <CardTitle className="fw-bolder">Recent Projects</CardTitle>
          <CardText className="text-decoration-underline fw-bolder card-text font-small-3 text-edit">
            {isEditable ? 'Edit' : 'View'} Portfolio
          </CardText>
        </div>
        <h4 className="text-center empty">No projects to show</h4>
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
RecentProjects.propTypes = {
  isEditable: PropTypes.bool,
};
RecentProjects.defaultProps = {
  isEditable: false,
};
export default RecentProjects;
