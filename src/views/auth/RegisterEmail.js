// ** React Imports
import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// ** Icons Imports
import Logo from '@src/assets/images/ic_trumio_logo.png';
import GoogleIcon from '@src/assets/images/google.png';

// ** Reactstrap Imports
import { CardTitle, Label, Form, Input, Button, FormFeedback } from 'reactstrap';

// ** Custom Components
import { OnBoardWrap } from './style';
import { validations } from '../../utility/Utils';

// ** Styles
import '@styles/react/pages/page-authentication.scss';

const RegisterEmail = () => {
  const navigate = useNavigate();
  const [agreeTerms, setAgreeTerms] = useState(false);

  const schema = yup.object().shape({
    email: validations.email.email('Invalid email address').required('Email is required'),
    agreeTerms: yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      agreeTerms: false,
    },
  });

  const onSubmit = () => {
    navigate('/auth/email-verify');
  };

  const emailValue = watch('email'); // track the value of the mobile field
  return (
    <OnBoardWrap>
      <div className="card-onboard">
        <img alt="logo" src={Logo} className="card-logo" />
        <CardTitle tag="h1" className="card-title-onboard">
          Sign up! 🔐
        </CardTitle>
        <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <Label className="form-label" for="email">
              Email
            </Label>

            <Controller
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              autoFocus
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || ''} // Set a default value for the input
                  placeholder="john@example.com"
                  invalid={errors.email && true}
                />
              )}
            />
            {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
          </div>
          <div className="form-check mb-1">
            <div className="d-flex justify-content-between">
              <Label color="primary" className="form-check-label" for="remember-me">
                <small>
                  <Controller
                    type="checkbox"
                    id="remember-me"
                    name="agreeTerms"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value || false}
                        type="checkbox"
                        id="remember-me"
                        size="md"
                        checked={field.value} // Use field.value to set the checked state
                        onChange={(e) => {
                          field.onChange(e); // Call field.onChange to update the form value
                          setAgreeTerms(e.target.checked); // Update the local state
                        }}
                      />
                    )}
                  />
                  Agree & Sign up
                </small>
              </Label>

              <Label color="primary" className="form-check-label">
                <small>Privacy policy & terms</small>
              </Label>
            </div>
            {!agreeTerms && <FormFeedback>{errors.agreeTerms && errors.agreeTerms.message}</FormFeedback>}
          </div>
          <Button color="primary" block className="auth-btn" type="submit" disabled={!emailValue}>
            Send OTP
          </Button>
        </Form>
        <div className="divider my-2">
          <div className="divider-text">Or</div>
        </div>

        <Button outline tag={Link} to="#" color="primary" block className="google-btn">
          <img src={GoogleIcon} alt="google-img" className="google-img" /> Sign up with Google
        </Button>
        <div className="d-flex justify-content-center sign-info">
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

export default RegisterEmail;
