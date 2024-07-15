import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

// ** Custom Components

// ** Reactstrap Imports
import { CardTitle, CardText, Label, Form, Input, Button, FormFeedback, Spinner } from 'reactstrap';

// ** Styles
import '@styles/react/pages/page-authentication.scss';
import { OnBoardWrap } from './style';
import { verifyEmail } from '../../redux/actions/authActions';
import {
  selectAuthLoading,
  selectEmail,
  selectIsEmailVerified,
  selectUserType,
} from '../../redux/selectors/authSelectors';
import OtpInput from '../../lib/otp-input';
import ResendOTPComp from './components/ResendOTP';
import LogoComp from './components/LogoComp';
import SpeechEmoji from "../../assets/images/logo/speech_baloon.png";
import { clearAllFormData, setFormData } from '../../redux/reducers/formData';
import { formData } from '../../redux/selectors/formDataSelectors';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const [otpError, setOtpError] = useState(false);
  const navigate = useNavigate();
  const savedFormData = useSelector(formData);
  const [code, setCode] = useState((savedFormData && savedFormData.code) || '');
  const isEmailVerified = useSelector(selectIsEmailVerified);
  const userType = useSelector(selectUserType);
  const isLoading = useSelector(selectAuthLoading);
  const emailId = useSelector(selectEmail);
  
  useEffect(() => {
    if (!userType || !emailId) {
      navigate('/auth');
    }
    if (isEmailVerified) {
      navigate('/auth/set-password');
    }
  }, [isEmailVerified, navigate]);

  const handleChange = (value) => {
    dispatch(setFormData({code:value}));
    setCode(value);
    setOtpError(false);
  };

  const verifyOtp = () => {
    dispatch(verifyEmail({ email: emailId, user_type: userType, code }));
    dispatch(clearAllFormData());
  };

  return (
    <OnBoardWrap>
      <div className="card-onboard">
        <LogoComp />
        <CardTitle tag="h1" className="card-title-onboard title-with-emoij">
        Two Step Verification <img className='speech-emoji' src={SpeechEmoji} alt='' />
        </CardTitle>
        <CardText className="mb-2 card-text">
          We sent a verification code to your email. Enter it in the field below.
          <span className="auth-edit" onClick={() => navigate(-1)}>
            Go back
          </span>
        </CardText>
        <Form className="auth-login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <Label className="form-label" for="login-email">
              Email
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
              width: '55px',
              height: '50px',
              fontSize: '18px',
              color: '#000',
              fontWeight: '500',
              caretColor: 'blue',
            }}
            focusStyle={{
              border: '1px solid #0065C1',
              outline: 'none',
            }}
          />
          {otpError && <FormFeedback className="mt-1">Invalid code</FormFeedback>}
          <Button color="primary" block className="mt-4" disabled={code.length !== 4 || isLoading} onClick={verifyOtp}>
            {isLoading ? <Spinner size="sm" /> : 'Submit'}
          </Button>
        </Form>

        <ResendOTPComp isEmailResend />
        <div className="d-flex justify-content-center sign-info last-row">
          <Label>
            <small>Already have an account?</small>
          </Label>
          <Label tag={Link} to="/auth/login" className="primary">
            <small>Sign in</small>
          </Label>
        </div>
      </div>
    </OnBoardWrap>
  );
};

export default VerifyEmail;
