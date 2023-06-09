import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardText } from 'reactstrap';
import UserCover from '@src/assets/images/user_cover.png';
import { UserBioWrap } from './style';

const UserBio = ({ isEditable }) => (
  <UserBioWrap>
    <Card>
      <CardBody className="d-flex justify-content-between">
        <div className="user-info">
          <div className="d-flex justify-content-between">
            <CardText className="fw-bolder title">Front End developer: Creting user web interfaces</CardText>
            {isEditable && (
              <CardText className="text-decoration-underline fw-bold card-text font-small-3 text-edit">Edit</CardText>
            )}
          </div>
          <CardText>
            As a front end developer I am responsible for designing and developing user-friendly web and mobile
            interfaces that ensure the best possible user experience. In my role, I have worked closely with UX/UI
            designers to transform their design concepts into functional web interfaces using programming languages such
            as HTML, CSS, Javascript including React and Angular frameworks.
          </CardText>
        </div>
        <img src={UserCover} className="user-cover" alt="cover" />
      </CardBody>
    </Card>
  </UserBioWrap>
);

UserBio.propTypes = {
  isEditable: PropTypes.bool,
};
UserBio.defaultProps = {
  isEditable: false,
};
export default UserBio;
