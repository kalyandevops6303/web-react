/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
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

import { inviteTalents as inviteTalentForTeam } from '../../redux/actions/inviteTalent';
import { getTeamId, returnFormattedRating } from '../../utility/Utils';

const InvitationSentModal = ({
  projectId,
  inviteRole,
  modal,
  toggleModal,
  selectedTalents,
  message,
  toggleSendInvitationModal,
  setSelectedIds,
  setInvitedIds,
  setSelectedTalents,
  description,
  onInviteSucess,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const inviteTalentsIsLoading = useSelector(inviteTalentsLoading);
  const isTeaminviteLoading = useSelector(teamInviteLoading);
  const [timer, setTimer] = useState(5);
  const zeroLoggedRef = useRef(false);
  const intervalId = useRef();

  const onSuccess = () => {
    toggleModal();
    setInvitedIds([]);
    setSelectedIds([]);
    setSelectedTalents([]);
    if (location.pathname?.split('/')?.includes('project-details')) {
      onInviteSucess();
    }
    if (location.pathname === '/create-team/profile-details') {
      navigate('/dashboard');
    }
  };

  const onInviteTalents = () => {
    const userIds = selectedTalents.filter((user) => user?.user_id).map((talent) => talent.user_id);
    const clubAdminIds = selectedTalents.filter((user) => user?.role === 'ADMIN').map((talent) => talent.user_id);

    const teamIds = selectedTalents
      .filter((user) => user?._id) // Filter out non-team users
      .map((user) => user?._id); // Map to an array of team_ids

    const teamId = getTeamId('team_id');
    const newPostData = {
      message,
      redirect_url: `${`${window.location.protocol}//${window.location.host}`}/auth/login`,
      requests_to: {
        user_ids: userIds || [],
        team_ids: teamIds.length > 0 ? teamIds : [],
        email_ids: [],
      },
      request_for: {
        project_id: projectId || '',
        team_id: teamId || '',
        role: inviteRole || '',
        member_type: 'MEMBER',
      },
    };

    if (clubAdminIds.length > 0) {
      const newAdminPostData = {
        message,
        redirect_url: `${`${window.location.protocol}//${window.location.host}`}/auth/login`,
        requests_to: {
          user_ids: clubAdminIds || [],
          team_ids: teamIds.length > 0 ? teamIds : [],
          email_ids: [],
        },
        request_for: {
          project_id: projectId || '',
          team_id: teamId || '',
          role: inviteRole || '',
          member_type: 'ADMIN',
        },
      };
      dispatch(inviteTalentForTeam({ data: newAdminPostData, onSuccess }));
    }

    dispatch(inviteTalentForTeam({ data: newPostData, onSuccess }));
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
            <h2 className="fw-bold modal-heading mb-1">Great Job!</h2>
            <p className="fw-light modal-body-text mt-75">{description}</p>
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
                        <p className="font-medium-1 fw-bold m-0 mb-50">{`${talent.first_name} ${talent.last_name}`}</p>
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

export default InvitationSentModal;

InvitationSentModal.propTypes = {
  modal: Proptypes.bool,
  inviteRole: Proptypes.string,
  projectId: Proptypes.string,
  toggleModal: Proptypes.func,
  selectedTalents: Proptypes.array,
  message: Proptypes.string,
  toggleSendInvitationModal: Proptypes.func,
  setSelectedIds: Proptypes.func,
  setInvitedIds: Proptypes.func,
  setSelectedTalents: Proptypes.func,
  description: Proptypes.string,
  onInviteSucess: Proptypes.func,
};

InvitationSentModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  selectedTalents: [],
  message: '',
  projectId: '',
  toggleSendInvitationModal: () => {},
  setSelectedIds: () => {},
  setInvitedIds: () => {},
  setSelectedTalents: () => {},
  onInviteSucess: () => {},
  description: '',
  inviteRole: '',
};
