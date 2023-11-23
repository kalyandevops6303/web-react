/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
// import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft } from 'react-feather';
import theme from '../../configs/themeVariables';
import { InfoContainer } from '../create-bid/style';
import { ProfileFormContainer, UploadIconContainer } from '../Onboarding/style';
import { isUrlWithoutProtocol, removeEmptyKeys } from '../../utility/Utils';
import ClubCreatedModal from './ClubCreatedModal';
import { registerClubEmail, setClubCreateDataAction, updateClub } from '../../redux/actions/clubActions';
import EmailVerifyModal from './EmailVerifyModal';
import { getTeamById } from '../../services/teamServices';
import { userData } from '../../redux/selectors/dashboardSelectors';

const Profile = () => {
  const ProfileSchema = yup.object().shape({
    clubEmailID: yup.string().email('Please enter a valid email').required('Email is required'),
    clubLinkedin: yup.string().test('is-url', 'Please enter a valid URL', isUrlWithoutProtocol).nullable(),
    clubWebsite: yup
      .string()
      .test('is-url', 'Please enter a valid URL', isUrlWithoutProtocol)
      .nullable()
      .required('Field is required'),
    isWebpage: yup.string().required('You must select either Yes or No'),
    isUniversityApproval: yup.string().when('isWebpage', {
      is: 'No',
      then: yup.string().required('You must select either Yes or No'),
    }),
    universityWebpage: yup
      .string()
      .test('is-url', 'Please enter a valid URL', isUrlWithoutProtocol)
      .nullable()
      .when('isWebpage', {
        is: 'Yes',
        then: yup.string().required('Field is required'),
        otherwise: yup.string(),
      }),
  });

  const {
    control,
    handleSubmit,
    watch,
    unregister,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      isWebpage: '',
      isUniversityApproval: '',
    },
  });

  const [clubCreatedModal, setClubCreatedModal] = useState(false);
  const [emailVerifyModal, setEmailVerifyModal] = useState(false);
  const [clubDetails, setClubDetails] = useState(null);

  const userDetailsData = useSelector(userData);
  const clubCreateData = useSelector((state) => state.clubs.clubCreateData);

  const toggleClubCreatedModal = () => setClubCreatedModal(!clubCreatedModal);
  const toggleEmailVerifyModal = () => setEmailVerifyModal(!emailVerifyModal);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onBackClick = () => {
    if (location?.state?.isEditing) {
      navigate(`/create-club/account-details`, { state: { isEditing: true } });
    } else {
      navigate(`/create-club/account-details`);
    }
  };

  const onSuccess = () => {};

  const onEmailVerifySuccess = (email) => {
    dispatch(registerClubEmail({ email, onSuccess }));
  };

  const onSubmit = (data) => {
    const { isWebpage, isUniversityApproval, clubEmailID, clubLinkedin, clubWebsite, universityWebpage } = data;
    const formData = { clubEmailID, clubLinkedin, clubWebsite, universityWebpage };

    const clubData = {
      email: clubEmailID,
      linked_in: clubLinkedin,
      website: clubWebsite,
      university_webpage: universityWebpage,
    };

    if (isWebpage === 'Yes' && isUniversityApproval) {
      formData.isUniversityApproval = '';
    }

    const removeEmptyClubData = removeEmptyKeys(clubData);
    dispatch(setClubCreateDataAction(removeEmptyClubData));

    if (location?.state?.isEditing) {
      const linked_in = clubLinkedin;
      const reqData = {
        linked_in,
        _id: clubCreateData?._id,
      };
      const onApiSuccess = () => {
        navigate(`/dashboard`);
      };
      dispatch(updateClub(removeEmptyKeys(reqData), onApiSuccess));
    } else {
      onEmailVerifySuccess(formData.clubEmailID);
      toggleEmailVerifyModal();
    }
  };

  const isWebpageValue = watch('isWebpage');
  const isUniversityApprovalValue = watch('isUniversityApproval');

  useEffect(() => {
    if (!location?.state?.isEditing) {
      if (isWebpageValue !== 'Yes') {
        unregister('universityWebpage');
      } else {
        register('universityWebpage');
      }
    }
  }, [isWebpageValue, isUniversityApprovalValue, unregister, register]);

  const getTeamDetails = async () => {
    const res = await getTeamById(userDetailsData._id);
    if (res) {
      setClubDetails(res.data.data);
    }
  };

  useEffect(() => {
    getTeamDetails();
  }, []);

  useEffect(() => {
    if (location?.state?.isEditing) {
      if (clubDetails) {
        if (clubDetails?.email?.length > 0) {
          setValue('clubEmailID', clubDetails?.email, { shouldValidate: true });
        }
        if (clubDetails?.linked_in?.length > 0) {
          setValue('clubLinkedin', clubDetails?.linked_in, { shouldValidate: true });
        }
        if (clubDetails?.website?.length > 0) {
          setValue('clubWebsite', clubDetails?.website, { shouldValidate: true });
        }
        if (clubDetails?.university_webpage?.length > 0) {
          setValue('isWebpage', 'Yes', { shouldValidate: true });
          setValue('universityWebpage', clubDetails?.university_webpage, { shouldValidate: true });
        }
      }
    }
  }, [clubDetails]);

  const disableBtn = isWebpageValue === 'No' && isUniversityApprovalValue === 'No';

  return (
    <ProfileFormContainer className="w-75">
      {emailVerifyModal && (
        <EmailVerifyModal
          modal={emailVerifyModal}
          toggleModal={toggleEmailVerifyModal}
          setClubCreatedModal={setClubCreatedModal}
        />
      )}
      {clubCreatedModal && <ClubCreatedModal modal={clubCreatedModal} toggleModal={toggleClubCreatedModal} />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <h4 className="m-0 mt-1">Club details</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            <div className="">
              <InfoContainer>
                <span className="fw-bolder font-medium-1">Note : </span>
                Clubs need to have university approval & presence.
              </InfoContainer>
            </div>

            <Row className="mb-1 mt-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="clubEmailID">
                  Email ID<span className="label-asterisk me-50">*</span>
                </Label>
                <Controller
                  id="clubEmailID"
                  name="clubEmailID"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      disabled={location?.state?.isEditing}
                      placeholder="Enter your club email ID"
                      invalid={errors.clubEmailID && true}
                      className={`${location?.state?.isEditing ? 'disabled-input' : ''}`}
                    />
                  )}
                />
                {errors.clubEmailID && <FormFeedback>{errors.clubEmailID.message}</FormFeedback>}
              </Col>
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="clubLinkedin">
                  LinkedIn
                </Label>
                <Controller
                  id="clubLinkedin"
                  name="clubLinkedin"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter your club tagline in 60 character"
                      invalid={errors.clubLinkedin && true}
                    />
                  )}
                />
                {errors.clubLinkedin && <FormFeedback>{errors.clubLinkedin.message}</FormFeedback>}
              </Col>
            </Row>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="clubWebsite">
                  Club Website<span className="label-asterisk me-50">*</span>
                </Label>
                <Controller
                  id="clubWebsite"
                  name="clubWebsite"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter your club tagline in 60 character"
                      disabled={location?.state?.isEditing}
                      invalid={errors.clubWebsite && true}
                      className={`${location?.state?.isEditing ? 'disabled-input' : ''}`}
                    />
                  )}
                />
                {errors.clubWebsite && <FormFeedback>{errors.clubWebsite.message}</FormFeedback>}
              </Col>
            </Row>
            <Row className="mt-2">
              <h5 className="m-0">
                Is the web page URL on University website where the Club is identified as an Official Club
                <span className="label-asterisk me-50">*</span>
              </h5>
            </Row>
            <Row className="custom-checkbox-border">
              <Controller
                control={control}
                name="isWebpage"
                id="isWebpage"
                render={({ field }) => (
                  <div className="demo-inline-spacing">
                    <div style={{ maxWidth: '350px' }} className="form-check form-check-inline checkbox-custom-margin">
                      <Input type="radio" {...field} id="yesWebpage" value="Yes" checked={field.value === 'Yes'} />
                      <Label for="yesWebpage" className="form-check-label">
                        Yes, there is a web page on the university website.
                      </Label>
                    </div>
                    <div style={{ maxWidth: '350px' }} className="form-check form-check-inline checkbox-custom-margin">
                      <Input type="radio" {...field} id="noWebpage" value="No" checked={field.value === 'No'} />
                      <Label htmlFor="noWebpage" className="form-check-label">
                        No, there is no such web page exists on the university website.
                      </Label>
                    </div>
                  </div>
                )}
              />
              {errors.isWebpage && <FormFeedback>{errors.isWebpage.message}</FormFeedback>}
            </Row>
            {isWebpageValue === 'Yes' && (
              <Row className="mt-2">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="universityWebpage">
                    University Web Page<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="universityWebpage"
                    name="universityWebpage"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter university web page link"
                        disabled={location?.state?.isEditing}
                        invalid={errors.universityWebpage && true}
                        className={`${location?.state?.isEditing ? 'disabled-input' : ''}`}
                      />
                    )}
                  />
                  {errors.universityWebpage && <FormFeedback>{errors.universityWebpage.message}</FormFeedback>}
                </Col>
              </Row>
            )}
            {isWebpageValue === 'No' && (
              <>
                <Row className="mt-2">
                  <h5 className="m-0">
                    Has the University given approval to the club to open an account on Trumio?
                    <span className="label-asterisk me-50">*</span>
                  </h5>
                </Row>
                <Row className="custom-checkbox-border">
                  <Controller
                    control={control}
                    name="isUniversityApproval"
                    render={({ field }) => (
                      <div className="demo-inline-spacing flex-nowrap">
                        <div
                          style={{ maxWidth: '350px' }}
                          className="form-check form-check-inline checkbox-custom-margin"
                        >
                          <Input type="radio" {...field} id="yesUniversityApproval" value="Yes" />
                          <Label for="yesUniversityApproval" className="form-check-label">
                            Yes, the Club has already received approval from the University to open its account on
                            Trumio.
                          </Label>
                        </div>
                        <div
                          style={{ maxWidth: '350px' }}
                          className="form-check form-check-inline checkbox-custom-margin"
                        >
                          <Input type="radio" {...field} id="noUniversityApproval" value="No" />
                          <Label htmlFor="noUniversityApproval" className="form-check-label">
                            No, the Club has not received approval from the University to open its account on Trumio.
                          </Label>
                        </div>
                      </div>
                    )}
                  />
                  {errors.isUniversityApproval && <FormFeedback>{errors.isUniversityApproval.message}</FormFeedback>}
                </Row>
              </>
            )}
          </CardBody>
        </Card>

        <div className="d-flex justify-content-between align-items-center pb-2 mt-1">
          <div className="d-flex align-items-center upload-button cursor-pointer" onClick={onBackClick}>
            <UploadIconContainer>
              <ChevronLeft size={18} color={theme.activeNavPillText} />
            </UploadIconContainer>
            <h5 className="fw-bold">Back</h5>
          </div>
          <div>
            <Button disabled={!isValid || disableBtn} color="primary" type="submit">
              <span className="me-50">{location.state?.isEditing ? 'Save' : 'Create'}</span>
            </Button>
          </div>
        </div>
      </Form>
    </ProfileFormContainer>
  );
};

export default Profile;
