/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { ProfileFormContainer, UploadIconContainer } from '../../views/Onboarding/style';
import theme from '../../configs/themeVariables';
import timeOptions from '../../utility/constants/TimeDropdownOptions';
import { getUserDetails, saveProfileDetails, saveCheckpointComplete } from '../../redux/actions/talentOnboardingActions';
import { profileDetailsLoading, userDetailsLoading } from '../../redux/selectors/talentOnboardingSelectors';
import { currenciesService, timezonesService } from '../../services/staticServices';
import { filteredFormSchema, removeEmptyKeys, returnFilteredDropdownOptions } from '../../utility/Utils';
import { userOnboarding, userProfileEdit } from '../../utility/constants/Constant';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import { currencies, currenciesLoading } from '../../redux/selectors/staticSelectors';
import { getCurrencies } from '../../redux/actions/staticActions';
import { formData } from '../../redux/selectors/formDataSelectors';
import { clearAllFormData, setFormData } from '../../redux/reducers/formData';
import { selectFlexternBoolean, selectTrumioTalent } from '../../redux/selectors/authSelectors';

import { Progress } from 'reactstrap';
import { giveProgressBarColorClassName } from '../../utility/Utils';
import { returnCompleteProfileDetailsCta } from '../../utility/constants/CompleteProfileDetailsCta';
import "../../App.css";
import { CardText } from 'reactstrap';
import { userTypes } from '../../utility/constants/Constant';

