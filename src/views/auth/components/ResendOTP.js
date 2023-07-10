/* eslint-disable react/require-default-props */
import { useEffect, useState } from 'react';
import { Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { resendAction } from '../../../redux/actions/authActions';
import { selectEmail, selectMobile, selectUserType } from '../../../redux/selectors/authSelectors';

const ResendOTPComp = ({ isEmailResend, isPhoneResend, isEmailResendFP }) => {
  const dispatch = useDispatch();
  const userType = useSelector(selectUserType);
  const emailId = useSelector(selectEmail);
  const phoneData = useSelector(selectMobile);
  const [countdown, setCountdown] = useState(0);
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [countdown]);

  const handleResend = () => {
    if (countdown === 0) {
      if (isEmailResendFP) {
        dispatch(resendAction({ email: emailId, isEmailResendFP: true }));
      }
      if (isEmailResend) {
        dispatch(resendAction({ email: emailId, isEmailResend: true, userType }));
      }
      if (isPhoneResend) {
        dispatch(
          resendAction({
            phone: phoneData.phone,
            country_code: phoneData?.selectedCountry.dial_code.slice(1),
            isPhoneResend: true,
          }),
        );
      }
      setCountdown(180); // reset the countdown to 60 seconds
    }
  };
  return (
    <div
      className={`d-flex justify-content-center sign-info ${countdown === 0 && 'cursor-pointer'} `}
      onClick={handleResend}
    >
      <Label className={countdown === 0 && 'cursor-pointer'}>
        <small>Resend</small>
      </Label>
      <Label className={`primary ${countdown === 0 && 'cursor-pointer'}`}>
        <small>Code</small>
      </Label>
      {countdown !== 0 && (
        <Label>
          <small>
            in {minutes}:{seconds < 10 ? '0' : ''}
            {seconds} minutes
          </small>
        </Label>
      )}
    </div>
  );
};
export default ResendOTPComp;

ResendOTPComp.propTypes = {
  isEmailResend: PropTypes.bool,
  isPhoneResend: PropTypes.bool,
  isEmailResendFP: PropTypes.bool,
};
