import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { Button, Modal, ModalHeader, ModalBody, Row, FormFeedback, Col, Spinner } from 'reactstrap';
import '../../custom-styles.scss';
import { selectThemeColors } from '../../../utility/Utils';
import { RequirementsFormContainer } from '../../CreateProject/style';
import { validEmailRegex } from '../../../utility/constants/Constant';
import { createNewReferral } from '../../../redux/actions/referralAndRewardActions';
import { createReferralLoading } from '../../../redux/selectors/referralAndRewardSelectors';

const ReferNowModal = ({ modal, toggleModal }) => {
  const dispatch = useDispatch();

  const createReferralIsLoading = useSelector(createReferralLoading);

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

    // eslint-disable-next-line no-undef
    const data = { redirect_url: `${`${window.location.protocol}//${window.location.host}`}/auth`, emails: allEmails };

    if (allEmails.length) {
      dispatch(createNewReferral(data, onSuccess));
    } else {
      setValidEmailError(true);
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
            <div className="d-flex justify-content-end mt-50">
              <Button
                color="primary"
                type="button"
                className="mb-1 mt-2"
                onClick={onSubmit}
                disabled={createReferralIsLoading}
              >
                {createReferralIsLoading ? <Spinner size="sm" /> : <>Send Invite</>}
              </Button>
            </div>
          </div>
        </RequirementsFormContainer>
      </ModalBody>
    </Modal>
  );
};

export default ReferNowModal;

ReferNowModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

ReferNowModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
