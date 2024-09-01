/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AsyncPaginate } from 'react-select-async-paginate';
import * as yup from 'yup';
import { useForm, Controller, useWatch } from 'react-hook-form';
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
import { ChevronLeft, ChevronRight, Info } from 'react-feather';
import classNames from 'classnames';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeColors } from '@utils';
import companyIcon from '@src/assets/images/business.svg';
import { AccountImageContainer, ProfileFormContainer, UploadIconContainer } from '../style';
import theme from '../../../configs/themeVariables';
import { getStates, getCities } from '../../../redux/actions/staticActions';
import { states, statesLoading, cities, citiesLoading } from '../../../redux/selectors/staticSelectors';
import { saveProfileDetails } from '../../../redux/actions/clientOnboardingActions';
import { profileDetailsLoading } from '../../../redux/selectors/clientOnboardingSelectors';
import { companyIndustriesService, countriesService } from '../../../services/staticServices';
import { filteredFormSchema, removeEmptyKeys, returnFilteredDropdownOptions } from '../../../utility/Utils';
import { getUserDetails } from '../../../redux/actions/talentOnboardingActions';
import { userDetails, userDetailsLoading } from '../../../redux/selectors/talentOnboardingSelectors';
import {
  profileImageUploadService,
  profileImageUploadToAzureService,
} from '../../../services/talentOnboardingServices';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';
import { maxFileSize, userOnboarding, userProfileEdit } from '../../../utility/constants/Constant';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import RemoveUploadedPicture from '../../../@core/components/remove-uploaded-picture';
import { formData, formDocuments } from '../../../redux/selectors/formDataSelectors';
import { clearAllFormData, setFormData, setFormDocuments } from '../../../redux/reducers/formData';

