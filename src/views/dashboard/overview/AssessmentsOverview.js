import { Card, CardHeader, CardTitle, CardBody, CardText, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AssessmentResultIndicator, AssessmentResultText } from './style';
import assessmentsDashboard from '../../../assets/images/assessments_dashboard.png';
import { useEffect, useState } from 'react';
import { getUserAssessments } from '../../../redux/actions/AssessmentActions';
import { selectUserAssessments } from '../../../redux/selectors/assessmentSelectors';
import { ChevronRight } from 'react-feather';


const AssessmentsListItem = ({ assessment }) => {
  return (
    <CardText>
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
    </CardText>
  )
}

const AssessmentsOverview = () => {

  const dispatch = useDispatch();
  const userAssessments = useSelector(selectUserAssessments);

  const [showAssessmentsList, setShowAssessmentsList] = useState(false);

  const getAssessmentsLeftCount = (assessments) => {
    const completedCount = assessments.filter(obj => obj.hasOwnProperty("completed_date")).length;
    return assessments.length - completedCount;
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

            {userAssessments.length > 0 &&
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                      </svg>
                      :
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                      </svg>}
                  </div>
                </div>
              </div>
            }
          </div>
          <CardText
            className="mt-1"
          >
            {userAssessments.length > 0 ?
              <>
                <span>{getAssessmentsLeftCount(userAssessments)} / {userAssessments.length} Assessments Left</span>
              </>
              :
              <span>Get your Skills assessed & increase your chance of getting hired!</span>
            }
          </CardText>
        </CardHeader>
        {userAssessments.length == 0 ? <CardBody>
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
                userAssessments.map((assessment) => (
                  <div>
                    {assessment.completed_date &&
                      <AssessmentsListItem assessment={assessment} />
                    }

                  </div>
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

      {userAssessments.length == 0 &&
        <div className=''>
          <img src={assessmentsDashboard}></img>
        </div>
      }
    </Card>
  );
};
export default AssessmentsOverview;
