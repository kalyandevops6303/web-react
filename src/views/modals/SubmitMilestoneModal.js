import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  CardTitle,
  CardSubtitle,
  Spinner,
  Col,
  UncontrolledTooltip,
  Row,
} from 'reactstrap';
import { Link } from 'react-feather';
import Notepad from '../../assets/images/youDidIt.gif';
import { AcceptModalWrapper, ArtifactsModalWrap } from './style';
import { renderFilePreview } from '../../utility/Utils';

const SubmitMilestoneModal = ({ isLoading, onSuccess, modal, toggleModal, links, documents }) => {
  const onClose = () => {
    toggleModal();
  };
  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={isLoading ? null : onClose} />
      <ModalBody>
        <AcceptModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" src={Notepad} width={180} height={180} alt="gif" />
            <div className="content-side">
              <CardTitle className="modal-heading">Are you sure you want to make this submission? </CardTitle>
              <CardSubtitle className="mb-1 modal-body-text">
                Only after submission client will receive <br /> these files.{' '}
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
            <Button disabled={isLoading} outline color="primary" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} color="primary" onClick={onSuccess}>
              {isLoading ? <Spinner size="sm" /> : 'Submit'}
            </Button>
          </div>
        </AcceptModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default SubmitMilestoneModal;

SubmitMilestoneModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  onSuccess: Proptypes.func,
  links: Proptypes.array,
  documents: Proptypes.array,
  isLoading: Proptypes.bool,
};

SubmitMilestoneModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  onSuccess: () => {},
  links: [],
  documents: [],
  isLoading: false,
};
