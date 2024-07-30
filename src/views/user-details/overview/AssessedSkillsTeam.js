import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AssessedSkillGradeBar, AssessmentResultText, RecentProjectsWrap } from './style';
import { selectTeamAssessments, selectUserAssessments } from '../../../redux/selectors/assessmentSelectors';
import { getTeamAssessments, getUserAssessments } from '../../../redux/actions/assessmentActions';
import { useParams } from 'react-router-dom';
import _ from "lodash";
import isEmpty from "lodash";
import { selectCurrentProfile } from '../../../redux/selectors/profileSelectors';
import AvatarGroup from '@components/avatar-group';
import { userTypes } from '../../../utility/constants/Constant';

const AssessedSkillsTeam = () => {
    const param = useParams();
    const dispatch = useDispatch();
    const teamAssessments = useSelector(selectTeamAssessments);
    const teamMembers = useSelector(selectCurrentProfile).team_members?.map((teamMember) => ({
        user_id: teamMember?.user_id,
        user_type: userTypes.talent,
        title: `${teamMember?.first_name} ${teamMember?.last_name}`,
        img: teamMember?.image_uri?.length ? teamMember?.image_uri : defaultAvatar,
    }));

    const [showSection, setShowSection] = useState(false);

    const getNoviceAssessments = (assessments) => {

        const assessmentsWithResults = assessments.filter((assessment) => assessment.hasOwnProperty("completed_date") && !assessment.hidden)
        const userIdsWithAssessments = assessmentsWithResults.map((assessment) => assessment.user_id);

        const teamMembersWithAssessments = teamMembers.filter((teamMember) => userIdsWithAssessments.includes(teamMember.user_id));
        

        return (
            <>
                {<div className="d-flex gap-1 h-full" style={{ width: '20%' }}>
                    <AssessedSkillGradeBar grade="Novice" />

                    <div className="d-flex flex-column h-100 justify-content-between">
                        <CardText tag="h5">{assessmentsWithResults[0].assessment_name}</CardText>

                        <div className='d-flex align-items-center justify-content-between gap-3'>
                            <AssessmentResultText grade="Novice">
                                <small>
                                    <b>Novice</b>
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
                </div>}
            </>
        )
    }

    useEffect(() => {
        dispatch(getTeamAssessments({ id: param?.userId }))
    }, []);

    useEffect(() => {
        const visibleAssessments = teamAssessments
        setShowSection(visibleAssessments);
    }, []);

    return (
        <div>
            {showSection && (
                <RecentProjectsWrap>
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <b>Assessed Skills</b>
                            </CardTitle>

                            <div className="d-flex gap-1">
                                {_.map(teamAssessments, (grades, assessmentName) => (
                                    <>
                                        {getNoviceAssessments(grades.Novice)}
                                    </>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </RecentProjectsWrap>
            )}
        </div>
    );
};

export default AssessedSkillsTeam;
