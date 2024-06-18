import React, { useState } from "react";
import { GradeBar, SectionCount, CircularProgressbarWrapper, ActionOffContainer, ActionContainer } from "./style";
import { Modal, ModalBody, ModalHeader, CardTitle, CardText, CardBody, Button, Spinner, UncontrolledTooltip } from "reactstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import Tag from "../../@core/components/tags";
import { Edit, Eye, EyeOff, Trash2 } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { selectAllAssessments, selectAssessmentLink, selectAssessmentLinkLoading, selectDeleteAssessmentLoading, selectEditAssessmentLoading, selectUserAssessmentsCount } from "../../redux/selectors/assessmentSelectors";
import Select from "react-select";
import { selectThemeColors } from "../../utility/Utils";
import { deleteAssessment, editAssessment, getAssessmentLink, toggleAssessmentHidden } from "../../redux/actions/AssessmentActions";
import DeleteGif from "../../assets/images/gifs/delete.gif";
import { Loader } from "react-feather";

const assessmentModalPoints = [
    {
        text: "Use a PC with a webcam for the assessment.",
        image: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g clip-path="url(#clip0_3032_383362)">
                <path d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18H4C3.45 18 2.97917 17.8042 2.5875 17.4125C2.19583 17.0208 2 16.55 2 16V5C2 4.45 2.19583 3.97917 2.5875 3.5875C2.97917 3.19583 3.45 3 4 3H20C20.55 3 21.0208 3.19583 21.4125 3.5875C21.8042 3.97917 22 4.45 22 5V16C22 16.55 21.8042 17.0208 21.4125 17.4125C21.0208 17.8042 20.55 18 20 18H24C24 18.55 23.8042 19.0208 23.4125 19.4125C23.0208 19.8042 22.55 20 22 20H2ZM12 19C12.2833 19 12.5208 18.9042 12.7125 18.7125C12.9042 18.5208 13 18.2833 13 18C13 17.7167 12.9042 17.4792 12.7125 17.2875C12.5208 17.0958 12.2833 17 12 17C11.7167 17 11.4792 17.0958 11.2875 17.2875C11.0958 17.4792 11 17.7167 11 18C11 18.2833 11.0958 18.5208 11.2875 18.7125C11.4792 18.9042 11.7167 19 12 19ZM4 16H20V5H4V16Z" fill="#0185E4" />
            </g>
            <defs>
                <clipPath id="clip0_3032_383362">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    },
    {
        text: "Complete the assessment in one continuous browser session.",
        image: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 21C3.45 21 2.97917 20.8042 2.5875 20.4125C2.19583 20.0208 2 19.55 2 19V5C2 4.45 2.19583 3.97917 2.5875 3.5875C2.97917 3.19583 3.45 3 4 3H20C20.55 3 21.0208 3.19583 21.4125 3.5875C21.8042 3.97917 22 4.45 22 5V19C22 19.55 21.8042 20.0208 21.4125 20.4125C21.0208 20.8042 20.55 21 20 21H4ZM4 19H20V5H4V19ZM5 17H10V15H5V17ZM14.55 15L19.5 10.05L18.075 8.625L14.55 12.175L13.125 10.75L11.725 12.175L14.55 15ZM5 13H10V11H5V13ZM5 9H10V7H5V9Z" fill="#0185E4" />
        </svg>
    },
    {
        text: "Navigate using Next/Previous buttons or question numbers.",
        image: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20.9996 12L16.4996 16.5L15.0496 15.05L18.0996 12L15.0496 8.95L16.4996 7.5L20.9996 12ZM9.04961 15.05L7.59961 16.5L3.09961 12L7.59961 7.5L9.04961 8.95L5.99961 12L9.04961 15.05Z" fill="#0185E4" />
        </svg>
    },
    {
        text: "Do not pause, restart, or navigate away from the test. These actions may lead to disqualification.",
        image: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M1 21L12 2L23 21H1ZM4.45 19H19.55L12 6L4.45 19ZM12 18C12.2833 18 12.5208 17.9042 12.7125 17.7125C12.9042 17.5208 13 17.2833 13 17C13 16.7167 12.9042 16.4792 12.7125 16.2875C12.5208 16.0958 12.2833 16 12 16C11.7167 16 11.4792 16.0958 11.2875 16.2875C11.0958 16.4792 11 16.7167 11 17C11 17.2833 11.0958 17.5208 11.2875 17.7125C11.4792 17.9042 11.7167 18 12 18ZM11 15H13V10H11V15Z" fill="#0185E4" />
        </svg>
    },
    {
        text: "Ensure good lighting and no background noise.",
        image: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H16C16.55 4 17.0208 4.19583 17.4125 4.5875C17.8042 4.97917 18 5.45 18 6V10.5L22 6.5V17.5L18 13.5V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H4ZM4 18H16V6H4V18Z" fill="#0185E4" />
        </svg>
    },
    {
        text: "Unattempted questions have no negative marking.",
        image: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 18C12.35 18 12.6458 17.8792 12.8875 17.6375C13.1292 17.3958 13.25 17.1 13.25 16.75C13.25 16.4 13.1292 16.1042 12.8875 15.8625C12.6458 15.6208 12.35 15.5 12 15.5C11.65 15.5 11.3542 15.6208 11.1125 15.8625C10.8708 16.1042 10.75 16.4 10.75 16.75C10.75 17.1 10.8708 17.3958 11.1125 17.6375C11.3542 17.8792 11.65 18 12 18ZM11.1 14.15H12.95C12.95 13.55 13.0167 13.1083 13.15 12.825C13.2833 12.5417 13.5667 12.1833 14 11.75C14.5833 11.1667 14.9958 10.6792 15.2375 10.2875C15.4792 9.89583 15.6 9.45 15.6 8.95C15.6 8.06667 15.3 7.35417 14.7 6.8125C14.1 6.27083 13.2917 6 12.275 6C11.3583 6 10.5792 6.225 9.9375 6.675C9.29583 7.125 8.85 7.75 8.6 8.55L10.25 9.2C10.3667 8.75 10.6 8.3875 10.95 8.1125C11.3 7.8375 11.7083 7.7 12.175 7.7C12.625 7.7 13 7.82083 13.3 8.0625C13.6 8.30417 13.75 8.625 13.75 9.025C13.75 9.30833 13.6583 9.60833 13.475 9.925C13.2917 10.2417 12.9833 10.5917 12.55 10.975C12 11.4583 11.6208 11.9208 11.4125 12.3625C11.2042 12.8042 11.1 13.4 11.1 14.15ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5 19H19V5H5V19Z" fill="#0185E4" />
        </svg>
    },
    {
        text: "Mark questions to revisit later.",
        image: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 21V5C5 4.45 5.19583 3.97917 5.5875 3.5875C5.97917 3.19583 6.45 3 7 3H17C17.55 3 18.0208 3.19583 18.4125 3.5875C18.8042 3.97917 19 4.45 19 5V21L12 18L5 21ZM7 17.95L12 15.8L17 17.95V5H7V17.95Z" fill="#0185E4" />
        </svg>
    },
]


