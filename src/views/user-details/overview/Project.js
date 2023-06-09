import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import UserCover from '@src/assets/images/user_cover.png';
import { RecentProjectWrap } from './style';
import RatingGroup from '../../../@core/components/rating-group/Index';

const Project = ({ title, desc }) => (
  <RecentProjectWrap>
    <Card>
      <img src={UserCover} className="user-cover" alt="cover" />
      <CardBody>
        <CardTitle className="fw-bolder mb-1">{title}</CardTitle>
        <div className="d-flex role-section align-items-center mb-50">
          <CardText className="m-0">Role</CardText>
          <Button size="sm" outline color="primary" className="outline-btn">
            Front-End dev
          </Button>
        </div>
        <RatingGroup />
        <CardText className="mt-50 mb-25 project-desc truncate-4">{desc}</CardText>
        <CardText className="text-center text-decoration-underline card-text me-25 mb-0 text-primary">
          View Project
        </CardText>
      </CardBody>
    </Card>
  </RecentProjectWrap>
);
Project.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};
Project.defaultProps = {
  title: '',
  desc: '',
};

export default Project;
