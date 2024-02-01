import React from 'react';
import Proptypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../custom-styles.scss';
import Notepad from '../../assets/images/youDidIt.gif';
import { RelistModalWrapper } from './style';

const RelistConfirmationModal = ({ modal, toggleModal }) => {
  const navigate = useNavigate();

  const onCreateNewProjectClick = () => {
    navigate('/create-project');
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={toggleModal} />
      <ModalBody>
        <RelistModalWrapper className="pe-50">
          <div className="d-flex pr-1">
            <div className="me-1">
              <img src={Notepad} alt="you-did-it" width={189} height={189} />
            </div>
            <div>
              <h2 className="mb-1">Are you sure you want to re-list project?</h2>
              <p className="note-text font-medium-3 mt-75">
                <span className="fw-bolder">Note:</span> You will not be able to edit project. Create a new project if
                you want to make changes.
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center mb-2">
            <Button color="primary" outline className="me-2" onClick={onCreateNewProjectClick}>
              Create New Project
            </Button>
            <Button color="primary">Re-list</Button>
          </div>
        </RelistModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default RelistConfirmationModal;

RelistConfirmationModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

RelistConfirmationModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
