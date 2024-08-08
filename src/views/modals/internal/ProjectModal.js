/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
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
  Spinner,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from '../../../configs/themeVariables';
import BadgeGroup from '../../../@core/components/badge-group';
import '../../custom-styles.scss';
import { selectSavedUserData } from '../../../redux/selectors/authSelectors';
import { downloadUrlLoading } from '../../../redux/selectors/dashboardSelectors';
import { convertUnixTimestampToDate, downloadFile, getFileSize, renderFilePreview } from '../../../utility/Utils';
import { getDownloadUrl } from '../../../redux/actions/dashboardActions';

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
`;

const ProjectModal = ({
  modal,
  toggleModal,
  data,
}) => {
  const dispatch = useDispatch();

  const selectSavedUserDetailsData = useSelector(selectSavedUserData);
  const downloadUrlIsLoading = useSelector(downloadUrlLoading);

  const [selectedFileKey, setSelectedFileKey] = useState(null);

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
              <CardTitle className="mb-0 d-flex justify-content-between w-100">
                <span>Project Description</span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <CardText
                className="fw-300 ms-75 project-desc"
                style={{ whiteSpace: 'pre-line' }}
                dangerouslySetInnerHTML={{ __html: data?.details?.description }}
              />
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
                      {convertUnixTimestampToDate(document?.created_at, selectSavedUserDetailsData?.availability?.timezone?.name)}
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
              <BadgeGroup title="Skills" data={data?.proficiency?.skills} color="light-blue" gapWrap />
              <BadgeGroup title="Tools" data={data?.proficiency?.tools} color="light-blue" gapWrap />
            </CardBody>
          </Card>
        </ViewProjectDetailModalWrap>
      </ModalBody>
    </Modal>
  );
};

export default ProjectModal;

ProjectModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  data: Proptypes.object,
};

ProjectModal.defaultProps = {
  modal: false,
  toggleModal: () => { },
  data: {},
};