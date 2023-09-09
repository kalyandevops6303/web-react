import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { Star } from 'react-feather';
import Rating from '../../../lib/rating';
import { RatingTag, RatingsFormContainer } from '../style';
import { GrayBorderContainer, GrayCardWrapper } from '../../styled';
import theme from '../../../configs/themeVariables';
import { getRatingTags } from '../../../redux/actions/staticActions';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import { ratingTags } from '../../../redux/selectors/staticSelectors';
import { getYourSubmittedRating } from '../../../redux/actions/ratingActions';
import { yourSubmittedRatingLoading } from '../../../redux/selectors/ratingSelectors';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

const SubmitRating = () => {
  const RatingSchema = yup.object().shape({
    additionalDescription: yup
      .string()
      .min(100, 'Additional description must be at least 100 characters')
      .max(1000, 'Additional description must be 1000 characters or less')
      .required('Additional description is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(RatingSchema),
  });

  const dispatch = useDispatch();
  const params = useParams();

  const userData = useSelector(selectUserData);
  const ratingTagsData = useSelector(ratingTags);
  const yourSubmittedRatingIsLoading = useSelector(yourSubmittedRatingLoading);

  const [rating, setRating] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const onSubmit = () => {
    // const reqData = {
    //   project_id: params.projectId,
    //   tags: selectedTags,
    //   star: rating,
    //   entity_id: 'stringstringstringstring',
    //   entity_type: 'TALENT',
    //   description: data.additionalDescription,
    // };
  };

  useEffect(() => {
    if (userData?.user_type === userTypes.client) {
      dispatch(getRatingTags(userTypes.talent));
    } else {
      dispatch(getRatingTags(userTypes.client));
    }
  }, []);

  useEffect(() => {
    dispatch(getYourSubmittedRating(params.projectId));
  }, []);

  useEffect(() => {
    if (ratingTagsData?.length > 0 && rating !== null) {
      const reqTags = ratingTagsData.find((item) => item.star === rating).tags;

      setAllTags(reqTags);
      setSelectedTags([]);
    }
  }, [rating, ratingTagsData]);

  const onTagClick = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((item) => item !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <GrayCardWrapper>
      {yourSubmittedRatingIsLoading ? (
        <ComponentSpinner className="mt-5" />
      ) : (
        <Card>
          <CardHeader className="p-0">
            <GrayBorderContainer className="w-100 px-2 pt-2 pb-1">
              <h4 className="m-0">Share your thoughts on the Client you worked with</h4>
            </GrayBorderContainer>
          </CardHeader>
          <CardBody className="pt-2">
            <Row className="gap-2 pt-50">
              <Col sm="12" md="6" lg="2">
                <div className="d-flex flex-column align-items-center">
                  <Avatar img={defaultAvatar} imgHeight="98" imgWidth="98" />
                  <p className="fw-bolder mt-1 mb-0">Edgar Jones</p>
                  <p className="font-small-3">Red Fort Software</p>
                </div>
              </Col>
              <Col sm="12" md="6" lg="9">
                <RatingsFormContainer>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col sm="12" md="6" lg="8">
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
                            onChange={(star) => setRating(star)}
                            initialRating={rating}
                          />
                        </Row>
                        {allTags?.length > 0 && (
                          <Row className="mb-1">
                            <div className="d-flex flex-wrap mt-1">
                              {allTags?.map((tag) => (
                                <RatingTag
                                  key={tag._id}
                                  className="px-1 me-75 mb-75 cursor-pointer"
                                  active={selectedTags.includes(tag._id)}
                                  onClick={() => onTagClick(tag._id)}
                                >
                                  <p className="mb-0">{tag.name}</p>
                                </RatingTag>
                              ))}
                            </div>
                          </Row>
                        )}
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
                      </Col>
                    </Row>

                    <div className="d-flex justify-content-end align-items-center pb-2">
                      <Button color="primary" type="button" outline className="me-2">
                        Cancel
                      </Button>
                      <Button color="primary" type="submit" disabled={!isValid || !rating || selectedTags.length === 0}>
                        Submit
                      </Button>
                    </div>
                  </Form>
                </RatingsFormContainer>
              </Col>
            </Row>
          </CardBody>
        </Card>
      )}
    </GrayCardWrapper>
  );
};

export default SubmitRating;
