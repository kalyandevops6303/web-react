import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { TeamSectionWrapper } from './style';
import UserNameRoleCompanyComp from '../../../@core/components/username-role-company';

const users = [
  {
    name: 'John Doe',
    role: 'Team Lead',
  },
  {
    name: 'lisa Doe',
    company: 'System organization System organization',
  },
  {
    name: 'lisa rose',
    role: 'Backend Developer',
  },
  {
    name: 'Jack lee',
    role: 'Frontend Developer',
  },
  {
    name: 'lisa rose',
    role: 'Backend Developer',
  },
  {
    name: 'Jack lee',
    role: 'Frontend Developer',
  },
  {
    name: 'lisa rose',
    role: 'Backend Developer',
  },
  {
    name: 'Jack lee',
    role: 'Frontend Developer',
  },
];

const TeamSection = () => (
  <TeamSectionWrapper>
    <Card>
      <CardHeader className="earning-head">
        <CardTitle tag="h6">
          Team <span className="members-count">{users?.length} Members</span>
        </CardTitle>
        <CardText className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary">
          <Link to="/notifications">View All</Link>
        </CardText>
      </CardHeader>
      <CardBody>
        <div style={{ height: '18rem', overflowY: 'auto' }}>
          {users.map((user) => (
            <UserNameRoleCompanyComp key={user.name} data={user} />
          ))}
        </div>
      </CardBody>
    </Card>
  </TeamSectionWrapper>
);

export default TeamSection;
