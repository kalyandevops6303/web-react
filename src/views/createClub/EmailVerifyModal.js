import React, { useState } from 'react';
import Proptypes from 'prop-types';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Spinner } from 'reactstrap';
import ResendOTPComp from '../auth/components/ResendOTP';
import { selectAuthLoading } from '../../redux/selectors/authSelectors';
import { EmailVerifyModalContainer } from './style';
import { createClub } from '../../redux/actions/clubActions';

const EmailVerifyModal = ({ modal, toggleModal, setClubCreatedModal }) => {
  const dispatch = useDispatch();
  const [otpError, setOtpError] = useState(false);
  const [code, setCode] = useState('');
  const isLoading = useSelector(selectAuthLoading);
  const emailId = useSelector((state) => state.clubs.email);
  const clubCreateData = useSelector((state) => state.clubs.clubCreateData);

  const handleChange = (value) => {
    setCode(value);
    setOtpError(false);
  };

  const onCreateTeamSuccess = () => {
    toggleModal();
    setClubCreatedModal(true);
  };

  const verifyOtp = () => {
    const dataWithCode = {
      ...clubCreateData,
      email_code: code,
      team_type: 'CLUB',
    };
    dispatch(createClub({ data: dataWithCode, onSuccess: onCreateTeamSuccess }));
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
              <Input
                defaultValue={emailId}
                type="email"
                id="login-email"
                placeholder="john@example.com"
                autoFocus
                disabled
              />
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
          <ResendOTPComp isEmailResend />
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
