import React, { useRef, useState } from 'react';
import Proptypes from 'prop-types';
import * as yup from 'yup';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
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
  UncontrolledTooltip,
} from 'reactstrap';
import { ChevronLeft, ChevronRight, Info, Plus, UserPlus } from 'react-feather';
import classNames from 'classnames';
import Select from 'react-select';
import { selectThemeColors } from '@utils';
import { toast } from 'react-hot-toast';
import { AccountImageContainer, ProfileFormContainer, UploadIconContainer } from '../style';
import theme from '../../../configs/themeVariables';

const Profile = ({ tabNames, toggleTab }) => {
  const ProfileSchema = yup.object().shape({
    companyName: yup.string().required('Company name is required'),
    title: yup.string().required('Title is required'),
    companyTagline: yup
      .string()
      .max(60, 'Company tagline must be at most 60 characters')
      .required('Company tagline is required'),
    companyIndustry: yup
      .object()
      .shape({
        label: yup.string().required('Company industry is required'),
        value: yup.string().required('Company industry is required'),
      })
      .required('Company industry is required'),
    totalStrength: yup.string(),
    streetAddress: yup.string(),
    houseNumber: yup.string(),
    zipCode: yup.number(),
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
      .required('State is required'),
    city: yup
      .object()
      .shape({
        label: yup.string().required('City is required'),
        value: yup.string().required('City is required'),
      })
      .required('City is required'),
    educationDetails: yup
      .array()
      .of(
        yup.object().shape({
          educationInstitution: yup
            .object()
            .shape({
              label: yup.string().required('Education Institution is required'),
              value: yup.string().required('Education Institution is required'),
            })
            .required('Education Institution is required'),
          education: yup
            .object()
            .shape({
              label: yup.string().required('Education is required'),
              value: yup.string().required('Education is required'),
            })
            .required('Education is required'),
        }),
      )
      .min(1, 'At least one education should be added'),
    linkedInLink: yup.string().url('Please enter a valid url'),
    twitterLink: yup.string().url('Please enter a valid url'),
    githubLink: yup.string().url('Please enter a valid url'),
    otherSocialLinks: yup.array().of(
      yup.object().shape({
        linkName: yup.string().nullable(),
        link: yup.string().url('Please enter a valid url').nullable(),
      }),
    ),
    area: yup.array().of(
      yup.object().shape({
        label: yup.string(),
        value: yup.string(),
      }),
    ),
    skills: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'At most five skills can be added')
      .min(1, 'At least one skill should be added')
      .required('Skill is required'),
    tools: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'At most five tools can be added'),
    preferredWorkingTimeZone: yup
      .object()
      .shape({
        label: yup.string().required('Preferred working time zone is required'),
        value: yup.string().required('Preferred working time zone is required'),
      })
      .required('Preferred working time zone is required'),
    availabilityDays: yup
      .array()
      .min(1, 'Select at least one work availability day')
      .required('Work availability day is required'),
    weekdays: yup.array().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays.includes('weekdays'),
      then: () => yup.array().min(1, 'Select at least one weekday').required('Weekday is required'),
    }),
    weekends: yup.array().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays.includes('weekend'),
      then: () => yup.array().min(1, 'Select at least one weekend day').required('Weekend is required'),
    }),
    weekdayStartTime: yup.object().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays.includes('weekdays'),
      then: () =>
        yup
          .object()
          .shape({
            label: yup.string().required('Start time is required'),
            value: yup.string().required('Start time is required'),
          })
          .required('Start time is required'),
    }),
    weekdayEndTime: yup.object().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays.includes('weekdays'),
      then: () =>
        yup
          .object()
          .shape({
            label: yup.string().required('End time is required'),
            value: yup.string().required('End time is required'),
          })
          .required('End time is required'),
    }),
    weekendStartTime: yup.object().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays.includes('weekend'),
      then: () =>
        yup
          .object()
          .shape({
            label: yup.string().required('Start time is required'),
            value: yup.string().required('Start time is required'),
          })
          .required('Start time is required'),
    }),
    weekendEndTime: yup.object().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays.includes('weekend'),
      then: () =>
        yup
          .object()
          .shape({
            label: yup.string().required('End time is required'),
            value: yup.string().required('End time is required'),
          })
          .required('End time is required'),
    }),
    currencyPreference: yup
      .object()
      .shape({
        label: yup.string().required('Currency preference is required'),
        value: yup.string().required('Currency preference is required'),
      })
      .required('Currency preference is required'),
  });

  const defaultLink = {
    linkName: '',
    link: '',
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      availabilityDays: [],
      weekdays: [],
      weekends: [],
      streetAddress: '',
      houseNumber: '',
      educationDetails: [{}],
      linkedInLink: '',
      twitterLink: '',
      githubLink: '',
      otherSocialLinks: [defaultLink],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'educationDetails',
  });

  const { fields: otherSocialLinksFields, append: otherSocialLinksAppend } = useFieldArray({
    control,
    name: 'otherSocialLinks',
  });

  const onSubmit = () => {};

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'German', label: 'German' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Japenese', label: 'Japenese' },
  ];

  const addressOptions = [
    { value: 'Address 1', label: 'Address 1' },
    { value: 'Address 2', label: 'Address 2' },
    { value: 'Address 3', label: 'Address 3' },
    { value: 'Address 4', label: 'Address 4' },
    { value: 'Address 5', label: 'Address 5' },
  ];

  const timeZoneOptions = [
    { value: 'IST', label: 'IST' },
    { value: 'PST', label: 'PST' },
    { value: 'ECT', label: 'ECT' },
    { value: 'CAT', label: 'CAT' },
    { value: 'AGT', label: 'AGT' },
  ];

  const isValidURL = (url) => {
    const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/;
    return urlPattern.test(url);
  };

  const checkObjectValues = (arr) => {
    // eslint-disable-next-line
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      // eslint-disable-next-line
      if (!obj.hasOwnProperty('link') || !obj.hasOwnProperty('linkName')) {
        return false;
      }
      if (!obj.link || !obj.linkName) {
        return false;
      }
      if (!isValidURL(obj.link)) {
        return false;
      }
    }
    return true;
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const isFileValid = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

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

  const handleAddEducation = () => {
    const isFilled = watch('educationDetails').every((item) => {
      const { educationInstitution, education } = item;
      return educationInstitution?.value && educationInstitution?.label && education?.value && education?.label;
    });

    if (isFilled) {
      append({});
    }
  };

  const availabilityDays = watch('availabilityDays');

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
                  Update Logo
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
                  Company Name<span className="label-asterisk me-50">*</span>
                </Label>
                <Controller
                  id="companyName"
                  name="companyName"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter your company name" invalid={errors.companyName && true} />
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
                  <Info size={18} color={theme.infoIcon} />
                </Label>
                <Controller
                  id="companyTagline"
                  name="companyTagline"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter your company tagline in 60 character."
                      invalid={errors.companyTagline && true}
                    />
                  )}
                />
                {errors.companyTagline && <FormFeedback>{errors.companyTagline.message}</FormFeedback>}
              </Col>
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="companyIndustry">
                  Company Industry<span className="label-asterisk me-50">*</span>
                  <Info size={18} color={theme.infoIcon} />
                </Label>
                <Controller
                  id="companyIndustry"
                  name="companyIndustry"
                  control={control}
                  invalid={errors.companyIndustry && true}
                  render={({ field }) => (
                    <Select
                      options={addressOptions}
                      classNamePrefix="select"
                      placeholder="Select your company industry"
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
                          checked={field.value === '1-100'}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const value = '1-100';

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
                          checked={field.value === '100-500'}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const value = '100-500';

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
                          checked={field.value === '500-1000'}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const value = '500-1000';

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
                          checked={field.value === '1000+'}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const value = '1000+';

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
                    <Input {...field} placeholder="Enter street address" invalid={errors.streetAddress && true} />
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
                        <Input {...field} placeholder="Enter house number" invalid={errors.houseNumber && true} />
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
                          min={0}
                          placeholder="Enter zip code"
                          invalid={errors.zipCode && true}
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
                    <Select
                      options={addressOptions}
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
                      options={addressOptions}
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
                      options={addressOptions}
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
        <Card>
          <CardHeader>
            <h4 className="m-0 mt-1">Education</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            {fields.map((item, index) => (
              <Row key={item.id} className="mt-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for={`educationDetails.${index}.educationInstitution`}>
                    Education Institution<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id={`educationDetails.${index}.educationInstitution`}
                    name={`educationDetails.${index}.educationInstitution`}
                    control={control}
                    invalid={
                      errors &&
                      errors.educationDetails &&
                      errors.educationDetails.length > 0 &&
                      errors.educationDetails[index] &&
                      errors.educationDetails[index].educationInstitution &&
                      true
                    }
                    render={({ field }) => (
                      <Select
                        options={addressOptions}
                        classNamePrefix="select"
                        placeholder="Enter your institution name"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid':
                            errors &&
                            errors.educationDetails &&
                            errors.educationDetails.length > 0 &&
                            errors.educationDetails[index] &&
                            errors.educationDetails[index].educationInstitution,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors &&
                    errors.educationDetails &&
                    errors.educationDetails.length > 0 &&
                    errors.educationDetails[index] && (
                      <FormFeedback>
                        {errors.educationDetails[index].educationInstitution &&
                          errors.educationDetails[index].educationInstitution.label.message}
                      </FormFeedback>
                    )}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for={`educationDetails.${index}.education`}>
                    Education<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id={`educationDetails.${index}.education`}
                    name={`educationDetails.${index}.education`}
                    control={control}
                    invalid={
                      errors &&
                      errors.educationDetails &&
                      errors.educationDetails.length > 0 &&
                      errors.educationDetails[index] &&
                      errors.educationDetails[index].education &&
                      true
                    }
                    render={({ field }) => (
                      <Select
                        options={addressOptions}
                        classNamePrefix="select"
                        placeholder="Enter your education"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid':
                            errors &&
                            errors.educationDetails &&
                            errors.educationDetails.length > 0 &&
                            errors.educationDetails[index] &&
                            errors.educationDetails[index].education,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors &&
                    errors.educationDetails &&
                    errors.educationDetails.length > 0 &&
                    errors.educationDetails[index] && (
                      <FormFeedback>
                        {errors.educationDetails[index].education &&
                          errors.educationDetails[index].education.label.message}
                      </FormFeedback>
                    )}
                </Col>
              </Row>
            ))}
            <Row className="mt-2 mb-3">
              <div className="d-flex align-items-center upload-button cursor-pointer" onClick={handleAddEducation}>
                <UploadIconContainer>
                  <Plus size={18} color={theme.activeNavPillText} />
                </UploadIconContainer>
                <h5 className="fw-bold">Add Education Institution</h5>
              </div>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h4 className="m-0 mt-1">Social links</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="linkedInLink">
                  Linkedin
                </Label>
                <Controller
                  id="linkedInLink"
                  name="linkedInLink"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter your public link" invalid={errors.linkedInLink && true} />
                  )}
                />
                {errors.linkedInLink && <FormFeedback>{errors.linkedInLink.message}</FormFeedback>}
              </Col>
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="twitterLink">
                  Twitter
                </Label>
                <Controller
                  id="twitterLink"
                  name="twitterLink"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter twitter link" invalid={errors.twitterLink && true} />
                  )}
                />
                {errors.twitterLink && <FormFeedback>{errors.twitterLink.message}</FormFeedback>}
              </Col>
            </Row>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="githubLink">
                  Github
                </Label>
                <Controller
                  id="githubLink"
                  name="githubLink"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter Github link" invalid={errors.githubLink && true} />
                  )}
                />
                {errors.githubLink && <FormFeedback>{errors.githubLink.message}</FormFeedback>}
              </Col>
            </Row>
            <hr className="m-0 card-header-border" />
            <h5 className="m-0 mt-2 mb-1">Other Social links</h5>
            {otherSocialLinksFields.map((item, index) => (
              <Row key={item.id} className="mb-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for={`otherSocialLinks[${index}].linkName`}>
                    Link Name
                  </Label>
                  <Controller
                    id={`otherSocialLinks[${index}].linkName`}
                    name={`otherSocialLinks[${index}].linkName`}
                    control={control}
                    invalid={
                      errors &&
                      errors.otherSocialLinks &&
                      errors.otherSocialLinks.length > 0 &&
                      errors.otherSocialLinks[index] &&
                      errors.otherSocialLinks[index].linkName &&
                      true
                    }
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter Link name"
                        invalid={
                          errors &&
                          errors.otherSocialLinks &&
                          errors.otherSocialLinks.length > 0 &&
                          errors.otherSocialLinks[index] &&
                          errors.otherSocialLinks[index].linkName &&
                          true
                        }
                      />
                    )}
                  />
                  {errors &&
                    errors.otherSocialLinks &&
                    errors.otherSocialLinks.length > 0 &&
                    errors.otherSocialLinks[index] &&
                    errors.otherSocialLinks[index] && (
                      <FormFeedback>
                        {errors.otherSocialLinks[index].linkName && errors.otherSocialLinks[index].linkName.message}
                      </FormFeedback>
                    )}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for={`otherSocialLinks[${index}].link`}>
                    Link
                  </Label>
                  <Controller
                    id={`otherSocialLinks[${index}].link`}
                    name={`otherSocialLinks[${index}].link`}
                    control={control}
                    invalid={
                      errors &&
                      errors.otherSocialLinks &&
                      errors.otherSocialLinks.length > 0 &&
                      errors.otherSocialLinks[index] &&
                      errors.otherSocialLinks[index].link &&
                      true
                    }
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter Link"
                        invalid={
                          errors &&
                          errors.otherSocialLinks &&
                          errors.otherSocialLinks.length > 0 &&
                          errors.otherSocialLinks[index] &&
                          errors.otherSocialLinks[index].link &&
                          true
                        }
                      />
                    )}
                  />
                  {errors &&
                    errors.otherSocialLinks &&
                    errors.otherSocialLinks.length > 0 &&
                    errors.otherSocialLinks[index] &&
                    errors.otherSocialLinks[index] && (
                      <FormFeedback>
                        {errors.otherSocialLinks[index].link && errors.otherSocialLinks[index].link.message}
                      </FormFeedback>
                    )}
                </Col>
              </Row>
            ))}
            <Row className="mt-2 mb-1">
              <div
                className="d-flex align-items-center upload-button cursor-pointer"
                onClick={() => {
                  if (checkObjectValues(watch('otherSocialLinks'))) {
                    otherSocialLinksAppend(defaultLink);
                  }
                }}
              >
                <UploadIconContainer>
                  <Plus size={18} color={theme.activeNavPillText} />
                </UploadIconContainer>
                <h5 className="fw-bold">Add Social Link</h5>
              </div>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h4 className="m-0 mt-1">
              Project area of interest<span className="label-asterisk m-0">*</span>
            </h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="area">
                  Area
                </Label>
                <Controller
                  id="area"
                  name="area"
                  control={control}
                  invalid={errors.area && true}
                  render={({ field }) => (
                    <Select
                      isMulti
                      options={languageOptions}
                      classNamePrefix="select"
                      placeholder="Select area"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.area,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.area && <FormFeedback>{errors.area.message}</FormFeedback>}
              </Col>
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="skills">
                  Skills<span className="label-asterisk">*</span> <i>(Top 5)</i>
                </Label>
                <Controller
                  id="skills"
                  name="skills"
                  control={control}
                  invalid={errors.skills && true}
                  render={({ field }) => (
                    <Select
                      isMulti
                      options={languageOptions}
                      classNamePrefix="select"
                      placeholder="Select top 5 skills"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.skills,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.skills && <FormFeedback>{errors.skills.message}</FormFeedback>}
              </Col>
            </Row>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="tools">
                  Tools <i>(Top 5)</i>
                </Label>
                <Controller
                  id="tools"
                  name="tools"
                  control={control}
                  invalid={errors.tools && true}
                  render={({ field }) => (
                    <Select
                      isMulti
                      options={languageOptions}
                      classNamePrefix="select"
                      placeholder="Select top 5 tools"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.tools,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.tools && <FormFeedback>{errors.tools.message}</FormFeedback>}
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h4 className="m-0 mt-1">Availability</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="preferredWorkingTimeZone">
                  Preferred working time zone<span className="label-asterisk me-50">*</span>
                </Label>
                <Controller
                  id="preferredWorkingTimeZone"
                  name="preferredWorkingTimeZone"
                  control={control}
                  invalid={errors.preferredWorkingTimeZone && true}
                  render={({ field }) => (
                    <Select
                      options={timeZoneOptions}
                      classNamePrefix="select"
                      placeholder="Select preferred working time zone"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.preferredWorkingTimeZone,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.preferredWorkingTimeZone && (
                  <FormFeedback>{errors.preferredWorkingTimeZone.label.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row className="mt-2">
              <h5 className="m-0">
                Select your work availability days<span className="label-asterisk me-50">*</span>
              </h5>
            </Row>
            <Row className="custom-checkbox-border">
              <Controller
                control={control}
                name="availabilityDays"
                render={({ field }) => (
                  <div className="demo-inline-spacing">
                    <div className="form-check form-check-inline checkbox-custom-margin">
                      <Input
                        type="checkbox"
                        {...field}
                        id="weekdays"
                        checked={field.value.includes('weekdays')}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          const value = 'weekdays';

                          if (isChecked) {
                            field.onChange([...field.value, value]);
                          } else {
                            field.onChange(field.value.filter((v) => v !== value));
                          }
                        }}
                      />
                      <Label for="weekdays" className="form-check-label">
                        Weekdays
                      </Label>
                    </div>
                    <div className="form-check form-check-inline checkbox-custom-margin">
                      <Input
                        type="checkbox"
                        {...field}
                        id="weekend"
                        checked={field.value.includes('weekend')}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          const value = 'weekend';

                          if (isChecked) {
                            field.onChange([...field.value, value]);
                          } else {
                            field.onChange(field.value.filter((v) => v !== value));
                          }
                        }}
                      />
                      <Label htmlFor="weekend" className="form-check-label">
                        Weekend
                      </Label>
                    </div>
                  </div>
                )}
              />
              {errors.availabilityDays && <FormFeedback>{errors.availabilityDays.message}</FormFeedback>}
            </Row>
            <Row>
              {availabilityDays && (availabilityDays.includes('weekdays') || availabilityDays.includes('weekend')) && (
                <>
                  {availabilityDays.includes('weekdays') && (
                    <div>
                      <Row className="mb-1 mt-2">
                        <div className="d-flex align-items-center">
                          <h5 className="m-0">
                            Weekday -<span className="fw-light"> Working time available</span>
                          </h5>
                          <p className="m-0 mx-1 px-50 time-zone-border">
                            {watch('preferredWorkingTimeZone') && watch('preferredWorkingTimeZone').label}
                          </p>
                          <Info size={18} color={theme.infoIcon} id="time-zone-info-weekday" />
                          <UncontrolledTooltip placement="right" target="time-zone-info-weekday">
                            <div className="d-flex flex-column align-items-start">
                              <p className="m-0">
                                Based on Preferred
                                <br /> working time zone
                              </p>
                            </div>
                          </UncontrolledTooltip>
                        </div>
                      </Row>
                      <Row className="mb-1 mt-2">
                        <Col sm="6" md="6" lg="3">
                          <Label className="form-label" for="weekdayStartTime">
                            Select start time<span className="label-asterisk me-50">*</span>
                          </Label>
                          <Controller
                            id="weekdayStartTime"
                            name="weekdayStartTime"
                            control={control}
                            invalid={errors.weekdayStartTime && true}
                            render={({ field }) => (
                              <Select
                                options={addressOptions}
                                classNamePrefix="select"
                                placeholder="Select start time"
                                theme={selectThemeColors}
                                className={classNames('react-select', {
                                  'is-invalid': errors && errors.weekdayStartTime,
                                })}
                                {...field}
                              />
                            )}
                          />
                          {errors.weekdayStartTime && (
                            <FormFeedback>{errors.weekdayStartTime.label.message}</FormFeedback>
                          )}
                        </Col>
                        <Col sm="6" md="6" lg="3">
                          <Label className="form-label" for="weekdayEndTime">
                            Select end time<span className="label-asterisk me-50">*</span>
                          </Label>
                          <Controller
                            id="weekdayEndTime"
                            name="weekdayEndTime"
                            control={control}
                            invalid={errors.weekdayEndTime && true}
                            render={({ field }) => (
                              <Select
                                options={addressOptions}
                                classNamePrefix="select"
                                placeholder="Select end time"
                                theme={selectThemeColors}
                                className={classNames('react-select', {
                                  'is-invalid': errors && errors.weekdayEndTime,
                                })}
                                {...field}
                              />
                            )}
                          />
                          {errors.weekdayEndTime && <FormFeedback>{errors.weekdayEndTime.label.message}</FormFeedback>}
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <h5 className="m-0">
                          Which working days of the week are you available?
                          <span className="label-asterisk me-50">*</span>
                        </h5>
                      </Row>
                      <div className="custom-checkbox-border">
                        <Controller
                          control={control}
                          name="weekdays"
                          render={({ field }) => (
                            <div className="demo-inline-spacing">
                              <div className="form-check form-check-inline checkbox-custom-margin">
                                <Input
                                  type="checkbox"
                                  {...field}
                                  id="Mon"
                                  checked={field.value.includes('Mon')}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = 'Mon';

                                    if (isChecked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(field.value.filter((v) => v !== value));
                                    }
                                  }}
                                />
                                <Label for="Mon" className="form-check-label">
                                  Mon
                                </Label>
                              </div>
                              <div className="form-check form-check-inline checkbox-custom-margin">
                                <Input
                                  type="checkbox"
                                  {...field}
                                  id="Tue"
                                  checked={field.value.includes('Tue')}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = 'Tue';

                                    if (isChecked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(field.value.filter((v) => v !== value));
                                    }
                                  }}
                                />
                                <Label for="Tue" className="form-check-label">
                                  Tue
                                </Label>
                              </div>
                              <div className="form-check form-check-inline checkbox-custom-margin">
                                <Input
                                  type="checkbox"
                                  {...field}
                                  id="Wed"
                                  checked={field.value.includes('Wed')}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = 'Wed';

                                    if (isChecked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(field.value.filter((v) => v !== value));
                                    }
                                  }}
                                />
                                <Label for="Wed" className="form-check-label">
                                  Wed
                                </Label>
                              </div>
                              <div className="form-check form-check-inline checkbox-custom-margin">
                                <Input
                                  type="checkbox"
                                  {...field}
                                  id="Thu"
                                  checked={field.value.includes('Thu')}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = 'Thu';

                                    if (isChecked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(field.value.filter((v) => v !== value));
                                    }
                                  }}
                                />
                                <Label for="Thu" className="form-check-label">
                                  Thu
                                </Label>
                              </div>
                              <div className="form-check form-check-inline checkbox-custom-margin">
                                <Input
                                  type="checkbox"
                                  {...field}
                                  id="Fri"
                                  checked={field.value.includes('Fri')}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = 'Fri';

                                    if (isChecked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(field.value.filter((v) => v !== value));
                                    }
                                  }}
                                />
                                <Label for="Fri" className="form-check-label">
                                  Fri
                                </Label>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                      {errors.weekdays && <FormFeedback>{errors.weekdays.message}</FormFeedback>}
                    </div>
                  )}

                  {availabilityDays.includes('weekend') && (
                    <div>
                      <Row className="mb-1 mt-2">
                        <div className="d-flex align-items-center">
                          <h5 className="m-0">
                            Weekend -<span className="fw-light"> Working time available</span>
                          </h5>
                          <p className="m-0 mx-1 px-50 time-zone-border">
                            {watch('preferredWorkingTimeZone') && watch('preferredWorkingTimeZone').label}
                          </p>
                          <Info size={18} color={theme.infoIcon} id="time-zone-info-weekend" />
                          <UncontrolledTooltip placement="right" target="time-zone-info-weekend">
                            <div className="d-flex flex-column align-items-start">
                              <p className="m-0">
                                Based on Preferred
                                <br /> working time zone
                              </p>
                            </div>
                          </UncontrolledTooltip>
                        </div>
                      </Row>
                      <Row className="mb-1 mt-2">
                        <Col sm="6" md="6" lg="3">
                          <Label className="form-label" for="weekendStartTime">
                            Select start time<span className="label-asterisk me-50">*</span>
                          </Label>
                          <Controller
                            id="weekendStartTime"
                            name="weekendStartTime"
                            control={control}
                            invalid={errors.weekendStartTime && true}
                            render={({ field }) => (
                              <Select
                                options={addressOptions}
                                classNamePrefix="select"
                                placeholder="Select start time"
                                theme={selectThemeColors}
                                className={classNames('react-select', {
                                  'is-invalid': errors && errors.weekendStartTime,
                                })}
                                {...field}
                              />
                            )}
                          />
                          {errors.weekendStartTime && (
                            <FormFeedback>{errors.weekendStartTime.label.message}</FormFeedback>
                          )}
                        </Col>
                        <Col sm="6" md="6" lg="3">
                          <Label className="form-label" for="weekendEndTime">
                            Select end time<span className="label-asterisk me-50">*</span>
                          </Label>
                          <Controller
                            id="weekendEndTime"
                            name="weekendEndTime"
                            control={control}
                            invalid={errors.weekendEndTime && true}
                            render={({ field }) => (
                              <Select
                                options={addressOptions}
                                classNamePrefix="select"
                                placeholder="Select end time"
                                theme={selectThemeColors}
                                className={classNames('react-select', {
                                  'is-invalid': errors && errors.weekendEndTime,
                                })}
                                {...field}
                              />
                            )}
                          />
                          {errors.weekendEndTime && <FormFeedback>{errors.weekendEndTime.label.message}</FormFeedback>}
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <h5 className="m-0">
                          Which working days of the weekend are you available?
                          <span className="label-asterisk me-50">*</span>
                        </h5>
                      </Row>
                      <div className="custom-checkbox-border">
                        <Controller
                          control={control}
                          name="weekends"
                          render={({ field }) => (
                            <div className="demo-inline-spacing">
                              <div className="form-check form-check-inline checkbox-custom-margin">
                                <Input
                                  type="checkbox"
                                  {...field}
                                  id="Sat"
                                  checked={field.value.includes('Sat')}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = 'Sat';

                                    if (isChecked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(field.value.filter((v) => v !== value));
                                    }
                                  }}
                                />
                                <Label for="Sat" className="form-check-label">
                                  Sat
                                </Label>
                              </div>
                              <div className="form-check form-check-inline checkbox-custom-margin">
                                <Input
                                  type="checkbox"
                                  {...field}
                                  id="Sun"
                                  checked={field.value.includes('Sun')}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = 'Sun';

                                    if (isChecked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(field.value.filter((v) => v !== value));
                                    }
                                  }}
                                />
                                <Label for="Sun" className="form-check-label">
                                  Sun
                                </Label>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                      {errors.weekends && <FormFeedback>{errors.weekends.message}</FormFeedback>}
                    </div>
                  )}
                </>
              )}
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h4 className="m-0 mt-1">Payments</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            <Row className="mb-1">
              <Col sm="12" md="6" lg="3">
                <Label className="form-label" for="currencyPreference">
                  Currency Preference<span className="label-asterisk me-50">*</span>
                </Label>
                <Controller
                  id="currencyPreference"
                  name="currencyPreference"
                  control={control}
                  invalid={errors.currencyPreference && true}
                  render={({ field }) => (
                    <Select
                      options={addressOptions}
                      classNamePrefix="select"
                      placeholder="Select currency"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.currencyPreference,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.currencyPreference && <FormFeedback>{errors.currencyPreference.label.message}</FormFeedback>}
              </Col>
            </Row>
          </CardBody>
        </Card>
        <div className="d-flex justify-content-between align-items-center pb-2 mt-1 buttons-row-border">
          <div
            className="d-flex align-items-center upload-button cursor-pointer"
            onClick={() => toggleTab(tabNames.Account)}
          >
            <UploadIconContainer>
              <ChevronLeft size={18} color={theme.activeNavPillText} />
            </UploadIconContainer>
            <h5 className="fw-bold">Back</h5>
          </div>
          <Button color="primary" type="submit" disabled={!isValid || isSubmitting}>
            <span className="me-50">Save Changes</span>
          </Button>
        </div>
        <div className="d-flex justify-content-end mt-2">
          <Button color="primary" disabled={!isSubmitSuccessful} onClick={() => toggleTab(tabNames.Payment)}>
            <span className="me-50">Next</span>
            <ChevronRight size={14} />
          </Button>
        </div>
      </Form>
    </ProfileFormContainer>
  );
};

export default Profile;

Profile.propTypes = {
  tabNames: Proptypes.object,
  toggleTab: Proptypes.func,
};

Profile.defaultProps = {
  tabNames: {},
  toggleTab: () => {},
};
