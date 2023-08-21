/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useLocation, useNavigate } from 'react-router-dom';
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
  InputGroup,
  InputGroupText,
  Label,
  Row,
  Spinner,
} from 'reactstrap';
import { ChevronLeft, ChevronRight, Upload } from 'react-feather';
import classNames from 'classnames';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeColors } from '@utils';
import { ProfileFormContainer, UploadIconContainer } from '../style';
import theme from '../../../configs/themeVariables';
import { getStates, getCities } from '../../../redux/actions/staticActions';
import { states, statesLoading, cities, citiesLoading } from '../../../redux/selectors/staticSelectors';
import { getUserDetails, saveProfileDetails } from '../../../redux/actions/talentOnboardingActions';
import { profileDetailsLoading, userDetails } from '../../../redux/selectors/talentOnboardingSelectors';
import { countriesService, languagesService, talentRolesService } from '../../../services/staticServices';
import { removeEmptyKeys, returnFilteredDropdownOptions } from '../../../utility/Utils';
import { userOnboarding } from '../../../utility/constants/Constant';

const Personal = () => {
  const PersonalSchema = yup.object().shape({
    tagline: yup.string().max(60, 'Tagline must be 60 characters or less').required('Tagline is required'),
    workExperienceYear: yup
      .number()
      .min(0, 'Year cannot be negative')
      .integer('Year must be a number')
      .typeError('Year must be a number')
      .transform((value) => (Number.isNaN(value) ? undefined : value)),
    workExperienceMonth: yup
      .number()
      .min(0, 'Month cannot be negative')
      .max(11, 'Month must be 11 or less')
      .integer('Month must be a number')
      .typeError('Month must be a number')
      .transform((value) => (Number.isNaN(value) ? undefined : value)),
    professionalIntroduction: yup
      .string()
      .max(150, 'Professional introduction must be 150 characters or less')
      .required('Professional introduction is required'),
    role: yup
      .object()
      .shape({
        label: yup.string().required('Role is required'),
        value: yup.string().required('Role is required'),
      })
      .required('Role is required'),
    speakLanguages: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'Maximum of five languages can be added'),
    readLanguages: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'Maximum of five languages can be added'),
    writeLanguages: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'Maximum of five languages can be added'),
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
      tagline: '',
      professionalIntroduction: '',
      streetAddress: '',
      houseNumber: '',
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [talentRolesOptions, setTalentRolesOptions] = useState(null);
  const [languagesOptions, setLanguagesOptions] = useState(null);
  const [countriesOptions, setCountriesOptions] = useState(null);
  const [statesOptions, setStatesOptions] = useState(null);
  const [citiesOptions, setCitiesOptions] = useState(null);

  const statesData = useSelector(states);
  const statesIsLoading = useSelector(statesLoading);
  const citiesData = useSelector(cities);
  const citiesIsLoading = useSelector(citiesLoading);
  const profileDetailsIsLoading = useSelector(profileDetailsLoading);
  const userDetailsData = useSelector(userDetails);

  useEffect(() => {
    if (watch('country')?.value !== userDetailsData?.talent_info?.current_residency?.country?._id) {
      setValue('state', null);
      setValue('city', null);
    }

    if (watch('country')) {
      dispatch(getStates(watch('country').value));
    }
  }, [watch('country')]);

  useEffect(() => {
    if (watch('state')?.value !== userDetailsData?.talent_info?.current_residency?.state?._id) {
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

  const onBackClick = () => {
    if (location?.state?.isEditing) {
      navigate(`/${userOnboarding.talent}/account-details`, {
        state: { isEditing: true },
      });
    } else {
      navigate(`/${userOnboarding.talent}/account-details`);
    }
  };

  const onSkipClick = () => {
    if (location?.state?.isEditing) {
      navigate(`/${userOnboarding.talent}/educational-details`, {
        state: { isEditing: true },
      });
    } else {
      navigate(`/${userOnboarding.talent}/educational-details`);
    }
  };

  const onSuccess = () => {
    if (location?.state?.isEditing) {
      navigate(`/${userOnboarding.talent}/educational-details`, {
        state: { isEditing: true },
      });
    } else {
      navigate(`/${userOnboarding.talent}/educational-details`);
    }
  };

  const onSubmit = (data) => {
    const {
      tagline,
      workExperienceYear,
      workExperienceMonth,
      professionalIntroduction,
      role,
      speakLanguages,
      readLanguages,
      writeLanguages,
      streetAddress,
      houseNumber,
      zipCode,
      country,
      state,
      city,
    } = data;

    const years = workExperienceYear || 0;
    const months = workExperienceMonth || 0;

    const work_experience = years * 12 + months;
    const professional_intro = professionalIntroduction;
    const languages_speak = speakLanguages?.map((language) => language.value);
    const languages_read = readLanguages?.map((language) => language.value);
    const languages_write = writeLanguages?.map((language) => language.value);
    const current_residency = {
      country: country.value,
      state: state.value,
      city: city.value,
      street_address: streetAddress,
      house_number: houseNumber,
      zip_code: zipCode,
    };

    let reqData;

    if (workExperienceYear || workExperienceMonth) {
      reqData = {
        tagline,
        work_experience,
        professional_intro,
        role: role.value,
        languages_speak,
        languages_read,
        languages_write,
        current_residency,
      };
    } else {
      reqData = {
        tagline,
        professional_intro,
        role: role.value,
        languages_speak,
        languages_read,
        languages_write,
        current_residency,
      };
    }

    dispatch(saveProfileDetails(removeEmptyKeys(reqData), onSuccess));
  };

  const loadTalentRolesOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, talentRolesOptions),
      };
    }
    try {
      const response = await talentRolesService();

      const options = response?.data?.map((role) => ({ label: role.name, value: role._id }));

      setTalentRolesOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  const loadLanguagesOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, languagesOptions),
      };
    }
    try {
      const response = await languagesService();

      const options = response?.data?.data?.map((language) => ({ label: language.name, value: language._id }));

      setLanguagesOptions(options);

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
      if (res?.talent_info?.tagline.length > 0) {
        setValue('tagline', res?.talent_info?.tagline, { shouldValidate: true });
      }
      if (res?.talent_info?.work_experience > 0) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const years = Math.floor(res?.talent_info?.work_experience / 12);
        const months = res?.talent_info?.work_experience % 12;

        setValue('workExperienceYear', years, { shouldValidate: true });
        setValue('workExperienceMonth', months, { shouldValidate: true });
      }
      if (res?.talent_info?.professional_intro.length > 0) {
        setValue('professionalIntroduction', res?.talent_info?.professional_intro, { shouldValidate: true });
      }
      if ('name' in res?.talent_info?.role) {
        setValue(
          'role',
          { label: res?.talent_info?.role?.name, value: res?.talent_info?.role?._id },
          { shouldValidate: true },
        );
      }
      if (res?.talent_info?.languages_speak.length > 0) {
        setValue(
          'speakLanguages',
          res?.talent_info?.languages_speak.map((language) => ({
            label: language.name,
            value: language._id,
          })),
          { shouldValidate: true },
        );
      }
      if (res?.talent_info?.languages_read.length > 0) {
        setValue(
          'readLanguages',
          res?.talent_info?.languages_read.map((language) => ({
            label: language.name,
            value: language._id,
          })),
          { shouldValidate: true },
        );
      }
      if (res?.talent_info?.languages_write.length > 0) {
        setValue(
          'writeLanguages',
          res?.talent_info?.languages_write.map((language) => ({
            label: language.name,
            value: language._id,
          })),
          { shouldValidate: true },
        );
      }
      if (
        'streetAddress' in res?.talent_info?.current_residency ||
        'houseNumber' in res?.talent_info?.current_residency ||
        'zipCode' in res?.talent_info?.current_residency ||
        'country' in res?.talent_info?.current_residency ||
        'state' in res?.talent_info?.current_residency ||
        'city' in res?.talent_info?.current_residency
      ) {
        if (res?.talent_info?.current_residency?.street_address.length > 0) {
          setValue('streetAddress', res?.talent_info?.current_residency?.street_address, { shouldValidate: true });
        }
        if (res?.talent_info?.current_residency?.house_number.length > 0) {
          setValue('houseNumber', res?.talent_info?.current_residency?.house_number, { shouldValidate: true });
        }
        if (res?.talent_info?.current_residency?.zip_code > 0) {
          setValue('zipCode', res?.talent_info?.current_residency?.zip_code, { shouldValidate: true });
        }
        if ('country' in res?.talent_info?.current_residency) {
          setValue(
            'country',
            {
              label: res?.talent_info?.current_residency.country.name,
              value: res?.talent_info?.current_residency.country._id,
            },
            { shouldValidate: true },
          );
        }
        if ('state' in res?.talent_info?.current_residency) {
          setValue(
            'state',
            {
              label: res?.talent_info?.current_residency.state.name,
              value: res?.talent_info?.current_residency.state._id,
            },
            { shouldValidate: true },
          );
        }
        if ('city' in res?.talent_info?.current_residency) {
          setValue(
            'city',
            {
              label: res?.talent_info?.current_residency.city.name,
              value: res?.talent_info?.current_residency.city._id,
            },
            { shouldValidate: true },
          );
        }
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
            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="tagline">
                  Tagline<span className="label-asterisk me-50">*</span>
                </Label>
                <Controller
                  id="tagline"
                  name="tagline"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter your tagline in 60 characters or less"
                      invalid={errors.tagline && true}
                    />
                  )}
                />
                {errors.tagline && <FormFeedback>{errors.tagline.message}</FormFeedback>}
              </Col>
              <Col sm="12" md="12" lg="6">
                <Row>
                  <Col sm="12" md="6" lg="6">
                    <Label className="form-label" for="workExperienceYear">
                      Work Experience - Years
                    </Label>
                    <Controller
                      id="workExperienceYear"
                      name="workExperienceYear"
                      control={control}
                      render={({ field }) => (
                        <InputGroup className="input-group-merge">
                          <Input
                            {...field}
                            type="number"
                            min={0}
                            onWheel={(e) => e.target.blur()}
                            placeholder="Enter"
                            invalid={errors.workExperienceYear && true}
                          />
                          <InputGroupText>Year(s)</InputGroupText>
                        </InputGroup>
                      )}
                    />
                    {errors.workExperienceYear && <FormFeedback>{errors.workExperienceYear.message}</FormFeedback>}
                  </Col>
                  <Col sm="12" md="6" lg="6">
                    <Label className="form-label" for="workExperienceMonth">
                      Months
                    </Label>
                    <Controller
                      id="workExperienceMonth"
                      name="workExperienceMonth"
                      control={control}
                      render={({ field }) => (
                        <InputGroup className="input-group-merge">
                          <Input
                            {...field}
                            type="number"
                            min={0}
                            onWheel={(e) => e.target.blur()}
                            placeholder="Enter"
                            invalid={errors.workExperienceMonth && true}
                          />
                          <InputGroupText>Month(s)</InputGroupText>
                        </InputGroup>
                      )}
                    />
                    {errors.workExperienceMonth && <FormFeedback>{errors.workExperienceMonth.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="professionalIntroduction">
                  Professional Introduction<span className="label-asterisk me-50">*</span>
                </Label>
                <Controller
                  id="professionalIntroduction"
                  name="professionalIntroduction"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="textarea"
                      placeholder="Describe in 150 characters"
                      rows="5"
                      invalid={errors.professionalIntroduction && true}
                    />
                  )}
                />
                {errors.professionalIntroduction && (
                  <FormFeedback>{errors.professionalIntroduction.message}</FormFeedback>
                )}
              </Col>
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="role">
                  Role<span className="label-asterisk">*</span>
                </Label>
                <Controller
                  id="role"
                  name="role"
                  control={control}
                  invalid={errors.role && true}
                  render={({ field }) => (
                    <AsyncPaginate
                      loadOptions={loadTalentRolesOptions}
                      classNamePrefix="select"
                      placeholder="Select your role"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.role,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.role && <FormFeedback>{errors.role.label.message}</FormFeedback>}
              </Col>
            </Row>
            <Row className="mt-3 mb-3">
              <div className="d-flex align-items-center upload-button cursor-pointer">
                <UploadIconContainer>
                  <Upload size={18} color={theme.activeNavPillText} />
                </UploadIconContainer>
                <h5 className="fw-bold">Upload your resume</h5>
              </div>
            </Row>
            <Row className="mb-1">
              <h5 className="m-0">Languages</h5>
            </Row>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="speakLanguages">
                  I can speak well (Top 5)
                </Label>
                <Controller
                  id="speakLanguages"
                  name="speakLanguages"
                  control={control}
                  invalid={errors.speakLanguages && true}
                  render={({ field }) => (
                    <AsyncPaginate
                      isMulti
                      loadOptions={loadLanguagesOptions}
                      classNamePrefix="select"
                      placeholder="Select top 5 language you can speak"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.speakLanguages,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.speakLanguages && <FormFeedback>{errors.speakLanguages.message}</FormFeedback>}
              </Col>
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="readLanguages">
                  I can read well (Top 5)
                </Label>
                <Controller
                  id="readLanguages"
                  name="readLanguages"
                  control={control}
                  invalid={errors.readLanguages && true}
                  render={({ field }) => (
                    <AsyncPaginate
                      isMulti
                      loadOptions={loadLanguagesOptions}
                      classNamePrefix="select"
                      placeholder="Select top 5 language you can read"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.readLanguages,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.readLanguages && <FormFeedback>{errors.readLanguages.message}</FormFeedback>}
              </Col>
            </Row>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="writeLanguages">
                  I can write well (Top 5)
                </Label>
                <Controller
                  id="writeLanguages"
                  name="writeLanguages"
                  control={control}
                  invalid={errors.writeLanguages && true}
                  render={({ field }) => (
                    <AsyncPaginate
                      isMulti
                      loadOptions={loadLanguagesOptions}
                      classNamePrefix="select"
                      placeholder="Select top 5 language you can write"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.writeLanguages,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.writeLanguages && <FormFeedback>{errors.writeLanguages.message}</FormFeedback>}
              </Col>
            </Row>
            <Row className="mb-1 mt-3">
              <h5 className="m-0">
                Current Address<span className="label-asterisk">*</span>
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
                  value={watch('state')}
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
                  value={watch('city')}
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
            <Button color="primary" type="submit" disabled={!isValid || profileDetailsIsLoading}>
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
    </ProfileFormContainer>
  );
};

export default Personal;
