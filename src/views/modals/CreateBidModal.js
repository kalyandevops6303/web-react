import React, { useState } from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Modal, ModalHeader, ModalBody, Input, Row, Col, Spinner } from 'reactstrap';
import { CreateBidRadioOption } from '../styled';
import { createBid } from '../../redux/actions/createBidActions';
import { bidTypes, userTypes } from '../../utility/constants/Constant';
import { createBidLoading } from '../../redux/selectors/createBidSelectors';

const CreateBidModal = ({ modal, toggleModal, selectedProject }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createBidLoadingIsLoading = useSelector(createBidLoading);

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
        <Row className="mt-2 px-50">
          <Col sm="12" md="6" lg="6">
            <CreateBidRadioOption
              className="cursor-pointer d-flex"
              active={selectedFlow === bidTypes.simple}
              onClick={() => {
                if (createBidLoadingIsLoading) return;
                setSelectedFlow(bidTypes.simple);
                dispatch(createBid(selectedProject._id, bidTypes.simple, onSuccess));
              }}
            >
              {createBidLoadingIsLoading && selectedFlow === bidTypes.simple ? (
                <div className="me-2">
                  <Spinner size="sm" color="primary" className="me-25" />
                </div>
              ) : (
                <div className="form-check form-check-inline checkbox-custom-margin">
                  <Input
                    type="radio"
                    id="simple"
                    checked={selectedFlow === bidTypes.simple}
                    disabled={createBidLoadingIsLoading}
                  />
                </div>
              )}
              <div className="label">
                <p className="fw-bolder mb-50">
                  {selectedProject.pay_type.variable_cost ? 'Variable Price' : 'Fixed Price'} - Simple
                </p>
                <p className="fw-light mb-0">
                  Select this option for an equal split of milestone payments among all team members.
                </p>
              </div>
            </CreateBidRadioOption>
          </Col>
          <Col sm="12" md="6" lg="6">
            <CreateBidRadioOption
              className="cursor-pointer d-flex"
              active={selectedFlow === bidTypes.advanced}
              onClick={() => {
                if (createBidLoadingIsLoading) return;
                setSelectedFlow(bidTypes.advanced);
                dispatch(createBid(selectedProject._id, bidTypes.advanced, onSuccess));
              }}
            >
              {createBidLoadingIsLoading && selectedFlow === bidTypes.advanced ? (
                <div className="me-2">
                  <Spinner size="sm" color="primary" className="me-25" />
                </div>
              ) : (
                <div className="form-check form-check-inline checkbox-custom-margin">
                  <Input
                    type="radio"
                    id="advance"
                    checked={selectedFlow === bidTypes.advanced}
                    disabled={createBidLoadingIsLoading}
                  />
                </div>
              )}
              <div className="label">
                <p className="fw-bolder mb-50">
                  {selectedProject.pay_type.variable_cost ? 'Variable Price' : 'Fixed Price'} - Advanced
                </p>
                <p className="fw-light mb-0">
                  Opt for this advanced choice to allocate milestone payments based on each individual team
                  member&apos;s estimated hours and hourly rates.
                </p>
              </div>
            </CreateBidRadioOption>
          </Col>
        </Row>
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
