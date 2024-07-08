import React, { useEffect, useState } from "react";
import { PaymentInfoBanner } from "../project-details/style";
import theme from "../../configs/themeVariables";
import { Info } from "react-feather";
import { CardText } from "reactstrap";
import { SuccessInfoBanner } from "./style";
import CustomerSupportModal from "../modals/CustomerSupportModal";
import { useDispatch, useSelector } from "react-redux";
import { selectDeleteNonAssessmentLoading } from "../../redux/selectors/assessmentSelectors";
import { deleteNonAssessment } from "../../redux/actions/assessmentActions";
import { deleteRequest, getCustomerSupportList } from "../../redux/actions/supportActions";
import { selectDeleteRequestLoading } from "../../redux/selectors/supportSelectors";
import { SUPPORT_EMAIL } from "../../utility/constants/Constant";

const AssessmentsRequestListItem = ({ request }) => {

    const dispatch = useDispatch()

    const deleteRequestLoading = useSelector(selectDeleteRequestLoading)
    const [customerSupportModal, setCustomerSupportModal] = useState(false)

    const toggleCustomerSupportModal = (event) => {
        event.preventDefault()
        setCustomerSupportModal(!customerSupportModal)
    }

    const customerSupportModalSuccess = () => {
        setCustomerSupportModal(false)
        dispatch(deleteNonAssessment({ strType: request.str_type, id: request.str_id }))
        dispatch(getCustomerSupportList({
            data: {
                issue_types: [
                    "missing_assessment"
                ]
            }
        }))
    }

    useEffect(() => {
        dispatch(getCustomerSupportList({
            data: {
                issue_types: [
                    "missing_assessment"
                ]
            }
        }))
    }, [])

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
            </tr>
            {customerSupportModal &&
                (<CustomerSupportModal
                    onSuccess={customerSupportModalSuccess}
                    modal={customerSupportModal}
                    toggleModal={toggleCustomerSupportModal}
                    defaultSelected={["missing_assessment"]}
                    assessment={request.assessment_name}
                />)}
        </>
    )
}

export default AssessmentsRequestListItem