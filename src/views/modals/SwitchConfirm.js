import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { useNavigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import styled from 'styled-components';
import SwitchGif from '../../assets/images/gifs/switch.gif';
import { switchProfile } from '../../redux/actions/authActions';
import ShowToastMessage from '../../@core/components/toast';
import { ERROR } from '../../utility/constants/ToastTypes';

const SwitchConfirmModal = ({ data, modal, toggleModal, disputesRedirection, disputesAlertRedirection }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const teams = useSelector((state) => state.team?.teams);

  const redirectionFunction = ({ projectId, inviteId, status }) => {
    if (status === 'Project Invitation Request' && projectId && inviteId) {
      navigate(`/project-details/${projectId}/project/project-invitation-by-client/${inviteId}`);
    } else if (status === 'Team Invitation Request' && inviteId) {
      navigate(`/team-invitation/${inviteId}`);
    } else if (status === 'Project Team Invitation Request' && projectId && inviteId) {
      navigate(`/project-details/${projectId}/project/project-invitation/${inviteId}`);
    } else if (status === 'Team Join Request' && inviteId) {
      navigate(`/join-request/${inviteId}`);
    } else if (location.pathname.split('/').includes('projects')) {
      navigate(`/project-details/${projectId}/milestone`);
    } else {
      navigate(`/project-details/${projectId}/bid`);
    }
  };

  const onSuccess = () => {
    toggleModal();

    if (data?.isDisputesNotification) {
      disputesRedirection(data?.notification_type);
    } else if (data?.isDisputeAlert) {
      disputesAlertRedirection(data?.title);
    } else {
      redirectionFunction({
        status: data?.title,
        projectId: data?.custom_payload?.request_to?.project_id || data?.custom_payload?.project_id || data?.project_id,
        inviteId: data?.custom_payload?.request_id,
      });
    }
  };

  const handleSwitch = () => {
    const teamData = teams?.filter(
      (team) => team._id === data?.custom_payload?.switch_team_id || team._id === data?.team_switch_id,
    );
    if (teamData?.length > 0) {
      dispatch(switchProfile({ data: teamData[0], onSuccess, selected: false }));
    } else {
      ShowToastMessage(ERROR, 'You are not a member of that team');
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
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="py-0">
        <SwitchModalWrapper>
          <div className="d-flex align-items-center px-50 py-0">
            <img src={SwitchGif} alt="complete-profile" width={170} height={170} />
            <div className="pe-1 ms-3">
              <h2 className="fw-bold title">Switch Profile</h2>
              <p className="fw-normal mt-1 sub-title">
                To preform this action you <br /> need to switch to teams profile
              </p>
            </div>
          </div>
          <div className="d-flex gap-1 mb-2 justify-content-end">
            <Button color="primary" onClick={handleSwitch}>
              Switch
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
  data: Proptypes.object,
  disputesRedirection: Proptypes.func,
  disputesAlertRedirection: Proptypes.func,
};

SwitchConfirmModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  data: {},
  disputesRedirection: () => {},
  disputesAlertRedirection: () => {},
};
