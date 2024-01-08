import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import styled from 'styled-components';
import SwitchGif from '../../assets/images/gifs/switch.gif';
import { switchProfile } from '../../redux/actions/authActions';
import ShowToastMessage from '../../@core/components/toast';
import { ERROR } from '../../utility/constants/ToastTypes';
import { selectSavedUserData } from '../../redux/selectors/authSelectors';

const SwitchConfirmModal = ({ data, entity, navigateTo, switchTeamId, modal, toggleModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectSavedUserDetailsData = useSelector(selectSavedUserData);

  const teams = useSelector((state) => state.team?.teams);

  const onSuccess = () => {
    toggleModal();
    navigate(navigateTo);
  };

  const handleSwitch = () => {
    if (entity === 'TALENT') {
      dispatch(switchProfile({ data: selectSavedUserDetailsData, onSuccess, selected: false }));
    } else {
      const teamData = teams?.filter(
        (team) =>
          team._id === switchTeamId || data?.custom_payload?.switch_team_id || team._id === data?.switch_team_id,
      );
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
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="py-0">
        <SwitchModalWrapper>
          <div className="d-flex align-items-center px-50 py-0">
            <img src={SwitchGif} alt="complete-profile" width={170} height={170} />
            <div className="pe-1 ms-3">
              <h2 className="fw-bold title">Switch Profile</h2>
              <p className="fw-normal mt-1 sub-title">
                This action needs to be taken by a {entity}. Please switch to the relevant profile.
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
  switchTeamId: Proptypes.string,
  entity: Proptypes.string,
  navigateTo: Proptypes.string,
};

SwitchConfirmModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  data: {},
  switchTeamId: '',
  entity: '',
  navigateTo: '',
};
