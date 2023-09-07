import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormFeedback,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { Star } from 'react-feather';
import Rating from '../../../lib/rating';
import { RatingNavsContainer, RatingTag, RatingsFormContainer } from '../style';
import { GrayBorderContainer, GrayCardWrapper } from '../../styled';
import theme from '../../../configs/themeVariables';

const RatingView = () => {
  const RatingSchema = yup.object().shape({
    tags: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string,
          value: yup.string,
        }),
      )
      .min(1, 'At least one tag should be added')
      .required('Tags is required'),
    additionalDescription: yup
      .string()
      .min(100, 'Additional description must be at least 100 characters')
      .max(1000, 'Additional description must be 1000 characters or less')
      .required('Additional description is required'),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(RatingSchema),
  });

  const onSubmit = () => {};

  const tabNames = {
    submitRating: '1',
    yourRating: '2',
  };

  const [activeTab, setTabActive] = useState(tabNames.submitRating);

  const toggleTabs = (tab) => {
    if (activeTab !== tab) {
      setTabActive(tab);
    }
  };

  return (
    <div>
      <RatingNavsContainer>
        <Nav tabs className="font-medium border-bottom">
          <NavItem className="me-3">
            <NavLink
              active={activeTab === tabNames.submitRating}
              onClick={() => {
                toggleTabs(tabNames.submitRating);
              }}
            >
              Submit Rating
            </NavLink>
          </NavItem>
          <NavItem className="me-3">
            <NavLink
              active={activeTab === tabNames.yourRating}
              onClick={() => {
                toggleTabs(tabNames.yourRating);
              }}
            >
              Your Ratings
            </NavLink>
          </NavItem>
        </Nav>
      </RatingNavsContainer>

      <TabContent activeTab={activeTab} className="mb-2">
        <TabPane tabId={tabNames.submitRating}>
          {activeTab === tabNames.submitRating && (
            <GrayCardWrapper>
              <Card>
                <CardHeader className="p-0">
                  <GrayBorderContainer className="w-100 px-2 pt-2 pb-1">
                    <h4 className="m-0">Share your thoughts on the Client you worked with</h4>
                  </GrayBorderContainer>
                </CardHeader>
                <CardBody className="pt-1">
                  <RatingsFormContainer className="mt-2">
                    <div className="d-flex">
                      <div className="d-flex flex-column align-items-center user-details">
                        <Avatar img={defaultAvatar} imgHeight="98" imgWidth="98" />
                        <p className="fw-bolder mt-1 mb-0">Edgar Jones</p>
                        <p className="font-small-3">Red Fort Software</p>
                      </div>
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="ms-4 form-container">
                          <p className="fw-bold font-medium-5">Your opinion matters to us!</p>
                          <Row className="mb-1">
                            <Label className="form-label fw-bold font-medium-1 mb-75" for="ratings">
                              Ratings<span className="label-asterisk">*</span>
                            </Label>
                            <Rating
                              emptySymbol={
                                <Star size={24} fill={theme.white} stroke={theme.orangeColor} className="me-50" />
                              }
                              fullSymbol={
                                <Star size={24} fill={theme.orangeColor} stroke={theme.orangeColor} className="me-50" />
                              }
                            />
                          </Row>
                          <Row className="mb-1">
                            <div className="d-flex flex-wrap mt-1">
                              <RatingTag className="px-1 me-75 mb-75">
                                <p className="mb-0">Good Quality</p>
                              </RatingTag>
                              <RatingTag active className="px-1 me-75 mb-75">
                                <p className="mb-0">Timely Delivery</p>
                              </RatingTag>
                              <RatingTag className="px-1 me-75 mb-75">
                                <p className="mb-0">Good Communication</p>
                              </RatingTag>
                              <RatingTag active className="px-1 me-75 mb-75">
                                <p className="mb-0">Professional</p>
                              </RatingTag>
                              <RatingTag className="px-1 me-75 mb-75">
                                <p className="mb-0">Excellent</p>
                              </RatingTag>
                              <RatingTag active className="px-1 me-75 mb-75">
                                <p className="mb-0">Good</p>
                              </RatingTag>
                              <RatingTag className="px-1 me-75 mb-75">
                                <p className="mb-0">Great Engagement</p>
                              </RatingTag>
                              <RatingTag active className="px-1 me-75 mb-75">
                                <p className="mb-0">Good Quality</p>
                              </RatingTag>
                            </div>
                          </Row>
                          <Row className="mb-1 ps-1">
                            <Label className="form-label fw-bold font-medium-1 mb-25 p-0" for="additionalDescription">
                              Additional Description<span className="label-asterisk">*</span>
                            </Label>
                            <Controller
                              id="additionalDescription"
                              name="additionalDescription"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  type="textarea"
                                  placeholder="Enter additional description"
                                  rows="4"
                                  invalid={errors.additionalDescription && true}
                                />
                              )}
                            />
                            {errors.additionalDescription && (
                              <FormFeedback className="p-0">{errors.additionalDescription.message}</FormFeedback>
                            )}
                          </Row>
                        </div>
                        <div className="d-flex justify-content-end align-items-center me-2 pb-2">
                          <Button color="primary" type="button" outline className="me-2" onClick={() => reset()}>
                            Cancel
                          </Button>
                          <Button color="primary" type="submit">
                            Submit
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </RatingsFormContainer>
                </CardBody>
              </Card>
            </GrayCardWrapper>
          )}
        </TabPane>
        <TabPane tabId={tabNames.yourRating}>{activeTab === tabNames.yourRating && <p>your</p>}</TabPane>
      </TabContent>
    </div>
  );
};

export default RatingView;
