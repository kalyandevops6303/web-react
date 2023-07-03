import React from 'react';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';

const Disputes = () => (
  <Card>
    <CardHeader>
      <CardTitle tag="h4">Disputes</CardTitle>
      <CardText className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary">View All</CardText>
    </CardHeader>
    <CardBody className="pt-1 pb-5">
      <CardText className="text-center card-text font-medium-1 fw-bold mt-20 mb-2 text-primary">
        No Dispute raised !
      </CardText>
    </CardBody>
  </Card>
);

export default Disputes;
