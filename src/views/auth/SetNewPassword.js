// ** React Imports
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Info } from 'react-feather';

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle';

// ** Reactstrap Imports
import { CardTitle, Label, Form, Button, FormFeedback, Spinner, UncontrolledTooltip } from 'reactstrap';

// ** utitlity
import { validations } from '../../utility/Utils';

// ** Styles
import { OnBoardWrap, PasswordStrengthBarWrap } from './style';
import '@styles/react/pages/page-authentication.scss';
import { setNewPassword } from '../../redux/actions/authActions';
import { selectAuthLoading, selectIsPasswordSet } from '../../redux/selectors/authSelectors';
import LogoComp from './components/LogoComp';
import theme from '../../configs/themeVariables';

const SetNewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);

  const isLoading = useSelector(selectAuthLoading);
  const isPasswordSet = useSelector(selectIsPasswordSet);

  useEffect(() => {
    if (isPasswordSet) {
      navigate('/auth/login');
    }
  }, [isPasswordSet, navigate]);

  const schema = yup.object().shape({
    newPassword: validations.newPassword.required('Password is required'),
    cnfPassword: validations.confirmPassword.required('Please Re-type your password'),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      newPassword: '',
      cnfPassword: '',
    },
  });
  const onSubmit = (values) => {
    dispatch(setNewPassword(values?.newPassword));
  };

  const newPassword = watch('newPassword');
  const cnfPassword = watch('cnfPassword');

  const onChangeScore = (s) => {
    setScore(s);
  };
  const scoreColors = {
    0: 'red',
    1: 'red',
    2: 'orange',
    3: 'blue',
    4: 'green',
  };

  const getColorName = (s) => scoreColors[s] || '';

  return (
    <OnBoardWrap>
      <div className="card-onboard">
        <LogoComp />
        <CardTitle tag="h1" className="card-title-onboard">
          Set New Password! 🔐
        </CardTitle>

        <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <Label className="form-label" for="login-email">
              New Password
            </Label>
            <Info size={16} color={theme.infoIcon} id="info" className="ms-25" />
            <UncontrolledTooltip placement="right" target="info">
              <div className="d-flex flex-column align-items-start">
                <p className="m-0">
                  Password must contain at least 8 characters, with one uppercase, one lowercase, one number and one
                  special case character
                </p>
              </div>
            </UncontrolledTooltip>
            <Controller
              className="input-group-merge"
              id="newPassword"
              placeholder="Enter your new password"
              type="newPassword"
              name="newPassword"
              autoFocus
              control={control}
              render={({ field }) => (
                <InputPasswordToggle
                  {...field}
                  value={field.value || ''} // Set a default value for the input
                  className="input-group-merge"
                  id="newPassword"
                  placeholder="Enter your new password"
                />
              )}
            />
            {newPassword && (
              <PasswordStrengthBarWrap>
                <PasswordStrengthBar
                  className={`password-meter ${getColorName(score)}`}
                  scoreWords={[
                    'Password strength: Weak',
                    'Password strength: Weak',
                    'Password strength: Fair',
                    'Password strength: Good',
                    'Password strength: Strong',
                  ]}
                  shortScoreWord="Too short"
                  password={newPassword}
                  onChangeScore={onChangeScore}
                />
              </PasswordStrengthBarWrap>
            )}
            {errors.newPassword && <FormFeedback>{errors.newPassword.message}</FormFeedback>}
          </div>
          <div className="mb-3">
            <Label className="form-label" for="login-email">
              Confirm new Password
            </Label>
            <Controller
              className="input-group-merge"
              id="cnfPassword"
              type="cnfPassword"
              name="cnfPassword"
              autoFocus
              control={control}
              render={({ field }) => (
                <InputPasswordToggle
                  {...field}
                  value={field.value || ''} // Set a default value for the input
                  className="input-group-merge"
                  id="cnfPassword"
                  placeholder="Confirm your new password"
                />
              )}
            />
            {errors.cnfPassword && <FormFeedback>{errors.cnfPassword.message}</FormFeedback>}
          </div>
          <Button color="primary" block type="submit" disabled={!newPassword || !cnfPassword || isLoading}>
            {isLoading ? <Spinner size="sm" /> : 'Save Password'}
          </Button>
        </Form>
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

export default SetNewPassword;
