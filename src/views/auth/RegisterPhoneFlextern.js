// ** React Imports
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { CardTitle, Label, Form, Input, Button, FormGroup, FormFeedback, Spinner } from 'reactstrap';
import OtpInput from '../../lib/otp-input';
// ** Reactstrap Imports
import { validatePhoneNumber, filteredFormSchema } from '../../utility/Utils';
// ** Custom Components
import CountryDropdown from '../../@core/components/country-dropdown';
import { OnBoardWrap } from './style';

// ** Styles
import '@styles/react/pages/page-authentication.scss';
import { registerPhone, verifyPhone } from '../../redux/actions/authActions';
import { selectAuthLoading, selectMobile } from '../../redux/selectors/authSelectors';
import LogoComp from './components/LogoComp';
import { formData } from '../../redux/selectors/formDataSelectors';
import { clearAllFormData, setFormData } from '../../redux/reducers/formData';
// removed duplicate import of filteredFormSchema from '../../utility/Utils'
import { CITIZEN_TYPES } from '../../utility/constants/Constant';
import { getItem } from '../../utility/localStorageControl';
import theme from '../../configs/themeVariables';
import ResendOTPComp from './components/ResendOTP';
import { clearPhoneData } from '@/redux/reducers/auth';

// Phone validation schema
const phoneSchema = yup.object().shape({
  mobile: yup
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits')
    .required('Mobile number is required'),
});

const RegisterPhoneFlextern = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedFormData = useSelector(formData);
  const [code, setCode] = useState(savedFormData?.code || '');
  const [booleanSent, setBooleanSent] = useState(false);
  const [otpVerifyError, setOtpVerifyError] = useState('');
  const isLoading = useSelector(selectAuthLoading);
  const mobileData = useSelector(selectMobile);
  const isDelegate = getItem('isDelegate');
  const [validPhoneBoolean, setValidPhoneBoolean] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(
    savedFormData?.selectCountry ||
      mobileData?.selectedCountry || {
        label: 'United States',
        dial_code: '+1',
        code: CITIZEN_TYPES.US,
        _id: '6479c2071183add75cda4e37',
      },
  );

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
    resolver: yupResolver(phoneSchema),
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
    };
  }, [localFormData]);
  const resetErrorOtpandCode = () => {
    setOtpVerifyError('');
    setCode('');
    setBooleanSent(true);
  };

  useEffect(() => {
    if (savedFormData) {
      const requiredFields = filteredFormSchema({
        savedData: savedFormData,
        formSchemaFields: { ...phoneSchema.fields, selectedCountry },
      });
      reset(requiredFields);
      const keysWithValues = Object.keys(requiredFields).filter((key) => requiredFields[key]);
      trigger(keysWithValues);
    }

    return () => {
      dispatch(clearAllFormData());
      dispatch(clearPhoneData());
    };
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
    if (!values.mobile || values.mobile.trim() === '') {
      setError('mobile', { type: 'custom', message: 'Phone number cannot be empty' });
      return;
    }

    if (!validatePhoneNumber(values.mobile, selectedCountry.code)) {
      setValidPhoneBoolean(false);
    } else {
      setValidPhoneBoolean(true);
      setBooleanSent(true);
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
    const errorMessage = await dispatch(
      verifyPhone(
        {
          phone: mobileData.phone,
          country_code: mobileData?.selectedCountry.dial_code,
          code,
          country_id: mobileData?.selectedCountry?._id,
        },
        onVerifyOtpSuccess,
      ),
    );
    if (errorMessage) {
      setOtpVerifyError(errorMessage);
    }
    dispatch(clearAllFormData());
  };

  const mobileValue = watch('mobile');
  return (
    <OnBoardWrap>
      <div className="card-onboard">
        <LogoComp />
        <CardTitle tag="h1" className="card-title-onboard">
          {isDelegate ? 'Delegate sign up' : 'Verify Your Mobile 🔐'}
        </CardTitle>
        <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label className="form-label" for="login-email">
              Mobile Number<span style={{ color: `${theme.red}` }}>*</span>
            </Label>
            <div className="d-flex">
              <div>
                <CountryDropdown
                  selectedCountry={selectedCountry}
                  setSelectedCountry={handleCountryChange}
                  disabled={booleanSent}
                />
                {validPhoneBoolean && <p className="text-success text-xs mt-2">Valid</p>}
              </div>
              <div className="mobile-input">
                <Controller
                  name="mobile"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      value={field.value || ''}
                      maxLength={10}
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, '');
                        if (onlyDigits.length <= 10) {
                          field.onChange(onlyDigits);
                        }
                      }}
                      placeholder="Enter  phone number"
                      invalid={!!errors.mobile}
                      disabled={booleanSent}
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
              inputStyle={{
                border: `1px solid ${theme.OTPborderColor}`,
                borderRadius: '8px',
                width: '55px',
                height: '50px',
                fontSize: '18px',
                color: '#000',
                fontWeight: '500',
                caretColor: 'blue',
                backgroundColor: `${booleanSent ? '#ffffff' : '#F9FDFF'}`,
              }}
              focusStyle={{
                border: `1px solid ${booleanSent ? theme.primary : theme.OTPborderColor}`,
                outline: 'none',
              }}
              shouldAutoFocus={false}
              isDisabled={!booleanSent}
            />{' '}
          </FormGroup>
          {otpVerifyError && <p className="text-error text-xs">{otpVerifyError}</p>}
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
                disabled={code.length !== 4 || isLoading || !booleanSent}
                onClick={verifyOtp}
              >
                Verify OTP
              </Button>
              <ResendOTPComp isPhoneResend resetErrorOtpandCode={resetErrorOtpandCode} />
            </>
          )}
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

export default RegisterPhoneFlextern;
