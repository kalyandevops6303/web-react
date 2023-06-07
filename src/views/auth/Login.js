/* eslint-disable no-undef */
// ** React Imports
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

// ** Icons Imports
import Logo from '@src/assets/images/ic_trumio_logo.png';

// ** Reactstrap Imports
import { CardTitle, Label, Form, Input, Button, FormFeedback, Spinner } from 'reactstrap';

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle';

// ** Illustrations Imports
// ** Styles
import { OnBoardWrap } from './style';
import '@styles/react/pages/page-authentication.scss';
import { validations } from '../../utility/Utils';
import { loginUser } from '../../redux/actions/authActions';
import SigninWithGoogle from './components/SigninWithGoogle';
import { selectAuthLoading, selectIsLoggedIn } from '../../redux/selectors/authSelectors';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);

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

  const onSuccess = (resp) => {
    if (resp?.checkpoint === 'MOBILE_VERIFICATION') {
      navigate('/auth/register-phone');
    } else if (resp?.checkpoint === 'ACCOUNT_DETAILS') {
      navigate(`/${resp.user_type.toLowerCase()}-onboarding`);
    } else if (isLoggedIn) {
      navigate('/coming-soon');
    }
  };

  const onSubmit = (values) => {
    const { email, password } = values;

    dispatch(loginUser(email, password, onSuccess));
  };

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
              <Label
                tag={Link}
                to="/auth/forgot-password"
                color="primary"
                className="form-check-label"
                for="remember-me"
              >
                <small>Forgot password?</small>
              </Label>
            </div>
          </div>
          <Button size="btn-sm" type="submit" color="primary" block disabled={!emailValue || !passValue || isLoading}>
            {isLoading ? <Spinner size="sm" /> : 'Sign in'}
          </Button>
        </Form>
        <div className="divider my-2">
          <div className="divider-text">Or</div>
        </div>

        <SigninWithGoogle title="Sign In" />
        <div className="d-flex justify-content-center sign-info">
          <Label>
            <small>New to Trumio?</small>
          </Label>
          <Label tag={Link} to="/auth" className="primary">
            <small>Create an account</small>
          </Label>
        </div>
      </div>
    </OnBoardWrap>
  );
};

export default Login;
