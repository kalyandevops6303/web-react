import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { ChevronRight } from 'react-feather';
import uploadResumeImage from '../../assets/images/uploadResumeImage.png';

const UploadResumeModal = ({ modal, uploadButton, toggleModal }) => (
  <Modal
    isOpen={modal}
    contentClassName="custom-larger-than-medium-modal-style modal-dialog"
    className="modal-dialog-centered modal-lg trumio"
  >
    <ModalHeader toggle={toggleModal} />
    <ModalBody className="py-0">
      <div className="d-flex align-items-center px-50 py-0">
        <img src={uploadResumeImage} alt="complete-profile" width={160} height={160} />
        <div className="pe-1 ms-3">
          <h2 className="fw-bold modal-heading">
            <b>Auto - Fill Profile!</b>
          </h2>
          <p className="fw-normal modal-body-text mt-1">Upload your resume to auto fill your profile</p>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-end pb-2 pe-2">{uploadButton}</div>
    </ModalBody>
  </Modal>
);

export default UploadResumeModal;

UploadResumeModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  uploadButton: Proptypes.func.isRequired,
};

UploadResumeModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
