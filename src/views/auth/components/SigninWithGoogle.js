/* eslint-disable no-undef */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { memo, useEffect, useRef } from 'react';
import { loginUserWithGoogle } from '../../../redux/actions/authActions';
import { selectUserType } from '../../../redux/selectors/authSelectors';
import { ERROR_CODES, checkPoints } from '../../../utility/constants/Constant';
import { setItem } from '../../../utility/localStorageControl';
import { checkPointRedirection } from '../../../utility/Utils';
import toast from 'react-hot-toast';
import { Info } from 'react-feather';
import theme from '../../../configs/themeVariables';

const SigninWithGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userType = useSelector(selectUserType);
  const userTypeRef = useRef(userType);

  {
    /*  script.onload capture the values of variables at the time they were created. 
    This means that if userType changes after the onload callback is set up, 
    the callback would still hold the old value. Using useRef allows us to maintain 
    a reference to the latest userType
    */
  }
  // Update the ref whenever userType changes
  useEffect(() => {
    userTypeRef.current = userType;
  }, [userType]);

  // Styled-component
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

  // Success handler for Google login
  const onSuccess = (response) => {
    checkPointRedirection({ response, navigate });
  };

  // Error handler for Google login
  const onError = (error, id_token) => {
    if (error?.response?.status === ERROR_CODES.EC_422) {
      setItem('google_id_token', id_token);
      navigate('/auth');

      toast(() => <span>{error.response?.data?.errorData?.message}</span>, {
        position: 'top-center',
        icon: <Info size="20" color={theme.primary} />,
      });
    } else {
      toast.error(error.response?.data?.errorData?.message, {
        position: 'top-center',
      });
    }
  };

  // Handle Google credential response
  const handleCredentialResponse = (response) => {
    const currentUserType = userTypeRef.current;
    dispatch(loginUserWithGoogle({ id_token: response.credential, user_type: currentUserType, onError, onSuccess }));
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
        width: document.getElementById('buttonDiv')?.offsetWidth,
        logo_alignment: 'left',
      });
    };

    return () => {
      document.body.removeChild(script); // Clean up script element on component unmount
    };
  }, []);

  return (
    <GoogleWrap>
      <div id="buttonDiv" />
    </GoogleWrap>
  );
};

export default memo(SigninWithGoogle);
