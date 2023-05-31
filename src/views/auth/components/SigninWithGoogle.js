/* eslint-disable no-console */
import React from 'react';
import { Button } from 'reactstrap';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '@src/assets/images/google.png';

const SigninWithGoogle = () => {
  const login = useGoogleLogin({
    // API will be called here, so kept console log for time being
    onSuccess: (codeResponse) => console.log(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });
  return (
    <Button outline onClick={() => login()} color="primary" block className="google-btn">
      <img src={GoogleIcon} alt="google-img" className="google-img" /> Sign up with Google
    </Button>
  );
};
export default SigninWithGoogle;
