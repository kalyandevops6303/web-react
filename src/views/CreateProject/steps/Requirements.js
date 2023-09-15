/* eslint-disable arrow-body-style */
/* eslint-disable no-unsafe-optional-chaining */
import { useCallback, useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRight, FileText, Info, Minus, Upload } from 'react-feather';
import 'react-quill/dist/quill.snow.css';
import { AsyncPaginate } from 'react-select-async-paginate';
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
  CardText,
  CardTitle,
} from 'reactstrap';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useDropzone from '../../../lib/react-dropzone';
import { DropzoneContainer, RequirementsFormContainer } from '../style';
import { UploadIconContainer } from '../../Onboarding/style';
import theme from '../../../configs/themeVariables';
import {
  countriesService,
  currenciesService,
  skillsService,
  timezonesService,
  toolsService,
} from '../../../services/staticServices';
import timeOptions from '../../../utility/constants/TimeDropdownOptions';
import { userData } from '../../../redux/selectors/dashboardSelectors';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';
import { projectFileUploadService, projectFileUploadToAzureService } from '../../../services/createProjectServices';
import { USD, maxFileSize } from '../../../utility/constants/Constant';
import uuidv4 from '../../../lib/uuidv4';
import TryAIModal from '../TryAIModal';
import { skillsListAI, toolsListAI } from '../../../redux/selectors/staticSelectors';
import { clearAIToolsAndSkills } from '../../../redux/reducers/static';