const AssessmentsListItem = ({ open, assessment }) => {

    const dropdownOptions = useSelector(selectAllAssessments)
    const assessmentLink = useSelector(selectAssessmentLink)
    const assessmentLinkLoading = useSelector(selectAssessmentLinkLoading)
    const editAssessmentLoading = useSelector(selectEditAssessmentLoading)
    const deleteAssessmentLoading = useSelector(selectDeleteAssessmentLoading)
    const userAssessmentsCount = useSelector(selectUserAssessmentsCount)
    const dispatch = useDispatch()

    const [showSections, setShowSections] = useState(open)
    const [hidden, setHidden] = useState(assessment.hidden)
    const [edit, setEdit] = useState(false)
    const [showDeleteModal, setshowDeleteModal] = useState(false)
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
        dispatch(toggleAssessmentHidden({ assessment_id: assessment.assessment_id }))
        setHidden(!hidden)
    }

    const handleEdit = (value) => {
        const prev_str_type = dropdownOptions.filter((item) => item.assessment_id == assessment.assessment_id)[0].str_type
        const curr_str_type = dropdownOptions.filter((item) => item.assessment_id == value.value.assessment_id)[0].str_type
        const prev_id = dropdownOptions.filter((item) => item.assessment_id == assessment.assessment_id)[0]._id
        const curr_id = dropdownOptions.filter((item) => item.assessment_id == value.value.assessment_id)[0]._id
        setEdit(false)
        dispatch(editAssessment({ curr_assessment_name: value.label, prev_assessment_id: assessment.assessment_id, curr_assessment_id: value.value.assessment_id, prev_str_type, curr_str_type, prev_id, curr_id }))
    }

    const handleDelete = () => {
        setshowDeleteModal(true)
    }

    const handleDeleteConfirmed = () => {
        const str_type = dropdownOptions.filter((item) => item.assessment_id == assessment.assessment_id)[0].str_type
        const _id = dropdownOptions.filter((item) => item.assessment_id == assessment.assessment_id)[0]._id
        dispatch(deleteAssessment({ assessment_id: assessment.assessment_id, str_type, _id }))
        deleteAssessmentLoading && setshowDeleteModal(false)
    }

    const handleTakeAssessmentClicked = (e) => {
        e.preventDefault();
        setShowAssessmentModal(true)
        dispatch(getAssessmentLink({ assessment_name: assessment.assessment_name, assessment_id: assessment.assessment_id }));
    }

    return (
        <>
            <tr>
                <td>
                    {edit ?
                        !editAssessmentLoading && <Select
                            isClearable
                            options={dropdownOptions?.map((item) => {
                                return { value: item, label: item.assessment_name }
                            })}
                            classNamePrefix="select"
                            placeholder="Enter skill"
                            theme={selectThemeColors}
                            menuPosition='fixed'
                            onChange={handleEdit}
                        />
                        :
                        <b>{assessment.assessment_name}</b>
                    }
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

                <td>
                    {assessment.completed_date ?
                        <>
                            {
                                retakeAvailable(assessment) ?
                                    <>
                                    {userAssessmentsCount >= 5? 
                                    <CardText>Sorry, you're run out of assessments</CardText>
                                    :
                                    <a href="#" onClick={handleTakeAssessmentClicked}>
                                        <b>Re-take assessment</b>
                                    </a>}
                                    </>
                                    :

                                    <Tag
                                        hasNew={false}
                                        count={daysLeftForRetake(assessment) + " days left"}
                                        noMargin={true}
                                    />
                            }
                        </>
                        :
                        <>
                        {userAssessmentsCount >= 5 ? 
                        <CardText>Sorry you're run out of assessments</CardText>
                        :
                        <a href="#" onClick={handleTakeAssessmentClicked}>
                            <b>Take assessment</b>
                        </a>}
                        </>
                    }
                </td>

                <td style={{ minWidth: 180 }}>
                    <div className="d-flex align-items-center justify-content-between">
                        {assessment.completed_date ? <div className="cursor-pointer" onClick={handleHidden}>
                            <>
                                <div id="eye">
                                    {hidden ?
                                        <ActionOffContainer>
                                            <EyeOff width="20px" height="20px" color="#EA5455" />
                                        </ActionOffContainer>
                                        :
                                        <ActionContainer>
                                            <Eye width="20px" height="20px" color="#0185E4" />
                                        </ActionContainer>
                                    }
                                </div>
                                <UncontrolledTooltip target="eye">
                                    Use this to hide assessment score from your public profile.
                                </UncontrolledTooltip>
                            </>
                        </div>

                            :
                            <div className="d-flex gap-1">
                                <div className="cursor-pointer">
                                    {editAssessmentLoading ?
                                        <Spinner color="primary" />
                                        :
                                        <ActionContainer onClick={() => setEdit(!edit)}>
                                            <Edit width="20px" height="20px" color="#0185E4" />
                                        </ActionContainer>}
                                </div>
                                <div className="cursor-pointer">
                                    <ActionOffContainer onClick={handleDelete}>
                                        <Trash2 width="20px" height="20px" color="#EA5455" />
                                    </ActionOffContainer>
                                </div>
                            </div>
                        }

                        {assessment.sections &&
                            <div className="cursor-pointer" onClick={() => setShowSections(!showSections)}>
                                {showSections ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                    </svg>}
                            </div>
                        }
                    </div>
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
                    <td></td>
                </tr>
            ))}

            <Modal isOpen={showDeleteModal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
                <ModalHeader toggle={() => setshowDeleteModal(false)} />
                <ModalBody>
                    <div className="d-flex justify-content-between pr-1">
                        <img className="gif" src={DeleteGif} width={244} height={244} alt="gif" />
                        <div className="me-4">
                            <CardTitle className="modal-heading">Are you sure you want to remove skill/tool?</CardTitle>
                            <CardText className="modal-body-text fw-light w-76">
                                Skill/tool will be removed from your profile.
                            </CardText>
                            <CardText className="modal-body-text fw-light w-76">
                                <b>{assessment.assessment_name}</b>
                            </CardText>
                        </div>
                    </div>
                    <div className="d-flex gap-1 me-1 justify-content-end">
                        <Button outline color="primary" onClick={() => setshowDeleteModal(false)}>
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
                        <a href={assessmentLinkLoading ? "#" : assessmentLink}>
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