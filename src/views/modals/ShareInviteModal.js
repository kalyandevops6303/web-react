/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { Button, Modal, ModalHeader, ModalBody, Row, FormFeedback, Col, Spinner } from 'reactstrap';
import '../custom-styles.scss';
import { selectThemeColors } from '../../utility/Utils';
import { validEmailRegex } from '../../utility/constants/Constant';
import { RequirementsFormContainer } from '../CreateProject/style';
import { inviteTalents } from '../../redux/actions/inviteTalent';
import { inviteTalentsLoading } from '../../redux/selectors/inviteTalentSelector';
import getTeamId from '../../utility/commonUtils';

const ShareInviteModal = ({ createTeamView, modal, inviteRole, toggleModal, projectId }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const inviteTalentsIsLoading = useSelector(inviteTalentsLoading);
  const [validEmailError, setValidEmailError] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [customEmailsValue, setCustomEmailsValue] = useState([]);

  const customSelectComponents = {
    DropdownIndicator: null,
  };

  const createOption = (label, value) => ({
    label,
    value,
  });

  const onSuccess = () => {
    if (location.pathname === '/create-team/profile-details') {
      navigate('/dashboard');
    }
    toggleModal();
  };

  const onSubmit = () => {
    const allEmails = customEmailsValue.map((email) => email.label);
    const teamId = getTeamId('team_id');

    const newPostData = {
      message: '',
      requests_to: {
        user_ids: [],
        team_ids: [],
        email_ids: allEmails,
      },
      request_for: {
        project_id: projectId || '',
        team_id: teamId,
        role: inviteRole || '',
      },
    };

    if (allEmails.length) {
      dispatch(inviteTalents({ data: newPostData, onSuccess }));
    } else {
      setValidEmailError(true);
    }
  };

  const handleInputChange = (newValue, actionMeta) => {
    if (actionMeta.action !== 'input-blur' && actionMeta.action !== 'menu-close') {
      setInputValue(newValue);
    }
  };

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case ',':
      case ' ':
        if (validEmailRegex.test(inputValue)) {
          if (validEmailRegex.test(inputValue) && !customEmailsValue.find((email) => email.label === inputValue)) {
            setCustomEmailsValue((prev) => [...prev, createOption(inputValue, inputValue)]);
            setInputValue('');
            setValidEmailError(false);
            event.preventDefault();
          }
        } else {
          setValidEmailError(true);
        }
        break;
      case 'Backspace':
        if (inputValue.length === 1) {
          setInputValue('');
        }
        break;
      default:
        break;
    }
  };

  const redirectToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Modal
      isOpen={modal}
      contentClassName="custom-larger-than-medium-modal-style"
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={createTeamView ? redirectToDashboard : toggleModal} />
      <ModalBody>
        <RequirementsFormContainer>
          <div className="d-flex flex-column px-3">
            <h2 className="fw-bold font-large-1 text-center mb-2">Invite</h2>
            <Row>
              <Col sm="12" md="12" lg="12">
                <CreatableSelect
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  inputId="emails"
                  name="emails"
                  components={customSelectComponents}
                  inputValue={inputValue}
                  isClearable
                  isMulti
                  menuIsOpen={false}
                  onChange={(newValue) => setCustomEmailsValue(newValue)}
                  onInputChange={handleInputChange}
                  onKeyDown={(e) => handleKeyDown(e)}
                  placeholder="Enter email IDs"
                  value={customEmailsValue}
                  onBlur={(e) => {
                    if (validEmailRegex.test(inputValue)) {
                      if (
                        validEmailRegex.test(inputValue) &&
                        !customEmailsValue.find((email) => email.label === inputValue)
                      ) {
                        setCustomEmailsValue((prev) => [...prev, createOption(inputValue, inputValue)]);
                        setInputValue('');
                        setValidEmailError(false);
                        e.preventDefault();
                      }
                    } else {
                      e.preventDefault();
                      setValidEmailError(true);
                    }
                  }}
                />
                {validEmailError && <FormFeedback>Enter a valid email</FormFeedback>}
              </Col>
            </Row>
            <p className="font-small-2 mt-50">
              Note: Please press either of &quot;Enter&quot; or &quot;Space&quot; or &quot;Comma&quot; after entering
              the email id in order to add it
            </p>
            <div className="d-flex justify-content-end">
              <Button
                color="primary"
                type="button"
                className="mb-1 mt-3"
                onClick={onSubmit}
                disabled={inviteTalentsIsLoading}
              >
                {inviteTalentsIsLoading ? <Spinner size="sm" /> : <>Send Invite</>}
              </Button>
            </div>
          </div>
        </RequirementsFormContainer>
      </ModalBody>
    </Modal>
  );
};

export default ShareInviteModal;

ShareInviteModal.propTypes = {
  createTeamView: Proptypes.bool,
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  projectId: Proptypes.string,
  inviteRole: Proptypes.string,
};

ShareInviteModal.defaultProps = {
  createTeamView: false,
  modal: false,
  toggleModal: () => {},
  projectId: '',
  inviteRole: '',
};
