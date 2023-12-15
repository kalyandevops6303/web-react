import React, { useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, Spinner, CardSubtitle } from 'reactstrap';
import Notepad from '../../assets/images/youDidIt.gif';
import { AcceptModalWrapper } from './style';

const ChangeRequestMilestoneModal = ({ isLoading, onAccept, modal, toggleModal }) => {
  const [timer, setTimer] = useState(5);
  const zeroLoggedRef = useRef(false);
  const intervalId = useRef();
  useEffect(() => {
    if (modal) {
      intervalId.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1 && !isLoading && !zeroLoggedRef.current) {
            clearInterval(intervalId);
            zeroLoggedRef.current = true;
            onAccept();
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
  const onClose = () => {
    toggleModal();
    clearInterval(intervalId.current);
  };

  const handleRecallClick = () => {
    toggleModal();
  };
  return (
    <Modal isOpen={modal} contentClassName="delete-modal" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={isLoading ? null : onClose} />
      <ModalBody>
        <AcceptModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" src={Notepad} width={150} height={150} alt="gif" />
            <div className="content-side">
              <CardTitle className="modal-title-custom">Change Request Initiated</CardTitle>
              <CardSubtitle className="mb-75 subtitle">You have successfully initiated a change request.</CardSubtitle>
            </div>
          </div>
          <div className="d-flex gap-1 justify-content-end">
            <Button color="flat-danger" className="me-1" onClick={handleRecallClick} disabled={isLoading}>
              Oops, Recall ({timer}s)
            </Button>
            <Button color="primary" onClick={onAccept}>
              {isLoading ? <Spinner size="sm" /> : 'Submit'}
            </Button>
          </div>
        </AcceptModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default ChangeRequestMilestoneModal;

ChangeRequestMilestoneModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  onAccept: Proptypes.func,
  isLoading: Proptypes.bool,
};

ChangeRequestMilestoneModal.defaultProps = {
  modal: false,
  isLoading: false,
  toggleModal: () => {},
  onAccept: () => {},
};
