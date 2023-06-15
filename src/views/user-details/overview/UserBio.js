import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardText } from 'reactstrap';
import UserCover from '@src/assets/images/user_cover.png';
import { UserBioWrap } from './style';

const UserBio = ({ isClient, data, isEditable }) => (
  <UserBioWrap>
    <Card>
      <CardBody className="d-flex justify-content-between">
        <div className="user-info">
          <div className="d-flex justify-content-between">
            <CardText className="fw-bolder title">
              {isClient ? `About ${data.company_name || 'User'}` : data?.tagline}{' '}
            </CardText>
            {isEditable && (
              <CardText className="text-decoration-underline fw-bold card-text font-small-3 text-edit">Edit</CardText>
            )}
          </div>
          <CardText>{isClient ? data?.company_tagline : data?.professional_intro} </CardText>
        </div>
        <img src={UserCover} className="user-cover" alt="cover" />
      </CardBody>
    </Card>
  </UserBioWrap>
);

UserBio.propTypes = {
  isEditable: PropTypes.bool,
  data: PropTypes.object,
  isClient: PropTypes.bool,
};
UserBio.defaultProps = {
  isEditable: false,
  data: {},
  isClient: false,
};
export default UserBio;
