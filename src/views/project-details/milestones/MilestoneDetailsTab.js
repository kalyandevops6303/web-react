/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-confusing-arrow */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Badge, Button, Card, CardText, Col, Input, Label, Row, Spinner } from 'reactstrap';
import Avatar from '@components/avatar';
import Proptypes from 'prop-types';
import { Download, ExternalLink, Link, Plus, Upload } from 'react-feather';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';

import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import RaiseDisputeModal from '../../disputes/overview/RaiseDisputeModal';
import { formatDate, isFileValid, renderFilePreview, renderFileSize } from '../../../utility/Utils';
import { selectAuthUserData } from '../../../redux/selectors/authSelectors';
import { PAYMENT_STATUS, userTypes } from '../../../utility/constants/Constant';
import {
  milestoneFileUploadService,
  rejectMilestoneService,
  saveMilestoneService,
  submitMilestoneService,
} from '../../../services/projectMilestoneService';
import { transferFundService } from '../../../services/paymentDetailService';
import errorHandler from '../../../utility/errorHandler';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';

import uuidv4 from '../../../lib/uuidv4';
import { projectFileUploadToAzureService } from '../../../services/createProjectServices';
import { CustomBadge } from '../../styled';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';
import SubmitMilestoneModal from '../../modals/SubmitMilestoneModal';
import ChangeRequestMilestoneModal from '../../modals/ChangeRequestMilestoneModal';
import AcceptMilestoneModal from '../../modals/AcceptMilestone';

