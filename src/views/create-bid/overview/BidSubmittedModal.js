import React, { useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalBody, ModalHeader, Spinner } from 'reactstrap';
import { AccountCreatedImageContainer } from '../../Onboarding/style';
import AccountCreatedGif from '../../../assets/images/accountCreatedGif.gif';
import { saveSubmitBid } from '../../../redux/actions/createBidActions';
import { submitBidLoading } from '../../../redux/selectors/createBidSelectors';

const BidSubmittedModal = ({ modal, toggleModal }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitBidIsLoading = useSelector(submitBidLoading);

  const [timer, setTimer] = useState(5);
  const zeroLoggedRef = useRef(false);
  const intervalId = useRef();

  const onSuccess = () => {
    toggleModal();
    navigate('/marketplace/all_listings');
  };

  const onDoneClick = () => {
    dispatch(saveSubmitBid(params.bidId, onSuccess));
  };

  useEffect(() => {
    if (modal) {
      intervalId.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1 && !submitBidIsLoading && !zeroLoggedRef.current) {
            clearInterval(intervalId);
            zeroLoggedRef.current = true;
            onDoneClick();
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
    onDoneClick();
    clearInterval(intervalId.current);
  };

  const handleRecallClick = () => {
    toggleModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={submitBidIsLoading ? null : closeModal} />
      <ModalBody>
        <div className="d-flex justify-content-between pr-1">
          <AccountCreatedImageContainer>
            <img
              src={AccountCreatedGif}
              width={244}
              height={244}
              alt="account-created"
              className="account-created-image"
            />
          </AccountCreatedImageContainer>
          <div className="ms-2">
            <p className="font-large-1 text-center mb-3">Well Done!</p>
            <p className="fw-bold font-medium-3 ">Project Bid Submitted</p>
            <p className="w-75">You have completed bidding for this project. Good Luck!</p>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center mt-2 mb-2 pe-1">
          <Button color="flat-danger" className="me-1" onClick={handleRecallClick} disabled={submitBidIsLoading}>
            Oops, Recall ({timer}s)
          </Button>
          <Button color="primary" onClick={closeModal} disabled={submitBidIsLoading}>
            {submitBidIsLoading ? <Spinner size="sm" /> : <>Done</>}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default BidSubmittedModal;

BidSubmittedModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

BidSubmittedModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
