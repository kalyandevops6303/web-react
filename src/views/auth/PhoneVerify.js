// ** React Imports
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ** Reactstrap Imports
import { CardTitle, CardText, Label, Form, Input, Button } from 'reactstrap';

// ** Custom Components
import CountryDropdown from '../../@core/components/country-dropdown';

// ** Illustrations Imports
// ** Styles
import '@styles/react/pages/page-authentication.scss';
import { OnBoardWrap } from './style';
import { getUserData, verifyPhone } from '../../redux/actions/authActions';
import theme from '../../configs/themeVariables';
import {
  selectAuthLoading,
  selectIsPhoneVerified,
  selectMobile,
  selectUserType,
} from '../../redux/selectors/authSelectors';
import ResendOTPComp from './components/ResendOTP';
import OtpInput from '../../lib/otp-input';
import LogoComp from './components/LogoComp';
import SpeechEmoji from '../../assets/images/logo/speech_baloon.png';
import { clearAllFormData, setFormData } from '../../redux/reducers/formData';
import { formData } from '../../redux/selectors/formDataSelectors';
import { CITIZEN_TYPES } from '../../utility/constants/Constant';
import ShowToastMessage from '../../@core/components/toast';
import { SUCCESS } from '../../utility/constants/ToastTypes';

const VerifyPhone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedFormData = useSelector(formData);
  const [code, setCode] = useState(savedFormData?.code || '');

  const isLoading = useSelector(selectAuthLoading);
  const isPhoneVerified = useSelector(selectIsPhoneVerified);
  const phoneData = useSelector(selectMobile);

  const userType = useSelector(selectUserType);

  useEffect(() => {
    if (!userType) {
      dispatch(getUserData());
    }
  }, []);

  useEffect(() => {
    if (isPhoneVerified && userType) {
      ShowToastMessage(SUCCESS, 'Account created successfully. Please login again to start onboarding process.');
      navigate('/auth/login');
      // navigate(`/${userType.toLowerCase()}-onboarding/account-details`);
    } else if (isPhoneVerified && !userType) {
      navigate('/auth');
    }
    if (!phoneData) {
      navigate('/auth/register-phone');
    }
  }, [isPhoneVerified, navigate]);

  const [selectedCountry, setSelectedCountry] = useState({
    label: 'United States',
    dial_code: '+1',
    code: CITIZEN_TYPES.US,
    _id: '6479c2071183add75cda4e37',
  });

  const handleChange = (value) => {
    dispatch(setFormData({ code: value }));
    setCode(value);
  };

  // Function to handle dropdown change
  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  const verifyOtp = () => {
    dispatch(
      verifyPhone({
        phone: phoneData.phone,
        country_code: phoneData?.selectedCountry.dial_code,
        code,
        country_id: phoneData?.selectedCountry?._id,
      }),
    );
    dispatch(clearAllFormData());
  };

  return (
    <OnBoardWrap>
      <div className="card-onboard">
        <LogoComp />
        <CardTitle tag="h1" className="card-title-onboard">
          Two Step Verification <img className="speech-emoji" src={SpeechEmoji} alt="" />
        </CardTitle>

        <CardText className="mb-2 card-text">
          We sent a verification code to your mobile number. Enter it in the field below.
          <span className="auth-edit" onClick={() => navigate(-1)}>
            Edit Mobile
          </span>
        </CardText>

        <Form className="auth-login-form">
          <div className="mb-3">
            <Label className="form-label" for="login-email">
              Mobile number
            </Label>
            <div className="d-flex">
              <CountryDropdown
                selectedCountry={phoneData?.selectedCountry || selectedCountry}
                setSelectedCountry={handleCountryChange}
                disabled
              />
              <div className="mobile-input">
                <Input defaultValue={phoneData?.phone} type="number" placeholder="Phone number" disabled />
              </div>
            </div>
          </div>
          <OtpInput
            value={code}
            onChange={handleChange}
            numInputs={4}
            separator={<span style={{ width: '12px' }} />}
            isInputNum
            shouldAutoFocus
            inputStyle={{
              border: `1px solid ${theme.OTPborderColor}`,
              borderRadius: '8px',
              width: '50px',
              height: '50px',
              fontSize: '12px',
              color: '#000',
              fontWeight: '400',
              caretColor: 'blue',
            }}
            focusStyle={{
              border: `1px solid ${theme.primary}`,
              outline: 'none',
            }}
          />
          <Button color="primary" block className="mt-4" disabled={code.length !== 4 || isLoading} onClick={verifyOtp}>
            Submit
          </Button>
        </Form>

        <ResendOTPComp isPhoneResend />

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

export default VerifyPhone;
