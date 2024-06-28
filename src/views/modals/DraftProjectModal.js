import React, { useState } from 'react';
import Proptypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  CardText,
  Button,
  Spinner,
  Badge,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import DateTime from '../../lib/date-time';
import theme from '../../configs/themeVariables';
import BadgeGroup from '../../@core/components/badge-group';
import '../custom-styles.scss';
import AvailableTimeComp from '../../@core/components/available-time-comp';
import { downloadUrlLoading } from '../../redux/selectors/dashboardSelectors';
import { downloadFile, getFileSize, renderFilePreview } from '../../utility/Utils';
import { getDownloadUrl } from '../../redux/actions/dashboardActions';
import { CustomDraftProjectBadge } from '../cards/style';

const ViewProjectDetailModalWrap = styled.div`
  .card-header {
    border-bottom: 1px solid ${theme.cardHeaderBorderColor};
    padding: 1.6rem 1.6rem 0.8rem;
  }
  .card-body {
    padding: 1.6rem !important;
  }
  .card-photo {
    height: 2.4rem;
    border-radius: 50%;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14);
    border: 2px solid white;
  }
  .title {
    font-weight: 400;
    font-size: 14px;
  }
  .rating-label {
    color: ${theme.bodyColor};
    font-weight: 400;
  }
  .project-name {
    font-size: 16px;
  }
  .project-desc {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  .badge {
    width: fit-content !important;
    display: initial !important;
  }

  .total-count {
    border-radius: 17px;
    border: 1px solid ${theme.newTagColor};
    background: rgba(194, 217, 255, 0.12);
    margin-top: -6px;
  }

  .empty-text {
    font-size: 16px;
    color: ${theme.infoIcon};
    font-weight: 400;
  }
`;

