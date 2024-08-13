import React from 'react';
import { Button, Card, CardBody, CardHeader, CardSubtitle, CardTitle } from 'reactstrap';
import { ChevronRight } from 'react-feather';
import { ProfileFormContainer } from '../style';

const FULL_STACK_DEV_ASSESSMENT = 'https://trumiotest.xobin.com/wc/assessment/LL2EG743EAR';
const AI_ML_DEV_ASSESSMENT = 'https://trumiotest.xobin.com/wc/assessment/LL2EG743EAR';
const PRODUCT_MANAGER_ASSESSMENT = 'https://trumiotest.xobin.com/wc/assessment/LL2EG743EAR';

const InternHiringXobin = () => {

  const redirectToFullStackAssessment = () => {
    window.open(FULL_STACK_DEV_ASSESSMENT, "_blank");
  };
  const redirectToAIMLAssessment = () => {
    window.open(AI_ML_DEV_ASSESSMENT, '_blank');
  };
  const redirectToPMAssessment = () => {
    window.open(PRODUCT_MANAGER_ASSESSMENT, '_blank');
  };

  return (
    <ProfileFormContainer>
      <Card className="w-75">
        <CardHeader>
          <h4 className="m-0 mt-1">Intern Hiring For Full Stack Engineers</h4>
        </CardHeader>
        <hr className="m-0 card-header-border" />
        <CardBody>
          <CardTitle>Want to get an internship at HackerRank</CardTitle>
          <CardSubtitle>Click on below button to apply</CardSubtitle>

          <Button color="primary" className="ml-2 mr-1" onClick={redirectToFullStackAssessment}>
            Take Assessment
          </Button>
        </CardBody>
      </Card>
      <Card className="w-75">
        <CardHeader>
          <h4 className="m-0 mt-1">Intern Hiring for AI/ML engineers</h4>
        </CardHeader>
        <hr className="m-0 card-header-border" />
        <CardBody>
          <CardTitle>Want to get an internship at HackerRank</CardTitle>
          <CardSubtitle>Click on below button to apply</CardSubtitle>
          <Button color="primary" className="ml-2 mr-1" onClick={redirectToAIMLAssessment}>
            Take Assessment
          </Button>
        </CardBody>
      </Card>
      <Card className="w-75">
        <CardHeader>
          <h4 className="m-0 mt-1">Intern Hiring for Product Managers</h4>
        </CardHeader>
        <hr className="m-0 card-header-border" />
        <CardBody>
          <CardTitle>Want to get an internship at HackerRank</CardTitle>
          <CardSubtitle>Click on below button to apply</CardSubtitle>
          <Button color="primary" className="ml-2 mr-1" onClick={redirectToPMAssessment}>
            Take Assessment
          </Button>
        </CardBody>
      </Card>
      <div className="d-flex justify-content-end w-75">
        <Button
          onClick={() => window.open('https://www.hackerrank.com/careers/', '_block')}
          color="primary"
          type="submit"
        >
          <span className="me-50">Continue</span>
          <ChevronRight size={14} />
        </Button>
      </div>
    </ProfileFormContainer>
  );
};

export default InternHiringXobin;
