import React, { useEffect, useState } from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import { AssessedSkillGradeBar, AssessmentResultText, RecentProjectsWrap } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAssessments } from "../../../redux/selectors/assessmentSelectors";
import { getUserAssessments } from "../../../redux/actions/AssessmentActions";

const AssessedSkills = () => {

    const dispatch = useDispatch()
    const userAssessments = useSelector(selectUserAssessments)

    const [showSection, setShowSection] = useState(false)

    useEffect(() => {
        dispatch(getUserAssessments())
    }, [])

    useEffect(() => {
        const visibleAssessments = userAssessments.some(assessment => assessment.hidden == false)
        setShowSection(visibleAssessments)
    }, [])


    return (
        <>
            {showSection ? <RecentProjectsWrap>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <b>Assessed Skills</b>
                        </CardTitle>

                        <div className="d-flex gap-1">
                            {userAssessments.map((assessment) => (
                                assessment.completed_date && !assessment.hidden &&
                                <div className="d-flex gap-1 h-full" style={{width: "20%"}}>
                                    <AssessedSkillGradeBar grade={assessment.assessment_grade} />

                                    <div className="d-flex flex-column h-100 justify-content-between">
                                        <CardText tag={"h5"}>{assessment.assessment_name}</CardText>
                                        <AssessmentResultText grade={assessment.assessment_grade}>
                                            <small><b>{assessment.assessment_grade}</b></small>
                                        </AssessmentResultText>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </CardBody>
                </Card>
            </RecentProjectsWrap> : <></>}
        </>
    )
}

export default AssessedSkills;