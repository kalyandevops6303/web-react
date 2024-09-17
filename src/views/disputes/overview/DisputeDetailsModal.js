/* eslint-disable no-unsafe-optional-chaining */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import '../../custom-styles.scss';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, ModalHeader, ModalBody, Row, Col, Input, Button, Spinner, Form, FormFeedback } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Upload } from 'react-feather';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { DisputeDetailsContainer, RepliesContainer } from '../style';
import theme from '../../../configs/themeVariables';
import DisputesTimeline from '../../../@core/components/disputes-timeline';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';
import { disputeStatusEnum, disputeStatuses, maxFileSize } from '../../../utility/constants/Constant';
import DateTime from '../../../lib/date-time';
import InfiniteScroll from '../../../lib/infinite-scroll';
import useDropzone from '../../../lib/react-dropzone';
import uuidv4 from '../../../lib/uuidv4';
import { getDisputeReplies, replyOnDisputeApi } from '../../../redux/actions/disputeActions';
import { disputeReplies, replyOnDisputeLoading } from '../../../redux/selectors/disputeSelectors';
import { UploadIconContainer } from '../../Onboarding/style';
import { disputeReplyFileUploadService, disputeReplyFileUploadToAzureService } from '../../../services/disputeServices';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import DisputeClosedModal from './DisputeClosedModal';
import { downloadFile, downloadUploadedFile, renderFilePreview } from '../../../utility/Utils';
import { getDownloadUrl } from '../../../redux/actions/dashboardActions';
import { downloadUrlLoading } from '../../../redux/selectors/dashboardSelectors';

