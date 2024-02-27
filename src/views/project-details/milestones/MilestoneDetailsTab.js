/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-confusing-arrow */
import React, { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardText,
  Col,
  Form,
  FormFeedback,
  Input,
  Row,
  Spinner,
  UncontrolledTooltip,
} from 'reactstrap';
import Avatar from '@components/avatar';
import Proptypes from 'prop-types';
import { Download, ExternalLink, Link, Plus, Trash2, Upload } from 'react-feather';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import RaiseDisputeModal from '../../disputes/overview/RaiseDisputeModal';
import { formatDate, isFileValid, isUrlWithoutProtocol, renderFilePreview } from '../../../utility/Utils';
import { selectAuthUserData } from '../../../redux/selectors/authSelectors';
import { PAYMENT_STATUS, userTypes } from '../../../utility/constants/Constant';
import {
  milestoneFileUploadService,
  rejectMilestoneService,
  saveMilestoneService,
} from '../../../services/projectMilestoneService';
import { transferFundService } from '../../../services/paymentDetailService';
import errorHandler from '../../../utility/errorHandler';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR, SUCCESS } from '../../../utility/constants/ToastTypes';
import uuidv4 from '../../../lib/uuidv4';
import { projectFileUploadToAzureService } from '../../../services/createProjectServices';
import { CustomBadge } from '../../styled';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';
import SubmitMilestoneModal from '../../modals/SubmitMilestoneModal';
import ChangeRequestMilestoneModal from '../../modals/ChangeRequestMilestoneModal';
import AcceptMilestoneModal from '../../modals/AcceptMilestone';
import theme from '../../../configs/themeVariables';
import AutoResizeTextarea from '../../../@core/components/autoResizeTextArea';
import { MessageIconWrap } from '../../modals/style';
import { TableWrapper } from '../style';

const MilestoneDetailsSchema = yup.object().shape({
  documents: yup.array().of(
    yup.object().shape({
      fileData: yup.mixed().required('File is required'),
      description: yup
        .string()
        .min(4, 'Description must be at least 4 characters')
        .max(20, 'Description must be 500 characters or less')
        .transform((value) => (value === '' ? undefined : value))
        .optional(),
    }),
  ),
  links: yup.array().of(
    yup.object().shape({
      link: yup.string().test('is-url', 'Please enter a valid URL', isUrlWithoutProtocol).nullable(),
      description: yup
        .string()
        .min(4, 'Description must be at least 4 characters')
        .max(20, 'Description must be 500 characters or less')
        .transform((value) => (value === '' ? undefined : value))
        .optional(),
    }),
  ),
});

