import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
  UncontrolledTooltip,
} from 'reactstrap';
import { ChevronRight, Info, UserPlus } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { AccountDetailsFormContainer, AccountImageContainer } from './style';
import theme from '../../configs/themeVariables';
import CountryDropdown from '../../@core/components/country-dropdown';
import { getUserDetails, saveTalentAccountDetails } from '../../redux/actions/talentOnboardingActions';
import { talentAccountDetailsLoading, userDetails } from '../../redux/selectors/talentOnboardingSelectors';
import ShowToastMessage from '../../@core/components/toast';
import { saveClientAccountDetails } from '../../redux/actions/clientOnboardingActions';
import { clientAccountDetailsLoading } from '../../redux/selectors/clientOnboardingSelectors';
import { ERROR } from '../../utility/constants/ToastTypes';

const Account = () => {
  const AccountDetailsSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(3, 'First name must be at least 3 characters')
      .max(25, 'First name must be at most 25 characters')
      .matches(/^[a-zA-Z0-9 _]+$/, 'First name should not contain special characters')
      .required('First name is required'),
    lastName: yup
      .string()
      .min(3, 'Last name must be at least 3 characters')
      .max(25, 'Last name must be at most 25 characters')
      .matches(/^[a-zA-Z0-9 _]+$/, 'Last name should not contain special characters')
      .required('Last name is required'),
    countryCode: yup.string().required(),
    mobileNumber: yup.string().required(),
    email: yup.string().email().required(),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(AccountDetailsSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      countryCode: '',
      mobileNumber: '',
      email: '',
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetailsData = useSelector(userDetails);
  const talentAccountDetailsIsLoading = useSelector(talentAccountDetailsLoading);
  const clientAccountDetailsIsLoading = useSelector(clientAccountDetailsLoading);

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  const onSuccess = () => {
    setIsNextButtonDisabled(false);
  };

  const onSubmit = (data) => {
    const { firstName, lastName } = data;
    const reqData = { first_name: firstName.trim(), last_name: lastName.trim() };

    if (userDetailsData.user_type === 'TALENT') {
      dispatch(saveTalentAccountDetails(reqData, onSuccess));
    } else {
      dispatch(saveClientAccountDetails(reqData, onSuccess));
    }
  };

  const onGetUserDetailsSuccess = (res) => {
    if (res) {
      setValue('countryCode', res.country_code);
      setValue('mobileNumber', res.phone);
      setValue('email', res.email);

      if (res.checkpoint === 'ACCOUNT_DETAILS' && res.oauth_type === 'google') {
        if (res.user_type === 'TALENT') {
          setValue('firstName', res?.talent_info?.first_name, { shouldValidate: true });
          if (res?.talent_info?.last_name !== '') {
            setValue('lastName', res?.talent_info?.last_name, { shouldValidate: true });
          }
        } else if (res.user_type === 'CLIENT') {
          setValue('firstName', res?.client_info?.first_name, { shouldValidate: true });
          if (res?.client_info?.last_name !== '') {
            setValue('lastName', res?.client_info?.last_name, { shouldValidate: true });
          }
        }
      } else if (res.checkpoint === 'PROFILE_DETAILS') {
        if (res.user_type === 'TALENT') {
          setValue('firstName', res.talent_info?.first_name, { shouldValidate: true });
          setValue('lastName', res.talent_info?.last_name, { shouldValidate: true });
        } else if (res.user_type === 'CLIENT') {
          setValue('firstName', res.client_info?.first_name, { shouldValidate: true });
          setValue('lastName', res.client_info?.last_name, { shouldValidate: true });
        }

        setIsNextButtonDisabled(false);
      }
    }
  };

  useEffect(() => {
    dispatch(getUserDetails(onGetUserDetailsSuccess));
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const isFileValid = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      ShowToastMessage(ERROR, 'Please select a valid image file (JPG, JPEG, or PNG).');
      return false;
    }
    if (file.size > maxSize) {
      ShowToastMessage(ERROR, 'File size exceeds the maximum limit (5MB).');
      return false;
    }
    return true;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && isFileValid(file)) {
      const thumbnail = URL.createObjectURL(file);
      setSelectedImage(file);
      setSelectedImagePreview(thumbnail);
    }
  };

  return (
    <AccountDetailsFormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card className="pb-3">
          <CardHeader>
            <h4 className="m-0 mt-1">Account Details</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            <div className="d-flex align-items-center pb-2 image-container">
              {selectedImage && selectedImagePreview ? (
                <img src={selectedImagePreview} alt="profile" className="selected-image" />
              ) : (
                <AccountImageContainer>
                  <UserPlus size={50} />
                </AccountImageContainer>
              )}
              <div className="ml-2 mr-1">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="file-input"
                  ref={fileInputRef}
                />
                <Button color="primary" className="ml-2 mr-1" onClick={() => fileInputRef.current.click()}>
                  Update Picture
                </Button>
              </div>
              <Info size={18} color={theme.infoIcon} id="image-info" />
              <UncontrolledTooltip placement="right" target="image-info">
                <div className="d-flex flex-column align-items-start">
                  <p className="m-0">Allowed file types:</p>
                  <p className="m-0">png, jpg, jpeg.</p>
                  <p className="m-0">Max file size: 5MB</p>
                </div>
              </UncontrolledTooltip>
            </div>

            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="firstName">
                  First Name<span className="label-asterisk">*</span>
                </Label>
                <Controller
                  id="firstName"
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter first name" invalid={errors.firstName && true} />
                  )}
                />
                {errors.firstName && <FormFeedback>{errors.firstName.message}</FormFeedback>}
              </Col>
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="lastName">
                  Last Name<span className="label-asterisk">*</span>
                </Label>
                <Controller
                  id="lastName"
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter last name" invalid={errors.lastName && true} />
                  )}
                />
                {errors.lastName && <FormFeedback>{errors.lastName.message}</FormFeedback>}
              </Col>
            </Row>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="mobileNumber">
                  Mobile number
                </Label>
                <Row>
                  <Col sm="3" md="3" lg="3">
                    <div className="custom-country-disabled-dropdown">
                      <CountryDropdown
                        selectedCountry={{
                          dial_code: userDetailsData?.phone_country.dial_code,
                          code: userDetailsData?.phone_country.code,
                        }}
                        disabled
                      />
                    </div>
                  </Col>
                  <Col sm="9" md="9" lg="9">
                    <Controller
                      id="mobileNumber"
                      name="mobileNumber"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter mobile number"
                          className="filled-form-control"
                          disabled
                          invalid={errors.mobileNumber && true}
                        />
                      )}
                    />
                  </Col>
                </Row>
                {errors.mobileNumber && <FormFeedback>{errors.mobileNumber.message}</FormFeedback>}
              </Col>
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="email">
                  Email address
                </Label>
                <Controller
                  id="email"
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter email address"
                      className="filled-form-control"
                      disabled
                      invalid={errors.email && true}
                    />
                  )}
                />
                {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
              </Col>
            </Row>
            <div className="d-flex justify-content-end mt-2">
              <Button
                color="primary"
                type="submit"
                disabled={
                  userDetailsData?.user_type === 'TALENT'
                    ? !isValid || talentAccountDetailsIsLoading
                    : !isValid || clientAccountDetailsIsLoading
                }
              >
                {talentAccountDetailsIsLoading || clientAccountDetailsIsLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <span className="me-50">Save Changes</span>
                )}
              </Button>
            </div>
          </CardBody>
        </Card>
        <div className="d-flex justify-content-end">
          <Button
            color="primary"
            disabled={isNextButtonDisabled}
            // eslint-disable-next-line
            onClick={() =>
              userDetailsData?.user_type === 'TALENT'
                ? navigate('/talent-onboarding/profile-details')
                : navigate('/client-onboarding/profile-details')
            }
          >
            <span className="me-50">Next</span>
            <ChevronRight size={14} />
          </Button>
        </div>
      </Form>
    </AccountDetailsFormContainer>
  );
};

export default Account;
