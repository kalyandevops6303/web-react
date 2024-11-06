import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AssessedSkillGradeBar, AssessmentResultText, ModalCardItem, RecentProjectsWrap } from './style';
import { selectTeamAssessments, selectUserAssessments } from '../../../redux/selectors/assessmentSelectors';
import { getTeamAssessments, getUserAssessments } from '../../../redux/actions/assessmentActions';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import isEmpty from 'lodash';
import { selectCurrentProfile } from '../../../redux/selectors/profileSelectors';
import AvatarGroup from '@components/avatar-group';
import { userTypes } from '../../../utility/constants/Constant';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import Tag from '../../../@core/components/tags';

const AssessedSkillsTeam = ({ teamId }) => {
  const param = useParams();
  const dispatch = useDispatch();
  const teamAssessments = useSelector(selectTeamAssessments);
  const teamMembers = useSelector(selectCurrentProfile).team_members?.map((teamMember) => ({
    user_id: teamMember?.user_id,
    user_type: userTypes.talent,
    title: `${teamMember?.first_name} ${teamMember?.last_name}`,
    img: teamMember?.image_uri?.length ? teamMember?.image_uri : defaultAvatar,
  }));

  const [showSection, setShowSection] = useState(true);
  const [showViewAllModal, setShowViewAllModal] = useState(false);

  let assessmentsDisplayed = [];

  const getGradeAssessments = (assessments, grade) => {
    if (!assessments) return <></>;

    let assessmentsWithResults = assessments?.filter(
      (assessment) => assessment.hasOwnProperty('completed_date') && !assessment.hidden,
    );
    const userIdsWithAssessments = assessmentsWithResults?.map((assessment) => assessment.user_id);
    const teamMembersWithAssessments = teamMembers?.filter((teamMember) =>
      userIdsWithAssessments?.includes(teamMember.user_id),
    );

    if (assessmentsDisplayed.includes(assessmentsWithResults[0].assessment_name) || assessmentsDisplayed.length === 5)
      return <></>;
    else assessmentsDisplayed.push(assessmentsWithResults[0].assessment_name);

    return (
      <>
        {
          <div className="d-flex gap-1 h-full" style={{ width: '200px' }}>
            <AssessedSkillGradeBar grade={grade} />

            <div className="d-flex flex-column h-100 justify-content-between">
              <CardText tag="h5">{assessmentsWithResults && assessmentsWithResults[0].assessment_name}</CardText>

              <div className="d-flex align-items-center justify-content-between gap-3">
                <AssessmentResultText grade={grade}>
                  <small>
                    <b>{grade}</b>
                  </small>
                </AssessmentResultText>
                {teamMembersWithAssessments?.length > 3 ? (
                  <span className="d-flex avatars">
                    <AvatarGroup
                      totalCount={teamMembersWithAssessments?.length}
                      size="sm"
                      className="mr-4"
                      data={teamMembersWithAssessments?.slice(0, 3)}
                    />
                  </span>
                ) : (
                  <AvatarGroup size="sm" data={teamMembersWithAssessments} />
                )}
              </div>
            </div>
          </div>
        }
      </>
    );
  };

  const getGradeAssessmentsForModal = (assessments, grade) => {
    if (!assessments) return <></>;

    const assessmentsWithResults = assessments?.filter(
      (assessment) => assessment.hasOwnProperty('completed_date') && !assessment.hidden,
    );
    const userIdsWithAssessments = assessmentsWithResults?.map((assessment) => assessment.user_id);

    const teamMembersWithAssessments = teamMembers?.filter((teamMember) =>
      userIdsWithAssessments?.includes(teamMember.user_id),
    );

    return (
      <>
        {
          <div className="d-flex gap-1 h-full">
            <AssessedSkillGradeBar grade={grade} />

            <div className="d-flex flex-column h-100 justify-content-between" style={{ width: '200px' }}>
              <div className="d-flex align-items-center justify-content-between gap-1">
                <AssessmentResultText grade={grade}>
                  <small>
                    <b>{grade}</b>
                  </small>
                </AssessmentResultText>
                {teamMembersWithAssessments?.length > 3 ? (
                  <span className="d-flex">
                    <AvatarGroup
                      totalCount={teamMembersWithAssessments?.length}
                      size="sm"
                      className="mr-4"
                      data={teamMembersWithAssessments?.slice(0, 3)}
                    />
                    <Tag hasNew={false} count={teamMembersWithAssessments?.length || '00'} />
                  </span>
                ) : (
                  <span className="d-flex">
                    <AvatarGroup size="sm" data={teamMembersWithAssessments} />
                    <Tag hasNew={false} count={teamMembersWithAssessments?.length || '00'} />
                  </span>
                )}
              </div>
            </div>
          </div>
        }
      </>
    );
  };

  const getViewAllModalItem = (assessmentName, grades) => {
    return (
      <Card>
        <CardBody className="d-flex gap-2 align-items-center">
          <div style={{ width: '90px' }}>
            <CardText tag="h5">{assessmentName}</CardText>
          </div>
          {getGradeAssessmentsForModal(grades?.Mastery, 'Mastery')}
          {getGradeAssessmentsForModal(grades?.Proficient, 'Proficient')}
          {getGradeAssessmentsForModal(grades?.Intermediate, 'Intermediate')}
          {getGradeAssessmentsForModal(grades?.Novice, 'Novice')}
        </CardBody>
      </Card>
    );
  };

  useEffect(() => {
    dispatch(getTeamAssessments({ id: teamId || param?.userId }));
  }, []);

  return (
    <div>
      {showSection ? (
        <RecentProjectsWrap>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <CardTitle>
                  <b>Assessed Skills</b>
                </CardTitle>

                <div
                  className="text-primary text-decoration-underline cursor-pointer"
                  onClick={() => setShowViewAllModal(true)}
                >
                  View All
                </div>
              </div>

              <div className="d-flex gap-1">
                {_.map(teamAssessments, (grades, assessmentName) => (
                  <>{getGradeAssessments(grades.Mastery, 'Mastery')}</>
                ))}

                {_.map(teamAssessments, (grades, assessmentName) => (
                  <>{getGradeAssessments(grades.Proficient, 'Proficient')}</>
                ))}

                {_.map(teamAssessments, (grades, assessmentName) => (
                  <>{getGradeAssessments(grades.Intermediate, 'Intermediate')}</>
                ))}

                {_.map(teamAssessments, (grades, assessmentName) => (
                  <>{getGradeAssessments(grades.Novice, 'Novice')}</>
                ))}
              </div>
            </CardBody>
          </Card>

          <Modal isOpen={showViewAllModal} contentClassName="" className="modal-dialog-centered modal-lg w-75">
            <ModalHeader toggle={() => setShowViewAllModal(false)} />
            <ModalBody>
              <div className="d-flex flex-column gap-1 px-1 bg-white">
                <div className="d-flex align-items-center gap-1">
                  <div className="modal-heading mb-1">Team Member Skills</div>
                  <div className="mb-1">{Object.keys(teamAssessments).length} Assessed Skills</div>
                  <hr />
                </div>
                <ModalCardItem>
                  {_.map(teamAssessments, (grades, assessmentName) => (
                    <>{getViewAllModalItem(assessmentName, grades)}</>
                  ))}
                </ModalCardItem>
              </div>
            </ModalBody>
          </Modal>
        </RecentProjectsWrap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AssessedSkillsTeam;
