/* eslint-disable no-undef */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { memo, useEffect } from 'react';
import { loginUserWithGoogle } from '../../../redux/actions/authActions';
import { selectIsLoggedIn, selectUserType } from '../../../redux/selectors/authSelectors';
import ERROR_CODES from '../../../utility/constants/Constant';

const SigninWithGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userType = useSelector(selectUserType);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const GoogleWrap = styled.div`
    display: flex;
    justify-content: center;
    #buttonDiv {
      width: 100%;
      display: flex;
      justify-content: center;
      iframe {
        width: 100%;
      }
    }
  `;

  const onSuccess = (resp) => {
    if (resp?.checkpoint === 'MOBILE_VERIFICATION') {
      navigate('/auth/register-phone');
    } else if (resp?.checkpoint === 'ACCOUNT_DETAILS') {
      navigate(`/${resp.user_type.toLowerCase()}-onboarding`);
    } else if (isLoggedIn) {
      navigate('/coming-soon');
    }
  };
  const onError = (error) => {
    if (error.response.status === ERROR_CODES.EC_422) {
      navigate('/auth');
    }
  };

  const handleCredentialResponse = (response) => {
    // Handle the credential response here
    dispatch(loginUserWithGoogle({ id_token: response.credential, user_type: userType, onError, onSuccess }));
  };

  useEffect(() => {
    // Load Google API script asynchronously
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.body.appendChild(script);

    // Render the Google button once the script has loaded
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
        type: 'standard',
        size: 'large',
        shape: 'rectangular',
        width: document.getElementById('buttonDiv').offsetWidth,
        logo_alignment: 'left',
      });
    };
  }, []);

  return (
    <GoogleWrap>
      <div id="buttonDiv" />
    </GoogleWrap>
  );
};
export default memo(SigninWithGoogle);
