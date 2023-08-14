import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardText } from 'reactstrap';
import { UserBioWrap } from './style';

const UserBio = ({ isClient, data }) => (
  <UserBioWrap>
    {data?.company_name || data?.tagline ? (
      <Card>
        <CardBody className="d-flex justify-content-between">
          <div className="user-info">
            <div className="d-flex justify-content-between">
              <CardText className="fw-bolder title">
                {isClient ? `About ${data?.company_name || 'User'}` : data?.tagline}
              </CardText>
            </div>
            <CardText>{isClient ? data?.company_tagline : data?.professional_intro} </CardText>
          </div>
        </CardBody>
      </Card>
    ) : (
      <Card>
        <CardBody className="d-flex justify-content-center align-items-center">
          <h4 className="text-center font-small-4 empty">Bio not added</h4>
        </CardBody>
      </Card>
    )}
  </UserBioWrap>
);

UserBio.propTypes = {
  data: PropTypes.object,
  isClient: PropTypes.bool,
};
UserBio.defaultProps = {
  data: {},
  isClient: false,
};
export default UserBio;
