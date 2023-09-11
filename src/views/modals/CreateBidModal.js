import React, { useState } from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import { CreateBidRadioOption } from '../styled';
import { createBid } from '../../redux/actions/createBidActions';
import { bidTypes, userTypes } from '../../utility/constants/Constant';
import { profilePercentage } from '../../redux/selectors/dashboardSelectors';

const CreateBidModal = ({ modal, toggleModal, selectedProject, toggleCompleteProfileModal }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [selectedFlow, setSelectedFlow] = useState('');

  const profilePercentageData = useSelector(profilePercentage);

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

  const handleCreateBid = (type) => {
    if (
      profilePercentageData?.values_missing?.includes('company_name') ||
      profilePercentageData?.values_missing?.includes('educational_institute') ||
      profilePercentageData?.values_missing?.includes('availability')
    ) {
      toggleCompleteProfileModal();
      return;
    }

    if (type === 'simple') {
      setSelectedFlow(bidTypes.simple);
      dispatch(createBid(selectedProject._id, bidTypes.simple, onSuccess));
      return;
    }
    setSelectedFlow(bidTypes.advanced);
    dispatch(createBid(selectedProject._id, bidTypes.simple, onSuccess));
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="pt-0 pb-3">
        <p className="font-large-1 text-center">Create Bid</p>
        <p className="font-medium-2 fw-bold mt-3 ms-50">Select flow type -</p>
        <div className="d-flex mt-2 px-50">
          <CreateBidRadioOption
            className="me-1 cursor-pointer"
            active={selectedFlow === bidTypes.simple}
            onClick={() => handleCreateBid('simple')}
          >
            <div className="form-check form-check-inline checkbox-custom-margin">
              <Input type="radio" id="simple" checked={selectedFlow === bidTypes.simple} />
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
            active={selectedFlow === bidTypes.advanced}
            onClick={() => handleCreateBid('advance')}
          >
            <div className="form-check form-check-inline checkbox-custom-margin">
              <Input type="radio" id="advance" checked={selectedFlow === bidTypes.advanced} />
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
  toggleCompleteProfileModal: Proptypes.func,
};

CreateBidModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  selectedProject: {},
  toggleCompleteProfileModal: () => {},
};
