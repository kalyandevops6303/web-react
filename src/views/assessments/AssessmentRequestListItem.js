import React, { useEffect, useState } from "react";
import { PaymentInfoBanner } from "../project-details/style";
import theme from "../../configs/themeVariables";
import { Info, Trash2 } from "react-feather";
import { CardText, Spinner, Modal, ModalBody, ModalHeader, CardTitle, Button } from "reactstrap";
import { ActionOffContainer, SuccessInfoBanner } from "./style";
import CustomerSupportModal from "../modals/CustomerSupportModal";
import { useDispatch, useSelector } from "react-redux";
import { selectDeleteNonAssessmentLoading } from "../../redux/selectors/assessmentSelectors";
import { deleteNonAssessment, getAllAssessments, getUserAssessments } from "../../redux/actions/AssessmentActions";
import DeleteGif from "../../assets/images/gifs/delete.gif";
import { deleteRequest, getCustomerSupportList } from "../../redux/actions/supportActions";
import { selectDeleteRequestLoading } from "../../redux/selectors/supportSelectors";
import { SUPPORT_EMAIL } from "../../utility/constants/Constant";

const AssessmentsRequestListItem = ({ request }) => {

    const dispatch = useDispatch()

    const deleteNonAssessmentLoading = useSelector(selectDeleteNonAssessmentLoading)
    const deleteRequestLoading = useSelector(selectDeleteRequestLoading)
    const [customerSupportModal, setCustomerSupportModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const toggleCustomerSupportModal = (event) => {
        event.preventDefault()
        setCustomerSupportModal(!customerSupportModal)
    }

    const customerSupportModalSuccess = () => {
        setCustomerSupportModal(false)
        dispatch(deleteNonAssessment({ str_type: request.str_type, _id: request.str_id }))
        dispatch(getCustomerSupportList({
            data: {
                issue_types: [
                    "missing_assessment"
                ]
            }
        }))
    }

    const handleDelete = () => {
        setShowDeleteModal(true)
    }

    const handleDeleteConfirmed = () => {
        if (request.assessment_name) {
            dispatch(deleteNonAssessment({ str_type: request.str_type, _id: request.str_id }))
        }
        else {
            dispatch(deleteRequest({ data: request.id }))
        }
    }

    useEffect(() => {
        !deleteRequestLoading && setShowDeleteModal(false)
        dispatch(getCustomerSupportList({
            data: {
                issue_types: [
                    "missing_assessment"
                ]
            }
        }))
    }, [deleteRequestLoading])

    return (
        <>
            <tr>
                <td style={{ maxWidth: 200 }}>
                    <b>{request.assessment_name || request.missing_name}</b>
                </td>
                <td>
                    <>
                        {request.assessment_name ?
                            <div className="d-flex">
                                <CardText>Sorry, assessment unavailable. &nbsp;</CardText>
                                <b><a href="#"
                                    onClick={toggleCustomerSupportModal}
                                >Contact Support</a></b>
                            </div>
                            :
                            <>
                                {request.approval_status == "IN_PROCESS" ?
                                    <PaymentInfoBanner className="d-flex px-1 py-1">
                                        <Info size={18} color={theme.activeNavPillText} className="me-50 info-banner-icon" />
                                        <p className="font-medium-1 m-0 info">
                                            <span className="fw-bolder font-medium-1">{SUPPORT_EMAIL}</span>  has received your query. Our team is  looking into it. We will revert soon.
                                        </p>
                                    </PaymentInfoBanner>
                                    :
                                    <SuccessInfoBanner className="d-flex px-1 py-1">
                                        <Info size={18} color={theme.succesGreenColor} className="me-50 info-banner-icon" />
                                        <p className="font-medium-1 m-0 info">
                                            <span className="fw-bolder font-medium-1">{SUPPORT_EMAIL}</span>  has resolved your query. Please check your email.
                                        </p>
                                    </SuccessInfoBanner>
                                }
                            </>
                        }
                    </>
                </td>
                <td>
                    <div className="d-flex gap-1 align-items-center w-25">
                        <div className="cursor-pointer">
                            <ActionOffContainer onClick={handleDelete}>
                                <Trash2 width="20px" height="20px" color="#EA5455" />
                            </ActionOffContainer>
                        </div>
                    </div>
                </td>

            </tr>
            {customerSupportModal &&
                (<CustomerSupportModal
                    onSuccess={customerSupportModalSuccess}
                    modal={customerSupportModal}
                    toggleModal={toggleCustomerSupportModal}
                    defaultSelected={["missing_assessment"]}
                    assessment={request.assessment_name}
                />)}

            <Modal isOpen={showDeleteModal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
                <ModalHeader toggle={() => setShowDeleteModal(false)} />
                <ModalBody>
                    <div className="d-flex justify-content-between pr-1">
                        <img className="gif" src={DeleteGif} width={244} height={244} alt="gif" />
                        <div className="me-4">
                            <CardTitle className="modal-heading">Are you sure you want to remove skill/tool?</CardTitle>
                            <CardText className="modal-body-text fw-light w-76">
                                Skill/tool will be removed from your profile.
                            </CardText>
                            <CardText className="modal-body-text fw-light w-76">
                                <b>{request.assessment_name || request.missing_name}</b>
                            </CardText>
                        </div>
                    </div>
                    <div className="d-flex gap-1 me-1 justify-content-end">
                        <Button outline color="primary" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button disabled={deleteNonAssessmentLoading || deleteRequestLoading} color="danger" onClick={handleDeleteConfirmed}>
                            {deleteNonAssessmentLoading || deleteRequestLoading ? <Spinner color="light" /> : "Remove"}
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default AssessmentsRequestListItem