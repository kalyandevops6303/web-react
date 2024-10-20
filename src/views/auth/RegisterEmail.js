// ** React Imports
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import { CardTitle, Label, Form, Input, Button, FormFeedback, Spinner } from 'reactstrap';

// ** Custom Components
import { OnBoardWrap } from './style';
import { filteredFormSchema, validations } from '../../utility/Utils';

// ** Styles
import '@styles/react/pages/page-authentication.scss';
import { registerEmail, verifyEmailForFlextern } from '../../redux/actions/authActions';
import SigninWithGoogle from './components/SigninWithGoogle';
import { selectAuthLoading, selectEmail, selectUserType } from '../../redux/selectors/authSelectors';
import LogoComp from './components/LogoComp';
import theme from '../../configs/themeVariables';
import PrivacyPolicyModal from '../modals/PrivacyPolicyModal';
import TermsModal from '../modals/TermsModal';
import { formData } from '../../redux/selectors/formDataSelectors';
import { clearAllFormData, setFormData } from '../../redux/reducers/formData';
import { userTypes } from '../../utility/constants/Constant';

const RegisterEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const emailData = useSelector(selectEmail);
  const userType = useSelector(selectUserType);
  const savedFormData = useSelector(formData);

  useEffect(() => {
    if (!userType) {
      navigate('/auth');
    }
  }, [userType, navigate]);

  const [agreeTerms, setAgreeTerms] = useState(savedFormData?.agreeTerms || false);
  const [privacyPolicyModal, setPrivacyPolicyModal] = useState(null);
  const [termsModal, setTermsModal] = useState(null);

  const togglePrivacyPolicyModal = () => setPrivacyPolicyModal(!privacyPolicyModal);

  const toggleTermsModal = () => setTermsModal(!termsModal);

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
      email: savedFormData?.email || emailData || '',
      agreeTerms: savedFormData?.agreeTerms || false,
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
    navigate('/auth/email-verify');
  };

  const onFlexternInviteNotFoundHandler = () => {
    const { email } = watch();
    dispatch(registerEmail({ email, userType, onSuccess }));
  };

  const onFlexternEmailVerifySuccess = () => {
    dispatch(clearAllFormData());
    navigate('/auth/register-phone-flexternship');
  };

  const checkFlexternshipEmail = (email) => {
    const data = { email };
    if(userType === userTypes.client)
      data.user_type = userTypes.client;
    else
      data.user_type = userTypes.talent;
    dispatch(
      verifyEmailForFlextern({
        data,
        onSuccess: onFlexternEmailVerifySuccess,
        errorHandlerInviteNotFound: onFlexternInviteNotFoundHandler,
      }),
    );
  };

  const onSubmit = (values) => {
    const { email } = values;
    checkFlexternshipEmail(email)
  };

  function getButtonContent() {
    if (isLoading) {
      return <Spinner size="sm" />;
    }

    return "Verify"
  }

  const emailValue = watch('email'); // track the value of the mobile field

  return (
    <OnBoardWrap>
      {privacyPolicyModal && <PrivacyPolicyModal modal={privacyPolicyModal} toggleModal={togglePrivacyPolicyModal} />}
      {termsModal && <TermsModal modal={termsModal} toggleModal={toggleTermsModal} />}
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
                  <u className="cursor-pointer" onClick={() => setPrivacyPolicyModal(true)}>
                    Privacy Policy
                  </u>
                </small>
                <small>
                  {'  '}&{'  '}
                </small>
                <small className="privacy-terms-label">
                  <u className="cursor-pointer" onClick={() => setTermsModal(true)}>
                    Terms
                  </u>
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
            {getButtonContent()}
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

        <SigninWithGoogle title="Sign Up" />

        <div className="d-flex justify-content-center sign-info">
          <Label>
            <small>Already have a trumio account?</small>
          </Label>
          <Label onClick={() => dispatch(clearAllFormData())} tag={Link} to="/auth/login" className="primary">
            <small>Sign in</small>
          </Label>
        </div>
      </div>
    </OnBoardWrap>
  );
};

export default RegisterEmail;
