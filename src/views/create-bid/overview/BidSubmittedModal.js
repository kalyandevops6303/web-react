/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalBody, ModalHeader, Spinner } from 'reactstrap';
import { AccountCreatedImageContainer } from '../../Onboarding/style';
import AccountCreatedGif from '../../../assets/images/accountCreatedGif.gif';
import { saveSubmitBid } from '../../../redux/actions/createBidActions';
import { bidDetails, submitBidLoading } from '../../../redux/selectors/createBidSelectors';
import { inviteTalents } from '../../../redux/actions/inviteTalent';

const BidSubmittedModal = ({ modal, toggleModal }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitBidIsLoading = useSelector(submitBidLoading);
  const bidDetailsData = useSelector(bidDetails);

  const [loadingState, setLoadingState] = useState(false);
  const [timer, setTimer] = useState(5);
  const zeroLoggedRef = useRef(false);
  const intervalId = useRef();

  const onSuccess = () => {
    toggleModal();
    navigate('/marketplace/my_bids');
  };

  const emptyCall = () => {};

  const fetchAndProcessDataWithLoadingState = async () => {
    const data = bidDetailsData?.workers?.map((worker) => {
      const reqData = {
        redirect_url: `${`${window.location.protocol}//${window.location.host}`}/auth/login`,
        requests_to: {
          user_ids: [worker.user_id],
        },
        request_for: {
          project_id: bidDetailsData?.project_id,
          team_id: bidDetailsData?.bid_by?.entity_id,
          role: worker.role,
        },
      };

      return reqData;
    });

    try {
      setLoadingState(true);

      const apiPromises = [];

      data.forEach((item, index) => {
        const apiCallPromise =
          index !== data.length - 1
            ? dispatch(inviteTalents({ data: item, onSuccess: emptyCall }))
            : dispatch(inviteTalents({ data: item, onSuccess }));

        apiPromises.push(apiCallPromise);
      });

      await Promise.all(apiPromises);

      setLoadingState(false);
    } catch (error) {
      setLoadingState(false);
    }
  };

  const onDoneClick = () => {
    dispatch(saveSubmitBid(params.bidId, fetchAndProcessDataWithLoadingState));
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
      <ModalHeader toggle={submitBidIsLoading || loadingState ? null : closeModal} />
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
          <Button color="primary" onClick={closeModal} disabled={submitBidIsLoading || loadingState}>
            {submitBidIsLoading || loadingState ? <Spinner size="sm" /> : <>Done</>}
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