const DisputeDetailsModal = ({ modal, toggleModal, selectedDispute, primaryFilter, onClose }) => {
  const ResponseSchema = yup.object().shape({
    response: yup
      .string()
      .min(50, 'Response must be at least 50 characters')
      .max(2000, 'Response must be 2000 characters or less')
      .required('Response is required'),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ResponseSchema),
  });

  const dispatch = useDispatch();

  const replyOnDisputeIsLoading = useSelector(replyOnDisputeLoading);
  const disputeRepliesData = useSelector(disputeReplies);
  const downloadUrlIsLoading = useSelector(downloadUrlLoading);

  const {
    dispute_number,
    project,
    status,
    created_at,
    _id,
    dispute_type,
    accepted_by,
    accepted_on,
    created_by,
    description,
  } = selectedDispute;

  const [files, setFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [updatedTimelineData, setUpdatedTimelineData] = useState([]);
  const [isReplyBoxPresent, setIsReplyBoxPresent] = useState(false);
  const [disputeClosedModal, setDisputeClosedModal] = useState(null);
  const [selectedFileKey, setSelectedFileKey] = useState(null);
  const filesRef = useRef();

  const toggleDisputeClosedModal = () => {
    setDisputeClosedModal(!disputeClosedModal);
  };

  const onCancelClick = () => {
    setIsReplyBoxPresent(false);
    setFiles([]);
    reset();
  };

  const onSuccess = () => {
    onCancelClick();
    dispatch(getDisputeReplies(_id, 1, 10, []));
  };

  const onSubmit = (data) => {
    let reqData = {};
    if (files.length > 0) {
      reqData = {
        dispute_id: _id,
        reply: data.response,
        documents: files.map((file) => ({
          file_name: file?.file?.name || file?.file?.file_name,
          file_key: file.uploadData.file_key,
        })),
      };
    } else {
      reqData = {
        dispute_id: _id,
        reply: data.response,
      };
    }

    dispatch(replyOnDisputeApi(reqData, onSuccess, onCancelClick));
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

      await disputeReplyFileUploadToAzureService(file.uploadData.upload_url, file.file, {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': 'multipart/form-data',
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
        const response = await disputeReplyFileUploadService(file.name, _id);
        return { id: uuidv4(), file, uploadData: response?.data?.data };
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

  const fileList = () => (
    <>
      {files.map((file, index) => (
        <div
          key={file.id}
          className={
            index !== files.length - 1
              ? 'd-flex align-items-center mb-1 justify-content-between'
              : 'd-flex align-items-center justify-content-between'
          }
        >
          <div
            className="d-flex cursor-pointer"
            style={{ color: theme.activeColor, maxWidth: 'fit-content' }}
            onClick={() => downloadUploadedFile({ file: file.file })}
          >
            <div className="d-flex align-items-center">
              <span>{renderFilePreview(file?.file)}</span>
              <span>{file.file.name}</span>
            </div>
          </div>
          <div>
            <Button
              color="flat-danger"
              className="btn-left-margin"
              disabled={uploadingFiles.includes(file)}
              onClick={() => handleRemoveFile(file)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
    </>
  );

  const onDownloadResumeUrlSuccess = ({ download_url, file_name }) => {
    downloadFile({ data: { download_url }, file_name });
  };

  useEffect(() => {
    dispatch(getDisputeReplies(_id, 1, 10, []));
  }, []);

  useEffect(() => {
    const timelineRepliesData = disputeRepliesData?.data?.map((reply) => ({
      isDisabled: false,
      color: theme.orangeColor,
      customContent: (
        <div>
          <div className="d-flex justify-content-between mb-25">
            <p className="fw-bold mb-0">Dispute Response</p>
            <p className="font-small-3 mb-0">{DateTime?.fromMillis(reply?.created_at)?.toRelative()}</p>
          </div>
          <p>{DateTime.fromMillis(reply?.created_at).toFormat('MMM dd, yy')}</p>
          <div className="d-flex align-items-center">
            <Avatar
              img={reply?.created_by?.image_uri?.length > 0 ? reply?.created_by?.image_uri : defaultAvatar}
              imgHeight="38"
              imgWidth="38"
              className="me-50"
            />
            <div>
              <p className="fw-bold mb-0">{`${reply?.created_by?.first_name} ${reply?.created_by?.last_name}`}</p>
              <p className="mb-0">
                {'company_name' in reply?.created_by ? reply?.created_by?.company_name : reply?.created_by?.role?.name}
              </p>
            </div>
          </div>
          <p className="fw-bold mt-1 mb-75">{dispute_type?.name}</p>
          <p className="font-medium-1">{reply.reply}</p>
          {reply?.documents?.length > 0 && (
            <div>
              {reply?.documents?.map((document) => (
                <div
                  key={document.file_key}
                  className="d-flex cursor-pointer"
                  style={{ color: theme.activeColor, maxWidth: 'fit-content' }}
                  onClick={() => {
                    setSelectedFileKey(document?.file_key);
                    dispatch(
                      getDownloadUrl({
                        fileKey: document?.file_key,
                        onSuccess: onDownloadResumeUrlSuccess,
                        fileName: document.file_name,
                      }),
                    );
                  }}
                >
                  {downloadUrlIsLoading && selectedFileKey === document?.file_key ? (
                    <div className="d-flex align-items-center justify-content-start">
                      <Spinner color="primary" />
                    </div>
                  ) : (
                    <div className="d-flex align-items-center">
                      <span>{renderFilePreview(document)}</span>
                      <span>{document.file_name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    }));

    if (disputeRepliesData?.metadata?.has_next_page) {
      setUpdatedTimelineData(timelineRepliesData);
    } else {
      const underReviewData = {
        isDisabled: false,
        color: theme.orangeColor,
        customContent: (
          <div>
            <div className="d-flex justify-content-between mb-25">
              <p className="fw-bold mb-0">Under Review</p>
              <p className="font-small-3 mb-0">{DateTime?.fromMillis(accepted_on)?.toRelative()}</p>
            </div>
            <p>{DateTime.fromMillis(accepted_on).toFormat('MMM dd, yy')}</p>
            <div className="d-flex align-items-center">
              <Avatar
                img={accepted_by?.image_uri?.length > 0 ? accepted_by?.image_uri : defaultAvatar}
                imgHeight="38"
                imgWidth="38"
                className="me-50"
              />
              <div>
                <p className="fw-bold mb-0">{`${accepted_by?.first_name} ${accepted_by?.last_name}`}</p>
                <p className="mb-0">
                  {'company_name' in accepted_by ? accepted_by?.company_name : accepted_by?.role?.name}
                </p>
              </div>
            </div>
          </div>
        ),
      };
      const disputeRaisedData = {
        isDisabled: false,
        color: theme.orangeColor,
        customContent: (
          <div>
            <div className="d-flex justify-content-between mb-25">
              <p className="fw-bold modal-heading mb-0">Dispute Raised</p>
              <p className="font-small-3 mb-0">{DateTime?.fromMillis(created_at)?.toRelative()}</p>
            </div>
            <p>{DateTime.fromMillis(created_at).toFormat('MMM dd, yy')}</p>
            <div className="d-flex align-items-center">
              <Avatar
                img={created_by?.image_uri?.length > 0 ? created_by?.image_uri : defaultAvatar}
                imgHeight="38"
                imgWidth="38"
                className="me-50"
              />
              <div>
                <p className="fw-bold mb-0">{`${created_by?.first_name} ${created_by?.last_name}`}</p>
                <p className="mb-0">
                  {'company_name' in created_by ? created_by?.company_name : created_by?.role?.name}
                </p>
              </div>
            </div>
            <p className="fw-bold mt-1 mb-75">{dispute_type?.name}</p>
            <p className="modal-body-text" style={{ wordWrap: 'break-word' }}>
              {description || ''}
            </p>
          </div>
        ),
      };

      if (timelineRepliesData) {
        if (accepted_on > 0) {
          setUpdatedTimelineData([...timelineRepliesData, underReviewData, disputeRaisedData]);
        } else {
          setUpdatedTimelineData([...timelineRepliesData, disputeRaisedData]);
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (accepted_on > 0) {
          setUpdatedTimelineData([underReviewData, disputeRaisedData]);
        } else {
          setUpdatedTimelineData([disputeRaisedData]);
        }
      }
    }
  }, [disputeRepliesData]);

  const loadMoreReplies = () => {
    setIsReplyBoxPresent(false);
    dispatch(
      getDisputeReplies(
        _id,
        // eslint-disable-next-line no-unsafe-optional-chaining
        disputeRepliesData?.metadata?.current_page + 1,
        10,
        disputeRepliesData?.data,
      ),
    );
  };

  return (
    <Modal isOpen={modal} contentClassName="listing-team-members-modal-style" className="modal-dialog-centered">
      {disputeClosedModal && (
        <DisputeClosedModal
          modal={disputeClosedModal}
          toggleModal={toggleDisputeClosedModal}
          selectedDispute={selectedDispute}
          toggleDetailsModal={toggleModal}
          primaryFilter={primaryFilter}
          onClose={onClose}
        />
      )}
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="pt-0 px-5">
        <DisputeDetailsContainer>
          <div className="d-flex justify-content-between align-items-center mt-1 ps-1">
            <div>
              <h4 className="font-medium-4 mb-25">#{dispute_number}</h4>
              <p className="fw-bold font-medium-1 mb-0">Project name - {project?.details?.name}</p>
            </div>
            <div className="d-flex">
              <div className="text-end me-2">
                <p className="mb-25">Status</p>
                <h4 className="font-medium-1">{disputeStatusEnum[status]}</h4>
              </div>
              <div className="text-end">
                <p className="mb-25">Raised On</p>
                <h4 className="font-medium-1">{DateTime.fromMillis(created_at).toFormat('MMM dd, yy')}</h4>
              </div>
            </div>
          </div>
          {status !== disputeStatuses.resolved && (
            <div className="d-flex justify-content-end align-items-center mt-2">
              <p
                className="text-decoration-underline fw-bold blue-btn mb-0 me-3 cursor-pointer"
                onClick={() => setDisputeClosedModal(true)}
              >
                Resolve Dispute
              </p>
              {isReplyBoxPresent ?
                <p className='fw-bold mb-0'
                >Reply</p>
                :
                <p
                  className="text-decoration-underline fw-bold blue-btn mb-0 cursor-pointer"
                  onClick={() => {
                    if (!isReplyBoxPresent) {
                      reset();
                      setIsReplyBoxPresent(true);
                    }
                  }}
                >
                  Reply
                </p>}
            </div>
          )}
          {isReplyBoxPresent && (
            <div className="ps-4">
              <div className="mb-25">
                <p className="fw-bold mb-0">Dispute Response</p>
              </div>
              <div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="mb-1">
                    <Col sm="12" md="12" lg="6">
                      <Controller
                        id="response"
                        name="response"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="textarea"
                            placeholder="Enter your respone to dispute"
                            rows="3"
                            invalid={errors.response && true}
                          />
                        )}
                      />
                      {errors.response && <FormFeedback>{errors.response.message}</FormFeedback>}
                      {files.length ? (
                        <>
                          <div className="mt-50">{fileList()}</div>
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
                        <div>
                          <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <Button color="primary" type="button" className="mt-2 d-flex align-items-center py-50">
                              <Upload size={18} className="me-75" />
                              Upload
                            </Button>
                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-end">
                    <Button
                      outline
                      color="primary"
                      type="button"
                      className="me-3"
                      onClick={onCancelClick}
                      disabled={replyOnDisputeIsLoading || uploadingFiles.length > 0}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      disabled={replyOnDisputeIsLoading || uploadingFiles.length > 0}
                    >
                      {replyOnDisputeIsLoading ? <Spinner size="sm" /> : 'Submit'}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          )}
          {updatedTimelineData?.length === 0 ? (
            <ComponentSpinner className="mt-5" />
          ) : (
            <RepliesContainer id="scrollableTimeline" className="mt-2">
              <InfiniteScroll
                dataLength={disputeRepliesData?.data?.length || 0}
                next={loadMoreReplies}
                hasMore={disputeRepliesData?.metadata?.has_next_page}
                scrollableTarget="scrollableTimeline"
                loader={<div className="d-flex justify-content-center">Loading...</div>}
              >
                <DisputesTimeline data={updatedTimelineData} />
              </InfiniteScroll>
            </RepliesContainer>
          )}
        </DisputeDetailsContainer>
      </ModalBody>
    </Modal>
  );
};

export default DisputeDetailsModal;

DisputeDetailsModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  selectedDispute: Proptypes.object,
  primaryFilter: Proptypes.string,
  onClose: Proptypes.func,
};

DisputeDetailsModal.defaultProps = {
  modal: false,
  toggleModal: () => { },
  selectedDispute: {},
  primaryFilter: '',
  onClose: () => { },
};
