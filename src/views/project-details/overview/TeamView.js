import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MemberRowWrapper, TeamVieWrapper } from '../style';
import MemberRow from './MemberRow';
import { getTeamMembers, getUnassignedRoles } from '../../../redux/actions/projectDetailsAction';
import InviteTalentToTeam from '../../invite-talent-to-team';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';

const TeamView = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const userData = useSelector(selectUserData);
  const teamMembers = useSelector((state) => state.projectDetails.getTeamMember);
  const unassigned = useSelector((state) => state.projectDetails.unassignedRole);
  useEffect(() => {
    dispatch(getTeamMembers({ project_id: params.projectId }));
    if (userData?.user_type === userTypes.team) {
      dispatch(getUnassignedRoles({ project_id: params.projectId }));
    }
  }, []);

  const [inviteModal, setInviteModal] = useState(false);
  const [inviteRole, setInviteRole] = useState(false);
  const [inviteTalentToTeamModal, setInviteTalentToTeamModal] = useState(null);

  const handleAssign = (data) => {
    setInviteModal(true);
    setInviteTalentToTeamModal(true);
    setInviteRole(data?.role);
  };

  const toggleModal = () => {
    setInviteModal(!inviteModal);
  };
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

      {userData?.user_type === userTypes.team && unassigned?.length > 0 && (
        <Card>
          <CardTitle className="main-card-title">Add Team Member</CardTitle>
          <CardBody className="main-card-body">
            <MemberRowWrapper>
              {unassigned?.map((item) => (
                <Card key={item?.user_id}>
                  <CardBody>
                    <div className="d-flex align-items-center justify-content-between  gap-1">
                      <CardText className="d-flex gap-25 fw-bold me-4 mt-auto mb-auto">
                        {item?.role} <span className="indicator" />
                      </CardText>

                      <div className="d-flex gap-3">
                        <Button
                          onClick={() => handleAssign({ role: item?.role })}
                          color="primary"
                          type="secondary"
                          outline
                        >
                          Assign team member
                        </Button>
                        <div className="d-flex">
                          <div className="me-2">
                            <span className="key">Duration</span>
                            <CardText className="value">{item?.number_of_weeks}w</CardText>
                          </div>
                          <div className="me-1">
                            <span className="key">Hours/week</span>
                            <CardText className="value">{item?.hours_per_week}</CardText>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
              {/* <Card>
              <CardBody>
                <div className="d-flex align-items-center justify-content-between  gap-1">
                  <CardText className="d-flex gap-25 fw-bold me-4 mt-auto mb-auto">
                    Back end developer <span className="indicator" />
                  </CardText>
                  <Button color="primary" type="secondary" outline>
                    Assign team member
                  </Button>
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
            <Card>
              <CardBody>
                <div className="d-flex align-items-center justify-content-between  gap-1">
                  <CardText className="d-flex gap-25 fw-bold me-4 mt-auto mb-auto">
                    Back end developer <span className="indicator" />
                  </CardText>
                  <Button onClick={handleAssign} color="primary" type="secondary" outline>
                    Assign team member
                  </Button>
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
            </Card> */}
            </MemberRowWrapper>
          </CardBody>
        </Card>
      )}
      {/* <Card>
        <CardTitle className="main-card-title">Invite Sent</CardTitle>
        <CardBody className="main-card-body">
          {Members.map((item) => (
            <MemberRow data={item} key={item.name} withReview />
          ))}
        </CardBody>
      </Card> */}
      {inviteTalentToTeamModal && (
        <InviteTalentToTeam
          inviteTeamMemberModal={inviteModal}
          toggleInviteTeamMemberModal={toggleModal}
          setInviteTalentToTeamModal={setInviteTalentToTeamModal}
          inviteRole={inviteRole}
          projectId={params.projectId}
        />
      )}
    </TeamVieWrapper>
  );
};
export default TeamView;
