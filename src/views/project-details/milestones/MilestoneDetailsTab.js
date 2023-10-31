/* eslint-disable no-nested-ternary */
/* eslint-disable no-confusing-arrow */
import React, { useState } from 'react';
import { Badge, Button, Card, CardText, Col, Input, Label, Row, Spinner } from 'reactstrap';
import Avatar from '@components/avatar';
import Proptypes from 'prop-types';
import { Download, ExternalLink, Link, Plus, Upload } from 'react-feather';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';

import RaiseDisputeModal from '../../disputes/overview/RaiseDisputeModal';
import { formatDate, isFileValid, renderFilePreview, renderFileSize } from '../../../utility/Utils';
import { selectAuthUserData } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import {
  acceptMilestoneService,
  milestoneFileUploadService,
  submitMilestoneService,
} from '../../../services/projectMilestoneService';
import errorHandler from '../../../utility/errorHandler';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';
import uuidv4 from '../../../lib/uuidv4';
import { projectFileUploadToAzureService } from '../../../services/createProjectServices';
import { CustomBadge } from '../../styled';

const MilestoneDetailsTab = ({ selectedMilestone, fetchProjectMilestones }) => {
  const [raiseDisputeModal, setRaiseDisputeModal] = useState(null);
  const [links, setLinks] = useState(selectedMilestone.links);
  const [isLoading, setIsLoading] = useState(false);
  const [teamButtonText, setTeamButtonText] = useState('Submit');
  const [clientButtonText, setClientButtonText] = useState('Accept');
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [documents, setDocuments] = useState(selectedMilestone.documents);

  const userDataLocal = useSelector(selectAuthUserData);

  const submitMilestone = async () => {
    setIsLoading(true);
    try {
      setTeamButtonText('Submitting...');
      await submitMilestoneService(selectedMilestone._id, {
        links,
        documents: documents.map((file) => ({
          file_key: file.uploadData.file_key,
          file_name: file.file.name,
        })),
      });
      await fetchProjectMilestones();
      setTeamButtonText('Submitted');
    } catch (error) {
      errorHandler(error);
      setTeamButtonText('Submit');
    }
    setIsLoading(false);
  };

  const acceptMilestone = async () => {
    setIsLoading(true);
    try {
      setClientButtonText('Accepting...');
      await acceptMilestoneService(selectedMilestone._id);
      await fetchProjectMilestones();
      setClientButtonText('Accepted');
    } catch (error) {
      errorHandler(error);
      setClientButtonText('Accept');
    }
    setIsLoading(false);
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
          return { id: uuidv4(), file, uploadData: response?.data?.data };
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

  const isEditable =
    userDataLocal.user_type !== userTypes.client &&
    selectedMilestone.status === 'ON_GOING' &&
    teamButtonText !== 'Submitted';

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

  return (
    <div>
      {raiseDisputeModal && (
        <RaiseDisputeModal
          modal={raiseDisputeModal}
          toggleModal={() => setRaiseDisputeModal(!raiseDisputeModal)}
          primaryFilter="all"
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
          {documents.map((file) =>
            isEditable ? (
              <Row
                key={file.id}
                className="white-card d-flex mb-1 mx-0 px-1 medium-shadow align-items-center justify-content-between py-16"
              >
                <Col sm="6" md="4" lg="3">
                  {renderFilePreview(file.file)}
                  {file.file.name}
                </Col>
                <Col sm="6" md="2" lg="2">
                  {uploadingFiles.includes(file) ? <span>Uploading...</span> : <span>Uploaded</span>}
                </Col>
                <Col sm="2" md="2" lg="2">
                  {renderFileSize(file.file.size)}
                </Col>
                <Col sm="2" md="2" lg="3">
                  {requiredFormattedDate}
                </Col>
                <Col sm="2" md="2" className="pe-0" lg="2">
                  <Button
                    color="flat-danger"
                    className="btn-left-margin"
                    disabled={uploadingFiles.includes(file)}
                    onClick={() => {
                      const uploadedDocuments = documents;
                      const filtered = uploadedDocuments.filter((i) => i.id !== file.id);
                      setDocuments([...filtered]);
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
                <Col sm="6" md="4" lg="3">
                  {renderFilePreview(file.file)}
                  {file?.file?.name ?? file.file_name}
                </Col>
                <Col sm="6" md="2" lg="2">
                  {uploadingFiles.includes(file) ? <span>Uploading...</span> : <span>Uploaded</span>}
                </Col>
                <Col sm="2" md="2" lg="2">
                  {file.file ? renderFileSize(file.file.size) : null}
                </Col>
                <Col sm="2" md="2" lg="3">
                  {requiredFormattedDate}
                </Col>
                <Col sm="1" md="1" className="pe-0" lg="1">
                  <Avatar
                    onClick={() => {
                      // eslint-disable-next-line no-undef
                      // window.open(file.uploadData.upload_url, '_blank');
                    }}
                    color="light-primary"
                    icon={<Download size="14" />}
                    className=""
                  />
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
                className="white-card d-flex mb-1 px-1 medium-shadow align-items-center justify-content-between py-16"
                // eslint-disable-next-line react/no-array-index-key
                key={`links-${index}`}
              >
                <div className="d-flex">
                  <Link size="18" className="me-1" />
                  <p className="mb-0">{item}</p>
                </div>
                <Avatar
                  onClick={() => {
                    // eslint-disable-next-line no-undef
                    window.open(item, '_blank');
                  }}
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
      </Card>
      <div className="d-flex justify-content-end">
        <Button className="me-2 raise-dispute-btn" onClick={() => setRaiseDisputeModal(true)}>
          Raise Dispute
        </Button>
        {userDataLocal.user_type === userTypes.client && selectedMilestone.status === 'IN_REVIEW' ? (
          <Button onClick={() => acceptMilestone()} disabled={clientButtonText !== 'Accept'} color="primary">
            {isLoading ? <Spinner className="me-1" size="sm" /> : null}
            {clientButtonText}
          </Button>
        ) : isEditable ? (
          <Button onClick={() => submitMilestone()} disabled={teamButtonText !== 'Submit'} color="primary">
            {isLoading ? <Spinner className="me-1" size="sm" /> : null}
            {teamButtonText}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

MilestoneDetailsTab.propTypes = {
  selectedMilestone: Proptypes.object.isRequired,
  fetchProjectMilestones: Proptypes.func.isRequired,
};

export default MilestoneDetailsTab;
