/* eslint-disable no-undef */
// ** React Imports
import { useEffect } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

// ** Reactstrap Imports
import { CardTitle, Label, Form, Input, Button, FormFeedback, Spinner } from 'reactstrap';

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle';

// ** Illustrations Imports
// ** Styles
import { OnBoardWrap } from './style';
import '@styles/react/pages/page-authentication.scss';
import { filteredFormSchema, validations } from '../../utility/Utils';
import { loginUser, switchProfile } from '../../redux/actions/authActions';
import SigninWithGoogle from './components/SigninWithGoogle';
import { selectAuthLoading, selectIsLoggedIn } from '../../redux/selectors/authSelectors';
import { clearDataSuccess } from '../../redux/reducers/auth';
import LogoComp from './components/LogoComp';
import { removeItem, setItem } from '../../utility/localStorageControl';
import { checkPoints } from '../../utility/constants/Constant';
import { validateUrl } from '../../redux/actions/dashboardActions';
import { getItemFromSession, removeItemFromSession, setItemFromSession } from '../../utility/sessesionStorageControl';
import { clearAllFormData, setFormData } from '../../redux/reducers/formData';
import { formData } from '../../redux/selectors/formDataSelectors';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const schema = yup.object().shape({
    email: validations.email.email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const urlSearchParams = new URLSearchParams(window.location.search);
  const dataParam = urlSearchParams.get('data');

  const onValidUrlSuccess = (res) => {
    if (res.user_status === 'UNREGISTERED') {
      removeItem('isUserVisited');
      setItem('referral_via_share_data', res);

      navigate('/auth');
    } else if (isLoggedIn) {
      navigate('/dashboard');
    }
  };

  const onInvalidUrlSuccess = () => {};

  useEffect(() => {
    if (dataParam) {
      dispatch(validateUrl({ data: dataParam, onSuccess: onValidUrlSuccess, onError: onInvalidUrlSuccess }));
    } else if (isLoggedIn) {
      const teamId = getItemFromSession('team_id');
      const teamData = getItemFromSession('team_data');
      const redirectToLocation = getItemFromSession('redirect_to_location');
      if (redirectToLocation && teamId) {
        setItemFromSession('team_id', teamId);

        dispatch(
          switchProfile({
            data: teamData,
            onSuccess: navigate(redirectToLocation),
            selected: false,
          }),
        );
        removeItemFromSession('redirect_to_location');
      } else if (redirectToLocation) {
        navigate(redirectToLocation);
        removeItemFromSession('redirect_to_location');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isLoggedIn]);

  // Valid link
  // When user is logged in and he clicks mail, login => dashboard
  // When user is not looged in and he clicks mail, login =>

  // Invalid link
  // When user is logged in and he clicks mail, login => dashboard, show message link expired
  // When user is not looged in and he clicks mail, show link expired message on login

  useEffect(() => {
    dispatch(clearDataSuccess());
  }, []);
  const savedFormData = useSelector(formData);
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    trigger,
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: savedFormData?.email || '',
      password: savedFormData?.password || '',
    },
  });
  const localFormData = useWatch({ control });
  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData };
    dispatch(setFormData(allData));
  }, [localFormData]);

  useEffect(() => {
    if (savedFormData) {
      const requiredFields = filteredFormSchema({
        savedData: savedFormData,
        formSchemaFields: schema.fields,
      });
      reset(requiredFields);
      const keysWithValues = Object.keys(requiredFields).filter((key) => requiredFields[key]);
      trigger(keysWithValues);
    }
  }, []);

  const onSuccess = (resp) => {
    dispatch(clearAllFormData());
    if (resp?.checkpoint === checkPoints.MOBILE_VERIFICATION) {
      navigate('/auth/register-phone');
    } else if (resp?.checkpoint === checkPoints.ACCOUNT_DETAILS) {
      navigate(`/${resp.user_type.toLowerCase()}-onboarding/account-details`);
    } else if (resp?.checkpoint === checkPoints.PROFILE_DETAILS) {
      navigate(`/${resp.user_type.toLowerCase()}-onboarding/personal-details`);
    } else if (resp?.checkpoint === checkPoints.COMPLETE) {
      navigate('/dashboard');
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
        <LogoComp />
        <CardTitle tag="h1" className="card-title-onboard">
          Welcome Back! 👋🏻
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
                  placeholder="Enter your password"
                  onCopy={(e) => {
                    // disable copy from password field
                    e.preventDefault();
                    return false;
                  }}
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
                <small>Forgot Password?</small>
              </Label>
            </div>
          </div>
          <Button size="btn-sm" type="submit" color="primary" block disabled={!emailValue || !passValue || isLoading}>
            {isLoading ? <Spinner size="sm" /> : 'Sign in'}
          </Button>
        </Form>
        {/* <div className="divider my-2 custom-divider">
          <div className="divider-text">Or</div>
        </div> */}
        <div className="my-2 custom-divider">
          <span className="custom-line" />
          <p className="custom-divider-text m-0 px-1">Or</p>
          <span className="custom-line" />
        </div>
        <SigninWithGoogle title="Sign In" />
        <div className="d-flex justify-content-center sign-info">
          <Label>
            <small>New to Trumio?</small>
          </Label>
          <Label
            tag={Link}
            to="/auth"
            className="primary"
            onClick={() => {
              removeItem('isUserVisited');
              dispatch(clearAllFormData());
            }}
          >
            <small>Create an account</small>
          </Label>
        </div>
      </div>
    </OnBoardWrap>
  );
};

export default Login;
