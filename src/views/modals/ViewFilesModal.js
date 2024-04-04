import React, { useState } from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody, Row, Col, Card, CardBody, Spinner } from 'reactstrap';
import { FileText } from 'react-feather';
import DateTime from '../../lib/date-time';
import { ViewFilesModalWrapper } from './style';
import theme from '../../configs/themeVariables';
import { getDownloadUrl } from '../../redux/actions/dashboardActions';
import { downloadFile, getFileSize } from '../../utility/Utils';
import { downloadUrlLoading } from '../../redux/selectors/dashboardSelectors';

const ViewFilesModal = ({ modal, toggleModal, documents, modalTitle }) => {
  const dispatch = useDispatch();

  const downloadUrlIsLoading = useSelector(downloadUrlLoading);

  const [selectedFileKey, setSelectedFileKey] = useState(null);

  const onDownloadFileUrlSuccess = ({ download_url, file_name }) => {
    downloadFile({ data: { download_url }, file_name });
  };

  return (
    <Modal
      isOpen={modal}
      contentClassName="invite-talent-listing-modal-style"
      className="modal-dialog-centered modal-lg"
    >
      <ViewFilesModalWrapper>
        <ModalHeader toggle={toggleModal} />
        <ModalBody className="px-0 pb-2 pt-0">
          <p className="font-medium-4 fw-bold px-2">{modalTitle}</p>
          <hr />
          <div className="white-container mx-2 p-2 mt-2">
            {documents.map((document, index) => (
              <Card className={index !== documents.length - 1 ? 'mb-2' : 'mb-0'} key={document.file_key}>
                <CardBody className="m-0">
                  <Row>
                    <Col sm="6" md="6" lg="8">
                      <span
                        className="cursor-pointer"
                        style={{ color: theme.activeColor }}
                        onClick={() => {
                          setSelectedFileKey(document?.file_key);
                          dispatch(
                            getDownloadUrl({
                              fileKey: document?.file_key,
                              onSuccess: onDownloadFileUrlSuccess,
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
                          <>
                            <FileText size="18" className="me-75" />
                            {document?.file_name}
                          </>
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
                </CardBody>
              </Card>
            ))}
          </div>
        </ModalBody>
      </ViewFilesModalWrapper>
    </Modal>
  );
};

export default ViewFilesModal;

ViewFilesModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  documents: Proptypes.array,
  modalTitle: Proptypes.string,
};

ViewFilesModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  documents: [],
  modalTitle: '',
};
