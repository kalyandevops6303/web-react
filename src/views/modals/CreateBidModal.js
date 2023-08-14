import React, { useState } from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import { CreateBidRadioOption } from '../styled';

const CreateBidModal = ({ modal, toggleModal, selectedProject }) => {
  const [selectedFlow, setSelectedFlow] = useState('');

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="pt-0 pb-3">
        <p className="font-large-1 text-center">Create Bid</p>
        <p className="font-medium-2 fw-bold mt-3 ms-50">Select flow type -</p>
        <div className="d-flex mt-2 px-50">
          <CreateBidRadioOption
            className="me-1 cursor-pointer"
            active={selectedFlow === 'simple'}
            onClick={() => setSelectedFlow('simple')}
          >
            <div className="form-check form-check-inline checkbox-custom-margin">
              <Input type="radio" id="simple" checked={selectedFlow === 'simple'} />
              <div className="label">
                <p className="fw-bolder mb-50">
                  {selectedProject.pay_type.variable_cost ? 'Variable Price' : 'Fixed Price'} - Simple Flow
                </p>
                <p className="fw-light">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              </div>
            </div>
          </CreateBidRadioOption>
          <CreateBidRadioOption
            className="ms-1 cursor-pointer"
            active={selectedFlow === 'advance'}
            onClick={() => setSelectedFlow('advance')}
          >
            <div className="form-check form-check-inline checkbox-custom-margin">
              <Input type="radio" id="advance" checked={selectedFlow === 'advance'} />
              <div className="label">
                <p className="fw-bolder mb-50">
                  {selectedProject.pay_type.variable_cost ? 'Variable Price' : 'Fixed Price'} - Advance Flow
                </p>
                <p className="fw-light">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              </div>
            </div>
          </CreateBidRadioOption>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default CreateBidModal;

CreateBidModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  selectedProject: Proptypes.object,
};

CreateBidModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  selectedProject: {},
};