const Personal = () => {
  const PersonalSchema = yup.object().shape({
    companyName: yup
      .string()
      .max(30, 'Organization  must be 30 characters or less')
      .required('Organization is required'),
    title: yup.string().max(30, 'Title  must be 30 characters or less').required('Title is required'),
    companyTagline: yup.string().max(60, 'Tagline must be 60 characters or less').required('Tagline is required'),
    companyIndustry: yup
      .object()
      .shape({
        label: yup.string().required('Industry is required'),
        value: yup.string().required('Industry is required'),
      })
      .required('Industry is required'),
    totalStrength: yup.number(),
    streetAddress: yup.string(),
    houseNumber: yup.string(),
    zipCode: yup.string(),
    country: yup
      .object()
      .shape({
        label: yup.string().required('Country is required'),
        value: yup.string().required('Country is required'),
      })
      .required('Country is required'),
    state: yup
      .object()
      .shape({
        label: yup.string().required('State is required'),
        value: yup.string().required('State is required'),
      })
      .transform((value) => (value === null ? undefined : value))
      .required('State is required'),
    city: yup
      .object()
      .shape({
        label: yup.string().required('City is required'),
        value: yup.string().required('City is required'),
      })
      .transform((value) => (value === null ? undefined : value))
      .required('City is required'),
  });

  const savedFormData = useSelector(formData);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(PersonalSchema),
    defaultValues: {
      companyName: savedFormData?.companyName || '',
      title: savedFormData?.title || '',
      companyTagline: savedFormData?.companyTagline || '',
      companyIndustry: savedFormData?.companyIndustry || '',
      totalStrength: savedFormData?.totalStrength || null,
      streetAddress: savedFormData?.streetAddress || '',
      houseNumber: savedFormData?.houseNumber || '',
      zipCode: savedFormData?.zipCode || '',
      country: savedFormData?.country || null,
      state: savedFormData?.state || null,
      city: savedFormData?.city || null,
      selectedImage: savedFormData?.selectedImage || null,
      selectedImagePreview: savedFormData?.selectedImagePreview || null,
      imageUrlRes: savedFormData?.imageUrlRes || null,
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const localFormData = useWatch({ control });
  const updatedFormDocument = useSelector(formDocuments);
  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData };
    dispatch(setFormData(allData));
  }, [localFormData]);

  useEffect(() => {
    if (savedFormData) {
      const requiredFields = filteredFormSchema({
        savedData: savedFormData,
        formSchemaFields: PersonalSchema.fields,
      });
      reset(requiredFields);
      const keysWithValues = Object.keys(requiredFields).filter((key) => requiredFields[key]);
      trigger(keysWithValues);
    }
  }, []);

  const [selectedImage, setSelectedImage] = useState(savedFormData?.selectedImage || null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(savedFormData?.selectedImagePreview || null);
  const [imageUrlRes, setImageUrlRes] = useState(savedFormData?.imageUrlRes || null);
  const [companyIndustriesOptions, setCompanyIndustriesOptions] = useState(null);
  const [countriesOptions, setCountriesOptions] = useState(null);
  const [statesOptions, setStatesOptions] = useState(null);
  const [citiesOptions, setCitiesOptions] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const fileInputRef = useRef(null);

  const statesData = useSelector(states);
  const statesIsLoading = useSelector(statesLoading);
  const citiesData = useSelector(cities);
  const citiesIsLoading = useSelector(citiesLoading);
  const profileDetailsIsLoading = useSelector(profileDetailsLoading);
  const userDetailsIsLoading = useSelector(userDetailsLoading);
  const userDetailsData = useSelector(userDetails);
  const uploadButtonText = selectedImage && selectedImagePreview ? 'Edit Company Logo' : 'Upload Company Logo';

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
  const fetchFile = async (file) => {
    const thumbnail = URL.createObjectURL(file);
    setSelectedImage(file);
    dispatch(setFormDocuments(file));
    setSelectedImagePreview(thumbnail);
    dispatch(setFormData({ ...savedFormData, selectedImage: file, selectedImagePreview: thumbnail }));
    try {
      setIsImageUploading(true);
      const res = await profileImageUploadService(file.name);
      setImageUrlRes(res?.data?.data);
      dispatch(
        setFormData({
          ...savedFormData,
          imageUrlRes: res.data?.data,
          selectedImage: file,
          selectedImagePreview: thumbnail,
        }),
      );
    } catch (error) {
      setIsImageUploading(false);
      setImageUrlRes(null);
    }
  };

  useEffect(() => {
    const refetchFile = async () => {
      if (updatedFormDocument != null) {
        await fetchFile(updatedFormDocument);
      }
    };
    refetchFile();
  }, [updatedFormDocument]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && isFileValid(file)) {
      await fetchFile(file);
    } else {
      e.target.value = '';
    }
  };

  const uploadImage = async (uploadUrl) => {
    try {
      const res = await profileImageUploadToAzureService(uploadUrl, selectedImage, {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': 'multipart/form-data',
      });

      if (res) {
        setIsImageUploading(false);
      }
    } catch {
      ShowToastMessage(ERROR, 'Something went wrong. Please try uploading again!');
      setIsImageUploading(false);
    }
  };

  useEffect(() => {
    if (imageUrlRes) {
      uploadImage(imageUrlRes.upload_url);
    }
  }, [imageUrlRes]);

  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData, country: watch('country') };
    dispatch(setFormData(allData));

    if (watch('country')?.value !== userDetailsData?.client_info?.office_address?.country?._id) {
      setValue('state', null);
      setValue('city', null);
    }

    if (watch('country')) {
      dispatch(getStates(watch('country').value));
      setCitiesOptions([]);
    }
    if (savedFormData && savedFormData.country != null && savedFormData?.country?.label === watch('country').label) {
      setValue('state', savedFormData?.state);
      if (savedFormData && savedFormData?.state != null) {
        setValue('city', savedFormData?.city);
      }
    }
  }, [watch('country')]);

  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData, state: watch('state') };
    dispatch(setFormData(allData));

    if (watch('state')?.value !== userDetailsData?.client_info?.office_address?.state?._id) {
      setValue('city', null);
    }

    if (watch('state')) {
      dispatch(getCities(watch('state').value));
    }
    if (watch('state') != null && savedFormData && savedFormData?.state?.label === watch('state').label) {
      setValue('city', savedFormData?.city);
    }
  }, [watch('state')]);

  useEffect(() => {
    const requiredData = statesData?.map((state) => ({ label: state.name, value: state._id }));
    setStatesOptions(requiredData);
  }, [statesData]);

  useEffect(() => {
    const requiredData = citiesData?.map((city) => ({ label: city.name, value: city._id }));
    setCitiesOptions(requiredData);
  }, [citiesData]);

  const onBackClick = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.client}/account-details`);
    } else {
      navigate(`/${userOnboarding.client}/account-details`);
    }
  };

  const onSkipClick = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.client}/educational-details`);
    } else {
      navigate(`/${userOnboarding.client}/educational-details`);
    }
  };

  const onSuccess = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.client}/educational-details`);
    } else {
      navigate(`/${userOnboarding.client}/educational-details`);
    }
  };

  const onSubmit = (data) => {
    const {
      companyName,
      title,
      companyTagline,
      companyIndustry,
      totalStrength,
      streetAddress,
      houseNumber,
      zipCode,
      country,
      state,
      city,
    } = data;

    const company_name = companyName;
    const company_tagline = companyTagline;
    const company_industry = companyIndustry.value;
    const company_strength = totalStrength;
    const office_address = {
      country: country.value,
      state: state.value,
      city: city.value,
      street_address: streetAddress,
      house_number: houseNumber,
      zip_code: zipCode,
    };

    let reqData;

    if (imageUrlRes) {
      reqData = {
        company_name,
        title,
        company_tagline,
        company_industry,
        company_strength,
        office_address,
        company_logo: imageUrlRes.file_key,
      };
      dispatch(saveProfileDetails(removeEmptyKeys(reqData), onSuccess));
    } else {
      reqData = {
        company_name,
        title,
        company_tagline,
        company_industry,
        company_strength,
        office_address,
      };

      if (selectedImage && selectedImagePreview) {
        dispatch(saveProfileDetails(removeEmptyKeys(reqData), onSuccess));
      } else {
        dispatch(saveProfileDetails({ ...removeEmptyKeys(reqData), company_logo: '' }, onSuccess));
      }
    }
  };

  const loadCompanyIndustriesOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, companyIndustriesOptions),
      };
    }
    try {
      const response = await companyIndustriesService();
      const options = response?.data?.data?.map((industry) => ({ label: industry.name, value: industry._id }));
      setCompanyIndustriesOptions(options);
      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  const loadCountriesOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, countriesOptions),
      };
    }
    try {
      const response = await countriesService();

      const options = response?.data?.data?.map((country) => ({ label: country.name, value: country._id }));

      setCountriesOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  const onGetUserDetailsSuccess = (res) => {
    if (res) {
      if (res?.client_info?.company_logo.length > 0) {
        setSelectedImage(savedFormData?.selectedImage || res.client_info?.company_logo);
        setSelectedImagePreview(savedFormData?.selectedImagePreview || res.client_info?.company_logo);
      }
      if (res?.client_info?.company_name.length > 0) {
        setValue('companyName', res?.client_info?.company_name, { shouldValidate: true });
      }
      if (res?.client_info?.title.length > 0) {
        setValue('title', savedFormData?.title || res?.client_info?.title, {
          shouldValidate: true,
        });
      }
      if (res?.client_info?.company_tagline.length > 0) {
        setValue('companyTagline', savedFormData?.companyTagline || res?.client_info?.company_tagline, {
          shouldValidate: true,
        });
      }
      if ('name' in res?.client_info?.company_industry) {
        setValue(
          'companyIndustry',
          {
            label: savedFormData?.companyIndustry?.label || res?.client_info?.company_industry?.name,
            value: savedFormData?.companyIndustry?.value || res?.client_info?.company_industry?._id,
          },
          { shouldValidate: true },
        );
      }
      if (res?.client_info?.company_strength > 0) {
        setValue('totalStrength', savedFormData?.totalStrength || res?.client_info?.company_strength, {
          shouldValidate: true,
        });
      }
      if (
        'streetAddress' in res?.client_info?.office_address ||
        'houseNumber' in res?.client_info?.office_address ||
        'zipCode' in res?.client_info?.office_address ||
        'country' in res?.client_info?.office_address ||
        'state' in res?.client_info?.office_address ||
        'city' in res?.client_info?.office_address
      ) {
        if (res?.client_info?.office_address?.street_address.length > 0) {
          setValue('streetAddress', savedFormData?.streetAddress || res?.client_info?.office_address?.street_address, {
            shouldValidate: true,
          });
        }
        if (res?.client_info?.office_address?.house_number.length > 0) {
          setValue('houseNumber', savedFormData?.houseNumber || res?.client_info?.office_address?.house_number, {
            shouldValidate: true,
          });
        }
        if (res?.client_info?.office_address?.zip_code > 0) {
          setValue('zipCode', savedFormData?.zipCode || res?.client_info?.office_address?.zip_code, {
            shouldValidate: true,
          });
        }
        if ('country' in res?.client_info?.office_address) {
          setValue(
            'country',
            {
              label: savedFormData?.country?.label || res?.client_info?.office_address.country.name,
              value: savedFormData?.country?.value || res?.client_info?.office_address.country._id,
            },
            { shouldValidate: true },
          );
        }
        if ('state' in res?.client_info?.office_address) {
          setValue(
            'state',
            {
              label: savedFormData?.state?.label || res?.client_info?.office_address.state.name,
              value: savedFormData?.state?.value || res?.client_info?.office_address.state._id,
            },
            { shouldValidate: true },
          );
        }
        if ('city' in res?.client_info?.office_address) {
          setValue(
            'city',
            {
              label: savedFormData?.city?.label || res?.client_info?.office_address.city.name,
              value: savedFormData?.city?.value || res?.client_info?.office_address.city._id,
            },
            { shouldValidate: true },
          );
        }
      }
    }
  };

  const onRemovePictureClick = () => {
    dispatch(setFormDocuments(null));
    setSelectedImage(null);
    setSelectedImagePreview(null);
    setImageUrlRes(null);
    dispatch(setFormData({ ...savedFormData, selectedImage: null, selectedImagePreview: null, imageUrlRes: null }));
  };

  useEffect(() => {
    dispatch(getUserDetails(onGetUserDetailsSuccess));
  }, []);

  return (
    <ProfileFormContainer>
      {userDetailsIsLoading ? (
        <div className="w-75">
          <ComponentSpinner className="mt-5" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card className="w-75">
            <CardHeader>
              <h4 className="m-0 mt-1">About</h4>
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody>
              <div className="d-flex align-items-center pb-2 image-container">
                {selectedImage && selectedImagePreview ? (
                  <img src={selectedImagePreview} alt="profile" className="selected-image" />
                ) : (
                  <AccountImageContainer>
                    <img src={companyIcon} alt="profile" />
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
                    {isImageUploading ? <Spinner size="sm" /> : uploadButtonText}
                  </Button>
                  {selectedImage && selectedImagePreview && (
                    <RemoveUploadedPicture
                      fileInputRef={fileInputRef}
                      onRemovePicture={onRemovePictureClick}
                      offset={[15, 10]}
                    />
                  )}
                </div>
                <Info size={18} color={theme.infoIcon} id="logo-info" />
                <UncontrolledTooltip placement="right" target="logo-info">
                  <div className="d-flex flex-column align-items-start">
                    <p className="m-0">Allowed file types:</p>
                    <p className="m-0">png, jpg, jpeg.</p>
                    <p className="m-0">Max file size: 5MB</p>
                  </div>
                </UncontrolledTooltip>
              </div>

              <Row className="mb-1 mt-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="companyName">
                    Company Name<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="companyName"
                    name="companyName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter your organization's name"
                        invalid={errors.companyName && true}
                      />
                    )}
                  />
                  {errors.companyName && <FormFeedback>{errors.companyName.message}</FormFeedback>}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="title">
                    Title<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="title"
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter your title" invalid={errors.title && true} />
                    )}
                  />
                  {errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
                </Col>
              </Row>
              <Row className="mb-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="companyTagline">
                    Company Tagline<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="companyTagline"
                    name="companyTagline"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter your tagline in 60 characters or less"
                        invalid={errors.companyTagline && true}
                      />
                    )}
                  />
                  {errors.companyTagline && <FormFeedback>{errors.companyTagline.message}</FormFeedback>}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="companyIndustry">
                    Company Industry<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="companyIndustry"
                    name="companyIndustry"
                    control={control}
                    invalid={errors.companyIndustry && true}
                    render={({ field }) => (
                      <AsyncPaginate
                        loadOptions={loadCompanyIndustriesOptions}
                        classNamePrefix="select"
                        placeholder="Select one"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.companyIndustry,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors.companyIndustry && <FormFeedback>{errors.companyIndustry.label.message}</FormFeedback>}
                </Col>
              </Row>
              <Row className="mt-2">
                <h5 className="m-0">What is the total strength of your company?</h5>
              </Row>
              <Row className="mb-3">
                <div className="demo-inline-spacing m-0">
                  <Controller
                    control={control}
                    name="totalStrength"
                    render={({ field }) => (
                      <div className="demo-inline-spacing m-0">
                        <div className="form-check form-check-inline checkbox-custom-margin">
                          <Input
                            type="radio"
                            {...field}
                            id="1-100"
                            checked={field.value === 100}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              const value = 100;

                              if (isChecked) {
                                field.onChange(value);
                              } else {
                                field.onChange('');
                              }
                            }}
                          />
                          <Label for="1-100" className="form-check-label fw-bold">
                            1 - 100
                          </Label>
                        </div>
                        <div className="form-check form-check-inline checkbox-custom-margin">
                          <Input
                            type="radio"
                            {...field}
                            id="100-500"
                            checked={field.value === 500}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              const value = 500;

                              if (isChecked) {
                                field.onChange(value);
                              } else {
                                field.onChange('');
                              }
                            }}
                          />
                          <Label for="100-500" className="form-check-label fw-bold">
                            100 - 500
                          </Label>
                        </div>
                        <div className="form-check form-check-inline checkbox-custom-margin">
                          <Input
                            type="radio"
                            {...field}
                            id="500-1000"
                            checked={field.value === 1000}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              const value = 1000;

                              if (isChecked) {
                                field.onChange(value);
                              } else {
                                field.onChange('');
                              }
                            }}
                          />
                          <Label for="500-1000" className="form-check-label fw-bold">
                            500 - 1000
                          </Label>
                        </div>
                        <div className="form-check form-check-inline checkbox-custom-margin">
                          <Input
                            type="radio"
                            {...field}
                            id="1000+"
                            checked={field.value === 1001}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              const value = 1001;

                              if (isChecked) {
                                field.onChange(value);
                              } else {
                                field.onChange('');
                              }
                            }}
                          />
                          <Label for="1000+" className="form-check-label fw-bold">
                            1000+
                          </Label>
                        </div>
                      </div>
                    )}
                  />
                </div>
              </Row>
              <Row className="mb-1">
                <h5 className="m-0">
                  Office Address<span className="label-asterisk me-50">*</span>
                </h5>
              </Row>
              <Row className="mb-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="streetAddress">
                    Street Address
                  </Label>
                  <Controller
                    id="streetAddress"
                    name="streetAddress"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter street address"
                        invalid={errors.streetAddress && true}
                        autoComplete="none"
                      />
                    )}
                  />
                  {errors.streetAddress && <FormFeedback>{errors.streetAddress.message}</FormFeedback>}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Row>
                    <Col sm="6" md="6" lg="6">
                      <Label className="form-label" for="houseNumber">
                        House Number
                      </Label>
                      <Controller
                        id="houseNumber"
                        name="houseNumber"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Enter house number"
                            invalid={errors.houseNumber && true}
                            autoComplete="none"
                          />
                        )}
                      />
                      {errors.houseNumber && <FormFeedback>{errors.houseNumber.message}</FormFeedback>}
                    </Col>
                    <Col sm="6" md="6" lg="6">
                      <Label className="form-label" for="zipCode">
                        Zip Code
                      </Label>
                      <Controller
                        id="zipCode"
                        name="zipCode"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Enter zip code"
                            invalid={errors.zipCode && true}
                            autoComplete="none"
                          />
                        )}
                      />
                      {errors.zipCode && <FormFeedback>{errors.zipCode.message}</FormFeedback>}
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="mb-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="city">
                    City<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="city"
                    name="city"
                    control={control}
                    invalid={errors.city && true}
                    render={({ field }) => (
                      <Select
                        isDisabled={!watch('country') || !watch('state')}
                        isLoading={citiesIsLoading}
                        options={citiesOptions}
                        menuPosition="fixed"
                        minMenuHeight={200}
                        classNamePrefix="select"
                        placeholder="Select your city"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.city,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors.city && <FormFeedback>{errors.city.label.message}</FormFeedback>}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="state">
                    State<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="state"
                    name="state"
                    control={control}
                    invalid={errors.state && true}
                    render={({ field }) => (
                      <Select
                        isDisabled={!watch('country')}
                        isLoading={statesIsLoading}
                        options={statesOptions}
                        menuPosition="fixed"
                        minMenuHeight={200}
                        classNamePrefix="select"
                        placeholder="Select your state"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.state,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors.state && <FormFeedback>{errors.state.label.message}</FormFeedback>}
                </Col>
              </Row>
              <Row className="mb-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="country">
                    Country<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="country"
                    name="country"
                    control={control}
                    invalid={errors.country && true}
                    render={({ field }) => (
                      <AsyncPaginate
                        loadOptions={loadCountriesOptions}
                        classNamePrefix="select"
                        placeholder="Select your country"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.country,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors.country && <FormFeedback>{errors.country.label.message}</FormFeedback>}
                </Col>
              </Row>
            </CardBody>
          </Card>
          <div className="d-flex justify-content-between align-items-center pb-2 mt-1 w-75">
            <div className="d-flex align-items-center upload-button cursor-pointer" onClick={onBackClick}>
              <UploadIconContainer>
                <ChevronLeft size={18} color={theme.activeNavPillText} />
              </UploadIconContainer>
              <h5 className="fw-bold">Back</h5>
            </div>
            <div>
              <Button color="primary" outline className="me-2" onClick={onSkipClick}>
                <span className="me-50">Skip</span>
                <ChevronRight size={14} />
              </Button>
              <Button color="primary" type="submit" disabled={isImageUploading || !isValid || profileDetailsIsLoading}>
                {profileDetailsIsLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <>
                    <span className="me-50">Save & Continue</span>
                    <ChevronRight size={14} />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </ProfileFormContainer>
  );
};

export default Personal;
