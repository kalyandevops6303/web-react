/* eslint-disable no-lonely-if */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Input, Row, Col, Button} from 'reactstrap';
import toast from 'react-hot-toast';
import { CreateBidRadioOption } from '../styled';
import { selectTrumioIsFlextern } from '../../redux/selectors/authSelectors';
import { saveTalentAccountDetails } from '../../redux/actions/talentOnboardingActions';
import { setTalentBooleanTrumioTalent, setTalentBooleansFlextern } from '../../redux/reducers/auth';


const ProgramFlexternorProjectModal = ({ modal, toggleModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trumioIsFlextern = useSelector(selectTrumioIsFlextern);
  const [selectedPrograms, setSelectedPrograms] = useState({
    flextern: false,
    trumio_talent: true,
  });

  const handleCheckboxChange = (program) => {
    setSelectedPrograms((prev) => ({
      ...prev,
      [program]: !prev[program],
    }));
  };

  const onSuccess = () => {
    toggleModal();
    navigate('/talent-onboarding/account-details');
  };
  const onNextClick = () => {
     const { flextern , trumio_talent } = selectedPrograms;
     const reqData = {};
     reqData.flextern = flextern;
     reqData.trumio_talent = trumio_talent;  
     dispatch(setTalentBooleansFlextern(flextern));
     dispatch(setTalentBooleanTrumioTalent(trumio_talent));
     dispatch(saveTalentAccountDetails(reqData, onSuccess));
  };
  const checkNotPickedProgram = () => {
    if( selectedPrograms.flextern ||selectedPrograms.trumio_talent){
      toggleModal();
    } else {
      toast.error('Please select at least one program');
    }
  };

  useEffect(() => {
    if(trumioIsFlextern) {
      setSelectedPrograms((prev) => ({
        ...prev,
        flextern: trumioIsFlextern,
        trumio_talent: false,
      }));
    } else {
      setSelectedPrograms((prev) => ({
        ...prev,
        flextern: false,
        trumio_talent: true,
      }));
    }
  },[trumioIsFlextern]);
  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={checkNotPickedProgram} />
      <ModalBody className="pt-0 pb-2">
        <p className="font-large-1 text-center">Choose Your Program</p>
        <p className="font-medium-2 fw-bold mt-3 ms-50">Select minimum one program -</p>
        <Row className="mt-2 px-50">
          <Col sm="12" md="6" lg="6">
            <CreateBidRadioOption
              className="d-flex"
              active={selectedPrograms.flextern}
            //   onClick={() => handleCheckboxChange('flexternship')}
            >
              <div className="form-check form-check-inline checkbox-custom-margin">
                <Input
                  type="checkbox"
                  id="simple"
                  checked={selectedPrograms.flextern}
                //   disabled={createBidLoadingIsLoading || changeBidTypeIsLoading}
                  onChange={() => handleCheckboxChange('flextern')}
                />
                <div className="label">
                  <p className="fw-bolder mb-50">Flexternship</p>
                  <p className="fw-light mb-0">
                    Lorem ipsum dolor sit amet consectetur. Nam nunc dignissim ut purus. Amet.
                  </p>
                </div>
              </div>
            </CreateBidRadioOption>
          </Col>
          <Col sm="12" md="6" lg="6">
            <CreateBidRadioOption
              className="d-flex"
              active={selectedPrograms.trumio_talent}
            //   onClick={() => handleCheckboxChange('project')}
            >
              <div className="form-check form-check-inline checkbox-custom-margin">
                <Input
                  type="checkbox"
                  id="advance"
                  checked={selectedPrograms.trumio_talent}
                //   disabled={createBidLoadingIsLoading || changeBidTypeIsLoading}
                  onClick={() => handleCheckboxChange('trumio_talent')}
                />
                <div className="label">
                  <p className="fw-bolder mb-50">Project</p>
                  <p className="fw-light mb-0">
                    Lorem ipsum dolor sit amet consectetur. Sit nibh nunc orci sollicitudin quis sodales. Id malesuada
                    suspendisse.{' '}
                  </p>
                </div>
              </div>
            </CreateBidRadioOption>
          </Col>
        </Row>
        <div className="d-flex justify-content-end align-items-center mt-1 mb-50">
          <Button
            color="primary"
            onClick={onNextClick}
            className="me-50"
            disabled={!selectedPrograms.flextern && !selectedPrograms.trumio_talent}
          >
            Next
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ProgramFlexternorProjectModal;

ProgramFlexternorProjectModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

ProgramFlexternorProjectModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
