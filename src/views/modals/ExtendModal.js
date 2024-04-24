/* eslint-disable no-nested-ternary */
import React from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import '../custom-styles.scss';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import styled from 'styled-components';
import SwitchGif from '../../assets/images/gifs/timer.gif';
import { DOCUMENT_EXTENSION, PAYMENT_EXTENSION } from '../../utility/constants/Constant';

const ExtendModal = ({ modal, toggleModal, onExtend, validityType, projectDetails }) => {
  const isLoading = useSelector((state) => state.projectDetails.extendValidityLoading);
  const SwitchModalWrapper = styled.div`
    .title {
      font-size: 1.75rem;
    }
    .sub-title {
      font-size: 1.125rem;
    }
  `;
  const handleExtend = () => {
    onExtend();
  };

  return (
    <Modal
      isOpen={modal}
      contentClassName="custom-larger-than-medium-modal-style"
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={isLoading ? null : toggleModal} />
      <ModalBody className="py-0">
        <SwitchModalWrapper>
          <div className="d-flex align-items-center px-50 py-0">
            <img src={SwitchGif} alt="complete-profile" width={170} height={170} />
            <div className="pe-1 ms-3">
              <h2 className="fw-bold modal-heading">Extend validity</h2>
              <p className="fw-normal mt-1 modal-body-text">
                {validityType === 'DOCUMENT'
                  ? projectDetails?.nda?.is_nda
                    ? 'NDA and Contract'
                    : 'Contract'
                  : 'Payment'}{' '}
                {`validity will be extended by ${
                  validityType === 'DOCUMENT' ? DOCUMENT_EXTENSION : PAYMENT_EXTENSION
                } days`}
              </p>
            </div>
          </div>
          <div className="d-flex gap-1 mb-2 justify-content-end">
            <Button disabled={isLoading} color="primary" onClick={handleExtend}>
              {isLoading ? 'Extending..' : 'Extend'}
            </Button>
          </div>
        </SwitchModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default ExtendModal;

ExtendModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  onExtend: Proptypes.func,
  validityType: Proptypes.string,
  projectDetails: Proptypes.object,
};

ExtendModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  onExtend: () => {},
  validityType: '',
  projectDetails: {},
};
