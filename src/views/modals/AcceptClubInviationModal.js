/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Star } from 'react-feather';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Badge, Spinner } from 'reactstrap';
import '../custom-styles.scss';
import GreatJobTick from '../../assets/images/greatJobGif.gif';
import { InviteUsersListContainer } from '../CreateProject/style';
import theme from '../../configs/themeVariables';
import { inviteTalentsLoading } from '../../redux/selectors/createProjectSelectors';

import { inviteTalentsLoading as teamInviteLoading } from '../../redux/selectors/inviteTalentSelector';

import { returnFormattedRating } from '../../utility/Utils';

const AcceptClubInviationModal = ({
  modal,
  toggleModal,
  selectedTalents,
  toggleSendInvitationModal,
  description,
  onAccept,
}) => {
  const inviteTalentsIsLoading = useSelector(inviteTalentsLoading);
  const isTeaminviteLoading = useSelector(teamInviteLoading);
  const [timer, setTimer] = useState(5);
  const zeroLoggedRef = useRef(false);
  const intervalId = useRef();

  useEffect(() => {
    if (modal) {
      intervalId.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1 && !inviteTalentsIsLoading && !zeroLoggedRef.current) {
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

  const closeModal = () => {
    onInviteTalents();
    clearInterval(intervalId.current);
  };

  const handleRecallClick = () => {
    toggleModal();
    toggleSendInvitationModal();
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={inviteTalentsIsLoading || isTeaminviteLoading ? null : closeModal} />
      <ModalBody className="px-3 py-0">
        <div className="d-flex align-items-center">
          <img src={GreatJobTick} alt="great-job" width={120} height={120} className="me-4" />
          <div className="w-100">
            <h2 className="fw-bold font-large-1 mb-1">Great Job!</h2>
            <h4 className="fw-bold font-small-5">Invitation accepted</h4>
            <p className="fw-light font-medium-3 mt-75">{description}</p>
            <InviteUsersListContainer>
              {selectedTalents.map((talent) => (
                <Row key={talent?.user_id || talent?._id} className="d-flex align-items-center mb-2 mx-0">
                  <Col sm="12" md="12" lg="12">
                    <div className="d-flex align-items-center">
                      <Avatar
                        img={talent?.image_uri?.length > 0 ? talent?.image_uri : defaultAvatar}
                        imgHeight="48"
                        imgWidth="48"
                        className="me-2 user-pic"
                      />
                      <div>
                        <p className="font-medium-1 fw-bold m-0 mb-50">{`${talent.name}`}</p>
                        <div className="d-flex align-items-center">
                          <Badge>
                            <div className="d-flex align-items-center">
                              <Star size={12} color={theme.starRatingBg} fill={theme.starRatingBg} className="me-50" />
                              <p className="m-0 fw-bolder rating-text">{returnFormattedRating(talent.rating)}</p>
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
          <Button
            color="flat-danger"
            className="me-1"
            onClick={handleRecallClick}
            disabled={inviteTalentsIsLoading || isTeaminviteLoading}
          >
            Recall ({timer}s)
          </Button>
          <Button color="primary" onClick={handleClose} disabled={inviteTalentsIsLoading || isTeaminviteLoading}>
            {inviteTalentsIsLoading || isTeaminviteLoading ? <Spinner size="sm" /> : <>Close</>}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AcceptClubInviationModal;

AcceptClubInviationModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  selectedTalents: Proptypes.array,
  toggleSendInvitationModal: Proptypes.func,
  description: Proptypes.string,
  onAccept: Proptypes.func,
};

AcceptClubInviationModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  selectedTalents: [],
  toggleSendInvitationModal: () => {},
  onAccept: () => {},
  description: '',
};
