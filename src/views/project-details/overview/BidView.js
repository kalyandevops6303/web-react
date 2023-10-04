import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { BidWrapper } from '../style';
import BidTimeline from './BidTimeline';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';

const BidView = () => {
  const projectDetailsData = useSelector(projectDetails);
  return (
    <BidWrapper>
      <Card>
        <CardTitle className="main-card-title">Bid Stage</CardTitle>
        <CardBody className="main-card-body">{projectDetailsData && <BidTimeline />}</CardBody>
      </Card>
    </BidWrapper>
  );
};
export default memo(BidView);
