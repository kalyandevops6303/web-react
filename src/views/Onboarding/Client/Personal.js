import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AsyncPaginate } from 'react-select-async-paginate';
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
import { ChevronLeft, ChevronRight, Info } from 'react-feather';
import classNames from 'classnames';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeColors } from '@utils';
import { toast } from 'react-hot-toast';
import companyIcon from '@src/assets/images/company.png';
import { AccountImageContainer, ProfileFormContainer, UploadIconContainer } from '../style';
import theme from '../../../configs/themeVariables';
import { getStates, getCities } from '../../../redux/actions/staticActions';
import { states, statesLoading, cities, citiesLoading } from '../../../redux/selectors/staticSelectors';
import { saveProfileDetails } from '../../../redux/actions/clientOnboardingActions';
import { profileDetailsLoading } from '../../../redux/selectors/clientOnboardingSelectors';
import { companyIndustriesService, countriesService } from '../../../services/staticServices';
import { removeEmptyKeys, returnFilteredDropdownOptions } from '../../../utility/Utils';
import { getUserDetails } from '../../../redux/actions/talentOnboardingActions';
import { userDetails } from '../../../redux/selectors/talentOnboardingSelectors';

const Personal = () => {
  const PersonalSchema = yup.object().shape({
    companyName: yup.string().required('Organization is required'),
    title: yup.string().required('Title is required'),
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
    zipCode: yup
      .number()
      .typeError('Zip code must be a number')
      .transform((value) => (Number.isNaN(value) ? undefined : value)),
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

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(PersonalSchema),
    defaultValues: {
      streetAddress: '',
      houseNumber: '',
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const [companyIndustriesOptions, setCompanyIndustriesOptions] = useState(null);
  const [countriesOptions, setCountriesOptions] = useState(null);
  const [statesOptions, setStatesOptions] = useState(null);
  const [citiesOptions, setCitiesOptions] = useState(null);
  const fileInputRef = useRef(null);

  const statesData = useSelector(states);
  const statesIsLoading = useSelector(statesLoading);
  const citiesData = useSelector(cities);
  const citiesIsLoading = useSelector(citiesLoading);
  const profileDetailsIsLoading = useSelector(profileDetailsLoading);
  const userDetailsData = useSelector(userDetails);

  const isFileValid = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPG, JPEG, or PNG).');
      return false;
    }
    if (file.size > maxSize) {
      toast.error('File size exceeds the maximum limit (5MB).');
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

  useEffect(() => {
    if (watch('country')?.value !== userDetailsData?.client_info?.office_address.country._id) {
      setValue('state', null);
      setValue('city', null);
    }

    if (watch('country')) {
      dispatch(getStates(watch('country').value));
    }
  }, [watch('country')]);

  useEffect(() => {
    if (watch('state')?.value !== userDetailsData?.client_info?.office_address.state._id) {
      setValue('city', null);
    }

    if (watch('state')) {
      dispatch(getCities(watch('state').value));
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

  const onSuccess = () => {
    navigate('/client-onboarding/educational-details');
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

    const reqData = {
      company_name,
      title,
      company_tagline,
      company_industry,
      company_strength,
      office_address,
    };

    dispatch(saveProfileDetails(removeEmptyKeys(reqData), onSuccess));
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
      setValue('companyName', res?.client_info?.company_name);
      setValue('title', res?.client_info?.title);
      setValue('companyTagline', res?.client_info?.company_tagline);
      if (res?.client_info?.company_industry !== {}) {
        setValue('companyIndustry', {
          label: res?.client_info?.company_industry?.name,
          value: res?.client_info?.company_industry?._id,
        });
      }
      setValue('totalStrength', res?.client_info?.company_strength);
      if (res?.client_info?.office_address !== {}) {
        setValue('streetAddress', res?.client_info?.office_address?.street_address);
        setValue('houseNumber', res?.client_info?.office_address?.house_number);
        setValue('zipCode', res?.client_info?.office_address?.zip_code);
        setValue('country', {
          label: res?.client_info?.office_address.country.name,
          value: res?.client_info?.office_address.country._id,
        });
        setValue('state', {
          label: res?.client_info?.office_address.state.name,
          value: res?.client_info?.office_address.state._id,
        });
        setValue('city', {
          label: res?.client_info?.office_address.city.name,
          value: res?.client_info?.office_address.city._id,
        });
      }
    }
  };

  useEffect(() => {
    dispatch(getUserDetails(onGetUserDetailsSuccess));
  }, []);

  return (
    <ProfileFormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
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
                <Button color="primary" className="ml-2 mr-1" onClick={() => fileInputRef.current.click()}>
                  Update Picture
                </Button>
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
                  Organization<span className="label-asterisk me-50">*</span>
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
                  Tagline<span className="label-asterisk me-50">*</span>
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
                  Industry<span className="label-asterisk me-50">*</span>
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
              <h5 className="m-0">Number of employees or members</h5>
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
                      Suite
                    </Label>
                    <Controller
                      id="houseNumber"
                      name="houseNumber"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter suite number"
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
                          type="number"
                          onWheel={(e) => e.target.blur()}
                          min={0}
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
                      isLoading={statesIsLoading}
                      options={statesOptions}
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
                      isLoading={citiesIsLoading}
                      options={citiesOptions}
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
            </Row>
          </CardBody>
        </Card>
        <div className="d-flex justify-content-between align-items-center pb-2 mt-1">
          <div
            className="d-flex align-items-center upload-button cursor-pointer"
            onClick={() => navigate('/client-onboarding/account-details')}
          >
            <UploadIconContainer>
              <ChevronLeft size={18} color={theme.activeNavPillText} />
            </UploadIconContainer>
            <h5 className="fw-bold">Back</h5>
          </div>
          <div>
            <Link to="/client-onboarding/educational-details">
              <Button color="primary" outline className="me-2">
                <span className="me-50">Skip</span>
                <ChevronRight size={14} />
              </Button>
            </Link>
            <Button color="primary" type="submit" disabled={!isValid || profileDetailsIsLoading}>
              {profileDetailsIsLoading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <span className="me-50">Next</span>
                  <ChevronRight size={14} />
                </>
              )}
            </Button>
          </div>
        </div>
      </Form>
    </ProfileFormContainer>
  );
};

export default Personal;
