import React, { useState, useEffect } from "react";
import { GradeBar, SectionCount, CircularProgressbarWrapper, ActionOffContainer, ActionContainer } from "./style";
import { Modal, ModalBody, ModalHeader, CardTitle, CardText, CardBody, Button, Spinner, UncontrolledTooltip } from "reactstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import Tag from "../../@core/components/tags";
import { Edit, Eye, EyeOff, Trash2 } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { selectAllAssessments, selectAssessmentLink, selectAssessmentLinkLoading, selectDeleteAssessmentLoading, selectUserAssessmentsCount } from "../../redux/selectors/assessmentSelectors";
import Select from "react-select";
import { selectThemeColors } from "../../utility/Utils";
import { deleteAssessment, getAssessmentLink, toggleAssessmentHidden } from "../../redux/actions/assessmentActions";
import DeleteGif from "../../assets/images/gifs/delete.gif";
import { Loader } from "react-feather";
import { ChevronDown, ChevronUp } from "react-feather";
import { assessmentModalPoints, currentAssessmentLimit } from "../../utility/constants/AssessmentConstants";

const AssessmentsListItem = ({ open, assessment }) => {

    const dropdownOptions = useSelector(selectAllAssessments)
    const assessmentLink = useSelector(selectAssessmentLink)
    const assessmentLinkLoading = useSelector(selectAssessmentLinkLoading)
    const deleteAssessmentLoading = useSelector(selectDeleteAssessmentLoading)
    const userAssessmentsCount = useSelector(selectUserAssessmentsCount)
    const dispatch = useDispatch()

    const [showSections, setShowSections] = useState(open)
    const [hidden, setHidden] = useState(assessment.hidden)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showAssessmentModal, setShowAssessmentModal] = useState(false)

    const getColorByPercentage = (percentage) => {
        if (percentage <= 50) return "#FBC02D"
        else if (percentage <= 69) return "#00BCD4"
        else if (percentage <= 89) return "#7C4DFF"
        else return "#414DFD"
    }

    const retakeAvailable = (assessment) => {
        const retakeDate = new Date(Number(assessment.retake_date));
        const currentDate = new Date();
        return (retakeDate <= currentDate);
    }

    const daysLeftForRetake = (assessment) => {
        const retakeDate = new Date(Number(assessment.retake_date))
        const currentDate = new Date();

        const differenceInMilliseconds = Math.abs(currentDate - retakeDate);
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        return differenceInDays;
    }

    const getDisplayDate = (epoch) => {
        const date = new Date(Number(epoch))
        return date.toDateString() + " " + date.toLocaleTimeString()
    }

    const handleHidden = () => {
        dispatch(toggleAssessmentHidden({ assessmentId: assessment.assessment_id }))
        setHidden(!hidden)
    }

    const handleDelete = () => {
        setShowDeleteModal(true)
    }

    const handleDeleteConfirmed = () => {
        const strType = dropdownOptions.filter((item) => item.assessment_id == assessment.assessment_id)[0].str_type
        const id = dropdownOptions.filter((item) => item.assessment_id == assessment.assessment_id)[0]._id
        dispatch(deleteAssessment({ assessmentId: assessment.assessment_id, strType, id }))
    }

    const handleTakeAssessmentClicked = (e) => {
        e.preventDefault();
        setShowAssessmentModal(true);
        dispatch(getAssessmentLink({ assessmentName: assessment.assessment_name, assessmentId: assessment.assessment_id }));
    }

    return (
        <>
            <tr>
                <td>
                    <b>{assessment.assessment_name}</b>
                </td>
                <td>
                    {assessment.completed_date && getDisplayDate(assessment.completed_date)}
                </td>

                <td>
                    {assessment.sections &&
                        <>
                            {Object.keys(assessment.sections).length == 1 ?
                                <>
                                    {Object.keys(assessment.sections)[0]}
                                </>
                                :
                                <div className="d-flex">
                                    <div className="d-flex">
                                        <div>{Object.keys(assessment.sections)[0]}</div>
                                        <SectionCount>
                                            <small>+ {Object.keys(assessment.sections).length - 1}</small>
                                        </SectionCount>
                                    </div>
                                </div>
                            }
                        </>
                    }
                </td>

                <td>
                    <b>{assessment.overall_percentage && `${assessment.overall_percentage}%`}</b>
                </td>

                <td>
                    <div className="d-flex flex-column">
                        {assessment.assessment_grade &&
                            <>
                                <div>{assessment.assessment_grade}</div>
                                <GradeBar grade={assessment.assessment_grade} />
                            </>
                        }
                    </div>
                </td>

                <td style={{ width: "300px" }}>
                    {assessment.completed_date ?
                        <div className="d-flex gap-1 align-items-center justify-content-between">
                            {
                                retakeAvailable(assessment) ?
                                    <>
                                        {userAssessmentsCount >= 5 ?
                                            <CardText>Sorry, you're run out of assessments</CardText>
                                            :
                                            <a href="#" onClick={handleTakeAssessmentClicked}>
                                                <b>Re-take assessment</b>
                                            </a>}
                                    </>
                                    :
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div
                                            className="cursor-pointer"
                                            id="days-left"
                                        >
                                            <Tag
                                                hasNew={false}
                                                count={daysLeftForRetake(assessment) + " days left"}
                                                noMargin={true}
                                            />
                                        </div>
                                        <UncontrolledTooltip target="days-left">
                                            Retake your assessment after cooldown period, if attempts left.
                                        </UncontrolledTooltip>
                                    </div>
                            }

                            <div className="d-flex gap-1 align-items-center w-25">
                                <div id="eye" className="cursor-pointer" onClick={handleHidden}>
                                    {hidden ?
                                        <ActionOffContainer>
                                            <EyeOff width="20px" height="20px" color="#EA5455" />
                                        </ActionOffContainer>
                                        :
                                        <ActionContainer>
                                            <Eye width="20px" height="20px" color="#0185E4" />
                                        </ActionContainer>
                                    }

                                    <UncontrolledTooltip target="eye">
                                        Use this to hide assessment score from your public profile.
                                    </UncontrolledTooltip>
                                </div>


                                {
                                    assessment.sections &&
                                    <>
                                        <div className="cursor-pointer" onClick={() => setShowSections(!showSections)}>
                                            {showSections ? <ChevronUp /> : <ChevronDown />}
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                        :
                        <div className="d-flex align-items-center justify-content-between">
                            {userAssessmentsCount >= currentAssessmentLimit ?
                                <div className="w-75">Sorry you're run out of assessments</div>
                                :
                                <a href="#" onClick={handleTakeAssessmentClicked}>
                                    <b>Take assessment</b>
                                </a>}

                            <div className="d-flex gap-1 align-items-center w-25">
                                <div className="cursor-pointer">
                                    <ActionOffContainer onClick={handleDelete}>
                                        <Trash2 width="20px" height="20px" color="#EA5455" />
                                    </ActionOffContainer>
                                </div>
                            </div>
                        </div>
                    }
                </td>
            </tr>


            {showSections && assessment.sections && Object.entries(assessment.sections).map(([key, value]) => (
                <tr>
                    <td></td>
                    <td></td>
                    <td>{key}</td>
                    <td className="d-flex align-items-center justify-content-between pr-5 gap-1">
                        <div>{value}%</div>
                        <CircularProgressbarWrapper>
                            <CircularProgressbar
                                value={value}
                                strokeWidth={14}
                                styles={buildStyles({
                                    pathColor: getColorByPercentage(value),
                                    backgroundColor: "#E9ECEF"
                                })}
                            />
                        </CircularProgressbarWrapper>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
            ))}

            <Modal isOpen={showDeleteModal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
                <ModalHeader toggle={() => setShowDeleteModal(false)} />
                <ModalBody>
                    <div className="d-flex justify-content-between pr-1">
                        <img className="gif" src={DeleteGif} width={244} height={244} alt="gif" />
                        <div className="me-4">
                            <CardTitle className="modal-heading">Remove Assessment</CardTitle>
                            <CardText className="modal-body-text fw-light w-76">
                                Are you sure you want to remove this assessment?
                            </CardText>
                            <CardText className="modal-body-text fw-light w-76">
                                <b>{assessment.assessment_name}</b>
                            </CardText>
                        </div>
                    </div>
                    <div className="d-flex gap-1 me-1 justify-content-end">
                        <Button outline color="primary" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button disabled={deleteAssessmentLoading} color="danger" onClick={handleDeleteConfirmed}>
                            {deleteAssessmentLoading ? <Spinner color="light" /> : "Remove"}
                        </Button>
                    </div>
                </ModalBody>
            </Modal>

            <Modal isOpen={showAssessmentModal} contentClassName="custom-modal-style modal-wide" className="modal-dialog-centered modal-lg">
                <ModalHeader toggle={() => setShowAssessmentModal(false)} />
                <ModalBody>
                    <CardBody className="px-3">
                        <CardTitle className="modal-heading">Preparing Your Assessment - <span className="text-warning">{assessment.assessment_name}</span></CardTitle>
                        <CardText className="modal-body-text fw-light w-76">
                            Before starting your assessment, please go through the following instructions
                        </CardText>

                        <div className="d-flex flex-wrap row">
                            {assessmentModalPoints.map((point) => (
                                <div className="col-6 p-1 d-flex align-items-center gap-1">
                                    <ActionContainer>
                                        {point.image && point.image}
                                    </ActionContainer>
                                    <CardText>
                                        {point.text}
                                    </CardText>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                    \
                    <div className="d-flex gap-1 me-1 justify-content-end">
                        {!assessmentLinkLoading && <Button outline color="primary" onClick={() => setShowAssessmentModal(false)}>
                            Not Now
                        </Button>}
                        <a href={assessmentLinkLoading ? "#" : assessmentLink} target="_blank">
                            <Button disabled={assessmentLinkLoading} color="primary">
                                {assessmentLinkLoading ?
                                    <div className="d-flex gap-1 align-items-center">
                                        <div>
                                            Generating Assessment
                                        </div>
                                        <div>
                                            <Loader />
                                        </div>
                                    </div> :
                                    "Start Assessment"}
                            </Button>
                        </a>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default AssessmentsListItem;