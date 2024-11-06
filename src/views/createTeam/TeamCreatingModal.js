import React, { useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../custom-styles.scss';
import { Button, Modal, ModalBody, Spinner } from 'reactstrap';
import TeamCreatingGif from '../../assets/images/gifs/teamCreating.gif';
import { switchProfile } from '../../redux/actions/authActions';
import { createTeam } from '../../redux/actions/teamsActions';
import { clearAllFormData } from '../../redux/reducers/formData';

const TeamCreatingModal = ({ teamCreateData, toggleModal, modal, setTeamData, setTeamCreatedModal }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(10);
  const zeroLoggedRef = useRef(false);
  const intervalId = useRef();
  const navigate = useNavigate();

  const onCreateTeamSuccess = (data) => {
    setTeamData(data);
    setIsLoading(false);
    dispatch(clearAllFormData());
    const onSuccess = () => {
      toggleModal();
      setTeamCreatedModal(true);
    };
    dispatch(switchProfile({ data, onSuccess, selected: false }));
  };

  const handleGetStarted = () => {
    setIsLoading(true);
    dispatch(createTeam({ data: teamCreateData, onSuccess: onCreateTeamSuccess, onError: () => setIsLoading(false) }));
    navigate('/dashboard');
  };

  const handleRecallClick = () => {
    toggleModal();
  };

  useEffect(() => {
    if (modal) {
      intervalId.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1 && !isLoading && !zeroLoggedRef.current) {
            clearInterval(intervalId);
            zeroLoggedRef.current = true;
            handleGetStarted();
            return 0;
            // eslint-disable-next-line no-else-return
          } else if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            return prevTimer;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalId.current);
      zeroLoggedRef.current = false;
    }

    return () => {
      clearInterval(intervalId.current);
    };
  }, [modal]);

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalBody className="pt-3 pb-2 px-2">
        <div className="d-flex align-items-center">
          <img src={TeamCreatingGif} height={200} alt="team-creating" className="me-3" />
          <div className="w-50">
            <h2 className="fw-bold font-large-1 mb-1">Great, creating your team!</h2>
            <p className="font-medium-2 mt-75">This will only take few seconds...</p>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center">
          <Button color="flat-danger" className="me-1" onClick={handleRecallClick} disabled={isLoading}>
            {isLoading ? <Spinner size="sm" /> : `Oops, Recall (${timer}s)`}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default TeamCreatingModal;

TeamCreatingModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  teamCreateData: Proptypes.object,
  setTeamData: Proptypes.func,
  setTeamCreatedModal: Proptypes.func,
};

TeamCreatingModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  teamCreateData: {},
  setTeamData: () => {},
  setTeamCreatedModal: () => {},
};
