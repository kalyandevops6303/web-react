/* eslint-disable no-undef */
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
import toast from 'react-hot-toast';
import { Download, ExternalLink, Link, Plus, Trash2, Upload } from 'react-feather';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { formatDate, isFileValid, isUrlWithoutProtocol, renderFilePreview } from '../../../utility/Utils';
import { selectAuthUserData } from '../../../redux/selectors/authSelectors';
import { PAYMENT_STATUS, userTypes } from '../../../utility/constants/Constant';
import { milestoneFileUploadService } from '../../../services/projectMilestoneService';
import errorHandler from '../../../utility/errorHandler';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR, SUCCESS } from '../../../utility/constants/ToastTypes';
import uuidv4 from '../../../lib/uuidv4';
import DateTime from '../../../lib/date-time';

import { projectFileUploadToAzureService } from '../../../services/createProjectServices';
import { CustomBadge } from '../../styled';
import SubmitMilestoneModal from '../../modals/SubmitMilestoneModal';
import theme from '../../../configs/themeVariables';
import AutoResizeTextarea from '../../../@core/components/autoResizeTextArea';
import { MessageIconWrap } from '../../modals/style';
import { TableWrapper } from '../style';
import FeedbackForSubmitModal from '../../modals/FeedbackForSubmitModal';
import RemoveArtifactsModal from '../../modals/RemoveArtifactsModal';
import FeedbackRemoveArtifactsModal from '../../modals/FeedbackRemoveArtifacts';
import { submitMilstone } from '../../../redux/actions/milestoneActions';

const MilestoneDetailsSchema = yup.object().shape({
  documents: yup.array().of(
    yup.object().shape({
      fileData: yup.mixed().required('File is required'),
      description: yup
        .string()
        .min(4, 'Description must be at least 4 characters')
        .max(100, 'Description must be 100 characters or less')
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
        .max(100, 'Description must be 100 characters or less')
        .transform((value) => (value === '' ? undefined : value))
        .optional(),
    }),
  ),
});

