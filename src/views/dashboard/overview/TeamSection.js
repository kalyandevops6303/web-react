import React, { useEffect } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { TeamSectionWrapper } from './style';
import UserNameRoleCompanyComp from '../../../@core/components/username-role-company';
import { getTeamMembers } from '../../../redux/actions/dashboardActions';
import { selectGetTeamMember } from '../../../redux/selectors/dashboardSelectors';

const TeamSection = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const teamMembers = useSelector(selectGetTeamMember);
  useEffect(() => {
    dispatch(getTeamMembers());
  }, []);
  return (
    <TeamSectionWrapper>
      <Card>
        <CardHeader className="earning-head">
          <CardTitle tag="h6">
            Team <span className="members-count">{teamMembers?.metadata?.total_records} Members</span>
          </CardTitle>
          <CardText
            onClick={toggleModal}
            className="cursor-pointer text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary"
          >
            View All
          </CardText>
        </CardHeader>
        <CardBody>
          <div style={{ height: '18rem', overflowY: 'auto' }}>
            {teamMembers?.data?.map((user) => (
              <UserNameRoleCompanyComp key={user?._id} data={user} />
            ))}
          </div>
        </CardBody>
      </Card>
    </TeamSectionWrapper>
  );
};

TeamSection.propTypes = {
  toggleModal: Proptypes.func,
};
TeamSection.defaultProps = {
  toggleModal: () => {},
};

export default TeamSection;
