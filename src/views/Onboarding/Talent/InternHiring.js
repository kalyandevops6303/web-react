import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardSubtitle, CardTitle, CardText, Label } from 'reactstrap';
import { Form, FormGroup } from 'reactstrap';
import { ChevronRight } from 'react-feather';
import { ProfileFormContainer } from '../style';
import { Input } from 'reactstrap';

const FULL_STACK_DEV_ASSESSMENT = 'https://trumiotest.xobin.com/wc/assessment/LL2EG743EAR';
const AI_ML_DEV_ASSESSMENT = 'https://trumiotest.xobin.com/wc/assessment/LL2EG743EAR';
const PRODUCT_MANAGER_ASSESSMENT = 'https://trumiotest.xobin.com/wc/assessment/LL2EG743EAR';

const InternHiring = () => {

  const redirectToFullStackAssessment = () => {
    window.open(FULL_STACK_DEV_ASSESSMENT, "_blank");
  };
  const redirectToAIMLAssessment = () => {
    window.open(AI_ML_DEV_ASSESSMENT, '_blank');
  };
  const redirectToPMAssessment = () => {
    window.open(PRODUCT_MANAGER_ASSESSMENT, '_blank');
  };

  const [githubLink, setGithubLink] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('GitHub Link:', githubLink);
    console.log('File:', file);
  };


  return (
    <ProfileFormContainer>
      <Card className="w-75">
        <CardHeader>
          <h4 className="m-0 mt-1">Full Stack Engineer (Intern)</h4>
        </CardHeader>
        <hr className="m-0 card-header-border" />
        <CardBody>
          <CardText>Thank you for showing interest in Trumio. Find your problem statement below, and build a solution to the best of your ability.  </CardText>
          <CardText>To submit your solution:</CardText>
          <ul>
            <li>Upload your code in a public GitHub repository and share the link below.</li>
            <li>Upload your zipped folder. (optional)</li>
          </ul>
          {/* <Button color="primary" className="ml-2 mr-1" onClick={redirectToFullStackAssessment}>
            Take Assessment
          </Button> */}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="githubLink"><b>GitHub Link</b></Label>
              <Input
                style={{ marginBottom: "-20px" }}
                type="url"
                name="githubLink"
                id="githubLink"
                placeholder="Enter your GitHub link"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="fileUpload"><b>Upload File</b></Label>
              <Input
                type="file"
                name="file"
                id="fileUpload"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </FormGroup>
            <Button type="submit" color="primary">Submit</Button>
          </Form>
        </CardBody>
      </Card>
      <Card className="w-75">
        <CardHeader>
          <h4 className="m-0 mt-1">AI-ML Engineer (Intern)</h4>
        </CardHeader>
        <hr className="m-0 card-header-border" />
        <CardBody>
          <CardText>Thank you for showing interest in Trumio. Find your problem statement below, and build a solution to the best of your ability.  </CardText>
          <CardText>To submit your solution:</CardText>
          <ul>
            <li>Upload your code in a public GitHub repository and share the link below.</li>
            <li>Upload your zipped folder. (optional)</li>
          </ul>
          {/* <Button color="primary" className="ml-2 mr-1" onClick={redirectToFullStackAssessment}>
            Take Assessment
          </Button> */}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="githubLink"><b>GitHub Link</b></Label>
              <Input
                style={{ marginBottom: "-20px" }}
                type="url"
                name="githubLink"
                id="githubLink"
                placeholder="Enter your GitHub link"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="fileUpload"><b>Upload File</b></Label>
              <Input
                type="file"
                name="file"
                id="fileUpload"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </FormGroup>
            <Button type="submit" color="primary">Submit</Button>
          </Form>
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

export default InternHiring;
