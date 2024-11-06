import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { RecentProjectWrap } from './style';
import RatingGroup from '../../../@core/components/rating-group/Index';
import { userTypes } from '../../../utility/constants/Constant';
import ProjectModal from '../../modals/ProjectModal';

const Project = ({ data, rating, role, userType, title, desc }) => {
  const [showModal, setShowModal] = useState(false);
  const handleToggle = () => {
    setShowModal(!showModal);
  };
  return (
    <RecentProjectWrap>
      <Card>
        <CardBody>
          <CardTitle className="fw-bolder mb-1">{title}</CardTitle>
          {userType !== userTypes.client && (
            <div className="d-flex role-section align-items-center mb-50">
              <CardText className="m-0">Role</CardText>
              <Button disabled size="sm" outline color="primary" className="outline-btn">
                {role}
              </Button>
            </div>
          )}
          <RatingGroup rating={rating} />
          <CardText
            className="mt-50 mb-25 project-desc truncate-4"
            dangerouslySetInnerHTML={{ __html: desc }}
          ></CardText>
          <CardText
            onClick={handleToggle}
            className="cursor-pointer text-center text-decoration-underline card-text me-25 mb-0 text-primary"
          >
            View Project
          </CardText>
        </CardBody>
      </Card>
      {showModal && <ProjectModal data={data} modal={showModal} toggleModal={handleToggle} isMyTeam />}
    </RecentProjectWrap>
  );
};
Project.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  userType: PropTypes.string,
  rating: PropTypes.number,
  role: PropTypes.string,
  data: PropTypes.object,
};
Project.defaultProps = {
  title: '',
  desc: '',
  userType: '',
  rating: 0,
  role: '',
  data: {},
};

export default Project;