const DraftProjectModal = ({ modal, toggleModal, data, setDeleteDraftModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const downloadUrlIsLoading = useSelector(downloadUrlLoading);

  const [selectedFileKey, setSelectedFileKey] = useState(null);

  const expectedDuration = data?.details ? data?.details?.expected_duration : data?.expected_duration;

  const onDownloadResumeUrlSuccess = ({ download_url, file_name }) => {
    downloadFile({ data: { download_url }, file_name });
  };

  return (
    <Modal
      contentClassName="custom-modal-project-details"
      isOpen={modal}
      toggle={toggleModal}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={toggleModal} />
      <ModalBody>
        <ViewProjectDetailModalWrap>
          <Card>
            <CardHeader>
              <CardTitle className="mb-0 d-flex align-items-center w-100">
                <span>Project Details</span>
                <CustomDraftProjectBadge>
                  <Badge className={`${data?.status} truncate-1 ms-1 rounded-corner px-75`} color="badge">
                    Draft
                  </Badge>
                </CustomDraftProjectBadge>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row className="mb-2">
                <Col lg="5">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">
                      {data?.name ?? data?.details?.name ?? '(Untitled)'}
                    </CardTitle>
                    <CardText className="project-name">Project Name</CardText>
                  </div>
                </Col>
                <Col lg="3">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">
                      {data?.details?.expected_duration || data?.expected_duration ? (
                        <>
                          {expectedDuration?.duration}
                          {expectedDuration?.duration_type?.charAt(0)?.toLowerCase()}
                        </>
                      ) : (
                        <p className="empty-text m-0 mb-25">
                          <i>(Add duration)</i>
                        </p>
                      )}
                    </CardTitle>
                    <CardText className="project-name">Expected Duration</CardText>
                  </div>
                </Col>
                <Col lg="4">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">
                      {data?.listing_details &&
                      data?.listing_details?.start_date_epoch &&
                      data?.listing_details?.end_date_epoch ? (
                        <>
                          {DateTime?.fromMillis(data?.listing_details?.start_date_epoch).toFormat('dd LLL yyyy')} to{' '}
                          {DateTime?.fromMillis(data?.listing_details?.end_date_epoch).toFormat('dd LLL yyyy')}
                        </>
                      ) : (
                        <p className="empty-text m-0 mb-25">
                          <i>(Add listing duration)</i>
                        </p>
                      )}
                    </CardTitle>
                    <CardText className="project-name">Listing Duration</CardText>
                  </div>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col lg="5">
                  <div>
                    {data?.pay_type?.currency?.name ? (
                      <CardTitle className="mb-25 fw-bolder">{data?.pay_type?.currency?.name}</CardTitle>
                    ) : (
                      <p className="empty-text m-0 mb-25">
                        <i>(Add currency)</i>
                      </p>
                    )}
                    <CardText className="project-name">Currency</CardText>
                  </div>
                </Col>

                <Col lg="3">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">
                      {data?.pay_type ? (
                        <div>
                          {data?.pay_type?.fixed_cost
                            ? ` Fixed - 
                          ${data?.pay_type?.currency?.code} ${data?.pay_type?.fixed_cost}`
                            : 'Variable'}
                        </div>
                      ) : (
                        <p className="empty-text m-0">
                          <i>(Add payment type)</i>
                        </p>
                      )}
                    </CardTitle>
                    <CardText className="project-name">Payment Type</CardText>
                  </div>
                </Col>
                <Col lg="4">
                  <div>
                    {data?.nda ? (
                      <CardTitle className="mb-25 fw-bolder">{data?.nda?.is_nda ? 'Yes' : 'No'}</CardTitle>
                    ) : (
                      <p className="empty-text m-0 mb-25">
                        <i>(Add Yes/No)</i>
                      </p>
                    )}
                    <CardText className="project-name">NDA</CardText>
                  </div>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col lg="5">
                  <AvailableTimeComp
                    timeZone={data?.availability?.timezone?.abbreviation}
                    weekdaysData={data?.availability?.weekdays_avl}
                    weekendsData={data?.availability?.weekends_avl}
                  />
                </Col>
                <Col lg="3">
                  <div>
                    {data?.availability?.time_overlap ? (
                      <CardTitle className="mb-25 fw-bolder">{data?.availability?.time_overlap} hr</CardTitle>
                    ) : (
                      <p className="empty-text m-0 mb-25">
                        <i>(Add overlap)</i>
                      </p>
                    )}
                    <CardText className="project-name">Minimum Overlap</CardText>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="mb-0 d-flex justify-content-between w-100">
                <span>Project Description</span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              {data?.details?.description ? (
                <CardText
                  className="fw-300 ms-75 project-desc"
                  style={{ whiteSpace: 'pre-line' }}
                  dangerouslySetInnerHTML={{ __html: data?.details?.description }}
                />
              ) : (
                <p className="empty-text m-0 mb-25">
                  <i>(Add description)</i>
                </p>
              )}
            </CardBody>
          </Card>

          {data?.details?.documents?.length > 0 && (
            <Card>
              <CardBody>
                {data?.details?.documents.map((document, index) => (
                  <Row
                    key={document.file_key}
                    className={
                      // eslint-disable-next-line no-unsafe-optional-chaining
                      index !== data?.details?.documents.length - 1
                        ? 'd-flex align-items-center mb-1'
                        : 'd-flex align-items-center'
                    }
                  >
                    <Col sm="6" md="6" lg="8">
                      <span
                        className="cursor-pointer"
                        style={{ color: theme.activeColor }}
                        onClick={() => {
                          setSelectedFileKey(document?.file_key);
                          dispatch(
                            getDownloadUrl({
                              fileKey: document?.file_key,
                              onSuccess: onDownloadResumeUrlSuccess,
                              fileName: document?.file_name,
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
                      </span>
                    </Col>
                    <Col sm="6" md="6" lg="2" className="text-end">
                      {getFileSize(document?.size)}
                    </Col>
                    <Col sm="6" md="6" lg="2" className="text-end">
                      {DateTime?.fromMillis(document?.created_at).toFormat('dd MMM yyyy')}
                    </Col>
                  </Row>
                ))}
              </CardBody>
            </Card>
          )}
          <Card>
            <CardHeader>
              <CardTitle className="mb-0 d-flex justify-content-between w-100">
                <span>Requirement Details</span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              {data?.proficiency?.skills?.length ? (
                <BadgeGroup title="Skills" data={data?.proficiency?.skills} color="light-blue" gapWrap />
              ) : (
                <>
                  <p className="heading mb-50">Skills</p>
                  <p className="empty-text m-0 mb-2">
                    <i>(Add skills)</i>
                  </p>
                </>
              )}
              {data?.proficiency?.tools?.length ? (
                <BadgeGroup title="Tools" data={data?.proficiency?.tools} color="light-blue" gapWrap />
              ) : (
                <>
                  <p className="heading mb-50">Tools</p>
                  <p className="empty-text m-0 mb-25">
                    <i>(Add tools)</i>
                  </p>
                </>
              )}
            </CardBody>
          </Card>
          <div className="d-flex justify-content-end mb-1 mt-3">
            <Button
              color="danger"
              outline
              className="me-2"
              onClick={() => {
                toggleModal();
                setDeleteDraftModal(true);
              }}
            >
              Delete Draft
            </Button>
            <Button color="primary" onClick={() => navigate(`/create-project/${data?._id}`)}>
              <span>Edit Draft</span>
            </Button>
          </div>
        </ViewProjectDetailModalWrap>
      </ModalBody>
    </Modal>
  );
};

export default DraftProjectModal;

DraftProjectModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  data: Proptypes.object,
  setDeleteDraftModal: Proptypes.func,
};

DraftProjectModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  data: {},
  setDeleteDraftModal: () => {},
};
