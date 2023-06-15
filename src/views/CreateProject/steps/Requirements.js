import { useState } from 'react';
import Proptypes from 'prop-types';
import { ChevronRight, FileText, Info, Minus, Upload } from 'react-feather';
import Select from 'react-select';
import classNames from 'classnames';
import { selectThemeColors } from '@utils';
import {
  Label,
  Row,
  Col,
  Input,
  Form,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormFeedback,
  UncontrolledTooltip,
  Badge,
} from 'reactstrap';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDropzone } from 'react-dropzone';
import { DropzoneContainer, RequirementsFormContainer } from '../style';
import { UploadIconContainer } from '../../Onboarding/style';
import theme from '../../../configs/themeVariables';

const Requirements = ({ stepper }) => {
  const ProjectDetailsSchema = yup.object().shape({
    projectName: yup
      .string()
      .max(50, 'Project name must be at most 50 characters')
      .required('Project name is required'),
    expectedDuration: yup.number().required('Expected duration is required'),
    expectedDurationPeriod: yup
      .object()
      .shape({
        label: yup.string().required('Period is required'),
        value: yup.string().required('Period is required'),
      })
      .required('Period is required'),
    projectDescription: yup
      .string()
      .max(250, 'Project description must be at most 250 characters')
      .required('Project description is required'),
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
    minTimeOverlapHr: yup
      .object()
      .shape({
        label: yup.string().required('Min time overlap hr is required'),
        value: yup.string().required('Min time overlap hr is required'),
      })
      .required('Min time overlap hr is required'),
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
    includeOrExcludeCountries: yup.string(),
    includedCountriesSelection: yup.array().of(
      yup.object().shape({
        label: yup.string(),
        value: yup.string(),
      }),
    ),
    excludedCountriesSelection: yup.array().of(
      yup.object().shape({
        label: yup.string(),
        value: yup.string(),
      }),
    ),
    currencyType: yup
      .object()
      .shape({
        label: yup.string().required('Currency type is required'),
        value: yup.string().required('Currency type is required'),
      })
      .required('Currency type is required'),
    projectPayType: yup.string().required('Project pay type is required'),
    projectFixedCost: yup.object().when('projectPayType', {
      is: (projectPayType) => projectPayType === 'fixed-price',
      then: () => yup.number().required('Project fixed cost is required'),
    }),
    nda: yup.string().required('This is required'),
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ProjectDetailsSchema),
    defaultValues: {
      projectName: '',
      expectedDurationPeriod: { label: 'Week', value: 'week' },
      projectDescription: '',
      availabilityDays: [],
      weekdays: [],
      weekends: [],
    },
  });

  const onSubmit = () => {
    stepper.next();
  };

  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles.map((file) => Object.assign(file))]);
    },
  });

  const renderFilePreview = (file) => {
    if (file.type.startsWith('image')) {
      return <img className="rounded me-75" alt={file.name} src={URL.createObjectURL(file)} height="18" width="18" />;
      // eslint-disable-next-line
    } else {
      return <FileText size="18" className="me-75 mb-50" />;
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`;
      // eslint-disable-next-line
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`;
    }
  };

  const formattedDate = new Date()
    .toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    .replace(',', '')
    .split(' ');
  const requiredFormattedDate = `${formattedDate[1]} ${formattedDate[0]} ${formattedDate[2]}`;

  const fileList = () => (
    <div className="custom-card mb-1">
      <Card className="p-1">
        {files.map((file, index) => (
          <Row
            key={file.name}
            className={index !== files.length - 1 ? 'd-flex align-items-center mb-1' : 'd-flex align-items-center'}
          >
            <Col sm="6" md="6" lg="6">
              {renderFilePreview(file)}
              {file.name}
            </Col>
            <Col sm="2" md="2" lg="2">
              {renderFileSize(file.size)}
            </Col>
            <Col sm="2" md="2" lg="2">
              {requiredFormattedDate}
            </Col>
            <Col sm="2" md="2" lg="2">
              <Button color="flat-danger" className="btn-left-margin" onClick={() => handleRemoveFile(file)}>
                Remove
              </Button>
            </Col>
          </Row>
        ))}
      </Card>
    </div>
  );

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'German', label: 'German' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Japenese', label: 'Japenese' },
  ];

  const countryOptions = [
    { value: 'usa', label: 'USA' },
    { value: 'canada', label: 'Canada' },
    { value: 'uk', label: 'UK' },
    { value: 'germany', label: 'Germany' },
    { value: 'france', label: 'France' },
    { value: 'spain', label: 'Spain' },
    { value: 'italy', label: 'Italy' },
    { value: 'australia', label: 'Australia' },
    { value: 'japan', label: 'Japan' },
    { value: 'china', label: 'China' },
  ];

  const availabilityDays = watch('availabilityDays');
  const projectPayType = watch('projectPayType');

  const handleIncludedCountryRemove = (removedCountry) => {
    const newCountries = watch('includedCountriesSelection').filter(
      (country) => country.value !== removedCountry.value,
    );

    setValue('includedCountriesSelection', newCountries);
  };

  const handleExcludedCountryRemove = (removedCountry) => {
    const newCountries = watch('excludedCountriesSelection').filter(
      (country) => country.value !== removedCountry.value,
    );

    setValue('excludedCountriesSelection', newCountries);
  };

  return (
    <RequirementsFormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <h4 className="m-0 mt-1">Project Details</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="projectName">
                  Project Name<span className="label-asterisk">*</span>
                </Label>
                <Controller
                  id="projectName"
                  name="projectName"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter project name" invalid={errors.projectName && true} />
                  )}
                />
                {errors.projectName && <FormFeedback>{errors.projectName.message}</FormFeedback>}
              </Col>
              <Col sm="12" md="6" lg="3">
                <Label className="form-label" for="expectedDuration">
                  Expected Duration<span className="label-asterisk">*</span>
                </Label>
                <Controller
                  id="expectedDuration"
                  name="expectedDuration"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      placeholder="Enter duration"
                      invalid={errors.expectedDuration && true}
                    />
                  )}
                />
                {errors.expectedDuration && <FormFeedback>{errors.expectedDuration.message}</FormFeedback>}
              </Col>
              <Col sm="12" md="6" lg="3">
                <Label className="form-label mt-1" for="expectedDurationPeriod" />
                <Controller
                  id="expectedDurationPeriod"
                  name="expectedDurationPeriod"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={[
                        { label: 'Week', value: 'week' },
                        { label: 'Day', value: 'day' },
                      ]}
                      classNamePrefix="select"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.expectedDurationPeriod,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.expectedDurationPeriod && <FormFeedback>{errors.expectedDurationPeriod.message}</FormFeedback>}
              </Col>
            </Row>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="12">
                <Label className="form-label" for="projectDescription">
                  Project Description<span className="label-asterisk">*</span>
                </Label>
                <Controller
                  id="projectDescription"
                  name="projectDescription"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="textarea"
                      placeholder="Enter project background and requirements in 250 character."
                      rows="5"
                      invalid={errors.projectDescription && true}
                    />
                  )}
                />
                {errors.projectDescription && <FormFeedback>{errors.projectDescription.message}</FormFeedback>}
              </Col>
            </Row>
            <Row>
              <Label className="form-label">Upload detailed requirements document (optional)</Label>
              {files.length ? (
                <>
                  <div className="px-1">{fileList()}</div>
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <div className="d-flex align-items-center upload-btn cursor-pointer mt-1">
                      <UploadIconContainer>
                        <Upload size={18} color={theme.activeNavPillText} />
                      </UploadIconContainer>
                      <h5 className="fw-bold mb-0 mx-75">Upload</h5>
                    </div>
                  </div>
                </>
              ) : (
                <Col sm="12" md="12" lg="6">
                  <DropzoneContainer>
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <div className="d-flex align-items-center justify-content-center flex-column p-3">
                        <h4>Drop files here or click to upload</h4>
                        <p className="text-secondary text-center mt-50 fw-light">
                          (This is just a demo dropzone. Selected files are not actually uploaded.)
                        </p>
                      </div>
                    </div>
                  </DropzoneContainer>
                </Col>
              )}
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h4 className="m-0 mt-1">Required Proficiency</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
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
                      options={languageOptions}
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
              <Col sm="12" md="6" lg="3">
                <Label className="form-label" for="minTimeOverlapHr">
                  Minimum Time Overlap Hr<span className="label-asterisk">*</span>
                </Label>
                <Controller
                  id="minTimeOverlapHr"
                  name="minTimeOverlapHr"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={[
                        { label: '1', value: 1 },
                        { label: '2', value: 2 },
                        { label: '3', value: 3 },
                        { label: '4', value: 4 },
                      ]}
                      classNamePrefix="select"
                      placeholder="Enter min. overlap hr"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.minTimeOverlapHr,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.minTimeOverlapHr && <FormFeedback>{errors.minTimeOverlapHr.label.message}</FormFeedback>}
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
                                options={languageOptions}
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
                                options={languageOptions}
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
                                options={languageOptions}
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
                                options={languageOptions}
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
            <h4 className="m-0 mt-1">Country</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            <Row className="mb-1">
              <Controller
                control={control}
                name="includeOrExcludeCountries"
                render={({ field }) => (
                  <div className="demo-inline-spacing mx-25">
                    <div className="form-check form-check-inline checkbox-custom-margin">
                      <Input
                        type="radio"
                        {...field}
                        id="include-countries"
                        checked={field.value === 'include-countries'}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          const value = 'include-countries';

                          if (isChecked) {
                            field.onChange(value);
                            setValue('excludedCountriesSelection', []);
                          } else {
                            field.onChange('');
                          }
                        }}
                      />
                      <Label for="include-countries" className="form-check-label">
                        Include Countries
                      </Label>
                    </div>
                  </div>
                )}
              />
            </Row>
            <Row className="mx-1 mb-2">
              <Col sm="12" md="6" lg="6" className="mb-50">
                <Controller
                  id="includedCountriesSelection"
                  name="includedCountriesSelection"
                  control={control}
                  invalid={errors.includedCountriesSelection && true}
                  render={({ field }) => (
                    <div className="custom-multiselect">
                      <Select
                        isMulti
                        options={
                          watch('includedCountriesSelection')
                            ? countryOptions.filter(
                                (option) => !watch('includedCountriesSelection').includes(option.value),
                              )
                            : countryOptions
                        }
                        onChange={(selectedOptions) => field.onChange(selectedOptions)}
                        isDisabled={watch('includeOrExcludeCountries') !== 'include-countries'}
                        classNamePrefix="select"
                        placeholder="Select countries to be included"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.includedCountriesSelection,
                        })}
                        {...field}
                      />
                    </div>
                  )}
                />
              </Col>
            </Row>
            {watch('includedCountriesSelection') && watch('includedCountriesSelection').length > 0 && (
              <Row className="mt-2 pb-0">
                <Label className="form-check-label mb-75">Selected countries -</Label>
                {watch('includedCountriesSelection').map((country) => (
                  <div className="countries-pills" key={country.label}>
                    <Badge pill className="px-1 py-50 d-flex align-items-center">
                      <h6 className="m-0 fw-light">{country.label}</h6>
                      <Minus
                        size={18}
                        className="ms-50 cursor-pointer"
                        onClick={() => handleIncludedCountryRemove(country)}
                      />
                    </Badge>
                  </div>
                ))}
              </Row>
            )}
            <hr className="card-header-border mb-2" />
            <Row className="mb-1">
              <Controller
                control={control}
                name="includeOrExcludeCountries"
                render={({ field }) => (
                  <div className="demo-inline-spacing mx-25">
                    <div className="form-check form-check-inline checkbox-custom-margin">
                      <Input
                        type="radio"
                        {...field}
                        id="exclude-countries"
                        checked={field.value === 'exclude-countries'}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          const value = 'exclude-countries';

                          if (isChecked) {
                            field.onChange(value);
                            setValue('includedCountriesSelection', []);
                          } else {
                            field.onChange('');
                          }
                        }}
                      />
                      <Label for="exclude-countries" className="form-check-label">
                        Exclude Countries
                      </Label>
                    </div>
                  </div>
                )}
              />
            </Row>
            <Row className="mx-1 mb-2">
              <Col sm="12" md="6" lg="6" className="mb-50">
                <Controller
                  id="excludedCountriesSelection"
                  name="excludedCountriesSelection"
                  control={control}
                  invalid={errors.excludedCountriesSelection && true}
                  render={({ field }) => (
                    <div className="custom-multiselect">
                      <Select
                        isMulti
                        options={
                          watch('excludedCountriesSelection')
                            ? countryOptions.filter(
                                (option) => !watch('excludedCountriesSelection').includes(option.value),
                              )
                            : countryOptions
                        }
                        onChange={(selectedOptions) => field.onChange(selectedOptions)}
                        isDisabled={watch('includeOrExcludeCountries') !== 'exclude-countries'}
                        classNamePrefix="select"
                        placeholder="Select countries to be excluded"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.excludedCountriesSelection,
                        })}
                        {...field}
                      />
                    </div>
                  )}
                />
              </Col>
            </Row>
            {watch('excludedCountriesSelection') && watch('excludedCountriesSelection').length > 0 && (
              <Row className="mt-2 pb-0">
                <Label className="form-check-label mb-75">Selected countries -</Label>
                {watch('excludedCountriesSelection').map((country) => (
                  <div className="countries-pills" key={country.label}>
                    <Badge pill className="px-1 py-50 d-flex align-items-center">
                      <h6 className="m-0 fw-light">{country.label}</h6>
                      <Minus
                        size={18}
                        className="ms-50 cursor-pointer"
                        onClick={() => handleExcludedCountryRemove(country)}
                      />
                    </Badge>
                  </div>
                ))}
              </Row>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h4 className="m-0 mt-1">Project Pay Type</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            <Row className="mb-1">
              <Col sm="12" md="6" lg="3">
                <Label className="form-label" for="currencyType">
                  <h5 className="m-0 mb-25">
                    Select currency type
                    <span className="label-asterisk me-50">*</span>
                  </h5>
                </Label>
                <Controller
                  id="currencyType"
                  name="currencyType"
                  control={control}
                  invalid={errors.currencyType && true}
                  render={({ field }) => (
                    <Select
                      options={languageOptions}
                      classNamePrefix="select"
                      placeholder="Select currency"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.currencyType,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.currencyType && <FormFeedback>{errors.currencyType.label.message}</FormFeedback>}
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="6" lg="6">
                <Label className="form-label" for="projectPayType">
                  <h5 className="m-0">
                    Select project pay type
                    <span className="label-asterisk me-50">*</span>
                  </h5>
                </Label>
                <Controller
                  control={control}
                  name="projectPayType"
                  render={({ field }) => (
                    <div className="demo-inline-spacing m-0">
                      <div className="form-check form-check-inline checkbox-custom-margin">
                        <Input
                          type="radio"
                          {...field}
                          id="variable-price"
                          checked={field.value === 'variable-price'}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const value = 'variable-price';

                            if (isChecked) {
                              field.onChange(value);
                            } else {
                              field.onChange('');
                            }
                          }}
                        />
                        <Label for="variable-price" className="form-check-label">
                          Variable price
                        </Label>
                      </div>
                      <div className="form-check form-check-inline checkbox-custom-margin">
                        <Input
                          type="radio"
                          {...field}
                          id="fixed-price"
                          checked={field.value === 'fixed-price'}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const value = 'fixed-price';

                            if (isChecked) {
                              field.onChange(value);
                            } else {
                              field.onChange('');
                            }
                          }}
                        />
                        <Label for="fixed-price" className="form-check-label">
                          Fixed price
                        </Label>
                      </div>
                    </div>
                  )}
                />
                {errors.projectPayType && <FormFeedback>{errors.projectPayType.message}</FormFeedback>}
              </Col>
              {projectPayType === 'fixed-price' && (
                <Col sm="12" md="6" lg="3">
                  <Label className="form-label" for="projectFixedCost">
                    Project Fixed Cost<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="projectFixedCost"
                    name="projectFixedCost"
                    control={control}
                    invalid={errors.projectFixedCost && true}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        placeholder="Specify project fixed cost"
                        invalid={errors.projectFixedCost && true}
                      />
                    )}
                  />
                  {errors.projectFixedCost && <FormFeedback>{errors.projectFixedCost.message}</FormFeedback>}
                </Col>
              )}
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h4 className="m-0 mt-1">NDA</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            <Row>
              <Col sm="12" md="12" lg="12">
                <Label className="form-label" for="nda">
                  <h5 className="m-0">
                    Would you like to have an NDA for this project?
                    <span className="label-asterisk me-50">*</span>
                  </h5>
                </Label>
                <Controller
                  control={control}
                  name="nda"
                  render={({ field }) => (
                    <div className="demo-inline-spacing m-0">
                      <div className="form-check form-check-inline checkbox-custom-margin">
                        <Input
                          type="radio"
                          {...field}
                          id="yes"
                          checked={field.value === 'yes'}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const value = 'yes';

                            if (isChecked) {
                              field.onChange(value);
                            } else {
                              field.onChange('');
                            }
                          }}
                        />
                        <Label for="yes" className="form-check-label">
                          Yes
                        </Label>
                      </div>
                      <div className="form-check form-check-inline checkbox-custom-margin">
                        <Input
                          type="radio"
                          {...field}
                          id="no"
                          checked={field.value === 'no'}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const value = 'no';

                            if (isChecked) {
                              field.onChange(value);
                            } else {
                              field.onChange('');
                            }
                          }}
                        />
                        <Label for="no" className="form-check-label">
                          No
                        </Label>
                      </div>
                    </div>
                  )}
                />
                {errors.nda && <FormFeedback>{errors.nda.message}</FormFeedback>}
              </Col>
            </Row>
          </CardBody>
        </Card>
        <div className="d-flex justify-content-end">
          <Button color="primary">
            <span className="me-50">Save & Continue</span>
            <ChevronRight size={14} />
          </Button>
        </div>
      </Form>
    </RequirementsFormContainer>
  );
};

export default Requirements;

Requirements.propTypes = {
  stepper: Proptypes.object,
};

Requirements.defaultProps = {
  stepper: {},
};