const MilestoneDetailsTab = ({ selectedMilestone, fetchProjectMilestones }) => {
  const [raiseDisputeModal, setRaiseDisputeModal] = useState(null);
  const [saveModal, setSaveModal] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [acceptModal, setAcceptModal] = useState(false);

  const [links, setLinks] = useState(selectedMilestone.links);
  const [isLoading, setIsLoading] = useState(false);
  const [submitBtnText, setSubmitBtnText] = useState('Milestone complete');
  const [acceptBtnText, setAcceptBtnText] = useState('Accept');
  const [saveBtnText, setSaveBtnText] = useState('Submit');
  const [rejectBtnText, setRejectBtnText] = useState('Request change');

  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [documents, setDocuments] = useState(selectedMilestone.documents);
  const [isDownloading, setIsDownloading] = useState(false);

  const userDataLocal = useSelector(selectAuthUserData);
  const projectDetailsData = useSelector(projectDetails);

  useEffect(() => {
    setSaveBtnText('Submit');
  }, [documents]);

  // Submit
  const saveMilestone = async () => {
    setIsLoading(true);
    try {
      setSaveBtnText('Loading...');
      await saveMilestoneService(selectedMilestone._id, {
        links,
        documents: documents.map((file) => ({
          file_key: file.file_key || file.uploadData.file_key,
          file_name: file.file_name || file.file.name,
        })),
      });
      await fetchProjectMilestones();
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
      setSubmitBtnText('Loading...');
      await submitMilestoneService(selectedMilestone._id);
      await fetchProjectMilestones();
      setSubmitBtnText('Milestone completed');
    } catch (error) {
      errorHandler(error);
      setSubmitBtnText('Milestone complete');
    }
    setIsLoading(false);
    setSubmitModal(false);
  };

  const rejectMilestone = async () => {
    setIsLoading(true);
    try {
      setRejectBtnText('Loading...');
      await rejectMilestoneService(selectedMilestone._id);
      await fetchProjectMilestones();
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
      await fetchProjectMilestones();
      setAcceptBtnText('Accepted');
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
      const allFiles = [...documents, ...acceptedFiles];

      if (allFiles?.length > 5) {
        ShowToastMessage(ERROR, 'Maximum 5 files allowed');
      } else {
        const validFiles = acceptedFiles.filter((file) => isFileValid(file));

        const promises = validFiles.map(async (file) => {
          const response = await milestoneFileUploadService(file.name);
          return {
            id: uuidv4(),
            file,
            uploadData: response?.data?.data,
            file_key: response?.data?.data?.file_key,
          };
        });

        const filesWithUrls = await Promise.all(promises);
        setDocuments((oldFiles) => [...oldFiles, ...filesWithUrls]);

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

  const handleDownloadFile = async (file) => {
    try {
      if (file?.download_url) {
        setIsDownloading(true);
        const response = await fetch(file.download_url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.file_name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setIsDownloading(false);
      }
    } catch (error) {
      setIsDownloading(false);
    }
  };

  const TruncateString = styled.span`
    max-width: 9rem;
    display: inline-block;
    display: block;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .truncate-1 {
      max-width: 2rem;
      display: inline-block;
      display: block;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;

  const isClient = userDataLocal.user_type === userTypes.client;

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
      <Card className="gray-card">
        <div className="mb-4">
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
          {/* <div>
            <CardText className="fw-normal mb-0 fs-6">Status</CardText>
            <CardText className="fw-bolder fs-5 mb-0">
              {selectedMilestone.status === 'IN_PROGRESS'
                ? 'In Progress'
                : selectedMilestone.status === 'CREATED'
                ? 'Created'
                : selectedMilestone.status === 'IN_REVIEW'
                ? 'In Review'
                : selectedMilestone.status === 'YET_TO_START'
                ? 'Yet to Start'
                : selectedMilestone.status === 'ON_GOING'
                ? 'On Going'
                : selectedMilestone.status}
            </CardText>
          </div> */}
        </div>
        <div className="white-card w-100">
          <CardText className="fw-bolder fs-4 mb-1">Milestone Name</CardText>
          <CardText className="fw-normal mb-3 fs-6">{selectedMilestone.name}</CardText>
          {selectedMilestone.description ? (
            <>
              <CardText className="fw-bolder fs-4 mb-1">Description</CardText>
              <CardText className="fw-normal mb-0 fs-6">{selectedMilestone.description}</CardText>
            </>
          ) : null}
        </div>
        <hr className="my-2" />
        <div className="white-card w-100">
          <CardText className="fw-bolder fs-4 mb-1">Milestone Deliverables</CardText>

          {documents.length > 0 && (
            <Row
              style={{ fontFamily: 'Montserrat' }}
              className="d-flex mb-1 mx-0 px-1 fw-bolder align-items-center justify-content-between py-8 mt-2"
            >
              <Col sm="6" md="4" style={{ width: isClient ? '32%' : '25%' }}>
                FILE NAME
              </Col>
              {userDataLocal.user_type !== userTypes.client && (
                <Col sm="2" md="2" style={{ width: isClient ? '15%' : '15%' }}>
                  STATUS
                </Col>
              )}
              <Col sm="2" md="2" style={{ width: isClient ? '24%' : '15%' }}>
                SIZE
              </Col>
              <Col sm="2" md="2" style={{ width: isClient ? '30%' : '25%' }}>
                UPLOADED ON
              </Col>
              <Col sm="1" md="1" className="pe-0" style={{ width: isClient ? '10%' : '15%' }}>
                ACTION
              </Col>
            </Row>
          )}
          {documents.map((file, index) =>
            isEditable ? (
              <Row
                key={file.id}
                className="white-card d-flex mb-1 mx-0 px-1 medium-shadow align-items-center justify-content-between py-16"
              >
                <Col className="d-flex" sm="6" md="4" lg="3">
                  {renderFilePreview(file.file)}
                  <TruncateString id={`name-edit-${index}`}>{file?.file?.name ?? file.file_name}</TruncateString>
                </Col>
                {userDataLocal.user_type !== userTypes.client && (
                  <Col sm="2" md="2" lg="2">
                    {uploadingFiles.includes(file) ? <span>Uploading...</span> : <span>Uploaded</span>}
                  </Col>
                )}
                <Col sm="2" md="2" lg="2">
                  {renderFileSize(file?.size ?? file.file.size)}
                </Col>
                <Col sm="2" md="2" lg="3">
                  {requiredFormattedDate}
                </Col>
                <Col sm="1" md="1" className="pe-0" lg="2">
                  <Button
                    color="flat-danger"
                    className="btn-left-margin"
                    disabled={uploadingFiles.includes(file)}
                    onClick={() => {
                      const uploadedDocuments = documents;
                      const filteredData = uploadedDocuments.filter((item) => item.file_key !== file.file_key);
                      setDocuments([...filteredData]);
                    }}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            ) : (
              <Row
                key={file.id}
                className="white-card d-flex mb-1 mx-0 px-1 medium-shadow align-items-center justify-content-between py-16"
              >
                <Col className="d-flex" sm="6" md="4" lg="3">
                  {renderFilePreview(file.file)}
                  <TruncateString id={`name-${index}`}>{file?.file?.name ?? file.file_name}</TruncateString>
                </Col>
                {userDataLocal.user_type !== userTypes.client && (
                  <Col sm="6" md="2" lg="2">
                    {uploadingFiles.includes(file) ? <span>Uploading...</span> : <span>Uploaded</span>}
                  </Col>
                )}
                <Col sm="2" md="2" lg="2">
                  {file?.size ? renderFileSize(file?.size) : null}
                </Col>
                <Col sm="2" md="2" lg="3">
                  {requiredFormattedDate}
                </Col>
                <Col sm="1" md="1" className="pe-0" lg="1">
                  {isDownloading ? (
                    <Spinner size="sm" />
                  ) : (
                    <Avatar
                      onClick={() => handleDownloadFile(file)}
                      color="light-primary"
                      icon={<Download size="14" />}
                      className=""
                    />
                  )}
                </Col>
              </Row>
            ),
          )}
          {links.map((item, index) =>
            isEditable ? (
              <div
                className="white-card d-flex mb-1 px-1 medium-shadow align-items-end justify-content-between py-16"
                // eslint-disable-next-line react/no-array-index-key
                key={`links-${index}`}
              >
                <div className="w-50">
                  <Label>Link</Label>
                  <Input
                    value={item}
                    onChange={(e) => {
                      setLinks([...links.slice(0, index), e.target.value, ...links.slice(index + 1)]);
                    }}
                  />
                </div>
                <Button
                  color="flat-danger"
                  className="btn-left-margin me-2"
                  onClick={() => {
                    const uploadedLinks = links;
                    const filtered = uploadedLinks.filter((i) => i !== item);
                    setLinks([...filtered]);
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div
                className="white-card d-flex mb-1 medium-shadow align-items-center justify-content-between py-16"
                // eslint-disable-next-line react/no-array-index-key
                key={`links-${index}`}
                style={{ paddingLeft: '25px', paddingRight: '50px' }}
              >
                <div className="d-flex">
                  <Link size="18" className="me-1" />
                  <p className="mb-0">{item}</p>
                </div>
                <Avatar
                  onClick={() => handleLinkOpen(item)}
                  color="light-primary"
                  icon={<ExternalLink size="14" />}
                  className="me-2"
                />
              </div>
            ),
          )}
          {isEditable ? (
            <div className="d-flex">
              <div
                onClick={() => setLinks([...links, ''])}
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
          ) : null}
        </div>
        <div className="w-100 mt-2 mb-2 d-flex justify-content-end">
          <div>
            <Button className="me-2 raise-dispute-btn" onClick={() => setRaiseDisputeModal(true)}>
              Raise Dispute
            </Button>
            {userDataLocal.user_type === userTypes.client && selectedMilestone.status === 'IN_REVIEW' ? (
              <>
                <Button
                  onClick={() => setAcceptModal(true)}
                  disabled={isLoading || acceptBtnText !== 'Accept'}
                  color="primary"
                  className="me-2"
                >
                  {acceptBtnText}
                </Button>
                <Button
                  onClick={() => setRejectModal(true)}
                  disabled={isLoading || rejectBtnText !== 'Request change'}
                  color="primary"
                >
                  {rejectBtnText}
                </Button>
              </>
            ) : isEditable ? (
              <Button
                onClick={() => setSaveModal(true)}
                disabled={
                  uploadingFiles.length > 0 ||
                  isLoading ||
                  [...documents, ...links].length === 0 ||
                  saveBtnText !== 'Submit' ||
                  !isPaymentDone(selectedMilestone)
                }
                color="primary"
              >
                {saveBtnText}
              </Button>
            ) : null}
          </div>
          <div className="ms-2 d-flex justify-content-end">
            {userDataLocal.user_type !== userTypes.client && isEditable && (
              <Button
                onClick={() => setSubmitModal(true)}
                disabled={
                  uploadingFiles.length > 0 ||
                  isLoading ||
                  submitBtnText !== 'Milestone complete' ||
                  [...documents, ...links].length === 0 ||
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
  fetchProjectMilestones: Proptypes.func.isRequired,
  milestonesData: Proptypes.object.isRequired,
};

export default MilestoneDetailsTab;
