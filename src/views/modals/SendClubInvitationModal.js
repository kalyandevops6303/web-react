import React from 'react';
import Proptypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Badge, Input, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Star } from 'react-feather';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import Select from 'react-select';
import { upperCase, capitalize } from 'lodash';
import classNames from 'classnames';
import '../custom-styles.scss';
import { InviteClubUsersListContainer, InviteUsersListContainer } from '../CreateProject/style';
import theme from '../../configs/themeVariables';
import { returnFormattedRating, selectThemeColors } from '../../utility/Utils';

const SendClubInvitationModal = ({
  createTeamView,
  modal,
  toggleModal,
  selectedTalents,
  setInvitationSentModal,
  message,
  setMessage,
  setSelectedTalents,
  description,
  isClubView,
}) => {
  const navigate = useNavigate();

  const redirectToDashboard = () => {
    navigate('/dashboard');
  };

  const handleClose = () => {
    if (createTeamView) {
      redirectToDashboard();
    } else {
      toggleModal();
    }
  };

  const handleRoleChange = (index, newRole) => {
    const talentCopy = { ...selectedTalents[index] };
    talentCopy.clubRole = upperCase(newRole);
    const updatedTalents = [...selectedTalents];
    updatedTalents[index] = talentCopy;

    setSelectedTalents(updatedTalents);
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={createTeamView ? redirectToDashboard : toggleModal} />
      <ModalBody>
        <div className="px-3">
          <h2 className="fw-bold modal-heading text-center mb-3">Send Invitation</h2>
          <p className="mb-2 modal-body-text">{description}</p>

          {isClubView ? (
            <InviteUsersListContainer>
              {selectedTalents.map((talent) => (
                <Row key={talent?.user_id || talent?._id} className="d-flex align-items-center mb-2 w-100 mx-0">
                  <Col sm="12" md="8" lg="6">
                    <div className="d-flex align-items-center">
                      <Avatar
                        img={talent?.image_uri?.length > 0 ? talent?.image_uri : defaultAvatar}
                        imgHeight="38"
                        imgWidth="38"
                        className="me-2 user-pic"
                      />
                      <p className="font-medium-1 fw-bold m-0">{`${talent.first_name} ${talent.last_name}`}</p>
                    </div>
                  </Col>
                  <Col sm="12" md="4" lg="6">
                    <div className="d-flex align-items-center">
                      <Badge>
                        <div className="d-flex align-items-center">
                          <Star size={12} color={theme.starRatingBg} fill={theme.starRatingBg} className="me-50" />
                          <p className="m-0 fw-bolder rating-text">{returnFormattedRating(talent.rating)}</p>
                        </div>
                      </Badge>
                      <p className="m-0 font-small-3 fw-light ms-1">{talent.projects_worked_on_count} Projects</p>
                    </div>
                  </Col>
                </Row>
              ))}
            </InviteUsersListContainer>
          ) : (
            <InviteClubUsersListContainer>
              {selectedTalents.map((talent, index) => (
                <Row key={talent?.user_id || talent?._id} className="d-flex align-items-center w-100 mx-0">
                  <Col sm="12" md="8" lg="6" className="d-flex align-items-center ">
                    <div className="d-flex align-items-center">
                      <Avatar
                        img={talent?.image_uri?.length > 0 ? talent?.image_uri : defaultAvatar}
                        imgHeight="38"
                        imgWidth="38"
                        className="me-2 user-pic"
                      />
                    </div>
                    <div className="">
                      <p className="font-medium-1 fw-bold m-0">{`${talent.first_name} ${talent.last_name}`}</p>
                      <div className="d-flex align-items-center mt-25">
                        <Badge>
                          <div className="d-flex align-items-center">
                            <Star size={12} color={theme.starRatingBg} fill={theme.starRatingBg} className="me-50" />
                            <p className="m-0 fw-bolder rating-text">{returnFormattedRating(talent.rating)}</p>
                          </div>
                        </Badge>
                        <p className="m-0 font-small-3 fw-light ms-1">{talent.projects_worked_on_count} Projects</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12" md="4" lg="6">
                    <Label className="form-label mt-1" for="roleType">
                      Role Type
                    </Label>

                    <Select
                      options={[
                        { label: 'Member', value: 'Member' },
                        { label: 'Admin', value: 'Admin' },
                      ]}
                      classNamePrefix="select"
                      theme={selectThemeColors}
                      defaultValue={{ label: 'Member', value: 'Member' }}
                      value={{ label: capitalize(talent?.clubRole) || 'Member', value: talent.clubRole || 'Member' }}
                      onChange={(selectedOption) => {
                        handleRoleChange(index, selectedOption.label);
                      }}
                      className={classNames('react-select')}
                      placeholder="Select Role Type"
                      menuPlacement={
                        selectedTalents.length > 1 && index + 1 === selectedTalents.length ? 'top' : 'auto'
                      }
                    />
                  </Col>
                </Row>
              ))}
            </InviteClubUsersListContainer>
          )}

          <Input
            type="textarea"
            rows="5"
            placeholder="Enter your message to talent."
            className="mt-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-end mb-2 mt-3 px-3">
          <Button color="primary" outline className="me-3" onClick={handleClose}>
            <span className="px-2">Cancel</span>
          </Button>
          <Button
            color="primary"
            onClick={() => {
              setInvitationSentModal(true);
              toggleModal();
            }}
          >
            Invite
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default SendClubInvitationModal;

SendClubInvitationModal.propTypes = {
  createTeamView: Proptypes.bool,
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  selectedTalents: Proptypes.array,
  setInvitationSentModal: Proptypes.func,
  message: Proptypes.string,
  setMessage: Proptypes.func,
  setSelectedTalents: Proptypes.func,
  description: Proptypes.string,
  isClubView: Proptypes.bool,
};

SendClubInvitationModal.defaultProps = {
  createTeamView: false,
  modal: false,
  toggleModal: () => {},
  selectedTalents: [],
  setInvitationSentModal: () => {},
  message: '',
  setMessage: () => {},
  setSelectedTalents: () => {},
  description: '',
  isClubView: false,
};
