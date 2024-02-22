import React from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardSubtitle, Spinner } from 'reactstrap';
import Notepad from '../../assets/images/youDidIt.gif';
import { AcceptModalWrapper } from './style';

const MarkMilestoneCompleteModal = ({ onSuccess, modal, toggleModal }) => {
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
            <img className="gif" src={Notepad} width={180} height={180} alt="gif" />
            <div className="content-side">
              <CardTitle className="modal-title-custom">
                Are you sure you want to mark the milestone as complete?
              </CardTitle>
              <CardSubtitle className="mb-75 subtitle">
                <b>Milestone 2:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </CardSubtitle>
            </div>
          </div>
          <div className="d-flex gap-1  justify-content-end">
            <Button disabled={isSignLoading || isLoading} outline color="primary" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isSignLoading || isLoading} color="primary" onClick={onSuccess}>
              {isSignLoading || isLoading ? <Spinner size="sm" /> : 'Agree & Sign'}
            </Button>
          </div>
        </AcceptModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default MarkMilestoneCompleteModal;

MarkMilestoneCompleteModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  onSuccess: Proptypes.func,
};

MarkMilestoneCompleteModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  onSuccess: () => {},
};