const MilestoneDetailsTab = ({ selectedMilestone }) => {
  const [submitModal, setSubmitModal] = useState(false);
  const [submitFeedbackModal, setSubmitFeedbackModal] = useState(false);
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [deleteFeedbackModal, setDeleteFeedbackModal] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const userDataLocal = useSelector(selectAuthUserData);
  const isMilestoneSubmitting = useSelector((state) => state.milestone.isMilestoneSubmitting);
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
  const allDocuments = useWatch({ control, name: 'documents' });

  const onFinalSubmitMilestone = async () => {
    try {
      const postData = {
        links: allLinks.map((link) => ({
          url: link?.link,
          description: link?.description,
        })),
        documents: allDocuments.map((file) => ({
          file_key: file?.fileData?.file_key || file?.fileData?.uploadData?.file_key,
          file_name: file?.fileData?.file_name || file?.fileData?.file?.name,
          description: file?.description,
        })),
      };
      const onSuccess = () => {
        ShowToastMessage(SUCCESS, 'Milestone submitted');
        setSubmitFeedbackModal(true);
        setSubmitModal(false);
      };
      dispatch(submitMilstone({ milestone_id: selectedMilestone._id, data: postData, onSuccess }));
    } catch (error) {
      errorHandler(error);
      setSubmitModal(false);
    }
  };

  const handleUploadFile = async ({ file, onError }) => {
    try {
      setUploadingFiles((prevFiles) => [...prevFiles, file]);

      await projectFileUploadToAzureService(file.uploadData.upload_url, file.file, {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': file.file.type,
      });
    } catch (error) {
      ShowToastMessage(ERROR, 'Something went wrong. Please try uploading again.');
      onError(error);
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

        const fileId = uuidv4();
        const filesWithUrls = await Promise.all(promises);
        // setDocuments((oldFiles) => [...oldFiles, ...filesWithUrls]);
        // eslint-disable-next-line array-callback-return
        filesWithUrls?.map((doc) => {
          documentsAppend({
            id: fileId,
            fileData: doc,
            description: undefined,
            time: DateTime.now().toFormat(`dd MMM yyyy, hh:mm a`),
          });
        });
        const onError = () => {
          documentsRemove(fileId);
        };
        filesWithUrls.forEach((fileWithUrl) => handleUploadFile({ file: fileWithUrl, onError }));
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

  const isEditable =
    userDataLocal.user_type !== userTypes.client &&
    (selectedMilestone.status === 'ON_GOING' || selectedMilestone.status === 'IN_REVIEW');

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

  const isEmptyLink = allLinks?.some((item) => item.link === '');
  const hasError = errors?.documents?.length > 0 || errors?.links?.length > 0;

  const handleRemove = ({ item, index }) => {
    setDeleteData({ ...item, index });
    setDeleteModal(true);
  };

  const onRemove = (data) => {
    if (data?.link) {
      linksRemove(data.index);
    } else {
      documentsRemove(data.index);
    }
    setSubmitFeedbackModal(false);
  };

  return (
    <div>
      {submitModal && (
        <SubmitMilestoneModal
          modal={submitModal}
          toggleModal={() => setSubmitModal(!submitModal)}
          isFinalSubmit
          isLoading={isMilestoneSubmitting}
          onSuccess={onFinalSubmitMilestone}
          links={allLinks}
          documents={allDocuments}
        />
      )}
      {submitFeedbackModal && (
        <FeedbackForSubmitModal
          modal={submitFeedbackModal}
          toggleModal={() => {
            setSubmitFeedbackModal(!submitFeedbackModal);
            documentsRemove();
            linksRemove();
          }}
          links={allLinks}
          documents={allDocuments}
        />
      )}
      {deleteModal && (
        <RemoveArtifactsModal
          modal={deleteModal}
          toggleModal={() => setDeleteModal(!deleteModal)}
          onSuccess={() => {
            setDeleteModal(false);
            setDeleteFeedbackModal(true);
          }}
          data={deleteData}
        />
      )}
      {deleteFeedbackModal && (
        <FeedbackRemoveArtifactsModal
          modal={deleteFeedbackModal}
          toggleModal={() => {
            setDeleteFeedbackModal(!deleteFeedbackModal);
            onRemove(deleteData);
          }}
          data={deleteData}
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
        </div>
        <hr className="my-2" />
        {isEditable && (
          <section className="w-100">
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
                      <p className=" fw-bolder mb-0 ps-75">ACTION</p>
                    </Col>
                  </Row>
                  {documentsFields.map((file, index) => (
                    <Row key={file?.file_key} className="w-100 tbody border-bottom">
                      <Col sm="12" md="12" lg="3" className="m-auto d-flex">
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
                              placeholder="Add short description (optional)"
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
                        <p className="fw-normal m-auto"> {file?.time}</p>
                      </Col>
                      <Col sm="12" md="12" lg="2" className="m-auto">
                        {uploadingFiles.some((obj) => obj.file_key === file?.fileData?.file_key) ? (
                          <span className="ps-3">
                            <Spinner size="sm" />
                          </span>
                        ) : (
                          <div className="fw-bold m-auto d-flex gap-1">
                            <MessageIconWrap onClick={() => downloadUploadedFile({ file: file?.fileData?.file })}>
                              <span className="mail-bg">
                                <Download size={20} className="mail-icon" color={theme.activeColor} />
                              </span>
                            </MessageIconWrap>
                            <MessageIconWrap
                              onClick={() => {
                                handleRemove({ item: allDocuments?.[index], index });
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
                        <p className="fw-normal m-auto">{item?.time}</p>
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
                              if (allLinks?.[index]?.link.length > 0 && !errors?.links?.[index]) {
                                handleRemove({ item: allLinks?.[index], index });
                              }
                            }}
                          >
                            <span className="trash-bg">
                              <Trash2
                                size={20}
                                className="mail-icon"
                                color={
                                  allLinks?.[index]?.link.length > 0 && !errors?.links?.[index]
                                    ? theme.red
                                    : `${theme.red}5f`
                                }
                              />
                            </span>
                          </MessageIconWrap>
                        </div>
                      </Col>
                    </Row>
                  ))}
                </TableWrapper>
              )}
            </Form>

            <div>
              <div
                onClick={() => {
                  if (isEmptyLink) {
                    toast.error('Please enter a link', {
                      position: 'top-center', // Position the toast at the top center of the screen
                    });
                  } else {
                    linksAppend({
                      link: '',
                      description: '',
                      id: uuidv4(),
                      time: DateTime.now().toFormat(`dd MMM yyyy, hh:mm a`),
                    });
                  }
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
              <Button
                onClick={() => setSubmitModal(true)}
                disabled={
                  uploadingFiles.length > 0 ||
                  isMilestoneSubmitting ||
                  isEmptyLink ||
                  hasError ||
                  [...documentsFields, ...allLinks].length === 0 ||
                  !isPaymentDone(selectedMilestone)
                }
                color="primary"
              >
                Submit
              </Button>
            </div>
          </section>
        )}
      </Card>
    </div>
  );
};

MilestoneDetailsTab.propTypes = {
  selectedMilestone: Proptypes.object.isRequired,
  fetchProjectMilestones: Proptypes.func.isRequired,
  milestonesData: Proptypes.object.isRequired,
  setSelectedMilestoneIndex: Proptypes.func.isRequired,
};

export default MilestoneDetailsTab;
