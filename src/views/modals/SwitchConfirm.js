import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { useNavigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody, Button, Spinner } from 'reactstrap';
import styled from 'styled-components';
import SwitchGif from '../../assets/images/gifs/switch.gif';
import { switchProfile } from '../../redux/actions/authActions';
import ShowToastMessage from '../../@core/components/toast';
import { ERROR } from '../../utility/constants/ToastTypes';
import { selectSavedUserData } from '../../redux/selectors/authSelectors';
import getTeamId from '../../utility/commonUtils';
import { markNotificationAsRead } from '../../redux/actions/notificationsActions';

const SwitchConfirmModal = ({ entity, navigateTo, switchTeamId, notificationId, modal, toggleModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const selectSavedUserDetailsData = useSelector(selectSavedUserData);
  const isGetTeamLoading = useSelector((state) => state.team?.isTeamsLoading);

  const teams = useSelector((state) => state.team?.teams);

  const onSuccess = () => {
    toggleModal();
    navigate(navigateTo);
    if (notificationId) {
      dispatch(markNotificationAsRead(notificationId));
    }
  };

  const toggleOnSwitch = () => {
    toggleModal();
    navigate('/dashboard');
  };

  const isSwitchModalViaUrl =
    location.search.includes('switch_team_id') &&
    (location.pathname.includes('project-details') || location.pathname.includes('join-request'));

  const handleSwitch = () => {
    if (entity === 'TALENT') {
      dispatch(switchProfile({ data: selectSavedUserDetailsData, onSuccess, selected: false }));
    } else if (entity === 'TEAM' && switchTeamId === getTeamId()) {
      navigate(navigateTo);
      if (notificationId) {
        dispatch(markNotificationAsRead(notificationId));
      }
    } else {
      const teamData = teams?.filter((team) => team._id === switchTeamId);
      if (teamData?.length > 0) {
        dispatch(switchProfile({ data: teamData[0], onSuccess, selected: false }));
      } else {
        ShowToastMessage(ERROR, 'You are not a member of that team');
      }
    }
  };

  const SwitchModalWrapper = styled.div`
    .title {
      font-size: 1.75rem;
    }
    .sub-title {
      font-size: 1.125rem;
    }
  `;

  return (
    <Modal
      isOpen={modal}
      contentClassName="custom-larger-than-medium-modal-style"
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={isSwitchModalViaUrl ? toggleOnSwitch : toggleModal} />
      <ModalBody className="py-0">
        <SwitchModalWrapper>
          <div className="d-flex align-items-center px-50 py-0">
            <img src={SwitchGif} alt="complete-profile" width={170} height={170} />
            <div className="pe-1 ms-3">
              <h2 className="fw-bold modal-heading">Switch Profile</h2>
              <p className="fw-normal mt-1 modal-body-text">
                This action needs to be taken by a different profile. Please switch to the relevant profile.
              </p>
            </div>
          </div>
          <div className="d-flex gap-1 mb-2 justify-content-end">
            <Button disabled={isGetTeamLoading} color="primary" onClick={handleSwitch}>
              {isGetTeamLoading ? <Spinner size="sm" /> : 'Switch'}
            </Button>
          </div>
        </SwitchModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default SwitchConfirmModal;

SwitchConfirmModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  switchTeamId: Proptypes.string,
  notificationId: Proptypes.string,
  entity: Proptypes.string,
  navigateTo: Proptypes.string,
};

SwitchConfirmModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  switchTeamId: '',
  notificationId: '',
  entity: '',
  navigateTo: '',
};
