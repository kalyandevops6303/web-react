import { Card, CardHeader, CardTitle, CardBody, CardText, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AssessmentResultIndicator, AssessmentResultText } from './style';
import assessmentsDashboard from '../../../assets/images/assessments_dashboard.png';
import { useEffect, useState } from 'react';
import { getUserAssessments } from '../../../redux/actions/assessmentActions';
import { selectUserAssessments, selectUserAssessmentsCount } from '../../../redux/selectors/assessmentSelectors';
import { ChevronRight, ChevronDown, ChevronUp } from 'react-feather';
import { currentAssessmentLimit } from "../../../utility/constants/AssessmentConstants.js";

const AssessmentsListItem = ({ assessment }) => {
  return (
    <div>
      <div className='d-flex align-items-center justify-content-between'>
        <Link to="/assessments" state={assessment.assessment_id}>
          <div className='d-flex gap-1 cursor-pointer'>
            <AssessmentResultIndicator grade={assessment.assessment_grade} />
            <div style={{ fontWeight: 500 }} className='d-flex align-items-center gap-1'>
              <div>{assessment.assessment_name}</div>
              <ChevronRight width={16} />
            </div>
          </div>
        </Link>
        <AssessmentResultText grade={assessment.assessment_grade}>
          <b><small>{assessment.assessment_grade}</small></b>
        </AssessmentResultText>
      </div>
    </div>
  )
}

const AssessmentsOverview = () => {

  const dispatch = useDispatch();
  const userAssessments = useSelector(selectUserAssessments);
  const userAssessmentsCount = useSelector(selectUserAssessmentsCount);

  const [showAssessmentsList, setShowAssessmentsList] = useState(false);

  const getAssessmentsLeftCount = () => {
    return currentAssessmentLimit - userAssessmentsCount
  }

  useEffect(() => {
    dispatch(getUserAssessments());
  }, [])

  return (
    <Card className="time-card d-flex flex-row justify-content-between">
      <div className='w-100'>
        <CardHeader className="d-flex flex-column align-items-start w-100">
          <div className='d-flex flex-row justify-content-between w-100'>

            <CardTitle tag="h4">My Assessments</CardTitle>

            {userAssessmentsCount &&
              <div className='d-flex gap-1'>
                <Link to="/assessments">
                  <CardText
                    className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary cursor-pointer"
                  >
                    View All
                  </CardText>
                </Link>

                <div className="d-flex">
                  <div className="cursor-pointer" onClick={() => setShowAssessmentsList(!showAssessmentsList)}>
                    {showAssessmentsList ?
                      <ChevronUp size={18}/>
                      :
                      <ChevronDown size={18}/>}
                  </div>
                </div>
              </div>
            }
          </div>
          <CardText
            className="mt-1"
          >
            {userAssessmentsCount ?
              <>
                <span>{getAssessmentsLeftCount()} / {currentAssessmentLimit} Assessments Left</span>
              </>
              :
              <span>Get your Skills assessed & increase your chance of getting hired!</span>
            }
          </CardText>
        </CardHeader>
        {!userAssessmentsCount ? <CardBody>
          <Link to="/assessments">
            <Button color="transparent" className="text-primary border-primary">
              Take Assessment
            </Button>
          </Link>
        </CardBody>
          :
          <>
            {showAssessmentsList && <CardBody className="d-flex flex-column gap-1">
              {
                userAssessments?.map((assessment) => (
                  <>
                    {assessment.completed_date &&
                      <AssessmentsListItem assessment={assessment} />
                    }

                  </>
                ))
              }
              <div className='d-flex justify-content-center'>
                <Link to="/assessments">
                  {getAssessmentsLeftCount(userAssessments) > 0 && <Button color="transparent" className="text-primary border-primary mt-0">
                    {getAssessmentsLeftCount(userAssessments)} Assessments Left
                  </Button>}
                </Link>
              </div>
            </CardBody>}
          </>
        }
      </div>

      {!userAssessmentsCount &&
        <div>
          <img src={assessmentsDashboard}></img>
        </div>
      }
    </Card>
  );
};
export default AssessmentsOverview;
