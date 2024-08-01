import React, { useState } from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody, Input, Row, Col, Button } from 'reactstrap';
import { CreateBidRadioOption } from '../styled';
import SavedDraftsAvailableModal from './SavedDraftsAvailableModal';
import { checkDraftTeam } from '../../redux/actions/teamsActions';
import { teamTypes } from '../../utility/constants/Constant';

const CreateClubOrTeamModal = ({ modal, toggleModal, defaultSelectedGroup }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [savedDraftsAvailableModal, setSavedDraftsAvailableModal] = useState(false);
  const toggleSavedDraftsAvailableModal = () => {
    setSavedDraftsAvailableModal(!savedDraftsAvailableModal);
  };
  const [selectedGroup, setSelectedGroup] = useState(defaultSelectedGroup || '');

  const onNextClick = () => {
    if (selectedGroup === teamTypes.club) {
      dispatch(checkDraftTeam({ setSavedDraftsAvailableModal, checkType: teamTypes.club, onNavigation: () => navigate('/create-club/account-details'), onSuccess: () => { }, onError: () => { } }));
    } else if (selectedGroup === teamTypes.team) {
      dispatch(checkDraftTeam({ setSavedDraftsAvailableModal, checkType: teamTypes.team, onNavigation: () => navigate('/create-team/profile-details'), onSuccess: () => { }, onError: () => { } }));
    }
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      {savedDraftsAvailableModal && (
        <SavedDraftsAvailableModal
          modal={savedDraftsAvailableModal}
          toggleModal={toggleSavedDraftsAvailableModal}
          modalText={`You have a ${selectedGroup === 'CLUB' ? 'Club' : 'Team'} in draft mode. Would you like to continue where you left off from the drafts?`}
          firstBtnText={`Create New ${selectedGroup === 'CLUB' ? 'Club' : 'Team'}`}
          secondBtnText="View Draft"
          firstBtnAction={() => {
            toggleSavedDraftsAvailableModal();
            if (selectedGroup === 'CLUB') {
              navigate('/create-club/account-details');
            }
            if (selectedGroup === 'TEAM') {
              navigate('/create-team/profile-details');
            }
          }}
          secondBtnAction={() => {
            if (selectedGroup === 'CLUB') {
              navigate('/clubs/my_clubs', {
                state: {
                  isDraftClubs: true,
                },
              });
            } else if (selectedGroup === 'TEAM') {
              navigate('/my-teams/teams', {
                state: {
                  isDraftTeams: true,
                },
              });
            }
          }}
        />
      )}
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="pt-0 pb-2">
        <p className="font-large-1 text-center">Create </p>
        <p className="font-medium-2 fw-bold mt-3 ms-50">Select group type -</p>
        <Row className="mt-2 px-50">
          <Col sm="12" md="6" lg="6">
            <CreateBidRadioOption
              className="cursor-pointer"
              active={selectedGroup === 'TEAM'}
              onClick={() => {
                setSelectedGroup('TEAM');
              }}
            >
              <div className="form-check form-check-inline checkbox-custom-margin">
                <Input type="radio" id="advance" checked={selectedGroup === 'TEAM'} />
                <div className="label">
                  <p className="fw-bolder mb-50">Team</p>
                  <p className="fw-light mb-0">
                    A network of worldwide talent who work together on projects in one or more areas of interest.
                  </p>
                </div>
              </div>
            </CreateBidRadioOption>
          </Col>
          <Col sm="12" md="6" lg="6">
            <CreateBidRadioOption
              className="cursor-pointer"
              active={selectedGroup === 'CLUB'}
              onClick={() => {
                setSelectedGroup('CLUB');
              }}
            >
              <div className="form-check form-check-inline checkbox-custom-margin">
                <Input type="radio" id="simple" checked={selectedGroup === 'CLUB'} />
                <div className="label">
                  <p className="fw-bolder mb-50">Club</p>
                  <p className="fw-light mb-0">
                    A student led entity within a college focused on a specific domain interested in project work.
                  </p>
                </div>
              </div>
            </CreateBidRadioOption>
          </Col>
        </Row>
        {selectedGroup !== '' && (
          <div className="d-flex justify-content-end align-items-center mt-2 mb-50">
            <Button color="primary" onClick={onNextClick} className="me-50">
              Next
            </Button>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default CreateClubOrTeamModal;

CreateClubOrTeamModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

CreateClubOrTeamModal.defaultProps = {
  modal: false,
  toggleModal: () => { },
};