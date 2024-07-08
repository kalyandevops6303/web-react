import React, {useEffect, useState} from "react"
import { Info } from "react-feather"
import { CardTitle, CardText, Table } from "reactstrap"
import theme from "../../configs/themeVariables"
import { TableWrapper } from "./style"
import AssessmentsRequestListItem from "./AssessmentRequestListItem"
import CustomerSupportModal from "../modals/CustomerSupportModal"
import { getCustomerSupportList } from "../../redux/actions/supportActions"
import { useDispatch } from "react-redux"
import { isEmpty } from "lodash"

const AssessmentsRequestList = ({ notUserAssessments, supportRequests }) => {

    const tableHeadings = ["SKILLS", "NOTE"]

    const dispatch = useDispatch();
    const [customerSupportModal, setCustomerSupportModal] = useState(false)
    const [showTable, setShowTable] = useState(false)

    useEffect(() => {
        const totalEntries = (!isEmpty(notUserAssessments) ? notUserAssessments.length : 0) + (!isEmpty(supportRequests) ? supportRequests.length : 0)
        totalEntries > 0 ? setShowTable(true) : setShowTable(false)
    }, [notUserAssessments, supportRequests])

    const toggleCustomerSupportModal = (event) => {
        event.preventDefault()
        setCustomerSupportModal(!customerSupportModal)
    }

    const customerSupportModalSuccess = () => {
        setCustomerSupportModal(false)
        dispatch(getCustomerSupportList({
            data: {
                issue_types: [
                    "missing_assessment"
                ]
            }
        }))
    }

    return (
        <>
            <div className='mt-5'>
                <div className="d-flex align-items-center justify-content-between">
                    {showTable && 
                    <CardTitle tag="h4">
                        Skills & Tools Assessment Request  &nbsp;
                    </CardTitle>}

                    <CardText className="d-flex align-items-center cursor-pointer"
                    onClick={toggleCustomerSupportModal}
                    >
                        <Info size={18} color={theme.activeNavPillText} className="me-50 info-banner-icon" />
                        <p className="font-medium-1 m-0 info text-primary">
                            Couldn't find your skills assessment?
                        </p>
                    </CardText>
                </div>

                {showTable && 
                <TableWrapper>
                    <Table responsive>
                        <thead>
                            <tr>
                                {tableHeadings.map((heading) => (
                                    <th>{heading}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                        {notUserAssessments?.map((request) => (
                            <AssessmentsRequestListItem request={request} />
                        ))}
                        {supportRequests?.map((request) => (
                            <AssessmentsRequestListItem request={request} />
                        ))}
                        </tbody>
                    </Table>
                </TableWrapper>}

                {customerSupportModal &&
                (<CustomerSupportModal
                    onSuccess={customerSupportModalSuccess}
                    modal={customerSupportModal}
                    toggleModal={toggleCustomerSupportModal}
                    defaultSelected={["missing_assessment"]}
                />)}
            </div>
        </>
    )
}

export default AssessmentsRequestList