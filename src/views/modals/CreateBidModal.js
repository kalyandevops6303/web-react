import React, { useState } from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Modal, ModalHeader, ModalBody, Input, Row, Col } from 'reactstrap';
import { CreateBidRadioOption } from '../styled';
import { createBid } from '../../redux/actions/createBidActions';
import { bidTypes, userTypes } from '../../utility/constants/Constant';

const CreateBidModal = ({ modal, toggleModal, selectedProject }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedFlow, setSelectedFlow] = useState('');

  const onSuccess = (bidData) => {
    const { bid_id, bid_type, project_type, entity } = bidData;

    if (entity === userTypes.talent) {
      navigate(
        `/create-bid/${
          selectedProject._id
        }/${project_type.toLowerCase()}-${bid_type.toLowerCase()}/${bid_id}/milestone`,
      );
    } else {
      navigate(
        `/create-bid/${selectedProject._id}/${project_type.toLowerCase()}-${bid_type.toLowerCase()}/${bid_id}/team`,
      );
    }
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="pt-0 pb-3">
        <p className="font-large-1 text-center">Create Bid</p>
        <p className="font-medium-2 fw-bold mt-3 ms-50">Select one :</p>
        {/* <div className="d-flex mt-2 px-50"> */}
        <Row className="mt-2 px-50">
          <Col sm="12" md="6" lg="6">
            <CreateBidRadioOption
              className="cursor-pointer"
              active={selectedFlow === bidTypes.simple}
              onClick={() => {
                setSelectedFlow(bidTypes.simple);
                dispatch(createBid(selectedProject._id, bidTypes.simple, onSuccess));
              }}
            >
              <div className="form-check form-check-inline checkbox-custom-margin">
                <Input type="radio" id="simple" checked={selectedFlow === bidTypes.simple} />
                <div className="label">
                  <p className="fw-bolder mb-50">
                    {selectedProject.pay_type.variable_cost ? 'Variable Price' : 'Fixed Price'} - Simple
                  </p>
                  <p className="fw-light mb-0">
                    Select this option for an equal split of milestone payments among all team members.
                  </p>
                </div>
              </div>
            </CreateBidRadioOption>
          </Col>
          <Col sm="12" md="6" lg="6">
            <CreateBidRadioOption
              className="cursor-pointer"
              active={selectedFlow === bidTypes.advanced}
              onClick={() => {
                setSelectedFlow(bidTypes.advanced);
                dispatch(createBid(selectedProject._id, bidTypes.advanced, onSuccess));
              }}
            >
              <div className="form-check form-check-inline checkbox-custom-margin">
                <Input type="radio" id="advance" checked={selectedFlow === bidTypes.advanced} />
                <div className="label">
                  <p className="fw-bolder mb-50">
                    {selectedProject.pay_type.variable_cost ? 'Variable Price' : 'Fixed Price'} - Advanced
                  </p>
                  <p className="fw-light mb-0">
                    Opt for this advanced choice to allocate milestone payments based on each individual team
                    member&apos;s estimated hours and hourly rates.
                  </p>
                </div>
              </div>
            </CreateBidRadioOption>
          </Col>
        </Row>
        {/* </div> */}
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
