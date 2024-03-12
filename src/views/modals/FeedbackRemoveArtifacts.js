import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardSubtitle, Col, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-feather';
import DeleteGif from '../../assets/images/gifs/delete.gif';
import { AcceptModalWrapper, ArtifactsModalWrap } from './style';
import { renderFilePreview } from '../../utility/Utils';

const FeedbackRemoveArtifactsModal = ({ modal, toggleModal, data }) => {
  const onClose = () => {
    toggleModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onClose} />
      <ModalBody>
        <AcceptModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif object-fit-contain" src={DeleteGif} width={160} alt="gif" />
            <div className="content-side">
              <CardTitle className="modal-title-custom">Removed File</CardTitle>

              <ArtifactsModalWrap className="mb-1 modal-artifacts">
                {data?.link ? (
                  <Col>
                    <div className="d-flex mt-50">
                      <Link size="22" className="me-75" />
                      <span className="truncated-filename mt-25 fw-bold" id={`links-${data?.id}`}>
                        {data?.link}
                      </span>
                      <UncontrolledTooltip placement="bottom" target={`links-${data?.id}`}>
                        {data?.link}
                      </UncontrolledTooltip>
                    </div>
                  </Col>
                ) : (
                  <Col>
                    <div className="d-flex mt-50">
                      {renderFilePreview(data?.fileData?.file)}
                      <span className="truncated-filename mt-25 fw-bold" id={`document-${data?.fileData?.newId}`}>
                        {data?.fileData?.file?.name ?? data?.fileData?.file?.file_name}
                      </span>
                      <UncontrolledTooltip placement="bottom" target={`document-${data?.fileData?.newId}`}>
                        {data?.fileData?.file?.name ?? data?.fileData?.file?.file_name}
                      </UncontrolledTooltip>
                    </div>
                  </Col>
                )}
              </ArtifactsModalWrap>
              <CardSubtitle className="subtitle mb-25">
                <span className="fw-bold pe-50">{data?.description}</span>
              </CardSubtitle>
            </div>
          </div>
          <div className="d-flex gap-1  justify-content-end">
            <Button outline color="primary" onClick={onClose}>
              Close
            </Button>
          </div>
        </AcceptModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default FeedbackRemoveArtifactsModal;

FeedbackRemoveArtifactsModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  data: Proptypes.object,
};

FeedbackRemoveArtifactsModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  data: {},
};
