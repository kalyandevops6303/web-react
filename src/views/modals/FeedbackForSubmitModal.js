import React from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import '../custom-styles.scss';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  UncontrolledTooltip,
} from 'reactstrap';
import { Link } from 'react-feather';
import Feedback from '../../assets/images/gifs/feedback_success.gif';
import { AcceptModalWrapper, ArtifactsModalWrap } from './style';
import { renderFilePreview } from '../../utility/Utils';

const FeedbackForSubmitModal = ({ modal, toggleModal, links, documents }) => {
  const onClose = () => {
    toggleModal();
  };
  const isLoading = useSelector((state) => state.projectDetails.sendDocumentLoading);
  const isSignLoading = useSelector((state) => state.projectDetails.signContractByTalentLoading);

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={isSignLoading || isLoading ? null : onClose} />
      <ModalBody>
        <AcceptModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif object-fit-contain" src={Feedback} width={220} alt="gif" />
            <div className="content-side">
              <CardTitle className="modal-title-custom">Great Job!</CardTitle>
              <CardSubtitle className="mb-1 subtitle">
                You have successfully completed a milestone submission{' '}
              </CardSubtitle>
              <ArtifactsModalWrap className="mb-2 modal-artifacts">
                {documents?.map((file) => (
                  <Row key={`document-${file?.file_key}`} className="m-0 mb-75 ">
                    <Col className="d-flex">
                      {renderFilePreview(file?.fileData?.file)}
                      <span className="truncated-filename mt-25 fw-bold" id={`document-${file?.fileData?.newId}`}>
                        {file?.fileData?.file?.name ?? file?.fileData?.file?.file_name}
                      </span>
                      <UncontrolledTooltip placement="bottom" target={`document-${file?.fileData?.newId}`}>
                        {file?.fileData?.file?.name ?? file?.fileData?.file?.file_name}
                      </UncontrolledTooltip>
                    </Col>
                  </Row>
                ))}
                {links?.map((file) => (
                  <Row key={`links-${file?.id}`} className="w-100 m-0 mb-75">
                    <Col className="d-flex">
                      <Link size="22" className="me-75" />
                      <span className="truncated-filename mt-25 fw-bold" id={`links-${file?.id}`}>
                        {file?.link}
                      </span>
                      <UncontrolledTooltip placement="bottom" target={`links-${file?.id}`}>
                        {file?.link}
                      </UncontrolledTooltip>
                    </Col>
                  </Row>
                ))}
              </ArtifactsModalWrap>
            </div>
          </div>
          <div className="d-flex gap-1  justify-content-end">
            <Button disabled={isSignLoading || isLoading} outline color="primary" onClick={onClose}>
              Close
            </Button>
          </div>
        </AcceptModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default FeedbackForSubmitModal;

FeedbackForSubmitModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  links: Proptypes.array,
  documents: Proptypes.array,
};

FeedbackForSubmitModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  links: [],
  documents: [],
};
