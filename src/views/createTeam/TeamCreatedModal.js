import React, { useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch } from 'react-redux';
import '../custom-styles.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Spinner } from 'reactstrap';
import { UserPlus } from 'react-feather';
import GreatJobGif from '../../assets/images/greatJobGif.gif';
import { TeamCreatedModalImageWrapper, TeamCreatedModalLogoImg } from '../styled';
import { switchProfile } from '../../redux/actions/authActions';
import { createTeam } from '../../redux/actions/teamsActions';

const TeamCreatedModal = ({ previewImage, teamCreateData, onInvite, toggleModal, modal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(5);
  const zeroLoggedRef = useRef(false);
  const intervalId = useRef();

  const onCreateTeamSuccess = (data) => {
    setIsLoading(false);
    const onSuccess = () => {
      onInvite();
    };
    dispatch(switchProfile({ data, onSuccess, selected: false }));
  };

  // const onSuccess = () => {
  //   onInvite();
  // };
  // dispatch(switchProfile({ data: teamData, onSuccess, selected: false }));

  const handleGetStarted = () => {
    setIsLoading(true);
    dispatch(createTeam({ data: teamCreateData, onSuccess: onCreateTeamSuccess, onError: () => setIsLoading(false) }));
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

  const closeModal = () => {
    handleGetStarted();
    clearInterval(intervalId.current);
  };
  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={closeModal} />
      <ModalBody>
        <div className="d-flex justify-content-between align-items-center ps-1">
          <img src={GreatJobGif} width={120} height={120} alt="great-job" className="me-5" />
          <div className="w-75">
            <h2 className="fw-bold font-large-1 mb-1">Great Job!</h2>
            <p className="font-medium-2">You have successfully created a team.</p>
            <div className="my-1 d-flex align-items-center">
              <TeamCreatedModalImageWrapper>
                {previewImage ? <TeamCreatedModalLogoImg src={previewImage} alt="team-logo" /> : <UserPlus size={30} />}
              </TeamCreatedModalImageWrapper>
              <h3 className="fw-bold m-0 ms-1">{teamCreateData?.name}</h3>
            </div>
            <p>Add more team members to start collaborating.</p>
          </div>
        </div>
        <div className="d-none d-flex justify-content-end py-2">
          <Button color="primary" outline className="me-2" onClick={() => navigate('/dashboard')}>
            Close
          </Button>
          <Button onClick={handleGetStarted} color="primary">
            Get Started
          </Button>
        </div>
        <div className="d-flex justify-content-end align-items-center mt-2 mb-2 pe-1">
          <Button color="flat-danger" className="me-1" onClick={handleRecallClick} disabled={isLoading}>
            Oops, Recall ({timer}s)
          </Button>
          <Button color="primary" onClick={closeModal} disabled={isLoading}>
            {isLoading ? <Spinner size="sm" /> : <>Get Started</>}
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
  toggleModal: Proptypes.func,
  teamCreateData: Proptypes.object,
  previewImage: Proptypes.string,
};

TeamCreatedModal.defaultProps = {
  modal: false,
  onInvite: () => {},
  toggleModal: () => {},
  teamCreateData: {},
  previewImage: '',
};
