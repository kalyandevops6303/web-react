// ** React Imports
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

// ** Icons Imports
import Logo from '@src/assets/images/ic_trumio_logo.png';

// ** Reactstrap Imports
import { CardTitle, Label, Form, Button, FormFeedback } from 'reactstrap';

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle';
import { validations } from '../../utility/Utils';

// ** Styles
import { OnBoardWrap } from './style';
import '@styles/react/pages/page-authentication.scss';

const SetPassword = () => {
  const navigate = useNavigate();
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
  const onSubmit = () => {
    navigate('/auth/register-phone');
  };

  const newPassword = watch('newPassword');
  const cnfPassword = watch('cnfPassword');

  return (
    <OnBoardWrap>
      <div className="card-onboard">
        <img alt="logo" src={Logo} className="card-logo" />
        <CardTitle tag="h1" className="card-title-onboard">
          Create Password! 🔐
        </CardTitle>
        <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <Label className="form-label" for="login-email">
              New Password
            </Label>
            <Controller
              className="input-group-merge"
              id="newPassword"
              placeholder="Confirm your new password"
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
                  placeholder="Confirm your new password"
                />
              )}
            />
            {errors.newPassword && <FormFeedback>{errors.newPassword.message}</FormFeedback>}
          </div>
          <div className="mb-3">
            <Label className="form-label" for="login-email">
              Confirm new Password
            </Label>
            <Controller
              className="input-group-merge"
              id="cnfPassword"
              placeholder="Confirm your new password"
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
          <Button color="primary" block type="submit" disabled={!newPassword || !cnfPassword}>
            Save Password
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

export default SetPassword;
