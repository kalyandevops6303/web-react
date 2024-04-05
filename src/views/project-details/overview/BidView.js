import { memo } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { BidWrapper } from '../style';
import BidTimeline from './BidTimeline';

const BidView = () => (
  <BidWrapper>
    <Card>
      <CardTitle className="main-card-title">Bid Stage</CardTitle>

      <CardBody className="main-card-body">
        <BidTimeline />
      </CardBody>
    </Card>
  </BidWrapper>
);
export default memo(BidView);