const Requirements = ({ stepper, setProjectDetails, files, setFiles }) => {
  const ProjectDetailsSchema = yup.object().shape({
    projectName: yup
      .string()
      .min(4, 'Project name must be at least 4 characters')
      .max(150, 'Project name must be 150 characters or less')
      .required('Project name is required'),
    expectedDuration: yup
      .number()
      .when('expectedDurationPeriod', {
        is: (expectedDurationPeriod) => expectedDurationPeriod.value === 'WEEK',
        then: () =>
          yup
            .number()
            .min(1, 'Expected duration should be at least 1 week')
            .max(12, 'Expected duration cannot be greater than 12 weeks')
            .integer('Expected duration should be a number')
            .typeError('Please enter a number')
            .required('Expected duration is required'),
      })
      .when('expectedDurationPeriod', {
        is: (expectedDurationPeriod) => expectedDurationPeriod.value === 'DAY',
        then: () =>
          yup
            .number()
            .min(1, 'Expected duration should be at least 1 day')
            .max(90, 'Expected duration cannot be greater than 90 days')
            .integer('Expected duration should be a number')
            .typeError('Please enter a number')
            .required('Expected duration is required'),
      }),
    expectedDurationPeriod: yup
      .object()
      .shape({
        label: yup.string().required('Period is required'),
        value: yup.string().required('Period is required'),
      })
      .required('Period is required'),
    projectDescription: yup
      .string()
      .min(100, 'Project description must be at least 100 characters')
      .max(3000, 'Project description must be 3000 characters or less')
      .required('Project description is required'),
    skills: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'Five skills has to be added')
      .min(5, 'Five skills has to be added')
      .required('Skill is required'),
    tools: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'Five tools has to be added')
      .min(5, 'Five tools has to be added'),
    preferredWorkingTimeZone: yup
      .object()
      .shape({
        label: yup.string().required('Preferred time zone is required'),
        value: yup.object().required('Preferred time zone is required'),
      })
      .required('Preferred time zone is required'),
    minTimeOverlapHr: yup
      .number()
      .min(0, 'Desired time overlap should be greater than or equal to 0')
      .max(24, 'Desired time overlap should not be greater than 24')
      .test('maxDigitsAfterDecimal', 'Desired time overlap should be upto one decimal place', (number) =>
        /^\d+(\.\d{1,1})?$/.test(number),
      )
      .typeError('Please enter a number')
      .required('Desired time overlap is required'),
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
        label: yup.string().required('Currency is required'),
        value: yup.object().required('Currency is required'),
      })
      .required('Currency is required'),
    projectPayType: yup.string().required('Payment type is required'),
    projectFixedCost: yup.number().when('projectPayType', {
      is: (projectPayType) => projectPayType === 'fixed-price',
      then: () =>
        yup
          .number()
          .min(1, 'Fixed cost is required')
          .integer('Fixed cost must be an integer')
          .typeError('Please enter a number')
          .required('Fixed cost is required'),
    }),
    nda: yup.string().required('NDA is required'),
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ProjectDetailsSchema),
    defaultValues: {
      projectName: '',
      expectedDurationPeriod: { label: 'Weeks', value: 'WEEK' },
      projectDescription: '',
      availabilityDays: [],
      weekdays: [],
      weekends: [],
      currencyType: { label: 'US Dollar', value: USD },
    },
  });

  const [skillsOptions, setSkillsOptions] = useState(null);
  const [toolsOptions, setToolsOptions] = useState(null);
  const [timezonesOptions, setTimezonesOptions] = useState(null);
  const [countriesOptions, setCountriesOptions] = useState(null);
  const [currenciesOptions, setCurrenciesOptions] = useState(null);
  const [tryAIModal, setTryAIModal] = useState(null);

  const skillsFromAI = useSelector(skillsListAI);
  const toolsFromAI = useSelector(toolsListAI);

  const dispatch = useDispatch();

  useEffect(() => {
    clearErrors('expectedDuration');
  }, [watch('expectedDurationPeriod')]);

  const loadSkillsOptions = async (search) => {
    if (search) {
      return {
        options: skillsOptions.filter(
          (skill) =>
            skill.label.toLowerCase().startsWith(search.toLowerCase()) ||
            skill.label.toLowerCase().includes(search.toLowerCase()),
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

  const loadToolsOptions = async (search) => {
    if (search) {
      return {
        options: toolsOptions.filter(
          (tool) =>
            tool.label.toLowerCase().startsWith(search.toLowerCase()) ||
            tool.label.toLowerCase().includes(search.toLowerCase()),
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

  const loadTimezonesOptions = async (search) => {
    if (search) {
      return {
        options: timezonesOptions.filter(
          (timezone) =>
            timezone.label.toLowerCase().startsWith(search.toLowerCase()) ||
            timezone.label.toLowerCase().includes(search.toLowerCase()),
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

  const loadCountriesOptions = async (search) => {
    if (search) {
      return {
        options: countriesOptions.filter(
          (country) =>
            country.label.toLowerCase().startsWith(search.toLowerCase()) ||
            country.label.toLowerCase().includes(search.toLowerCase()),
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

  const loadCurrenciesOptions = async (search) => {
    if (search) {
      return {
        options: currenciesOptions.filter(
          (currency) =>
            currency.label.toLowerCase().startsWith(search.toLowerCase()) ||
            currency.label.toLowerCase().includes(search.toLowerCase()),
        ),
      };
    }
    try {
      const response = await currenciesService();

      const options = response?.data?.data?.map((currency) => ({ label: currency.name, value: currency }));

      setCurrenciesOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  const onSubmit = (data) => {
    setProjectDetails(data);
    stepper.next();
  };

  const onSuccess = (data) => {
    const { aiData } = data;
    if ('title' in aiData) {
      setValue('projectName', aiData?.title, { shouldValidate: true });
    }
    if ('executive_summary' in aiData) {
      setValue('projectDescription', aiData?.executive_summary, { shouldValidate: true });
    }
    if ('duration' in aiData) {
      setValue('expectedDuration', aiData?.duration, { shouldValidate: true });
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearAIToolsAndSkills());
    };
  }, []);

  useEffect(() => {
    if (skillsFromAI && skillsFromAI?.length > 0) {
      setValue(
        'skills',
        skillsFromAI?.map((skill) => ({ label: skill.name, value: skill._id })),
        { shouldValidate: true },
      );
    }
  }, [skillsFromAI]);

  useEffect(() => {
    if (toolsFromAI && toolsFromAI?.length > 0) {
      setValue(
        'tools',
        toolsFromAI?.map((tool) => ({ label: tool.name, value: tool._id })),
        { shouldValidate: true },
      );
    }
  }, [toolsFromAI]);

  const isFileValid = (file) => {
    if (file.size > maxFileSize) {
      ShowToastMessage(ERROR, `${file.name} size exceeds the maximum limit (5MB).`);
      return false;
    }
    return true;
  };

  const [uploadingFiles, setUploadingFiles] = useState([]);

  const filesRef = useRef();

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const handleUploadFile = async (file) => {
    try {
      setUploadingFiles((prevFiles) => [...prevFiles, file]);

      await projectFileUploadToAzureService(file.uploadData.upload_url, file.file, {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': file.file.type,
      });
    } catch (error) {
      ShowToastMessage(ERROR, 'Something went wrong. Please try uploading again.');
    } finally {
      setUploadingFiles((prevFiles) => prevFiles.filter((f) => f.file !== file.file));
    }
  };

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    rejectedFiles.forEach((file) =>
      ShowToastMessage(ERROR, `${file.file.name} is not of a valid supported file type (PDF, DOC, DOCX, TXT or JPEG).`),
    );

    const fetchUploadUrls = async () => {
      const allFiles = [...filesRef.current, ...acceptedFiles];

      if (allFiles?.length > 5) {
        ShowToastMessage(ERROR, 'Maximum 5 files allowed');
      } else {
        const validFiles = acceptedFiles.filter((file) => isFileValid(file));

        const promises = validFiles.map(async (file) => {
          const response = await projectFileUploadService(file.name);
          return { id: uuidv4(), file, uploadData: response?.data?.data };
        });

        const filesWithUrls = await Promise.all(promises);
        setFiles((oldFiles) => [...oldFiles, ...filesWithUrls]);

        filesWithUrls.forEach((fileWithUrl) => handleUploadFile(fileWithUrl));
      }
    };
    fetchUploadUrls();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'text/application': ['.pdf', '.doc', '.docx'],
      'text/plain': ['.txt'],
      'image/jpeg': ['.jpeg'],
    },
    onDrop,
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
    const filtered = uploadedFiles.filter((i) => i.id !== file.id);
    setFiles([...filtered]);
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} MB`;
      // eslint-disable-next-line
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} KB`;
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
            key={file.id}
            className={index !== files.length - 1 ? 'd-flex align-items-center mb-1' : 'd-flex align-items-center'}
          >
            <Col sm="6" md="4" lg="4">
              {renderFilePreview(file.file)}
              {file.file.name}
            </Col>
            <Col sm="6" md="2" lg="2">
              {uploadingFiles.includes(file) ? <span>Uploading...</span> : <span>Uploaded</span>}
            </Col>
            <Col sm="2" md="2" lg="2">
              {renderFileSize(file.file.size)}
            </Col>
            <Col sm="2" md="2" lg="2">
              {requiredFormattedDate}
            </Col>
            <Col sm="2" md="2" lg="2">
              <Button
                color="flat-danger"
                className="btn-left-margin"
                disabled={uploadingFiles.includes(file)}
                onClick={() => handleRemoveFile(file)}
              >
                Remove
              </Button>
            </Col>
          </Row>
        ))}
      </Card>
    </div>
  );

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

  const handleAIClick = () => {
    setTryAIModal(true);
  };

  const userDetailsData = useSelector(userData);

  useEffect(() => {
    if (userDetailsData) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      if ('timezone' in userDetailsData?.availability) {
        setValue(
          'preferredWorkingTimeZone',
          {
            label: `${userDetailsData?.availability?.timezone?.name} (${userDetailsData?.availability?.timezone?.abbreviation})`,
            value: userDetailsData?.availability?.timezone,
          },
          { shouldValidate: true },
        );

        let clientAvailabilityDays = [];

        if (userDetailsData?.availability?.weekdays_avl && 'days' in userDetailsData?.availability?.weekdays_avl) {
          clientAvailabilityDays = [...clientAvailabilityDays, 'weekdays'];
          setValue('weekdays', userDetailsData?.availability?.weekdays_avl?.days, { shouldValidate: true });
          setValue(
            'weekdayStartTime',
            timeOptions.find(
              (time) => parseInt(time.value, 10) === userDetailsData?.availability?.weekdays_avl?.start_time,
            ),
            { shouldValidate: true },
          );
          setValue(
            'weekdayEndTime',
            timeOptions.find(
              (time) => parseInt(time.value, 10) === userDetailsData?.availability?.weekdays_avl?.end_time,
            ),
            { shouldValidate: true },
          );
        }
        if (userDetailsData?.availability?.weekends_avl && 'days' in userDetailsData?.availability?.weekends_avl) {
          clientAvailabilityDays = [...clientAvailabilityDays, 'weekends'];
          setValue('weekends', userDetailsData?.availability?.weekends_avl?.days, { shouldValidate: true });
          setValue(
            'weekendStartTime',
            timeOptions.find(
              (time) => parseInt(time.value, 10) === userDetailsData?.availability?.weekends_avl?.start_time,
            ),
            { shouldValidate: true },
          );
          setValue(
            'weekendEndTime',
            timeOptions.find(
              (time) => parseInt(time.value, 10) === userDetailsData?.availability?.weekends_avl?.end_time,
            ),
            { shouldValidate: true },
          );
        }

        setValue('availabilityDays', clientAvailabilityDays, { shouldValidate: true });
      }
    }
  }, [userDetailsData]);

  return (
    <>
      {tryAIModal && (
        <TryAIModal modal={tryAIModal} toggleModal={() => setTryAIModal(!tryAIModal)} onSuccess={onSuccess} />
      )}
      <RequirementsFormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>
                <h4 className="m-0 mt-1">Project Details</h4>
              </CardTitle>
              <CardText>
                <Button onClick={handleAIClick} color="primary" className="d-flex align-items-center">
                  <span className="me-50">Try AI Assist</span>
                  <ChevronRight size={14} />
                </Button>
              </CardText>
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
                        onWheel={(e) => e.target.blur()}
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
                          { label: 'Weeks', value: 'WEEK' },
                          { label: 'Days', value: 'DAY' },
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
                  {errors.expectedDurationPeriod && (
                    <FormFeedback>{errors.expectedDurationPeriod.message}</FormFeedback>
                  )}
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
                        placeholder="Add background and requirements"
                        rows="5"
                        invalid={errors.projectDescription && true}
                      />
                    )}
                  />
                  {errors.projectDescription && <FormFeedback>{errors.projectDescription.message}</FormFeedback>}
                </Col>
              </Row>
              <Row>
                <Label className="form-label">
                  Upload detailed requirements document (optional){' '}
                  <Info size={18} color={theme.infoIcon} id="document" />
                  <UncontrolledTooltip placement="right" target="document">
                    <div className="d-flex flex-column align-items-start">
                      <p className="m-0">Allowed file types:</p>
                      <p className="m-0">pdf, doc, docx, txt, jpeg</p>
                      <p className="m-0">Max files: 5</p>
                      <p className="m-0">Max file size: 5MB</p>
                    </div>
                  </UncontrolledTooltip>
                </Label>
                {files.length ? (
                  <>
                    <div className="px-1 mt-50">{fileList()}</div>
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
                  <Row>
                    <Col sm="12" md="12" lg="6">
                      <DropzoneContainer>
                        <div {...getRootProps({ className: 'dropzone' })}>
                          <input {...getInputProps()} />
                          <div className="d-flex align-items-center justify-content-center flex-column p-3">
                            <h4 className="font-medium-1">Drop files here or click to upload</h4>
                            <p className="text-secondary font-small-5 text-center mt-50 fw-light">
                              (This is just a demo dropzone. Selected files are not actually uploaded.)
                            </p>
                          </div>
                        </div>
                      </DropzoneContainer>
                    </Col>
                  </Row>
                )}
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h4 className="m-0 mt-1">Technical Requirements</h4>
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
                <Col sm="12" md="6" lg="3">
                  <Label className="form-label" for="minTimeOverlapHr">
                    Desired Time Overlap<span className="label-asterisk">*</span>
                  </Label>
                  <Info size={18} color={theme.infoIcon} id="desired-time" className="ms-25" />
                  <UncontrolledTooltip placement="right" target="desired-time">
                    <div className="d-flex flex-column align-items-start">
                      For collaboration with <br /> project team
                    </div>
                  </UncontrolledTooltip>

                  <Controller
                    id="minTimeOverlapHr"
                    name="minTimeOverlapHr"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        step={0.1}
                        onWheel={(e) => e.target.blur()}
                        placeholder="Enter number of hours"
                        invalid={errors.minTimeOverlapHr && true}
                      />
                    )}
                  />
                  {errors.minTimeOverlapHr && <FormFeedback>{errors.minTimeOverlapHr.message}</FormFeedback>}
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
                                  watch('preferredWorkingTimeZone').value.abbreviation}
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
                              <h5 className="m-0">Weekends </h5>
                              <p className="m-0 mx-1 px-50 time-zone-border">
                                {watch('preferredWorkingTimeZone') &&
                                  watch('preferredWorkingTimeZone').value.abbreviation}
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
          <Card>
            <CardHeader>
              <h4 className="m-0 mt-1">Country - Inclusions and Exclusions (Optional)</h4>
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody>
              <Row className="mb-1">
                <Controller
                  control={control}
                  name="includeOrExcludeCountries"
                  render={({ field }) => (
                    <div className="demo-inline-spacing mx-25">
                      <div className="form-check form-check-inline checkbox-custom-margin custom-checkbox-border">
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
                          Included Countries
                        </Label>
                        <Info size={18} color={theme.infoIcon} id="time-zone-info-weekday" className="ms-50" />
                        <UncontrolledTooltip placement="right" target="time-zone-info-weekday">
                          <div className="d-flex flex-column align-items-start">
                            <p className="m-0">Project will only be listed in these countries</p>
                          </div>
                        </UncontrolledTooltip>
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
                        <AsyncPaginate
                          isMulti
                          loadOptions={loadCountriesOptions}
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
                  <Label className="form-check-label mb-75">Selected countries:</Label>

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
                      <div className="form-check form-check-inline checkbox-custom-margin custom-checkbox-border">
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
                          Excluded Countries
                        </Label>
                        <Info size={18} color={theme.infoIcon} id="exclude-country" className="ms-50" />
                        <UncontrolledTooltip placement="right" target="exclude-country">
                          <div className="d-flex flex-column align-items-start">
                            <p className="m-0">Project will not be listed in these countries</p>
                          </div>
                        </UncontrolledTooltip>
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
                        <AsyncPaginate
                          isMulti
                          loadOptions={loadCountriesOptions}
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
                  <Label className="form-check-label mb-75">Selected countries:</Label>
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
              <h4 className="m-0 mt-1">Payment</h4>
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody>
              <Row className="mb-1">
                <Col sm="12" md="6" lg="3">
                  <Label className="form-label" for="currencyType">
                    <h5 className="m-0 mb-25">
                      Currency
                      <span className="label-asterisk me-50">*</span>
                    </h5>
                  </Label>
                  <Controller
                    id="currencyType"
                    name="currencyType"
                    control={control}
                    invalid={errors.currencyType && true}
                    render={({ field }) => (
                      <AsyncPaginate
                        isDisabled
                        loadOptions={loadCurrenciesOptions}
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
                      Payment type
                      <span className="label-asterisk me-50">*</span>
                    </h5>
                  </Label>
                  <Controller
                    control={control}
                    name="projectPayType"
                    render={({ field }) => (
                      <div className="demo-inline-spacing m-0">
                        <div className="form-check form-check-inline checkbox-custom-margin custom-checkbox-border">
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
                            Variable cost
                          </Label>
                        </div>
                        <div className="form-check form-check-inline checkbox-custom-margin custom-checkbox-border">
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
                            Fixed cost
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
                      Fixed Cost{`${watch('currencyType') ? ` in ${watch('currencyType')?.value?.code}` : ''}`}
                      <span className="label-asterisk me-50">*</span>
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
                          step="any"
                          onWheel={(e) => e.target.blur()}
                          placeholder="Enter amount"
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
                      NDA required?
                      <span className="label-asterisk me-50">*</span>
                    </h5>
                  </Label>
                  <Controller
                    control={control}
                    name="nda"
                    render={({ field }) => (
                      <div className="demo-inline-spacing m-0">
                        <div className="form-check form-check-inline checkbox-custom-margin custom-checkbox-border">
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
                        <div className="form-check form-check-inline checkbox-custom-margin custom-checkbox-border">
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
            <Button color="primary" disabled={uploadingFiles.length > 0}>
              <span className="me-50">Save & Continue</span>
              <ChevronRight size={14} />
            </Button>
          </div>
        </Form>
      </RequirementsFormContainer>
    </>
  );
};

export default Requirements;

Requirements.propTypes = {
  stepper: Proptypes.object,
  setProjectDetails: Proptypes.func,
  files: Proptypes.array,
  setFiles: Proptypes.func,
};

Requirements.defaultProps = {
  stepper: {},
  setProjectDetails: () => {},
  files: [],
  setFiles: () => {},
};
