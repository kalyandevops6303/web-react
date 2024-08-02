import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Info } from 'react-feather';
import InputPasswordToggle from '@components/input-password-toggle';
import { CardTitle, Label, Form, Button, FormFeedback, Spinner, UncontrolledTooltip, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { formData } from '../../redux/selectors/formDataSelectors';
import { clearAllFormData, setFormData } from '../../redux/reducers/formData';
import { validations, filteredFormSchema } from '../../utility/Utils';
import { OnBoardWrap } from './style';
import '@styles/react/pages/page-authentication.scss';
import { selectAuthLoading, selectEmail } from '../../redux/selectors/authSelectors';
import LogoComp from './components/LogoComp';
import theme from '../../configs/themeVariables';
import PasswordStrengthMeter from './components/PasswordStrengthMeter';
import PrivacyPolicyModal from '../modals/PrivacyPolicyModal';
import TermsModal from '../modals/TermsModal';
import { signUpDelegate } from '../../redux/actions/delegateActions';

const RegisterDelegateForm = React.memo(
  ({
    onSubmit,
    control,
    errors,
    newPassword,
    cnfPassword,
    agreeTerms,
    setPrivacyPolicyModal,
    setTermsModal,
    setAgreeTerms,
    isLoading,
  }) => (
    <Form className="auth-login-form mt-2" onSubmit={onSubmit}>
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
            <Input {...field} value={field.value || ''} placeholder="Enter email ID" invalid={errors.email && true} />
          )}
        />
        {errors?.email && <FormFeedback>{errors?.email?.message}</FormFeedback>}
      </div>
      <div className="mb-2">
        <Label className="form-label" for="login-email">
          New Password
        </Label>
        <Info size={16} color={theme.infoIcon} id="info" className="ms-25" />
        <UncontrolledTooltip placement="right" target="info">
          <p className="m-0 text-start">
            Password must contain at least 8 characters, with one uppercase, one lowercase, one number and one special
            case character
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
              value={field.value || ''}
              className="input-group-merge create-password mb-75"
              id="newPassword"
              placeholder="Enter your new password"
            />
          )}
        />
        {newPassword && <PasswordStrengthMeter password={newPassword} />}

        {errors.newPassword && <FormFeedback>{errors.newPassword.message}</FormFeedback>}
      </div>
      <div className="mb-2">
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
              value={field.value || ''}
              className="input-group-merge create-password"
              id="cnfPassword"
              placeholder="Confirm your new password"
            />
          )}
        />
        {errors.cnfPassword && <FormFeedback>{errors.cnfPassword.message}</FormFeedback>}
      </div>
      <div className="form-check mb-1">
        <div className="d-flex justify-content-between align-items-center checkbox-custom-label">
          <Label className="form-check-label" for="remember-me">
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
                    checked={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      setAgreeTerms(e.target.checked);
                    }}
                  />
                )}
              />
              Agree & Sign up
            </small>
          </Label>

          <Label color={theme.primary} className="mb-0 ">
            <small className="privacy-terms-label">
              <u className="cursor-pointer" onClick={() => setPrivacyPolicyModal(true)}>
                Privacy Policy
              </u>
            </small>
            <small>&</small>
            <small className="privacy-terms-label">
              <u className="cursor-pointer" onClick={() => setTermsModal(true)}>
                Terms
              </u>
            </small>
          </Label>
        </div>
        {!agreeTerms && <FormFeedback>{errors.agreeTerms && errors.agreeTerms.message}</FormFeedback>}
      </div>
      <Button color="primary" block type="submit" disabled={!newPassword || !cnfPassword || isLoading}>
        {isLoading ? <Spinner size="sm" /> : 'Create Account'}
      </Button>
    </Form>
  ),
);

RegisterDelegateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  newPassword: PropTypes.string.isRequired,
  cnfPassword: PropTypes.string.isRequired,
  agreeTerms: PropTypes.bool.isRequired,
  setPrivacyPolicyModal: PropTypes.func.isRequired,
  setTermsModal: PropTypes.func.isRequired,
  setAgreeTerms: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const RegisterDelegate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectAuthLoading);
  const savedFormData = useSelector(formData);
  const emailData = useSelector(selectEmail);
  const [privacyPolicyModal, setPrivacyPolicyModal] = useState(null);
  const [termsModal, setTermsModal] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(savedFormData?.agreeTerms || false);

  const togglePrivacyPolicyModal = () => setPrivacyPolicyModal(!privacyPolicyModal);
  const toggleTermsModal = () => setTermsModal(!termsModal);

  const schema = yup.object().shape({
    email: validations.email.email('Invalid email address').required('Email is required'),
    agreeTerms: yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
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
      email: savedFormData?.email ?? emailData ?? '',
      newPassword: savedFormData?.newPassword ?? '',
      agreeTerms: savedFormData?.agreeTerms ?? false,
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

  const onSuccess = () => {
    dispatch(clearAllFormData());
    localStorage.setItem('isDelegate', true);
    navigate('/auth/register-phone');
  };

  // extract invitation token from url
  const queryParams = new URLSearchParams(window.location.search);
  const invitationToken = queryParams.get('invitation_token');

  const onSubmit = (values) => {
    const { email, newPassword } = values;
    dispatch(signUpDelegate({ email, newPassword, onSuccess, invitationToken }));
  };

  const newPassword = watch('newPassword');
  const cnfPassword = watch('cnfPassword');

  return (
    <OnBoardWrap>
      {privacyPolicyModal && <PrivacyPolicyModal modal={privacyPolicyModal} toggleModal={togglePrivacyPolicyModal} />}
      {termsModal && <TermsModal modal={termsModal} toggleModal={toggleTermsModal} />}
      <div className="card-onboard">
        <LogoComp />
        <CardTitle tag="h1" className="card-title-onboard">
          Delegate Sign Up
        </CardTitle>
        <RegisterDelegateForm
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          errors={errors}
          newPassword={newPassword}
          cnfPassword={cnfPassword}
          agreeTerms={agreeTerms}
          setPrivacyPolicyModal={setPrivacyPolicyModal}
          setTermsModal={setTermsModal}
          setAgreeTerms={setAgreeTerms}
          isLoading={isLoading}
        />
      </div>
    </OnBoardWrap>
  );
};

export default RegisterDelegate;
