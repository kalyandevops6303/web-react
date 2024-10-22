// ** React Imports
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { CardTitle, Label, Form, Input, Button, FormGroup, FormFeedback, Spinner } from 'reactstrap';
import OtpInput from '../../lib/otp-input';
// ** Reactstrap Imports

// ** Custom Components
import CountryDropdown from '../../@core/components/country-dropdown';
import { OnBoardWrap } from './style';

// ** Styles
import '@styles/react/pages/page-authentication.scss';
import { registerPhone ,verifyPhone} from '../../redux/actions/authActions';
import { selectAuthLoading, selectMobile } from '../../redux/selectors/authSelectors';
import LogoComp from './components/LogoComp';
import { formData } from '../../redux/selectors/formDataSelectors';
import { clearAllFormData, setFormData } from '../../redux/reducers/formData';
import { filteredFormSchema } from '../../utility/Utils';
import { CITIZEN_TYPES } from '../../utility/constants/Constant';
import { getItem } from '../../utility/localStorageControl';
import theme from '../../configs/themeVariables';
import ResendOTPComp from './components/ResendOTP';
import { clearPhoneData } from '@/redux/reducers/auth';

const RegisterPhoneFlextern = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedFormData = useSelector(formData);
  const [code, setCode] = useState(savedFormData?.code || '');
  const [booleanSent, setBooleanSent] = useState(false);
  const isLoading = useSelector(selectAuthLoading);
  const mobileData = useSelector(selectMobile);
  const isDelegate = getItem('isDelegate');

  const [selectedCountry, setSelectedCountry] = useState(
    savedFormData?.selectCountry ||
      mobileData?.selectedCountry || {
        label: 'United States',
        dial_code: '+1',
        code: CITIZEN_TYPES.US,
        _id: '6479c2071183add75cda4e37',
      },
  );

  const schema = yup.object().shape({
    mobile: yup.string().required('Mobile number is required'),
  });

  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
    watch,
    clearErrors,
    reset,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      mobile: savedFormData?.mobile || mobileData?.phone || '',
    },
  });
  const localFormData = useWatch({ control });
  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData };
    dispatch(setFormData(allData));

    return () => {
      dispatch(clearAllFormData());
      dispatch(clearPhoneData());
    }
  }, [localFormData]);

  useEffect(() => {
    if (savedFormData) {
      const requiredFields = filteredFormSchema({
        savedData: savedFormData,
        formSchemaFields: { ...schema.fields, selectedCountry },
      });
      reset(requiredFields);
      const keysWithValues = Object.keys(requiredFields).filter((key) => requiredFields[key]);
      trigger(keysWithValues);
    }

    return () => {
      dispatch(clearAllFormData());
      dispatch(clearPhoneData());
    }
  }, []);

  const handleCountryChange = (value) => {
    const allData = { ...savedFormData, selectCountry: value };
    dispatch(setFormData(allData));
    setSelectedCountry(value);
    clearErrors();
  };
  const handleChange = (value) => {
    if (value !== code) {
      dispatch(setFormData({ code: value }));
      setCode(value);
    }
  };
  const onSuccess = () => {
    // dispatch(clearAllFormData());

    // navigate('/auth/phone-verify');
    setBooleanSent(true);
  };

  const onSubmit = (values) => {
    if (!isValidPhoneNumber(values.mobile, selectedCountry.code)) {
      setError('mobile', { type: 'custom', message: 'Invalid phone number' });
    } else {
      dispatch(
        registerPhone({
          phone: values.mobile.replace(/[^\d]/g, ''),
          country_code: selectedCountry.dial_code,
          selectedCountry,
          onSuccess,
        }),
      );
    }
  };

  const onVerifyOtpSuccess = () => {
    navigate('/auth/set-password');
    dispatch(clearAllFormData());

  };

  const verifyOtp = async () => {
    const response = await dispatch(
      verifyPhone({
        phone: mobileData.phone,
        country_code: mobileData?.selectedCountry.dial_code,
        code,
        country_id: mobileData?.selectedCountry?._id,
        
      },onVerifyOtpSuccess),
    );
    setError(response);
    dispatch(clearAllFormData());
  };

  const mobileValue = watch('mobile')
  return (
    <OnBoardWrap>
      <div className="card-onboard">
        <LogoComp />
        <CardTitle tag="h1" className="card-title-onboard">
          {isDelegate ? 'Delegate sign up' : 'Sign up! 🔐'}
        </CardTitle>
        <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label className="form-label" for="login-email">
              Mobile number
            </Label>
            <div className="d-flex">
              <CountryDropdown selectedCountry={selectedCountry} setSelectedCountry={handleCountryChange} />
              <div className="mobile-input">
                <Controller
                  type="phone"
                  id="mobile"
                  name="mobile"
                  placeholder="Enter phone number"
                  autoFocus
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      value={field.value || ''} // Set a default value for the input
                      placeholder="Enter phone number"
                      invalid={errors.mobile && true}
                    />
                  )}
                />
              </div>
            </div>

            {errors.mobile && <FormFeedback>{errors.mobile.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label className="form-label" for="otp">
              OTP
            </Label>
            <OtpInput
              value={code}
              onChange={handleChange}
              numInputs={4}
              separator={<span style={{ width: '12px' }} />}
              isInputNum
              shouldAutoFocus
              inputStyle={{
                border: `1px solid ${theme.OTPborderColor}`,
                borderRadius: '8px',
                width: '55px',
                height: '50px',
                fontSize: '18px',
                color: '#000',
                fontWeight: '500',
                caretColor: 'blue',
              }}
              focusStyle={{
                border: `1px solid ${theme.primary}`,
                outline: 'none',
              }}
            />{' '}
          </FormGroup>
          {!booleanSent ? (
            <Button color="primary" block type="submit" disabled={!mobileValue || isLoading}>
              {isLoading ? <Spinner size="sm" /> : 'Send OTP'}
            </Button>
          ) : (
            <>
              <Button
                color="primary"
                block
                className="mt-4"
                disabled={code.length !== 4 || isLoading}
                onClick={verifyOtp}
              >
                Verify OTP
              </Button>
              <ResendOTPComp isPhoneResend />

            </>
          )}
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

export default RegisterPhoneFlextern;
