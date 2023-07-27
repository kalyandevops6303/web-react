import { Card, CardBody, CardText, CardTitle, Input } from 'reactstrap';
import { MemberRowWrapper, TeamVieWrapper } from '../style';
import { Members } from './constants';
import MemberRow from './MemberRow';

const TeamView = () => (
  <TeamVieWrapper>
    <Card>
      <CardTitle className="main-card-title">Project Team</CardTitle>
      <CardBody className="main-card-body">
        {Members.map((item) => (
          <MemberRow data={item} key={item.name} withReview={false} />
        ))}
      </CardBody>
    </Card>
    <Card>
      <CardTitle className="main-card-title">Add Team Member</CardTitle>
      <CardBody className="main-card-body">
        <MemberRowWrapper>
          <Card>
            <CardBody>
              <div className="d-flex align-items-center justify-content-between  gap-1">
                <CardText className="d-flex gap-25 fw-bold me-4 mt-auto mb-auto">
                  Designer <span className="indicator" />
                </CardText>
                <Input placeholder="Assign team member" />
                <div className="d-flex">
                  <div className="me-2">
                    <span className="key">Duration</span>
                    <CardText className="value">11w</CardText>
                  </div>
                  <div className="me-1">
                    <span className="key">Hours/week</span>
                    <CardText className="value">125</CardText>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </MemberRowWrapper>
      </CardBody>
    </Card>
    <Card>
      <CardTitle className="main-card-title">Invite Sent</CardTitle>
      <CardBody className="main-card-body">
        {Members.map((item) => (
          <MemberRow data={item} key={item.name} withReview />
        ))}
      </CardBody>
    </Card>
  </TeamVieWrapper>
);
export default TeamView;
