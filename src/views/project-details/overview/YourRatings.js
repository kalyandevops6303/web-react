import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { Star } from 'react-feather';
import Rating from '../../../lib/rating';
import { RatingTag } from '../style';
import theme from '../../../configs/themeVariables';

const YourRatings = () => (
  <Card>
    <CardHeader>
      <h4 className="m-0">Feedback from Client</h4>
    </CardHeader>
    <hr className="m-0 card-header-border" />
    <CardBody className="mt-1">
      <Row className="gap-2">
        <Col sm="12" md="6" lg="2">
          <div className="d-flex flex-column align-items-center">
            <Avatar img={defaultAvatar} imgHeight="98" imgWidth="98" />
            <p className="fw-bolder mt-1 mb-0">Edgar Jones</p>
            <p className="font-small-3">Red Fort Software</p>
          </div>
        </Col>
        <Col sm="12" md="6" lg="9">
          <Rating
            readonly
            initialRating={3}
            emptySymbol={<Star size={24} fill={theme.white} stroke={theme.orangeColor} className="me-50" />}
            fullSymbol={<Star size={24} fill={theme.orangeColor} stroke={theme.orangeColor} className="me-50" />}
          />
          <div className="d-flex flex-wrap mt-1">
            <RatingTag className="px-1 me-75 mb-75">
              <p className="mb-0">Good Quality</p>
            </RatingTag>
            <RatingTag className="px-1 me-75 mb-75">
              <p className="mb-0">Timely Delivery</p>
            </RatingTag>
            <RatingTag className="px-1 me-75 mb-75">
              <p className="mb-0">Good Communication</p>
            </RatingTag>
            <RatingTag className="px-1 me-75 mb-75">
              <p className="mb-0">Professional</p>
            </RatingTag>
            <RatingTag className="px-1 me-75 mb-75">
              <p className="mb-0">Excellent</p>
            </RatingTag>
            <RatingTag className="px-1 me-75 mb-75">
              <p className="mb-0">Good</p>
            </RatingTag>
            <RatingTag className="px-1 me-75 mb-75">
              <p className="mb-0">Great Engagement</p>
            </RatingTag>
            <RatingTag className="px-1 me-75 mb-75">
              <p className="mb-0">Good Quality</p>
            </RatingTag>
          </div>
          <p className="font-medium-1 mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Eu scelerisque felis imperdiet proin fermentum. Donec enim diam vulputate ut pharetra
            sit. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere.
          </p>
        </Col>
      </Row>
    </CardBody>
  </Card>
);

export default YourRatings;
