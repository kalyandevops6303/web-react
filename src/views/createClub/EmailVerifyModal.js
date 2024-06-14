import React, { useState } from 'react';
import Proptypes from 'prop-types';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Spinner } from 'reactstrap';
import ResendOTPComp from '../auth/components/ResendOTP';
import { EmailVerifyModalContainer } from './style';
import { createClub } from '../../redux/actions/clubActions';
import { clearAllFormData } from '../../redux/reducers/formData';

const EmailVerifyModal = ({ modal, toggleModal, setClubCreatedModal }) => {
  const dispatch = useDispatch();
  const [otpError, setOtpError] = useState(false);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const emailId = useSelector((state) => state.clubs.email);
  const clubCreateData = useSelector((state) => state.clubs.clubCreateData);

  const handleChange = (value) => {
    setCode(value);
    setOtpError(false);
  };

  const onCreateTeamSuccess = () => {
    setIsLoading(false);
    toggleModal();
    setClubCreatedModal(true);
    dispatch(clearAllFormData());
  };

  const verifyOtp = () => {
    setIsLoading(true);
    const skillsWithId = clubCreateData?.skills?.map((skill) => skill);
    const toolsWithId = clubCreateData?.tools?.map((tool) => tool);
    const interestsWithId = clubCreateData?.interests?.map((interest) => interest);
    const institutionId = clubCreateData?.education_institute?.value;
    const dataWithCode = {
      ...clubCreateData,
      education_institute: institutionId,
      skills: skillsWithId,
      tools: toolsWithId,
      interests: interestsWithId,
      email_code: code,
      team_type: 'CLUB',
    };
    const requiredData = Object.keys(dataWithCode).reduce((result, key) => {
      if (key !== 'selectedImagePreview') {
        // eslint-disable-next-line no-param-reassign
        result[key] = dataWithCode[key];
      }
      return result;
    }, {});
    dispatch(createClub({ data: requiredData, onSuccess: onCreateTeamSuccess, onError: () => setIsLoading(false) }));
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered">
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="pt-0 emailModalbody">
        <EmailVerifyModalContainer>
          <h2 className="font-large-1 text-left">Email Verification 💬</h2>
          <p className="mb-2 mt-2">We sent a verification code to your email ID. Enter the code in the field below.</p>
          <Form className="auth-login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <Label className="form-label" for="login-email">
                Email ID<span className="label-asterisk text-danger me-50">*</span>
              </Label>
              {emailId ? (
                <Input
                  defaultValue={emailId}
                  type="email"
                  id="login-email"
                  placeholder="john@example.com"
                  autoFocus
                  disabled
                />
              ) : (
                <div>
                  <Spinner size="sm" />
                </div>
              )}
            </div>

            <OtpInput
              value={code}
              onChange={handleChange}
              numInputs={4}
              separator={<span style={{ width: '12px' }} />}
              isInputNum
              shouldAutoFocus
              inputStyle={{
                border: `1px solid #DCDBE2`,
                borderRadius: '8px',
                width: '50px',
                height: '50px',
                fontSize: '12px',
                color: '#000',
                fontWeight: '400',
                caretColor: 'blue',
              }}
              focusStyle={{
                border: '1px solid #0065C1',
                outline: 'none',
              }}
            />
            {otpError && <FormFeedback className="mt-1">Invalid code</FormFeedback>}
            <Button
              color="primary"
              block
              className="mt-4 mb-25"
              disabled={code.length !== 4 || isLoading}
              onClick={verifyOtp}
            >
              {isLoading ? <Spinner size="sm" /> : 'Verify OTP'}
            </Button>
          </Form>
          <ResendOTPComp isClubEmailResend />
        </EmailVerifyModalContainer>
      </ModalBody>
    </Modal>
  );
};

export default EmailVerifyModal;

EmailVerifyModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  setClubCreatedModal: Proptypes.func,
};

EmailVerifyModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  setClubCreatedModal: () => {},
};
