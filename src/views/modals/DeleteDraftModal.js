import React from 'react';
import Proptypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, Spinner } from 'reactstrap';
import '../custom-styles.scss';
import Delete from '../../assets/images/gifs/delete.gif';
import { RelistModalWrapper } from './style';

const DeleteDraftModal = ({ modal, toggleModal, projectName, onDeleteDraft, isDeleteDraftLoading, bidAmount }) => (
  <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
    <ModalHeader toggle={toggleModal} />
    <ModalBody className="pt-0">
      <RelistModalWrapper className="pe-50">
        <div className="d-flex pr-1">
          <div className="me-3 ms-1">
            <img src={Delete} alt="you-did-it" width={189} height={189} />
          </div>
          <div>
            <h2 className="mb-1 modal-heading">Are you sure you want to delete this draft?</h2>
            <div className="d-flex justify-content-between mt-2">
              <div className="pe-1 d-flex flex-column">
                <p className="project-name mb-50">{projectName}</p>
                <p className="project-name-label m-0">Project Name</p>
              </div>
              {bidAmount && (
                <div className="left-border ps-1 d-flex flex-column justify-content-end">
                  <p className="project-name mb-50">$429</p>
                  <p className="project-name-label m-0">Bid Amount</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center mb-2">
          <Button color="primary" outline className="me-2" onClick={toggleModal}>
            Cancel
          </Button>
          <Button color="danger" onClick={onDeleteDraft} disabled={isDeleteDraftLoading}>
            {isDeleteDraftLoading ? <Spinner size="sm" /> : 'Delete Draft'}
          </Button>
        </div>
      </RelistModalWrapper>
    </ModalBody>
  </Modal>
);

export default DeleteDraftModal;

DeleteDraftModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  projectName: Proptypes.string,
  onDeleteDraft: Proptypes.func,
  isDeleteDraftLoading: Proptypes.bool,
  bidAmount: Proptypes.number,
};

DeleteDraftModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  projectName: '',
  onDeleteDraft: () => {},
  isDeleteDraftLoading: false,
  bidAmount: 0,
};
