// ** React Imports
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Info } from 'react-feather';

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle';

// ** Reactstrap Imports
import { CardTitle, Label, Form, Button, FormFeedback, Spinner, UncontrolledTooltip, Input } from 'reactstrap';

// ** utitlity
import { validations } from '../../utility/Utils';

// ** Styles
import { OnBoardWrap } from './style';
import '@styles/react/pages/page-authentication.scss';
import { setNewPassword } from '../../redux/actions/authActions';
import { selectAuthLoading, selectIsPasswordSet } from '../../redux/selectors/authSelectors';
import LogoComp from './components/LogoComp';
import theme from '../../configs/themeVariables';
import PasswordStrengthMeter from './components/PasswordStrengthMeter';

const RegisterDelegate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <OnBoardWrap>
      <div className="card-onboard">
        <LogoComp />
        <CardTitle tag="h1" className="card-title-onboard">
          Delegate Sign Up
        </CardTitle>

        <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
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
          <div className="mb-2">
            <Label className="form-label" for="login-email">
              New Password
            </Label>
            <Info size={16} color={theme.infoIcon} id="info" className="ms-25" />
            <UncontrolledTooltip placement="right" target="info">
              <p className="m-0 text-start">
                Password must contain at least 8 characters, with one uppercase, one lowercase, one number and one
                special case character
              </p>
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
                  className="input-group-merge create-password mb-75"
                  id="newPassword"
                  placeholder="Enter your new password"
                />
              )}
            />
            {newPassword && <PasswordStrengthMeter password={newPassword} />}

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
                  className="input-group-merge create-password"
                  id="cnfPassword"
                  placeholder="Confirm your new password"
                />
              )}
            />
            {errors.cnfPassword && <FormFeedback>{errors.cnfPassword.message}</FormFeedback>}
          </div>
          <Button color="primary" block type="submit" disabled={!newPassword || !cnfPassword || isLoading}>
            {isLoading ? <Spinner size="sm" /> : 'Create Account'}
          </Button>
        </Form>
      </div>
    </OnBoardWrap>
  );
};

export default RegisterDelegate;
