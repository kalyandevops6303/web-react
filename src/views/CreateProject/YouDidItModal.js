import React, { useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Spinner } from 'reactstrap';
import '../custom-styles.scss';
import Notepad from '../../assets/images/youDidIt.gif';
import { YouDidItGifContainer } from './style';
import { createProjectLoading } from '../../redux/selectors/createProjectSelectors';

const YouDidItModal = ({ modal, toggleModal, onNewProjectCreation }) => {
  const [timer, setTimer] = useState(5);
  const zeroLoggedRef = useRef(false);
  const intervalId = useRef();

  const createProjectIsLoading = useSelector(createProjectLoading);

  useEffect(() => {
    if (modal) {
      intervalId.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1 && !createProjectIsLoading && !zeroLoggedRef.current) {
            clearInterval(intervalId);
            zeroLoggedRef.current = true;
            onNewProjectCreation();
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
    onNewProjectCreation();
    clearInterval(intervalId.current);
  };

  const handleDoneClick = () => {
    onNewProjectCreation();
    clearInterval(intervalId.current);
  };

  const handleRecallClick = () => {
    toggleModal();
    clearInterval(intervalId.current);
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={createProjectIsLoading ? null : closeModal} />
      <ModalBody>
        <div className="d-flex justify-content-between pr-1">
          <YouDidItGifContainer>
            <img src={Notepad} alt="you-did-it" width={244} height={244} />
          </YouDidItGifContainer>
          <div>
            <h2 className="fw-bold font-large-1 text-center mb-2">You did it!</h2>
            <h4 className="fw-bold font-small-5">Project listed</h4>
            <p className="fw-light w-75 mt-50">Your project listing will go live on your selected start date</p>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center mt-3 mb-2 me-2">
          <Button color="flat-danger" className="me-1" onClick={handleRecallClick} disabled={createProjectIsLoading}>
            Oops, Recall ({timer}s)
          </Button>
          <Button color="primary" onClick={handleDoneClick} disabled={createProjectIsLoading}>
            {createProjectIsLoading ? <Spinner size="sm" /> : <>Done</>}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default YouDidItModal;

YouDidItModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  onNewProjectCreation: Proptypes.func,
};

YouDidItModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  onNewProjectCreation: () => {},
};
