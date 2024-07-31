import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, Input, Label, Row, Spinner } from 'reactstrap';
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
import { getYourSubmittedRating, giveNewRating } from '../../../redux/actions/ratingActions';
import {
  giveRatingLoading,
  yourSubmittedRating,
  yourSubmittedRatingLoading,
} from '../../../redux/selectors/ratingSelectors';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';
import RatingSubmitSuccessModal from '../../modals/RatingSubmitSuccessModal';
import capitalize from '../../../lib/capitalize';
import { setFormData } from '../../../redux/reducers/formData';
import { filteredFormSchema } from '../../../utility/Utils';
import { formData } from '../../../redux/selectors/formDataSelectors';

const SubmitRating = () => {
  const RatingSchema = yup.object().shape({
    additionalDescription: yup
      .string()
      .min(50, 'Additional description must be at least 50 characters')
      .max(1000, 'Additional description must be 1000 characters or less')
      .required('Additional description is required'),
  });
  const savedFormData = useSelector(formData);
  const {
    reset,
    trigger,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(RatingSchema),
    defaultValues: {
      additionalDescription: savedFormData?.additionalDescription || '',
    },
  });

  const dispatch = useDispatch();
  const params = useParams();
  const localFormData = useWatch({ control });
  const userData = useSelector(selectUserData);
  const ratingTagsData = useSelector(ratingTags);
  const giveRatingIsLoading = useSelector(giveRatingLoading);
  const yourSubmittedRatingIsLoading = useSelector(yourSubmittedRatingLoading);
  const yourSubmittedRatingData = useSelector(yourSubmittedRating);
  const projectDetailsData = useSelector(projectDetails);

  const [rating, setRating] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [thankYouModal, setThankYouModal] = useState(null);

  const toggleThankYouModal = () => {
    setThankYouModal(!thankYouModal);
  };

  const onSuccess = () => {
    dispatch(getYourSubmittedRating(params.projectId));
    setThankYouModal(true);
  };

  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData };
    dispatch(setFormData(allData));
  }, [localFormData]);

  useEffect(() => {
    if (savedFormData) {
      const requiredFields = filteredFormSchema({
        savedData: savedFormData,
        formSchemaFields: RatingSchema.fields,
      });
      reset(requiredFields);
      const keysWithValues = Object.keys(requiredFields).filter((key) => requiredFields[key]);
      trigger(keysWithValues);
    }
  }, []);

  const onSubmit = (data) => {
    let reqData;

    if (userData?.user_type === userTypes.client) {
      reqData = {
        project_id: params.projectId,
        tags: selectedTags,
        star: rating,
        entity_id: projectDetailsData?.worker_details?.entity_id,
        entity_type: projectDetailsData?.worker_details?.entity_type,
        description: data.additionalDescription,
      };
    } else {
      reqData = {
        project_id: params.projectId,
        tags: selectedTags,
        star: rating,
        entity_id: projectDetailsData?.client_details?.user_id,
        entity_type: userTypes.client,
        description: data.additionalDescription,
      };
    }

    dispatch(giveNewRating(reqData, onSuccess));
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

  const getFormImage = () => {
    let image;

    if (userData?.user_type === userTypes.client) {
      if (projectDetailsData?.worker_details?.entity_type === userTypes.team) {
        image = projectDetailsData?.worker_details?.team_logo;
      } else if (projectDetailsData?.worker_details?.entity_type === userTypes.talent) {
        image = projectDetailsData?.worker_details?.image_uri;
      }
    } else {
      image = projectDetailsData?.client_details?.image_uri;
    }

    return image || defaultAvatar;
  };

  const getFormName = () => {
    let name;

    if (userData?.user_type === userTypes.client) {
      if (projectDetailsData?.worker_details?.entity_type === userTypes.team) {
        name = projectDetailsData?.worker_details?.name;
        // eslint-disable-next-line no-else-return
      } else if (projectDetailsData?.worker_details?.entity_type === userTypes.talent) {
        name = `${projectDetailsData?.worker_details?.first_name} ${projectDetailsData?.worker_details?.last_name}`;
      }
    } else {
      name = `${projectDetailsData?.client_details?.first_name} ${projectDetailsData?.client_details?.last_name}`;
    }

    return name;
  };

  const getFormOtherInfo = () => {
    let info;

    if (userData?.user_type === userTypes.client) {
      if (projectDetailsData?.worker_details?.entity_type === userTypes.talent) {
        info = projectDetailsData?.worker_details?.role;
      }
    } else {
      info = projectDetailsData?.client_details?.company_name;
    }

    return info || '';
  };

  const modalData = {
    rating,
    image: getFormImage(),
    name: getFormName(),
    otherInfo: getFormOtherInfo(),
  };

  const getSubmittedImage = () => {
    let image;

    if (yourSubmittedRatingData?.entity_type === userTypes.team) {
      image = yourSubmittedRatingData?.rating_for?.team_logo;
    } else {
      image = yourSubmittedRatingData?.rating_for?.image_uri;
    }

    return image || defaultAvatar;
  };

  const getSubmittedName = () => {
    let name;

    if (yourSubmittedRatingData?.entity_type === userTypes.team) {
      name = yourSubmittedRatingData?.rating_for?.name;
    } else {
      name = `${yourSubmittedRatingData?.rating_for?.first_name} ${yourSubmittedRatingData?.rating_for?.last_name}`;
    }

    return name;
  };

  const getSubmittedOtherInfo = () => {
    let info;

    if (yourSubmittedRatingData?.entity_type !== userTypes.team) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      if (
        yourSubmittedRatingData &&
        yourSubmittedRatingData?.rating_for &&
        // eslint-disable-next-line no-unsafe-optional-chaining
        'company_name' in yourSubmittedRatingData?.rating_for
      ) {
        info = yourSubmittedRatingData?.rating_for?.company_name;
      } else {
        info = yourSubmittedRatingData?.rating_for?.role.name;
      }
    }

    return info || '';
  };

  return (
    <>
      {thankYouModal && (
        <RatingSubmitSuccessModal modal={thankYouModal} toggleModal={toggleThankYouModal} data={modalData} />
      )}
      {yourSubmittedRatingIsLoading ? (
        <ComponentSpinner className="mt-5" />
      ) : (
        <div>
          {yourSubmittedRatingData && 'star' in yourSubmittedRatingData ? (
            <Card>
              <CardHeader>
                <h4 className="m-0">
                  Feedback for{' '}
                  {userData?.user_type === userTypes.client
                    ? capitalize(projectDetailsData?.worker_details?.entity_type)
                    : capitalize(userTypes.client)}
                </h4>
              </CardHeader>
              <hr className="m-0 card-header-border" />
              <CardBody className="mt-1">
                <Row className="gap-2">
                  <Col sm="12" md="6" lg="2">
                    <div className="d-flex flex-column align-items-center">
                      <Avatar img={getSubmittedImage()} imgHeight="98" imgWidth="98" />
                      <p className="fw-bolder mt-1 mb-0 text-center">{getSubmittedName()}</p>
                      <p className="font-small-3 text-center">{getSubmittedOtherInfo()}</p>
                    </div>
                  </Col>
                  <Col sm="12" md="6" lg="9">
                    <Rating
                      readonly
                      initialRating={yourSubmittedRatingData?.star}
                      emptySymbol={<Star size={24} fill={theme.white} stroke={theme.orangeColor} className="me-50" />}
                      fullSymbol={
                        <Star size={24} fill={theme.orangeColor} stroke={theme.orangeColor} className="me-50" />
                      }
                    />
                    <div className="d-flex flex-wrap mt-1">
                      {yourSubmittedRatingData?.tags?.map((tag) => (
                        <RatingTag key={tag._id} className="px-1 me-75 mb-75">
                          <p className="mb-0">{tag.name}</p>
                        </RatingTag>
                      ))}
                    </div>
                    <p className="font-medium-1 mt-1">{yourSubmittedRatingData?.description || ''}</p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          ) : (
            <GrayCardWrapper>
              <Card>
                <CardHeader className="p-0">
                  <GrayBorderContainer className="w-100 px-2 pt-2 pb-1">
                    <h4 className="m-0">
                      Share your thoughts on the{' '}
                      {userData?.user_type === userTypes.client
                        ? capitalize(projectDetailsData?.worker_details?.entity_type)
                        : capitalize(userTypes.client)}{' '}
                      you worked with
                    </h4>
                  </GrayBorderContainer>
                </CardHeader>
                <CardBody className="pt-2">
                  <Row className="gap-2 pt-50">
                    <Col sm="12" md="6" lg="2">
                      <div className="d-flex flex-column align-items-center">
                        <Avatar img={getFormImage()} imgHeight="98" imgWidth="98" />
                        <p className="fw-bolder mt-1 mb-0 text-center">{getFormName()}</p>
                        <p className="font-small-3 text-center">{getFormOtherInfo()}</p>
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
                                  Rating<span className="label-asterisk">*</span>
                                </Label>
                                <Rating
                                  emptySymbol={
                                    <Star size={24} fill={theme.white} stroke={theme.orangeColor} className="me-50" />
                                  }
                                  fullSymbol={
                                    <Star
                                      size={24}
                                      fill={theme.orangeColor}
                                      stroke={theme.orangeColor}
                                      className="me-50"
                                    />
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
                                <Label
                                  className="form-label fw-bold font-medium-1 mb-25 p-0"
                                  for="additionalDescription"
                                >
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
                            <Button color="primary" type="submit" disabled={!isValid || !rating || giveRatingIsLoading}>
                              {giveRatingIsLoading ? <Spinner size="sm" /> : 'Submit'}
                            </Button>
                          </div>
                        </Form>
                      </RatingsFormContainer>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </GrayCardWrapper>
          )}
        </div>
      )}
    </>
  );
};

export default SubmitRating;
