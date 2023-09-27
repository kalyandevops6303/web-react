/* eslint-disable react/prop-types */
// ** Third Party Components
import { Link } from 'react-router-dom';
import { User, Briefcase } from 'react-feather';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap';
import { RewardCardWrapper } from './style';

const RewardsCard = ({ cols }) => {
  const data = [
    {
      title: '$0',
      subtitle: 'Rewards',
      color: 'light-info',
      icon: <User size={24} />,
    },

    {
      title: '0',
      subtitle: 'Referrals',
      color: 'light-warning',
      icon: <Briefcase size={24} />,
    },
  ];

  const renderData = () =>
    data.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Col key={index} {...cols}>
        <div className="d-flex align-items-center">
          <Avatar color={item.color} icon={item.icon} className="me-1" />
          <div className="my-auto">
            <h4 className="fw-bolder mb-0">{item.title}</h4>
            <CardText className="font-small-2 mb-0">{item.subtitle}</CardText>
          </div>
        </div>
      </Col>
    ));

  return (
    <RewardCardWrapper>
      <Card className="card-reward">
        <CardHeader>
          <CardTitle tag="h4">Rewards</CardTitle>
          <Link to="/referral-reward/all">
            <CardText className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary cursor-pointer">
              View All
            </CardText>
          </Link>
        </CardHeader>
        <CardBody className="reward-body">
          <Row className="reward-comp">{renderData()}</Row>
          <CardText className="text-center card-text font-small-4 mt-20 text-primary earn-more">Earn More</CardText>
        </CardBody>
      </Card>
    </RewardCardWrapper>
  );
};

export default RewardsCard;
