/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
  UncontrolledTooltip,
  Progress,
} from 'reactstrap';
import { ChevronRight, Info, UserPlus } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { AccountDetailsFormContainer, AccountImageContainer } from './style';
import theme from '../../configs/themeVariables';
import CountryDropdown from '../../@core/components/country-dropdown';
import {
  getUserDetails,
  saveProfileDetails as saveTalentProfileDetails,
  saveTalentAccountDetails,
  saveFlexternProfileDetails,
} from '../../redux/actions/talentOnboardingActions';
import {
  talentAccountDetailsLoading,
  userDetails,
  profileDetailsLoading,
  userDetailsLoading,
} from '../../redux/selectors/talentOnboardingSelectors';

import ShowToastMessage from '../../@core/components/toast';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import {
  saveClientAccountDetails,
  saveProfileDetails as saveClientProfileDetails,
} from '../../redux/actions/clientOnboardingActions';
import {
  clientAccountDetailsLoading,
  profileDetailsLoading as clientProfileDetailsLoading,
} from '../../redux/selectors/clientOnboardingSelectors';
import { ERROR, SUCCESS } from '../../utility/constants/ToastTypes';
import { profileImageUploadService, profileImageUploadToAzureService } from '../../services/talentOnboardingServices';
import ResetPasswordModal from './ResetPasswordModal';
import { checkPoints, maxFileSize, userOnboarding, userProfileEdit, userTypes } from '../../utility/constants/Constant';
import { convertReferral } from '../../redux/actions/referralAndRewardActions';
import { getItem, removeItem, setItem } from '../../utility/localStorageControl';
import { convertReferralLoading } from '../../redux/selectors/referralAndRewardSelectors';
import RemoveUploadedPicture from '../../@core/components/remove-uploaded-picture';
import { formData, formImage } from '../../redux/selectors/formDataSelectors';
import { clearAllFormData, setFormData, setFormImage } from '../../redux/reducers/formData';
import { filteredFormSchema, giveProgressBarColorClassName } from '../../utility/Utils';
import { getUserData } from '../../redux/actions/authActions';
import { checkIsDelegateModeModalVisible } from '../../redux/selectors/delegateSelectors';
import { toggleDelegateModeModal } from '../../redux/reducers/delegate';
import { selectTrumioIsFlextern, selectUserData } from '../../redux/selectors/authSelectors';
import { ProgressBarWrapper } from '../create-bid/style';

import { returnCompleteProfileDetailsCta } from '../../utility/constants/CompleteProfileDetailsCta';
import '../../App.css';
import { isUserLoggedIn } from '@/utility/commonUtils';
// import { getProfilePercentage } from '../../redux/actions/dashboardActions';

