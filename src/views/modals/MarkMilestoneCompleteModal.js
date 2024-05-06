import React from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardSubtitle, Spinner } from 'reactstrap';
import Notepad from '../../assets/images/youDidIt.gif';
import { AcceptModalWrapper } from './style';

const MarkMilestoneCompleteModal = ({ data, onSuccess, modal, toggleModal }) => {
  const onClose = () => {
    toggleModal();
  };

  const isLoading = useSelector((state) => state.milestone.isMilestoneMarking);

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={isLoading ? null : onClose} />
      <ModalBody>
        <AcceptModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" src={Notepad} width={180} height={180} alt="gif" />
            <div className="content-side">
              <CardTitle className="mb-1 modal-heading">
                Are you sure you want to mark the milestone as complete?
              </CardTitle>
              <CardSubtitle className="mb-75 modal-body-text word-break">
                <b>Milestone {data?.seq}:</b> {data?.name}
              </CardSubtitle>
            </div>
          </div>
          <div className="d-flex gap-1  justify-content-end">
            <Button disabled={isLoading} outline color="primary" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} color="primary" onClick={onSuccess}>
              {isLoading ? <Spinner size="sm" /> : 'Mark as complete'}
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
  data: Proptypes.object,
};

MarkMilestoneCompleteModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  onSuccess: () => {},
  data: {},
};
