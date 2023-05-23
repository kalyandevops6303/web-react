/* eslint-disable no-undef */
// ** React Imports
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// ** Icons Imports
import Logo from '@src/assets/images/ic_trumio_logo.png';
import GoogleIcon from '@src/assets/images/google.png';

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle';

// ** Reactstrap Imports
import { CardTitle, Label, Form, Input, Button, FormFeedback } from 'reactstrap';

// ** Illustrations Imports
// ** Styles
import { OnBoardWrap } from './style';
import '@styles/react/pages/page-authentication.scss';
import { validations } from '../../utility/Utils';

const Login = () => {
  const schema = yup.object().shape({
    email: validations.email.email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
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
      password: '',
    },
  });

  const onSubmit = () => {};

  const emailValue = watch('email'); // track the value of the mobile field
  const passValue = watch('password'); // track the value of the mobile field

  return (
    <OnBoardWrap isLoginPage={window.location.pathname === '/login'}>
      <div className="card-onboard">
        <img alt="logo" src={Logo} className="card-logo" />
        <CardTitle tag="h1" className="card-title-onboard">
          Welcome Back! 👋🏻{' '}
        </CardTitle>
        <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1">
            <Label className="form-label" for="login-email">
              Email
            </Label>
            {/* <Input type="email" id="login-email" placeholder="john@example.com" autoFocus /> */}
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
          <div className="mb-1">
            <Label className="form-label" for="login-email">
              Password
            </Label>
            {/* <Input type="email" id="login-email" placeholder="john@example.com" autoFocus /> */}
            <Controller
              className="input-group-merge"
              id="password"
              placeholder="Confirm your new password"
              type="password"
              name="password"
              autoFocus
              control={control}
              render={({ field }) => (
                <InputPasswordToggle
                  {...field}
                  value={field.value || ''} // Set a default value for the input
                  className="input-group-merge"
                  id="password"
                  placeholder="Confirm your new password"
                />
              )}
            />
            {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
          </div>

          <div className="form-check mb-1">
            <div className="d-flex justify-content-end fw-bold">
              <Label tag={Link} to="/forgot-password" color="primary" className="form-check-label" for="remember-me">
                <small>Forgot password?</small>
              </Label>
            </div>
          </div>
          <Button size="btn-sm" type="submit" color="primary" block disabled={!emailValue || !passValue}>
            Sign in
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
            <small>New to Trumio?</small>
          </Label>
          <Label tag={Link} to="/register" className="primary">
            <small>Create an account</small>
          </Label>
        </div>
      </div>
    </OnBoardWrap>
  );
};

export default Login;