const Account = () => {
  const AccountDetailsSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(1, 'First name must be at least 1 characters')
      .max(25, 'First name must be at most 25 characters')
      .matches(/^[a-zA-Z _]+$/, 'First name should not contain special characters')
      .required('First name is required'),
    lastName: yup
      .string()
      .min(1, 'Last name must be at least 1 characters')
      .max(25, 'Last name must be at most 25 characters')
      .matches(/^[a-zA-Z _]+$/, 'Last name should not contain special characters')
      .required('Last name is required'),
    countryCode: yup.string().required(),
    mobileNumber: yup.string().required(),
    email: yup.string().email().required(),
  });

  const savedFormData = useSelector(formData);
  const userAuthData = useSelector(selectUserData);
  const isFlexternInvited = useSelector(selectTrumioIsFlextern);
  const isDelegate = getItem('isDelegate');
  const isDelegateModeModalVisible = useSelector(checkIsDelegateModeModalVisible);

  const profileCompletionFlextern = useSelector((state) => state.auth?.profileCompletionFlextern?.profile_completed);
  const profileCompletionFlexternMissingValues = useSelector(
    (state) => state.auth?.profileCompletionFlextern?.values_missing,
  );
  const profileCompletionProject = useSelector((state) => state.dashboard?.profilePercentage?.profile_completed);
  const profileCompletionProjectMissingValues = useSelector(
    (state) => state.dashboard?.profilePercentage?.values_missing,
  );

  const isFlexternReady = useSelector((state) => state.auth?.profileCompletionFlextern?.profile_completed) === 100;
  const isProjectReady = useSelector((state) => state.dashboard?.profilePercentage?.profile_completed) === 100;
  const isFlextern = useSelector((state) => state.auth?.is_flextern);
  const isTrumioTalent = useSelector((state) => state.auth?.trumio_talent);
  const userType = useSelector((state) => state.auth?.userType);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(AccountDetailsSchema),
    defaultValues: {
      firstName: savedFormData?.firstName || '',
      lastName: savedFormData?.lastName || '',
      countryCode: savedFormData?.countryCode || '',
      mobileNumber: savedFormData?.mobileNumber || '',
      email: savedFormData?.email || '',
      selectedImage: savedFormData?.selectedImage || '',
      selectedImagePreview: savedFormData?.selectedImagePreview || '',
      imageUrlRes: savedFormData?.imageUrlRes || null,
    },
  });
  const localFormData = useWatch({ control });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDelegateMode = () => dispatch(toggleDelegateModeModal(!isDelegateModeModalVisible));
  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData };
    dispatch(setFormData(allData));
  }, [localFormData]);

  useEffect(() => {
    if (savedFormData) {
      const requiredFields = filteredFormSchema({
        savedData: savedFormData,
        formSchemaFields: AccountDetailsSchema.fields,
      });
      reset(requiredFields);
      const keysWithValues = Object.keys(requiredFields).filter((key) => requiredFields[key]);
      trigger(keysWithValues);
    }
  }, []);

  const userDetailsData = useSelector(userDetails);
  const talentAccountDetailsIsLoading = useSelector(talentAccountDetailsLoading);
  const clientAccountDetailsIsLoading = useSelector(clientAccountDetailsLoading);
  const profileDetailsIsLoading = useSelector(profileDetailsLoading);
  const profileDetailsForClientLoading = useSelector(clientProfileDetailsLoading);
  const userDetailsIsLoading = useSelector(userDetailsLoading);
  const convertReferralIsLoading = useSelector(convertReferralLoading);

  const [resetPasswordModal, setResetPasswordModal] = useState(savedFormData?.resetPasswordModal || null);

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [selectedImage, setSelectedImage] = useState(savedFormData?.selectedImage || null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(savedFormData?.selectedImagePreview || null);
  const [imageUrlRes, setImageUrlRes] = useState(savedFormData?.imageUrlRes || null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [overallPercentageCompletion, setOverallPercentageCompletion] = useState(0);
  const fileInputRef = useRef(null);
  const token = isUserLoggedIn();
  const toggleResetPasswordModal = () => {
    setResetPasswordModal(!resetPasswordModal);
  };

  useEffect(() => {
    dispatch(setFormData({ ...savedFormData, resetPasswordModal }));
  }, [resetPasswordModal]);

  const onReferralConversionSuccess = () => {
    userDetailsData?.user_type === 'TALENT'
      ? navigate(`/${userOnboarding.talent}/personal-details`)
      : navigate(`/${userOnboarding.client}/personal-details`);
    removeItem('referral_data');
  };

  const onSuccess = () => {
    dispatch(clearAllFormData());
    dispatch(getUserData());
    if (isDelegate) {
      setItem('isDelegateProfileCreated', true);
      ShowToastMessage(SUCCESS, 'Delegate profile updated successfully');
      toggleDelegateMode();
      navigate('/dashboard');
      return;
    }
    if (location.pathname.includes('profile-edit')) {
      userDetailsData?.user_type === 'TALENT'
        ? navigate(`/${userProfileEdit.talent}/personal-details`)
        : navigate(`/${userProfileEdit.client}/personal-details`);
    } else {
      const referralData = getItem('referral_data');
      const referralViaShareData = getItem('referral_via_share_data');
      if (referralViaShareData) {
        const email = watch('email');
        dispatch(
          convertReferral({
            referral_id: referralViaShareData.referral_id,
            email,
            onSuccess: onReferralConversionSuccess,
            invite_type: referralViaShareData.referral_invitation_type,
          }),
        );
      } else if (referralData) {
        const referralId = referralData?._id;
        const email = watch('email');
        dispatch(
          convertReferral({
            referral_id: referralId,
            email,
            onSuccess: onReferralConversionSuccess,
            invite_type: referralData?.invitation_type,
          }),
        );
      } else {
        userDetailsData?.user_type === 'TALENT'
          ? navigate(`/${userOnboarding.talent}/personal-details`)
          : navigate(`/${userOnboarding.client}/personal-details`);
      }
    }
  };
  const buttonText = selectedImage && selectedImagePreview ? 'Edit Picture' : 'Update Picture';
  const onGetUserDetailsSuccess = (res) => {
    if (res) {
      setValue('countryCode', res.country_code);
      setValue('mobileNumber', res.phone);
      setValue('email', res.email);

      if (res.checkpoint === checkPoints.ACCOUNT_DETAILS && res.oauth_type === 'google') {
        if (res.user_type === userTypes.talent) {
          setSelectedImage(savedFormData?.selectedImage || res?.talent_info?.image_uri);
          setSelectedImagePreview(savedFormData?.selectedImagePreview || res?.talent_info?.image_uri);
          setValue('firstName', savedFormData?.firstName || res?.talent_info?.first_name, {
            shouldValidate: true,
          });
          if (res?.talent_info?.last_name !== '') {
            setValue('lastName', savedFormData?.lastName || res?.talent_info?.last_name, {
              shouldValidate: true,
            });
          } else {
            setValue('lastName', savedFormData?.lastName);
          }
        } else if (res.user_type === userTypes.client) {
          setSelectedImage(savedFormData?.selectedImage || res?.client_info?.image_uri);
          setSelectedImagePreview(savedFormData?.selectedImagePreview || res?.client_info?.image_uri);
          setValue('firstName', savedFormData?.firstName || res?.client_info?.first_name, {
            shouldValidate: true,
          });
          if (res?.client_info?.last_name !== '') {
            setValue('lastName', savedFormData?.lastName || res?.client_info?.last_name, {
              shouldValidate: true,
            });
          } else {
            setValue('lastName', savedFormData?.lastName);
          }
        }
      } else if (res.checkpoint === checkPoints.PROFILE_DETAILS || res.checkpoint === checkPoints.COMPLETE) {
        if (res.user_type === userTypes.talent) {
          setValue('firstName', savedFormData?.firstName || res.talent_info?.first_name, {
            shouldValidate: true,
          });
          setValue('lastName', savedFormData?.lastName || res.talent_info?.last_name, {
            shouldValidate: true,
          });
          setSelectedImage(savedFormData?.selectedImage || res.talent_info?.image_uri);
          setSelectedImagePreview(savedFormData?.selectedImagePreview || res.talent_info?.image_uri);
        } else if (res.user_type === userTypes.client) {
          setValue('firstName', savedFormData?.firstName || res.client_info?.first_name, {
            shouldValidate: true,
          });
          setValue('lastName', savedFormData?.lastName || res.client_info?.last_name, {
            shouldValidate: true,
          });
          setSelectedImage(savedFormData?.selectedImage || res.client_info?.image_uri);
          setSelectedImagePreview(savedFormData?.selectedImagePreview || res.client_info?.image_uri);
        }

        setIsNextButtonDisabled(false);
      }
    }
  };

  const onSubmit = (data) => {
    const { firstName, lastName } = data;
    let reqData;
    if (imageUrlRes) {
      reqData = { first_name: firstName.trim(), last_name: lastName.trim(), image_uri: imageUrlRes.file_key };
    } else if (selectedImage && selectedImagePreview) {
      reqData = { first_name: firstName.trim(), last_name: lastName.trim() };
    } else {
      reqData = { first_name: firstName.trim(), last_name: lastName.trim(), image_uri: '' };
    }

    if (
      userDetailsData?.checkpoint === checkPoints.ACCOUNT_DETAILS ||
      userDetailsData?.checkpoint === checkPoints.PROFILE_DETAILS
    ) {
      if (userDetailsData.user_type === userTypes.talent) {
        // if (location.pathname.includes('profile-edit') && isFlexternInvited) {
        //   reqData = { ...reqData, flextern: isFlexternInvited, trumio_talent: false };
        // } else if (location.pathname.includes('talent-onboarding') && isFlexternInvited) {
        //   reqData = { ...reqData, flextern: isFlexternInvited, trumio_talent: false };
        // }
        // commmenting this out for now if it's required for future implementation
        dispatch(saveTalentAccountDetails(reqData, onSuccess));
      } else {
        dispatch(saveClientAccountDetails(reqData, onSuccess));
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (userDetailsData.user_type === userTypes.talent) {
        if (isFlexternInvited) {
          dispatch(saveFlexternProfileDetails(reqData, onSuccess));
        } else {
          dispatch(saveTalentProfileDetails(reqData, onSuccess));
        }
      } else {
        dispatch(saveClientProfileDetails(reqData, onSuccess));
      }
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(getUserDetails(onGetUserDetailsSuccess));
    }
  }, []);

  const isFileValid = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!allowedTypes.includes(file.type)) {
      ShowToastMessage(ERROR, 'Please select a valid image file (JPG, JPEG, or PNG).');
      return false;
    }
    if (file.size > maxFileSize) {
      ShowToastMessage(ERROR, 'File size exceeds the maximum limit (5MB).');
      return false;
    }
    return true;
  };
  const savedFormImage = useSelector(formImage);
  const fetchFile = async (file) => {
    if (!file) return;
    const thumbnail = URL.createObjectURL(file);
    setSelectedImage(file);
    dispatch(setFormImage(file));
    setSelectedImagePreview(thumbnail);
    dispatch(setFormData({ ...savedFormData, selectedImage: file, selectedImagePreview: thumbnail }));
    try {
      setIsImageUploading(true);
      const res = await profileImageUploadService(file.name);
      setImageUrlRes(res?.data?.data);
      dispatch(setFormData({ ...savedFormData, imageUrlRes: res.data?.data }));
    } catch (error) {
      setIsImageUploading(false);
      setImageUrlRes(null);
    }
  };

  useEffect(() => {
    const refetchFile = async () => {
      if (savedFormImage != null) {
        await fetchFile(savedFormImage);
      }
    };
    refetchFile();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && isFileValid(file)) {
      fetchFile(file);
    } else {
      e.target.value = '';
    }
  };

  const uploadImage = async (uploadUrl) => {
    try {
      const res = await profileImageUploadToAzureService(uploadUrl, selectedImage, {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': 'multipart/form-data',
        'Content-File-Type': selectedImage.type,
      });

      if (res) {
        setIsImageUploading(false);
      }
    } catch {
      ShowToastMessage(ERROR, 'Something went wrong. Please try uploading again!');
      setIsImageUploading(false);
    }
  };

  const onRemovePictureClick = () => {
    dispatch(setFormImage(null));
    setSelectedImage(null);
    setSelectedImagePreview(null);
    setImageUrlRes(null);
    dispatch(setFormData({ ...savedFormData, selectedImage: null, selectedImagePreview: null, imageUrlRes: null }));
  };

  const getOverallPercentageCompletion = () => {
    if (isFlexternInvited) setOverallPercentageCompletion(profileCompletionFlextern);
  };

  useEffect(() => {
    if (imageUrlRes) {
      uploadImage(imageUrlRes.upload_url);
    }
  }, [imageUrlRes]);

  useEffect(() => {
    getOverallPercentageCompletion();
  }, [profileCompletionFlextern, profileCompletionProject]);

  return (
    <AccountDetailsFormContainer>
      {resetPasswordModal && <ResetPasswordModal modal={resetPasswordModal} toggleModal={toggleResetPasswordModal} />}
      {userDetailsIsLoading ? (
        <div className="w-75">
          <ComponentSpinner className="mt-5" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)} className="d-flex gap-1">
          <div className="w-75">
            <Card>
              <CardHeader>
                <h4 className="m-0 mt-1 text-lg font-medium">Account Details</h4>
              </CardHeader>
              <hr className="m-0 card-header-border" />
              <CardBody>
                <div className="d-flex align-items-center pb-2 image-container">
                  {selectedImage && selectedImagePreview ? (
                    <img
                      src={selectedImagePreview}
                      alt="profile"
                      className="selected-image"
                      style={{ objectFit: 'cover' }}
                    />
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
                    <Button
                      id={selectedImage && selectedImagePreview ? 'popFocus' : 'noFocus'}
                      color="primary"
                      className="ml-2 mr-1"
                      disabled={isImageUploading}
                      onClick={() => !selectedImage && !selectedImagePreview && fileInputRef.current.click()}
                    >
                      {isImageUploading ? <Spinner size="sm" /> : buttonText}
                    </Button>
                    {selectedImage && selectedImagePreview && (
                      <RemoveUploadedPicture
                        fileInputRef={fileInputRef}
                        onRemovePicture={onRemovePictureClick}
                        offset={[45, 10]}
                      />
                    )}
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
                      Mobile Number
                    </Label>
                    <Row className="d-flex align-items-center justify-content-between">
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
                              className="filled-form-control filled-form-text-field"
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
                      Email Address
                    </Label>
                    <Controller
                      id="email"
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter email address"
                          className="filled-form-control filled-form-text-field"
                          disabled
                          invalid={errors.email && true}
                        />
                      )}
                    />
                    {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <div className="d-flex justify-content-end">
              {location.pathname.includes('profile-edit') && userDetailsData?.oauth_type !== 'google' && (
                <Button color="primary" outline className="me-2" onClick={() => setResetPasswordModal(true)}>
                  {isDelegate ? 'Change Password' : 'Reset Password'}
                </Button>
              )}
              <Button
                color="primary"
                type="submit"
                className="d-flex align-items-center justify-content-between"
                disabled={
                  isImageUploading ||
                  convertReferralIsLoading ||
                  (isNextButtonDisabled || userDetailsData?.user_type === userTypes.talent
                    ? !isValid || talentAccountDetailsIsLoading || profileDetailsIsLoading
                    : !isValid || clientAccountDetailsIsLoading || profileDetailsForClientLoading)
                }
              >
                {talentAccountDetailsIsLoading ||
                clientAccountDetailsIsLoading ||
                convertReferralIsLoading ||
                profileDetailsIsLoading ||
                profileDetailsForClientLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <>
                    <span className="me-50">Save & Continue</span>
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="w-25">
            {userType != userTypes.client && isFlexternInvited && (
              <Card>
                <CardHeader>
                  <h4 className="m-0 mt-1 text-lg font-medium">Profile Completion</h4>
                  <CardText className="m-0 mt-1">
                    Make it easier for others to find you by completing your profile.
                  </CardText>
                  <h3 className="m-0 mt-1 mb-1 text-xl font-semibold text-grey">{overallPercentageCompletion || 0}%</h3>
                  <Progress
                    value={overallPercentageCompletion}
                    style={{ height: '0.5rem' }}
                    className={`${giveProgressBarColorClassName(overallPercentageCompletion)} p-0 m-0 w-100`}
                  />
                </CardHeader>

                <CardBody>
                  <hr className="m-0 card-header-border" />

                  {isTrumioTalent && (
                    <div className="d-flex gap-1 mt-1">
                      <div className="custom-checkbox-wrapper">
                        <Input
                          type="checkbox"
                          id="customCheckbox"
                          className="custom-checkbox-input"
                          checked={isProjectReady}
                        />
                        <label htmlFor="customCheckbox" className="custom-checkbox-label" />
                      </div>
                      <div>
                        <CardText className="m-0">Client Projects Ready</CardText>
                        <b
                          className="text-primary cursor-pointer "
                          onClick={() =>
                            navigate(
                              returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionProjectMissingValues)
                                ?.path || '/marketplace',
                            )
                          }
                        >
                          {isProjectReady
                            ? 'Explore Projects'
                            : `${
                                returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionProjectMissingValues)
                                  ?.label
                              }`}{' '}
                          <ChevronRight size="1.2em" />
                        </b>
                      </div>
                    </div>
                  )}

                  {isFlexternInvited && (
                    <div className="d-flex gap-1 mt-1">
                      <div className="custom-checkbox-wrapper">
                        <Input
                          type="checkbox"
                          id="customCheckbox2"
                          className="custom-checkbox-input"
                          checked={isFlexternReady}
                        />
                        <label htmlFor="customCheckbox2" className="custom-checkbox-label" />
                      </div>
                      <div>
                        <CardText className="m-0">Flexternship Ready</CardText>
                        <b
                          className="d-flex align-items-center text-primary cursor-pointer "
                          onClick={() =>
                            !userDetailsData?.talent_info
                              ? navigate('/talent-onboarding/account-details')
                              : navigate(
                                  returnCompleteProfileDetailsCta(
                                    userTypes.talent,
                                    profileCompletionFlexternMissingValues,
                                  )?.path || '/dashboard',
                                )
                          }
                        >
                          {isFlexternReady
                            ? 'Explore Flexternships'
                            : `${
                                !userDetailsData?.talent_info
                                  ? 'Add Account Details'
                                  : returnCompleteProfileDetailsCta(
                                      userTypes.talent,
                                      profileCompletionFlexternMissingValues,
                                    )?.label
                              }`}{' '}
                          <ChevronRight size="1.2em" />
                        </b>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            )}
          </div>
        </Form>
      )}
    </AccountDetailsFormContainer>
  );
};

export default Account;
