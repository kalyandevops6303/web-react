import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  CardTitle,
  CardSubtitle,
  Col,
  UncontrolledTooltip,
  Spinner,
} from 'reactstrap';
import { Link } from 'react-feather';
import DeleteGif from '../../assets/images/gifs/delete.gif';
import { AcceptModalWrapper, ArtifactsModalWrap } from './style';
import { renderFilePreview } from '../../utility/Utils';
import { deleteDraftMilestone } from '../../redux/actions/milestoneActions';
import { isDeleteDraftMilestoneLoading } from '../../redux/selectors/milestoneSelectors';

const RemoveArtifactsModal = ({ onSuccess, modal, toggleModal, data, milestoneId }) => {
  const onClose = () => {
    toggleModal();
  };
  const deleteDraftMilestoneLoading = useSelector(isDeleteDraftMilestoneLoading);
  const dispatch = useDispatch();
  const deleteDraftArtifact = () => {
    if (data?.doc_id) {
      dispatch(
        deleteDraftMilestone({
          milestoneId,
          data: [data?.doc_id],
          onSuccess,
        }),
      );
    } else {
      onSuccess();
    }
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onClose} />
      <ModalBody>
        <AcceptModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" src={DeleteGif} width={160} height={160} alt="gif" />
            <div className="content-side">
              <CardTitle className="modal-title-custom">Are you sure you want to remove this artifact? </CardTitle>
              <ArtifactsModalWrap className="mb-2 modal-artifacts">
                {data?.link ? (
                  <Col className="d-flex">
                    <Link size="22" className="me-75" />
                    <span className="truncated-filename mt-25 fw-bold" id={`links-${data?.id}`}>
                      {data?.link}
                    </span>
                    <UncontrolledTooltip placement="bottom" target={`links-${data?.id}`}>
                      {data?.link}
                    </UncontrolledTooltip>
                  </Col>
                ) : (
                  <Col className="d-flex">
                    {renderFilePreview(data?.fileData?.file)}
                    <span className="truncated-filename mt-25 fw-bold" id={`document-${data?.fileData?.newId}`}>
                      {data?.fileData?.file?.name ?? data?.fileData?.file?.file_name}
                    </span>
                    <UncontrolledTooltip placement="bottom" target={`document-${data?.fileData?.newId}`}>
                      {data?.fileData?.file?.name ?? data?.fileData?.file?.file_name}
                    </UncontrolledTooltip>
                  </Col>
                )}
              </ArtifactsModalWrap>
              <CardSubtitle className="mb-75 subtitle">
                Only after submission client will receive <br /> these files.{' '}
              </CardSubtitle>
            </div>
          </div>
          <div className="d-flex gap-1  justify-content-end">
            <Button outline color="primary" onClick={onClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={deleteDraftArtifact}>
              {deleteDraftMilestoneLoading ? <Spinner size="sm" /> : <span>Remove</span>}
            </Button>
          </div>
        </AcceptModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default RemoveArtifactsModal;

RemoveArtifactsModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  onSuccess: Proptypes.func,
  data: Proptypes.object,
  milestoneId: Proptypes.string.isRequired,
};

RemoveArtifactsModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  onSuccess: () => {},
  data: {},
};
