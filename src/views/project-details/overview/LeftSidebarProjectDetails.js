import React from 'react';
import { Badge, Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import MoneyIcon from '@src/assets/images/money.png';
import Avatar from '@components/avatar';
import { Clock } from 'react-feather';
import lisa from '@src/assets/images/portrait/small/lisa.png';
import BadgeGroup from '../../../@core/components/badge-group';
import { LeftSidebarProjectDetailsWrapper } from '../style';
import { CustomBadge } from '../../styled';
import RatingBadge from '../../../@core/components/rating-group/RatingBadge';

const LeftSidebarProjectDetails = () => (
  <LeftSidebarProjectDetailsWrapper>
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between status-head">
          <CustomBadge bordered>
            <Badge className="OPEN_PROJECT">Open</Badge>
          </CustomBadge>
          <CardText className="fw-bold days">10 Days left</CardText>
        </div>
        <CardTitle className="title">Usage Data Collection and Payment</CardTitle>

        <div className="d-flex">
          <img className="project-details-card-photo me-1 mt-50" src={lisa} alt="avatar" />
          <div>
            <CardText className="mb-0 ms-25">Cloudwell Automation</CardText>
            <div className="d-flex">
              <RatingBadge number="0" />
              <CardText className="ps-75 font-small-2 fw-300 rating-label">0 Projects</CardText>
            </div>
          </div>
        </div>

        <section className="stats d-flex mt-2 justify-content-between ">
          <div className="d-flex amount gap-50 align-items-center">
            <Avatar
              color="light-warning"
              icon={<img src={MoneyIcon} height={22} alt="money" />}
              className="stat-avatar"
            />
            <div>
              <CardText className="font-small-3 mb-0 stat-value">$135,000</CardText>
              <CardText className="font-small-2 mb-0 stat-key">Value</CardText>
            </div>
          </div>
          <div className="d-flex date gap-50 align-items-center">
            <Avatar color="light-primary" icon={<Clock />} className="stat-avatar" />
            <div>
              <CardText className="font-small-3 mb-0 stat-value">Jun 1, 10</CardText>
              <CardText className="font-small-2 mb-0 stat-key">Start date</CardText>
            </div>
          </div>
        </section>

        <section className="project-details mt-2">
          <CardTitle className="main-title mb-75">Details</CardTitle>
        </section>

        <div className="d-flex mb-75">
          <span className="info-key">Posted date:</span>
          <CardText className="info-value">04/22/2023</CardText>
        </div>
        <div className="d-flex mb-75">
          <span className="info-key">Payment type:</span>
          <CardText className="info-value">-</CardText>
        </div>

        <BadgeGroup
          inline
          color="light-blue"
          title="Tags"
          data={[{ name: 'JS' }, { name: 'HTML HTML' }, { name: 'REACT' }, { name: 'Javascript' }]}
        />

        <div className="project-desc mb-75">
          <div className="project-desc-title">Desciption:</div>
          <CardText className="value">
            The data collection and payment system is designed to allow automotive companies to compensate users for
            sharing their data. By collecting data such as driving habits, vehicle usage, road conditions and other
            environmental data
          </CardText>
        </div>

        <div className="d-flex gap-1 mt-3 justify-content-center">
          <Button className="w-50" color="primary">
            Message
          </Button>
        </div>
      </CardBody>
    </Card>
  </LeftSidebarProjectDetailsWrapper>
);

export default LeftSidebarProjectDetails;
