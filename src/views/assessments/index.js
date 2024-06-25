import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { NavigationText, AssessmentsNavigation, ArrowWrapper } from './style';
import { useNavigate } from 'react-router-dom';
import AssessmentsList from './AssessmentsList';
import { PaymentInfoBanner } from '../project-details/style';
import { Info } from 'react-feather';
import theme from '../../configs/themeVariables';
import { getAllAssessments, getUserAssessments, prepopulateAssessments } from '../../redux/actions/AssessmentActions';
import { selectAllAssessments, selectNotUserAssessments, selectUserAssessments, selectUserAssessmentsLoading } from '../../redux/selectors/assessmentSelectors';
import { ArrowLeft } from 'react-feather';
import AssessmentsRequestList from './AssessmentsRequestList';
import { selectSupportList } from '../../redux/selectors/supportSelectors';
import { getCustomerSupportList } from '../../redux/actions/supportActions';

const Assessments = () => {

    const location = useLocation()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const assessmentsListData = useSelector(selectUserAssessments)
    const assessmentsListDataLoading = useSelector(selectUserAssessmentsLoading)
    const dropdownList = useSelector(selectAllAssessments)
    const notUserAssessments = useSelector(selectNotUserAssessments)
    const supportRequests = useSelector(selectSupportList)

    useEffect(() => {
        dispatch(prepopulateAssessments());
        dispatch(getUserAssessments());
        dispatch(getAllAssessments());
        dispatch(getCustomerSupportList({
            data: {
                issue_types: [
                    "missing_assessment"
                ]
            }
        }));
    }, [])

    return (
        <div>
            <AssessmentsNavigation onClick={() => navigate("/dashboard")}>
                <ArrowWrapper>
                    <ArrowLeft width={18} height={18} color='white' />
                </ArrowWrapper>
                <NavigationText>My Assessment</NavigationText>
            </AssessmentsNavigation>

            {<Card>
                <CardBody>
                    {/* ON HOLD */}
                    {/* <RecommendedAssessments data={recommendedAssessmentsData} /> */}
                    <PaymentInfoBanner className="mb-2 d-flex px-1 py-2">
                        <Info size={18} color={theme.activeNavPillText} className="me-50 info-banner-icon" />
                        <p className="font-medium-1 m-0 info">
                            <span className="fw-bolder font-medium-1">Note:</span> You allowed up to 5 assessments. These assessment scores will increase your discoverability to clients.
                        </p>
                    </PaymentInfoBanner>
                    <AssessmentsList setOpen={location.state} data={assessmentsListData} dropdownOptions={dropdownList.filter(item => !assessmentsListData?.some(assessment => assessment.assessment_id === item.assessment_id))} />
                    <AssessmentsRequestList notUserAssessments={notUserAssessments} supportRequests={supportRequests} />
                </CardBody>
            </Card>}
        </div>
    );
};

export default Assessments;
