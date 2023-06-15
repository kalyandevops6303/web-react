import React from 'react';
import { Badge, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { ReviewWrap, ReviewsContainer } from './style';
import RatingGroup from '../../../@core/components/rating-group/Index';

const Review = () => (
  <ReviewWrap>
    <img src={avatar7} alt="user" className="user-image" />
    <div>
      <CardTitle className="mb-25">Jammie Randole</CardTitle>
      <div className="d-flex">
        <CardText className="mr-1">Industry Type: </CardText>&nbsp;
        <CardText className="fw-300"> Automotive</CardText>
      </div>
      <RatingGroup />
      <div className="mt-1">
        <Badge pill color="light-info">
          Excellent Quality
        </Badge>
        <Badge pill color="light-info">
          Professional
        </Badge>
        <Badge pill color="light-info">
          Timely delivery
        </Badge>
        <Badge pill color="light-info">
          Good engagement
        </Badge>
      </div>

      <CardText className="mt-1">
        I highly recommend Bill for his exceptional work on our automotive project. He demonstrated a deep understanding
        of our requirements and delivered a website that exceeded our expectations in terms of functionality, usability,
        and design.
      </CardText>
    </div>
  </ReviewWrap>
);

const Reviews = () => (
  <ReviewsContainer>
    <Card>
      <CardBody>
        <CardTitle className="review-title mb-1">Reviews (0)</CardTitle>
        <div className="d-none">
          <Review />
          <Review />
          <Review />
          <h4 className="text-center empty">No reviews to show</h4>
        </div>
        <h4 className="text-center empty">No reviews to show</h4>

        <CardText className="d-none text-center text-decoration-underline card-text me-25 mb-0 text-primary">
          View More
        </CardText>
      </CardBody>
    </Card>
  </ReviewsContainer>
);

export default Reviews;
