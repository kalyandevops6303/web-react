// ** React Imports
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// ** Icons Imports
import Logo from '@src/assets/images/ic_trumio_logo.png';
import GoogleIcon from '@src/assets/images/google.png';

// ** Reactstrap Imports
import { CardTitle, Label, Form, Input, Button, FormFeedback, CardText } from 'reactstrap';

// ** Custom Components
import { OnBoardWrap } from './style';
import { validations } from '../../utility/Utils';

// ** Styles
import '@styles/react/pages/page-authentication.scss';

const RegisterEmail = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: validations.email.email('Invalid email address').required('Email is required'),
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
    },
  });

  const onSubmit = () => {
    navigate('/forgot-password-email-verify');
  };

  const emailValue = watch('email'); // track the value of the mobile field
  return (
    <OnBoardWrap>
      <div className="card-onboard">
        <img alt="logo" src={Logo} className="card-logo" />
        <CardTitle tag="h1" className="card-title-onboard">
          Forgot Password? 🔒
        </CardTitle>
        <CardText className="mb-2">
          Enter your email and we&apos;ll send you instructions to reset your password
        </CardText>
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
          <Label tag={Link} to="/login" className="primary">
            <small>Sign in</small>
          </Label>
        </div>
      </div>
    </OnBoardWrap>
  );
};

export default RegisterEmail;
