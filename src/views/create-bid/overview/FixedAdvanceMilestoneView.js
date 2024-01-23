/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-else-return */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
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
import classNames from 'classnames';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import * as yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft, ChevronRight, FileText, Info, Plus, Upload } from 'react-feather';
import { MilestoneSectionWrapper } from '../style';
import { UploadIconContainer } from '../../Onboarding/style';
import theme from '../../../configs/themeVariables';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';
import { maxFileSize, userTypes } from '../../../utility/constants/Constant';
import { DropzoneContainer } from '../../CreateProject/style';
import { formatDateWithDash } from '../../../utility/Utils';
import { getBidDetails, saveSetMilestones } from '../../../redux/actions/createBidActions';
import { bidDetailsLoading, projectDetails, setMilestonesLoading } from '../../../redux/selectors/createBidSelectors';
import uuidv4 from '../../../lib/uuidv4';
import { milestoneFileUploadService, milestoneFileUploadToAzureService } from '../../../services/createBidServices';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

const FixedAdvanceMilestoneView = () => {
  const MilestoneDetailsSchema = yup.object().shape({
    estimatedStartDate: yup.date().typeError('Start date is required').required('Start date is required'),
    milestones: yup.array().of(
      yup.object().shape({
        milestoneId: yup.string(),
        name: yup
          .string()
          .min(4, 'Name must be at least 4 characters')
          .max(50, 'Name must be 50 characters or less')
          .required('Name is required'),
        description: yup
          .string()
          .min(4, 'Description must be at least 4 characters')
          .max(500, 'Description must be 500 characters or less')
          .transform((value) => (value === '' ? undefined : value))
          .optional(),
        deliverables: yup
          .array()
          .of(
            yup
              .string()
              .min(4, 'Deliverable must be at least 4 characters')
              .max(50, 'Deliverable must be 50 characters or less')
              .transform((value) => (value === '' ? undefined : value))
              .required('Deliverable is required'),
          )
          .min(1, 'At least 1 deliverable is required')
          .required('At least 1 deliverable is required'),
        otherDetails: yup.object().optional(),
        workers: yup.array().of(
          yup.object().shape({
            role: yup.string().required(),
            isChecked: yup.boolean().required(),
            duration: yup.number().when('isChecked', {
              is: (isChecked) => isChecked === true,
              then: () =>
                yup
                  .number()
                  .min(1, 'Duration must be at least 1')
                  .integer('Duration must be a integer')
                  .transform((value) => (Number.isNaN(value) ? undefined : value))
                  .typeError('Please enter a number')
                  .required('Duration is required'),
              otherwise: yup
                .number()
                .transform((value) => (Number.isNaN(value) ? undefined : value))
                .optional()
                .notRequired(),
            }),
            hours: yup.number().when('isChecked', {
              is: (isChecked) => isChecked === true,
              then: () =>
                yup
                  .number()
                  .min(1, 'Hours must be at least 1')
                  .max(168, 'Hours must be at most 168')
                  .integer('Hours must be an integer')
                  .transform((value) => (Number.isNaN(value) ? undefined : value))
                  .typeError('Please enter a number')
                  .required('Hours is required'),
              otherwise: yup
                .number()
                .transform((value) => (Number.isNaN(value) ? undefined : value))
                .optional()
                .notRequired(),
            }),
            otherDetails: yup.object().optional(),
          }),
        ),
      }),
    ),
  });

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(MilestoneDetailsSchema),
    defaultValues: {
      milestones: [
        {
          milestoneId: uuidv4(),
          name: undefined,
          description: undefined,
          deliverables: [undefined],
          otherDetails: {},
          workers: [],
        },
      ],
    },
  });

  const {
    fields: milestonesFields,
    append: milestonesAppend,
    remove: milestonesRemove,
    update: milestonesUpdate,
  } = useFieldArray({
    control,
    name: 'milestones',
  });

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const setMilestonesIsLoading = useSelector(setMilestonesLoading);
  const selectUserDetailsData = useSelector(selectUserData);
  const bidDetailsIsLoading = useSelector(bidDetailsLoading);
  const projectDetailsData = useSelector(projectDetails);

  const [files, setFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [removedMilestoneIds, setRemovedMilestoneIds] = useState([]);
  const [allWorkers, setAllWorkers] = useState([]);
  const filesRef = useRef();
  const allMilestones = useWatch({ control, name: 'milestones' });

  const [open, setOpen] = useState(1);
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const calculateMilestoneValues = (milestoneIndex) => {
    const milestoneDuration = allMilestones[milestoneIndex]?.workers
      ?.filter((worker) => worker.isChecked && worker.duration)
      .reduce((max, worker) => Math.max(max, worker.duration), 0);
    const milestoneHours = allMilestones[milestoneIndex]?.workers
      ?.filter((worker) => worker.isChecked && worker.duration && worker.hours)
      .reduce((sum, worker) => sum + worker.duration * worker.hours, 0);
    const milestoneCost = allMilestones[milestoneIndex]?.workers
      ?.filter((worker) => worker.isChecked && worker.duration && worker.hours)
      .reduce((sum, worker) => sum + worker.duration * worker.hours * worker.otherDetails.hourly_rate, 0);

    return { milestoneDuration, milestoneHours, milestoneCost };
  };

  const calculateTotalValues = () => {
    const totalDuration = allMilestones
      .map((milestone) => {
        const maxDuration = milestone.workers
          .filter((worker) => worker.isChecked && worker.duration)
          .reduce((max, worker) => Math.max(max, worker.duration), 0);

        return maxDuration;
      })
      .reduce((sum, duration) => sum + duration, 0);

    const totalHours = allMilestones
      .map((milestone) => {
        const sumHours = milestone.workers
          .filter((worker) => worker.isChecked && worker.duration && worker.hours)
          .reduce((sum, worker) => sum + worker.duration * worker.hours, 0);

        return sumHours;
      })
      .reduce((sum, hours) => sum + hours, 0);

    const totalCost = allMilestones
      .map((milestone) => {
        const sumCost = milestone.workers
          .filter((worker) => worker.isChecked && worker.duration && worker.hours)
          .reduce((sum, worker) => sum + worker.duration * worker.hours * worker.otherDetails.hourly_rate, 0);

        return sumCost;
      })
      .reduce((sum, costs) => sum + costs, 0);

    return { totalDuration, totalHours, totalCost };
  };

  const { totalDuration, totalHours, totalCost } = calculateTotalValues();

  const cleanArrayOfObjects = (arr) =>
    arr.map((obj) => {
      const cleanedObj = Object.keys(obj).reduce((acc, key) => {
        if (obj[key] !== undefined) {
          if (Array.isArray(obj[key])) {
            const cleanedArray = obj[key].filter((item) => item !== undefined);
            if (cleanedArray.length > 0) {
              acc[key] = cleanedArray;
            }
          } else {
            acc[key] = obj[key];
          }
        }
        return acc;
      }, {});

      return cleanedObj;
    });

  const onSuccess = () => {
    navigate(`/create-bid/${params.projectId}/${params.bidType.toLowerCase()}/${params.bidId}/preview`);
  };

  const onSubmit = (data) => {
    const { estimatedStartDate, milestones } = data;

    const project_start_date = formatDateWithDash(estimatedStartDate);
    const total_estimated_duration = {
      duration: totalDuration,
      duration_type: 'WEEK',
    };
    const total_estimated_cost = totalCost;
    const total_numbers_of_hours = totalHours;
    const newMilestones = milestones.filter((milestone) => !('_id' in milestone.otherDetails));
    const updatedMilestones = milestones.filter((milestone) => '_id' in milestone.otherDetails);
    const maxSeqValue = updatedMilestones.reduce((max, obj) => Math.max(max, obj?.otherDetails?.seq), 0);
    const create_milestones = newMilestones.map((milestone, index) => {
      const reqIndex = allMilestones.findIndex((mile) => mile.milestoneId === milestone.milestoneId);

      const { milestoneDuration, milestoneHours, milestoneCost } = calculateMilestoneValues(reqIndex);

      return {
        name: milestone.name,
        description: milestone.description,
        estimated_duration: {
          duration: milestoneDuration,
          duration_type: 'WEEK',
        },
        estimated_cost: milestoneCost,
        numbers_of_hours: milestoneHours,
        deliverables: milestone.deliverables,
        workers: milestone.workers
          .filter((worker) => worker.isChecked)
          .map((worker) => ({
            role: worker.role,
            first_name: worker.otherDetails.first_name,
            last_name: worker.otherDetails.last_name,
            user_id: worker.otherDetails.user_id,
            hourly_rate: worker.otherDetails.hourly_rate,
            number_of_weeks: Number(worker.duration),
            hours_per_week: Number(worker.hours),
          })),
        seq: maxSeqValue + index + 1,
      };
    });
    const update_milestones = updatedMilestones.map((milestone) => {
      const reqIndex = allMilestones.findIndex((mile) => mile.milestoneId === milestone.milestoneId);

      const { milestoneDuration, milestoneHours, milestoneCost } = calculateMilestoneValues(reqIndex);

      return {
        name: milestone.name,
        description: milestone.description,
        estimated_duration: {
          duration: milestoneDuration,
          duration_type: 'WEEK',
        },
        estimated_cost: milestoneCost,
        numbers_of_hours: milestoneHours,
        deliverables: milestone.deliverables,
        milestone_id: milestone.otherDetails._id,
        workers: milestone.workers
          .filter((worker) => worker.isChecked)
          .map((worker) => ({
            role: worker.role,
            first_name: worker.otherDetails.first_name,
            last_name: worker.otherDetails.last_name,
            user_id: worker.otherDetails.user_id,
            hourly_rate: worker.otherDetails.hourly_rate,
            number_of_weeks: Number(worker.duration),
            hours_per_week: Number(worker.hours),
          })),
        seq: milestone.otherDetails.seq,
      };
    });
    const removed_milestone_ids = removedMilestoneIds.filter((id) => id !== undefined);
    const documents = files.map((file) => ({
      file_name: file?.file?.name || file?.file?.file_name,
      file_key: file.uploadData.file_key,
    }));

    const reqData = {
      project_start_date,
      total_estimated_duration,
      total_estimated_cost,
      total_numbers_of_hours,
      documents,
      create_milestones: cleanArrayOfObjects(create_milestones),
      update_milestones: cleanArrayOfObjects(update_milestones),
      removed_milestone_ids,
    };

    dispatch(saveSetMilestones(params.projectId, params.bidId, reqData, onSuccess));
  };

  const handleAddDeliverable = (milestoneIndex, defaultValue = '') => {
    const milestoneDeliverables = getValues('milestones')[milestoneIndex].deliverables;

    const newData = {
      ...getValues('milestones')[milestoneIndex],
      deliverables: [...milestoneDeliverables, defaultValue],
    };

    if (milestoneDeliverables.every((deliverable) => deliverable?.trim() !== '' && deliverable !== undefined)) {
      milestonesUpdate(milestoneIndex, newData);
    } else {
      ShowToastMessage(ERROR, 'Please fill all deliverables before adding a new one.');
    }
  };

  const handleRemoveDeliverable = (milestoneIndex, deliverableIndex) => {
    const milestoneDeliverables = getValues('milestones')[milestoneIndex].deliverables;
    const newDeliverables = milestoneDeliverables.filter((_, index) => index !== deliverableIndex);
    const newData = {
      ...getValues('milestones')[milestoneIndex],
      deliverables: [...newDeliverables],
    };
    milestonesUpdate(milestoneIndex, newData);
  };

  const handleAddMilestone = () => {
    const allMilestonesValid = getValues('milestones').every(
      (milestone) =>
        milestone.name?.trim() !== '' &&
        milestone.workers.length > 0 &&
        milestone.workers.filter((worker) => worker.isChecked).length > 0 &&
        milestone.workers
          .filter((worker) => worker.isChecked)
          .every((worker) => worker.duration > 0 && worker.hours > 0) &&
        milestone.deliverables.every((deliverable) => deliverable?.trim() !== '' && deliverable !== undefined),
    );

    if (!allMilestonesValid) {
      ShowToastMessage(ERROR, 'Please fill all required fields for existing milestones before adding a new one.');
    } else if (totalCost > projectDetailsData?.pay_type?.fixed_cost) {
      ShowToastMessage(ERROR, 'Please adjust total cost to be less than project fixed cost.');
    } else if (allMilestonesValid && totalCost <= projectDetailsData?.pay_type?.fixed_cost) {
      milestonesAppend({
        milestoneId: uuidv4(),
        name: undefined,
        description: undefined,
        deliverables: [undefined],
        otherDetails: {},
        workers: allWorkers.map((worker) => ({
          role: worker.role,
          duration: undefined,
          hours: undefined,
          isChecked: true,
          otherDetails: worker,
        })),
      });

      toggle(getValues('milestones')?.length);
    } else {
      ShowToastMessage(ERROR, 'Please fill all required fields for existing milestones before adding a new one.');
    }
  };

  const isFileValid = (file) => {
    if (file.size > maxFileSize) {
      ShowToastMessage(ERROR, `${file.name} size exceeds the maximum limit (5MB).`);
      return false;
    }
    return true;
  };

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const handleUploadFile = async (file) => {
    try {
      setUploadingFiles((prevFiles) => [...prevFiles, file]);

      await milestoneFileUploadToAzureService(file.uploadData.upload_url, file.file, {
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
          const response = await milestoneFileUploadService(file.name);
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

  const renderFilePreview = () => <FileText size="18" className="me-75 mb-50" />;

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

  const requiredFormattedDate = (date = new Date()) => {
    const formattedDate = new Date(date)
      .toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      .replace(',', '')
      .split(' ');
    return `${formattedDate[1]} ${formattedDate[0]} ${formattedDate[2]}`;
  };

  const fileList = () => (
    <div className="custom-card mb-1">
      <Card className="p-1">
        {files.map((file, index) => (
          <Row
            key={file.id}
            className={index !== files.length - 1 ? 'd-flex align-items-center mb-1' : 'd-flex align-items-center'}
          >
            <Col sm="6" md="4" lg="4">
              {renderFilePreview()}
              {file?.file?.name || file?.file?.file_name}
            </Col>
            <Col sm="6" md="2" lg="2">
              {uploadingFiles.includes(file) ? <span>Uploading...</span> : <span>Uploaded</span>}
            </Col>
            <Col sm="2" md="2" lg="2">
              {renderFileSize(file.file.size)}
            </Col>
            <Col sm="2" md="2" lg="2">
              {requiredFormattedDate(file?.file?.created_at)}
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

  const onGetBidDetailsSuccess = (res) => {
    if (res) {
      if (res?.project_start_date > 0) {
        setValue('estimatedStartDate', new Date(res?.project_start_date), { shouldValidate: true });
      }
      if (res?.milestones?.length > 0) {
        const reqData = res?.milestones?.map((milestone) => ({
          milestoneId: uuidv4(),
          name: milestone?.name,
          description: milestone?.description,
          deliverables: milestone?.deliverables?.length > 0 ? milestone?.deliverables : [undefined],
          otherDetails: milestone,
          workers: res?.workers.map((worker) => {
            if (milestone.workers.find((w) => w.role === worker.role)) {
              const reqWorker = milestone.workers.find((w) => w.role === worker.role);

              return {
                role: reqWorker.role,
                duration: reqWorker.number_of_weeks,
                hours: reqWorker.hours_per_week,
                isChecked: true,
                otherDetails: reqWorker,
              };
            } else {
              return {
                role: worker.role,
                duration: undefined,
                hours: undefined,
                isChecked: false,
                otherDetails: worker,
              };
            }
          }),
        }));

        setValue('milestones', reqData, { shouldValidate: true });
      } else if (res?.workers?.length > 0) {
        const reqData = [
          {
            milestoneId: uuidv4(),
            name: undefined,
            description: undefined,
            deliverables: [undefined],
            otherDetails: {},
            workers: res?.workers.map((worker) => ({
              role: worker.role,
              duration: undefined,
              hours: undefined,
              isChecked: true,
              otherDetails: worker,
            })),
          },
        ];

        setValue('milestones', reqData, { shouldValidate: true });
      }
      if (res?.documents?.length > 0) {
        const reqFiles = res?.documents?.map((file) => ({
          file,
          id: uuidv4(),
          uploadData: {
            file_key: file?.file_key,
          },
        }));
        setFiles(reqFiles);
      }
      if (res?.workers?.length > 0) {
        setAllWorkers(res?.workers);
      }
    }
  };

  useEffect(() => {
    dispatch(getBidDetails(params.bidId, onGetBidDetailsSuccess));
    // eslint-disable-next-line no-undef
    setTimeout(() => window.scrollTo(0, 0), 30);
  }, []);

  return (
    <MilestoneSectionWrapper className="mt-2">
      {bidDetailsIsLoading ? (
        <ComponentSpinner className="mt-5" />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card className="gray-card-wrapper">
            <CardHeader className="p-0">
              <div className="w-100 pt-2 pb-1 px-1 gray-border-container">
                <h5 className="m-0 font-medium-1">
                  Create milestones that will make it easier to work on and track this project
                </h5>
              </div>
            </CardHeader>
            <CardBody className="pt-2 pb-0">
              {totalCost > projectDetailsData?.pay_type?.fixed_cost && (
                <div className="fixed-cost-banner error-banner mb-2 d-flex px-1 py-2">
                  <Info size={18} color={theme.red} className="me-50" />
                  <p className="font-medium-1 m-0 error">
                    <span className="fw-bolder font-medium-1">Alert :</span> You have exceeded the fixed price cost of
                    the project. Please adjust your cost in order to submit the bid
                  </p>
                </div>
              )}
              <div className="d-none fixed-cost-banner info-banner mb-2 d-flex px-1 py-2">
                <Info size={18} color={theme.activeNavPillText} className="me-50" />
                <p className="font-medium-1 m-0 info">
                  <span className="fw-bolder font-medium-1">Fixed Price:</span> The fixed cost will be equally
                  distributed between each talent
                </p>
              </div>
              <Card className="white-card-bg">
                <CardBody>
                  <Row className="d-flex justify-content-between">
                    <Col sm="12" md="12" lg="3" className="ps-50">
                      <div>
                        <Label className="form-label" for="estimatedStartDate">
                          Start Date<span className="label-asterisk me-50">*</span>
                        </Label>
                        <Controller
                          control={control}
                          id="estimatedStartDate"
                          name="estimatedStartDate"
                          render={({ field }) => (
                            <Flatpickr
                              {...field}
                              placeholder="Select start date"
                              options={{
                                minDate: 'today',
                                dateFormat: 'd-m-Y',
                              }}
                              className={classNames('form-control', {
                                'is-invalid': errors && errors.estimatedStartDate,
                              })}
                            />
                          )}
                        />
                        {errors.estimatedStartDate && <FormFeedback>{errors.estimatedStartDate.message}</FormFeedback>}
                      </div>
                    </Col>
                    <Col sm="12" md="12" lg="4" className="d-flex justify-content-between me-1">
                      <div>
                        <Label className="form-label">Total Duration</Label>
                        <p className="fw-bold font-medium-1 text-end mt-50 mb-0">{totalDuration}w</p>
                      </div>
                      <div>
                        <Label className="form-label">Total Hours</Label>
                        <p className="fw-bold font-medium-1 text-end mt-50 mb-0">{totalHours}h</p>
                      </div>
                      {/* <div>
                        <Label className="form-label me-2">Total Cost</Label>
                        <p className="fw-bold font-medium-1 text-end me-2 mt-50 mb-0">$ {totalCost}</p>
                      </div> */}
                      <div>
                        <div className="d-flex align-items-center m-0">
                          <Label className="form-label">Fixed Cost</Label>
                          <Info size={18} color={theme.infoIcon} id="fixed-info" className="ms-50" />
                          <UncontrolledTooltip placement="top" target="fixed-info">
                            Predetermined project cost fixed by the client
                          </UncontrolledTooltip>
                        </div>
                        <p className="fw-bold font-medium-1 text-end me-2 mt-50 mb-0">
                          $ {projectDetailsData?.pay_type?.fixed_cost}
                        </p>
                        {totalCost > projectDetailsData?.pay_type?.fixed_cost ? (
                          <p className="fw-bold font-small-3 text-end me-2 mb-0 red-amount">
                            - $ {totalCost - projectDetailsData?.pay_type?.fixed_cost}
                          </p>
                        ) : (
                          <p className="fw-bold font-small-3 text-end me-2 mb-0 green-amount">
                            + $ {projectDetailsData?.pay_type?.fixed_cost - totalCost}
                          </p>
                        )}
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Accordion className="mb-2" open={open} toggle={toggle}>
                {milestonesFields.map((milestone, milestoneIndex) => {
                  const { milestoneDuration, milestoneHours, milestoneCost } = calculateMilestoneValues(milestoneIndex);

                  return (
                    <Card className="white-card-bg" key={milestone.id}>
                      <CardBody className="p-0">
                        <AccordionItem className="py-0">
                          <AccordionHeader targetId={milestoneIndex + 1} className="py-0">
                            <Row className="d-flex justify-content-between align-items-center w-100">
                              <Col sm="12" md="12" lg="3">
                                <p className="fw-bold font-medium-1 m-0 ms-25">Milestone {milestoneIndex + 1}</p>
                              </Col>
                              <Col sm="12" md="12" lg="4" className="d-flex justify-content-between me-1 ps-5">
                                <div>
                                  <Label className="fw-normal form-label ">Duration</Label>
                                  <p className="fw-bold font-medium-1 mt-50 mb-0 text-end">{milestoneDuration}w</p>
                                </div>
                                <div className="ms-2">
                                  <Label className="fw-normal form-label ">Hours</Label>
                                  <p className="fw-bold font-medium-1 mt-50 mb-0 text-end">{milestoneHours}h</p>
                                </div>
                                <div>
                                  <Label className="fw-normal form-label">Talent Cost</Label>
                                  <p className="fw-bold font-medium-1 mt-50 mb-0 text-end">$ {milestoneCost}</p>
                                </div>
                              </Col>
                            </Row>
                          </AccordionHeader>
                          <AccordionBody accordionId={milestoneIndex + 1}>
                            <Row>
                              <Col sm="12" md="12" lg="6">
                                <Card>
                                  <CardBody>
                                    <p className="fw-bold font-medium-1 text-secondary mb-2">Milestone Details</p>
                                    <Label className="form-label" for="name">
                                      Milestone Name<span className="label-asterisk">*</span>
                                    </Label>
                                    <Controller
                                      id={`milestones[${milestoneIndex}].name`}
                                      name={`milestones[${milestoneIndex}].name`}
                                      control={control}
                                      invalid={
                                        errors &&
                                        errors.milestones &&
                                        errors.milestones.length > 0 &&
                                        errors.milestones[milestoneIndex] &&
                                        errors.milestones[milestoneIndex].name &&
                                        true
                                      }
                                      render={({ field }) => (
                                        <Input
                                          {...field}
                                          placeholder="Enter name"
                                          invalid={
                                            errors &&
                                            errors.milestones &&
                                            errors.milestones.length > 0 &&
                                            errors.milestones[milestoneIndex] &&
                                            errors.milestones[milestoneIndex].name &&
                                            true
                                          }
                                        />
                                      )}
                                    />
                                    {errors &&
                                      errors.milestones &&
                                      errors.milestones.length > 0 &&
                                      errors.milestones[milestoneIndex] &&
                                      errors.milestones[milestoneIndex].name && (
                                        <FormFeedback>{errors.milestones[milestoneIndex].name.message}</FormFeedback>
                                      )}
                                    <div className="d-flex mt-2">
                                      <Label className="form-label" for="description">
                                        Description
                                      </Label>
                                      <Info size={18} color={theme.infoIcon} id="logo-info" className="ms-50" />
                                    </div>
                                    <UncontrolledTooltip placement="right" target="logo-info">
                                      <p className="m-0">Give description in 500 characters or less</p>
                                    </UncontrolledTooltip>
                                    <Controller
                                      id={`milestones[${milestoneIndex}].description`}
                                      name={`milestones[${milestoneIndex}].description`}
                                      control={control}
                                      invalid={
                                        errors &&
                                        errors.milestones &&
                                        errors.milestones.length > 0 &&
                                        errors.milestones[milestoneIndex] &&
                                        errors.milestones[milestoneIndex].description &&
                                        true
                                      }
                                      render={({ field }) => (
                                        <Input
                                          {...field}
                                          type="textarea"
                                          rows="4"
                                          placeholder="Enter description in 500 characters"
                                          invalid={
                                            errors &&
                                            errors.milestones &&
                                            errors.milestones.length > 0 &&
                                            errors.milestones[milestoneIndex] &&
                                            errors.milestones[milestoneIndex].description &&
                                            true
                                          }
                                        />
                                      )}
                                    />
                                    {errors &&
                                      errors.milestones &&
                                      errors.milestones.length > 0 &&
                                      errors.milestones[milestoneIndex] &&
                                      errors.milestones[milestoneIndex].description && (
                                        <FormFeedback>
                                          {errors.milestones[milestoneIndex].description.message}
                                        </FormFeedback>
                                      )}
                                  </CardBody>
                                </Card>
                              </Col>
                              <Col sm="12" md="12" lg="6">
                                <Card>
                                  <CardBody>
                                    <Row className="mb-1">
                                      <Col sm="12" md="6" lg="5">
                                        <div className="d-flex align-items-center">
                                          <p className="roles-list-header m-0 me-50">Select Roles</p>
                                          <Info size={18} color={theme.infoIcon} id="selected-info" />
                                          <UncontrolledTooltip placement="top" target="selected-info">
                                            <p className="m-0">Select the role required to deliver this milestone</p>
                                          </UncontrolledTooltip>
                                        </div>
                                      </Col>
                                      <Col sm="12" md="6" lg="7">
                                        <Row>
                                          <Col sm="12" md="6" lg="6">
                                            <div className="d-flex align-items-center">
                                              <p className="roles-list-header m-0 me-50">Duration</p>
                                              <Info size={18} color={theme.infoIcon} id="duration-info" />
                                              <UncontrolledTooltip placement="top" target="duration-info">
                                                <p className="m-0">W = Week</p>
                                              </UncontrolledTooltip>
                                            </div>
                                          </Col>
                                          <Col sm="12" md="6" lg="6">
                                            <p className="roles-list-header m-0">Hours/week</p>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                    <Controller
                                      control={control}
                                      id={`milestones[${milestoneIndex}].workers`}
                                      name={`milestones[${milestoneIndex}].workers`}
                                      render={() => (
                                        <div>
                                          {milestone.workers.map((worker, workerIndex) => (
                                            <Row className="mb-1 d-flex align-items-center" key={worker.role}>
                                              <Col sm="12" md="6" lg="5">
                                                <Controller
                                                  id={`milestones[${milestoneIndex}].workers[${workerIndex}].isChecked`}
                                                  name={`milestones[${milestoneIndex}].workers[${workerIndex}].isChecked`}
                                                  control={control}
                                                  invalid={
                                                    errors &&
                                                    errors.milestones &&
                                                    errors.milestones.length > 0 &&
                                                    errors.milestones[milestoneIndex] &&
                                                    errors.milestones[milestoneIndex].workers &&
                                                    errors.milestones[milestoneIndex].workers.length > 0 &&
                                                    errors.milestones[milestoneIndex].workers[workerIndex] &&
                                                    errors.milestones[milestoneIndex].workers[workerIndex].isChecked &&
                                                    true
                                                  }
                                                  render={({ field }) => (
                                                    <div className="d-flex align-items-center">
                                                      <div className="form-check form-check-inline checkbox-custom-margin">
                                                        <Input
                                                          {...field}
                                                          type="checkbox"
                                                          id={`milestones[${milestoneIndex}].workers[${workerIndex}].isChecked`}
                                                          checked={worker.isChecked}
                                                          onChange={(e) => {
                                                            // handleCheckboxChange(
                                                            //   milestoneIndex,
                                                            //   workerIndex,
                                                            //   e.target.checked,
                                                            // );
                                                            field.onChange(e.target.checked);

                                                            if (!e.target.checked) {
                                                              trigger(
                                                                `milestones[${milestoneIndex}].workers[${workerIndex}].isChecked`,
                                                              );
                                                              trigger(
                                                                `milestones[${milestoneIndex}].workers[${workerIndex}].duration`,
                                                              );
                                                              trigger(
                                                                `milestones[${milestoneIndex}].workers[${workerIndex}].hours`,
                                                              );
                                                            }
                                                          }}
                                                        />
                                                      </div>
                                                      <Label
                                                        for={`milestones[${milestoneIndex}].workers[${workerIndex}].isChecked`}
                                                        className="form-check-label overflow-wrap-anywhere"
                                                      >
                                                        {worker.role}
                                                      </Label>
                                                    </div>
                                                  )}
                                                />
                                              </Col>
                                              <Col sm="12" md="6" lg="7">
                                                <Row>
                                                  <Col sm="12" md="6" lg="6">
                                                    <Controller
                                                      id={`milestones[${milestoneIndex}].workers[${workerIndex}].duration`}
                                                      name={`milestones[${milestoneIndex}].workers[${workerIndex}].duration`}
                                                      control={control}
                                                      invalid={
                                                        errors &&
                                                        errors.milestones &&
                                                        errors.milestones.length > 0 &&
                                                        errors.milestones[milestoneIndex] &&
                                                        errors.milestones[milestoneIndex].workers &&
                                                        errors.milestones[milestoneIndex].workers.length > 0 &&
                                                        errors.milestones[milestoneIndex].workers[workerIndex] &&
                                                        errors.milestones[milestoneIndex].workers[workerIndex]
                                                          .duration &&
                                                        true
                                                      }
                                                      render={({ field }) => {
                                                        const durationValue =
                                                          getValues('milestones')[milestoneIndex]?.workers?.find(
                                                            (w) => w.role === worker.role,
                                                          )?.duration ?? 0;

                                                        const isInteger = Number.isInteger(+durationValue);

                                                        return (
                                                          <InputGroup className="input-group-merge">
                                                            <Input
                                                              {...field}
                                                              placeholder="0w"
                                                              type="number"
                                                              min={0}
                                                              onWheel={(e) => e.target.blur()}
                                                              invalid={
                                                                errors &&
                                                                errors.milestones &&
                                                                errors.milestones.length > 0 &&
                                                                errors.milestones[milestoneIndex] &&
                                                                errors.milestones[milestoneIndex].workers &&
                                                                errors.milestones[milestoneIndex].workers.length > 0 &&
                                                                errors.milestones[milestoneIndex].workers[
                                                                  workerIndex
                                                                ] &&
                                                                errors.milestones[milestoneIndex].workers[workerIndex]
                                                                  .duration &&
                                                                true
                                                              }
                                                            />
                                                            {durationValue > 0 && isInteger && (
                                                              <InputGroupText className="ps-0">w</InputGroupText>
                                                            )}
                                                          </InputGroup>
                                                        );
                                                      }}
                                                    />
                                                    {errors &&
                                                      errors.milestones &&
                                                      errors.milestones.length > 0 &&
                                                      errors.milestones[milestoneIndex] &&
                                                      errors.milestones[milestoneIndex].workers &&
                                                      errors.milestones[milestoneIndex].workers.length > 0 &&
                                                      errors.milestones[milestoneIndex].workers[workerIndex] &&
                                                      errors.milestones[milestoneIndex].workers[workerIndex]
                                                        .duration && (
                                                        <FormFeedback>
                                                          {
                                                            errors.milestones[milestoneIndex].workers[workerIndex]
                                                              .duration.message
                                                          }
                                                        </FormFeedback>
                                                      )}
                                                  </Col>
                                                  <Col sm="12" md="6" lg="6">
                                                    <Controller
                                                      id={`milestones[${milestoneIndex}].workers[${workerIndex}].hours`}
                                                      name={`milestones[${milestoneIndex}].workers[${workerIndex}].hours`}
                                                      control={control}
                                                      invalid={
                                                        errors &&
                                                        errors.milestones &&
                                                        errors.milestones.length > 0 &&
                                                        errors.milestones[milestoneIndex] &&
                                                        errors.milestones[milestoneIndex].workers &&
                                                        errors.milestones[milestoneIndex].workers.length > 0 &&
                                                        errors.milestones[milestoneIndex].workers[workerIndex] &&
                                                        errors.milestones[milestoneIndex].workers[workerIndex].hours &&
                                                        true
                                                      }
                                                      render={({ field }) => (
                                                        <InputGroup className="input-group-merge">
                                                          <Input
                                                            {...field}
                                                            placeholder="0h"
                                                            type="number"
                                                            min={0}
                                                            onWheel={(e) => e.target.blur()}
                                                            invalid={
                                                              errors &&
                                                              errors.milestones &&
                                                              errors.milestones.length > 0 &&
                                                              errors.milestones[milestoneIndex] &&
                                                              errors.milestones[milestoneIndex].workers &&
                                                              errors.milestones[milestoneIndex].workers.length > 0 &&
                                                              errors.milestones[milestoneIndex].workers[workerIndex] &&
                                                              errors.milestones[milestoneIndex].workers[workerIndex]
                                                                .hours &&
                                                              true
                                                            }
                                                          />
                                                          {getValues('milestones')[milestoneIndex].workers?.find(
                                                            (w) => w.role === worker.role,
                                                          )?.hours > 0 &&
                                                            getValues('milestones')[milestoneIndex].workers?.find(
                                                              (w) => w.role === worker.role,
                                                            )?.hours < 169 && (
                                                              <InputGroupText className="ps-0">h</InputGroupText>
                                                            )}
                                                        </InputGroup>
                                                      )}
                                                    />
                                                    {errors &&
                                                      errors.milestones &&
                                                      errors.milestones.length > 0 &&
                                                      errors.milestones[milestoneIndex] &&
                                                      errors.milestones[milestoneIndex].workers &&
                                                      errors.milestones[milestoneIndex].workers.length > 0 &&
                                                      errors.milestones[milestoneIndex].workers[workerIndex] &&
                                                      errors.milestones[milestoneIndex].workers[workerIndex].hours && (
                                                        <FormFeedback>
                                                          {
                                                            errors.milestones[milestoneIndex].workers[workerIndex].hours
                                                              .message
                                                          }
                                                        </FormFeedback>
                                                      )}
                                                  </Col>
                                                </Row>
                                              </Col>
                                            </Row>
                                          ))}
                                        </div>
                                      )}
                                    />
                                  </CardBody>
                                </Card>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm="12" md="12" lg="6">
                                <Card>
                                  <CardBody>
                                    <p className="fw-bold font-medium-1 text-secondary mb-2 pb-2">
                                      Deliverable Details<span className="label-asterisk">*</span>
                                    </p>
                                    {milestone.deliverables.map((item, index) => (
                                      <Row key={item?.id} className="mb-1 d-flex align-items-center">
                                        <Col sm="12" md="12" lg="8">
                                          <Controller
                                            id={`milestones[${milestoneIndex}].deliverables[${index}]`}
                                            name={`milestones[${milestoneIndex}].deliverables[${index}]`}
                                            control={control}
                                            invalid={
                                              errors &&
                                              errors.milestones &&
                                              errors.milestones.length > 0 &&
                                              errors.milestones[milestoneIndex] &&
                                              errors.milestones[milestoneIndex].deliverables &&
                                              errors.milestones[milestoneIndex].deliverables.length > 0 &&
                                              errors.milestones[milestoneIndex].deliverables[index] &&
                                              true
                                            }
                                            render={({ field }) => (
                                              <Input
                                                {...field}
                                                placeholder="Enter deliverable"
                                                invalid={
                                                  errors &&
                                                  errors.milestones &&
                                                  errors.milestones.length > 0 &&
                                                  errors.milestones[milestoneIndex] &&
                                                  errors.milestones[milestoneIndex].deliverables &&
                                                  errors.milestones[milestoneIndex].deliverables.length > 0 &&
                                                  errors.milestones[milestoneIndex].deliverables[index] &&
                                                  true
                                                }
                                              />
                                            )}
                                          />
                                          {errors &&
                                            errors.milestones &&
                                            errors.milestones.length > 0 &&
                                            errors.milestones[milestoneIndex] &&
                                            errors.milestones[milestoneIndex].deliverables &&
                                            errors.milestones[milestoneIndex].deliverables.length > 0 &&
                                            errors.milestones[milestoneIndex].deliverables[index] && (
                                              <FormFeedback>
                                                {errors.milestones[milestoneIndex].deliverables[index].message}
                                              </FormFeedback>
                                            )}
                                        </Col>
                                        <Col sm="12" md="12" lg="4">
                                          {getValues('milestones')[milestoneIndex].deliverables.length > 1 && (
                                            <Button
                                              type="button"
                                              color="flat-danger"
                                              onClick={() => handleRemoveDeliverable(milestoneIndex, index)}
                                            >
                                              Remove
                                            </Button>
                                          )}
                                        </Col>
                                      </Row>
                                    ))}
                                    <div
                                      className="d-flex align-items-center upload-button cursor-pointer mt-2"
                                      onClick={() => handleAddDeliverable(milestoneIndex)}
                                    >
                                      <div className="add-icon-container">
                                        <Plus size={16} color={theme.activeNavPillText} />
                                      </div>
                                      <h5 className="fw-bold">Add Deliverable</h5>
                                    </div>
                                  </CardBody>
                                </Card>
                              </Col>
                            </Row>
                            <div className="d-flex align-items-center justify-content-end w-100">
                              {getValues('milestones').length > 1 && (
                                <Button
                                  type="button"
                                  color="flat-danger"
                                  onClick={() => {
                                    setRemovedMilestoneIds((oldIds) => [...oldIds, milestone.otherDetails._id]);
                                    milestonesRemove(milestoneIndex);
                                  }}
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                          </AccordionBody>
                        </AccordionItem>
                      </CardBody>
                    </Card>
                  );
                })}
              </Accordion>
              <div className="d-flex align-items-center upload-button cursor-pointer pb-2" onClick={handleAddMilestone}>
                <Plus size={16} color={theme.activeNavPillText} />
                <h5 className="fw-bold">Add Milestone</h5>
              </div>
            </CardBody>
          </Card>
          <Card className="mt-2">
            <CardHeader className="py-75">
              <h4 className="m-0 mt-75">Documents</h4>
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody>
              <Row className="mb-1">
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
                  <Col sm="12" md="12" lg="6">
                    <DropzoneContainer>
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <div className="d-flex align-items-center justify-content-center flex-column p-3">
                          <h4 className="font-medium-1">Drop files here or click to upload</h4>
                          <p className="text-secondary font-small-5 text-center mt-50 fw-light">
                            (Drag and drop your files here, or click to browse and select files for upload)
                          </p>
                        </div>
                      </div>
                    </DropzoneContainer>
                  </Col>
                )}
              </Row>
            </CardBody>
          </Card>
          <div className="d-flex justify-content-between align-items-center">
            <div
              className="d-flex align-items-center upload-button cursor-pointer"
              onClick={() => {
                if (selectUserDetailsData?.user_type === userTypes.team) {
                  navigate(`/create-bid/${params.projectId}/${params.bidType.toLowerCase()}/${params.bidId}/team`);
                } else {
                  navigate('/marketplace/all_listings');
                }
              }}
            >
              <UploadIconContainer>
                <ChevronLeft size={18} color={theme.activeNavPillText} />
              </UploadIconContainer>
              <h5 className="fw-bold">Back</h5>
            </div>
            <Button
              color="primary"
              type="submit"
              disabled={
                totalCost > projectDetailsData?.pay_type?.fixed_cost ||
                !isValid ||
                setMilestonesIsLoading ||
                uploadingFiles.length > 0 ||
                !getValues('milestones').every(
                  (milestone) =>
                    milestone.name?.trim() !== '' &&
                    milestone.workers.length > 0 &&
                    milestone.workers.filter((worker) => worker.isChecked).length > 0 &&
                    milestone.workers
                      .filter((worker) => worker.isChecked)
                      .every((worker) => worker.duration > 0 && worker.hours > 0),
                )
              }
            >
              {setMilestonesIsLoading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <span className="me-50">Save & Continue</span>
                  <ChevronRight size={14} />
                </>
              )}
            </Button>
          </div>
        </Form>
      )}
    </MilestoneSectionWrapper>
  );
};

export default FixedAdvanceMilestoneView;
