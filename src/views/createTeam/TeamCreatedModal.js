import React from 'react';
import Proptypes from 'prop-types';
import { useDispatch } from 'react-redux';
import '../custom-styles.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { UserPlus } from 'react-feather';
import GreatJobGif from '../../assets/images/greatJobGif.gif';
import { TeamCreatedModalImageWrapper, TeamCreatedModalLogoImg } from '../styled';
import { switchProfile } from '../../redux/actions/authActions';

const TeamCreatedModal = ({ previewImage, teamCreateData, onInvite, modal, teamData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoToDashboardClick = () => {
    dispatch(switchProfile({ data: teamData, onSuccess: navigate('/dashboard'), selected: false }));
  };

  const closeModal = () => {
    dispatch(switchProfile({ data: teamData, onSuccess: navigate('/dashboard'), selected: false }));
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={closeModal} />
      <ModalBody>
        <div className="d-flex justify-content-between align-items-center ps-1">
          <img src={GreatJobGif} width={120} height={120} alt="great-job" className="me-5" />
          <div className="w-75">
            <h2 className="fw-bold modal-heading mb-1">Great Job!</h2>
            <p className="modal-text">You have successfully created a team.</p>
            <div className="my-1 d-flex align-items-center">
              <TeamCreatedModalImageWrapper>
                {previewImage ? <TeamCreatedModalLogoImg src={previewImage} alt="team-logo" /> : <UserPlus size={30} />}
              </TeamCreatedModalImageWrapper>
              <h3 className="fw-bold m-0 ms-1">{teamCreateData?.name}</h3>
            </div>
            <p className="fw-light font-medium-1">Add more team members to start collaborating.</p>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center mt-2 mb-2 pe-1">
          <Button color="primary" outline className="me-1" onClick={handleGoToDashboardClick}>
            Go to Dashboard
          </Button>
          <Button color="primary" onClick={onInvite}>
            Add Member
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default TeamCreatedModal;

TeamCreatedModal.propTypes = {
  modal: Proptypes.bool,
  onInvite: Proptypes.func,
  teamCreateData: Proptypes.object,
  previewImage: Proptypes.string,
  teamData: Proptypes.object,
};

TeamCreatedModal.defaultProps = {
  modal: false,
  onInvite: () => {},
  teamCreateData: {},
  previewImage: '',
  teamData: {},
};
