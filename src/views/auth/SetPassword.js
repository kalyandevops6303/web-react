// ** React Imports
import { useEffect } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Info } from 'react-feather';

// ** Reactstrap Imports
import { CardTitle, Label, Form, Button, FormFeedback, Spinner, UncontrolledTooltip } from 'reactstrap';

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle';
import { filteredFormSchema, validations } from '../../utility/Utils';

// ** Styles
import { OnBoardWrap } from './style';
import '@styles/react/pages/page-authentication.scss';
import { setPassword } from '../../redux/actions/authActions';
import { selectAuthLoading, selectIsPasswordSet, selectTrumioIsFlextern } from '../../redux/selectors/authSelectors';
import LogoComp from './components/LogoComp';
import theme from '../../configs/themeVariables';
import PasswordStrengthMeter from './components/PasswordStrengthMeter';
import { formData } from '../../redux/selectors/formDataSelectors';
import { clearAllFormData, setFormData } from '../../redux/reducers/formData';
import ShowToastMessage from '../../@core/components/toast';
import { SUCCESS } from '../../utility/constants/ToastTypes';

const SetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectAuthLoading);
  const isPasswordSet = useSelector(selectIsPasswordSet);
  const savedFormData = useSelector(formData);
  const isFlextern = useSelector(selectTrumioIsFlextern);
  useEffect(() => {
    if (isFlextern && isPasswordSet) {
      ShowToastMessage(SUCCESS, 'Account created successfully. Please login again to start onboarding process.');
      setTimeout(() => {
        navigate('/auth/login', { state: { createdAccount: true } });
      }, 6000);
    } else if (isPasswordSet && !isFlextern) {
      navigate('/auth/register-phone');
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
    reset,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      newPassword: savedFormData?.newPassword || '',
      cnfPassword: savedFormData?.cnfPassword || '',
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

  const onSubmit = (values) => {
    const { newPassword } = values;
    dispatch(setPassword(newPassword));
    dispatch(clearAllFormData());
  };

  const newPassword = watch('newPassword');
  const cnfPassword = watch('cnfPassword');

  return (
    <OnBoardWrap>
      <div className="card-onboard">
        <LogoComp />
        <CardTitle tag="h1" className="card-title-onboard">
          Create Password! 🔐
        </CardTitle>
        <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <Label className="form-label d-flex justify-content-between" for="login-email">
              Password
              {/* <Info size={16} color={theme.infoIcon} id="info" className="ms-25" /> */}
            </Label>
            {/* <UncontrolledTooltip placement="right" target="info">
              <p className="m-0 text-start">
                Password must contain at least 8 characters, with one uppercase, one lowercase, one number and one
                special case character
              </p>
            </UncontrolledTooltip> */}
            <Controller
              className="input-group-merge"
              id="newPassword"
              placeholder="Enter your password"
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
                  placeholder="Enter your password"
                />
              )}
            />
            {newPassword && <PasswordStrengthMeter password={newPassword} />}

            {errors.newPassword && <FormFeedback>{errors.newPassword.message}</FormFeedback>}
          </div>
          <div className="mb-3">
            <Label className="form-label" for="login-email">
              Confirm Password
            </Label>
            <Controller
              className="input-group-merge"
              id="cnfPassword"
              placeholder="Confirm your password"
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
                  placeholder="Confirm your password"
                />
              )}
            />
            {errors.cnfPassword && <FormFeedback>{errors.cnfPassword.message}</FormFeedback>}
            <p className={`text-xs mt-2 ${cnfPassword === newPassword ? 'text-success' : 'text-danger'}`}>
              {cnfPassword && newPassword
                ? cnfPassword === newPassword
                  ? 'Passwords Match'
                  : 'Passwords Do Not Match'
                : ''}
            </p>
          </div>

          <Button
            color="primary"
            block
            type="submit"
            disabled={!newPassword || !cnfPassword || isLoading || newPassword !== cnfPassword}
          >
            {isLoading ? <Spinner size="sm" /> : 'Save Password'}
          </Button>
        </Form>

        {/* <div className="d-flex justify-content-center sign-info">
          <Label>
            <small>Already have an account?</small>
          </Label>
          <Label tag={Link} to="/auth/login" className="primary">
            <small>Sign in</small>
          </Label>
        </div> */}
      </div>
    </OnBoardWrap>
  );
};

export default SetPassword;
