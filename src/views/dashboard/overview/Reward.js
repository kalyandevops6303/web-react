/* eslint-disable react/prop-types */
// ** Third Party Components
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Users } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap';
import { RewardCardWrapper } from './style';
import { getTotalReferralAmount } from '../../../redux/actions/dashboardActions';
import { totalReferralAmount } from '../../../redux/selectors/dashboardSelectors';
import ReferNowModal from '../../ReferralAndReward/overview/ReferNowModal';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import { clubStatus } from '../../../utility/constants/Constant';

const RewardsCard = ({ cols }) => {
  const dispatch = useDispatch();

  const totalReferralAmountData = useSelector(totalReferralAmount);
  const userDetailsData = useSelector(selectUserData);

  const isDisabled = userDetailsData?.club_status === clubStatus.IN_REVIEW;

  const [data, setData] = useState([
    {
      title: '$0',
      subtitle: 'Earned',
      color: 'light-info',
      icon: <User size={24} />,
    },
    {
      title: '$0',
      subtitle: 'Referrals',
      color: 'light-warning',
      icon: <Users size={24} />,
    },
  ]);

  const [earnMoreModal, setEarnMoreModal] = useState(null);

  const toggleEarnMoreModal = () => {
    setEarnMoreModal(!earnMoreModal);
  };

  useEffect(() => {
    dispatch(getTotalReferralAmount());
  }, []);

  useEffect(() => {
    if (totalReferralAmountData) {
      const reqData = [{ ...data[0], title: `$${totalReferralAmountData?.total_referral_amount}` }, data[1]];
      setData(reqData);
    }
  }, [totalReferralAmountData]);

  return (
    <RewardCardWrapper>
      {earnMoreModal && <ReferNowModal modal={earnMoreModal} toggleModal={toggleEarnMoreModal} />}
      <Card className="card-reward">
        <CardHeader>
          <CardTitle tag="h4">Rewards</CardTitle>
          {isDisabled ? (
            <CardText className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-muted cursor-not-allowed">
              View All
            </CardText>
          ) : (
            <Link to="/referral-reward/all">
              <CardText className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary cursor-pointer">
                View All
              </CardText>
            </Link>
          )}
        </CardHeader>
        <CardBody className="reward-body">
          <Row>
            {data.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Col key={index} {...cols}>
                <div className="d-flex align-items-center">
                  <Avatar color={item.color} icon={item.icon} className="me-1" />
                  <div className="my-auto">
                    <h4 className="fw-bolder">{item.title}</h4>
                    <CardText className="font-small-2 mb-0">{item.subtitle}</CardText>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          {isDisabled ? (
            <CardText className="text-center card-text font-small-4 mt-20 text-primary text-muted earn-more cursor-not-allowed">
              Make A Referral
            </CardText>
          ) : (
            <CardText
              className="text-center card-text font-small-4 mt-20 text-primary earn-more cursor-pointer"
              onClick={() => setEarnMoreModal(true)}
            >
              Make A Referral
            </CardText>
          )}
        </CardBody>
      </Card>
    </RewardCardWrapper>
  );
};

export default RewardsCard;