const FlexternAvailability = () => {
  const AvailabilitySchema = yup.object().shape({
    preferredWorkingTimeZone: yup
      .object()
      .shape({
        label: yup.string().required('Preferred time zone is required'),
        value: yup.object().required('Preferred time zone is required'),
      })
      .required('Preferred time zone is required'),
    availabilityDays: yup.array().min(1, 'Select at least one work day').required('Select at least one work day'),
    weekdays: yup.array().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays?.includes('weekdays'),
      then: () =>
        yup.array().min(1, 'Select at least one day in the week').required('Select at least one day in the week'),
    }),
    weekends: yup.array().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays?.includes('weekends'),
      then: () =>
        yup.array().min(1, 'Select at least one day in the weekend').required('Select at least one day in the weekend'),
    }),
    weekdayStartTime: yup.object().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays?.includes('weekdays'),
      then: () =>
        yup
          .object()
          .shape({
            label: yup.string().required('Start time is required'),
            value: yup.string().required('Start time is required'),
          })
          .transform((value) => (value === null ? undefined : value))
          .required('Start time is required'),
    }),
    weekdayEndTime: yup.object().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays?.includes('weekdays'),
      then: () =>
        yup
          .object()
          .shape({
            label: yup.string().required('End time is required'),
            value: yup.string().required('End time is required'),
          })
          .transform((value) => (value === null ? undefined : value))
          .required('End time is required'),
    }),
    weekendStartTime: yup.object().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays?.includes('weekends'),
      then: () =>
        yup
          .object()
          .shape({
            label: yup.string().required('Start time is required'),
            value: yup.string().required('Start time is required'),
          })
          .transform((value) => (value === null ? undefined : value))
          .required('Start time is required'),
    }),
    weekendEndTime: yup.object().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays?.includes('weekends'),
      then: () =>
        yup
          .object()
          .shape({
            label: yup.string().required('End time is required'),
            value: yup.string().required('End time is required'),
          })
          .transform((value) => (value === null ? undefined : value))
          .required('End time is required'),
    }),
    currencyPreference: yup
      .object()
      .shape({
        label: yup.string().required('Preferred currency is required'),
        value: yup.string().required('Preferred currency is required'),
      })
      .required('Preferred currency is required'),
    hourlyRate: yup
      .number()
      .min(1, 'Hourly rate should be atleast 1')
      .max(999, 'Hourly rate must be 999 or less')
      .integer('Hourly rate must be an integer')
      .typeError('Hourly rate must be a number')
      .required('Hourly rate is required'),
  });

  const savedFormData = useSelector(formData);
  const flexternBoolean = useSelector(selectFlexternBoolean);
  const trumioTalent = useSelector(selectTrumioTalent);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(AvailabilitySchema),
    defaultValues: {
      preferredWorkingTimeZone: savedFormData?.preferredWorkingTimeZone || {},
      availabilityDays: savedFormData?.availabilityDays || [],
      weekdays: savedFormData?.weekdays || [],
      weekends: savedFormData?.weekends || [],
      weekdayStartTime: savedFormData?.weekdayStartTime || {},
      weekdayEndTime: savedFormData?.weekdayEndTime || {},
      weekendStartTime: savedFormData?.weekendStartTime || {},
      weekendEndTime: savedFormData?.weekendEndTime || {},
      currencyPreference: savedFormData?.currencyPreference || null,
      hourlyRate: savedFormData?.hourlyRate || null,
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const localFormData = useWatch({ control });


  const profileCompletionFlextern = useSelector((state) => state.auth?.profileCompletionFlextern?.profile_completed);
  const profileCompletionFlexternMissingValues = useSelector((state) => state.auth?.profileCompletionFlextern?.values_missing);
  const profileCompletionProject = useSelector((state) => state.dashboard?.profilePercentage?.profile_completed);
  const profileCompletionProjectMissingValues = useSelector((state) => state.dashboard?.profilePercentage?.values_missing);

  const isFlexternReady = useSelector((state) => state.auth?.profileCompletionFlextern?.profile_completed) == 100;
  const isProjectReady = useSelector((state) => state.dashboard?.profilePercentage?.profile_completed) == 100;
  const isFlextern = useSelector((state) => state.auth?.flextern);
  const isTrumioTalent = useSelector((state) => state.auth?.trumio_talent);

  const [flexternOrProjectModal, setFlexternOrProjectModal] = useState(false);
  const [overallPercentageCompletion, setOverallPercentageCompletion] = useState(0);

  const getOverallPercentageCompletion = () => {
    if (isFlextern && !isTrumioTalent) {
      setOverallPercentageCompletion(profileCompletionFlextern);
    }
    else if (!isFlextern && isTrumioTalent) {
      setOverallPercentageCompletion(profileCompletionProject);
    }
    else {
      setOverallPercentageCompletion((profileCompletionFlextern + profileCompletionProject) / 2);
    }
  }

  useEffect(() => {
    getOverallPercentageCompletion();
  }, [profileCompletionFlextern, profileCompletionProject])


  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData };
    dispatch(setFormData(allData));
  }, [localFormData]);

  useEffect(() => {
    if (savedFormData) {
      const requiredFields = filteredFormSchema({
        savedData: savedFormData,
        formSchemaFields: AvailabilitySchema.fields,
      });
      reset(requiredFields);
      const keysWithValues = Object.keys(requiredFields)?.filter((key) => requiredFields[key]);
      trigger(keysWithValues);
    }
  }, []);

  const [timezonesOptions, setTimezonesOptions] = useState(null);
  const [currenciesOptions, setCurrenciesOptions] = useState(null);

  const profileDetailsIsLoading = useSelector(profileDetailsLoading);
  const userDetailsIsLoading = useSelector(userDetailsLoading);
  const currenciesData = useSelector(currencies);
  const currenciesIsLoading = useSelector(currenciesLoading);

  const onBackClick = () => {
    dispatch(clearAllFormData());
    if (location.pathname?.includes('profile-edit')) {
      if (flexternBoolean) {
        navigate(`/${userProfileEdit.talent}/additional-details`);
      } else if (trumioTalent) {
        navigate(`/${userProfileEdit.talent}/social-details`);
      }
    } else if (flexternBoolean) {
      navigate(`/${userOnboarding.talent}/additional-details`);
    } else if (trumioTalent) {
      navigate(`/${userOnboarding.talent}/social-details`);
    }
  };

  const onSkipClick = () => {
    dispatch(clearAllFormData());
    if (location.pathname?.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/payment-details`);
    } else {
      navigate(`/${userOnboarding.talent}/payment-details`);
    }
  };

  const onSuccess = () => {
    dispatch(clearAllFormData());
    if (location.pathname?.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/payment-details`);
    } else {
      navigate(`/${userOnboarding.talent}/payment-details`);
    }
  };

  const onSubmit = (data) => {
    const {
      preferredWorkingTimeZone,
      availabilityDays,
      weekdayStartTime,
      weekdayEndTime,
      weekdays,
      weekendStartTime,
      weekendEndTime,
      weekends,
      currencyPreference,
      hourlyRate,
    } = data;

    const availability = {
      timezone: preferredWorkingTimeZone?.value?._id,
      weekdays_avl: {
        start_time: availabilityDays?.includes('weekdays') ? weekdayStartTime?.value : null,
        end_time: availabilityDays?.includes('weekdays') ? weekdayEndTime?.value : null,
        days: availabilityDays?.includes('weekdays') ? weekdays : null,
      },
      weekends_avl: {
        start_time: availabilityDays?.includes('weekends') ? weekendStartTime?.value : null,
        end_time: availabilityDays?.includes('weekends') ? weekendEndTime?.value : null,
        days: availabilityDays?.includes('weekends') ? weekends : null,
      },
    };
    const currency_preference = currencyPreference?.value;
    const hourly_rate = hourlyRate;

    const reqData = {
      availability,
      currency_preference,
      hourly_rate,
    };

    dispatch(saveProfileDetails(removeEmptyKeys(reqData), onSuccess));
    dispatch(saveCheckpointComplete(() => { }));

  };

  const loadTimezonesOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, timezonesOptions),
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
        options: returnFilteredDropdownOptions(search, currenciesOptions),
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

  const availabilityDays = watch('availabilityDays');

  const onGetUserDetailsSuccess = (res) => {
    if (res) {
      if ('timezone' in res?.availability) {
        if (res?.availability?.timezone) {
          setValue(
            'preferredWorkingTimeZone',
            {
              label: savedFormData?.preferredWorkingTimeZone?.label
                ? `${savedFormData?.preferredWorkingTimeZone?.label}`
                : `${res?.availability?.timezone?.name} (${res?.availability?.timezone?.abbreviation})`,
              value: savedFormData?.preferredWorkingTimeZone?.value
                ? savedFormData?.preferredWorkingTimeZone?.value
                : res?.availability?.timezone,
            },
            { shouldValidate: true },
          );
        }

        let talentAvailabilityDays = [];

        if ('days' in res?.availability?.weekdays_avl) {
          talentAvailabilityDays = [...talentAvailabilityDays, 'weekdays'];
          setValue(
            'weekdays',
            savedFormData?.weekdays?.length > 0 ? savedFormData?.weekdays : res?.availability?.weekdays_avl?.days,
            { shouldValidate: true },
          );

          setValue(
            'weekdayStartTime',
            savedFormData?.weekdayStartTime?.length > 0
              ? savedFormData?.weekdayStartTime
              : timeOptions.find((time) => parseInt(time?.value, 10) === res?.availability?.weekdays_avl?.start_time),
            { shouldValidate: true },
          );
          setValue(
            'weekdayEndTime',
            savedFormData?.weekdayEndTime?.length > 0
              ? savedFormData?.weekdayEndTime
              : timeOptions.find((time) => parseInt(time?.value, 10) === res?.availability?.weekdays_avl?.end_time),
            { shouldValidate: true },
          );
        }
        if ('days' in res?.availability.weekends_avl) {
          talentAvailabilityDays = [...talentAvailabilityDays, 'weekends'];
          setValue(
            'weekends',
            savedFormData?.weekends?.length > 0 ? savedFormData?.weekends : res?.availability?.weekends_avl?.days,
            { shouldValidate: true },
          );
          setValue(
            'weekendStartTime',
            savedFormData?.weekendStartTime?.length > 0
              ? savedFormData?.weekendStartTime
              : timeOptions.find((time) => parseInt(time?.value, 10) === res?.availability?.weekends_avl?.start_time),
            { shouldValidate: true },
          );
          setValue(
            'weekendEndTime',
            savedFormData?.weekendEndTime?.length > 0
              ? savedFormData?.weekendEndTime
              : timeOptions.find((time) => parseInt(time?.value, 10) === res?.availability?.weekends_avl?.end_time),
            { shouldValidate: true },
          );
        }
        setValue(
          'availabilityDays',
          savedFormData?.availabilityDays?.length > 0 ? savedFormData?.availabilityDays : talentAvailabilityDays,
          { shouldValidate: true },
        );
      }
      if ('name' in res?.talent_info?.currency_preference) {
        setValue(
          'currencyPreference',
          {
            label:
              savedFormData?.currencyPreference?.length > 0
                ? savedFormData?.currencyPreference?.label
                : res?.talent_info?.currency_preference?.name,
            value:
              savedFormData?.currencyPreference?.length > 0
                ? savedFormData?.currencyPreference?.value
                : res?.talent_info?.currency_preference?._id,
          },
          { shouldValidate: true },
        );
      }
      if (res?.talent_info?.hourly_rate > 0) {
        setValue('hourlyRate', savedFormData?.hourlyRate || res?.talent_info?.hourly_rate, {
          shouldValidate: true,
        });
      }
    }
  };

  useEffect(() => {
    if (currenciesData?.length > 0) {
      setValue(
        'currencyPreference',
        { label: currenciesData[0]?.name, value: currenciesData[0]?._id },
        { shouldValidate: true },
      );
    }
  }, [currenciesData]);

  useEffect(() => {
    dispatch(getUserDetails(onGetUserDetailsSuccess));
    dispatch(getCurrencies());
  }, []);

  return (
    <ProfileFormContainer>
      {userDetailsIsLoading || currenciesIsLoading ? (
        <div className="w-75">
          <ComponentSpinner className="mt-5" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)} className="d-flex gap-2">
          <div className='w-75'>
            <Card className="w-100">
              <CardHeader>
                <h4 className="m-0 mt-1">Availability</h4>
              </CardHeader>
              <hr className="m-0 card-header-border" />
              <CardBody>
                <Row className="mb-1">
                  <Col sm="12" md="12" lg="6">
                    <Label className="form-label" for="preferredWorkingTimeZone">
                      Preferred time zone<span className="label-asterisk me-50">*</span>
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
                          placeholder="Select one"
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
                    Days available<span className="label-asterisk me-50">*</span>
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
                            checked={field && field?.value?.includes('weekdays')}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              const value = 'weekdays';

                              if (isChecked) {
                                field.onChange([...field?.value, value]);
                              } else {
                                field.onChange(field?.value?.filter((v) => v !== value));
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
                            id="weekends"
                            checked={field?.value?.includes('weekends')}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              const value = 'weekends';

                              if (isChecked) {
                                field.onChange([...field?.value, value]);
                              } else {
                                field.onChange(field?.value?.filter((v) => v !== value));
                              }
                            }}
                          />
                          <Label htmlFor="weekends" className="form-check-label">
                            Weekends
                          </Label>
                        </div>
                      </div>
                    )}
                  />
                  {errors.availabilityDays && <FormFeedback>{errors.availabilityDays.message}</FormFeedback>}
                </Row>
                <Row>
                  {availabilityDays &&
                    (availabilityDays?.includes('weekdays') || availabilityDays?.includes('weekends')) && (
                      <>
                        {availabilityDays?.includes('weekdays') && (
                          <div>
                            <Row className="mb-1 mt-2">
                              <div className="d-flex align-items-center">
                                <h5 className="m-0">Weekdays</h5>
                                <p className="m-0 mx-1 px-50 time-zone-border">
                                  {watch('preferredWorkingTimeZone') &&
                                    watch('preferredWorkingTimeZone')?.value?.abbreviation}
                                </p>
                                <Info size={18} color={theme.infoIcon} id="time-zone-info-weekday" />
                                <UncontrolledTooltip placement="right" target="time-zone-info-weekday">
                                  <div className="d-flex flex-column align-items-start">
                                    <p className="m-0">
                                      Based on preferred
                                      <br /> time zone
                                    </p>
                                  </div>
                                </UncontrolledTooltip>
                              </div>
                            </Row>
                            <Row className="mb-1 mt-2">
                              <Col sm="6" md="6" lg="3">
                                <Label className="form-label" for="weekdayStartTime">
                                  Start time<span className="label-asterisk me-50">*</span>
                                </Label>
                                <Controller
                                  id="weekdayStartTime"
                                  name="weekdayStartTime"
                                  control={control}
                                  invalid={errors.weekdayStartTime && true}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      options={timeOptions}
                                      classNamePrefix="select"
                                      placeholder="Select start time"
                                      theme={selectThemeColors}
                                      className={classNames('react-select', {
                                        'is-invalid': errors && errors.weekdayStartTime,
                                      })}
                                      onChange={(selectedOption) => {
                                        field.onChange(selectedOption);
                                        setValue('weekdayEndTime', null);
                                      }}
                                    />
                                  )}
                                />
                                {errors.weekdayStartTime && (
                                  <FormFeedback>{errors && errors.weekdayStartTime.label.message}</FormFeedback>
                                )}
                              </Col>
                              <Col sm="6" md="6" lg="3">
                                <Label className="form-label" for="weekdayEndTime">
                                  End time<span className="label-asterisk me-50">*</span>
                                </Label>
                                <Controller
                                  id="weekdayEndTime"
                                  name="weekdayEndTime"
                                  control={control}
                                  invalid={errors.weekdayEndTime && true}
                                  render={({ field }) => (
                                    <Select
                                      options={
                                        watch('weekdayStartTime')
                                          ? timeOptions?.filter(
                                            (t) =>
                                              parseInt(t?.value, 10) > parseInt(watch('weekdayStartTime')?.value, 10),
                                          )
                                          : timeOptions
                                      }
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
                                {errors.weekdayEndTime && (
                                  <FormFeedback>{errors.weekdayEndTime.label.message}</FormFeedback>
                                )}
                              </Col>
                            </Row>
                            <Row className="mt-2">
                              <h5 className="m-0">
                                Which days?
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
                                        checked={field?.value?.includes('MONDAY')}
                                        onChange={(e) => {
                                          const isChecked = e.target.checked;
                                          const value = 'MONDAY';

                                          if (isChecked) {
                                            field?.onChange([...field?.value, value]);
                                          } else {
                                            field?.onChange(field?.value?.filter((v) => v !== value));
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
                                        checked={field?.value?.includes('TUESDAY')}
                                        onChange={(e) => {
                                          const isChecked = e.target.checked;
                                          const value = 'TUESDAY';

                                          if (isChecked) {
                                            field?.onChange([...field?.value, value]);
                                          } else {
                                            field?.onChange(field?.value?.filter((v) => v !== value));
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
                                        checked={field?.value?.includes('WEDNESDAY')}
                                        onChange={(e) => {
                                          const isChecked = e.target.checked;
                                          const value = 'WEDNESDAY';

                                          if (isChecked) {
                                            field?.onChange([...field?.value, value]);
                                          } else {
                                            field?.onChange(field?.value?.filter((v) => v !== value));
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
                                        checked={field.value?.includes('THURSDAY')}
                                        onChange={(e) => {
                                          const isChecked = e.target.checked;
                                          const value = 'THURSDAY';

                                          if (isChecked) {
                                            field?.onChange([...field?.value, value]);
                                          } else {
                                            field?.onChange(field?.value?.filter((v) => v !== value));
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
                                        checked={field.value?.includes('FRIDAY')}
                                        onChange={(e) => {
                                          const isChecked = e.target.checked;
                                          const value = 'FRIDAY';

                                          if (isChecked) {
                                            field?.onChange([...field?.value, value]);
                                          } else {
                                            field?.onChange(field?.value?.filter((v) => v !== value));
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

                        {availabilityDays?.includes('weekends') && (
                          <div>
                            <Row className="mb-1 mt-2">
                              <div className="d-flex align-items-center">
                                <h5 className="m-0">Weekends</h5>
                                <p className="m-0 mx-1 px-50 time-zone-border">
                                  {watch('preferredWorkingTimeZone') &&
                                    watch('preferredWorkingTimeZone')?.value?.abbreviation}
                                </p>
                                <Info size={18} color={theme.infoIcon} id="time-zone-info-weekend" />
                                <UncontrolledTooltip placement="right" target="time-zone-info-weekend">
                                  <div className="d-flex flex-column align-items-start">
                                    <p className="m-0">
                                      Based on preferred
                                      <br /> time zone
                                    </p>
                                  </div>
                                </UncontrolledTooltip>
                              </div>
                            </Row>
                            <Row className="mb-1 mt-2">
                              <Col sm="6" md="6" lg="3">
                                <Label className="form-label" for="weekendStartTime">
                                  Start time<span className="label-asterisk me-50">*</span>
                                </Label>
                                <Controller
                                  id="weekendStartTime"
                                  name="weekendStartTime"
                                  control={control}
                                  invalid={errors.weekendStartTime && true}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      options={timeOptions}
                                      classNamePrefix="select"
                                      placeholder="Select start time"
                                      theme={selectThemeColors}
                                      className={classNames('react-select', {
                                        'is-invalid': errors && errors.weekendStartTime,
                                      })}
                                      onChange={(selectedOption) => {
                                        field?.onChange(selectedOption);
                                        setValue('weekendEndTime', null);
                                      }}
                                    />
                                  )}
                                />
                                {errors.weekendStartTime && (
                                  <FormFeedback>{errors.weekendStartTime.label.message}</FormFeedback>
                                )}
                              </Col>
                              <Col sm="6" md="6" lg="3">
                                <Label className="form-label" for="weekendEndTime">
                                  End time<span className="label-asterisk me-50">*</span>
                                </Label>
                                <Controller
                                  id="weekendEndTime"
                                  name="weekendEndTime"
                                  control={control}
                                  invalid={errors.weekendEndTime && true}
                                  render={({ field }) => (
                                    <Select
                                      options={
                                        watch('weekendStartTime')
                                          ? timeOptions?.filter(
                                            (t) =>
                                              parseInt(t?.value, 10) > parseInt(watch('weekendStartTime')?.value, 10),
                                          )
                                          : timeOptions
                                      }
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
                                {errors.weekendEndTime && (
                                  <FormFeedback>{errors.weekendEndTime.label.message}</FormFeedback>
                                )}
                              </Col>
                            </Row>
                            <Row className="mt-2">
                              <h5 className="m-0">
                                Which days?
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
                                        checked={field.value?.includes('SATURDAY')}
                                        onChange={(e) => {
                                          const isChecked = e.target.checked;
                                          const value = 'SATURDAY';

                                          if (isChecked) {
                                            field?.onChange([...field?.value, value]);
                                          } else {
                                            field?.onChange(field?.value?.filter((v) => v !== value));
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
                                        checked={field?.value?.includes('SUNDAY')}
                                        onChange={(e) => {
                                          const isChecked = e.target.checked;
                                          const value = 'SUNDAY';

                                          if (isChecked) {
                                            field?.onChange([...field?.value, value]);
                                          } else {
                                            field?.onChange(field?.value?.filter((v) => v !== value));
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
            <Card className="w-100">
              <CardHeader>
                <h4 className="m-0 mt-1">Fees</h4>
              </CardHeader>
              <hr className="m-0 card-header-border" />
              <CardBody>
                <Row className="mb-1">
                  <Col sm="12" md="6" lg="3">
                    <Label className="form-label" for="currencyPreference">
                      Preferred Currency<span className="label-asterisk me-50">*</span>
                    </Label>
                    <Controller
                      id="currencyPreference"
                      name="currencyPreference"
                      control={control}
                      invalid={errors.currencyPreference && true}
                      render={({ field }) => (
                        <AsyncPaginate
                          isDisabled
                          loadOptions={loadCurrenciesOptions}
                          menuPosition="fixed"
                          minMenuHeight={200}
                          classNamePrefix="select"
                          placeholder="Select one"
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
                          step="any"
                          onWheel={(e) => e.target.blur()}
                          placeholder="Enter your hourly rate"
                          invalid={errors.hourlyRate && true}
                        />
                      )}
                    />
                    {errors.hourlyRate && <FormFeedback>{errors.hourlyRate.message}</FormFeedback>}
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <div className="d-flex justify-content-between align-items-center pb-2 mt-1 w-100">
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
          </div>

          <Col className="w-25">
            <Card>
              <CardHeader>
                <h4 className="m-0 mt-1">Profile Completion</h4>
                <CardText className="m-0 mt-1">Make it easier for others to find you by completing your profile.</CardText>
                <h3 className="m-0 mt-1 mb-1">{overallPercentageCompletion}%</h3>
                <Progress value={overallPercentageCompletion}
                  style={{ height: '0.5rem' }}
                  className={`${giveProgressBarColorClassName(overallPercentageCompletion)} p-0 m-0 w-100`}
                ></Progress>

              </CardHeader>

              <CardBody>
                <hr className="m-0 card-header-border" />

                {isTrumioTalent && <div className='d-flex gap-1 mt-1'>
                  <div className="custom-checkbox-wrapper">
                    <Input type="checkbox" id="customCheckbox" className="custom-checkbox-input" checked={isProjectReady} />
                    <label htmlFor="customCheckbox" className="custom-checkbox-label"></label>
                  </div>
                  <div>
                    <CardText className="m-0">Client Projects Ready</CardText>
                    <b className='text-primary cursor-pointer'
                      onClick={() => navigate(returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionProjectMissingValues)?.path || "/marketplace")}
                    >{isProjectReady ? 'Explore Projects' : `${returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionProjectMissingValues)?.label}`} <ChevronRight size="1.2em" /></b>
                  </div>
                </div>}

                {isFlextern && <div className='d-flex gap-1 mt-1'>
                  <div className="custom-checkbox-wrapper">
                    <Input type="checkbox" id="customCheckbox2" className="custom-checkbox-input" checked={isFlexternReady} />
                    <label htmlFor="customCheckbox2" className="custom-checkbox-label"></label>
                  </div>
                  <div>
                    <CardText className="m-0">Flexternship Ready</CardText>
                    <b className='text-primary cursor-pointer'
                      onClick={() => navigate(returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionFlexternMissingValues)?.path || "/dashboard")}
                    >{isFlexternReady ? 'Explore Flexternships' : `${returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionFlexternMissingValues)?.label}`} <ChevronRight size="1.2em" /></b>
                  </div>
                </div>}
              </CardBody>
            </Card>
          </Col>

        </Form>
      )}
    </ProfileFormContainer>
  );
};

export default FlexternAvailability;
