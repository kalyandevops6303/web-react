import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { TeamVieWrapper } from '../style';
import MemberRow from './MemberRow';
import { getTeamMembers } from '../../../redux/actions/projectDetailsAction';

const TeamView = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const teamMembers = useSelector((state) => state.projectDetails.getTeamMember);

  useEffect(() => {
    dispatch(getTeamMembers({ project_id: params.projectId }));
  }, []);

  return (
    <TeamVieWrapper>
      <Card>
        <CardTitle className="main-card-title">Project Team</CardTitle>
        <CardBody className="main-card-body">
          {teamMembers?.length > 0 ? (
            teamMembers?.map((item) => <MemberRow data={item} key={item.user_id} withReview={false} />)
          ) : (
            <CardText className="d-flex justify-content-center">No team members yet</CardText>
          )}
        </CardBody>
      </Card>

      {/* TODO: API in progess */}

      {/* <Card>
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
      </Card> */}
    </TeamVieWrapper>
  );
};
export default TeamView;
