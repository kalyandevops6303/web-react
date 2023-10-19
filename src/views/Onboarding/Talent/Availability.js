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
import { ProfileFormContainer, UploadIconContainer } from '../style';
import theme from '../../../configs/themeVariables';
import timeOptions from '../../../utility/constants/TimeDropdownOptions';
import { getUserDetails, saveProfileDetails } from '../../../redux/actions/talentOnboardingActions';
import { profileDetailsLoading, userDetailsLoading } from '../../../redux/selectors/talentOnboardingSelectors';
import { currenciesService, timezonesService } from '../../../services/staticServices';
import { removeEmptyKeys, returnFilteredDropdownOptions } from '../../../utility/Utils';
import { userOnboarding } from '../../../utility/constants/Constant';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { currencies, currenciesLoading } from '../../../redux/selectors/staticSelectors';
import { getCurrencies } from '../../../redux/actions/staticActions';

const Availability = () => {
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
      is: (availabilityDays) => availabilityDays && availabilityDays.includes('weekdays'),
      then: () =>
        yup.array().min(1, 'Select at least one day in the week').required('Select at least one day in the week'),
    }),
    weekends: yup.array().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays.includes('weekends'),
      then: () =>
        yup.array().min(1, 'Select at least one day in the weekend').required('Select at least one day in the weekend'),
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
          .transform((value) => (value === null ? undefined : value))
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
          .transform((value) => (value === null ? undefined : value))
          .required('End time is required'),
    }),
    weekendStartTime: yup.object().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays.includes('weekends'),
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
      is: (availabilityDays) => availabilityDays && availabilityDays.includes('weekends'),
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
      .integer('Hourly rate must be an integer')
      .typeError('Hourly rate must be a number')
      .required('Hourly rate is required'),
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(AvailabilitySchema),
    defaultValues: {
      availabilityDays: [],
      weekdays: [],
      weekends: [],
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [timezonesOptions, setTimezonesOptions] = useState(null);
  const [currenciesOptions, setCurrenciesOptions] = useState(null);

  const profileDetailsIsLoading = useSelector(profileDetailsLoading);
  const userDetailsIsLoading = useSelector(userDetailsLoading);
  const currenciesData = useSelector(currencies);
  const currenciesIsLoading = useSelector(currenciesLoading);

  const onBackClick = () => {
    if (location?.state?.isEditing) {
      navigate(`/${userOnboarding.talent}/educational-details`, {
        state: { isEditing: true },
      });
    } else {
      navigate(`/${userOnboarding.talent}/educational-details`);
    }
  };

  const onSkipClick = () => {
    if (location?.state?.isEditing) {
      navigate(`/${userOnboarding.talent}/social-details`, {
        state: { isEditing: true },
      });
    } else {
      navigate(`/${userOnboarding.talent}/social-details`);
    }
  };

  const onSuccess = () => {
    if (location?.state?.isEditing) {
      navigate(`/${userOnboarding.talent}/social-details`, {
        state: { isEditing: true },
      });
    } else {
      navigate(`/${userOnboarding.talent}/social-details`);
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
      timezone: preferredWorkingTimeZone.value._id,
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
    const currency_preference = currencyPreference.value;
    const hourly_rate = hourlyRate;

    const reqData = {
      availability,
      currency_preference,
      hourly_rate,
    };

    dispatch(saveProfileDetails(removeEmptyKeys(reqData), onSuccess));
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
              label: `${res?.availability?.timezone?.name} (${res?.availability?.timezone?.abbreviation})`,
              value: res?.availability?.timezone,
            },
            { shouldValidate: true },
          );
        }

        let talentAvailabilityDays = [];

        if ('days' in res?.availability?.weekdays_avl) {
          talentAvailabilityDays = [...talentAvailabilityDays, 'weekdays'];
          setValue('weekdays', res?.availability?.weekdays_avl?.days, { shouldValidate: true });
          setValue(
            'weekdayStartTime',
            timeOptions.find((time) => parseInt(time.value, 10) === res?.availability?.weekdays_avl?.start_time),
            { shouldValidate: true },
          );
          setValue(
            'weekdayEndTime',
            timeOptions.find((time) => parseInt(time.value, 10) === res?.availability?.weekdays_avl?.end_time),
            { shouldValidate: true },
          );
        }
        if ('days' in res?.availability.weekends_avl) {
          talentAvailabilityDays = [...talentAvailabilityDays, 'weekends'];
          setValue('weekends', res?.availability?.weekends_avl?.days, { shouldValidate: true });
          setValue(
            'weekendStartTime',
            timeOptions.find((time) => parseInt(time.value, 10) === res?.availability?.weekends_avl?.start_time),
            { shouldValidate: true },
          );
          setValue(
            'weekendEndTime',
            timeOptions.find((time) => parseInt(time.value, 10) === res?.availability?.weekends_avl?.end_time),
            { shouldValidate: true },
          );
        }
        setValue('availabilityDays', talentAvailabilityDays, { shouldValidate: true });
      }
      if ('name' in res?.talent_info?.currency_preference) {
        setValue(
          'currencyPreference',
          {
            label: res?.talent_info?.currency_preference?.name,
            value: res?.talent_info?.currency_preference?._id,
          },
          { shouldValidate: true },
        );
      }
      if (res?.talent_info?.hourly_rate > 0) {
        setValue('hourlyRate', res?.talent_info?.hourly_rate, { shouldValidate: true });
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card className="w-75">
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
                          id="weekends"
                          checked={field.value.includes('weekends')}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const value = 'weekends';

                            if (isChecked) {
                              field.onChange([...field.value, value]);
                            } else {
                              field.onChange(field.value.filter((v) => v !== value));
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
                  (availabilityDays.includes('weekdays') || availabilityDays.includes('weekends')) && (
                    <>
                      {availabilityDays.includes('weekdays') && (
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
                                <FormFeedback>{errors.weekdayStartTime.label.message}</FormFeedback>
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
                                        ? timeOptions.filter(
                                            (t) =>
                                              parseInt(t.value, 10) > parseInt(watch('weekdayStartTime').value, 10),
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

                      {availabilityDays.includes('weekends') && (
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
                                      field.onChange(selectedOption);
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
                                        ? timeOptions.filter(
                                            (t) =>
                                              parseInt(t.value, 10) > parseInt(watch('weekendStartTime').value, 10),
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
          <Card className="w-75">
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
      )}
    </ProfileFormContainer>
  );
};

export default Availability;
