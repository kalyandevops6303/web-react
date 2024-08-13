import React from 'react';
import { Button, Card, CardBody, CardHeader, CardSubtitle, CardTitle, CardText } from 'reactstrap';
import { ChevronRight } from 'react-feather';
import { ProfileFormContainer } from '../style';

const FULL_STACK_DEV_ASSESSMENT = 'https://trumiotest.xobin.com/wc/assessment/LL2EG743EAR';
const AI_ML_DEV_ASSESSMENT = 'https://trumiotest.xobin.com/wc/assessment/LL2EG743EAR';
const PRODUCT_MANAGER_ASSESSMENT = 'https://trumiotest.xobin.com/wc/assessment/LL2EG743EAR';

const InternXobinHiring = () => {

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
          <h4 className="m-0 mt-1">Full Stack Engineer (Intern)</h4>
        </CardHeader>
        <hr className="m-0 card-header-border" />
        <CardBody>
          <CardText>Thank you for showing interest in Trumio. Click on <b>Take Assessment</b> and answer the questions within this assessment to the best of your ability.</CardText>
          <CardText>Before you start with the assessment, make sure to:</CardText>
          <ul>
            <li>Take up this assessment on a laptop or desktop rather than on a mobile phone.</li>
            <li>Close all other applications and browser tabs to ensure no distractions.</li>
            <li>Block time to start and finish the assessment in one go. Please make sure you are not interrupted.</li>
            <li>Please take up the test in Incognito window to avoid browser extensions/plugins interference and ensure a seamless test experience.</li>
          </ul>
          <Button color="primary" className="ml-2 mr-1" onClick={redirectToFullStackAssessment}>
            Take Assessment
          </Button>
        </CardBody>
      </Card>
      <Card className="w-75">
        <CardHeader>
          <h4 className="m-0 mt-1">AI-ML Engineer (Intern)</h4>
        </CardHeader>
        <hr className="m-0 card-header-border" />
        <CardBody>
          <CardText>Thank you for showing interest in Trumio. Click on <b>Take Assessment</b> and answer the questions within this assessment to the best of your ability.</CardText>
          <CardText>Before you start with the assessment, make sure to:</CardText>
          <ul>
            <li>Take up this assessment on a laptop or desktop rather than on a mobile phone.</li>
            <li>Close all other applications and browser tabs to ensure no distractions.</li>
            <li>Block time to start and finish the assessment in one go. Please make sure you are not interrupted.</li>
            <li>Please take up the test in Incognito window to avoid browser extensions/plugins interference and ensure a seamless test experience.</li>
          </ul>
          <Button color="primary" className="ml-2 mr-1" onClick={redirectToFullStackAssessment}>
            Take Assessment
          </Button>
        </CardBody>
      </Card>
      <Card className="w-75">
        <CardHeader>
          <h4 className="m-0 mt-1">Product Manager (Intern)</h4>
        </CardHeader>
        <hr className="m-0 card-header-border" />
        <CardBody>
          <CardText>Thank you for showing interest in Trumio. Click on <b>Take Assessment</b> and answer the questions within this assessment to the best of your ability.</CardText>
          <CardText>Before you start with the assessment, make sure to:</CardText>
          <ul>
            <li>Take up this assessment on a laptop or desktop rather than on a mobile phone.</li>
            <li>Close all other applications and browser tabs to ensure no distractions.</li>
            <li>Block time to start and finish the assessment in one go. Please make sure you are not interrupted.</li>
            <li>Please take up the test in Incognito window to avoid browser extensions/plugins interference and ensure a seamless test experience.</li>
          </ul>
          <Button color="primary" className="ml-2 mr-1" onClick={redirectToFullStackAssessment}>
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

export default InternXobinHiring;
