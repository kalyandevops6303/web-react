/* eslint-disable no-unsafe-optional-chaining */
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
import { ChevronLeft, ChevronRight, Edit, Info, Plus, Upload } from 'react-feather';
import { ChangeBidTypeButton, MilestoneSectionWrapper } from '../style';
import { UploadIconContainer } from '../../Onboarding/style';
import theme from '../../../configs/themeVariables';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';
import { maxFileSize, userTypes } from '../../../utility/constants/Constant';
import { DropzoneContainer } from '../../CreateProject/style';
import {
  downloadFile,
  downloadUploadedFile,
  formatDateWithDash,
  getFileSize,
  renderFilePreview,
} from '../../../utility/Utils';
import { getBidDetails, saveSetMilestones } from '../../../redux/actions/createBidActions';
import { bidDetailsLoading, projectDetails, setMilestonesLoading } from '../../../redux/selectors/createBidSelectors';
import uuidv4 from '../../../lib/uuidv4';
import capitalize from '../../../lib/capitalize';
import { milestoneFileUploadService, milestoneFileUploadToAzureService } from '../../../services/createBidServices';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { downloadUrlLoading } from '../../../redux/selectors/dashboardSelectors';
import { getDownloadUrl } from '../../../redux/actions/dashboardActions';
import ChangeBidTypeConfirmationModal from '../../modals/ChangeBidTypeConfirmationModal';
import CreateBidModal from '../../modals/CreateBidModal';
import { formData, formDocuments } from '../../../redux/selectors/formDataSelectors';
import { clearAllFormData, setFormData, setFormDocuments } from '../../../redux/reducers/formData';

