import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { Button, Modal, ModalHeader, ModalBody, Row, FormFeedback, Col, Spinner } from 'reactstrap';
import '../custom-styles.scss';
import { inviteTalents } from '../../redux/actions/createProjectActions';
import { inviteTalentsLoading } from '../../redux/selectors/createProjectSelectors';
import { selectThemeColors } from '../../utility/Utils';
import { RequirementsFormContainer } from './style';
import { validEmailRegex } from '../../utility/constants/Constant';

const InviteModal = ({ modal, toggleModal, projectId }) => {
  const dispatch = useDispatch();

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
    toggleModal();
  };

  const onSubmit = () => {
    const allEmails = customEmailsValue.map((email) => email.label);

    dispatch(inviteTalents(projectId, { emails: allEmails }, onSuccess));
  };

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
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
      default:
        break;
    }
  };

  return (
    <Modal
      isOpen={modal}
      contentClassName="custom-larger-than-medium-modal-style"
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={toggleModal} />
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
                  onInputChange={(newValue) => setInputValue(newValue)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  placeholder="Enter email IDs"
                  value={customEmailsValue}
                />
                {validEmailError && <FormFeedback>Enter a valid email</FormFeedback>}
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button
                color="primary"
                type="button"
                className="mb-1 mt-3"
                onClick={onSubmit}
                disabled={customEmailsValue.length === 0 || inviteTalentsIsLoading}
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

export default InviteModal;

InviteModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  projectId: Proptypes.string,
};

InviteModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  projectId: '',
};
