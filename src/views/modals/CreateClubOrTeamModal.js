import React, { useState } from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody, Input, Row, Col, Button } from 'reactstrap';
import { CreateBidRadioOption } from '../styled';
import SavedDraftsAvailableModal from './SavedDraftsAvailableModal';
import { checkDraftTeam } from '../../redux/actions/teamsActions';

const CreateClubOrTeamModal = ({ modal, toggleModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [savedDraftsAvailableModal, setSavedDraftsAvailableModal] = useState(false);
  const toggleSavedDraftsAvailableModal = () => {
    setSavedDraftsAvailableModal(!savedDraftsAvailableModal);
  };
  const [selectedGroup, setSelectedGroup] = useState('');

  const onNextClick = () => {
    if (selectedGroup === 'CLUB') {
      navigate('/create-club/account-details');
    } else if (selectedGroup === 'TEAM') {
      dispatch(checkDraftTeam({ setSavedDraftsAvailableModal, onSuccess: () => {}, onError: () => {} }));
    }
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      {savedDraftsAvailableModal && (
        <SavedDraftsAvailableModal
          modal={savedDraftsAvailableModal}
          toggleModal={toggleSavedDraftsAvailableModal}
          modalText="You have a bid in draft mode for this project. Would you like to continue where you left off?"
          firstBtnText="Create New Bid"
          secondBtnText="View Draft"
          firstBtnAction={() => {
            toggleSavedDraftsAvailableModal();
            navigate('/create-team/profile-details');
          }}
          secondBtnAction={() =>
            navigate('/my-teams/teams', {
              state: {
                isDraftTeams: true,
              },
            })
          }
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
  toggleModal: () => {},
};
