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
import { inviteTalentsToProject } from '../../../redux/actions/inviteTalent';
import { userTypes } from '../../../utility/constants/Constant';
import { selectSavedUserData } from '../../../redux/selectors/authSelectors';

const BidSubmittedModal = ({ modal, toggleModal }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitBidIsLoading = useSelector(submitBidLoading);
  const bidDetailsData = useSelector(bidDetails);
  const selectSavedUser = useSelector(selectSavedUserData);

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
    const data = bidDetailsData?.workers
      ?.filter((worker) => worker.user_id && worker.user_id !== selectSavedUser?._id)
      ?.map((worker) => {
        const reqData = {
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

    if (data?.length > 0) {
      try {
        setLoadingState(true);

        const apiPromises = [];

        data.forEach((item, index) => {
          const apiCallPromise =
            index !== data.length - 1
              ? dispatch(inviteTalentsToProject({ data: item, onSuccess: emptyCall }))
              : dispatch(inviteTalentsToProject({ data: item, onSuccess }));

          apiPromises.push(apiCallPromise);
        });

        await Promise.all(apiPromises);

        setLoadingState(false);
      } catch (error) {
        setLoadingState(false);
      }
    } else {
      onSuccess();
    }
  };

  const onDoneClick = () => {
    if (bidDetailsData?.bid_by?.entity === userTypes.team) {
      dispatch(saveSubmitBid(params.bidId, fetchAndProcessDataWithLoadingState));
    } else {
      dispatch(saveSubmitBid(params.bidId, onSuccess));
    }
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
            <p className="modal-heading text-center mb-3">Well Done!</p>
            <p className="w-75 modal-body-text">You have completed bidding for this project. Good Luck!</p>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center mt-2 mb-2 pe-1">
          <Button
            color="flat-danger"
            className="me-1"
            onClick={handleRecallClick}
            disabled={submitBidIsLoading || loadingState}
          >
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
