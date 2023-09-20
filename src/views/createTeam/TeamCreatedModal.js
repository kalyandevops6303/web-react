import React from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import '../custom-styles.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { UserPlus } from 'react-feather';
import GreatJobGif from '../../assets/images/greatJobGif.gif';
import { TeamCreatedModalImageWrapper, TeamCreatedModalLogoImg } from '../styled';
import { selectCreatedTeamData } from '../../redux/selectors/teamSelectors';
import { switchProfile } from '../../redux/actions/authActions';

const TeamCreatedModal = ({ onInvite, modal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const teamData = useSelector(selectCreatedTeamData);

  const handleGetStarted = () => {
    const onSuccess = () => {
      onInvite();
    };
    dispatch(switchProfile({ data: teamData, onSuccess, selected: false }));
  };
  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader />
      <ModalBody>
        <div className="d-flex justify-content-between align-items-center ps-1">
          <img src={GreatJobGif} width={120} height={120} alt="great-job" className="me-5" />
          <div className="w-75">
            <h2 className="fw-bold font-large-1 mb-1">Great Job!</h2>
            <h3 className="fw-bold font-medium-3">Team Created</h3>
            <p className="font-medium-2">You successfully created a team</p>
            <div className="my-1 d-flex align-items-center">
              <TeamCreatedModalImageWrapper>
                {teamData?.team_logo ? (
                  <TeamCreatedModalLogoImg src={teamData.team_logo} alt="team-logo" />
                ) : (
                  <UserPlus size={30} />
                )}
              </TeamCreatedModalImageWrapper>
              <h3 className="fw-bold m-0 ms-1">{teamData?.name}</h3>
            </div>
            <p>
              <span className="fw-bolder">Note : </span>The next step is to add more team members to <br /> this team
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-end py-2">
          <Button color="primary" outline className="me-2" onClick={() => navigate('/dashboard')}>
            Close
          </Button>
          <Button onClick={handleGetStarted} color="primary">
            Get Started
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
};

TeamCreatedModal.defaultProps = {
  modal: false,
  onInvite: () => {},
};
