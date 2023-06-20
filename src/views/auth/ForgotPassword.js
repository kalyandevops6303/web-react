// ** React Imports
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// ** Icons Imports
import Logo from '@src/assets/images/ic_trumio_logo.png';

// ** Reactstrap Imports
import { CardTitle, Label, Form, Input, Button, FormFeedback, CardText, Spinner } from 'reactstrap';

// ** Custom Components
import { OnBoardWrap } from './style';
import { validations } from '../../utility/Utils';

// ** Styles
import '@styles/react/pages/page-authentication.scss';
import { forgotPassword } from '../../redux/actions/authActions';
import { selectAuthLoading, selectEmail } from '../../redux/selectors/authSelectors';

const RegisterEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const emailData = useSelector(selectEmail);

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
      email: emailData || '',
    },
  });

  const onSuccess = () => {
    navigate('/auth/forgot-password-email-verify');
  };

  const onSubmit = (values) => {
    dispatch(forgotPassword({ email: values.email, onSuccess }));
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

          <Button color="primary" block className="auth-btn" type="submit" disabled={!emailValue || isLoading}>
            {isLoading ? <Spinner size="sm" /> : 'Send OTP'}
          </Button>
        </Form>
        <div className="divider my-2">
          <div className="divider-text">Or</div>
        </div>

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
