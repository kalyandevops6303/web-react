import React, { useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Star, User } from 'react-feather';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Badge, Spinner } from 'reactstrap';
import '../custom-styles.scss';
import GreatJobTick from '../../assets/images/greatJobGif.gif';
import { InviteUsersListContainer } from './style';
import theme from '../../configs/themeVariables';
import { inviteTalentsLoading } from '../../redux/selectors/createProjectSelectors';
import { inviteTalents } from '../../redux/actions/createProjectActions';

const InvitationSentModal = ({
  modal,
  toggleModal,
  selectedTalents,
  projectId,
  message,
  toggleSendInvitationModal,
}) => {
  const dispatch = useDispatch();

  const inviteTalentsIsLoading = useSelector(inviteTalentsLoading);

  const [timer, setTimer] = useState(5);
  const zeroLoggedRef = useRef(false);
  const intervalId = useRef();

  const onSuccess = () => {
    toggleModal();
  };

  const onInviteTalents = () => {
    const userIds = selectedTalents.map((talent) => talent.user_id);
    const userEmails = selectedTalents.map((talent) => talent.user_details.email);

    dispatch(inviteTalents(projectId, { emails: userEmails, talent_ids: userIds, message }, onSuccess));
  };

  useEffect(() => {
    if (modal) {
      intervalId.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1 && !inviteTalentsIsLoading && !zeroLoggedRef.current) {
            clearInterval(intervalId);
            zeroLoggedRef.current = true;
            onInviteTalents();
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
    onInviteTalents();
    clearInterval(intervalId.current);
  };

  const handleRecallClick = () => {
    toggleModal();
    toggleSendInvitationModal();
  };

  return (
    <Modal
      isOpen={modal}
      // toggle={toggleModal}
      contentClassName="custom-modal-style"
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={inviteTalentsIsLoading ? null : closeModal} />
      <ModalBody className="px-3 py-0">
        <div className="d-flex align-items-center">
          <img src={GreatJobTick} alt="great-job" width={120} height={120} className="me-4" />
          <div className="w-100">
            <h2 className="fw-bold font-large-1 mb-1">Great Job!</h2>
            <h4 className="fw-bold font-small-5">Invitation sent</h4>
            <p className="fw-light font-medium-3 mt-75">You’ve sent a team member invitation</p>
            <InviteUsersListContainer>
              {selectedTalents.map((talent) => (
                <Row key={talent.id} className="d-flex align-items-center mb-2">
                  <Col sm="12" md="12" lg="12">
                    <div className="d-flex align-items-center">
                      <div className="user-pic p-75 me-2">
                        <User size={30} />
                      </div>
                      <div>
                        <p className="font-medium-1 fw-bold m-0 mb-75">{`${talent.first_name} ${talent.last_name}`}</p>
                        <div className="d-flex align-items-center">
                          <Badge>
                            <div className="d-flex align-items-center">
                              <Star size={12} color={theme.starRatingBg} fill={theme.starRatingBg} className="me-50" />
                              <p className="m-0 fw-bolder rating-text">{talent.rating}</p>
                            </div>
                          </Badge>
                          <p className="m-0 font-small-3 fw-light ms-1">{talent.projects_worked_on_count} Projects</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              ))}
            </InviteUsersListContainer>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-1 mb-2">
          <Button color="flat-danger" className="me-1" onClick={handleRecallClick} disabled={inviteTalentsIsLoading}>
            Recall ({timer}s)
          </Button>
          <Button color="primary" onClick={closeModal} disabled={inviteTalentsIsLoading}>
            {inviteTalentsIsLoading ? <Spinner size="sm" /> : <>Close</>}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default InvitationSentModal;

InvitationSentModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  selectedTalents: Proptypes.array,
  projectId: Proptypes.string,
  message: Proptypes.string,
  toggleSendInvitationModal: Proptypes.func,
};

InvitationSentModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  selectedTalents: [],
  projectId: '',
  message: '',
  toggleSendInvitationModal: () => {},
};
