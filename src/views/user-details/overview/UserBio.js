import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardText } from 'reactstrap';
import parse from 'html-react-parser';
import { UserBioWrap } from './style';

const UserBio = ({ isTalentView, isTeamView, isClient, data }) => (
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
            <CardText>
              {isClient && data?.company_tagline && parse(data?.company_tagline)}{' '}
              {isTalentView && data?.professional_intro && parse(data?.professional_intro)}
              {isTeamView && data?.introduction && parse(data?.introduction)}{' '}
            </CardText>
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
  isTalentView: PropTypes.bool,
  isTeamView: PropTypes.bool,
};
UserBio.defaultProps = {
  data: {},
  isClient: false,
  isTalentView: false,
  isTeamView: false,
};
export default UserBio;