const MilestoneDetailsTab = ({ selectedMilestone }) => {
  const [raiseDisputeModal, setRaiseDisputeModal] = useState(null);
  const [saveModal, setSaveModal] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [acceptModal, setAcceptModal] = useState(false);

  // const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitBtnText, setSubmitBtnText] = useState('Submit');
  const [acceptBtnText, setAcceptBtnText] = useState('Accept');
  // eslint-disable-next-line no-unused-vars
  const [saveBtnText, setSaveBtnText] = useState('Submit');
  const [rejectBtnText, setRejectBtnText] = useState('Request change');

  const [uploadingFiles, setUploadingFiles] = useState([]);
  // const [documents, setDocuments] = useState([]);
  // const [isDownloading, setIsDownloading] = useState(false);

  const userDataLocal = useSelector(selectAuthUserData);
  const projectDetailsData = useSelector(projectDetails);

  const {
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(MilestoneDetailsSchema),
    defaultValues: {
      documents: [],
      links: [],
    },
  });

  const {
    fields: documentsFields,
    append: documentsAppend,
    remove: documentsRemove,
  } = useFieldArray({
    control,
    name: 'documents',
  });

  const {
    fields: linksFields,
    append: linksAppend,
    remove: linksRemove,
  } = useFieldArray({
    control,
    name: 'links',
  });

  const allLinks = useWatch({ control, name: 'links' });
  // Submit
  const saveMilestone = async () => {
    setIsLoading(true);
    try {
      setSaveBtnText('Loading...');
      await saveMilestoneService(selectedMilestone._id, {
        links: linksFields?.map((item) => item.link),
        documents: documentsFields?.fileData?.map((file) => ({
          file_key: file.file_key || file.uploadData.file_key,
          file_name: file.file_name || file.file.name,
        })),
      });
      // await fetchProjectMilestones();
      setSaveBtnText('Submitted');
    } catch (error) {
      errorHandler(error);
      setSaveBtnText('Submit');
    }
    setIsLoading(false);
    setSaveModal(false);
  };

  // Final Milestone complete
  const finalSubmitMilestone = async () => {
    setIsLoading(true);
    try {
      setSubmitBtnText('Submitting...');
      // await submitMilestoneService(selectedMilestone._id, {
      //   links,
      //   documents: documents.map((file) => ({
      //     file_key: file.file_key || file.uploadData.file_key,
      //     file_name: file.file_name || file.file.name,
      //   })),
      // });
      // await fetchProjectMilestones();
      setSubmitBtnText('Milestone submitted');
      ShowToastMessage(SUCCESS, 'Milestone submitted');
    } catch (error) {
      errorHandler(error);
      setSubmitBtnText('Submit');
    }
    setIsLoading(false);
    setSubmitModal(false);
  };

  const rejectMilestone = async () => {
    setIsLoading(true);
    try {
      setRejectBtnText('Loading...');
      await rejectMilestoneService(selectedMilestone._id);
      // await fetchProjectMilestones();
      setRejectBtnText('Requested change');
    } catch (error) {
      errorHandler(error);
      setRejectBtnText('Request change');
    }
    setIsLoading(false);
    setRejectModal(false);
  };

  const acceptMilestone = async () => {
    setIsLoading(true);

    const payload = {
      milestone: selectedMilestone._id,
    };

    try {
      setAcceptBtnText('Loading...');
      await transferFundService(payload);
      // await fetchProjectMilestones();
      setAcceptBtnText('Accepted');
      ShowToastMessage(SUCCESS, 'Milestone accepted');
    } catch (error) {
      errorHandler(error);
      setAcceptBtnText('Accept');
    }
    setIsLoading(false);
    setAcceptModal(false);
  };

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

  const onDrop = async (acceptedFiles, rejectedFiles) => {
    rejectedFiles.forEach((file) =>
      ShowToastMessage(ERROR, `${file.file.name} is not of a valid supported file type (PDF, DOC, DOCX, TXT or JPEG).`),
    );

    const fetchUploadUrls = async () => {
      const allFiles = [...documentsFields, ...acceptedFiles];

      if (allFiles?.length > 5) {
        ShowToastMessage(ERROR, 'Maximum 5 files allowed');
      } else {
        const validFiles = acceptedFiles.filter((file) => isFileValid(file));

        const promises = validFiles.map(async (file) => {
          try {
            const response = await milestoneFileUploadService({
              file_name: file.name,
              project_id: selectedMilestone?.project_id,
              milestone_id: selectedMilestone._id,
            });
            return {
              id: uuidv4(),
              file,
              uploadData: response?.data?.data,
              file_key: response?.data?.data?.file_key,
              newId: `${response?.data?.data?.file_key.split('.')[0].split('/')[0]}-${
                response?.data?.data?.file_key.split('.')[0].split('/')[2]
              }`,
            };
          } catch (error) {
            errorHandler(error);
            throw error;
          }
        });

        const filesWithUrls = await Promise.all(promises);
        // setDocuments((oldFiles) => [...oldFiles, ...filesWithUrls]);
        // eslint-disable-next-line array-callback-return
        filesWithUrls?.map((doc) => {
          documentsAppend({
            fileData: doc,
            description: undefined,
          });
        });
        filesWithUrls.forEach((fileWithUrl) => handleUploadFile(fileWithUrl));
      }
    };
    fetchUploadUrls();
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'text/application': ['.pdf', '.doc', '.docx'],
      'text/plain': ['.txt'],
      'image/jpeg': ['.jpeg'],
    },
    onDrop,
  });

  const isEditable = userDataLocal.user_type !== userTypes.client && selectedMilestone.status === 'ON_GOING';

  const formattedDate = new Date()
    .toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    .replace(',', '')
    .split(' ');
  const requiredFormattedDate = `${formattedDate[1]} ${formattedDate[0]} ${formattedDate[2]}`;

  const statusEnum = {
    OPEN: 'Open',
    IN_REVIEW: 'In Review',
    TERMINATED: 'Terminated',
    CLOSED: 'Closed',
    LISTING_EXPIRED: 'Listing Expired',
    ON_GOING: 'On Going',
    COMPLETED: 'COMPLETED',
    YET_TO_START: 'Yet to Start',
  };

  const isPaymentDone = (milestone) =>
    milestone?.payment_status === PAYMENT_STATUS.PAID ||
    milestone?.payment_status === PAYMENT_STATUS.PAYMENT_SUCCESSFUL;

  const handleLinkOpen = (URL) => {
    if (URL && (URL.startsWith('http://') || URL.startsWith('https://'))) {
      window.open(URL, '_blank');
    } else {
      window.open(`https://${URL}`, '_blank');
    }
  };

  // const handleDownloadFile = async (file) => {
  //   try {
  //     if (file?.download_url) {
  //       setIsDownloading(true);
  //       const response = await fetch(file.download_url);
  //       const blob = await response.blob();
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = file.file_name;
  //       document.body.appendChild(a);
  //       a.click();
  //       a.remove();
  //       window.URL.revokeObjectURL(url);
  //       setIsDownloading(false);
  //     }
  //   } catch (error) {
  //     setIsDownloading(false);
  //   }
  // };

  const isEmptyLink = allLinks?.some((item) => item.link === '');
  const hasError = errors?.documents?.length > 0 || errors?.links?.length > 0;
  return (
    <div>
      {raiseDisputeModal && (
        <RaiseDisputeModal
          modal={raiseDisputeModal}
          toggleModal={() => setRaiseDisputeModal(!raiseDisputeModal)}
          primaryFilter="all"
          projectDetail={{ label: projectDetailsData?.details?.name, value: projectDetailsData?._id }}
        />
      )}
      {saveModal && (
        <SubmitMilestoneModal
          modal={saveModal}
          toggleModal={() => setSaveModal(!saveModal)}
          isFinalSubmit={false}
          isLoading={isLoading}
          onAccept={saveMilestone}
        />
      )}
      {submitModal && (
        <SubmitMilestoneModal
          modal={submitModal}
          toggleModal={() => setSubmitModal(!submitModal)}
          isFinalSubmit
          isLoading={isLoading}
          onAccept={finalSubmitMilestone}
        />
      )}
      {rejectModal && (
        <ChangeRequestMilestoneModal
          modal={rejectModal}
          toggleModal={() => setRejectModal(!rejectModal)}
          isLoading={isLoading}
          onAccept={rejectMilestone}
        />
      )}
      {acceptModal && (
        <AcceptMilestoneModal
          modal={acceptModal}
          toggleModal={() => setAcceptModal(!acceptModal)}
          isLoading={isLoading}
          onAccept={acceptMilestone}
        />
      )}
      <Card className="gray-card pt-2">
        <div className="mb-2 d-flex gap-1">
          <CardText className="fs-5 fw-bold">Milestone {selectedMilestone?.seq}</CardText>
          <CustomBadge bordered>
            <Badge className={`${selectedMilestone?.status}`} color="badge">
              {statusEnum[selectedMilestone?.status]}
            </Badge>
          </CustomBadge>
        </div>
        <div className="mb-3 d-flex gap-5">
          <div>
            <CardText className="fw-normal mb-0 fs-6">Start</CardText>
            <CardText className="fw-bolder fs-5 mb-0">
              {selectedMilestone.start_date ? formatDate(selectedMilestone.start_date) : '-'}
            </CardText>
          </div>
          <div>
            <CardText className="fw-normal mb-0 fs-6">Duration</CardText>
            <CardText className="fw-bolder fs-5 mb-0">{`${
              selectedMilestone.estimated_duration.duration
            }${selectedMilestone.estimated_duration.duration_type?.[0]?.toLocaleLowerCase()}`}</CardText>
          </div>
          <div>
            <CardText className="fw-normal mb-0 fs-6">Hours/week</CardText>
            <CardText className="fw-bolder fs-5 mb-0">{selectedMilestone?.numbers_of_hours} hr</CardText>
          </div>

          <div>
            <CardText className="fw-normal mb-0 fs-6">Cost</CardText>
            <CardText className="fw-bolder fs-5 mb-0">$ {selectedMilestone.estimated_cost}</CardText>
          </div>
        </div>
        <div className="white-card w-100 mb-50">
          <CardText className="fw-bold fs-4 mb-1">Milestone Name</CardText>
          <CardText className="fw-normal mb-3 fs-6">{selectedMilestone.name}</CardText>
          {selectedMilestone.description ? (
            <>
              <CardText className="fw-bold fs-4 mb-1">Description</CardText>
              <CardText className="fw-normal mb-0 fs-6">{selectedMilestone.description}</CardText>
            </>
          ) : null}
          <div>
            <CardText className="fw-bold fs-4 mb-1">Description</CardText>
            <CardText className="fw-normal mb-0 fs-6">
              Description DescriptionDescription Description DescriptionDescription Description v Description
              Description Description
            </CardText>
          </div>
        </div>
        <hr className="my-2" />

        <div className="pb-2">
          <CardText className="fs-4 mb-0 fw-bold">Submissions</CardText>
        </div>
        <Form className="w-100">
          {(documentsFields.length > 0 || linksFields.length > 0) && (
            <TableWrapper className="w-100 medium-shadow">
              <Row className="w-100 header">
                <Col sm="12" md="12" lg="3">
                  <p className=" fw-bolder mb-0">FILE NAME </p>
                </Col>
                <Col sm="12" md="12" lg="4">
                  <p className=" fw-bolder mb-0">DESCRIPTION</p>
                </Col>
                <Col sm="12" md="12" lg="3">
                  <p className=" fw-bolder mb-0">UPLOADED ON</p>
                </Col>
                <Col sm="12" md="12" lg="2">
                  <p className=" fw-bolder mb-0">ACTION</p>
                </Col>
              </Row>
              {documentsFields.map((file, index) => (
                <Row key={file?.file_key} className="w-100 tbody border-bottom">
                  <Col sm="12" md="12" lg="3" className="m-auto d-flex">
                    {/* <p className="fw-bold ">Project bried.pdf</p> */}
                    {renderFilePreview(file?.fileData?.file)}
                    <span className="truncated-filename mt-25" id={file?.fileData?.newId}>
                      {file?.fileData?.file?.name ?? file?.fileData?.file?.file_name}
                    </span>
                    <UncontrolledTooltip placement="bottom" target={file?.fileData?.newId}>
                      {file?.fileData?.file?.name ?? file?.fileData?.file?.file_name}
                    </UncontrolledTooltip>
                  </Col>
                  <Col sm="12" md="12" lg="4">
                    <Controller
                      id={`documents[${index}].description`}
                      name={`documents[${index}].description`}
                      control={control}
                      invalid={
                        errors &&
                        errors.documents &&
                        errors.documents.length > 0 &&
                        errors.documents[index] &&
                        errors.documents[index].description &&
                        true
                      }
                      render={({ field }) => (
                        <AutoResizeTextarea
                          {...field}
                          type="textarea"
                          rows="4"
                          className="desc-input"
                          placeholder="Enter description in 500 characters"
                          invalid={
                            errors &&
                            errors.documents &&
                            errors.documents.length > 0 &&
                            errors.documents[index] &&
                            errors.documents[index].description &&
                            true
                          }
                        />
                      )}
                    />
                    {errors &&
                      errors.documents &&
                      errors.documents.length > 0 &&
                      errors.documents[index] &&
                      errors.documents[index].description && (
                        <FormFeedback>{errors.documents[index].description.message}</FormFeedback>
                      )}{' '}
                  </Col>
                  <Col sm="12" md="12" lg="3" className="m-auto">
                    <p className="fw-normal m-auto"> {requiredFormattedDate}</p>
                  </Col>
                  <Col sm="12" md="12" lg="2" className="m-auto">
                    {uploadingFiles.some((obj) => obj.file_key === file?.fileData?.file_key) ? (
                      <Spinner size="sm" />
                    ) : (
                      <div className="fw-bold m-auto d-flex gap-1">
                        <MessageIconWrap>
                          <span className="mail-bg">
                            <Download size={20} className="mail-icon" color={theme.activeColor} />
                          </span>
                        </MessageIconWrap>
                        <MessageIconWrap
                          onClick={() => {
                            documentsRemove(index);
                          }}
                        >
                          <span className="trash-bg">
                            <Trash2 size={20} className="mail-icon" color={theme.red} />
                          </span>
                        </MessageIconWrap>
                      </div>
                    )}
                  </Col>
                </Row>
              ))}

              {linksFields.map((item, index) => (
                <Row key={`links-${item?.id}`} className="w-100 tbody border-bottom">
                  <Col sm="12" md="12" lg="3" className="m-auto d-flex">
                    <Link size="22" className="m-auto me-1 " />
                    <span className="w-100">
                      <Controller
                        id={`links[${index}].link`}
                        name={`links[${index}].link`}
                        control={control}
                        invalid={
                          errors &&
                          errors.links &&
                          errors.links.length > 0 &&
                          errors.links[index] &&
                          errors.links[index].link &&
                          true
                        }
                        render={({ field }) => (
                          <Input
                            {...field}
                            rows="4"
                            className="desc-input"
                            placeholder="Add link here"
                            invalid={
                              errors &&
                              errors.links &&
                              errors.links.length > 0 &&
                              errors.links[index] &&
                              errors.links[index].link &&
                              true
                            }
                          />
                        )}
                      />
                      {errors &&
                        errors.links &&
                        errors.links.length > 0 &&
                        errors.links[index] &&
                        errors.links[index].link && (
                          <FormFeedback>{errors.links[index].link.message}</FormFeedback>
                        )}{' '}
                    </span>
                  </Col>

                  <Col sm="12" md="12" lg="4">
                    <Controller
                      className="w-100"
                      id={`links[${index}].description`}
                      name={`links[${index}].description`}
                      control={control}
                      invalid={
                        errors &&
                        errors.links &&
                        errors.links.length > 0 &&
                        errors.links[index] &&
                        errors.links[index].description &&
                        true
                      }
                      render={({ field }) => (
                        <AutoResizeTextarea
                          {...field}
                          type="textarea"
                          rows="4"
                          className="desc-input w-100"
                          placeholder="Enter description in 500 characters"
                          invalid={
                            errors &&
                            errors.links &&
                            errors.links.length > 0 &&
                            errors.links[index] &&
                            errors.links[index].description &&
                            true
                          }
                        />
                      )}
                    />
                    {errors &&
                      errors.links &&
                      errors.links.length > 0 &&
                      errors.links[index] &&
                      errors.links[index].description && (
                        <FormFeedback>{errors.links[index].description.message}</FormFeedback>
                      )}
                  </Col>
                  <Col sm="12" md="12" lg="3" className="m-auto">
                    <p className="fw-normal m-auto">10 Feb 2020, 05:30 PM</p>
                  </Col>
                  <Col sm="12" md="12" lg="2" className="m-auto">
                    <div className="fw-bold m-auto d-flex gap-1">
                      <MessageIconWrap
                        onClick={() => {
                          if (allLinks?.[index]?.link.length > 0 && !errors?.links?.[index]) {
                            handleLinkOpen(allLinks?.[index]?.link);
                          }
                        }}
                      >
                        <span className="mail-bg">
                          <ExternalLink
                            size={20}
                            className="mail-icon"
                            color={
                              allLinks?.[index]?.link.length > 0 && !errors?.links?.[index]
                                ? theme.activeColor
                                : `${theme.activeColor}5f`
                            }
                          />
                        </span>
                      </MessageIconWrap>
                      <MessageIconWrap
                        onClick={() => {
                          linksRemove(index);
                        }}
                      >
                        <span className="trash-bg">
                          <Trash2 size={20} className="mail-icon" color={theme.red} />
                        </span>
                      </MessageIconWrap>
                    </div>{' '}
                  </Col>
                </Row>
              ))}
            </TableWrapper>
          )}
        </Form>

        <div>
          <div
            onClick={() => {
              linksAppend({ link: '', description: '', id: uuidv4() });
            }}
            className="d-flex mt-1 fs-5 color-primary align-items-center cursor-pointer fw-bold me-2"
          >
            <Avatar color="light-primary" icon={<Plus size="14" />} className="me-1" />
            Add Link
          </div>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <div className="d-flex fs-5 fw-bold color-primary align-items-center cursor-pointer mt-1">
              <Avatar color="light-primary" icon={<Upload size="14" />} className="me-1" />
              Add Document
            </div>
          </div>
        </div>

        <div className="w-100 mt-2 mb-2 d-flex justify-content-end">
          <div>
            {userDataLocal.user_type === userTypes.client && selectedMilestone.status === 'IN_REVIEW' ? (
              <>
                <Button
                  onClick={() => acceptMilestone()}
                  disabled={isLoading || acceptBtnText !== 'Accept'}
                  color="primary"
                  className=" me-2"
                >
                  {acceptBtnText}
                </Button>
                <Button
                  onClick={() => setRejectModal(true)}
                  disabled={isLoading || rejectBtnText !== 'Request change'}
                  color="primary"
                  className="d-none"
                >
                  {rejectBtnText}
                </Button>
              </>
            ) : isEditable ? (
              <Button
                onClick={() => finalSubmitMilestone()}
                disabled={
                  uploadingFiles.length > 0 ||
                  isLoading ||
                  isEmptyLink ||
                  hasError ||
                  [...documentsFields, ...allLinks].length === 0 ||
                  submitBtnText !== 'Submit' ||
                  !isPaymentDone(selectedMilestone)
                }
                color="primary"
              >
                {submitBtnText}
              </Button>
            ) : null}
          </div>
          <div className="d-none ms-2 d-flex justify-content-end">
            {userDataLocal.user_type !== userTypes.client && isEditable && (
              <Button
                onClick={() => finalSubmitMilestone()}
                disabled={
                  uploadingFiles.length > 0 ||
                  isLoading ||
                  submitBtnText !== 'Milestone complete' ||
                  [...documentsFields, ...allLinks].length === 0 ||
                  !isPaymentDone(selectedMilestone)
                }
                color="primary"
              >
                {submitBtnText}
              </Button>
            )}
          </div>
        </div>
        <div style={{ padding: '2rem' }} className="w-100 white-card medium-shadow">
          <div className="pb-0">
            <CardText className="fs-4 mb-0 fw-bold">Team Member(s)</CardText>
          </div>
          <Row className="mt-2 w-100">
            <Col sm="12" md="12" lg="4">
              <p className="content-header fw-bold mb-25">Team Member</p>
            </Col>
            <Col sm="12" md="12" lg="3">
              <p className="content-header fw-bold mb-25">Designation</p>
            </Col>
            <Col sm="12" md="12" lg="2">
              <p className="content-header fw-bold mb-25">Duration</p>
            </Col>
            <Col sm="12" md="12" lg="2">
              <p className="content-header fw-bold mb-25">Amount</p>
            </Col>
          </Row>
          <div className="w-100">
            {selectedMilestone?.workers?.map((worker) => (
              <Row className="mt-1 w-100" key={worker?.role}>
                <Col sm="12" md="12" lg="4">
                  <div className="d-flex align-items-center">
                    <Avatar
                      img={worker?.image_uri?.length > 0 ? worker?.image_uri : defaultAvatar}
                      imgHeight="32"
                      imgWidth="32"
                      className="me-50"
                    />
                    {worker?.user_id ? (
                      <p className="fw-bolder content-description m-0 ms-50">
                        {worker?.first_name} {worker?.last_name}
                      </p>
                    ) : (
                      <p className="fw-bolder to-be-assigned-text m-0 ms-50">To be assigned</p>
                    )}
                  </div>
                </Col>
                <Col sm="12" md="12" lg="3">
                  <p className="fw-bold content-description">{worker?.role}</p>
                </Col>
                <Col sm="12" md="12" lg="2">
                  <p className="fw-bold content-description">{worker?.number_of_weeks} week</p>
                </Col>
                <Col sm="12" md="12" lg="2">
                  <p className="fw-bold content-description">${worker?.amount || 0}</p>
                </Col>
              </Row>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

MilestoneDetailsTab.propTypes = {
  selectedMilestone: Proptypes.object.isRequired,
  // fetchProjectMilestones: Proptypes.func.isRequired,
  milestonesData: Proptypes.object.isRequired,
  setSelectedMilestoneIndex: Proptypes.func.isRequired,
};

export default MilestoneDetailsTab;
