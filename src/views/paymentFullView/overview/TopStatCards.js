/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardBody, CardText, Col, Row, UncontrolledTooltip } from 'reactstrap';
import { Calendar, CheckSquare, Download, Info } from 'react-feather';
import Avatar from '@components/avatar';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import { getPaymentMetrics } from '../../../redux/actions/paymentFullViewActions';
import { paymentMetrics } from '../../../redux/selectors/paymentFullViewSelectors';
import { StatboxWrap } from '../../user-details/overview/style';
import { userTypes } from '../../../utility/constants/Constant';
import theme from '../../../configs/themeVariables';
import UpcomingBadgeIcon from '../../../assets/images/upcoming-badge-icon.png';

const TopStatCards = () => {
  const dispatch = useDispatch();

  const userData = useSelector(selectUserData);
  const paymentMetricsData = useSelector(paymentMetrics);

  const [firstStatCardData, setFirstStatCardData] = useState(0);
  const [secondStatCardData, setSecondStatCardData] = useState(0);
  const [thirdStatCardData, setThirdStatCardData] = useState(0);

  const firstStatCardTooltipText = () => {
    if (userData?.user_type === userTypes.client) {
      return 'All funds distributed after milestone approval.';
    } else if (userData?.user_type === userTypes.talent) {
      return 'Your total earnings till date.';
    } else if (userData?.user_type === userTypes.team && userData?.team_type === userTypes.team) {
      return 'Your total earnings in this team till date.';
    } else if (userData?.user_type === userTypes.team && userData?.team_type === userTypes.club) {
      return 'Your total earnings in this club till date.';
    }
  };

  const secondStatCardTooltipText = () => {
    if (userData?.user_type === userTypes.client) {
      return 'All funds sent to trumio.';
    } else if (userData?.user_type === userTypes.talent) {
      return 'Your total upcoming payments for funded projects and milestones';
    } else if (userData?.user_type === userTypes.team && userData?.team_type === userTypes.team) {
      return 'Your total upcoming payments for funded projects and milestones with this team';
    } else if (userData?.user_type === userTypes.team && userData?.team_type === userTypes.club) {
      return 'Your total upcoming payments for funded projects and milestones with this club.';
    }
  };

  const thirdStatCardTooltipText = () => {
    if (userData?.user_type === userTypes.client) {
      return 'Funds yet to be deposited to trumio as per contract.';
    } else if (userData?.user_type === userTypes.talent) {
      return `Funds may have come in or not come in. this doesn't included the on going milestone`;
    } else if (userData?.user_type === userTypes.team && userData?.team_type === userTypes.team) {
      return `Funds may have come in or not come in. this doesn't included the on going milestone with this team`;
    } else if (userData?.user_type === userTypes.team && userData?.team_type === userTypes.club) {
      return `Funds may have come in or not come in. this doesn't included the on going milestone with this club.`;
    }
  };

  useEffect(() => {
    dispatch(getPaymentMetrics());
  }, []);

  useEffect(() => {
    if (paymentMetricsData) {
      if (userData?.user_type === userTypes.client) {
        setFirstStatCardData(paymentMetricsData?.paid);
        setSecondStatCardData(paymentMetricsData?.deposited);
        setThirdStatCardData(paymentMetricsData?.upcoming);
      } else {
        setFirstStatCardData(paymentMetricsData?.earned);
        setSecondStatCardData(paymentMetricsData?.upcoming);
        setThirdStatCardData(paymentMetricsData?.future);
      }
    }
  }, [paymentMetricsData]);

  return (
    <Row>
      <Col>
        <StatboxWrap isMarketPlaceTab>
          <CardBody>
            <div className="d-flex align-items-center justify-content-between">
              <div className="my-auto">
                <h3 className="fw-bolder">${firstStatCardData}</h3>
                <CardText className="mb-0 stat-desc">
                  {userData?.user_type === userTypes.client ? 'Paid' : 'Earned'}
                  <Info size={16} color={theme.infoIcon} id="firstStat" className="ms-25" />
                  <UncontrolledTooltip target="firstStat" placement="bottom">
                    <p className="mb-0 text-start">{firstStatCardTooltipText()}</p>
                  </UncontrolledTooltip>
                </CardText>
              </div>
              <Avatar color="light-green" icon={<CheckSquare size={24} />} className="stat-avatar" />
            </div>
          </CardBody>
        </StatboxWrap>
      </Col>
      <Col>
        <StatboxWrap isMarketPlaceTab>
          <CardBody>
            <div className="d-flex align-items-center justify-content-between">
              <div className="my-auto">
                <h3 className="fw-bolder">${secondStatCardData}</h3>
                <CardText className="mb-0 stat-desc">
                  {userData?.user_type === userTypes.client ? 'Deposited' : 'Upcoming'}
                  <Info size={16} color={theme.infoIcon} id="secondStat" className="ms-25" />
                  <UncontrolledTooltip target="secondStat" placement="bottom">
                    <p className="mb-0 text-start">{secondStatCardTooltipText()}</p>
                  </UncontrolledTooltip>
                </CardText>
              </div>
              <Avatar
                color={userData?.user_type === userTypes.client ? 'light-orange' : 'light-blue'}
                icon={
                  userData?.user_type === userTypes.client ? (
                    <Download size={24} />
                  ) : (
                    <img src={UpcomingBadgeIcon} alt="upcoming" width={24} height={24} />
                  )
                }
                className="stat-avatar"
              />
            </div>
          </CardBody>
        </StatboxWrap>
      </Col>
      <Col>
        <StatboxWrap isMarketPlaceTab>
          <CardBody>
            <div className="d-flex align-items-center justify-content-between">
              <div className="my-auto">
                <h3 className="fw-bolder">${thirdStatCardData}</h3>
                <CardText className="mb-0 stat-desc">
                  {userData?.user_type === userTypes.client ? 'Upcoming' : 'Future'}
                  <Info size={16} color={theme.infoIcon} id="thirdStat" className="ms-25" />
                  <UncontrolledTooltip target="thirdStat" placement="bottom">
                    <p className="mb-0 text-start">{thirdStatCardTooltipText()}</p>
                  </UncontrolledTooltip>
                </CardText>
              </div>
              <Avatar
                color={userData?.user_type === userTypes.client ? 'light-blue' : 'light-purple'}
                icon={
                  userData?.user_type === userTypes.client ? (
                    <img src={UpcomingBadgeIcon} alt="upcoming" width={24} height={24} />
                  ) : (
                    <Calendar size={24} />
                  )
                }
                className="stat-avatar"
              />
            </div>
          </CardBody>
        </StatboxWrap>
      </Col>
      <Col />
      <Col />
    </Row>
  );
};

export default TopStatCards;