const FixedSimpleMilestoneView = () => {
  const MilestoneDetailsSchema = yup.object().shape({
    estimatedStartDate: yup.date().typeError('Start date is required').required('Start date is required'),
    milestones: yup.array().of(
      yup.object().shape({
        duration: yup
          .number()
          .integer('Duration must be an integer')
          .min(1, 'Duration must be at least 1')
          .typeError('Please enter a number')
          .required('Duration is required'),
        talentCost: yup
          .number()
          .min(1, 'Cost must be at least 1')
          .typeError('Please enter a number')
          .required('Talent amount is required')
          .integer('Cost must be an integer'),
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
      }),
    ),
  });

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(MilestoneDetailsSchema),
    defaultValues: {
      milestones: [
        {
          duration: undefined,
          talentCost: undefined,
          name: undefined,
          description: undefined,
          deliverables: [undefined],
          otherDetails: {},
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
  const projectDetailsData = useSelector(projectDetails);
  const bidDetailsIsLoading = useSelector(bidDetailsLoading);
  const downloadUrlIsLoading = useSelector(downloadUrlLoading);
  const savedFormData = useSelector(formData);
  const savedFormDocuments = useSelector(formDocuments);

  const [files, setFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [removedMilestoneIds, setRemovedMilestoneIds] = useState([]);
  const [allWorkers, setAllWorkers] = useState([]);
  const [selectedFileKey, setSelectedFileKey] = useState(null);
  const filesRef = useRef();
  const allMilestones = useWatch({ control, name: 'milestones' });
  const [open, setOpen] = useState(1);
  const [changeBidTypeConfirmationModal, setChangeBidTypeConfirmationModal] = useState(null);
  const [createBidModal, setCreateBidModal] = useState(null);
  const [bidData, setBidData] = useState(null);

  const localFormData = useWatch({ control });

  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData };
    dispatch(setFormData(allData));
  }, [localFormData]);

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const toggleChangeBidTypeConfirmationModal = () => {
    setChangeBidTypeConfirmationModal(!changeBidTypeConfirmationModal);
  };

  const toggleCreateBidModal = () => {
    setCreateBidModal(!createBidModal);
  };

  const calculateTotalValues = () => {
    const totalDuration = allMilestones.reduce((total, milestone) => total + Number(milestone.duration || 0), 0);

    const totalCost = allMilestones.reduce((total, milestone) => total + Number(milestone.talentCost || 0), 0);

    return { totalDuration, totalCost };
  };

  const { totalDuration, totalCost } = calculateTotalValues();

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
    dispatch(clearAllFormData());
    navigate(`/create-bid/${params.projectId}/${params.bidType.toLowerCase()}/${params.bidId}/preview`);
  };

  const onSubmit = (data) => {
    const { estimatedStartDate, milestones } = data;

    const project_start_date = formatDateWithDash(estimatedStartDate);
    const total_estimated_duration = {
      duration: milestones.reduce((total, milestone) => total + Number(milestone.duration || 0), 0),
      duration_type: 'WEEK',
    };
    const total_estimated_cost = milestones.reduce((total, milestone) => total + Number(milestone.talentCost || 0), 0);
    const newMilestones = milestones.filter((milestone) => !('_id' in milestone.otherDetails));
    const updatedMilestones = milestones.filter((milestone) => '_id' in milestone.otherDetails);
    const maxSeqValue = updatedMilestones.reduce((max, obj) => Math.max(max, obj?.otherDetails?.seq), 0);
    const create_milestones = newMilestones.map((milestone, index) => ({
      name: milestone.name,
      description: milestone.description,
      estimated_duration: {
        duration: milestone.duration,
        duration_type: 'WEEK',
      },
      estimated_cost: milestone.talentCost,
      deliverables: milestone.deliverables,
      seq: maxSeqValue + index + 1,
      workers: milestone.workers.map((worker) => {
        const { amount, image_uri, ...rest } = worker;
        return {
          ...rest,
          number_of_weeks: Number(milestone.duration),
        };
      }),
    }));
    const update_milestones = updatedMilestones.map((milestone) => ({
      name: milestone.name,
      description: milestone.description,
      estimated_duration: {
        duration: milestone.duration,
        duration_type: 'WEEK',
      },
      estimated_cost: milestone.talentCost,
      deliverables: milestone.deliverables,
      milestone_id: milestone.otherDetails._id,
      seq: milestone.otherDetails.seq,
      workers: milestone.workers.map((worker) => {
        const { amount, image_uri, ...rest } = worker;
        return {
          ...rest,
          number_of_weeks: Number(milestone.duration),
        };
      }),
    }));
    const removed_milestone_ids = removedMilestoneIds.filter((id) => id !== undefined);
    const documents = files.map((file) => ({
      file_name: file?.file?.name || file?.file?.file_name,
      file_key: file.uploadData.file_key,
    }));

    const reqData = {
      project_start_date,
      total_estimated_duration,
      total_estimated_cost,
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
        milestone.duration > 0 &&
        milestone.talentCost > 0 &&
        milestone.name.trim() !== '' &&
        milestone.deliverables.every((deliverable) => deliverable?.trim() !== '' && deliverable !== undefined),
    );

    if (!allMilestonesValid) {
      ShowToastMessage(ERROR, 'Please fill all required fields for existing milestones before adding a new one.');
    } else if (totalCost > projectDetailsData?.pay_type?.fixed_cost) {
      ShowToastMessage(ERROR, 'Please adjust total cost to be less than project fixed price.');
    } else if (allMilestonesValid) {
      milestonesAppend({
        name: undefined,
        description: undefined,
        duration: undefined,
        talentCost: undefined,
        deliverables: [undefined],
        otherDetails: {},
        workers: allWorkers,
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
    dispatch(setFormDocuments(files));
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
      const validFiles = acceptedFiles.filter((file) => isFileValid(file));

      const promises = validFiles.map(async (file) => {
        const response = await milestoneFileUploadService(file.name);
        return { id: uuidv4(), file, uploadData: response?.data?.data, isUploaded: false };
      });

      const filesWithUrls = await Promise.all(promises);
      setFiles((oldFiles) => [...oldFiles, ...filesWithUrls]);

      filesWithUrls.forEach((fileWithUrl) => handleUploadFile(fileWithUrl));
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

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.id !== file.id);
    setFiles([...filtered]);
  };

  const requiredFormattedDate = (date = new Date()) => {
    const formattedDate = new Date(date)
      .toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      .replace(',', '')
      .split(' ');
    return `${formattedDate[1]} ${formattedDate[0]} ${formattedDate[2]}`;
  };

  const onDownloadResumeUrlSuccess = ({ download_url, file_name }) => {
    downloadFile({ data: { download_url }, file_name });
  };

  const downloadSelectedFile = (file) => {
    if (file.isUploaded) {
      setSelectedFileKey(file?.uploadData?.file_key);
      dispatch(
        getDownloadUrl({
          fileKey: file?.uploadData?.file_key,
          onSuccess: onDownloadResumeUrlSuccess,
          fileName: file.file.name || file?.file?.file_name,
        }),
      );
    } else {
      downloadUploadedFile({ file: file.file });
    }
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
              <div
                className="d-flex cursor-pointer"
                style={{ color: theme.activeColor, maxWidth: 'fit-content' }}
                onClick={() => downloadSelectedFile(file)}
              >
                {downloadUrlIsLoading && selectedFileKey === file?.uploadData?.file_key ? (
                  <div className="d-flex align-items-center justify-content-center w-100">
                    <Spinner color="primary" />
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <span>{renderFilePreview(file?.file)}</span>
                    <span>{file?.file?.name || file?.file?.file_name}</span>
                  </div>
                )}
              </div>
            </Col>
            <Col sm="6" md="2" lg="2">
              {uploadingFiles.includes(file) ? <span>Uploading...</span> : <span>Uploaded</span>}
            </Col>
            <Col sm="2" md="2" lg="2">
              {getFileSize(file.file.size)}
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
      setBidData(res);
      if (res?.project_start_date > 0 && !savedFormData?.estimatedStartDate) {
        setValue('estimatedStartDate', new Date(res?.project_start_date), { shouldValidate: true });
      } else if (savedFormData?.estimatedStartDate) {
        setValue('estimatedStartDate', new Date(savedFormData?.estimatedStartDate), { shouldValidate: true });
      }
      if (res?.milestones?.length > 0 && !savedFormData?.milestones?.length) {
        const reqData = res?.milestones?.map((milestone) => ({
          duration: milestone?.estimated_duration?.duration,
          talentCost: milestone?.estimated_cost,
          name: milestone?.name,
          description: milestone?.description,
          deliverables: milestone?.deliverables?.length > 0 ? milestone?.deliverables : [undefined],
          workers: res?.workers?.length > 0 ? res?.workers : [],
          otherDetails: milestone,
        }));

        setValue('milestones', reqData, { shouldValidate: true });
      } else if (res?.workers?.length > 0 && !savedFormData?.milestones?.length) {
        const reqData = [
          {
            duration: undefined,
            talentCost: undefined,
            name: undefined,
            description: undefined,
            deliverables: [undefined],
            otherDetails: {},
            workers: res?.workers?.length > 0 ? res?.workers : [],
          },
        ];

        setValue('milestones', reqData, { shouldValidate: true });
      } else {
        setValue('milestones', savedFormData?.milestones, { shouldValidate: true });
      }
      if (res?.documents?.length > 0 && !savedFormDocuments?.length) {
        const reqFiles = res?.documents?.map((file) => ({
          file,
          id: uuidv4(),
          uploadData: {
            file_key: file?.file_key,
          },
          isUploaded: true,
        }));
        setFiles(reqFiles);
      } else if (savedFormDocuments?.length) {
        setFiles(savedFormDocuments);
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
      {changeBidTypeConfirmationModal && (
        <ChangeBidTypeConfirmationModal
          modal={changeBidTypeConfirmationModal}
          toggleModal={toggleChangeBidTypeConfirmationModal}
          toggleCreateBidModal={toggleCreateBidModal}
        />
      )}
      {createBidModal && (
        <CreateBidModal
          modal={createBidModal}
          toggleModal={toggleCreateBidModal}
          selectedProject={{
            _id: params.projectId,
            pay_type: { variable_cost: params.bidType.split('-')[0] === 'variable' },
            bidType: params.bidType.split('-')[1].toUpperCase(),
          }}
        />
      )}
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
                    <span className="fw-bolder font-medium-1">Alert :</span> You have exceeded the fixed price of the
                    project. Please adjust your price in order to submit the bid
                  </p>
                </div>
              )}
              <div className="fixed-cost-banner info-banner mb-2 d-flex px-1 py-2">
                <Info size={18} color={theme.activeNavPillText} className="me-50" />
                <p className="font-medium-1 m-0 info">
                  <span className="fw-bolder font-medium-1">Fixed Price:</span> The fixed price will be equally
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
                    <Col sm="12" md="12" lg="8" className="d-flex justify-content-end me-1">
                      <div className="me-4">
                        <Label className="form-label m-0">Estimated Duration</Label>
                        <p className="fw-bold font-medium-1 text-end mt-50 mb-0">{totalDuration}w</p>
                      </div>
                      <div
                        className={bidData?.is_bid_type_changeable ? 'me-4 custom-cost-margin' : 'custom-cost-margin'}
                      >
                        <div className="d-flex align-items-center m-0">
                          <Label className="form-label m-0">Fixed Price</Label>
                          <Info size={18} color={theme.infoIcon} id="fixed-info" className="ms-50" />
                          <UncontrolledTooltip placement="top" target="fixed-info">
                            <p className="m-0">Predetermined project price fixed by the client</p>
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
                      {bidData?.is_bid_type_changeable && (
                        <div>
                          <Label className="form-label m-0">Bid Type</Label>
                          <div className="d-flex align-items-center custom-cost-margin">
                            <p className="fw-bold font-medium-1 mb-0 mt-25">
                              {capitalize(params.bidType.split('-')[1])} Flow
                            </p>
                            <ChangeBidTypeButton
                              className="d-flex align-items-center cursor-pointer ms-1"
                              onClick={toggleChangeBidTypeConfirmationModal}
                            >
                              <div className="change-bid-type-icon">
                                <Edit size={16} color={theme.activeNavPillText} />
                              </div>
                            </ChangeBidTypeButton>
                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Accordion className="mb-2 accordion-arrow" open={open} toggle={toggle}>
                {milestonesFields.map((milestone, milestoneIndex) => (
                  <Card className="white-card-bg" key={milestone.id}>
                    <CardBody className="p-0">
                      <AccordionItem className="py-0">
                        <AccordionHeader targetId={milestoneIndex + 1} className="py-0">
                          <div className="d-flex justify-content-between align-items-center w-100">
                            <p className="fw-bold font-medium-1 m-0 ms-25">Milestone {milestoneIndex + 1}</p>
                            <Row className="d-flex justify-content-end">
                              <Col sm="12" md="12" lg="4">
                                <div className="me-2">
                                  <Label className="fw-normal form-label" for="duration">
                                    Duration<span className="label-asterisk me-50">*</span>
                                  </Label>
                                  <Controller
                                    id={`milestones[${milestoneIndex}].duration`}
                                    name={`milestones[${milestoneIndex}].duration`}
                                    control={control}
                                    invalid={
                                      errors &&
                                      errors.milestones &&
                                      errors.milestones.length > 0 &&
                                      errors.milestones[milestoneIndex] &&
                                      errors.milestones[milestoneIndex].duration &&
                                      true
                                    }
                                    render={({ field }) => (
                                      <InputGroup
                                        className="input-group-merge"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                        }}
                                      >
                                        <Input
                                          {...field}
                                          placeholder="Enter"
                                          type="number"
                                          min={0}
                                          onWheel={(e) => e.target.blur()}
                                          invalid={
                                            errors &&
                                            errors.milestones &&
                                            errors.milestones.length > 0 &&
                                            errors.milestones[milestoneIndex] &&
                                            errors.milestones[milestoneIndex].duration &&
                                            true
                                          }
                                          onClick={(e) => {
                                            e.stopPropagation();
                                          }}
                                        />
                                        {getValues('milestones')[milestoneIndex].duration > 0 &&
                                          Number.isInteger(+getValues('milestones')[milestoneIndex].duration) && (
                                            <InputGroupText className="ps-0">w</InputGroupText>
                                          )}
                                      </InputGroup>
                                    )}
                                  />
                                  {errors &&
                                    errors.milestones &&
                                    errors.milestones.length > 0 &&
                                    errors.milestones[milestoneIndex] &&
                                    errors.milestones[milestoneIndex].duration && (
                                      <FormFeedback>{errors.milestones[milestoneIndex].duration.message}</FormFeedback>
                                    )}
                                </div>
                              </Col>
                              <Col sm="12" md="12" lg="4">
                                <div>
                                  <Label className="fw-normal form-label me-2" for="talentCost">
                                    Talent Amount<span className="label-asterisk me-50">*</span>
                                  </Label>
                                  <Controller
                                    id={`milestones[${milestoneIndex}].talentCost`}
                                    name={`milestones[${milestoneIndex}].talentCost`}
                                    control={control}
                                    invalid={
                                      errors &&
                                      errors.milestones &&
                                      errors.milestones.length > 0 &&
                                      errors.milestones[milestoneIndex] &&
                                      errors.milestones[milestoneIndex].talentCost &&
                                      true
                                    }
                                    render={({ field }) => (
                                      <InputGroup
                                        className="input-group-merge w-75"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                        }}
                                      >
                                        {getValues('milestones')[milestoneIndex].talentCost > 0 && (
                                          <InputGroupText className="pe-25">$</InputGroupText>
                                        )}
                                        <Input
                                          {...field}
                                          placeholder="Enter"
                                          invalid={
                                            errors &&
                                            errors.milestones &&
                                            errors.milestones.length > 0 &&
                                            errors.milestones[milestoneIndex] &&
                                            errors.milestones[milestoneIndex].talentCost &&
                                            true
                                          }
                                          onClick={(e) => {
                                            e.stopPropagation();
                                          }}
                                        />
                                      </InputGroup>
                                    )}
                                  />
                                  {errors &&
                                    errors.milestones &&
                                    errors.milestones.length > 0 &&
                                    errors.milestones[milestoneIndex] &&
                                    errors.milestones[milestoneIndex].talentCost && (
                                      <FormFeedback>
                                        {errors.milestones[milestoneIndex].talentCost.message}
                                      </FormFeedback>
                                    )}
                                </div>
                              </Col>
                            </Row>
                          </div>
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
                ))}
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
                {files?.length ? (
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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div
              className="d-flex align-items-center upload-button cursor-pointer mb-50"
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
                uploadingFiles.length > 0
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

export default FixedSimpleMilestoneView;
