import React, { useCallback, useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import '../../custom-styles.scss';
import { Modal, ModalHeader, ModalBody, Row, Col, Input, Button, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FileText, Upload } from 'react-feather';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { DisputeDetailsContainer, RepliesContainer } from '../style';
import theme from '../../../configs/themeVariables';
import Timeline from '../../../@core/components/timeline';
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

const DisputeDetailsModal = ({ modal, toggleModal, selectedDispute }) => {
  const dispatch = useDispatch();

  const replyOnDisputeIsLoading = useSelector(replyOnDisputeLoading);
  const disputeRepliesData = useSelector(disputeReplies);

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
  const rep = useRef('');
  const filesRef = useRef();

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
          const response = await disputeReplyFileUploadService(file.name, _id);
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

  const renderFilePreview = () => {
    <FileText size="18" className="me-75 mb-50" />;
  };

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
          className={index !== files.length - 1 ? 'd-flex align-items-center mb-1' : 'd-flex align-items-center'}
        >
          <div>
            {renderFilePreview(file.file)}
            {file.file.name}
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

  const onSuccess = () => {
    setIsReplyBoxPresent(false);
    rep.current = '';
    dispatch(getDisputeReplies(_id, 1, 10, []));
  };

  const onSubmit = () => {
    if (rep.current.length > 0) {
      const data = {
        dispute_id: _id,
        reply: rep.current,
      };

      dispatch(replyOnDisputeApi(data, onSuccess));
    } else {
      ShowToastMessage(ERROR, 'Please enter your response to dispute before submitting');
    }
  };

  const onCancelClick = () => {
    setUpdatedTimelineData(updatedTimelineData);
    setIsReplyBoxPresent(false);
  };

  const onReplyClick = () => {
    const newReply = {
      isDisabled: false,
      color: theme.orangeColor,
      customContent: (
        <div>
          <div className="mb-25">
            <p className="fw-bold mb-0">Response Dispute</p>
          </div>
          <div>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Input
                  type="textarea"
                  placeholder="Enter your response to dispute"
                  rows="3"
                  // eslint-disable-next-line no-return-assign
                  onChange={(e) => (rep.current = e.target.value)}
                />
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
                  <div>
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <Button color="primary" className="mt-2 d-flex align-items-center py-50">
                        <Upload size={18} className="me-75" />
                        Upload
                      </Button>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button outline color="primary" className="me-3" onClick={onCancelClick}>
                Cancel
              </Button>
              <Button color="primary" onClick={onSubmit} disabled={replyOnDisputeIsLoading}>
                {replyOnDisputeIsLoading ? <Spinner size="sm" /> : 'Submit'}
              </Button>
            </div>
          </div>
        </div>
      ),
    };

    if (!isReplyBoxPresent) {
      setUpdatedTimelineData([newReply, ...updatedTimelineData]);
      setIsReplyBoxPresent(true);
    }
  };

  useEffect(() => {
    if (status === disputeStatuses.responded) {
      dispatch(getDisputeReplies(_id, 1, 10, []));
    }
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
            <Avatar img={defaultAvatar} imgHeight="38" imgWidth="38" className="me-50" />
            <div>
              <p className="fw-bold mb-0">{`${reply?.created_by?.first_name} ${reply?.created_by?.last_name}`}</p>
              <p className="mb-0">R&D</p>
            </div>
          </div>
          <p className="fw-bold mt-1 mb-75">{dispute_type?.name}</p>
          <p className="font-medium-1">{reply.reply}</p>
        </div>
      ),
    }));

    if (disputeRepliesData?.metadata?.has_next_page) {
      setUpdatedTimelineData(timelineRepliesData);
    } else {
      const additionalData = [
        {
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
                <Avatar img={defaultAvatar} imgHeight="38" imgWidth="38" className="me-50" />
                <div>
                  <p className="fw-bold mb-0">{`${accepted_by?.first_name} ${accepted_by?.last_name}`}</p>
                  <p className="mb-0">R&D</p>
                </div>
              </div>
            </div>
          ),
        },
        {
          isDisabled: false,
          color: theme.orangeColor,
          customContent: (
            <div>
              <div className="d-flex justify-content-between mb-25">
                <p className="fw-bold mb-0">Dispute Raised</p>
                <p className="font-small-3 mb-0">{DateTime?.fromMillis(created_at)?.toRelative()}</p>
              </div>
              <p>{DateTime.fromMillis(created_at).toFormat('MMM dd, yy')}</p>
              <div className="d-flex align-items-center">
                <Avatar img={defaultAvatar} imgHeight="38" imgWidth="38" className="me-50" />
                <div>
                  <p className="fw-bold mb-0">{`${created_by?.first_name} ${created_by?.last_name}`}</p>
                  <p className="mb-0">CEO of Figma</p>
                </div>
              </div>
              <p className="fw-bold mt-1 mb-75">{dispute_type?.name}</p>
              <p className="font-medium-1">{description || ''}</p>
            </div>
          ),
        },
      ];

      if (timelineRepliesData && additionalData) {
        setUpdatedTimelineData([...timelineRepliesData, ...additionalData]);
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
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="pt-0 px-5">
        <DisputeDetailsContainer>
          <div className="d-flex justify-content-between align-items-center mt-1">
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
          <div className="d-flex justify-content-end align-items-center my-2">
            <p className="text-decoration-underline fw-bold blue-btn mb-0 me-3 cursor-pointer">Dispute Resolved</p>
            <p className="text-decoration-underline fw-bold blue-btn mb-0 cursor-pointer" onClick={onReplyClick}>
              Reply
            </p>
          </div>
          <RepliesContainer id="scrollableTimeline">
            <InfiniteScroll
              dataLength={disputeRepliesData?.data?.length || 0}
              next={loadMoreReplies}
              hasMore={disputeRepliesData?.metadata?.has_next_page}
              scrollableTarget="scrollableTimeline"
            >
              <Timeline data={updatedTimelineData} />
            </InfiniteScroll>
          </RepliesContainer>
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
};

DisputeDetailsModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  selectedDispute: {},
};
