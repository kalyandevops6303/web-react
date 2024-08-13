import React from 'react';
import { Button, Card, CardBody, CardHeader, CardSubtitle, CardTitle } from 'reactstrap';
import { ChevronRight } from 'react-feather';
import { ProfileFormContainer } from '../style';

const InternHiring = () => (
  <ProfileFormContainer>
    <Card className="w-75">
      <CardHeader>
        <h4 className="m-0 mt-1">Intern Hiring</h4>
      </CardHeader>
      <hr className="m-0 card-header-border" />
      <CardBody>
        <CardTitle>Want to get an internship at HackerRank</CardTitle>
        <CardSubtitle>Click on below button to apply</CardSubtitle>
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

export default InternHiring;
