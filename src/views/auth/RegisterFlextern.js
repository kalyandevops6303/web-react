import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { CardTitle, Label, Form, Button, FormFeedback, Spinner, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { formData } from '../../redux/selectors/formDataSelectors';
import { clearAllFormData, setFormData } from '../../redux/reducers/formData';
import { validations, filteredFormSchema, checkPointRedirection } from '../../utility/Utils';
import { OnBoardWrap } from './style';
import '@styles/react/pages/page-authentication.scss';
import {
  selectAuthLoading,
  selectEmail,
  selectFlexternInviteType,
  selectTnCStatus,
} from '../../redux/selectors/authSelectors';
import LogoComp from './components/LogoComp';
import theme from '../../configs/themeVariables';
import PrivacyPolicyModal from '../modals/PrivacyPolicyModal';
import TermsModal from '../modals/TermsModal';
import { getTnCStatus, validateRequestFlexTernToken, verifyEmailForFlextern } from '../../redux/actions/authActions';
import { userTypes } from '../../utility/constants/Constant';
import { DocType } from '@/flexternships/constraints/enums/core-enums';

const RegisterFlexternForm = React.memo(
  ({
    navigate,
    onSubmit,
    control,
    errors,
    agreeTerms,
    // setPrivacyPolicyModal,
    // setTermsModal,
    // setAgreeTerms,
    isLoading,
    emailData,
    requestToken,
    tncStatus,
  }) => {
    const handleNavigatePrivacyPolicy = () => {
      navigate('/privacy-policy', { state: { invitationToken: requestToken, tncType: DocType.PRIVACY_POLICY } });
    };
    const handleNavigateUserTerms = () => {
      navigate('/privacy-policy', { state: { invitationToken: requestToken, tncType: DocType.USER_TERMS } });
    };
    return (
      <Form className="auth-login-form mt-2" onSubmit={onSubmit}>
        <div className="mb-2">
          <Label className="form-label" for="email">
            Email <span style={{ color: `${theme.red}` }}>*</span>
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
                value={field.value || emailData || ''}
                placeholder="abc@company.com"
                className="filled-form-text-field"
                invalid={errors.email && true}
                disabled
              />
            )}
          />
          {errors?.email && <FormFeedback>{errors?.email?.message}</FormFeedback>}
        </div>
        <div className="form-check mb-1">
          <div className="d-flex justify-content-between align-items-center checkbox-custom-label">
            <Label className="form-check-label" for="remember-me">
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
                    size="small"
                    disabled={tncStatus}
                    checked={tncStatus || field.value}
                    onChange={() => {
                      navigate('/privacy-policy', {
                        state: { invitationToken: requestToken, tncType: DocType.PRIVACY_POLICY },
                      });
                      // field.onChange(e);
                      // setAgreeTerms(e.target.checked);
                    }}
                  />
                )}
              />
              Agree & Sign up: &nbsp;
              <Label color={theme.primary} className="mb-0 ">
                <small className="privacy-terms-label cursor-pointer" onClick={handleNavigatePrivacyPolicy}>
                  Privacy Policy
                </small>
                <small className="form-check-label"> & </small>
                <small className="privacy-terms-label cursor-pointer" onClick={handleNavigateUserTerms}>
                  Terms
                </small>
              </Label>
            </Label>
          </div>
          {!agreeTerms && <FormFeedback>{errors.agreeTerms && errors.agreeTerms.message}</FormFeedback>}
        </div>
        <Button color="primary" block type="submit" disabled={isLoading || !agreeTerms || !emailData}>
          {isLoading ? <Spinner size="sm" /> : 'Continue'}
        </Button>
      </Form>
    );
  },
);

RegisterFlexternForm.propTypes = {
  navigate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  agreeTerms: PropTypes.bool.isRequired,
  setPrivacyPolicyModal: PropTypes.func.isRequired,
  setTermsModal: PropTypes.func.isRequired,
  setAgreeTerms: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  emailData: PropTypes.string.isRequired,
  requestToken: PropTypes.string.isRequired,
  tncStatus: PropTypes.bool.isRequired,
};

const RegisterFlextern = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoading = useSelector(selectAuthLoading);
  const savedFormData = useSelector(formData);
  const emailData = useSelector(selectEmail);
  const tncStatus = useSelector(selectTnCStatus);
  const [privacyPolicyModal, setPrivacyPolicyModal] = useState(null);
  const [termsModal, setTermsModal] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(savedFormData?.agreeTerms || false);

  const togglePrivacyPolicyModal = () => setPrivacyPolicyModal(!privacyPolicyModal);
  const toggleTermsModal = () => setTermsModal(!termsModal);
  const inviteHeader = {
    FLEXTERN_CLIENT: {
      title: 'Client Sign up 🔐',
    },
    FLEXTERN_TALENT: {
      title: 'Flextern - Sign up! 🔐',
    },
  };

  const flexternInviteType = useSelector(selectFlexternInviteType);

  const schema = yup.object().shape({
    email: validations.email.email('Invalid email address').required('Email is required'),
    agreeTerms: yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
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
      agreeTerms: location?.state?.tncAccepted ?? false,
    },
  });

  const localFormData = useWatch({ control });
  const queryParams = new URLSearchParams(location.search);
  const requestToken = queryParams.get('invitation_token');
  const onSuccess = (response) => {
    dispatch(clearAllFormData());
    checkPointRedirection({ response, navigate });
  };
  useEffect(() => {
    if (requestToken) {
      dispatch(
        validateRequestFlexTernToken({
          requestToken,
          onRegistered: () => {
            navigate('/auth/login');
          },
        }),
      );
      dispatch(getTnCStatus());
      if (watch('email')) {
        dispatch(
          verifyEmailForFlextern({
            data: { email: watch('email') },
            invitation_token: requestToken,
            onSuccess: () => {
              dispatch(clearAllFormData());
            },
          }),
        );
      }
    }
  }, [watch('email'), requestToken]);

  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData };
    dispatch(setFormData(allData));
  }, [localFormData]);

  useEffect(() => {
    if (savedFormData || emailData) {
      const requiredFields = filteredFormSchema({
        savedData: { ...savedFormData, email: emailData || savedFormData?.email },
        formSchemaFields: schema.fields,
      });
      reset(requiredFields);
      const keysWithValues = Object.keys(requiredFields).filter((key) => requiredFields[key]);
      trigger(keysWithValues);
    }
  }, [emailData]);

  // extract invitation token from url

  const onSubmit = (values) => {
    const { email } = values;
    const data = {};
    data.email = email;
    const invitation_token = queryParams.get('invitation_token');
    if (flexternInviteType === userTypes.flexternClient) data.user_type = userTypes.client;
    else data.user_type = userTypes.talent;

    dispatch(verifyEmailForFlextern({ data, invitation_token, onSuccess }));
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
          {flexternInviteType === userTypes.flexternClient
            ? inviteHeader.FLEXTERN_CLIENT?.title
            : inviteHeader.FLEXTERN_TALENT?.title}
        </CardTitle>
        <RegisterFlexternForm
          navigate={navigate}
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
          emailData={emailData}
          requestToken={requestToken}
          tncStatus={tncStatus}
        />
      </div>
    </OnBoardWrap>
  );
};

export default RegisterFlextern;
