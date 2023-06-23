import React, { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useNavigate } from 'react-router-dom';
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
  InputGroup,
  InputGroupText,
  Label,
  Row,
  Spinner,
  UncontrolledTooltip,
} from 'reactstrap';
import { ChevronLeft, ChevronRight, Info, Plus, Upload } from 'react-feather';
import classNames from 'classnames';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeColors } from '@utils';
import { ProfileFormContainer, UploadIconContainer } from '../style';
import theme from '../../../configs/themeVariables';
import timeOptions from '../../../utility/constants/TimeDropdownOptions';
import { getStates, getCities } from '../../../redux/actions/staticActions';
import { states, statesLoading, cities, citiesLoading } from '../../../redux/selectors/staticSelectors';
import { saveProfileDetails } from '../../../redux/actions/talentOnboardingActions';
import { profileDetailsLoading } from '../../../redux/selectors/talentOnboardingSelectors';
import AccountCreatedModal from '../AccountCreatedModal';
import {
  certificatesService,
  countriesService,
  currenciesService,
  educationsService,
  languagesService,
  paginatedInstitutesService,
  skillsService,
  talentRolesService,
  timezonesService,
  toolsService,
} from '../../../services/staticServices';

const Profile = () => {
  const ProfileSchema = yup.object().shape({
    tagline: yup.string().max(60, 'Tagline must be at most 60 characters').required('Tagline is required'),
    workExperienceYear: yup.number().min(0).integer('Year must be an integer').typeError('Year must be a number'),
    workExperienceMonth: yup.number().min(0).integer('Month must be an integer').typeError('Month must be a number'),
    professionalIntroduction: yup
      .string()
      .max(150, 'Professional introduction must be at most 150 characters')
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
      .max(5, 'At most five languages can be added'),
    readLanguages: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'At most five languages can be added'),
    writeLanguages: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'At most five languages can be added'),
    streetAddress: yup.string(),
    houseNumber: yup.string(),
    zipCode: yup.number().typeError('Zip code must be a number'),
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
    tools: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'At most five tools can be added'),
    certificates: yup.array().of(
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
    preferredWorkingTimeZone: yup
      .object()
      .shape({
        label: yup.string().required('Preferred working time zone is required'),
        value: yup.object().required('Preferred working time zone is required'),
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
    hourlyRate: yup.number().typeError('Hourly rate must be a number').required('Hourly rate is required'),
    linkedInLink: yup.string().url('Please enter a valid url'),
    twitterLink: yup.string().url('Please enter a valid url'),
    githubLink: yup.string().url('Please enter a valid url'),
    otherSocialLinks: yup.array().of(
      yup.object().shape({
        linkName: yup.string().nullable(),
        link: yup.string().url('Please enter a valid url').nullable(),
      }),
    ),
  });

  const defaultLink = {
    linkName: '',
    link: '',
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      tagline: '',
      professionalIntroduction: '',
      streetAddress: '',
      houseNumber: '',
      educationDetails: [{}],
      availabilityDays: [],
      weekdays: [],
      weekends: [],
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

  const isEmpty = (value) => {
    if (value === undefined || value === null) {
      return true;
    }

    if (typeof value === 'string' || Array.isArray(value)) {
      return value.length === 0;
    }

    if (typeof value === 'object') {
      return Object.keys(value).length === 0;
    }

    return false;
  };

  const hasEmptyKeys = (obj) => Object.values(obj).some((value) => isEmpty(value));

  const removeEmptyKeys = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      const filteredArray = obj.filter((item) => typeof item !== 'object' || !hasEmptyKeys(item));

      return filteredArray.map((item) => removeEmptyKeys(item));
    }

    const filteredObj = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (typeof value === 'object') {
        const cleanedValue = removeEmptyKeys(value);
        if (!isEmpty(cleanedValue)) {
          filteredObj[key] = cleanedValue;
        }
      } else if (!isEmpty(value)) {
        filteredObj[key] = value;
      }
    });

    if (isEmpty(filteredObj)) {
      return undefined;
    }

    return filteredObj;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountCreatedModal, setAccountCreatedModal] = useState(null);

  const toggleAccountCreatedModal = () => setAccountCreatedModal(!accountCreatedModal);

  const onSuccess = () => {
    setAccountCreatedModal(true);
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
      educationDetails,
      skills,
      tools,
      certificates,
      preferredWorkingTimeZone,
      weekdayStartTime,
      weekdayEndTime,
      weekdays,
      weekendStartTime,
      weekendEndTime,
      weekends,
      currencyPreference,
      hourlyRate,
      linkedInLink,
      twitterLink,
      githubLink,
      otherSocialLinks,
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
    const educational_institute = educationDetails.map((educationDetail) => ({
      institution: educationDetail.educationInstitution.value,
      education: educationDetail.education.value,
    }));
    const expertise = {
      skills: skills.map((skill) => skill.value),
      tools: tools?.map((tool) => tool.value),
      certificates: certificates?.map((certificate) => certificate.value),
    };
    const availability = {
      timezone: preferredWorkingTimeZone.value._id,
      weekdays_avl: {
        start_time: weekdayStartTime?.value,
        end_time: weekdayEndTime?.value,
        days: weekdays,
      },
      weekends_avl: {
        start_time: weekendStartTime?.value,
        end_time: weekendEndTime?.value,
        days: weekends,
      },
    };
    const currency_preference = currencyPreference.value;
    const hourly_rate = parseInt(hourlyRate, 10);
    const social_links = [
      {
        platform: 'linkedIn',
        url: linkedInLink,
      },
      {
        platform: 'twitter',
        url: twitterLink,
      },
      {
        platform: 'github',
        url: githubLink,
      },
      // eslint-disable-next-line
      ...otherSocialLinks?.map((link) => ({
        platform: link.linkName,
        url: link.link,
      })),
    ];

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
        educational_institute,
        expertise,
        availability,
        currency_preference,
        hourly_rate,
        social_links,
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
        educational_institute,
        expertise,
        availability,
        currency_preference,
        hourly_rate,
        social_links,
      };
    }

    dispatch(saveProfileDetails(removeEmptyKeys(reqData), onSuccess));
  };

  const [talentRolesOptions, setTalentRolesOptions] = useState(null);
  const [languagesOptions, setLanguagesOptions] = useState(null);
  const [countriesOptions, setCountriesOptions] = useState(null);
  const [statesOptions, setStatesOptions] = useState(null);
  const [citiesOptions, setCitiesOptions] = useState(null);
  const [educationsOptions, setEducationsOptions] = useState(null);
  const [toolsOptions, setToolsOptions] = useState(null);
  const [skillsOptions, setSkillsOptions] = useState(null);
  const [certificatesOptions, setCertificatesOptions] = useState(null);
  const [timezonesOptions, setTimezonesOptions] = useState(null);
  const [currenciesOptions, setCurrenciesOptions] = useState(null);

  useEffect(() => {
    setValue('state', null);
    setValue('city', null);

    if (watch('country')) {
      dispatch(getStates(watch('country').value));
    }
  }, [watch('country')]);

  useEffect(() => {
    setValue('city', null);

    if (watch('state')) {
      dispatch(getCities(watch('state').value));
    }
  }, [watch('state')]);

  const statesData = useSelector(states);
  const statesIsLoading = useSelector(statesLoading);
  const citiesData = useSelector(cities);
  const citiesIsLoading = useSelector(citiesLoading);

  const profileDetailsIsLoading = useSelector(profileDetailsLoading);

  useEffect(() => {
    const requiredData = statesData?.map((state) => ({ label: state.name, value: state._id }));
    setStatesOptions(requiredData);
  }, [statesData]);

  useEffect(() => {
    const requiredData = citiesData?.map((city) => ({ label: city.name, value: city._id }));
    setCitiesOptions(requiredData);
  }, [citiesData]);

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

  const loadTalentRolesOptions = async (search) => {
    if (search) {
      return {
        options: talentRolesOptions.filter(
          (role) => role.label.toLowerCase().startsWith(search) || role.label.toLowerCase().includes(search),
        ),
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
        options: languagesOptions.filter(
          (language) =>
            language.label.toLowerCase().startsWith(search) || language.label.toLowerCase().includes(search),
        ),
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
        options: countriesOptions.filter(
          (country) => country.label.toLowerCase().startsWith(search) || country.label.toLowerCase().includes(search),
        ),
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

  const loadInstitutesOptions = async (search, prevOptions, { page }) => {
    try {
      const response = await paginatedInstitutesService(page, search);

      return {
        options: response?.data?.data?.data?.map((institute) => ({ label: institute.name, value: institute._id })),
        hasMore: response?.data?.data?.metadata?.has_next_page,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      return { options: [], hasMore: false };
    }
  };

  const loadEducationsOptions = async (search) => {
    if (search) {
      return {
        options: educationsOptions.filter(
          (education) =>
            education.label.toLowerCase().startsWith(search) || education.label.toLowerCase().includes(search),
        ),
      };
    }
    try {
      const response = await educationsService();

      const options = response?.data?.data?.map((education) => ({ label: education.name, value: education._id }));

      setEducationsOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  const loadToolsOptions = async (search) => {
    if (search) {
      return {
        options: toolsOptions.filter(
          (tool) => tool.label.toLowerCase().startsWith(search) || tool.label.toLowerCase().includes(search),
        ),
      };
    }
    try {
      const response = await toolsService();

      const options = response?.data?.data?.map((tool) => ({ label: tool.name, value: tool._id }));

      setToolsOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  const loadCertificatesOptions = async (search) => {
    if (search) {
      return {
        options: certificatesOptions.filter(
          (certificate) =>
            certificate.label.toLowerCase().startsWith(search) || certificate.label.toLowerCase().includes(search),
        ),
      };
    }
    try {
      const response = await certificatesService();

      const options = response?.data?.data?.map((certificate) => ({ label: certificate.name, value: certificate._id }));

      setCertificatesOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  const loadSkillsOptions = async (search) => {
    if (search) {
      return {
        options: skillsOptions.filter(
          (skill) => skill.label.toLowerCase().startsWith(search) || skill.label.toLowerCase().includes(search),
        ),
      };
    }
    try {
      const response = await skillsService();

      const options = response?.data?.data?.map((skill) => ({ label: skill.name, value: skill._id }));

      setSkillsOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  const loadTimezonesOptions = async (search) => {
    if (search) {
      return {
        options: timezonesOptions.filter(
          (timezone) =>
            timezone.label.toLowerCase().startsWith(search) || timezone.label.toLowerCase().includes(search),
        ),
      };
    }
    try {
      const response = await timezonesService();

      const options = response?.data?.data?.map((timezone) => ({
        label: `${timezone.name} (${timezone.abbreviation})`,
        value: timezone,
      }));

      setTimezonesOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  const loadCurrenciesOptions = async (search) => {
    if (search) {
      return {
        options: currenciesOptions.filter(
          (currency) =>
            currency.label.toLowerCase().startsWith(search) || currency.label.toLowerCase().includes(search),
        ),
      };
    }
    try {
      const response = await currenciesService();

      const options = response?.data?.data?.map((currency) => ({ label: currency.name, value: currency._id }));

      setCurrenciesOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  return (
    <ProfileFormContainer>
      {accountCreatedModal && (
        <AccountCreatedModal modal={accountCreatedModal} toggleModal={toggleAccountCreatedModal} />
      )}
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
                  <Info size={18} color={theme.infoIcon} id="tagline-info" />
                  <UncontrolledTooltip placement="right" target="tagline-info">
                    <p className="m-0">Give your tagline in 60 character.</p>
                  </UncontrolledTooltip>
                </Label>
                <Controller
                  id="tagline"
                  name="tagline"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter your tagline in 60 character."
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
                      Work Experience year
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
                          <InputGroupText>Year</InputGroupText>
                        </InputGroup>
                      )}
                    />
                    {errors.workExperienceYear && <FormFeedback>{errors.workExperienceYear.message}</FormFeedback>}
                  </Col>
                  <Col sm="12" md="6" lg="6">
                    <Label className="form-label" for="workExperienceMonth">
                      Work Experience month
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
                          <InputGroupText>Month</InputGroupText>
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
                  <Info size={18} color={theme.infoIcon} id="pro-intro-info" />
                  <UncontrolledTooltip placement="right" target="pro-intro-info">
                    <p className="m-0 ">Give your professional introduction in 150 character.</p>
                  </UncontrolledTooltip>
                </Label>
                <Controller
                  id="professionalIntroduction"
                  name="professionalIntroduction"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="textarea"
                      placeholder="Write your professional introduction in 150 character."
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
                      placeholder="Enter your role"
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
                <h5 className="fw-bold">Upload Resume</h5>
              </div>
            </Row>
            <Row className="mb-1">
              <h5 className="m-0">Languages</h5>
            </Row>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="speakLanguages">
                  Language - I can speak well (Top 5)
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
                  Language - I can read well (Top 5)
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
                  Language - I can write well (Top 5)
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
                Current Residency<span className="label-asterisk">*</span>
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
                          onWheel={(e) => e.target.blur()}
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
                      <AsyncPaginate
                        debounceTimeout={1000}
                        additional={{ page: 1 }}
                        loadOptions={loadInstitutesOptions}
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
                      <AsyncPaginate
                        loadOptions={loadEducationsOptions}
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
            <h4 className="m-0 mt-1">Expertise</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
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
                    <AsyncPaginate
                      isMulti
                      loadOptions={loadToolsOptions}
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
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="certificates">
                  Certificates
                </Label>
                <Controller
                  id="certificates"
                  name="certificates"
                  control={control}
                  invalid={errors.certificates && true}
                  render={({ field }) => (
                    <AsyncPaginate
                      isMulti
                      loadOptions={loadCertificatesOptions}
                      classNamePrefix="select"
                      placeholder="Select certificates"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.certificates,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.certificates && <FormFeedback>{errors.certificates.message}</FormFeedback>}
              </Col>
            </Row>
            <Row className="mb-1">
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
                    <AsyncPaginate
                      isMulti
                      loadOptions={loadSkillsOptions}
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
                    <AsyncPaginate
                      loadOptions={loadTimezonesOptions}
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
                            {watch('preferredWorkingTimeZone') && watch('preferredWorkingTimeZone').value.abbreviation}
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
                                options={timeOptions}
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
                                options={timeOptions}
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
                                  id="MONDAY"
                                  checked={field.value.includes('MONDAY')}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = 'MONDAY';

                                    if (isChecked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(field.value.filter((v) => v !== value));
                                    }
                                  }}
                                />
                                <Label for="MONDAY" className="form-check-label">
                                  Mon
                                </Label>
                              </div>
                              <div className="form-check form-check-inline checkbox-custom-margin">
                                <Input
                                  type="checkbox"
                                  {...field}
                                  id="TUESDAY"
                                  checked={field.value.includes('TUESDAY')}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = 'TUESDAY';

                                    if (isChecked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(field.value.filter((v) => v !== value));
                                    }
                                  }}
                                />
                                <Label for="TUESDAY" className="form-check-label">
                                  Tue
                                </Label>
                              </div>
                              <div className="form-check form-check-inline checkbox-custom-margin">
                                <Input
                                  type="checkbox"
                                  {...field}
                                  id="WEDNESDAY"
                                  checked={field.value.includes('WEDNESDAY')}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = 'WEDNESDAY';

                                    if (isChecked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(field.value.filter((v) => v !== value));
                                    }
                                  }}
                                />
                                <Label for="WEDNESDAY" className="form-check-label">
                                  Wed
                                </Label>
                              </div>
                              <div className="form-check form-check-inline checkbox-custom-margin">
                                <Input
                                  type="checkbox"
                                  {...field}
                                  id="THURSDAY"
                                  checked={field.value.includes('THURSDAY')}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = 'THURSDAY';

                                    if (isChecked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(field.value.filter((v) => v !== value));
                                    }
                                  }}
                                />
                                <Label for="THURSDAY" className="form-check-label">
                                  Thu
                                </Label>
                              </div>
                              <div className="form-check form-check-inline checkbox-custom-margin">
                                <Input
                                  type="checkbox"
                                  {...field}
                                  id="FRIDAY"
                                  checked={field.value.includes('FRIDAY')}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = 'FRIDAY';

                                    if (isChecked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(field.value.filter((v) => v !== value));
                                    }
                                  }}
                                />
                                <Label for="FRIDAY" className="form-check-label">
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
                            {watch('preferredWorkingTimeZone') && watch('preferredWorkingTimeZone').value.abbreviation}
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
                                options={timeOptions}
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
                                options={timeOptions}
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
                                  id="SATURDAY"
                                  checked={field.value.includes('SATURDAY')}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = 'SATURDAY';

                                    if (isChecked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(field.value.filter((v) => v !== value));
                                    }
                                  }}
                                />
                                <Label for="SATURDAY" className="form-check-label">
                                  Sat
                                </Label>
                              </div>
                              <div className="form-check form-check-inline checkbox-custom-margin">
                                <Input
                                  type="checkbox"
                                  {...field}
                                  id="SUNDAY"
                                  checked={field.value.includes('SUNDAY')}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = 'SUNDAY';

                                    if (isChecked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(field.value.filter((v) => v !== value));
                                    }
                                  }}
                                />
                                <Label for="SUNDAY" className="form-check-label">
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
            <h4 className="m-0 mt-1">Fees</h4>
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
                    <AsyncPaginate
                      loadOptions={loadCurrenciesOptions}
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
              <Col sm="12" md="6" lg="3" />
              <Col sm="12" md="6" lg="3">
                <Label className="form-label" for="hourlyRate">
                  Hourly Rate<span className="label-asterisk me-50">*</span>
                </Label>
                <Controller
                  id="hourlyRate"
                  name="hourlyRate"
                  control={control}
                  invalid={errors.hourlyRate && true}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      onWheel={(e) => e.target.blur()}
                      placeholder="Enter your hourly rate"
                      invalid={errors.workExperienceYear && true}
                    />
                  )}
                />
                {errors.hourlyRate && <FormFeedback>{errors.hourlyRate.message}</FormFeedback>}
              </Col>
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
        <div className="d-flex justify-content-between align-items-center pb-2 mt-1">
          <div
            className="d-flex align-items-center upload-button cursor-pointer"
            onClick={() => navigate('/talent-onboarding/account-details')}
          >
            <UploadIconContainer>
              <ChevronLeft size={18} color={theme.activeNavPillText} />
            </UploadIconContainer>
            <h5 className="fw-bold">Back</h5>
          </div>
          <Button color="primary" type="submit" disabled={!isValid || profileDetailsIsLoading}>
            {profileDetailsIsLoading ? (
              <Spinner size="sm" />
            ) : (
              <>
                <span className="me-50">Create Account</span>
                <ChevronRight size={14} />
              </>
            )}
          </Button>
        </div>
      </Form>
    </ProfileFormContainer>
  );
};

export default Profile;
