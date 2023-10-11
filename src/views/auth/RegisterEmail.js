// ** React Imports
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import { CardTitle, Label, Form, Input, Button, FormFeedback, Spinner } from 'reactstrap';

// ** Custom Components
import { OnBoardWrap } from './style';
import { validations } from '../../utility/Utils';

// ** Styles
import '@styles/react/pages/page-authentication.scss';
import { registerEmail } from '../../redux/actions/authActions';
import SigninWithGoogle from './components/SigninWithGoogle';
import { selectAuthLoading, selectEmail, selectUserType } from '../../redux/selectors/authSelectors';
import LogoComp from './components/LogoComp';
import theme from '../../configs/themeVariables';

const RegisterEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const emailData = useSelector(selectEmail);
  const userType = useSelector(selectUserType);

  useEffect(() => {
    if (!userType) {
      navigate('/auth');
    }
  }, [userType, navigate]);

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
      email: emailData || '',
      agreeTerms: false,
    },
  });

  const onSuccess = () => {
    navigate('/auth/email-verify');
  };

  const onSubmit = (values) => {
    const { email } = values;
    dispatch(registerEmail({ email, userType, onSuccess }));
  };

  const emailValue = watch('email'); // track the value of the mobile field

  return (
    <OnBoardWrap>
      <div className="card-onboard">
        <LogoComp />
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
              placeholder="Enter email ID"
              autoFocus
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || ''} // Set a default value for the input
                  placeholder="Enter email ID"
                  invalid={errors.email && true}
                />
              )}
            />
            {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
          </div>
          <div className="form-check mb-1">
            <div className="d-flex justify-content-between align-items-center">
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

              <Label color={theme.primary} className="mb-0 ">
                <small className="privacy-terms-label">
                  <u>Privacy policy </u>
                </small>
                <small className="privacy-terms-label">&</small>
                <small className="privacy-terms-label">
                  <u>Terms</u>
                </small>
              </Label>
            </div>
            {!agreeTerms && <FormFeedback>{errors.agreeTerms && errors.agreeTerms.message}</FormFeedback>}
          </div>
          <Button
            color="primary"
            block
            className="auth-btn"
            type="submit"
            disabled={!emailValue || isLoading || !agreeTerms}
          >
            {isLoading ? <Spinner size="sm" /> : 'Submit'}
          </Button>
        </Form>
        <div className="divider my-2">
          <div className="divider-text">Or</div>
        </div>

        <SigninWithGoogle title="Sign Up" />

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
